"use strict";
(function() {
	if (window.console) console.log("mwd-donate-widget.js v18.7.27");

	window.mwdspace = window.mwdspace || {};

	window.mwdspace.MFA_Funraise_Widget = function(input) {
		var thisWidget = this;
		if (typeof input == "undefined") {
			var input = {};
		}

		thisWidget.isStarted = false;
		thisWidget.isLoaded = false;
		thisWidget.allowAutoScroll = false;
		thisWidget.codeVersion = "1.0.0";

		thisWidget.domTargetElement = {};
		thisWidget.promises = {};
		thisWidget.intervals = {};
		thisWidget.urls = {};
		thisWidget.defaults = {};
		thisWidget.options = {};

		thisWidget.setSystemValues();
		thisWidget.setUserOptions(input);

		var target = document.querySelectorAll(thisWidget.options.element);
		if (!target) {
			if (window.console)
				console.error(
					"MFA_Funraise_Widget(): specified target element not found:",
					thisWidget.options.element
				);
			return false;
		}
		if (target.length > 1) {
			if (window.console)
				console.warn(
					"MFA_Funraise_Widget(): using 1st of multiple target elemets found:",
					thisWidget.options.element
				);
			return false;
		}
		thisWidget.domTargetElement = target[0];
	};

	window.mwdspace.MFA_Funraise_Widget.prototype.setSystemValues = function() {
		var thisWidget = this;

		// LOCATION URLS
		thisWidget.urls.base =
			"https://quiz.mercyforanimals.org/donate-widget/" + thisWidget.codeVersion + "/";
		thisWidget.urls.fontAwesome4 =
			"https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
		thisWidget.urls.fontAwesome5 =
			"https://use.fontawesome.com/releases/v5.1.0/css/all.css";
		thisWidget.urls.specialSelectStyles =
			"https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css";
		thisWidget.urls.specialSelectScript =
			"https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js";
		thisWidget.urls.spreedlyScript = "https://core.spreedly.com/iframe/iframe-v1.min.js";
		thisWidget.urls.jqueryScript = "https://code.jquery.com/jquery-3.3.1.min.js";
		thisWidget.urls.companyMatchApi = "https://platform.funraise.io/api/v1/ddcompanies";
		thisWidget.urls.bitcoinPaymentApi = "https://bitpay.com/";
		thisWidget.urls.testBitcoinPaymentApi = "https://test.bitpay.com/";

		// DEFAULT VALUES
		// Funraise test Spreedly environment key: ECDNSGhIR0fYQisIc1PHH7NX0pN
		// Funraise live Spreedly environment key: KvcTOx3FPBgscLs51rjT848DP7p
		// MWD test environment key: ODBm2idmYFT3pBge5qxRBjQaWH9

		thisWidget.defaults.organizationId = "fcb4d538-ca92-4212-86cc-06d8ac929c4d";
		thisWidget.defaults.formId = 1194;
		thisWidget.defaults.paymentTokenApiKey = "KvcTOx3FPBgscLs51rjT848DP7p";
		thisWidget.defaults.testPaymentTokenApiKey = "ECDNSGhIR0fYQisIc1PHH7NX0pN";
		thisWidget.defaults.minimumGiftAmount = 5;
		thisWidget.defaults.giftStringSingle = [25, 50, 75, 100];
		thisWidget.defaults.giftStringMonthly = [5, 10, 15, 20];
		thisWidget.defaults.currencyCode = "USD";
		thisWidget.defaults.topVisualPaddingSelector = "section#header";

		// OTHER
		thisWidget.payMethodIconHtml = {
			card: '<i class="fa far fa-credit-card" aria-hidden="true"></i>',
			visa: '<i class="fa fab fa-cc-visa" aria-hidden="true"></i>',
			mastercard: '<i class="fa fab fa-cc-mastercard" aria-hidden="true"></i>',
			amex: '<i class="fa fab fa-cc-amex" aria-hidden="true"></i>',
			discover: '<i class="fa fab fa-cc-discover" aria-hidden="true"></i>',
			bitcoin: '<i class="fa fab fa-bitcoin fa-btc" aria-hidden="true"></i>',
		};
	};

	window.mwdspace.MFA_Funraise_Widget.prototype.setUserOptions = function(input) {
		var thisWidget = this;
		if (typeof input == "undefined") {
			var input = {};
		}

		if (typeof input.baseUrlOverride == "string" && input.baseUrlOverride.trim()) {
			thisWidget.urls.base = encodeURI(input.baseUrlOverride);
			if (thisWidget.urls.base.substr(-1) != "/") {
				thisWidget.urls.base += "/";
			}
		}

		// VALIDATE/FINALIZE USER OPTIONS
		if (typeof input.element == "string" && input.element.trim()) {
			thisWidget.options.element = input.element;
		} else {
			if (window.console)
				console.error(
					"MFA_Funraise_Widget(): invalid options - No target element:",
					input
				);
			return false;
		}

		// ENVIRONMENT IDS/KEYS
		// Funraise organization id
		if (typeof input.organizationId != "undefined") {
			thisWidget.options.organizationId = input.organizationId;
		} else {
			thisWidget.options.organizationId = thisWidget.defaults.organizationId;
		}
		// Funraise form id
		if (typeof input.formId != "undefined") {
			thisWidget.options.formId = input.formId;
		} else {
			thisWidget.options.formId = thisWidget.defaults.formId;
		}
		// Spreedly environment key
		if (typeof input.paymentTokenApiKey != "undefined") {
			thisWidget.options.paymentTokenApiKey = input.paymentTokenApiKey;
		} else {
			thisWidget.options.paymentTokenApiKey = thisWidget.defaults.paymentTokenApiKey;
		}

		// MAIN SINGLE GIFT VALUES
		if (typeof input.giftStringSingle == "object" && input.giftStringSingle.length > 0) {
			thisWidget.options.giftStringSingle = input.giftStringSingle;
		} else {
			thisWidget.options.giftStringSingle = thisWidget.defaults.giftStringSingle;
		}
		// MAIN MONTHLY GIFT VALUES
		if (typeof input.giftStringMonthly == "object" && input.giftStringMonthly.length > 0) {
			thisWidget.options.giftStringMonthly = input.giftStringMonthly;
		} else {
			thisWidget.options.giftStringMonthly = thisWidget.defaults.giftStringMonthly;
		}

		// CURRENCIES (and related gift values)
		if (typeof input.defaultCurrency == "string" && input.defaultCurrency.trim()) {
			thisWidget.options.defaultCurrency = input.defaultCurrency;
		} else {
			thisWidget.options.defaultCurrency = false;
		}
		if (typeof input.currencies == "object") {
			thisWidget.options.filterListCurrency = input.currencies;
		} else {
			thisWidget.options.filterListCurrency = false;
		}

		// PAY METHODS
		if (typeof input.defaultPayMethod == "string" && input.defaultPayMethod.trim()) {
			thisWidget.options.defaultPayMethod = input.defaultPayMethod;
		} else {
			thisWidget.options.defaultPayMethod = false;
		}
		if (typeof input.payMethods == "string" && input.payMethods.trim()) {
			// convert given string to array
			thisWidget.options.filterListPayMethod = [input.payMethods];
		} else if (
			input.payMethods &&
			input.payMethods.constructor === Array &&
			input.payMethods.length > 0
		) {
			// use given pay method list as array
			thisWidget.options.filterListPayMethod = input.payMethods;
		} else {
			thisWidget.options.filterListPayMethod = false;
		}

		// FREQUENCIES
		if (typeof input.defaultFrequency == "string" && input.defaultFrequency.trim()) {
			thisWidget.options.defaultFrequency = input.defaultFrequency;
		} else {
			thisWidget.options.defaultFrequency = false;
		}
		if (typeof input.frequencies == "string" && input.frequencies.trim()) {
			// convert given string to array
			thisWidget.options.filterListFrequency = [input.frequencies];
		} else if (
			input.frequencies &&
			input.frequencies.constructor === Array &&
			input.frequencies.length > 0
		) {
			// use given frequency list as array
			thisWidget.options.filterListFrequency = input.frequencies;
		} else {
			thisWidget.options.filterListFrequency = false;
		}

		// FONT AWESOME - no load (use existing), or load either version 4 or 5
		if (typeof input.fontAwesomeVersion == "undefined") {
			thisWidget.options.fontAwesomeVersion = 4;
		} else if (!isNaN(input.fontAwesomeVersion)) {
			thisWidget.options.fontAwesomeVersion = parseInt(input.fontAwesomeVersion);
		} else {
			thisWidget.options.fontAwesomeVersion = null;
		}

		// VARIOUS BOOLEAN OPTIONS
		thisWidget.options.includeCompanyMatch =
			input.includeCompanyMatch === false ? false : true;
		thisWidget.options.includeExtraPercent =
			input.includeExtraPercent === false ? false : true;

		// LABEL OVERRIDES (aka TRANSLATIONS)
		thisWidget.options.labelOverrideObject = false;
		thisWidget.options.labelOverrideFileUrl = false;
		if (typeof input.labelOverride == "string" && input.labelOverride.trim()) {
			thisWidget.options.labelOverrideFileUrl = input.labelOverride;
		} else if (typeof input.labelOverride == "object") {
			thisWidget.options.labelOverrideObject = input.labelOverride;
		}

		// USER CALLBACK FUNCTIONS
		// onLoad
		if (typeof input.onLoad == "function") {
			thisWidget.options.onLoad = input.onLoad;
		} else {
			thisWidget.options.onLoad = false;
		}
		// onDonation
		if (typeof input.onDonation == "function") {
			thisWidget.options.onDonation = input.onDonation;
		} else {
			thisWidget.options.onDonation = false;
		}
	};

	window.mwdspace.MFA_Funraise_Widget.prototype.start = async function() {
		var thisWidget = this;
		if (thisWidget.isStarted) {
			if (window.console) console.warn("MFA_Funraise_Widget already started");
			return;
		}
		thisWidget.isStarted = true;

		thisWidget.domTargetElement.innerHTML = "";

		var promiseFontIconStyles = thisWidget.getFontIconStyles();
		var promiseMainStyles = thisWidget.linkExternalStylesheet(
			thisWidget.urls.base + "css/mwd-donate-widget.css"
		);
		thisWidget.linkExternalStylesheet(thisWidget.urls.specialSelectStyles);
		await Promise.all([promiseFontIconStyles, promiseMainStyles]);

		var widgetHtml, sharedUtilResult;
		var promiseMainHtml = thisWidget.loadFile(
			thisWidget.urls.base + "mwd-donate-widget.html"
		);
		var promiseSharedUtils = thisWidget.linkExternalScript(
			thisWidget.urls.base + "js/shared-utils.js"
		);
		[widgetHtml, sharedUtilResult] = await Promise.all([
			promiseMainHtml,
			promiseSharedUtils,
		]);
		if (!widgetHtml) {
			if (window.console)
				console.error("MFA_Funraise_Widget.start() - unable to load base HTML");
			return;
		}

		var container = document.createElement("div");
		container.id = "mfaDonationWidgetContainer";
		container.style.opacity = 0;
		thisWidget.domTargetElement.appendChild(container);

		container.innerHTML = widgetHtml;

		setTimeout(function() {
			container.className = "reveal";
		}, 1);

		// start Spreedly first bc it has slow response time
		thisWidget.promises.spreedlyIframeScript = thisWidget.linkExternalScript(
			thisWidget.urls.spreedlyScript
		);
		var isJqueryLoaded = await thisWidget.linkExternalScript(thisWidget.urls.jqueryScript);

		// select2 should load after jQuery load complete
		var promiseSpecialSelectCode = thisWidget.linkExternalScript(
			thisWidget.urls.specialSelectScript
		);

		var promiseBusinessLayer = thisWidget.linkExternalScript(
			thisWidget.urls.base + "js/gift-utilities.js"
		);
		var promiseTransactionLayer = thisWidget.linkExternalScript(
			thisWidget.urls.base + "js/transaction-system-layer.js"
		);

		await Promise.all([
			promiseBusinessLayer,
			promiseTransactionLayer,
			promiseSpecialSelectCode,
		]);
		if (isJqueryLoaded) {
			thisWidget.jquery = jQuery.noConflict();
		} else {
			thisWidget.jquery = $ || {};
		}

		thisWidget.run();
	};

	window.mwdspace.MFA_Funraise_Widget.prototype.run = async function() {
		var thisWidget = this;

		if (typeof thisWidget.jquery !== "function") {
			if (window.console) console.error("jQuery (thisWidget.jquery) not found");
			exit();
		}
		var jq = thisWidget.jquery;
		// if (window.console) console.log("MFA_Funraise_Widget using jQuery version", jq.fn.jquery);

		window.mwdspace.userInputData = {};
		window.mwdspace.transactionSendData = {};
		var userInputData = window.mwdspace.userInputData;
		thisWidget.currentGiftMinimum = thisWidget.defaults.minimumGiftAmount;

		window.mwdspace.pageIdPrefix = "widget" + thisWidget.options.formId;

		// JQUERY OBJECTS
		var jqContainer = jq("div.giftFormContainer");
		var jqStepList = jqContainer.find("section.step");
		var jqGiftHeaderContainer = jqContainer.find("div.giftFormHeaderContainer");
		var jqMainBackButton = jqContainer.find("button.goPreviousStep");
		var jqFreeFormGiftInput = jqContainer.find('input[name="giftAmountFreeform"]');
		var jqPayMethodSelect = jqContainer.find('select[name="payMethod"]');
		var jqRegionSelect = jqContainer.find('select[name="donorRegion"]');
		var jqRegionInput = jqContainer.find('input[name="donorRegion"]');
		var jqCurrencySelect = jqContainer.find('select[name="giftCurrency"]');
		var jqCardNumberFeedback = jqContainer.find(
			"div.payInfoContainer div.cardNumberFeedback"
		);
		var jqBitcoinTimeRemaining = jqContainer.find(
			"div.bitcoinContainer span.bitcoinTimeRemaining"
		);

		// TEST MODE
		var inTestMode = window.mwdspace.sharedUtils.getUrlParameter("test") == "true";
		if (inTestMode) {
			if (window.console) console.warn("TEST MODE - mwd-donate-widget.js");
			jqContainer.find("div.testModeContainer").slideDown(999);
		}

		thisWidget.promises.labelOverrideLoad = thisWidget.prepareLabelOverride();

		setOptionalSectionVisibility();

		buildCountrySelect();
		buildCardExpireMonthSelect();
		buildCardExpireYearSelect();
		setupCompanyMatchSelect();

		setupInputWatchers();
		buildPayMethodSelect();

		// ensure text override file load (if any) is complete
		await thisWidget.promises.labelOverrideLoad;
		if (thisWidget.labelOverride) {
			thisWidget.processLabelOverrideObject(thisWidget.labelOverride);
			showIntroContent();
		}

		buildCurrencySelect();
		buildFrequencyButtons();
		updateGiftAmount();
		prePopulateUserFields();

		showStep();

		var promiseSpreedly = setupSpreedly(); //async, but waiting not required

		// GENERAL CLICK HANDLER
		document.addEventListener("click", function(event) {
			// if (window.console) console.log("click", event.target.tagName, event.target.className);
			var clickTarget = jq(event.target).closest("button, .clickTarget");
			if (clickTarget) {
				if (clickTarget.hasClass("goNextStep")) {
					if (!showNextStep()) {
						clickTarget.addClass("showInvalid");
						setTimeout(function() {
							clickTarget.removeClass("showInvalid");
						}, 1500);
					}
				} else if (clickTarget.hasClass("goPreviousStep")) {
					showPreviousStep();
				} else if (clickTarget.hasClass("errorRestart")) {
					window.mwdspace.donationInProgress = false;
					showStep("giftAmount");
				} else if (clickTarget.hasClass("infoIcon")) {
					clickTarget.trigger("hover");
				}
			}
		});

		setTimeout(function() {
			thisWidget.allowAutoScroll = true;
		}, 999);

		await promiseSpreedly;
		thisWidget.isLoaded = true;
		if (thisWidget.options.onLoad) {
			try {
				if (window.console) console.log(">>> Calling custom onLoad function");
				thisWidget.options.onLoad();
			} catch (err) {
				if (window.console)
					console.error("Caught error from onLoad function: ", err.message);
			}
		}

		function showNextStep() {
			switch (mwdspace.currentStepName) {
				case "giftAmount":
					if (checkStepGift()) {
						showStep("donorInfo");
						return true;
					}
					break;
				case "donorInfo":
					if (checkStepDonor()) {
						if (window.mwdspace.userInputData.payMethod == "card") {
							showStep("cardInfo");
							return true;
						} else {
							buildTransactionSendData();
							return sendTransaction();
						}
					}
					break;
				case "cardInfo":
					if (checkStepCard()) {
						buildTransactionSendData();
						return tokenizeUserCard();
					}
					break;
			}
			return false;
		}

		function showPreviousStep() {
			switch (mwdspace.currentStepName) {
				case "donorInfo":
					showStep("giftAmount");
					break;
				case "cardInfo":
					showStep("donorInfo");
					break;
			}
		}

		function showStep(targetStepName) {
			window.mwdspace.currentStepName = "";
			targetStepName = window.mwdspace.sharedUtils.ensureString(targetStepName);
			if (!targetStepName) {
				targetStepName = window.mwdspace.sharedUtils.getSessionValue("savedStepName");
				if (!targetStepName) {
					targetStepName = "giftAmount";
				}
			}
			jqContainer.find("div.loadingDisplay").hide();
			var thisName;
			for (var i = 0; i < jqStepList.length; i++) {
				thisName = jqStepList[i].getAttribute("data-step-name");
				if (thisName == targetStepName) {
					// SHOW THIS STEP
					// handle back button visibility
					switch (targetStepName) {
						case "donorInfo":
						case "cardInfo":
							jqContainer.find("div.giftFormHeaderContainer").show();
							jqMainBackButton.fadeIn(888);
							break;
						default:
							jqMainBackButton.hide();
					}
					// handle button text
					if (targetStepName == "donorInfo") {
						var buttonText;
						// TODO - make function to create all next buttons on the fly (and indicate action)
						switch (window.mwdspace.userInputData.payMethod) {
							case "card":
								if (window.console) console.warn("Making next button");
								buttonText = "Enter Payment Information";
								try {
									if (thisWidget.labelOverride.button.goPaymentInfo)
										buttonText =
											thisWidget.labelOverride.button.goPaymentInfo;
								} catch (err) {}
								break;
							case "bitcoin":
								if (window.console) console.warn("Making submit button");
								buttonText = "Submit Donation";
								try {
									if (thisWidget.labelOverride.button.mainSubmit)
										buttonText = thisWidget.labelOverride.button.mainSubmit;
								} catch (err) {}
								break;
						}
						thisWidget.setElementLabelOverride("button.goPaymentInfo", buttonText);
					}
					jq(jqStepList[i]).fadeIn(666, function() {
						scrollAll(jqContainer);
					});
					window.mwdspace.currentStepName = thisName;
					if (targetStepName == "confirmation") {
						window.mwdspace.sharedUtils.removeSessionValue("savedStepName");
					}
				} else {
					//HIDE THIS STEP
					jq(jqStepList[i]).hide();
				}
			}
		}

		function checkStepGift() {
			var isValid = true;

			if (
				typeof userInputData.baseAmount != "number" ||
				userInputData.baseAmount < thisWidget.currentGiftMinimum
			) {
				if (window.console)
					console.warn("baseAmount is invalid", userInputData.baseAmount);
				isValid = false;
				var message = "Please enter an amount of at least";
				try {
					message = thisWidget.labelOverride.gift.error.invalidAmount || message;
				} catch (err) {}
				message +=
					" " + thisWidget.currentCurrencySymbol + thisWidget.currentGiftMinimum;
				showStepFeedback("giftAmount", message, true);
			} else {
				showStepFeedback("giftAmount");
			}
			if (typeof userInputData.giftCurrency != "string") {
				if (window.console)
					console.warn("Currency is invalid", userInputData.giftCurrency);
				isValid = false;
			}
			if (typeof userInputData.payMethod != "string") {
				if (window.console)
					console.warn("Pay Method is invalid", userInputData.payMethod);
				isValid = false;
			}
			if (typeof userInputData.giftFrequency != "string") {
				if (window.console)
					console.warn("Gift frequency is invalid", userInputData.giftFrequency);
				isValid = false;
			}

			return isValid;
		}

		function checkStepDonor() {
			var isValid = true;

			jqContainer
				.find("section.step[data-step-name='donorInfo'] .changeWatch")
				.each(function() {
					if (
						jq(this).attr("name") != "donorCountry" &&
						jq(this).css("display") != "none"
					) {
						jq(this).trigger("change");
					}
				});
			userInputData.donorCountry =
				jqContainer
					.find("div.billingInfoContainer select[name='donorCountry']")
					.val() || null;

			if (typeof userInputData.donorFirstName != "string") {
				if (window.console)
					console.warn("donorFirstName is invalid", userInputData.donorFirstName);
				isValid = false;
			}
			if (typeof userInputData.donorLastName != "string") {
				if (window.console)
					console.warn("donorLastName is invalid", userInputData.donorLastName);
				isValid = false;
			}
			if (typeof userInputData.donorEmail != "string") {
				if (window.console)
					console.warn("donorEmail is invalid", userInputData.donorEmail);
				isValid = false;
			}
			if (
				typeof userInputData.donorPhone != "undefined" &&
				typeof userInputData.donorPhone != "string"
			) {
				if (window.console)
					console.warn("donorPhone is invalid", userInputData.donorPhone);
				isValid = false;
			}
			if (typeof userInputData.donorStreet != "string") {
				if (window.console)
					console.warn("donorStreet is invalid", userInputData.donorStreet);
				isValid = false;
			}
			if (typeof userInputData.donorRegion != "string") {
				if (window.console)
					console.warn("donorRegion is invalid", userInputData.donorRegion);
				isValid = false;
			}
			if (typeof userInputData.donorPostCode != "string") {
				if (window.console)
					console.warn("donorPostCode is invalid", userInputData.donorPostCode);
				isValid = false;
			}
			if (typeof userInputData.donorCountry != "string") {
				if (window.console)
					console.warn("donorCountry is invalid", userInputData.donorCountry);
				isValid = false;
			}
			if (userInputData.companyMatch == "on") {
				if (typeof userInputData.donorMatchCompany != "string") {
					if (window.console)
						console.warn(
							"donorMatchCompany is invalid",
							userInputData.donorMatchCompany
						);
					isValid = false;
				}
				if (typeof userInputData.donorMatchEmail != "string") {
					if (window.console)
						console.warn(
							"donorMatchEmail is invalid",
							userInputData.donorMatchEmail
						);
					isValid = false;
				}
			}

			return isValid;
		}

		function checkStepCard() {
			var isValid = true;

			jqContainer
				.find("section.step[data-step-name='cardInfo'] .changeWatch")
				.trigger("change");

			var jqCardNumberBox = jqContainer.find("div.payInfoContainer div#cardNumberTarget");
			if (userInputData.hasValidCardNumber === true) {
				jqCardNumberBox.removeClass("invalid");
			} else {
				isValid = false;
				jqCardNumberBox.addClass("invalid");
				if (window.console)
					console.warn(
						"hasValidCardNumber is invalid",
						userInputData.hasValidCardNumber
					);
			}
			var jqCardCvvBox = jqContainer.find("div.payInfoContainer div#cardCvvTarget");
			if (userInputData.hasValidCardCvv === true) {
				jqCardCvvBox.removeClass("invalid");
			} else {
				isValid = false;
				jqCardCvvBox.addClass("invalid");
				if (window.console)
					console.warn("hasValidCardCvv is invalid", userInputData.hasValidCardCvv);
			}

			if (typeof userInputData.payCardExpireMonth != "string") {
				if (window.console)
					console.warn(
						"payCardExpireMonth is invalid",
						userInputData.payCardExpireMonth
					);
				isValid = false;
			}
			if (typeof userInputData.payCardExpireYear != "string") {
				if (window.console)
					console.warn(
						"payCardExpireYear is invalid",
						userInputData.payCardExpireYear
					);
				isValid = false;
			}

			return isValid;
		}

		function showStepFeedback(stepName, message, isError) {
			if (typeof stepName == "undefined") {
				var stepName = "";
			}
			if (typeof message == "undefined") {
				var message = "";
			}
			if (typeof isError == "undefined") {
				var isError = false;
			}
			if (!stepName) {
				if (window.console)
					console.log("showStepFeedback() given invalid input", stepName, message);
			}
			var jqFeedback = jq(
				'section[data-step-name="' + stepName + '"] div.userFeedback p.message'
			);
			if (message || isError) {
				jqFeedback.html(message || "Sorry, an unknown error occured").fadeIn(444);
				if (isError) {
					jqFeedback.addClass("error");
				} else {
					jqFeedback.removeClass("error");
				}
			} else {
				jqFeedback.fadeOut(222, function() {
					jq(this).html("");
					jq(this).removeClass("error");
				});
			}
		}

		function showIntroContent() {
			// check for intro content (from label override)
			var jqIntroContent = jqGiftHeaderContainer.find("div.introContentContainer");
			if (jqIntroContent.html() != "") {
				jqGiftHeaderContainer.find("div.giftFormHeader").addClass("showIntro");
				jqGiftHeaderContainer.show();
			}
		}

		function setupInputWatchers() {
			// CHANGE EVENT HANDLER
			jq(document).on("change blur", function(event) {
				var jqThis = jq(event.target);

				var name = jqThis.attr("name");
				var newValue = jqThis.val();
				var tag = String(jqThis.prop("tagName")).toLowerCase();

				if (jqThis.hasClass("changeWatch")) {
					processChangeWatch(jqThis, { name: name, value: newValue });
				}

				if (
					(name == "giftAmountFixed" || name == "giftAmountFreeform") &&
					tag == "input"
				) {
					processGiftAmountChange(event);
				} else if (name == "giftExtraPercent" && tag == "input") {
					var newPercent = 0;
					if (jqThis.prop("checked")) {
						newPercent = jqThis.val();
					}
					updateGiftAmount({ extraPercent: newPercent });
				} else if (name == "giftCurrency" && tag == "select") {
					setCurrencyDisplaySymbol();
					getGiftString();
				} else if (name == "payMethod" && tag == "select") {
					updatePayMethod();
				} else if (name == "giftFrequency" && tag == "input") {
					updateFrequency(newValue);
				}
			});

			// AMOUNT - also show header display
			jqContainer
				.find('div.giftOption input[name="giftAmountFreeform"]')
				.on("focus keyup paste", function(event) {
					processGiftAmountChange(event);
				});

			// CURRENCY
			// if (window.console) console.log('jqCurrencySelect.trigger("change");');
			// jqCurrencySelect.trigger("change");

			// PAYMENT METHOD
			// if (window.console) console.log('jqPayMethodSelect.trigger("change");');
			// jqPayMethodSelect.trigger("change");

			// FREQUENCY
			// if (window.console) console.log('jqContainer.trigger("change");');
			// jqContainer.trigger("change");

			// COMPANY MATCH - also show/hide company match input fields
			jqContainer
				.find("input#inputCompanyMatch")
				.on("change", function() {
					if (jq(this).prop("checked")) {
						jqContainer
							.find("div#collapsableCompanyMatch")
							.slideDown(666, function() {
								scrollAll(jqContainer);
							});
					} else {
						jqContainer
							.find("div#collapsableCompanyMatch")
							.slideUp(333, function() {
								scrollAll(jqContainer);
							});
					}
				})
				.trigger("change");
		}

		function processChangeWatch(jqThis, options) {
			// if (window.console) console.log("processChangeWatch()", jqThis, options);
			if (typeof options == "undefined") {
				var options = {};
			}

			var isValid = true;
			var validatedValue = null; // kill the stored value when not valid

			options.validationPattern = jqThis.attr("data-validation");
			if (options.validationPattern) {
				isValid = validateInputField(jqThis, options);
			}

			if (isValid) {
				var elementType = jqThis.attr("type");
				if (elementType == "checkbox" || elementType == "radio") {
					if (jqThis.prop("checked")) {
						// set value only if boolean input checked
						validatedValue = options.value;
					}
				} else {
					validatedValue = options.value;
				}
			}
			userInputData[options.name] = validatedValue;

			window.mwdspace.sharedUtils.setLocalValue(options.name, options.value, {
				prefix: false,
			});
		}

		function validateInputField(jqThis, options) {
			// if (window.console) console.log("validateInputField()", jqThis, options);
			if (typeof options == "undefined") {
				var options = {};
			}

			var isValid = true;

			var valueString = "";
			if (typeof options.value != "undefined" && options.value !== null) {
				valueString = String(options.value);
			}

			switch (options.validationPattern) {
				case "email":
					isValid = valueString.match(/^[\w|\.|\-|\_]+@[\w|\.|\-|\_]+\.[a-z]{2,}$/i);
					break;
				default:
					var re = new RegExp(options.validationPattern, "i");
					isValid = valueString.match(re);
			}
			if (isValid) {
				jqThis.removeClass("invalid");
				return true;
			}
			jqThis.addClass("invalid");
			return false;
		}

		function processGiftAmountChange(event) {
			var jqTarget = jq(event.target);
			// if (window.console) console.log(">>> processGiftAmountChange()", event.type, jqTarget.attr("name"));
			var newValue = cleanCurrency(jqTarget.val()) || 0.0;
			updateGiftAmount({ baseAmount: newValue });
			jqContainer.find("div.giftOption input").removeClass("selected");

			jqTarget.addClass("selected");
			if (event.type == "change") {
				jqGiftHeaderContainer.slideDown(666, function() {
					scrollAll(jqContainer);
				});
			}
			if (event.type == "change" || event.type == "blur") {
				if (jqTarget.attr("name") == "giftAmountFreeform") {
					var amount = cleanCurrency(newValue) || 0.0;
					var cleanedAmount = amount.toFixed(2);
					if (cleanedAmount != newValue) {
						jqTarget.val(cleanedAmount);
					}
				}
				if (amount < thisWidget.currentGiftMinimum) {
					jqFreeFormGiftInput.addClass("invalid");
				} else {
					jqFreeFormGiftInput.removeClass("invalid");
				}
				jqContainer.find("div.giftOption input[type='radio']").prop("checked", false);
			}
		}

		function updateGiftAmount(input) {
			// if (window.console) console.log(">>> updateGiftAmount()", input);
			if (typeof input == "undefined") {
				var input = {};
			}
			try {
				userInputData.totalAmount = userInputData.totalAmount || 0;
				userInputData.baseAmount = userInputData.baseAmount || 0;
				userInputData.extraAmount = userInputData.extraAmount || 0;
				userInputData.extraPercent = userInputData.extraPercent || 0;

				if (typeof input.baseAmount != "undefined") {
					userInputData.baseAmount = parseFloat(input.baseAmount) || 0.0;
				}
				if (typeof input.extraPercent != "undefined") {
					userInputData.extraPercent = parseFloat(input.extraPercent) || 0.0;
				}
				userInputData.extraAmount =
					(userInputData.baseAmount * userInputData.extraPercent) / 100;
				userInputData.totalAmount =
					userInputData.baseAmount + userInputData.extraAmount;

				var displayAmount = userInputData.totalAmount.toFixed(2).split(".");
				jqContainer
					.find("div.amountDisplay span.displayWholeAmount")
					.text(displayAmount[0] || "??");
				jqContainer
					.find("div.amountDisplay span.displaySubAmount")
					.text("." + displayAmount[1] || "??");
			} catch (err) {
				if (window.console)
					console.log("updateGiftAmount() caught error: ", err.message);
			}
		}

		function setCurrencyDisplaySymbol() {
			// if (window.console) console.log(">>> setCurrencyDisplaySymbol()");
			var currencyCode = jqCurrencySelect.val();
			var currencySymbol = "(?)";
			var thisItem;
			for (var i = 0; i < window.mwdspace.validCurrencyList.length; i++) {
				thisItem = window.mwdspace.validCurrencyList[i];
				thisWidget.currentGiftMinimum = thisItem.minimumAmount;
				if (thisItem.code == currencyCode && thisItem.symbol) {
					currencySymbol = thisItem.symbol;
					break;
				}
			}
			thisWidget.currentCurrencySymbol = currencySymbol;
			jqContainer.find("span.currencySymbol").html(currencySymbol);
		}

		function updatePayMethod() {
			// if (window.console) console.log(">>> updatePayMethod()");
			var payMethod = jqPayMethodSelect.val();
			var thisItem;
			for (var i = 0; i < window.mwdspace.validPayMethodList.length; i++) {
				thisItem = window.mwdspace.validPayMethodList[i];
				if (thisItem.code == payMethod) {
					if (thisItem.frequencies) {
						setFrequencyButtonVisibility(thisItem.frequencies);
					}
					break;
				}
			}
		}

		// Evaluate the existing HTML buttons and hide or show
		function setFrequencyButtonVisibility(frequencyList) {
			// if (window.console) console.log(">>> setFrequencyButtonVisibility()");
			if (typeof frequencyList != "object" || frequencyList.length < 1) {
				if (window.console)
					console.warn(
						"setFrequencyButtonVisibility() ignoring invalid frequency list",
						frequencyList
					);
				return;
			}

			var actionList = [];
			var itemsVisible = 0;
			var selectedOptionNowHidden = false;

			var thisFrequency;
			jqContainer
				.find("div.giftFrequencyContainer div.fancyRadioButton input[type='radio']")
				.each(function() {
					thisFrequency = {
						jqObject: jq(this),
						show: true,
					};
					if (frequencyList.indexOf(thisFrequency.jqObject.val()) >= 0) {
						// show this frequency
						itemsVisible++;
					} else {
						// hide this frequency
						thisFrequency.show = false;
						if (thisFrequency.jqObject.prop("checked")) {
							selectedOptionNowHidden = true;
						}
					}
					actionList.push(thisFrequency);
				});

			if (itemsVisible < 1) {
				// something is wrong, show all
				jqContainer.find("div.giftFrequencyContainer div.fancyRadioButton").show();
			} else if (itemsVisible == 1) {
				// hide all
				jqContainer.find("div.giftFrequencyContainer div.fancyRadioButton").hide();
			} else {
				// show/hide according to action list
				for (var i = 0; i < actionList.length; i++) {
					if (actionList[i].show) {
						actionList[i].jqObject.closest("div.fancyRadioButton").show();
					} else {
						actionList[i].jqObject.closest("div.fancyRadioButton").hide();
					}
				}
			}

			if (selectedOptionNowHidden) {
				// auto select the first visible option
				for (var i = 0; i < actionList.length; i++) {
					if (actionList[i].show) {
						actionList[i].jqObject.prop("checked", true).trigger("change");
						break;
					}
				}
			}
		}

		function updateFrequency(newValue) {
			// if (window.console) console.log(">>> updateFrequency()", newValue);
			if (typeof newValue == "undefined") {
				var newValue = null;
			}
			var donationAmountHeadline;
			switch (newValue) {
				case "single":
					donationAmountHeadline = "Your donation";
					try {
						if (thisWidget.labelOverride.header.singleDonationText)
							donationAmountHeadline =
								thisWidget.labelOverride.header.singleDonationText;
					} catch (err) {}
					break;
				case "monthly":
					donationAmountHeadline = "Your recurring donation";
					try {
						if (thisWidget.labelOverride.header.monthlyDonationText)
							donationAmountHeadline =
								thisWidget.labelOverride.header.monthlyDonationText;
					} catch (err) {}
					break;
				default:
					donationAmountHeadline = "UNKNOWN DONATION FREQUENCY";
			}

			thisWidget.setElementLabelOverride("header.donationText", donationAmountHeadline);

			getGiftString();
		}

		function prePopulateUserFields() {
			// populate from URL or storage
			checkPrePopulationSources("first", "donorFirstName");
			checkPrePopulationSources("last", "donorLastName");
			checkPrePopulationSources("email", "donorEmail");
			checkPrePopulationSources("phone", "donorPhone");
			checkPrePopulationSources("street", "donorStreet");
			checkPrePopulationSources("city", "donorCity");
			checkPrePopulationSources("postcode", "donorPostCode");
			checkPrePopulationSources("country", "donorCountry");
			checkPrePopulationSources("region", "donorRegion"); //must occur after country

			// populate from url only
			setInputFromUrl("currency", "giftCurrency");
			setInputFromUrl("amount", "giftAmountFreeform");
		}

		function checkPrePopulationSources(urlKey, selector) {
			// check for and set value from url first
			if (!setInputFromUrl(urlKey, selector)) {
				// check storage if no url value exists
				setInputFromStorage(selector);
			}
		}

		function setInputFromUrl(urlKey, selector) {
			if (typeof urlKey == "undefined" || !urlKey) {
				if (window.console)
					console.log("setInputFromUrl() given invalid urlKey", urlKey);
				return;
			}
			if (typeof selector == "undefined" || !selector) {
				if (window.console)
					console.log("setInputFromUrl() given invalid selector", selector);
				return;
			}
			var urlValue = window.mwdspace.sharedUtils.getUrlParameter(urlKey);
			if (urlValue) {
				return setInputValue(selector, urlValue);
			}
			return false;
		}

		function setInputFromStorage(selector) {
			if (typeof selector == "undefined" || !selector) {
				if (window.console)
					console.log("setInputFromStorage() given invalid selector", selector);
				return;
			}
			var storedValue = window.mwdspace.sharedUtils.getLocalValue(selector, {
				prefix: false,
			});
			if (storedValue) {
				return setInputValue(selector, storedValue);
			}
			return false;
		}

		function setInputValue(selector, value) {
			if (typeof selector == "undefined" || !selector) {
				if (window.console)
					console.log("setInputValue() given invalid selector", selector);
				return;
			}
			var jqTargets = jqContainer.find(
				"section.step input[name='" +
					selector +
					"'], section.step select[name='" +
					selector +
					"']"
			);
			if (jqTargets.length > 0) {
				jqTargets.val(value).trigger("change");
				return true;
			}
			return false;
		}

		function buildTransactionSendData() {
			// if (window.console) console.log("buildTransactionSendData() START");
			try {
				window.mwdspace.transactionSendData = {};
				var sendData = window.mwdspace.transactionSendData;

				var userData = window.mwdspace.userInputData;
				// if (window.console) console.log("buildTransactionSendData() userData", userData);

				sendData.organizationId = thisWidget.options.organizationId || null;
				sendData.formId = thisWidget.options.formId
					? String(thisWidget.options.formId)
					: ""; //mimic test
				sendData.formAllocationId = thisWidget.options.formAllocationId || null;

				/* start - no data, added to mimic current widget */
				sendData.bank_account_holder_type = "personal";
				sendData.bank_account_number = "";
				sendData.bank_account_type = "checking";
				sendData.bank_name = "";
				sendData.bank_routing_number = "";
				sendData.comment = "";
				sendData.payment_method_token = "";
				sendData.tags = null;
				/* end - no data, added to mimic current widget */

				sendData.first_name = userData.donorFirstName || "";
				sendData.last_name = userData.donorLastName || "";
				sendData.email = userData.donorEmail || "";
				sendData.phone = userData.donorPhone || "";
				sendData.address = userData.donorStreet || "";
				sendData.city = userData.donorCity || "";
				sendData.state = userData.donorRegion || "";
				sendData.postalCode = userData.donorPostCode || "";
				sendData.country = userData.donorCountry || "";

				sendData.amount = userData.totalAmount || 0;
				sendData.baseAmount = Number(userData.baseAmount || 0).toFixed(2); //mimic test
				sendData.tipAmount = Number(userData.extraAmount || 0).toFixed(2); //mimic test
				sendData.tipPercent = Number(userData.extraPercent || 0).toFixed(2); //mimic test

				switch (userData.giftFrequency) {
					case "single":
						sendData.recurring = false;
						sendData.frequency = "o";
						break;
					case "monthly":
						sendData.recurring = true;
						sendData.frequency = "m";
						break;
					default:
						sendData.recurring = null;
						sendData.frequency = "";
				}

				sendData.currency = userData.giftCurrency || "";
				sendData.paymentType = userData.payMethod || "";

				if (sendData.paymentType == "card") {
					sendData.month = userData.payCardExpireMonth || "";
					sendData.year = userData.payCardExpireYear || "";
				}

				sendData.donateDouble = userData.isCompanyMatch === true;
				sendData.company = userData.companyMatchName || "";
				sendData.employeeEmail = userData.companyMatchEmail || "";

				return true;
			} catch (err) {
				if (window.console)
					console.warn("buildTransactionSendData() caught error: ", err.message);
			}
			return false;
		}

		function sendTransaction() {
			if (
				!window.mwdspace.transactionLayer.validateSendData(
					window.mwdspace.transactionSendData
				)
			) {
				return false;
			}

			// if (window.console) console.log("sendTransaction() SENDING", window.mwdspace.transactionSendData);

			prepAndShowProcessingStep();

			window.mwdspace.transactionLayer.startDonation(
				window.mwdspace.transactionSendData,
				function(response) {
					var transactionData = response.json || {};

					if (window.console) console.log("transactionData", transactionData);

					if (transactionData.type == "bitcoin") {
						prepAndShowBitcoinStep(transactionData);
					} else {
						var transactionStatus = String(transactionData.status);
						if (transactionStatus.match(/complete/i)) {
							prepAndShowConfirmationStep();
						} else {
							prepAndShowErrorStep(
								'The server appears to have had an error processing this card transaction, and reported status "' +
									transactionStatus +
									'".'
							);
						}
					}
				},
				function(response) {
					if (window.console)
						console.warn("Donation received fail response from server", response);

					var userMessage;
					if (response.text) {
						// pass thru the transaction system response text
						userMessage = "Server message:";
						try {
							userMessage =
								thisWidget.labelOverride.transactionError.error.systemMessage ||
								userMessage;
						} catch (err) {}
						userMessage += " " + response.text;
					} else {
						userMessage =
							"The server was unable to process the transaction, but provided no explanation.";
						try {
							userMessage =
								thisWidget.labelOverride.transactionError.error.unknown ||
								userMessage;
						} catch (err) {}
						try {
							userMessage +=
								" <span class='hint'>(HTML status: " +
								(response.status || "[No Status]") +
								" " +
								(response.statusText || "[No Text]") +
								")</span>";
						} catch (err) {
							if (window.console) console.log("Caught error: ", err.message);
						}
					}

					prepAndShowErrorStep(userMessage);
				}
			);
			return true;
		}

		function getGiftString() {
			// if (window.console) console.log(">>> getGiftString()");
			var giftStringOptions = {
				minimumGiftAmount: thisWidget.currentGiftMinimum,
				// basicRounding: true,
				// minimumDynamicStart: 30.0,
			};
			if (window.mwdspace.userInputData.giftFrequency == "monthly") {
				if (thisWidget.options.giftStringMonthly) {
					var tempGiftString = getCurrencySpecificGiftString("monthly");
					if (tempGiftString) {
						// use given currency specific monthly amounts
						giftStringOptions.giftStringList = tempGiftString;
					} else {
						tempGiftString = getCurrencySpecificGiftString("single");
						if (tempGiftString) {
							// convert currency specific single gifts into monthly amounts
							giftStringOptions.calculateAsMonthly = true;
							giftStringOptions.giftStringList = tempGiftString;
						} else {
							// use default monthly
							giftStringOptions.giftStringList =
								thisWidget.options.giftStringMonthly;
						}
					}
				}
			} else {
				if (thisWidget.options.giftStringSingle) {
					// use given currency specific monthly amounts, with default as backup
					giftStringOptions.giftStringList =
						getCurrencySpecificGiftString("single") ||
						thisWidget.options.giftStringSingle;
				}
			}

			var finalGiftString = window.mwdspace.giftUtils.processGiftStringList(
				giftStringOptions
			);

			buildGiftStringButtons(finalGiftString);
			setCurrencyDisplaySymbol();
		}

		function getCurrencySpecificGiftString(type) {
			if (typeof type == "undefined") {
				var type = "";
			}
			var propertyName = "giftStringSingle";
			if (type == "monthly") {
				propertyName = "giftStringMonthly";
			}
			try {
				var giftStringList =
					thisWidget.options.filterListCurrency[
						window.mwdspace.userInputData.giftCurrency
					][propertyName];
				if (giftStringList && giftStringList.length > 0) {
					return giftStringList;
				}
			} catch (err) {
				if (window.console)
					console.warn(
						"getCurrencySpecificGiftString() caught error: ",
						err.name,
						err.message
					);
			}

			return false;
		}

		function buildGiftStringButtons(giftStringList) {
			// if (window.console) console.log(">>> buildGiftStringButtons()", giftStringList);
			if (typeof giftStringList == "undefined") {
				var giftStringList = [];
			}
			try {
				if (!giftStringList || giftStringList.length < 1) {
					throw new Error("Invalid gift string list given");
				}
				var jqGiftStringContainer = jqContainer.find("div.fixedAmountContainer");
				if (jqGiftStringContainer.length !== 1) {
					throw new Error("Unable to identify the fixed gift amount container");
				}
				// remove any existing options
				jqGiftStringContainer.empty();

				var domThisButton, thisAmount, thisId;
				var defaultId = null;

				for (var i = 0; i < giftStringList.length; i++) {
					thisAmount = giftStringList[i];
					thisId = window.mwdspace.sharedUtils.makeUniqueId("amount-" + i);
					if (!defaultId && String(thisAmount).match(/\*/)) {
						defaultId = thisId;
					}
					domThisButton = buildGiftStringButton(thisAmount, {
						id: thisId,
					});
					if (domThisButton) {
						jqGiftStringContainer.append(domThisButton);
					} else {
						if (window.console)
							console.warn("Unable to add fixed gift button:", thisAmount);
					}
				}
				// below is in progress
				if (defaultId) {
					jqGiftStringContainer
						.find("div.giftAmountContainer input#" + defaultId)
						.prop("checked", true)
						.trigger("change");
				} else {
					jqGiftStringContainer
						.find("div.giftAmountContainer input[name='giftAmountFixed']")
						.eq(1)
						.prop("checked", true)
						.trigger("change");
				}
			} catch (err) {
				if (window.console)
					console.error("Unable to build the fixed gift buttons", err);
			}
		}

		function buildGiftStringButton(input, options) {
			if (typeof options == "undefined") {
				var options = {};
			}
			if (typeof options != "object") {
				options = {};
				if (window.console)
					console.warn(
						"buildGiftStringButton(): ignoring invalid option object",
						options
					);
			}
			var domButton = null;
			try {
				var thisAmount = {
					amount: cleanCurrency(input),
					displayText: formatDisplayGift(input),
				};

				if (!thisAmount.amount || !thisAmount.displayText) {
					throw new Error("Invalid gift string amount");
				}

				// the container div
				domButton = document.createElement("div");
				jq(domButton).addClass("giftOption fixed fancyRadioButton");

				// the radio
				var domRadio = document.createElement("input");
				domRadio.setAttribute("type", "radio");
				domRadio.setAttribute("name", "giftAmountFixed");
				domRadio.setAttribute("value", thisAmount.amount);
				if (options.id) {
					domRadio.setAttribute("id", options.id);
				}
				domButton.appendChild(domRadio);

				// the label
				var domLabel = document.createElement("label");
				if (options.id) {
					domLabel.setAttribute("for", options.id);
				}
				domButton.appendChild(domLabel);

				// label currency symbol
				var domSymbol = document.createElement("span");
				jq(domSymbol).addClass("currencySymbol");
				domLabel.appendChild(domSymbol);

				// label amount value
				var domAmount = document.createElement("span");
				jq(domAmount).addClass("displayAmount");
				domAmount.innerHTML = thisAmount.displayText || "Unknown";
				domLabel.appendChild(domAmount);
			} catch (err) {
				if (window.console)
					console.error("Error building the button for fixed amount:", input, err);
			}
			return domButton;
		}

		/* remove all but digits/dot before converting to float and rounding to 2 digits */
		function cleanCurrency(input) {
			if (typeof input == "undefined") {
				if (window.console) console.warn("cleanCurrency() given empty input");
				var input = "";
			}
			input = "" + input;
			var rawCurrency = parseFloat(input.replace(/[^0-9|\.]/g, ""));
			if (isNaN(rawCurrency)) {
				return 0.0;
			}
			return Math.round(rawCurrency * 100) / 100;
		}

		/* remove all chars but digits/dot before convert to float */
		function formatDisplayGift(input) {
			if (typeof input == "undefined") {
				var input = "";
			}
			input = "" + input;
			var amount = cleanCurrency(input);
			amount = amount.toFixed(2);
			amount = amount.replace(/\.00$/g, "");
			return amount;
		}

		function buildCurrencySelect() {
			var filterList = thisWidget.options.filterListCurrency;
			var defaultCurrency =
				typeof thisWidget.options.defaultCurrency == "string"
					? thisWidget.options.defaultCurrency
					: thisWidget.defaults.currencyCode;

			// TODO - make action list from the filter

			var itemsVisible = 0;

			try {
				if (!window.mwdspace.validCurrencyList) {
					throw new Error("List of valid currencies not found");
				}
				if (jqCurrencySelect.length !== 1) {
					throw new Error("Unable to identify the currency select dropdown");
				}
				var domThisOption, thisCurrency, okToBuild;

				for (var i = 0; i < window.mwdspace.validCurrencyList.length; i++) {
					okToBuild = true;
					thisCurrency = window.mwdspace.validCurrencyList[i];
					if (filterList) {
						okToBuild = typeof filterList[thisCurrency.code] == "object";
					}
					if (okToBuild) {
						domThisOption = buildCurrencyOption(thisCurrency);
						if (domThisOption) {
							jqCurrencySelect.append(domThisOption);
							itemsVisible++;
						} else {
							if (window.console)
								console.warn("Unable to add currency:", thisCurrency);
						}
					}
				}

				jqCurrencySelect.val(defaultCurrency).trigger("change");
				if (itemsVisible == 1) {
					jqCurrencySelect.hide();
				} else {
					jqCurrencySelect.show();
				}
			} catch (err) {
				if (window.console)
					console.error("Unable to build the currency select dropdown", err);
			}
		}

		function buildCurrencyOption(currency) {
			var domOption = null;
			try {
				if (currency.code) {
					domOption = document.createElement("option");
					domOption.setAttribute("value", currency.code);
					domOption.innerText = currency.code + " " + (currency.name || "");
				}
			} catch (err) {
				if (window.console)
					console.error("Unable to build the option element for currency:", currency);
			}
			return domOption;
		}

		function buildPayMethodSelect() {
			try {
				if (!window.mwdspace.validPayMethodList) {
					throw new Error("List of valid payment methods not found");
				}
				if (jqPayMethodSelect.length !== 1) {
					throw new Error("Unable to identify the payment method select dropdown");
				}
				var domThisOption, thisPayMethod, okToBuild;

				var defaultCode = null;
				var itemCount = 0;

				for (var i = 0; i < window.mwdspace.validPayMethodList.length; i++) {
					thisPayMethod = window.mwdspace.validPayMethodList[i];
					okToBuild = true;
					if (thisWidget.options.filterListPayMethod) {
						if (
							thisWidget.options.filterListPayMethod.indexOf(thisPayMethod.code) <
							0
						) {
							okToBuild = false;
						}
					}
					if (okToBuild) {
						domThisOption = buildPayMethodOption(
							window.mwdspace.validPayMethodList[i]
						);
						if (domThisOption) {
							jqPayMethodSelect.append(domThisOption);
							itemCount++;
						} else {
							if (window.console)
								console.warn(
									"Unable to add payment method:",
									window.mwdspace.validPayMethodList[i]
								);
						}
						if (
							thisWidget.options.defaultPayMethod === thisPayMethod.code ||
							!defaultCode
						) {
							defaultCode = thisPayMethod.code;
						}
					}
				}

				jqPayMethodSelect.val(defaultCode).trigger("change");
				// hide the selector when only one value
				if (itemCount === 1) {
					jqPayMethodSelect.closest("div.inputGroup").hide();
				} else {
					jqPayMethodSelect.closest("div.inputGroup").show();
				}
			} catch (err) {
				if (window.console)
					console.error("Unable to build the payment method select dropdown", err);
			}
		}

		function buildPayMethodOption(method) {
			var domOption = null;
			try {
				if (method.code) {
					domOption = document.createElement("option");
					domOption.setAttribute("value", method.code);
					domOption.setAttribute("data-label-id", "gift.payMethod." + method.code);
					domOption.innerText = method.description || "Unknown";
				}
			} catch (err) {
				if (window.console)
					console.error("Unable to build the option element for method:", method);
			}
			return domOption;
		}

		function buildFrequencyButtons() {
			try {
				if (!window.mwdspace.validFrequencyList) {
					throw new Error("Invalid list of frequencies given");
				}
				var jqFrequencyContainer = jqContainer.find("div.giftFrequencyContainer");
				if (jqFrequencyContainer.length !== 1) {
					throw new Error("Unable to identify the frequency container");
				}
				// remove any existing options
				jqFrequencyContainer.find("div.fancyRadioButton").remove();

				var domThisButton, thisFrequency, okToBuild;

				var finalFrequencyList = [];
				var defaultIndex = 0;
				var currentIndex = 0;

				for (var i = 0; i < window.mwdspace.validFrequencyList.length; i++) {
					thisFrequency = window.mwdspace.validFrequencyList[i];
					okToBuild = true;
					if (thisWidget.options.filterListFrequency) {
						if (
							thisWidget.options.filterListFrequency.indexOf(thisFrequency.code) <
							0
						) {
							okToBuild = false;
						}
					}
					if (okToBuild) {
						domThisButton = buildFrequencyButton(thisFrequency, {
							id: window.mwdspace.sharedUtils.makeUniqueId("frequency-" + i),
						});
						if (domThisButton) {
							jqFrequencyContainer.append(domThisButton);
							finalFrequencyList.push(thisFrequency.code);
						} else {
							if (window.console)
								console.warn("Unable to add frequency:", thisFrequency);
						}
						if (thisWidget.options.defaultFrequency === thisFrequency.code) {
							defaultIndex = currentIndex;
						}
						currentIndex++;
					}
				}
				jqFrequencyContainer
					.find('input[name="giftFrequency"]')
					.eq(defaultIndex)
					.prop("checked", true)
					.trigger("change");
				setFrequencyButtonVisibility(finalFrequencyList);
			} catch (err) {
				if (window.console) console.error("Unable to build the frequency buttons", err);
			}
		}

		function buildFrequencyButton(frequency, options) {
			if (typeof options == "undefined") {
				var options = {};
			}
			if (typeof options != "object") {
				options = {};
				if (window.console)
					console.warn(
						"buildFrequencyButton(): ignoring invalid option object",
						options
					);
			}
			var domButton = null;
			try {
				if (frequency.code) {
					// the container div
					domButton = document.createElement("div");
					jq(domButton).addClass("fancyRadioButton");

					// the radio
					var domRadio = document.createElement("input");
					jq(domRadio).addClass("changeWatch");
					domRadio.setAttribute("type", "radio");
					domRadio.setAttribute("name", "giftFrequency");
					domRadio.setAttribute("value", frequency.code);
					if (options.id) {
						domRadio.setAttribute("id", options.id);
					}
					domButton.appendChild(domRadio);

					// the label
					var domLabel = document.createElement("label");

					domLabel.setAttribute("data-label-id", "gift.frequency." + frequency.code);
					domLabel.innerHTML = frequency.name || "Unknown";
					if (options.id) {
						domLabel.setAttribute("for", options.id);
					}
					domButton.appendChild(domLabel);
				}
			} catch (err) {
				if (window.console)
					console.error("Error building the button for frequency:", frequency, err);
			}
			return domButton;
		}

		function prepareRegionInput() {
			if (typeof options == "undefined") {
				var options = {};
			}
			if (typeof options != "object") {
				options = {};
				if (window.console)
					console.warn(
						"prepareRegionInput(): ignoring invalid option object",
						options
					);
			}

			try {
				var userCountry = jqContainer.find('select[name="donorCountry"]').val();
				var thisCountry;
				for (var i = 0; i < window.mwdspace.validCountryList.length; i++) {
					thisCountry = window.mwdspace.validCountryList[i];
					if (userCountry == thisCountry.code || userCountry == thisCountry.name) {
						if (thisCountry.regions && buildRegionSelect(thisCountry.regions)) {
							return;
						}
					}
				}
			} catch (err) {
				if (window.console)
					console.error("Unable to prepare the region input method", err);
			}
			showRegionInput();
		}

		function showRegionInput() {
			jqRegionSelect.hide();
			jqRegionInput
				.val("")
				.show()
				.trigger("change");
		}

		function buildRegionSelect(regions) {
			jqRegionInput.hide();
			jqRegionSelect
				.val("")
				.show()
				.trigger("change");

			if (typeof regions == "undefined") {
				if (window.console)
					console.warn("buildRegionSelect(): no regions object", regions);
				return false;
			}
			if (typeof regions != "object" || regions.length < 1) {
				if (window.console)
					console.warn("buildRegionSelect(): invalid regions object", regions);
				return false;
			}

			try {
				if (jqRegionSelect.length !== 1) {
					if (window.console)
						console.error("Unable to identify the region select dropdown");
					return false;
				}
				var domThisOption, thisRegion;

				var regionCtr = 0;

				jqRegionSelect.empty();
				domThisOption = buildRegionOption("State/Region...", {
					"data-label-id": "donor.regionPlaceholder",
					value: "",
				});
				jqRegionSelect.append(domThisOption);

				for (var i = 0; i < regions.length; i++) {
					thisRegion = regions[i];
					domThisOption = buildRegionOption(thisRegion.name);
					if (domThisOption) {
						jqRegionSelect.append(domThisOption);
						regionCtr++;
					} else {
						if (window.console) console.warn("Unable to add region:", thisRegion);
					}
				}
				if (regionCtr > 0) {
					return true;
				}
			} catch (err) {
				if (window.console)
					console.error("Unable to build the region select dropdown", err);
			}
			return false;
		}

		function buildRegionOption(regionName, attributes) {
			if (typeof attributes == "undefined") {
				var attributes = {};
			}
			if (typeof attributes != "object") {
				if (window.console)
					console.warn(
						"buildRegionOption() ignoring invalid attributes object",
						attributes
					);
				attributes = {};
			}
			try {
				if (typeof regionName == "string" && regionName.trim()) {
					var domOption = null;
					domOption = document.createElement("option");
					domOption.innerText = regionName;
					for (var key in attributes) {
						domOption.setAttribute(key, attributes[key]);
					}
					return domOption;
				}
			} catch (err) {
				if (window.console)
					console.error("Unable to build the option element for region:", region);
			}
			return null;
		}

		function buildCountrySelect(options) {
			if (typeof options == "undefined") {
				var options = {};
			}
			if (typeof options != "object") {
				options = {};
				if (window.console)
					console.warn(
						"buildCountrySelect(): ignoring invalid option object",
						options
					);
			}
			var defaultCountry =
				typeof options.default == "string" ? options.default : "United States";
			try {
				if (!window.mwdspace.validCountryList) {
					throw new Error("List of valid countries not found");
				}
				var domCountrySelect = jqContainer.find('select[name="donorCountry"]');
				domCountrySelect.on("change", prepareRegionInput);
				if (domCountrySelect.length !== 1) {
					throw new Error("Unable to identify the country select dropdown");
				}
				var domThisOption, thisCountry, okToBuild;

				for (var i = 0; i < window.mwdspace.validCountryList.length; i++) {
					okToBuild = true;
					thisCountry = window.mwdspace.validCountryList[i];
					if (okToBuild) {
						domThisOption = buildCountryOption(thisCountry);
						if (domThisOption) {
							domCountrySelect.append(domThisOption);
						} else {
							if (window.console)
								console.warn("Unable to add country:", thisCountry);
						}
					}
				}
				domCountrySelect.val(defaultCountry).trigger("change");
			} catch (err) {
				if (window.console)
					console.error("Unable to build the country select dropdown", err);
			}
		}

		function buildCountryOption(country, attributes) {
			if (typeof attributes == "undefined") {
				var attributes = {};
			}
			if (typeof attributes != "object") {
				if (window.console)
					console.warn(
						"buildCountryOption() ignoring invalid attributes object",
						attributes
					);
				attributes = {};
			}
			var domOption = null;
			try {
				if (country.code) {
					domOption = document.createElement("option");
					domOption.innerText = country.name;
				}
			} catch (err) {
				if (window.console)
					console.error("Unable to build the option element for country:", country);
			}
			for (var key in attributes) {
				domOption.setAttribute(key, attributes[key]);
			}
			return domOption;
		}

		function buildCardExpireMonthSelect() {
			try {
				var domCardExpireMonthSelect = jqContainer.find(
					'select[name="payCardExpireMonth"]'
				);
				if (domCardExpireMonthSelect.length !== 1) {
					throw new Error("Unable to identify the card expire month select dropdown");
				}
				// add placeholder value
				var domThisOption = buildCardExpireMonthOption("Month", {
					value: "",
					"data-label-id": "cardInfo.cardExpireMonthPlaceholder",
				});
				domCardExpireMonthSelect.append(domThisOption);
				// add months
				for (var expireMonth = 1; expireMonth <= 12; expireMonth++) {
					domThisOption = buildCardExpireMonthOption(expireMonth);
					if (domThisOption) {
						domCardExpireMonthSelect.append(domThisOption);
					} else {
						if (window.console)
							console.warn("Unable to add card expire month:", expireMonth);
					}
				}
			} catch (err) {
				if (window.console)
					console.error("Unable to build the card expire month select dropdown", err);
			}
		}

		function buildCardExpireMonthOption(month, attributes) {
			if (typeof attributes == "undefined") {
				var attributes = {};
			}
			if (typeof attributes != "object") {
				if (window.console)
					console.warn(
						"buildRegionOption() ignoring invalid attributes object",
						attributes
					);
				attributes = {};
			}

			var domOption = null;
			try {
				if (typeof month != "number" && typeof month != "string" && !month) {
					if (window.console) console.error("Invalid month given:", month);
				} else {
					try {
						var tempInt = parseInt(month);
						if (!isNaN(tempInt) && tempInt >= 0 && tempInt < 10) {
							month = "0" + tempInt;
						}
					} catch (err) {}

					domOption = document.createElement("option");
					for (var key in attributes) {
						domOption.setAttribute(key, attributes[key]);
					}
					domOption.innerText = month;
				}
			} catch (err) {
				if (window.console)
					console.error("Unable to build the option element for month:", month);
			}
			return domOption;
		}

		function buildCardExpireYearSelect() {
			try {
				// show only current year and beyond
				var recentDate = new Date();
				recentDate.setDate(recentDate.getDate() - 7); // show last year for 7 days
				var startYear = recentDate.getFullYear();
				var yearsToShow = 20;

				var domCardExpireYearSelect = jqContainer.find(
					'select[name="payCardExpireYear"]'
				);
				if (domCardExpireYearSelect.length !== 1) {
					throw new Error("Unable to identify the card expire year select dropdown");
				}
				// add placeholder value
				var domThisOption = buildCardExpireYearOption("Year", {
					value: "",
					"data-label-id": "cardInfo.cardExpireYearPlaceholder",
				});
				domCardExpireYearSelect.append(domThisOption);
				// add years
				for (
					var expireYear = startYear;
					expireYear < startYear + yearsToShow;
					expireYear++
				) {
					domThisOption = buildCardExpireYearOption(expireYear);
					if (domThisOption) {
						domCardExpireYearSelect.append(domThisOption);
					} else {
						if (window.console)
							console.warn("Unable to add card expire year:", expireYear);
					}
				}
			} catch (err) {
				if (window.console)
					console.error("Unable to build the card expire year select dropdown", err);
			}
		}

		function buildCardExpireYearOption(year, attributes) {
			if (typeof attributes == "undefined") {
				var attributes = {};
			}
			if (typeof attributes != "object") {
				if (window.console)
					console.warn(
						"buildRegionOption() ignoring invalid attributes object",
						attributes
					);
				attributes = {};
			}

			var domOption = null;
			try {
				if (typeof year != "number" && typeof year != "string" && !year) {
					if (window.console) console.error("Invalid year given:", year);
				} else {
					if (typeof value == "undefined") {
						var value = year;
					}

					domOption = document.createElement("option");
					for (var key in attributes) {
						domOption.setAttribute(key, attributes[key]);
					}
					domOption.innerText = year;
				}
			} catch (err) {
				if (window.console)
					console.error("Unable to build the option element for year:", year);
			}
			return domOption;
		}

		async function setupCompanyMatchSelect() {
			if (thisWidget.promises.spreedlyIframeScript) {
				await thisWidget.promises.spreedlyIframeScript;
			}
			var theLabel = "Search by company name";
			try {
				if (thisWidget.labelOverride.donor.matchCompanyPlaceholder) {
					theLabel =
						thisWidget.labelOverride.donor.matchCompanyPlaceholder || theLabel;
				}
			} catch (err) {}

			var jqMatchSelect = jq('select[name="donorMatchCompany"]');

			if (typeof jqMatchSelect.select2 != "function") {
				if (window.console) console.warn("SKIPPING COMPANY MATCH SMART SELECTOR");
				return;
			}

			jqMatchSelect.select2({
				minimumInputLength: 3,
				delay: 400,
				placeholder: theLabel,
				width: "100%",
				ajax: {
					url: thisWidget.urls.companyMatchApi,
					data: function(params) {
						var query = {
							q: params.term,
						};
						return query;
					},
					processResults: function(data) {
						var returnObject = {
							results: [],
						};

						if (typeof data == "object" && data.length) {
							for (var i = 0; i < data.length; i++) {
								if (data[i].name) {
									returnObject.results.push({
										id: data[i].name,
										text: data[i].name,
									});
								}
							}
						}
						return returnObject;
					},
				},
			});
		}

		function setupSpreedly() {
			return new Promise(async (resolve) => {
				await thisWidget.promises.spreedlyIframeScript;

				Spreedly.on("ready", function() {
					setSpreedlyLabels();
					resolve();
				});

				Spreedly.on("paymentMethod", function(token, result) {
					window.mwdspace.transactionSendData.paymentToken = null;

					if (result.errors && result.errors.length > 0) {
						if (window.console)
							console.warn("SPREEDLY REPORTS paymentMethod ERRORS:");
						for (var i = 0; i < result.errors.length; i++) {
							var error = result.errors[i];
							if (window.console) console.warn(error);
						}
						var message =
							"Error during secure card information transfer. Please try again.";
						try {
							message =
								thisWidget.labelOverride.gift.error.tokenizeError || message;
						} catch (err) {}
						showStepFeedback("cardInfo", message, true);
					} else {
						window.mwdspace.transactionSendData.paymentToken = token;
						sendTransaction();
						showStepFeedback("cardInfo");
					}
				});

				Spreedly.on("fieldEvent", function(name, type, activeEl, response) {
					if (type == "input") {
						window.mwdspace.userInputData.hasValidCardNumber =
							response.validNumber || false;
						window.mwdspace.userInputData.hasValidCardCvv =
							response.validCvv || false;
						window.mwdspace.userInputData.payCardType = response.cardType || false;
						if (name == "number") {
							setCardNumberFeedback(response.validNumber, response.cardType);
						}
					}
				});

				Spreedly.on("errors", function(errors) {
					if (window.console) console.warn("SPREEDLY REPORTS GENERAL ERRORS:");
					for (var i = 0; i < errors.length; i++) {
						var error = errors[i];
						if (window.console) console.warn(error);
					}
					var message = "Unexpected error with secure card handler";
					try {
						message =
							thisWidget.labelOverride.gift.error.generalTokenizerError ||
							message;
					} catch (err) {}
					showStepFeedback("cardInfo", message, true);
				});

				var paymentTokenApiKey = thisWidget.options.paymentTokenApiKey;
				if (inTestMode) {
					paymentTokenApiKey = thisWidget.defaults.testPaymentTokenApiKey;
				}
				Spreedly.init(paymentTokenApiKey, {
					numberEl: "cardNumberTarget",
					cvvEl: "cardCvvTarget",
				});
			});
		}

		function setSpreedlyLabels() {
			Spreedly.setFieldType("number", "text");
			Spreedly.setNumberFormat("prettyFormat");

			// match styles from another similar field
			var inputFontSize = jqPayMethodSelect.css("font-size") || "16px";
			var inputColor = jqPayMethodSelect.css("color") || "#333";
			var cssString =
				"padding:0;font-size:" + inputFontSize + ";color:" + inputColor + ";";
			Spreedly.setStyle("number", cssString);
			Spreedly.setStyle("cvv", cssString);

			var labelCard = "Card";
			var labelCvv = "cvv";
			try {
				if (thisWidget.labelOverride.cardInfo.cardNumberPlaceholder) {
					labelCard = thisWidget.labelOverride.cardInfo.cardNumberPlaceholder;
				}
			} catch (err) {}
			try {
				if (thisWidget.labelOverride.cardInfo.cvvPlaceholder) {
					labelCvv = thisWidget.labelOverride.cardInfo.cvvPlaceholder;
				}
			} catch (err) {}
			Spreedly.setPlaceholder("number", labelCard);
			Spreedly.setPlaceholder("cvv", labelCvv);
		}

		function setCardNumberFeedback(isValid, cardType) {
			if (isValid) {
				jqCardNumberFeedback
					.find("span.cardNumberValidity")
					.removeClass("invalid")
					.addClass("valid")
					.html('<i class="fa fas fa-check-circle"></i>');
			} else {
				jqCardNumberFeedback
					.find("span.cardNumberValidity")
					.removeClass("valid")
					.addClass("invalid")
					.html('<i class="fa fas fa-times"></i>');
			}

			var jqCardIcon = jqCardNumberFeedback.find("span.cardType");
			switch (cardType) {
				case "visa":
					jqCardIcon.html(thisWidget.payMethodIconHtml.visa).addClass("known");
					break;
				case "master":
					jqCardIcon.html(thisWidget.payMethodIconHtml.mastercard).addClass("known");
					break;
				case "american_express":
					jqCardIcon.html(thisWidget.payMethodIconHtml.amex).addClass("known");
					break;
				case "discover":
					jqCardIcon.html(thisWidget.payMethodIconHtml.discover).addClass("known");
					break;
				default:
					jqCardIcon.html(thisWidget.payMethodIconHtml.card).removeClass("known");
			}
		}

		function setOptionalSectionVisibility() {
			// COMPANY MATCH
			var jqCompanyMatchGroup = jqContainer
				.find('input[name="companyMatch"]')
				.closest("div.inputGroup");
			if (thisWidget.options.includeCompanyMatch) {
				jqCompanyMatchGroup.show();
			} else {
				jqCompanyMatchGroup.hide();
			}

			// EXTRA PERCENT
			var jqExtraPercentRadio = jqContainer
				.find('input[name="giftExtraPercent"]')
				.closest("div.inputGroup");
			if (thisWidget.options.includeExtraPercent) {
				jqExtraPercentRadio.show();
			} else {
				jqExtraPercentRadio.hide();
			}
		}

		function tokenizeUserCard() {
			// tokenize only when all fields are ready
			// when successful, this will populate transactionSendData.paymentToken field

			if (
				userInputData.hasValidCardNumber &&
				userInputData.hasValidCardCvv &&
				userInputData.payCardExpireMonth &&
				userInputData.donorFirstName &&
				userInputData.donorLastName &&
				userInputData.payCardExpireYear
			) {
				if (typeof Spreedly == "object") {
					var tokenOptions = {
						// Required
						first_name: userInputData.donorFirstName,
						last_name: userInputData.donorLastName,
						month: userInputData.payCardExpireMonth,
						year: userInputData.payCardExpireYear,
					};
					// Optional
					if (userInputData.donorEmail) {
						tokenOptions.email = userInputData.donorEmail;
					}
					if (userInputData.donorPhone) {
						tokenOptions.phone_number = userInputData.donorPhone;
					}
					if (userInputData.donorStreet) {
						tokenOptions.address1 = userInputData.donorStreet;
					}
					if (userInputData.donorCity) {
						tokenOptions.city = userInputData.donorCity;
					}
					if (userInputData.donorRegion) {
						tokenOptions.state = userInputData.donorRegion;
					}
					if (userInputData.donorPostCode) {
						tokenOptions.zip = userInputData.donorPostCode;
					}
					if (userInputData.donorCountry) {
						tokenOptions.country = userInputData.donorCountry;
					}

					Spreedly.tokenizeCreditCard(tokenOptions);
					return true;
				} else {
					if (window.console) console.error("NO SPREEDLY OBJECT");
				}
			} else {
				if (window.console) console.error("SPREEDLY FIELD NOT READY");
			}
			return false;
		}

		function prepAndShowProcessingStep() {
			var iconHtml = "";

			if (window.mwdspace.userInputData.payMethod == "bitcoin") {
				iconHtml = thisWidget.payMethodIconHtml.bitcoin;
			} else if (window.mwdspace.userInputData.payMethod == "card") {
				switch (window.mwdspace.userInputData.payCardType) {
					case "visa":
						iconHtml = thisWidget.payMethodIconHtml.visa;
						break;
					case "mastercard":
					case "master":
					case "mc":
						iconHtml = thisWidget.payMethodIconHtml.mastercard;
						break;
					case "amex":
					case "american_express":
					case "americanexpress":
						iconHtml = thisWidget.payMethodIconHtml.amex;
						break;
					case "discover":
					case "disc":
						iconHtml = thisWidget.payMethodIconHtml.discover;
						break;
				}
			}

			var jqStep = jqContainer.find('section[data-step-name="processing"]');
			jqStep.find("span.processingPaySymbol").html(iconHtml);

			showStep("processing");
		}

		function prepAndShowBitcoinStep(input) {
			if (typeof input != "object") {
				if (window.console)
					console.warn("prepAndShowBitcoinStep() given invalid input", input);
				prepAndShowErrorStep("Unable to display Bitcoin invoice screen");
				return;
			}
			var jqStep = jqContainer.find('section[data-step-name="bitcoinInvoice"]');

			jqStep.find("span.bitcoinStatus").html(input.invoice_status);
			jqStep
				.find("img.scanCode")
				.attr("src", "data:image/png;charset=utf-8;base64," + input.img_data);
			jqStep.find("span.bitcoinAmount").html(input.alt_amount);
			jqStep.find("span.bitcoinWalletLink").html(input.checkout_url);
			jqStep.find("a.bitcoinWalletLink").attr("href", input.checkout_url);

			// keep expire countdown timer updated
			updateBitcoinTimer(input.exp);
			thisWidget.intervals.bitcoinTimer = setInterval(function() {
				updateBitcoinTimer(input.exp);
			}, 1000);

			showStep("bitcoinInvoice");

			// watch for payment completion on Bitcoin side
			thisWidget.intervals.bitcoinStatusChecker = setInterval(function() {
				if (window.console)
					console.log(
						"Calling checkBitcoinPaymentStatus() with ",
						input.transaction_id
					);
				checkBitcoinPaymentStatus(input.transaction_id);
			}, 30000);
		}

		function updateBitcoinTimer(expireTime) {
			if (typeof expireTime == "undefined") {
				var expireTime = null;
			}
			var displayCountdown = "Unknown time";
			try {
				var minutes = 0;
				var seconds = 0;

				var expireDate = new Date(expireTime).getTime();
				var now = new Date().getTime();

				var minutesRemaining = (expireDate - now) / 1000 / 60;

				if (minutesRemaining > 0) {
					minutes = parseInt(minutesRemaining);
					seconds = parseInt((minutesRemaining - minutes) * 60);

					if (minutesRemaining < 2) {
						jqBitcoinTimeRemaining
							.closest("div.bitcoinStatusDisplay")
							.addClass("warning");
					}
				} else {
					jqBitcoinTimeRemaining
						.closest("div.bitcoinStatusDisplay")
						.addClass("error");
					clearInterval(thisWidget.intervals.bitcoinTimer);
				}

				if (seconds < 10) {
					seconds = "0" + seconds;
				}
				displayCountdown = minutes.toFixed() + ":" + seconds;
			} catch (err) {
				if (window.console)
					console.warn("updateBitcoinTimer() caught error", err.message);
			}
			jqBitcoinTimeRemaining.html(displayCountdown);
		}

		async function checkBitcoinPaymentStatus(input) {
			if (typeof input != "string") {
				if (window.console)
					console.warn(
						"checkBitcoinPaymentStatus() given invalid transaction id:",
						typeof input,
						input
					);
				resolve(null);
			}

			var baseUrl = thisWidget.urls.bitcoinPaymentApi;
			if (inTestMode) {
				baseUrl = thisWidget.urls.testBitcoinPaymentApi;
			}

			var jqBitcoinContainer = jqContainer.find("div.bitcoinContainer");

			var response = await new Promise(function(resolve) {
				var requestUrl = encodeURI(baseUrl + "invoices/" + input);
				var xhr = new XMLHttpRequest();

				xhr.addEventListener("load", function(event) {
					// if (window.console) console.log("FILE LOADED:", event);
					var fileContents =
						event.target.responseText || event.target.response || null;
					var tempObject = window.mwdspace.sharedUtils.safeJsonParse(fileContents);

					if (!tempObject || !tempObject.data) {
						if (window.console)
							console.log("checkBitcoinPaymentStatus(): invalid response", event);
						resolve(null);
					}

					resolve(tempObject.data);
				});
				xhr.addEventListener("error", function(event) {
					if (window.console)
						console.error(
							"checkBitcoinPaymentStatus() ERROR EVENT",
							requestUrl,
							event
						);
					resolve(null);
				});

				xhr.open("get", requestUrl, true);
				xhr.setRequestHeader("Accept", "application/json");
				xhr.send();
			});

			if (!response) {
				var domMessage = document.createElement("div");
				domMessage.innerHTML =
					"Warning: Unable to verify the status of this invoice (" +
					new Date().toLocaleTimeString() +
					"). Will try again shortly.</div>";
				jq(domMessage).addClass("spacingContainer error");
				jqBitcoinContainer
					.find("div.bitcoinFeedback")
					.empty()
					.append(domMessage);
				return;
			}

			if (window.console) console.log("checkBitcoinPaymentStatus() RESPONSE", response);

			jqBitcoinContainer.find("div.bitcoinStatus").html(response.status);

			switch (response.status) {
				case "paid":
				case "confirmed":
				case "complete":
					prepAndShowConfirmationStep();
					clearInterval(thisWidget.intervals.bitcoinStatusChecker);
					break;
				case "expired":
					prepAndShowErrorStep(
						"The Bitcoin invoice expired before payment was received."
					);
					clearInterval(thisWidget.intervals.bitcoinStatusChecker);
					break;
				case "invalid":
					var domMessage = document.createElement("div");
					domMessage.innerHTML =
						"The invoice received payments, but is listed as invalid.";
					jq(domMessage).addClass("spacingContainer error");
					jqBitcoinContainer
						.find("div.bitcoinFeedback")
						.empty()
						.append(domMessage);
					break;
				case "new":
					// FOR TEST MODE
					if (inTestMode) {
						prepAndShowConfirmationStep();
						clearInterval(thisWidget.intervals.bitcoinStatusChecker);
					}

					break;
			}
		}

		function prepAndShowConfirmationStep(input) {
			if (typeof input == "undefined") {
				var input = {};
			}

			var jqMessage = jqContainer.find(
				'section[data-step-name="confirmation"] span.confirmationMessage'
			);

			// THANK YOU TEXT
			var thankYouText = "Thank you";
			try {
				if (thisWidget.labelOverride.confirmation.thankYouText) {
					thankYouText = thisWidget.labelOverride.confirmation.thankYouText;
				}
			} catch (err) {}
			jqMessage.html(thankYouText);

			// FIRST NAME
			try {
				if (window.mwdspace.userInputData.donorFirstName) {
					var domFirstName = document.createElement("strong");
					domFirstName.innerHTML = window.mwdspace.userInputData.donorFirstName;
					jqMessage.append(", ");
					jqMessage.append(domFirstName);
				}
			} catch (err) {}
			jqMessage.append("!");

			showStep("confirmation");

			if (thisWidget.options.onDonation) {
				try {
					if (window.console) console.log(">>> Calling custom onDonation function");
					thisWidget.options.onDonation(window.mwdspace.userInputData);
				} catch (err) {
					if (window.console)
						console.error("Caught error from onDonation function: ", err.message);
				}
			}
		}

		function prepAndShowErrorStep(input) {
			if (typeof input == "undefined") {
				var input = {};
			}
			var jqStep = jqContainer.find('section[data-step-name="transactionError"]');
			jqStep.find("span.errorMessage").html(input);
			showStep("transactionError");
		}

		function scrollAll(theElement) {
			if (typeof theElement == "undefined") {
				return;
			}
			if (!thisWidget.allowAutoScroll) {
				// don't scroll until after initial page load is complete
				return;
			}
			theElement = jq(theElement);
			if (theElement.length <= 0) {
				return;
			}

			var originalScrollTop = jq(window).scrollTop();
			var baseScrollTime = 555;

			var viewHeight = jq(window).height();
			var viewTop = originalScrollTop;
			var viewBottom = viewTop + viewHeight;

			var elementHeight = theElement.innerHeight();
			var elementPadding = (theElement.outerHeight() - elementHeight) / 2;
			elementPadding = elementPadding <= 0 ? 0 : elementPadding;

			var elementTop = theElement.offset().top;
			var elementBottom = elementTop + elementHeight;

			var topVisualPadding = 0;
			if (typeof thisWidget.defaults.topVisualPaddingSelector == "string") {
				topVisualPadding =
					jq(thisWidget.defaults.topVisualPaddingSelector).outerHeight() || 0;
				topVisualPadding =
					topVisualPadding > viewHeight * 0.25 ? viewHeight * 0.25 : topVisualPadding;
			}

			// if (window.console) {
			// 	if (window.console) console.log("viewTop", viewTop);
			// 	if (window.console) console.log("elementTop", elementTop);
			// 	if (window.console) console.log("elementPadding", elementPadding);
			// }

			//top is off screen or  element is taller the screen, so scroll to element top
			if (elementHeight > viewHeight || viewTop + topVisualPadding > elementTop) {
				// if (window.console) console.log("SCROLL TO TOP");
				animateScroll(elementTop - topVisualPadding, -5);
				return;
			}

			//the element bottom is off screen so scroll up enough to not push the top offscreen
			if (viewBottom < elementBottom) {
				// if (window.console) console.log("SCROLL TO BOTTOM");
				var newTop = elementBottom - viewHeight;
				if (newTop < topVisualPadding) {
					newTop = topVisualPadding;
				}
				animateScroll(newTop, 5);
			}

			function animateScroll(scrollTop, gap) {
				// if (window.console) console.log("animateScroll", scrollTop, gap);

				if (typeof gap == "undefined") {
					var gap = 0;
				}

				jq("html,body").animate(
					{
						scrollTop: scrollTop + gap,
					},
					baseScrollTime
				);
			}
		}
	};

	window.mwdspace.MFA_Funraise_Widget.prototype.linkExternalStylesheet = function(url) {
		var thisWidget = this;
		return new Promise(function(resolve) {
			// if (window.console) console.log("linkExternalStylesheet() start:", url);
			var domStyleLink = document.createElement("link");
			thisWidget.domTargetElement.appendChild(domStyleLink);
			domStyleLink.rel = "stylesheet";
			domStyleLink.type = "text/css";
			var timeout = setTimeout(function() {
				if (window.console)
					console.log("linkExternalStylesheet() No load after 5s", url);
				resolve(false);
			}, 5000);
			domStyleLink.addEventListener("load", function(event) {
				clearTimeout(timeout);
				// if (window.console) console.log("STYLESHEET LOADED:", url);
				resolve(true);
			});
			domStyleLink.addEventListener("error", function(event) {
				if (window.console)
					console.error("linkExternalStylesheet() ERROR EVENT", url, event);
				resolve(false);
			});
			domStyleLink.href = encodeURI(url);
		});
	};

	window.mwdspace.MFA_Funraise_Widget.prototype.linkExternalScript = function(url) {
		var thisWidget = this;
		return new Promise(function(resolve) {
			// if (window.console) console.log("linkExternalScript() start:", url);
			var domScript = document.createElement("script");
			thisWidget.domTargetElement.appendChild(domScript);
			var timeout = setTimeout(function() {
				if (window.console) console.log("linkExternalScript() No load after 5s", url);
				resolve(false);
			}, 5000);
			domScript.addEventListener("load", function(event) {
				clearTimeout(timeout);
				// if (window.console) console.log("SCRIPT LOADED:", url);
				resolve(true);
			});
			domScript.addEventListener("error", function(event) {
				clearTimeout(timeout);
				if (window.console) console.error("linkExternalScript() ERROR", url, event);
				resolve(false);
			});
			domScript.src = encodeURI(url);
		});
	};

	window.mwdspace.MFA_Funraise_Widget.prototype.loadFile = function(input) {
		var thisWidget = this;
		return new Promise(function(resolve) {
			if (typeof input == "undefined") {
				if (window.console) console.warn("loadFile() given empty url");
				resolve(null);
			}
			if (typeof input != "string") {
				if (window.console)
					console.warn("loadFile() given invalid url type:", typeof input, input);
				resolve(null);
			}
			// if (window.console) console.log("loadFile() start:", input);
			var requestUrl = encodeURI(input);
			var xhr = new XMLHttpRequest();

			var timeout = setTimeout(function() {
				if (window.console) console.log("linkExternalScript() No load after 5s", url);
				resolve(false);
			}, 5000);
			xhr.addEventListener("load", function(event) {
				clearTimeout(timeout);
				// if (window.console) console.log("FILE LOADED:", input);
				var fileContents = event.target.responseText || event.target.response || null;
				resolve(fileContents);
			});
			xhr.addEventListener("error", function(event) {
				clearTimeout(timeout);
				if (window.console) console.error("loadFile() ERROR EVENT", requestUrl, event);
				resolve(null);
			});

			xhr.open("get", requestUrl, true);
			xhr.send();
		});
	};

	window.mwdspace.MFA_Funraise_Widget.prototype.getFontIconStyles = function() {
		var thisWidget = this;
		return new Promise(async (resolve) => {
			var fontsLoaded = false;
			if (thisWidget.options.fontAwesomeVersion == 4) {
				fontsLoaded = await thisWidget.linkExternalStylesheet(
					thisWidget.urls.fontAwesome4
				);
			} else if (thisWidget.options.fontAwesomeVersion == 5) {
				fontsLoaded = await thisWidget.linkExternalStylesheet(
					thisWidget.urls.fontAwesome5
				);
			}
			return resolve(fontsLoaded);
		});
	};

	window.mwdspace.MFA_Funraise_Widget.prototype.prepareLabelOverride = function() {
		var thisWidget = this;
		return new Promise(async (resolve) => {
			if (thisWidget.options.labelOverrideObject) {
				if (window.console) console.log("Using label object");
				thisWidget.labelOverride = thisWidget.options.labelOverrideObject;
				resolve(true);
			} else if (thisWidget.options.labelOverrideFileUrl) {
				try {
					if (window.console)
						console.log(
							"Loading label file:",
							thisWidget.options.labelOverrideFileUrl
						);
					var overrideFileContents = await thisWidget.loadFile(
						thisWidget.options.labelOverrideFileUrl
					);
					if (overrideFileContents) {
						var tempObject = window.mwdspace.sharedUtils.safeJsonParse(
							overrideFileContents
						);
						if (tempObject) {
							thisWidget.labelOverride = tempObject;
							resolve(true);
						} else {
							if (window.console)
								console.error(
									"MFA_Funraise_Widget.prepareLabelOverride() - unable to parse text override data from file:",
									thisWidget.options.labelOverride
								);
						}
					} else {
						if (window.console)
							console.error(
								"MFA_Funraise_Widget.prepareLabelOverride() - unable to load file for text override data:",
								thisWidget.options.labelOverride
							);
					}
				} catch (err) {
					if (window.console)
						console.log("prepareLabelOverride() caught error: ", err.message);
				}
			}

			resolve(false);
		});
	};

	window.mwdspace.MFA_Funraise_Widget.prototype.processLabelOverrideObject = function(
		input,
		prefix
	) {
		var thisWidget = this;
		if (typeof input != "object" || !input) {
			if (window.console)
				console.warn(
					"MFA_Funraise_Widget.processLabelOverrideObject() given invalid object",
					typeof input
				);
			return false;
		}
		if (typeof prefix == "undefined") {
			var prefix = "";
		}
		if (typeof prefix != "string") {
			if (window.console) console.warn("Ignoring invalid string prefix value", prefix);
			prefix = "";
		}
		if (prefix) {
			prefix = prefix + ".";
		}
		var thisSelector;
		for (var key in input) {
			thisSelector = prefix + key;
			if (typeof input[key] == "string") {
				thisWidget.setElementLabelOverride(thisSelector, input[key]);
			} else {
				// recursive, to handle nested JSON objects
				thisWidget.processLabelOverrideObject(input[key], thisSelector);
			}
		}
	};

	window.mwdspace.MFA_Funraise_Widget.prototype.setElementLabelOverride = function(
		labelId,
		value
	) {
		var thisWidget = this;
		if (typeof labelId == "undefined") {
			var labelId = "";
		}
		if (!labelId) {
			if (window.console) console.warn("setElementLabelOverride() given empty labelId");
			return;
		}
		var selector = '[data-label-id="' + labelId + '"]';
		var elementList = document.querySelectorAll(selector);
		var thisTag;
		if (elementList) {
			for (var i = 0; i < elementList.length; i++) {
				thisTag = String(elementList[i].tagName).toLowerCase();
				switch (thisTag) {
					case "input":
						elementList[i].setAttribute("placeholder", value);
						break;
					case "label":
					case "span":
					case "div":
					case "option":
					case "h1":
					case "h2":
					case "h3":
					case "h4":
					case "h5":
					case "h6":
					case "p":
					case "li":
						elementList[i].innerHTML = value;
						break;
					default:
						if (window.console)
							console.warn(
								"setElementLabelOverride(): Ignoring tag",
								labelId,
								thisTag
							);
				}
			}
		} else {
			if (window.console) console.warn("REPLACE labelId not found", labelId);
		}
	};
})();
