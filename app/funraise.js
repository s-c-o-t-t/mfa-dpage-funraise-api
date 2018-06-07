function Funraise(config) {
    this.$;
    this.config = config;
    this.orgId = config.id.split(':')[0];
    this.formId = config.id.split(':')[1];
    this.cloudfrontUrl = 'https://s3.amazonaws.com/funraise-platform';
    this.bitpayUrl = config.bitpayUrl || 'https://bitpay.com';
    this.version = '1.3';
    this.assetPath = '/' + this.orgId + '/' + this.formId + '/' + this.version;
    this.infoCallback = config.onInfo;
    this.successCallback = config.onSuccess;
    this.failedCallback = config.onFailure;
    this.setupCallback = config.onSetup;
    this.useDefaultButton = config.useDefaultButton;
    this.skipNetworkTests = config.skipNetworkTests;
    this.disableRemoteLogging = config.disableRemoteLogging;
    this.multicurrency = config.multicurrency;
    this.text = config.text;
    this.useDonorStore = config.useDonorStore;
    this.debugEnabled = config.debugEnabled;
    this.eventId = config.eventId;
    this.minAmount = config.minAmount || 0.5;
    this.maxAmount = config.maxAmount || 1000000;
    this.setDefaults(config);
    this.donationForm;
    this.spreedlyPaymentFrame;
    this.creditCardValid = false;
    this.ccvValueValid = false;
    this.preventSubmit = false;
    this.spreedlyFrame;
    this.postAllowed;
    this.EXTERNAL_ASSETS = 4;
    this.timer;
    this.fundraiserProfileImage = config.fundraiserProfileImage;
    this.pageId = config.pageId;
    this.goalAmount = config.goalAmount;
    this.raisedAmount = config.raisedAmount || 0;
    this.showComment = config.showComment || false;
    this.hasAlreadyBeenInitialized = false;
    this.recaptchaKey = config.recaptchaKey;
    this.solvedRecaptcha = !Boolean(this.recaptchaKey);
    this.allowPledges = config.allowPledges;
    this.pledgeCollectionDate = config.pledgeCollectionDate;
    this.recaptchaResponse;
}
Funraise.prototype.initStateMachine = function (initialState, form) {
    var _this = this;
    var currentState = initialState;
    var stateMachine = {
        amount: {
            _bindListeners: function () {
                var _that = this;
                for (var i = 1; i <= 4; i++) {
                    _this.$j('#preset' + i).on('click', function () {
                        _this.$('.js-amount').removeClass('active');
                        _this.$(this).addClass('active');
                        var amount = _this.formatMoney(_this.parseFloat(_this.$(this).data('amount')));
                        _this.setAmount(amount);
                    });
                }
                _this.$j('#amount').on('blur', function () {
                    _this.$('.js-amount').removeClass('active');
                    _this.setAmount(_this.formatMoney(_this.$j('#amount').val()));
                });
                _this.$j('#amount').on('keyup', function (e) {
                    var c = e.keyCode || e.which;
                    _this.$('.js-amount').removeClass('active');
                    if ((c >= 48 && c <= 57) || [188, 190, 8, 13, 46].indexOf(c) !== -1) {
                        _this.setAmount(_this.$j('#amount').val());
                    }
                });
                _this.$j('#operationsTip').on('change', function () {
                    _this.setAmount(_this.$j('#amount').val());
                });
            },
            init: function () {
                this._bindListeners();
                _this.setupPresets();
            },
            showBack: false,
            showClose: true,
            text: _this.getText("Your information") + " <i class='fa fa-angle-right arrow-right'></i>",
            form: _this.id('#amount_info'),
            prev: function () {
                return this;
            },
            next: function () {
                currentState = 'donor_info';
                _this.sendEvent(currentState);
            },
            isValid: function () {
                if (_this.preSelectButton && !_this.getAmount()) {
                    _this.setPresetActive(_this.preSelectButton);
                }
                return _this.$(_this.id('#amount_info') + ' :input').valid();
            },
            submit: function () {},
            complete: function () {}
        },
        donor_info: {
            _bindListeners: function () {
                _this.$j('#match').on('click', function () {
                    _this.showCompanyMatch(_this.$j('#match').prop('checked'));
                });
                _this.$j('#dedication').on('click', function () {
                    _this.showDedication(_this.$j('#dedication').prop('checked'));
                });
                _this.$j('#company').on('click', function () {
                    _this.setupAutoComplete();
                });
                _this.$('.js-amount').on('click change', function () {
                    _this.$('.match__error').empty();
                    _this.$('.match__company select').removeClass('has-error');
                });
            },
            init: function () {
                this._bindListeners();
                _this.isConnected(function () {
                    alert(_this.getText("It looks like you are having network connection issues. " + "Please check your network, firewalls and browser plugins " + "or your donation will fail."));
                });
            },
            showBack: true,
            showClose: false,
            text: _this.getText("Payment Info") + " <i class='fa fa-angle-right arrow-right'></i>",
            form: _this.id('#donor_info'),
            prev: function () {
                currentState = 'amount';
            },
            next: function () {
                if (_this.infoCallback) {
                    var donor = _this.getDonor();
                    donor.amount = _this.getAmount();
                    donor.referrer = document.referrer;
                    donor.location = window.location.href;
                    donor.form = _this.formId;
                    donor.org = _this.orgId;
                    donor.created = (new Date()).getTime();
                    if (navigator) donor.ua = navigator.userAgent;
                    try {
                        _this.infoCallback(donor);
                    } catch (err) {
                        _this.debug(err);
                    }
                }
                if (_this.useDonorStore) {
                    _this.saveDonor();
                }
                currentState = _this.getPaymentType();
                _this.sendEvent(currentState);
            },
            isValid: function () {
                return _this.$(_this.id('#donor_info') + ' :input').valid();
            },
            submit: function () {},
            complete: function () {}
        },
        card: {
            init: function () {},
            showBack: true,
            showClose: false,
            text: _this.getText("Submit Donation") + " <i class='fa fa-check arrow-right'></i>",
            form: _this.id('#cc_payment'),
            prev: function () {
                currentState = 'donor_info';
            },
            next: function () {
                currentState = null;
            },
            isValid: function () {
                _this.$j('#errorBox').html("");
                var errorLabel;
                if (!_this.solvedRecaptcha) {
                    errorLabel = document.createElement('label');
                    errorLabel.className = 'error';
                    errorLabel.innerText = 'Click the reCaptcha to verify your donation.';
                    _this.$j('#errorBox').append(errorLabel);
                    return false;
                }
                var isValid = true;
                if (!_this.$(_this.id('#cc_payment') + ' :input').valid()) {
                    isValid = false;
                }
                if (!_this.creditCardValid) {
                    _this.$j('#errorBox').append("<div id='credit_card_error'><label class='error' >" + _this.getText("Credit Card number is invalid") + "</label><br/></div>");
                    isValid = false;
                }
                if (!_this.ccvValueValid) {
                    _this.$j('#errorBox').append("<div id='ccv_error'><label class='error' >" + _this.getText("CVV number is invalid") + "</label><br/></div>");
                    isValid = false;
                }
                return isValid;
            },
            submit: function () {
                _this.submitCreditCard();
            },
            complete: _this.completeCardCheck.bind(_this)
        },
        check: {
            init: function () {},
            showBack: true,
            showClose: false,
            text: _this.getText("Submit Donation") + " <i class='fa fa-check arrow-right'></i>",
            form: _this.id('#check_payment'),
            prev: function () {
                currentState = 'donor_info';
            },
            next: function () {
                currentState = null;
            },
            isValid: function () {
                return _this.$(_this.id('#check_payment') + ' :input').valid();
            },
            submit: function () {
                _this.submitPayment();
            },
            complete: _this.completeCardCheck.bind(_this)
        },
        bitcoin: {
            init: function () {
                _this.$j('#bitcoin_invoice').fhide();
                _this.showProgress(true);
                _this.submitPayment();
                _this.$j('#prev').fhide();
                _this.$j('#dismiss').fshow();
                _this.$j('#next').fhide();
            },
            showBack: true,
            showClose: false,
            text: '',
            form: _this.id('#bitcoin_invoice'),
            prev: function () {
                currentState = 'donor_info';
            },
            next: function () {
                currentState = null;
            },
            isValid: function () {
                return true;
            },
            submit: function () {},
            complete: _this.startBitpayPolling.bind(_this)
        },
        paypal: {
            init: function () {
                _this.$j('.progress_text').text(_this.getText('Talking with PayPal.'));
                _this.showProgress(true);
                _this.submitPayment();
                _this.$j('#prev').fhide();
                _this.$j('#dismiss').fshow();
                _this.$j('#next').fhide();
            },
            showBack: true,
            showClose: false,
            text: _this.getText("Continue to PayPal") + " <i class='fa fa-angle-right arrow-right'></i>",
            form: null,
            prev: function () {
                currentState = 'donor_info';
            },
            next: function () {
                currentState = null;
            },
            isValid: function () {
                return true;
            },
            submit: function () {},
            complete: _this.completePaypal.bind(_this)
        }
    };
    stateMachine.amount.init();
    return {
        _updateNavigation: function () {
            if (stateMachine[currentState].showBack) {
                _this.$j('#prev').fshow();
            } else {
                _this.$j('#prev').fhide();
            }
            if (stateMachine[currentState].showClose) {
                _this.$j('#dismiss').fshow();
            } else {
                _this.$j('#dismiss').fhide();
            }
            _this.$j('#next').html(stateMachine[currentState].text);
        },
        next: function () {
            if (!stateMachine[currentState].isValid()) return;
            stateMachine[currentState].submit();
            _this.$(stateMachine[currentState].form).fhide();
            stateMachine[currentState].next();
            if (currentState !== null) {
                _this.$(stateMachine[currentState].form).fshow();
                this._updateNavigation();
                stateMachine[currentState].init();
            }
            if (_this.isPopup && _this.isMobile()) {
                window.scrollTo(0, 0);
                _this.$j('#donateModal').animate({
                    scrollTop: 0
                }, 'slow');
            }
        },
        prev: function () {
            _this.$(stateMachine[currentState].form).fhide();
            stateMachine[currentState].prev();
            _this.$(stateMachine[currentState].form).fshow();
            this._updateNavigation();
        },
        complete: function (data) {
            stateMachine[_this.getPaymentType()].complete(data);
        },
        reset: function () {
            _this.preventSubmit = false;
            if (currentState !== null) {
                _this.$(stateMachine[currentState].form).fhide();
            }
            currentState = initialState;
            _this.$(stateMachine[currentState].form).fshow();
            _this.$j('#next').attr('data-dismiss', '');
            _this.$j('#next').html(stateMachine[currentState].text);
            form.resetForm();
            _this.$j('#donateForm')[0].reset();
            if (_this.isRecurring()) {
                _this.$j('#donation_title').html(_this.getText('Your recurring donation'));
            } else {
                _this.$j('#donation_title').html(_this.getText('Your donation'));
            }
            _this.showCompanyMatch(false);
            _this.showDedication(false);
            _this.resetHeader();
            _this.resetPledge();
            this._updateNavigation();
        }
    };
}
Funraise.prototype.submitCreditCard = function () {
    var _this = this;
    if (_this.preventSubmit) return;
    _this.showProgress(true);
    var options = {};
    options['first_name'] = _this.$j('#first_name').val();
    options['last_name'] = _this.$j('#last_name').val();
    options['month'] = _this.$j('#month').val();
    options['year'] = _this.$j('#year').val();
    options['address1'] = _this.getAddress().address;
    options['city'] = _this.$j('#city').val();
    options['state'] = _this.$j('#state').val();
    options['zip'] = _this.$j('#postalCode').val();
    options['country'] = _this.$j('#country').val();
    options['email'] = _this.$j('#email').val();
    options['phone_number'] = _this.$j('#phone').val();
    _this.spreedlyFrame.tokenizeCreditCard(options);
}
Funraise.prototype.submitPayment = function () {
    var _this = this;
    if (_this.preventSubmit) return;
    _this.showProgress(true);
    _this.createDonation();
}
Funraise.prototype.createDonation = function (paymentToken) {
    var _this = this;
    var donation = _this.getDonation();
    donation.paymentToken = paymentToken;
    donation.recaptchaResponse = _this.recaptchaResponse;
    var ajaxOptions = {
        type: 'POST',
        url: _this.endpoint + '/public/api/v2/donation',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(donation),
        headers: {
            Accept: 'application/json'
        },
        success: function (data, _state, xhr) {
            if (data.id) {
                setTimeout(function () {
                    _this.poll(data.id);
                }, 5000);
            } else {
                _this.failedDonation({
                    responseText: 'An unknown error has occurred'
                }, xhr.status, 'An unknown error has occurred');
            }
        },
    };
    ajaxOptions.error = function (response, status, error) {
        delete ajaxOptions.data;
        console.error(error + " -- " + JSON.stringify(ajaxOptions));
        _this.failedDonation(response, status, error);
    };
    _this.$.ajax(ajaxOptions);
}
Funraise.prototype.poll = function (requestId) {
    var _this = this;
    _this.$.ajax({
        type: 'GET',
        url: _this.endpoint + '/public/api/v2/donation/' + requestId,
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        success: function (data, textStatus, xhr) {
            if (xhr.status === 204) {
                setTimeout(function () {
                    _this.poll(requestId);
                }, 5000);
            } else if (xhr.status === 200) {
                _this.donationForm.complete(data);
            }
        },
        error: function (response, status, error) {
            _this.failedDonation(response, error.status, error);
        }
    });
}
Funraise.prototype.complete = function (data) {
    var _this = this;
    _this.preventSubmit = false;
    _this.showProgress(false);
    _this.showThankyou(true);
    _this.sendEvent('donation_complete');
    if (_this.successCallback) {
        try {
            var donation = _this.getDonation();
            donation.id = data.donation_id;
            donation.transactionId = data.transaction_id;
            _this.successCallback(_this.getDonor(), donation);
        } catch (err) {
            _this.debug(err);
        }
    }
}
Funraise.prototype.completeCardCheck = function (data) {
    var _this = this;
    var $thankYouMessage = _this.$j('.thank_you_message');
    var $paymentOptions = _this.$('#paymentOptions' + _this.formKey + '-select');
    if ($paymentOptions.val() === 'pledge') {
        $thankYouMessage.empty().append(_this.$('<span />').text(_this.getText("We've received your pledge information! Your total pledge amount will be charged on"))).append(_this.$('<b />').text(' ' + _this.formattedPledgeCollectionDate + '. ')).append(_this.$('<span />').text(_this.getText("You'll receive an email when your donation is processed.")));
    } else {
        $thankYouMessage.text(_this.getText('You will receive a receipt for your donation by email shortly.'));
    }
    _this.$j('.checkmark_img').fshow();
    _this.$j('.thanksName_message').fshow();
    _this.complete(data);
}
Funraise.prototype.completePaypal = function (data) {
    var _this = this;
    _this.$j('#paypal_link').attr("href", data.checkout_url);
    _this.$j('#paypal_link').on('click', function () {
        _this.sendEvent('paypal_checkout_opened');
    });
    _this.$j('#paypal_link').fshow();
    _this.$j('.checkmark_img').fhide();
    _this.$j('.thank_you_message').text(_this.getText('Please finish your donation at PayPal by confirming your account.'));
    _this.$j('.thanksName_message').text('');
    _this.$j('.thank_you_message_paypal').fshow();
    _this.complete(data);
}
Funraise.prototype.startBitpayPolling = function (data) {
    var _this = this;
    _this.showProgress(false);
    _this.$j('#bitcoin_invoice').fshow();
    _this.$j('#bitpay-qr-code').attr('src', 'data:image/png;charset=utf-8;base64,' + data.img_data);
    _this.$j('#btc_price').text('BTC: ' + data.alt_amount);
    _this.$j('#btc_token').text(data.payment_id);
    _this.$j('#btc_token').attr('href', data.checkout_url);
    _this.$j('#btc_wallet').attr('href', data.checkout_url);
    _this.$j('#btc_status').text('Status: ' + data.invoice_status);
    _this.updateBitpayTimer(data.exp);
    _this.pollBitpay(data.transaction_id);
}
Funraise.prototype.pollBitpay = function (paymentId) {
    var _this = this;
    _this.$.ajax({
        type: 'GET',
        url: _this.bitpayUrl + '/invoices/' + paymentId,
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        success: function (response, textStatus, xhr) {
            response = response.data;
            _this.$j('#btc_status').text('Status: ' + response.status);
            if (response.status === 'paid' || response.status === 'confirmed') {
                _this.complete({
                    transaction_id: paymentId
                });
            } else {
                setTimeout(function () {
                    _this.pollBitpay(paymentId);
                }, 60000);
            }
        },
        error: function (response, status, error) {}
    });
}
Funraise.prototype.showDedication = function (show) {
    var _this = this;
    if (show) {
        _this.$('.dedication').addClass('dedication--selected');
        _this.sendEvent('dedication_selected');
    } else {
        _this.$('.dedication').removeClass('dedication--selected');
        _this.$('.dedication__type select').removeClass('has-error').prop('selectedIndex', 0);
        _this.$('.dedication__error').empty();
        _this.$('.dedication__type input').removeClass('has-error').val('');
        _this.$('.dedication__type textarea').val('');
    }
}
Funraise.prototype.showCompanyMatch = function (show) {
    var _this = this;
    if (show) {
        _this.$('.match').addClass('match--selected');
        _this.sendEvent('match_selected');
    } else {
        _this.$('.match').removeClass('match--selected');
        _this.$('.match__company select').removeClass('has-error').prop('selectedIndex', 0);
        _this.$('.match__error').empty();
        _this.$('.match__company input').removeClass('has-error').val('');
    }
}
Funraise.prototype.showProgress = function (show) {
    var _this = this;
    if (show) {
        _this.$j('#prev').fhide();
        _this.$j('#progress').fshow();
        _this.$j('#next').fhide();
    } else {
        _this.$j('#progress').fhide();
    }
}
Funraise.prototype.showError = function (errorMessage) {
    var _this = this;
    if (errorMessage) {
        _this.$j('#error').fshow();
        _this.$j('#error').css("display", "inline-block");
        _this.$j('#next').fhide();
        if (errorMessage) _this.$j('#error-text').text(_this.getText(errorMessage));
    } else {
        _this.$j('#error').fhide();
        _this.$j('#error').css("display", "none");
        _this.$j('#next').fshow();
    }
}
Funraise.prototype.showThankyou = function (show) {
    var _this = this;
    if (show) {
        _this.$j('#thanksName').text(_this.$j('#first_name').val());
        if (_this.isPopup && _this.isMobile()) {
            _this.$j('#next').fshow();
            _this.$j('#next').attr('data-dismiss', 'modal');
            _this.$j('#next').html(_this.getText("Close") + " <i class='fa fa-close arrow-right'></i>");
        } else {
            _this.$j('#next').fhide();
        }
        _this.$j('#prev').fhide();
        _this.$j('#dismiss').fshow();
        _this.$j('#thankYou').fshow();
    } else {
        _this.$j('#thankYou').fhide();
    }
}
Funraise.prototype.onPaymentOptionChange = function (e) {
    var $paymentOption = this.$(e.target);
    var value = $paymentOption.val();
    var $paymentType = this.$j('#paymentType');
    var $frequency = this.$j('#frequency');
    var $selectAmountText = this.$j('#selectAmount');
    var $dontationTitle = this.$j('#donation_title');
    var $ccPaymentDescription = this.$('#cc_payment' + this.formKey + '-description');
    var descriptionSelector = '#paymentOptions' + this.formKey + '-description';
    if (value === 'pledge') {
        var dateString = new Date(this.pledgeCollectionDate).toDateString();
        dateString = dateString.split(' ');
        dateString = dateString[1] + ' ' + dateString[2] + ', ' + dateString[3];
        this.formattedPledgeCollectionDate = dateString;
        $paymentOption.parent().find(descriptionSelector).fshow().empty().append(this.$('<span />').text(this.getText('Your pledge will be charged on'))).append(this.$('<b />').text(' ' + this.formattedPledgeCollectionDate + '.'));
        $paymentType.val('card');
        $paymentType.attr('disabled', 'disabled');
        $frequency.val('o');
        $frequency.fhide();
        $selectAmountText.text(this.getText('Select a pledge amount'));
        $dontationTitle.text(this.getText('Your pledge'));
        $ccPaymentDescription.fshow().empty().append(this.$('<span />').text(this.getText('You will not be charged now. Your pledge amount will be charged on'))).append(this.$('<b />').text(' ' + this.formattedPledgeCollectionDate + '.'));
    } else {
        $paymentOption.parent().find(descriptionSelector).fhide().empty();
        $paymentType.val('card')
        $paymentType.removeAttr('disabled');
        $frequency.val('o');
        $frequency.fshow();
        $selectAmountText.text(this.getText('Select donation amount'));
        $dontationTitle.text(this.getText('Your donation'));
        $ccPaymentDescription.fhide().empty();
    }
};
Funraise.prototype.showPledge = function (show) {
    var $paymentOptionsGroup = this.$('#paymentOptions' + this.formKey + '-group');
    var fieldSelector = '#paymentOptions' + this.formKey + '-select';
    if (show) {
        $paymentOptionsGroup.fshow().find(fieldSelector).on('change', this.onPaymentOptionChange.bind(this));
    } else {
        $paymentOptionsGroup.fhide().find(fieldSelector).off('change');
    }
}
Funraise.prototype.resetPledge = function () {
    var selectOptions;
    var defaultValue;
    var $paymentOptionsGroup = this.$('#paymentOptions' + this.formKey + '-group');
    var fieldSelector = '#paymentOptions' + this.formKey + '-select';
    if ($paymentOptionsGroup.length < 1) return;
    selectOptions = $paymentOptionsGroup.find('option');
    defaultValue = selectOptions[0].value;
    $paymentOptionsGroup.find(fieldSelector).val(defaultValue).trigger('change');
}
Funraise.prototype.showHeader = function (show) {
    var _this = this;
    if (show) {
        _this.$j('#header').fshow();
        _this.$j('#dismiss-inner').fhide();
    } else {
        _this.$j('#header').fhide();
        _this.$j('#dismiss-inner').fshow();
    }
}
Funraise.prototype.updateHeader = function () {
    var _this = this;
    var isHeaderVisible = _this.isHeaderVisible();
    _this.showHeader(isHeaderVisible);
    if (isHeaderVisible) {
        var amount = _this.parseFloat(_this.getAmount()) + _this.getTip();
        amount = amount.toFixed(2);
        var dollarsAndCents;
        amount = _this.formatMoney(amount);
        dollarsAndCents = amount.split('.');
        _this.$('.header__amount #headerAmount' + _this.formKey + ' .money__dollars').text(dollarsAndCents[0]);
        _this.$('.header__amount #headerAmount' + _this.formKey + ' .money__cents').text(dollarsAndCents[1]);
        _this.$('.header__logo').addClass('header__logo--slide-left');
        _this.$('.header__amount').addClass('header__amount--show');
        _this.updateFundraisingHeader();
    }
}
Funraise.prototype.resetHeader = function () {
    var _this = this;
    _this.$('.header__logo').removeClass('header__logo--slide-left');
    _this.$('.header__amount').removeClass('header__amount--show');
    _this.$j('#header-goal-progress').css('width', 1);
}
Funraise.prototype.reset = function () {
    var _this = this;
    _this.$j('#amount').val(undefined);
    _this.donationForm.reset();
    _this.showThankyou(false);
    _this.showProgress(false);
    _this.showError(false);
    _this.$j('#next').fshow();
    _this.$j('#amount').fshow();
    var paymentType = _this.$j('#paymentType');
    if (paymentType.length) {
        var type = paymentType[0].options[0].value;
        paymentType.val(type);
        if (type === 'card' || type === 'check') {
            _this.$j('#frequency').fshow();
        } else {
            _this.forceOneTime();
        }
    }
    _this.$j('.progress_text').text(_this.getText('Yay! Your donation is processing.'));
    _this.$j('#bitpay-qr-code').attr('src', null);
    _this.$j('#paypal_link').fhide();
    _this.spreedlyFrame.reload();
    _this.$j('#credit_card_icon').removeClass();
    _this.$j('#credit_card_icon').addClass('fa fa-credit-card fa-2x');
    _this.$j('#credit_card_icon').html('');
    clearInterval(_this.timer);
    _this.setOverrides();
    _this.resetHeader();
    _this.updateHeader();
    _this.setupPresets();
    if (!this.isFixedAmount) {
        _this.updateCurrency(_this.$j('#currency').val());
    }
}
Funraise.prototype.updateBitpayTimer = function (expireTime) {
    var _this = this;
    var duration = (new Date(expireTime) - new Date()) / 1000;
    if (duration <= 0) return;
    var timer = duration,
        minutes, seconds;
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    _this.$j('#btc_timer').text(minutes + ":" + seconds);
    setTimeout(function () {
        _this.updateBitpayTimer(expireTime);
    }, 1000);
}
Funraise.prototype.isRecurring = function () {
    var _this = this;
    return _this.getFrequency() && _this.getFrequency() !== 'o';
}
Funraise.prototype.getFrequency = function () {
    var _this = this;
    return _this.$j('#frequency').val()
}
Funraise.prototype.getPaymentType = function () {
    var _this = this;
    return _this.$j('#paymentType').val();
}
Funraise.prototype.setAmount = function (amount) {
    var _this = this;
    _this.$j('#amount').val(amount);
    _this.updateHeader();
}
Funraise.prototype.getTip = function () {
    var _this = this;
    var tip = 0;
    if (_this.hasOperationsTip()) {
        tip = _this.parseFloat(_this.getAmount() * _this.getTipRate());
    }
    return tip;
}
Funraise.prototype.getTipRate = function () {
    var _this = this;
    var rate = 0;
    if (_this.hasOperationsTip()) {
        rate = _this.parseFloat(_this.getTipPercent()) / 100;
    }
    return rate;
}
Funraise.prototype.getTipPercent = function () {
    var _this = this;
    return (+(_this.$j('#operationsTip').data('operationstip') || 0)).toFixed(2);
}
Funraise.prototype.hasOperationsTip = function () {
    var _this = this;
    var tipCheckbox = _this.$j('#operationsTip');
    return tipCheckbox.is(':checked');
}
Funraise.prototype.getAmount = function () {
    var _this = this;
    return _this.parseFloat(_this.$j('#amount').val() || 0);
}
Funraise.prototype.getAmountWithTip = function () {
    var _this = this;
    return +((_this.getAmount() + _this.getTip()).toFixed(2));
}
Funraise.prototype.getAllocationId = function () {
    var _this = this;
    if (_this.allocations) {
        if (_this.$(_this.id("#allocation") + " option").length === 1) {
            return _this.allocations[0].id;
        } else {
            return _this.$j('#allocations').val();
        }
    }
}
Funraise.prototype.modifyAmountButton = function (id, val) {
    var _this = this;
    _this.$j(id).data('amount', val)
    _this.$j(id + '-label').html(val);
}
Funraise.prototype.getDonation = function () {
    var _this = this;
    var form = _this.$j('#donateForm');
    var donation = _this.getFormData(form);
    donation.tipAmount = _this.getTip().toFixed(2);
    donation.tipPercent = _this.getTipPercent();
    donation.amount = _this.getAmountWithTip();
    donation.baseAmount = (_this.getAmountWithTip() - _this.getTip()).toFixed(2);
    donation.tags = _this.tags;
    donation.donateDouble = _this.isDonateDouble();
    donation.sourceUrl = window.location.href;
    donation.referrer = document.referrer;
    donation.eventId = _this.eventId;
    donation.formId = _this.formId;
    donation.organizationId = _this.orgId;
    donation.pageId = _this.pageId;
    donation.company = _this.getCompany();
    donation.recurring = _this.isRecurring();
    donation.frequency = _this.getFrequency();
    donation.formAllocationId = _this.getAllocationId();
    return donation;
}
Funraise.prototype.isDonateDouble = function () {
    var _this = this;
    return _this.$j('#match').prop('checked');
}
Funraise.prototype.getCompany = function () {
    var _this = this;
    var company = '';
    if (_this.isDonateDouble()) {
        company = _this.$j('#company').val();
    }
    return company;
}
Funraise.prototype.getDonor = function () {
    var _this = this;
    var data = {
        fname: _this.$j('#first_name').val(),
        lname: _this.$j('#last_name').val(),
        email: _this.$j('#email').val(),
        phone: _this.$j('#phone').val(),
        city: _this.$j('#city').val(),
        state: _this.$j('#state').val(),
        postal: _this.$j('#postalCode').val(),
        country: _this.$j('#country').val(),
    };
    var address = _this.getAddress();
    data.address = address.address;
    if (address.address1) {
        data.address1 = address.address1;
        data.address2 = address.address2;
    }
    return data;
}
Funraise.prototype.saveDonor = function () {
    var _this = this;
    try {
        var donor = _this.getDonor();
        _this.setCookie('funraise-' + _this.orgId, btoa(JSON.stringify(donor)), 9999);
    } catch (err) {
        _this.debug(err);
    }
}
Funraise.prototype.inflateDonor = function () {
    var _this = this;
    try {
        var donor = _this.getCookie('funraise-' + _this.orgId);
        if (donor) {
            donor = JSON.parse(atob(donor));
            if (donor.fname) _this.$j('#first_name').val(donor.fname);
            if (donor.lname) _this.$j('#last_name').val(donor.lname);
            if (donor.email) _this.$j('#email').val(donor.email);
            if (donor.phone) _this.$j('#phone').val(donor.phone);
            if (donor.city) _this.$j('#city').val(donor.city);
            if (donor.postal) _this.$j('#postalCode').val(donor.postal);
            if (donor.country && donor.state) {
                _this.$j('#country').val(donor.country);
                _this.buildStatePicklist(_this.$j('#country').find(':selected').data('code'));
                _this.$j('#state').val(donor.state);
            }
            _this.setAddress(donor.address, donor.address1, donor.address2);
        }
    } catch (err) {
        _this.debug(err);
    }
}
Funraise.prototype.setFundraisingInfo = function (fundraisingInfo) {
    var _this = this;
    _this.fundraiserProfileImage = fundraisingInfo.fundraiserProfileImage;
    _this.goalAmount = fundraisingInfo.goalAmount;
    _this.pageId = fundraisingInfo.pageId;
    _this.raisedAmount = fundraisingInfo.raisedAmount || 0;
    _this.showComment = fundraisingInfo.showComment || false;
    if (_this.showComment) {
        document.getElementById('allowCommentInput' + _this.formKey).style.display = 'initial';
    } else {
        document.getElementById('allowCommentInput' + _this.formKey).style.display = 'none';
    }
}
Funraise.prototype.updateFundraisingHeader = function () {
    var _this = this;
    if (_this.fundraiserProfileImage) {
        _this.$j('#header').removeClass('no-logo');
        _this.$j('#headerAmountContainer').removeClass('header__amount--no-logo');
        _this.$j('#header-logo').fhide();
        var fundraiserImage = _this.$j('#fundraiser-image');
        fundraiserImage.attr('src', _this.fundraiserProfileImage);
        fundraiserImage.fshow();
    } else {
        _this.$j('#fundraiser-image').fhide();
        _this.$j('#header-logo').fshow();
        if (!_this.$j('#header-logo').length) {
            _this.$j('#header').addClass('no-logo');
            _this.$j('#headerAmountContainer').addClass('header__amount--no-logo');
        }
    }
    if (_this.goalAmount && _this.raisedAmount !== undefined && _this.raisedAmount !== null) {
        _this.$j('#header').addClass('header--goal');
        _this.$j('#header-goal').fshow();
        var percentRaised = _this.getPercentRaised() + '%';
        _this.$j('#header-goal-text').fshow();
        _this.$j('#header-goal-percent').html(percentRaised);
        _this.$j('#header-goal-progress').animate({
            width: percentRaised
        });
    } else {
        _this.$j('#header-goal').fhide();
        _this.$j('#header').removeClass('header--goal');
        _this.$j('#header-goal-text').fhide();
    }
    if (!_this.pageId && window.funraiseCampaignSite) {
        _this.pageId = window.funraiseCampaignSite.homepage.id;
    }
}
Funraise.prototype.getPercentRaised = function () {
    var _this = this;
    return Math.floor((_this.raisedAmount + _this.parseFloat(_this.getAmount())) / _this.goalAmount * 100);
}
Funraise.prototype.getOverride = function (prop) {
    var urlOverride = this.gup('x_' + prop, window.location.href);
    if (urlOverride) return urlOverride;
    if (this.donor) return this.donor[prop];
}
Funraise.prototype.getAddress = function () {
    var _this = this;
    var address = null;
    var address1 = null;
    var address2 = null;
    if (_this.$j('#address2').length > 0) {
        address1 = (_this.$j('#address1').val() || '').trim();
        address2 = (_this.$j('#address2').val() || '').trim();
        address = (address1 + ' ' + address2).trim();
    } else {
        address = (_this.$j('#address').val() || '').trim();
    }
    return {
        address: address.trim(),
        address1: (address1 || address).trim(),
        address2: (address2 || '').trim(),
    };
}
Funraise.prototype.setAddress = function (address, address1, address2) {
    var _this = this;
    if (typeof address !== 'string' || address.length < 1) {
        address = null;
    }
    if (typeof address1 !== 'string' || address1.length < 1) {
        address1 = null;
    }
    if (typeof address2 !== 'string' || address2.length < 1) {
        address2 = null;
    }
    if (address1 && _this.$j('#address2').length > 0) {
        _this.$j('#address1').val(address1.trim());
        _this.$j('#address2').val((address2 || '').trim());
    } else if (address1) {
        address = (address1 + ' ' + (address2 || '')).trim();
        _this.$j('#address').val(address);
    } else if (address && _this.$j('#address1').length > 0) {
        _this.$j('#address1').val(address.trim());
    } else if (address) {
        _this.$j('#address').val(address.trim());
    }
}
Funraise.prototype.setOverrides = function () {
    var _this = this;
    var p1 = _this.getOverride('p1');
    var p2 = _this.getOverride('p2');
    var p3 = _this.getOverride('p3');
    var p4 = _this.getOverride('p4');
    var freq = _this.getOverride('frequency');
    if (p1 > 0) _this.modifyAmountButton('#preset1', p1);
    if (p2 > 0) _this.modifyAmountButton('#preset2', p2);
    if (p3 > 0) _this.modifyAmountButton('#preset3', p3);
    if (p4 > 0) _this.modifyAmountButton('#preset4', p4);
    if (freq) _this.$j('#frequency').val(freq);
    var fname = _this.getOverride('fname');
    var lname = _this.getOverride('lname');
    var email = _this.getOverride('email');
    var phone = _this.getOverride('phone');
    if (fname) _this.$j('#first_name').val(fname);
    if (lname) _this.$j('#last_name').val(lname);
    if (email) _this.$j('#email').val(email);
    if (phone) _this.$j('#phone').val(phone);
    var address = _this.getOverride('address');
    var address1 = _this.getOverride('address1');
    var address2 = _this.getOverride('address2');
    _this.setAddress(address, address1, address2);
    var city = _this.getOverride('city');
    var state = _this.getOverride('state');
    var postal = _this.getOverride('postal');
    var country = _this.getOverride('country');
    if (city) _this.$j('#city').val(city);
    if (state) _this.$j('#state').val(state);
    if (postal) _this.$j('#postalCode').val(postal);
    if (country) _this.$j('#country').val(country);
    var title = _this.getOverride('title');
    var amount = _this.getOverride('amount');
    if (title) _this.getText(_this.$j('#title').html(title));
    if (amount && amount > 0) {
        _this.preSelectButton = null;
        _this.setAmount(amount);
    }
    if (_this.$j('#fc').data('tags')) {
        _this.tags = _this.$j('#fc').data('tags');
    }
}
Funraise.prototype.setupPresets = function () {
    var _this = this;
    _this.$j('#preset1').removeClass('active');
    _this.$j('#preset2').removeClass('active');
    _this.$j('#preset3').removeClass('active');
    _this.$j('#preset4').removeClass('active');
    if (_this.preSelectButton) {
        _this.setPresetActive(_this.preSelectButton);
    }
    if (_this.prefill > 0 && _this.isFixedAmount) {
        _this.setAmount(_this.prefill);
    }
}
Funraise.prototype.setPresetActive = function (id) {
    var _this = this;
    _this.$j('#preset' + id).toggleClass('active');
    _this.setAmount(_this.$j('#preset' + id).data('amount'), true);
}
Funraise.prototype.setupAllocations = function () {
    var _this = this;
    if (_this.allocations) {
        _this.allocations.forEach(function (e) {
            _this.$j('#allocations').append(_this.$('<option>', {
                class: 'i18n',
                value: e.id,
                text: _this.getText('Donate to') + ' ' + e.allocationName,
            }));
        });
    }
    if (!_this.allocations || _this.$(_this.id("#allocations") + " option").length < 2) {
        _this.$j('#allocations-form-group').fhide();
    }
}
Funraise.prototype.setupFrequencies = function () {
    var _this = this;
    _this.$(_this.id("#frequency") + " option").each(function () {
        if (!(_this.allowedFrequencies.indexOf(_this.$(this).val()) > -1)) {
            _this.$(this).remove();
        }
    });
    if (_this.$(_this.id("#frequency") + " option").length === 1) {
        _this.$j('#frequency').fhide();
    }
}
Funraise.prototype.setupAutoComplete = function () {
    var _this = this;
    var company = document.getElementById('company' + _this.formKey);
    var companyMatchInput = document.getElementById('company_match_input' + _this.formKey);
    var pendingXHR;
    var debounce = function (fn) {
        var timeout;
        return function () {
            clearTimeout(timeout);
            if (pendingXHR) pendingXHR.abort();
            timeout = setTimeout(fn, 200);
        };
    }
    var onChangeCompany = function (event) {
        var name = event.target.getAttribute('data-name');
        var matchAmount = event.target.getAttribute('data-min-amount-matched');
        var company = document.getElementById('company' + _this.formKey);
        if (name && matchAmount) {
            company.value = name;
            company.setAttribute('data-name', name);
            company.setAttribute('data-min-amount-matched', matchAmount);
        }
    };
    var removeCompanyList = function (event) {
        var companyList = document.getElementById('company_list' + _this.formKey);
        if (!companyList) return;
        companyList.parentNode.removeChild(companyList);
    }
    companyMatchInput.addEventListener('click', onChangeCompany);
    companyMatchInput.addEventListener('click', removeCompanyList);
    var buildCompanyList = function () {
        company.removeAttribute('data-name');
        company.removeAttribute('data-min-amount-matched')
        pendingXHR = _this.$.ajax({
            type: 'GET',
            url: _this.endpoint + '/api/v1/ddcompanies?q=' + _this.$j('#company').val(),
            success: function (data) {
                removeCompanyList();
                var list = document.createElement('ul');
                list.id = 'company_list' + _this.formKey;
                for (var i = 0; i < data.length; i++) {
                    var item = document.createElement('li');
                    item.className += 'i18n';
                    var anchor = document.createElement('a');
                    anchor.setAttribute("data-min-amount-matched", data[i].min);
                    anchor.setAttribute("data-name", data[i].name);
                    anchor.appendChild(document.createTextNode(data[i].name));
                    item.appendChild(anchor);
                    list.appendChild(item);
                }
                companyMatchInput.appendChild(list);
            }
        });
    };
    _this.$j('#company').on('keyup', debounce(buildCompanyList));
}
Funraise.prototype.buildStatePicklist = function (countryCode) {
    var _this = this;
    var stateCountry = _this.stateCountry;
    _this.$j('#state').replaceWith(_this.$('<select>', {
        id: _this.id('state'),
        name: 'state',
        class: 'form-control top-border-white'
    }));
    _this.$j('#state').empty();
    if (stateCountry[countryCode].states && stateCountry[countryCode].states.length > 0) {
        var statePicklist = _this.$j('#state');
        statePicklist.append(_this.$('<option>', {
            value: '',
            text: 'State'
        }));
        stateCountry[countryCode].states.forEach(function (state) {
            statePicklist.append(_this.$('<option>', {
                class: 'i18n',
                value: state[0],
                text: state[0]
            }));
        });
    } else {
        _this.$j('#state').replaceWith(_this.$('<input>', {
            id: _this.id('state'),
            name: 'state',
            class: 'form-control top-border-white',
            placeholder: "State",
            style: "-webkit-appearance: none;"
        }));
    }
}
Funraise.prototype.buildStateCountryPicklist = function () {
    var _this = this;
    var stateCountry = _this.stateCountry;
    _this.$j('#country').replaceWith(_this.$('<select>', {
        id: _this.id('country'),
        name: 'country',
        class: 'form-control top-border-white'
    }));
    _this.$j('#country').change(function () {
        var key = _this.$(this).find(':selected').data('code');
        _this.buildStatePicklist(key);
    });
    Object.keys(stateCountry).forEach(function (countryKey) {
        _this.$j('#country').append(_this.$('<option>', {
            'data-code': countryKey,
            class: 'i18n',
            value: stateCountry[countryKey].name,
            text: stateCountry[countryKey].name
        }));
    });
    _this.buildStatePicklist("US");
}
Funraise.prototype.linkCSS = function () {
    var _this = this;
    _this.$('<link>', {
        rel: 'stylesheet',
        type: 'text/css',
        href: this.cloudfrontUrl + '/widget/client' + _this.assetPath + (Boolean(_this.isPopup) ? '' : '/embed') + '/funraise.css'
    }).appendTo('head');
}
Funraise.prototype.loadStateCountryData = function () {
    var _this = this;
    _this.$.ajax({
        type: 'GET',
        url: _this.cloudfrontUrl + '/widget/common/' + _this.version + '/js/state-country.json',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        async: true,
        error: function (xhr, status, error) {
            _this.debug(error);
        },
        success: function (data) {
            _this.stateCountry = data;
            _this.loadAssetCounter();
        }
    });
}
Funraise.prototype.loadHtml = function () {
    var _this = this;
    _this.$.ajax({
        type: 'GET',
        url: _this.cloudfrontUrl + '/widget/client' + _this.assetPath + (Boolean(_this.isPopup) ? '' : '/embed') + '/widget.html',
        dataType: 'html',
        async: true,
        success: function (data) {
            _this.$j('#fc').html(data);
            _this.loadAssetCounter();
        }
    });
}
Funraise.prototype.loadSettings = function () {
    var _this = this;
    _this.$.ajax({
        type: 'GET',
        url: _this.cloudfrontUrl + '/widget/client' + _this.assetPath + '/widget-settings.json',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        async: true,
        error: function (xhr, status, error) {
            _this.debug(error);
        },
        success: function (settings) {
            _this.setDefaults(settings);
            if (_this.structuredStateCountry) {
                _this.loadStateCountryData();
            }
            _this.loadHtml();
        }
    });
}
Funraise.prototype.setupInputHandlers = function () {
    var _this = this;
    _this.$j('#frequency').change(function () {
        if (_this.$(this).val() !== 'o') {
            _this.$j('#donation_title').html(_this.getText('Your recurring donation'));
        } else {
            _this.$j('#donation_title').html(_this.getText('Your donation'));
        }
    });
    _this.$j('#js-try-again').on('click', function () {
        _this.reset();
    });
    _this.$j('#paymentType').change(function () {
        var type = _this.$(this).val();
        if (type === 'card' || type === 'check') {
            _this.$j('#frequency').fshow();
        } else {
            _this.forceOneTime();
        }
    });
    _this.$j('#frequency').change(function () {
        if (_this.$(this).val() !== 'o') {
            if (_this.getPaymentType() !== 'card' && _this.getPaymentType() !== 'check') {
                _this.$j('#paymentType').val('card');
            }
        }
    });
    _this.$j('#allow-comment').change(function () {
        if (_this.$(this)[0].checked === true) {
            _this.$j('#comment').fshow();
        } else {
            _this.$j('#comment').fhide();
        }
    });
    _this.$j('#next').on('click', function () {
        _this.donationForm.next();
    });
    _this.$j('#prev').on('click', function () {
        _this.donationForm.prev();
    });
}
Funraise.prototype.setupPlaced = function () {
    var _this = this;
    _this.$j('#donateModal').fadeIn(1000);
    _this.sendEvent('embedded_launched');
}
Funraise.prototype.setupPopup = function () {
    var _this = this;
    _this.$j('#donateModal').on('hidden.bs.modal', function () {
        _this.reset();
        _this.sendEvent('popup_hidden');
    });
    _this.$j('#donateModal').on('show.bs.modal', function (e) {
        var button = e.relatedTarget;
        var amount = _this.$(button).data('amount');
        if (amount && amount > 0) {
            _this.preSelectButton = null;
            _this.prefill = null;
            _this.setAmount(amount);
        }
        var frequency = _this.$(button).data('frequency');
        if (frequency) {
            _this.$j('#frequency').val(frequency);
        }
        _this.resetHeader();
        _this.updateHeader();
        _this.setupPresets();
        if (_this.isHeaderVisible() && !_this.getAmount()) {
            _this.setPresetActive(1);
            _this.updateHeader();
        }
        _this.sendEvent('popup_launched');
    });
    if (_this.isPopup && _this.isMobile()) {
        _this.$j('#donateModal').find('#ssl-icon').fhide();
    }
}
Funraise.prototype.setup = function () {
    var _this = this;
    _this.$(document).ready(function () {
        _this.$j('#operationsTipPercent').text(_this.getTipPercent());
        if (_this.useDefaultButton === false) {
            _this.$j('#popup-btn').fhide();
        }
        _this.$('body').tooltip({
            selector: '[data-toggle=tooltip]',
            container: _this.id('#donateModal')
        });
        if (_this.allowPledges && _this.pledgeCollectionDate) {
            var today = new Date(new Date().setHours(0, 0, 0, 0));
            var comparisonDate = new Date(new Date(_this.pledgeCollectionDate).setHours(0, 0, 0, 0));
            if (comparisonDate >= today) {
                _this.showPledge(true);
            }
        }
        _this.setOverrides();
        _this.setupFrequencies();
        _this.setupAllocations();
        _this.setupCreditCardExpire();
        _this.setupMulticurrency();
        if (_this.structuredStateCountry) {
            _this.buildStateCountryPicklist();
        }
        _this.setupSpreedly();
        _this.donationForm = _this.initStateMachine('amount', _this.setupValidation());
        _this.setupInputHandlers();
        if (_this.isPopup) {
            _this.setupPopup();
        } else {
            _this.setupPlaced();
        }
        _this.$j('#comment').fhide();
        if (_this.isRecurring()) {
            _this.$j('#donation_title').html(_this.getText('Your recurring donation'));
            _this.$j('#selectAmount').html(_this.getText('Select recurring donation amount'));
        }
        _this.updateText();
        if (_this.useDonorStore) {
            _this.inflateDonor();
        }
        _this.updateHeader();
        if (_this.setupCallback) {
            try {
                _this.setupCallback();
            } catch (err) {
                _this.debug(err);
            }
        }
    });
}
Funraise.prototype.forceOneTime = function () {
    var _this = this;
    _this.$j('#frequency').val('o');
    _this.$j('#donation_title').html(_this.getText('Your donation'));
    _this.$j('#selectAmount').html(_this.getText('Select donation amount'));
    _this.$j('#frequency').fhide();
}
Funraise.prototype.setupCreditCardExpire = function () {
    var _this = this;
    var d = new Date();
    var n = d.getFullYear();
    if (n < 1900) n = n + 1900;
    for (var i = 0; i < 30; i++) {
        _this.$j('#year').append(_this.$('<option>', {
            value: n + i,
            text: n + i
        }));
    }
}
Funraise.prototype.isHeaderVisible = function () {
    var _this = this;
    return Boolean(_this.preSelectButton) || Boolean(_this.widgetImageUrl) || Boolean(_this.isFixedAmount) || Boolean(_this.goalAmount) || Boolean(_this.fundraiserProfileImage) || Boolean(_this.parseFloat(_this.getAmount()));
}
Funraise.prototype.handleInput = function (data) {
    var _this = this;
    if (data["cardType"]) {
        _this.$j('#credit_card_icon').removeClass();
        switch (data["cardType"]) {
            case 'visa':
                _this.$j('#credit_card_icon').addClass('fa fa-cc-visa fa-2x');
                break;
            case 'american_express':
                _this.$j('#credit_card_icon').addClass('fa fa-cc-amex fa-2x');
                break;
            case 'master':
                _this.$j('#credit_card_icon').addClass('fa fa-cc-mastercard fa-2x');
                break;
            case 'discover':
                _this.$j('#credit_card_icon').addClass('fa fa-cc-discover fa-2x');
                break;
            default:
                _this.$j('#credit_card_icon').addClass('fa fa-credit-card fa-2x');
        }
    }
    if (data["validNumber"]) {
        _this.creditCardValid = true;
        _this.$j('#credit_card_icon').html('<i class="fa fa-check check-valid-position"></i>');
    } else {
        _this.$j('#credit_card_icon').html('<i class="fa fa-close check-invalid-position"></i>');
        _this.creditCardValid = false;
    }
    if (data["validCvv"]) {
        _this.ccvValueValid = true;
    } else {
        _this.ccvValueValid = false;
    }
}
Funraise.prototype.setupValidation = function () {
    var _this = this;
    _this.$.validator.addMethod('amountPositive', function (value, element, arg) {
        value = _this.parseFloat(value);
        return !isNaN(value) && value > 0;
    }, function (params, element) {
        return _this.getText('Amount is required');
    });
    _this.$.validator.addMethod('amountMinimum', function (value, element, arg) {
        value = _this.parseFloat(value);
        return value >= _this.minAmount;
    }, function (params, element) {
        return _this.getText('Amount must be at least $' + _this.formatMoney(_this.minAmount));
    });
    _this.$.validator.addMethod('amountMaximum', function (value, element, arg) {
        value = _this.parseFloat(value);
        return value <= _this.maxAmount;
    }, function (params, element) {
        return _this.getText('Amount must be at most $' + _this.formatMoney(_this.maxAmount));
    });
    _this.$.validator.addMethod('valueNotEquals', function (value, element, arg) {
        return arg != value;
    });
    _this.$.validator.addMethod('validateYear', function (value, element, arg) {
        var month = _this.$j('#month').val();
        var year = _this.$j('#year').val();
        var cMonth = (new Date()).getMonth() + 1;
        var cYear = (new Date()).getYear() + 1900;
        return year !== '' && month !== '' && ((month >= cMonth && year == cYear) || year > cYear);
    }, function (params, element) {
        var month = _this.$j('#month').val();
        var year = _this.$j('#year').val();
        var date = new Date();
        var currentYear = date.getFullYear();
        var currentMonth = date.getMonth();
        if (year === '' || year === undefined) {
            return _this.getText('Year is required');
        } else if (year < currentYear) {
            return _this.getText('Must be a valid Year');
        } else {
            return _this.getText('Must be a valid Year and Month');
        }
    });
    _this.$.validator.addMethod('validateMonth', function (value, element, arg) {
        var month = _this.$j('#month').val();
        return month >= 1;
    }, function (params, element) {
        var month = _this.$j('#month').val();
        if (month === '' || month === undefined) {
            return _this.getText('Month is required');
        }
    });
    _this.$.validator.addMethod('validateMinimumAmount', function (value, element, arg) {
        var amount, success, msg, minAmount, company;
        if (!_this.$j('#match').is(':checked')) return true;
        amount = _this.getAmount();
        company = document.getElementById('company' + _this.formKey);
        minAmount = company.getAttribute('data-min-amount-matched');
        minAmount = _this.parseFloat(minAmount);
        success = (amount >= minAmount);
        if (!success) {
            if (isNaN(minAmount)) {
                msg = '<span class="error"><b>' + _this.getText('A company with that name does not exist') + '</b></span><br />';
            } else {
                msg = '<span class="error"><b>' + _this.getText('Amount is less than the specified company match of') + ' ' + minAmount + '</b></span><br/>';
            }
            _this.$('.match__error').html(msg);
        } else {
            _this.$('.match__error').empty();
        }
        return success;
    });
    var rules = {
        first_name: 'required',
        last_name: 'required',
        amount: {
            amountPositive: '',
            amountMinimum: '',
            amountMaximum: ''
        },
        bank_name: 'required',
        bank_routing_number: 'required',
        bank_account_number: 'required',
        postalCode: 'required',
        month: {
            validateMonth: ''
        },
        year: {
            validateYear: ''
        },
        company: {
            required: _this.id('#match') + ':checked',
            validateMinimumAmount: ''
        },
        employeeEmail: {
            required: _this.id('#match') + ':checked',
            email: true
        },
        dedicationName: {
            required: _this.id('#dedication') + ':checked'
        },
        dedicationEmail: {
            required: _this.id('#dedication') + ':checked',
            email: true
        },
        dedicationType: {
            required: _this.id('#dedication') + ':checked'
        },
        dedicationMessage: {
            required: _this.id('#dedication') + ':checked'
        },
        email: {
            required: true,
            email: true
        }
    };
    if (_this.phoneRequired === 'required') {
        rules.phone = 'required';
    }
    if (_this.addressRequired === 'required') {
        rules.address = 'required';
        rules.city = 'required';
        rules.state = 'required';
        rules.country = 'required';
    }
    rules.postalCode = 'required';
    var form = _this.$j('#donateForm').validate({
        focusInvalid: true,
        onclick: function (element) {
            if (_this.$(element).hasClass('has-error')) {
                _this.$(element).valid();
                if (_this.$(element).is(_this.$j("#month"))) {
                    _this.$j('#year').valid();
                }
            }
        },
        onfocusout: false,
        onkeyup: function (element) {
            if (_this.$(element).hasClass('has-error')) {
                _this.$(element).valid();
            }
        },
        ignore: '',
        rules: rules,
        messages: {
            postalCode: {
                required: _this.getText('Zip code is required'),
            }
        },
        errorPlacement: function (error, element) {
            if (element.prev().is('span.input-group-addon')) {
                error.appendTo(element.parent().parent());
            } else if (_this.$j('#credit_card_icon').length > 0) {
                _this.$j('#errorBox').append(error).append('<br/>');
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function (element) {
            _this.$(element).addClass('has-error');
        },
        unhighlight: function (element) {
            _this.$(element).removeClass('has-error');
        }
    });
    return form;
}
Funraise.prototype.updateCurrency = function (currency) {
    var _this = this;
    var p1 = _this.multicurrency[currency].p1;
    var p2 = _this.multicurrency[currency].p2;
    var p3 = _this.multicurrency[currency].p3;
    var p4 = _this.multicurrency[currency].p4;
    if (p1 > 0) _this.modifyAmountButton('#preset1', p1);
    if (p2 > 0) _this.modifyAmountButton('#preset2', p2);
    if (p3 > 0) _this.modifyAmountButton('#preset3', p3);
    if (p4 > 0) _this.modifyAmountButton('#preset4', p4);
    var symbol = _this.multicurrency[currency].symbol;
    _this.$j('#p1-symbol').html(symbol);
    _this.$j('#p2-symbol').html(symbol);
    _this.$j('#p3-symbol').html(symbol);
    _this.$j('#p4-symbol').html(symbol);
    _this.$j('#amount-symbol').html(symbol);
    _this.$j('#header-symbol').html(symbol);
}
Funraise.prototype.setupMulticurrency = function () {
    var _this = this;
    if (!_this.multicurrency) {
        _this.$j('#currency').fhide();
    } else {
        _this.$j('#currency').fshow();
        var defaultCurrency = null;
        var numCurrencies = 0;
        for (var property in _this.multicurrency) {
            if (_this.multicurrency.hasOwnProperty(property)) {
                if (!defaultCurrency) {
                    defaultCurrency = property;
                }
                _this.$j('#currency').append('<option class="i18n" id="' + property + _this.formKey + '"value="' + property + '">' + property + '</option>');
                numCurrencies++;
            }
        }
        if (numCurrencies < 2) {
            _this.$j('#currency').fhide();
            _this.$j('#currency').val(defaultCurrency);
        }
        _this.updateCurrency(defaultCurrency);
        _this.$j('#currency').change(function () {
            var currency = _this.$j('#currency').val();
            _this.updateCurrency(currency);
        });
    }
}
Funraise.prototype.setupSpreedly = function () {
    var _this = this;
    if (_this.spreedlyFrame) {
        _this.spreedlyFrame.removeHandlers();
    }
    _this.spreedlyFrame = new SpreedlyPaymentFrame();
    _this.spreedlyFrame.init(_this.spreedlyEnvKey, {
        'numberEl': 'spreedly-number' + _this.formKey,
        'cvvEl': 'spreedly-cvv' + _this.formKey
    });
    _this.spreedlyFrame.on('paymentMethod', function (token, pmData) {
        if (_this.preventSubmit) return;
        _this.preventSubmit = true;
        _this.createDonation(token);
    });
    _this.spreedlyFrame.on('fieldEvent', function (name, event, activeElement, inputData) {
        if (event == 'input') {
            _this.handleInput(inputData)
        }
    })
    _this.spreedlyFrame.on('errors', function (errors) {
        sendEvent('spreedly_error');
    });
    _this.spreedlyFrame.on('ready', function () {
        _this.$(document).ready(function () {
            var inputStyleJson = _this.$j('#first_name').getStyleObject();
            delete inputStyleJson.width;
            delete inputStyleJson.fontFamily;
            delete inputStyleJson.margin;
            inputStyleJson.marginLeft = '0px';
            var inputStyle = _this.flattenStyles(inputStyleJson);
            _this.spreedlyFrame.setStyle('number', inputStyle);
            _this.spreedlyFrame.setStyle('number', 'color: #414042');
            _this.spreedlyFrame.setStyle('number', 'border-radius: 4px 0px 0px 0px');
            _this.spreedlyFrame.setStyle('number', 'border-top: solid 1px #d1d0d2');
            _this.spreedlyFrame.setStyle('number', 'border-right: solid 1px #ffffff');
            _this.spreedlyFrame.setStyle('number', 'border-bottom: solid 1px #d1d0d2');
            _this.spreedlyFrame.setStyle('number', 'border-left: solid 1px #d1d0d2');
            _this.spreedlyFrame.setStyle('number', 'height: 44px');
            _this.spreedlyFrame.setStyle('number', 'width: 100%');
            _this.spreedlyFrame.setStyle('cvv', inputStyle);
            _this.spreedlyFrame.setStyle('cvv', 'border-radius: 0px 4px 0px 0px');
            _this.spreedlyFrame.setStyle('cvv', 'border-top: solid 1px #d1d0d2');
            _this.spreedlyFrame.setStyle('cvv', 'border-right: solid 1px #d1d0d2');
            _this.spreedlyFrame.setStyle('cvv', 'border-bottom: solid 1px #d1d0d2');
            _this.spreedlyFrame.setStyle('cvv', 'border-left: solid 1px #d1d0d2');
            _this.spreedlyFrame.setStyle('cvv', 'color: #414042');
            _this.spreedlyFrame.setStyle('cvv', 'height: 44px');
            _this.spreedlyFrame.setStyle('cvv', 'color: #414042');
            _this.spreedlyFrame.setStyle('cvv', 'width: 100%');
            _this.spreedlyFrame.setPlaceholder('number', _this.getText('Card'));
            _this.spreedlyFrame.setPlaceholder('cvv', _this.getText('cvv'));
        });
    });
}
Funraise.prototype.setDefaults = function (settings) {
    var _this = this;
    if (settings.currency && !_this.multicurrency) {
        _this.multicurrency = {};
        _this.multicurrency[settings.currency] = {
            symbol: settings.symbol,
            p1: settings.preset1,
            p2: settings.preset2,
            p3: settings.preset3,
            p4: settings.preset4
        };
    }
    this.allocations = this.getDefault(this.allocations, settings.allocations);
    this.structuredStateCountry = this.getDefault(this.structuredStateCountry, settings.structuredStateCountry);
    this.allowedFrequencies = this.getDefault(this.allowedFrequencies, settings.allowedFrequencies);
    this.formName = this.getDefault(this.formName, settings.formName);
    this.isFixedAmount = this.getDefault(this.isFixedAmount, settings.isFixedAmount);
    this.prefill = this.getDefault(this.prefill, settings.prefill);
    this.spreedlyEnvKey = this.getDefault(this.spreedlyEnvKey, settings.spreedlyEnvKey);
    this.endpoint = this.getDefault(this.endpoint, settings.endpoint);
    this.formUniqId = this.getDefault(this.formUniqId, settings.formUniqId);
    this.tags = this.getDefault(this.tags, settings.tags);
    this.preSelectButton = this.getDefault(this.preSelectButton, settings.preSelectButton);
    this.phoneRequired = this.getDefault(this.phoneRequired, settings.phoneRequired);
    this.addressRequired = this.getDefault(this.addressRequired, settings.addressRequired);
    this.isPopup = this.getDefault(this.isPopup, settings.isPopup);
    this.donor = this.getDefault(this.donor, settings.donor);
    this.symbol = this.getDefault(this.symbol, settings.symbol);
    this.currency = this.getDefault(this.currency, settings.currency);
    this.allowPledges = this.getDefault(this.allowPledges, settings.allowPledges);
    this.pledgeCollectionDate = this.getDefault(this.pledgeCollectionDate, settings.pledgeCollectionDate);
    this.formKey = '-' + this.formUniqId;
    this.widgetImageUrl = settings.widgetImageUrl;
}
Funraise.prototype.init = function () {
    var _this = this;
    if (_this.hasAlreadyBeenInitialized) {
        return;
    }
    _this.hasAlreadyBeenInitialized = true;
    if (_this.structuredStateCountry) {
        _this.EXTERNAL_ASSETS++;
    }
    _this.loadScript('https://core.spreedly.com/iframe/iframe-v1.min.js', function () {
        _this.loadAssetCounter();
    });
    _this.loadScript(_this.cloudfrontUrl + '/widget/common/' + _this.version + '/js/libs.js', function () {
        _this.$ = window.jQuery.noConflict(true);
        _this.$(window).on('funraiseSetupReady', function (e) {
            if (_this.recaptchaKey) {
                var nextFunctionName = function () {
                    return "fr_recaptcha_func_" + new Date().getTime();
                };
                var functionName = nextFunctionName()
                while (window[functionName]) {
                    functionName = nextFunctionName();
                }
                window[functionName] = function (token) {
                    _this.recaptchaResponse = token;
                    _this.solvedRecaptcha = true;
                }
                _this.$j('#recaptcha').attr('data-sitekey', _this.recaptchaKey);
                _this.$j('#recaptcha').attr('data-callback', functionName);
                _this.loadScript('https://www.google.com/recaptcha/api.js', function () {
                    _this.$j('#recaptcha__outer-container').fshow();
                });
            }
            _this.setup();
        });
        _this.linkCSS();
        _this.loadSettings();
        _this.loadAssetCounter();
        _this.addHelpers();
        initfunraiseBootstrap(_this.$);
        _this.loadAssetCounter();
        initQueryValidate(_this.$);
        _this.loadAssetCounter();
    });
}
Funraise.prototype.getElementByName = function (name) {
    var _this = this;
    var arr = document.getElementsByName(name);
    for (var i = 0; i < arr.length; i++) {
        var e = arr[i];
        if (e.id && e.id.indexOf(_this.formKey) !== -1) {
            return e;
        }
    }
}
Funraise.prototype.getFormData = function (form) {
    var _this = this;
    var $paymentType = this.$j('#paymentType');
    var isDisabled = $paymentType.attr('disabled');
    if (isDisabled) {
        $paymentType.removeAttr('disabled');
    }
    var unindexed_array = form.serializeArray();
    if (isDisabled) {
        $paymentType.attr('disabled', 'disabled');
    }
    var indexed_array = {};
    _this.$.map(unindexed_array, function (n, i) {
        var e = _this.getElementByName(n.name);
        if (e && e.type === 'checkbox') {
            n.value = n.value === 'on' ? true : false;
        }
        if (n.name === 'paymentOptions') {
            if (n.value === 'pledge') {
                indexed_array['pledge'] = true;
            }
        } else {
            indexed_array[n.name] = n.value;
        }
    });
    return indexed_array;
}
Funraise.prototype.parseFloat = function (toFloat) {
    if (typeof (toFloat) === "string") {
        toFloat = toFloat.replace(/,/g, '');
    }
    return Math.round(parseFloat(toFloat) * 100) / 100;
}
Funraise.prototype.gup = function (name, url) {
    if (!url) url = location.href;
    url = decodeURIComponent(url);
    name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
    var regexS = '[\\?&]' + name + '=([^&#]*)';
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? null : results[1];
}
Funraise.prototype.flattenStyles = function (json) {
    var styles = '';
    for (var p in json) {
        styles += p + ': ' + json[p] + '; ';
    }
    return styles;
}
Funraise.prototype.loadScript = function (url, callback) {
    var _this = this;
    var scriptTag = document.createElement('script');
    scriptTag.setAttribute('type', 'text/javascript');
    scriptTag.setAttribute('src', url);
    if (typeof callback !== 'undefined') {
        if (scriptTag.readyState) {
            scriptTag.onreadystatechange = function () {
                if (this.readyState === 'complete' || this.readyState === 'loaded') {
                    callback();
                }
            };
        } else {
            scriptTag.onload = callback;
        }
    }
    (document.getElementsByTagName('head')[0] || document.documentElement).appendChild(scriptTag);
}
Funraise.prototype.e = function (element_id) {
    var _this = this;
    return _this.$(document.getElementById(_this.id(element_id)));
}
Funraise.prototype.$j = function (element_id) {
    var _this = this;
    return _this.$(_this.id(element_id));
}
Funraise.prototype.id = function (element_id) {
    var _this = this;
    return element_id + _this.formKey;
}
Funraise.prototype.addHelpers = function (tag) {
    var _this = this;
    (function ($) {
        _this.$.fn.getStyleObject = function () {
            var dom = this.get(0);
            var style;
            var returns = {};
            if (window.getComputedStyle) {
                var camelize = function (a, b) {
                    return b.toUpperCase();
                };
                style = window.getComputedStyle(dom, null);
                for (var i = 0, l = style.length; i < l; i++) {
                    var prop = style[i];
                    var camel = prop.replace(/\-([a-z])/g, camelize);
                    var val = style.getPropertyValue(prop);
                    returns[camel] = val;
                }
                return returns;
            }
            if (style = dom.currentStyle) {
                for (var prop in style) {
                    returns[prop] = style[prop];
                }
                return returns;
            }
            return this.css();
        }
        _this.$.fn.fshow = function () {
            if (!this || !this.get(0)) return;
            var old = this.data('fr-prev-disp');
            this.get(0).style.setProperty('display', old);
            this.show();
            return this;
        };
        _this.$.fn.fhide = function () {
            if (!this || !this.get(0)) return;
            var old = this.get(0).style.display;
            this.data('fr-prev-disp', old);
            this.get(0).style.setProperty('display', 'none', 'important');
            this.hide();
            return this;
        };
    })(_this.$);
}
Funraise.prototype.sendEvent = function (event) {
    var _this = this;
    var ga_thisunc = window['ga_' + _this.formUniqId + '_thisunc'];
    if (typeof ga_thisunc === 'function') {
        ga_thisunc('send', 'event', _this.orgName, event, _this.formName);
    }
}
Funraise.prototype.loadAssetCounter = function () {
    if (!this.assets) this.assets = 0;
    this.assets++;
    if (this.assets > this.EXTERNAL_ASSETS) {
        var evt = this.$.Event('funraiseSetupReady');
        this.$(window).trigger(evt);
    }
}
Funraise.prototype.getDefault = function (a, b) {
    if (typeof a !== 'undefined') {
        return a;
    }
    return b;
}
Funraise.prototype.updateText = function () {
    var _this = this;
    var form = _this.$j('#fc');
    form.find('input').each(function (ev) {
        _this.$(this).attr("placeholder", _this.getText(_this.$(this).attr("placeholder")));
    });
    form.find('label').each(function (ev) {
        _this.$(this).text(_this.getText(_this.$(this).text().trim()));
    });
    form.find('.i18n').each(function (ev) {
        _this.$(this).text(_this.getText(_this.$(this).text().trim()));
    });
}
Funraise.prototype.getText = function (str) {
    if (!this.text) return str;
    return this.text[str] ? this.text[str] : str;
}
Funraise.prototype.formatMoney = function (value) {
    var owner = this,
        parts, partInteger, partDecimal = '';
    value = value.toString().replace(/[A-Za-z]/g, '').replace('.', 'M').replace(/[^\dM-]/g, '').replace(/^\-/, 'N').replace(/\-/g, '').replace('N', '').replace('M', '.').replace(/^(-)?0+(?=\d)/, '$1');
    partInteger = value;
    if (value.indexOf('.') >= 0) {
        parts = value.split('.');
        partInteger = parts[0];
        partDecimal = '.' + parts[1].slice(0, 2);
        if (partDecimal.length == 2) {
            partDecimal += '0';
        }
    } else {
        partDecimal = '.00';
    }
    partInteger = partInteger.replace(/(\d)(?=(\d{3})+$)/g, '$1' + ',');
    return partInteger.toString() + (2 > 0 ? partDecimal.toString() : '');
}
Funraise.prototype.isConnected = function (onError) {
    var _this = this;
    if (_this.skipNetworkTests) return;
    if (navigator && !navigator.onLine) {
        onError();
    }
    _this.$.ajax({
        type: 'POST',
        url: _this.endpoint + '/api/v1/public/network/test?rand=' + Math.floor((1 + Math.random()) * 0x10000),
        async: true,
        error: function (xhr, status, error) {
            onError();
        },
        success: function (settings) {}
    });
}
Funraise.prototype.failedDonation = function (response, status, error) {
    var _this = this;
    _this.preventSubmit = false;
    _this.showProgress(false);
    var responseText = (response.responseJSON && response.responseJSON.error) || response.responseText || 'An unknown error has occurred';
    _this.showError(responseText);
    _this.sendEvent('donation_error');
    if (status >= 500) {
        _this.sendCriticalDebug("Funraise::chargePayment", status + ' ' + error + ' ' + responseText);
    }
    if (_this.failedCallback) {
        try {
            _this.failedCallback(_this.getDonor(), _this.getDonation());
        } catch (err) {
            _this.debug(err);
        }
    }
}
Funraise.prototype.sendCriticalDebug = function (tag, error) {
    var _this = this;
    if (_this.disableRemoteLogging) return;
    var logging = new Object();
    try {
        logging.tag = tag;
        logging.donor = _this.getDonor();
        logging.amount = _this.$j('#amount').val();
        logging.referrer = document.referrer;
        logging.location = window.location.href;
        logging.form = _this.formId;
        logging.org = _this.orgId;
        logging.created = (new Date()).getTime();
        logging.error = error;
        if (navigator) logging.ua = navigator.userAgent;
        var payload = btoa(JSON.stringify(logging));
        _this.debug("Logging critical error...");
        _this.$.get(_this.endpoint + '/api/v1/public/errors?data=' + payload, function (data, status) {
            if (status != 200) {
                _this.sendEvent('critical_debug_failed');
                _this.debug("Critical error logged...[FAIL]");
            } else {
                _this.debug("Critical error logged...[OK]");
            }
        });
    } catch (e) {
        _this.sendEvent('critical_debug_failed');
        _this.debug("Critical error logged...[FAIL]");
        _this.debug(e);
    }
}
Funraise.prototype.setCookie = function (cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
Funraise.prototype.getCookie = function (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
Funraise.prototype.isMobile = function () {
    return (window.matchMedia("(max-width : 568px)").matches);
}
Funraise.prototype.debug = function (message) {
    var _this = this;
    if (_this.debugEnabled) {
        console.log(message);
    }
}