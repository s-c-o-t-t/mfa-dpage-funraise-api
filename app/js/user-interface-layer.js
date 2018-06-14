console.log('user-interface-layer.js v18.6.13a');

// GLOBALS
var paymentTokenizerId = 'ODBm2idmYFT3pBge5qxRBjQaWH9';

// DOM OBJECTS
var stepList = document.querySelectorAll('div.giftFormContainer section.step');
var domMainBackButton = document.querySelector('button.goPreviousStep');

/*
Spreedly.on('ready', function () {
	console.log('\n\nSPREEDLY READY', Spreedly);

	//format card number
	Spreedly.setPlaceholder('number', 'Card');
	Spreedly.setFieldType('number', 'text');
	Spreedly.setNumberFormat('prettyFormat');
	Spreedly.setLabel('number', 'Payment card number');

	//format cvv
	Spreedly.setPlaceholder('cvv', 'cvv');
	Spreedly.setLabel('cvv', 'Payment card 3-digit verification code');

	// Spreedly.setValue('number', '4111111111111111');
	// Spreedly.setValue('cvv', '123');
});
Spreedly.on('paymentMethod', function (result) {
	console.log('\n\nSPREEDLY PAYMENT TOKENIZED', result);
});
Spreedly.on('errors', function (errors) {
	console.log('\n\nSPREEDLY REPORTS ERRORS:');
	for (var i = 0; i < errors.length; i++) {
		var error = errors[i];
		console.log(error);
	}
});
*/

buildCurrencySelect();
buildPayMethodSelect();
buildFrequencyButtons(window.mwdspace.payMethodList[0].frequencies);
buildCardExpireYearSelect();

showStep();
// Spreedly.init(paymentTokenizerId, {
// 	numberEl: 'cardNumberTarget',
// 	cvvEl: 'cardCvvTarget',
// });

$('input[type=radio]').change(function () {
	$(this)
		.closest('section')
		.find('input[type=radio]')
		.closest('label')
		.removeClass('selected');
	$(this)
		.closest('label')
		.addClass('selected');
	$('div.giftFormHeaderContainer').slideDown(666);
});

// GENERAL CLICK HANDLER
document.addEventListener('click', function (event) {
	console.log('click', event.target.tagName, event.target.className);
	var clickTarget = $(event.target).closest('button, .clickTarget');
	if (clickTarget) {
		if (clickTarget.hasClass('processDonation')) {
			if (window.mwdspace.donationInProgress) {
				alert("There's already a donation processing.");
				return false;
			}
			var buttonHtml = event.target.getAttribute('data-working');
			if (buttonHtml) {
				event.target.classList.add('blocked');
				event.target.innerHTML = buttonHtml;
			}
			var data = {
				amount: 6.66,
			};
			// Spreedly.tokenizeCreditCard({

			// 	// Required
			// 	"first_name": document.getElementById("first-name").value,
			// 	"last_name": document.getElementById("last-name").value,
			// 	"month": document.getElementById("month").value,
			// 	"year": document.getElementById("year").value,

			// 	// Optional
			// 	"email": document.getElementById("email").value,
			// 	"zip": document.getElementById("zip").value
			//   });
			startDonation(
				data,
				function (donationInfo) {
					console.log('SUCCESS FUNCTION', donationInfo);
					var buttonHtml = event.target.getAttribute('data-success');
					event.target.classList.remove('blocked');
					event.target.innerHTML = buttonHtml;
				},
				function (donationInfo) {
					console.log('FAIL FUNCTION', donationInfo);
					var buttonHtml = event.target.getAttribute('data-error');
					event.target.classList.remove('blocked');
					event.target.classList.add('error');
					event.target.innerHTML = buttonHtml;
				}
			);
		} else if (clickTarget.hasClass('goNextStep')) {
			showStep('payment');
		}
	}
});

function showStep(targetStepName) {
	targetStepName = ensureString(targetStepName);
	if (!targetStepName) {
		targetStepName = getSessionValue('currentStep');
		if (!targetStepName) {
			targetStepName = 'giftAmount';
		}
	}
	$('div.giftFormContainer div.loadingDisplay').hide();
	var thisName;
	stepList.forEach(function (step) {
		thisName = step.getAttribute('data-step-name');

		if (thisName == targetStepName) {
			if (thisName == 'giftAmount') {
				$(domMainBackButton).hide();
			} else {
				$(domMainBackButton).fadeIn(888);
			}
			$(step).fadeIn(666);
		} else {
			$(step).hide();
		}
	});
}

function buildCurrencySelect() {
	try {
		if (!window.mwdspace.currencyList) {
			throw new Error('List of valid currencies not found');
		}
		var domCurrencySelect = document.querySelector('form.mainGiftForm select[name=giftCurrency]');
		if (!domCurrencySelect) {
			throw new Error('Unable to identify the currency select dropdown');
		}
		var domThisOption;
		window.mwdspace.currencyList.forEach(function (item) {
			domThisOption = buildCurrencyOption(item);
			if (domThisOption) {
				domCurrencySelect.appendChild(domThisOption);
			} else {
				console.warn('Unable to add currency:', item);
			}
		});
	} catch (err) {
		console.error('Unable to build the currency select dropdown', err);
	}
}

function buildCurrencyOption(currency) {
	var domOption = null;
	try {
		if (currency.code) {
			domOption = document.createElement('option');
			domOption.setAttribute('value', currency.code);
			domOption.innerText = currency.code + ' ' + (currency.name || '');
		}
	} catch (err) {
		console.error('Unable to build the option element for currency:', currency);
	}
	return domOption;
}

function buildPayMethodSelect() {
	try {
		if (!window.mwdspace.payMethodList) {
			throw new Error('List of valid payment methods not found');
		}
		var domPayMethodSelect = document.querySelector('form.mainGiftForm select[name=payMethod]');
		if (!domPayMethodSelect) {
			throw new Error('Unable to identify the payment method select dropdown');
		}
		var domThisOption;
		window.mwdspace.payMethodList.forEach(function (item) {
			domThisOption = buildPayMethodOption(item);
			if (domThisOption) {
				domPayMethodSelect.appendChild(domThisOption);
			} else {
				console.warn('Unable to add payment method:', item);
			}
		});
	} catch (err) {
		console.error('Unable to build the payment method select dropdown', err);
	}
}

function buildPayMethodOption(method) {
	var domOption = null;
	try {
		if (method.code) {
			domOption = document.createElement('option');
			domOption.setAttribute('value', method.code);
			domOption.innerText = method.description || '';
		}
	} catch (err) {
		console.error('Unable to build the option element for currency:', currency);
	}
	return domOption;
}

function buildFrequencyButtons(frequencyList) {
	try {
		if (!frequencyList) {
			throw new Error('Invalid list of frequencies given');
		}
		var domFrequencyContainer = document.querySelector('form.mainGiftForm div.giftFrequencyContainer');
		if (!domFrequencyContainer) {
			throw new Error('Unable to identify the frequency select dropdown');
		}
		// remove any existing options
		var exitingoptions = domFrequencyContainer.querySelectorAll('div.giftOption');
		exitingoptions.forEach(function (item) {
			item.remove();
		});

		var domThisButton;
		frequencyList.forEach(function (item) {
			domThisButton = buildFrequencyButton(item);
			if (domThisButton) {
				domFrequencyContainer.append(domThisButton);
			} else {
				console.warn('Unable to add frequency:', item);
			}
		});
	} catch (err) {
		console.error('Unable to build the frequency buttons', err);
	}
}

function buildFrequencyButton(frequency) {
	var domButton = null;
	try {
		if (frequency.code) {
			// the container div
			domButton = document.createElement('div');
			domButton.classList.add('giftOption');
			domButton.classList.add('fixed');

			// the label
			var domLabel = document.createElement('label');
			domLabel.classList.add('giftOption');
			domLabel.innerText = frequency.name || 'Unknown';
			domButton.appendChild(domLabel);

			// the radio
			var domRadio = document.createElement('input');
			domRadio.setAttribute('type', 'radio');
			domRadio.setAttribute('name', 'giftFrequency');
			domRadio.setAttribute('value', frequency.code);
			domLabel.appendChild(domRadio);
		}
	} catch (err) {
		console.error('Error building the button for frequency:', frequency, err);
	}
	return domButton;
}

function buildCardExpireYearSelect() {
	try {
		// show only current year and beyond, but with a few days fudge factor
		var recentDate = new Date();
		recentDate.setDate(recentDate.getDate() - 7);
		var startYear = recentDate.getFullYear();
		var yearsToShow = 15;

		var domCardExpireYearSelect = document.querySelector(
			'form.mainGiftForm select[name=payCardExpireYear]'
		);
		if (!domCardExpireYearSelect) {
			throw new Error('Unable to identify the card expire year select dropdown');
		}
		var domThisOption;
		for (var expireYear = startYear; expireYear < startYear + yearsToShow; expireYear++) {
			domThisOption = buildCardExpireYearOption(expireYear);
			if (domThisOption) {
				domCardExpireYearSelect.appendChild(domThisOption);
			} else {
				console.warn('Unable to add card expire year:', expireYear);
			}
		}
	} catch (err) {
		console.error('Unable to build the card expire year select dropdown', err);
	}
}

function buildCardExpireYearOption(year) {
	var domOption = null;
	try {
		if (year) {
			domOption = document.createElement('option');
			domOption.setAttribute('value', year.code);
			domOption.innerText = year;
		}
	} catch (err) {
		console.error('Unable to build the option element for currency:', currency);
	}
	return domOption;
}