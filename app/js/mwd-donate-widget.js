"use strict";
(function() {
	console.log("mwd-donate-widget.js v18.7.12");

	window.mwdspace = window.mwdspace || {};

	var payMethodIconHtml = {
		card: '<i class="far fa-credit-card"></i>',
		visa: '<i class="fab fa-cc-visa"></i>',
		mastercard: '<i class="fab fa-cc-mastercard"></i>',
		amex: '<i class="fab fa-cc-amex"></i>',
		discover: '<i class="fab fa-cc-discover"></i>',
		bitcoin: '<i class="fab fa-bitcoin"></i>',
	};

	window.mwdspace.MFA_Funraise_Widget = function(input) {
		var thisWidget = this;
		if (typeof input == "object") {
			thisWidget.options = input;
		} else {
			thisWidget.options = {};
		}

		thisWidget.isStarted = false;
		thisWidget.isLoaded = false;
		thisWidget.codeVersion = "1.0.0";
		thisWidget.baseWidgetUrl =
			"https://quiz.mercyforanimals.org/donate-widget/" + thisWidget.codeVersion + "/";

		thisWidget.targetElement = {};
		thisWidget.promises = {};
		thisWidget.intervals = {};

		thisWidget.mainStylesUrl = thisWidget.baseWidgetUrl + "css/mwd-donate-widget.css";
		thisWidget.mainHtmlUrl = thisWidget.baseWidgetUrl + "mwd-donate-widget.html";

		console.log("window.mwdspace.MFA_Funraise_Widget", thisWidget.codeVersion);

		if (!thisWidget.options.loadingText) {
			thisWidget.options.loadingText = "One moment...";
		}

		if (!thisWidget.options.element) {
			console.warn("Invalid options - No target element:", thisWidget.options);
			return false;
		}

		if (
			typeof thisWidget.options.organizationId != "string" ||
			!thisWidget.options.organizationId.trim()
		) {
			thisWidget.options.organizationId = "fcb4d538-ca92-4212-86cc-06d8ac929c4d";
		}
		if (
			typeof thisWidget.options.formId != "number" ||
			typeof thisWidget.options.formId != "string" ||
			!thisWidget.options.formId
		) {
			thisWidget.options.formId = 1194; // 4394
		}
		if (
			!thisWidget.options.listSingleGiftAskString ||
			!thisWidget.options.listSingleGiftAskString.length
		) {
			thisWidget.options.listSingleGiftAskString = [25, 50, 75, 100];
		}

		if (
			!thisWidget.options.listMonthlyGiftAskString ||
			!thisWidget.options.listMonthlyGiftAskString.length
		) {
			thisWidget.options.listMonthlyGiftAskString = [5, 10, 15, 20];
		}

		window.mwdspace.pageIdPrefix = "form" + thisWidget.options.formId;

		var target = document.querySelectorAll(thisWidget.options.element);
		if (!target) {
			console.warn("Specified target element not found:", thisWidget.options.element);
			return false;
		}
		thisWidget.targetElement = target[0];
	};

	window.mwdspace.MFA_Funraise_Widget.prototype.start = async function() {
		var thisWidget = this;
		if (thisWidget.isStarted) {
			console.warn("window.mwdspace.MFA_Funraise_Widget already started");
			return;
		}
		thisWidget.isStarted = true;

		thisWidget.targetElement.innerHTML = "";

		var promiseFontStyles = thisWidget.linkExternalStylesheet(
			"https://use.fontawesome.com/releases/v5.1.0/css/all.css"
		);
		var stylesUrl = thisWidget.options.styleSheets || thisWidget.mainStylesUrl;
		var promiseMainStyles = thisWidget.linkExternalStylesheet(stylesUrl);
		thisWidget.linkExternalStylesheet(
			"https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css"
		);
		await Promise.all([promiseFontStyles, promiseMainStyles]);

		var widgetHtml, sharedUtilResult;
		var promiseMainHtml = thisWidget.loadFile(thisWidget.mainHtmlUrl);
		var promiseSharedUtils = thisWidget.linkExternalScript(
			thisWidget.baseWidgetUrl + "js/shared-utils.js"
		);
		[widgetHtml, sharedUtilResult] = await Promise.all([
			promiseMainHtml,
			promiseSharedUtils,
		]);
		if (!widgetHtml) {
			console.error("MFA_Funraise_Widget.start() - unable to load base HTML");
			return;
		}

		var container = document.createElement("div");
		container.id = "mfaDonationWidgetContainer";
		container.style.opacity = 0;
		thisWidget.targetElement.appendChild(container);

		container.innerHTML = widgetHtml;

		setTimeout(function() {
			container.className = "reveal";
		}, 1);

		// start Spreedly first bc it has slow response time
		thisWidget.promises.spreedlyIframeScript = thisWidget.linkExternalScript(
			"https://core.spreedly.com/iframe/iframe-v1.min.js"
		);
		var isJqueryLoaded = await thisWidget.linkExternalScript(
			"https://code.jquery.com/jquery-3.3.1.min.js"
		);

		// select2 should load after jQuery load complete
		var promiseSpecialSelectCode = thisWidget.linkExternalScript(
			"https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js"
		);

		var promiseBusinessLayer = thisWidget.linkExternalScript(
			thisWidget.baseWidgetUrl + "js/gift-utilities.js"
		);
		var promiseTransactionLayer = thisWidget.linkExternalScript(
			thisWidget.baseWidgetUrl + "js/transaction-system-layer.js"
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
			console.error("jQuery (thisWidget.jquery) not found");
			exit();
		}
		var jq = thisWidget.jquery;
		// console.log("MFA_Funraise_Widget using jQuery version", jq.fn.jquery);

		window.mwdspace.userInputData = {};
		window.mwdspace.transactionSendData = {};
		var userInputData = window.mwdspace.userInputData;
		userInputData.minimumAmount = 5;
		thisWidget.defaultGiftList = [25, 50, 75, 100];

		// GLOBALS
		// Funraise environment key: ECDNSGhIR0fYQisIc1PHH7NX0pN
		// MWD test environment key: ODBm2idmYFT3pBge5qxRBjQaWH9
		var paymentTokenizerId =
			thisWidget.options.paymentTokenizerId || "ECDNSGhIR0fYQisIc1PHH7NX0pN";

		// JQUERY OBJECTS
		var jqContainer = jq("div.giftFormContainer");
		var jqStepList = jqContainer.find("section.step");
		var jqMainBackButton = jqContainer.find("button.goPreviousStep");
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

		thisWidget.promises.labelOverrideLoad = thisWidget.prepareLabelOverride();

		buildCurrencySelect();
		buildPayMethodSelect();

		buildCountrySelect();
		buildCardExpireMonthSelect();
		buildCardExpireYearSelect();
		setupCompanyMatchSelect();

		setupInputWatchers();
		buildFrequencyButtons();
		prePopulateUserFields();

		// ensure text override file load (if any) is complete
		await thisWidget.promises.labelOverrideLoad;
		if (thisWidget.labelOverride) {
			thisWidget.processLabelOverride(thisWidget.labelOverride);
		}
		showStep();

		setupSpreedly(); //async, but waiting not required

		setTimeout(function() {
			thisWidget.isLoaded = true;
		}, 999);

		// GENERAL CLICK HANDLER
		document.addEventListener("click", function(event) {
			// console.log("click", event.target.tagName, event.target.className);
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
				}
			}
		});

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
			mwdspace.currentStepName = "";
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
					switch (targetStepName) {
						case "donorInfo":
						case "cardInfo":
							jq("div.giftFormHeaderContainer").show();
							jqMainBackButton.fadeIn(888);
							break;
						default:
							jqMainBackButton.hide();
					}
					jq(jqStepList[i]).fadeIn(666, function() {
						scrollAll(jqContainer);
					});
					mwdspace.currentStepName = thisName;
					if (targetStepName == "confirmation") {
						window.mwdspace.sharedUtils.removeSessionValue("savedStepName");
					}
				} else {
					jq(jqStepList[i]).hide();
				}
			}
		}

		function checkStepGift() {
			var isValid = true;

			if (
				typeof userInputData.baseAmount != "number" ||
				userInputData.baseAmount < userInputData.minimumAmount
			) {
				console.warn("baseAmount is invalid", userInputData.baseAmount);
				isValid = false;
				var message = "Please enter a valid gift amount";
				try {
					message = thisWidget.labelOverride.gift.error.invalidAmount;
				} catch (err) {}
				showStepFeedback("giftAmount", message, true);
			} else {
				showStepFeedback("giftAmount");
			}
			if (typeof userInputData.giftCurrency != "string") {
				console.warn("Currency is invalid", userInputData.giftCurrency);
				isValid = false;
			}
			if (typeof userInputData.payMethod != "string") {
				console.warn("Pay Method is invalid", userInputData.payMethod);
				isValid = false;
			}
			if (typeof userInputData.giftFrequency != "string") {
				console.warn("Gift frequency is invalid", userInputData.giftFrequency);
				isValid = false;
			}

			return isValid;
		}

		function checkStepDonor() {
			console.log(">>> checkStepDonor()");
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
				console.warn("donorFirstName is invalid", userInputData.donorFirstName);
				isValid = false;
			}
			if (typeof userInputData.donorLastName != "string") {
				console.warn("donorLastName is invalid", userInputData.donorLastName);
				isValid = false;
			}
			if (typeof userInputData.donorEmail != "string") {
				console.warn("donorEmail is invalid", userInputData.donorEmail);
				isValid = false;
			}
			if (
				typeof userInputData.donorPhone != "undefined" &&
				typeof userInputData.donorPhone != "string"
			) {
				console.warn("donorPhone is invalid", userInputData.donorPhone);
				isValid = false;
			}
			if (typeof userInputData.donorStreet != "string") {
				console.warn("donorStreet is invalid", userInputData.donorStreet);
				isValid = false;
			}
			if (typeof userInputData.donorRegion != "string") {
				console.warn("donorRegion is invalid", userInputData.donorRegion);
				isValid = false;
			}
			if (typeof userInputData.donorPostCode != "string") {
				console.warn("donorPostCode is invalid", userInputData.donorPostCode);
				isValid = false;
			}
			if (typeof userInputData.donorCountry != "string") {
				console.warn("donorCountry is invalid", userInputData.donorCountry);
				isValid = false;
			}
			if (userInputData.companyMatch == "on") {
				if (typeof userInputData.donorMatchCompany != "string") {
					console.warn(
						"donorMatchCompany is invalid",
						userInputData.donorMatchCompany
					);
					isValid = false;
				}
				if (typeof userInputData.donorMatchEmail != "string") {
					console.warn("donorMatchEmail is invalid", userInputData.donorMatchEmail);
					isValid = false;
				}
			}

			return isValid;
		}

		function checkStepCard() {
			console.log(">>> checkStepCard()");
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
				console.warn("hasValidCardNumber is invalid", userInputData.hasValidCardNumber);
			}
			var jqCardCvvBox = jqContainer.find("div.payInfoContainer div#cardCvvTarget");
			if (userInputData.hasValidCardCvv === true) {
				jqCardCvvBox.removeClass("invalid");
			} else {
				isValid = false;
				jqCardCvvBox.addClass("invalid");
				console.warn("hasValidCardCvv is invalid", userInputData.hasValidCardCvv);
			}

			if (typeof userInputData.payCardExpireMonth != "string") {
				console.warn("payCardExpireMonth is invalid", userInputData.payCardExpireMonth);
				isValid = false;
			}
			if (typeof userInputData.payCardExpireYear != "string") {
				console.warn("payCardExpireYear is invalid", userInputData.payCardExpireYear);
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
				console.log("showStepFeedback() given invalid input", stepName, message);
			}
			var jqFeedback = jq(
				'section[data-step-name="giftAmount"] div.userFeedback p.message'
			);
			if (message) {
				jqFeedback.html(message).fadeIn(444);
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
					updateCurrency();
				} else if (name == "payMethod" && tag == "select") {
					updatePayMethod();
				} else if (name == "giftFrequency" && tag == "input") {
					updateFrequency();
				}
			});

			// AMOUNT - also show header display
			jqContainer
				.find('div.giftOption input[name="giftAmountFreeform"]')
				.on("focus keyup paste", function(event) {
					console.log("FREEFORM EVENT", event.type);
					processGiftAmountChange(event);
				});

			// CURRENCY
			jqCurrencySelect.trigger("change");

			// PAYMENT METHOD
			jqPayMethodSelect.trigger("change");

			// FREQUENCY
			jqContainer.trigger("change");

			// COMPANY MATCH - also show/hide company match input fields
			jqContainer
				.find("input#inputCompanyMatch")
				.change(function() {
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
			// console.log("processChangeWatch()", jqThis, options);
			if (typeof options == "undefined") {
				var options = {};
			}

			var isValid = true;
			var validatedValue = null; // reset stored value when not valid

			options.validationPattern = jqThis.attr("data-validation");
			if (options.validationPattern) {
				isValid = validateInputField(jqThis, options);
			}

			if (isValid) {
				var elementType = jqThis.attr("type");
				if (elementType == "checkbox" || elementType == "radio") {
					if (jqThis.prop("checked")) {
						// set value only when boolean input checked
						validatedValue = options.value;
					}
				} else {
					validatedValue = options.value;
				}
			}
			userInputData[options.name] = validatedValue;

			window.mwdspace.sharedUtils.setSessionValue(options.name, options.value);
		}

		function validateInputField(jqThis, options) {
			// console.log("validateInputField()", jqThis, options);
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
				// case "giftAmount":
				// 	var valueFloat = parseFloat(valueString);
				// 	isValid = !isNaN(valueFloat) || valueFloat > userInputData.minimumAmount;
				// 	break;
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
			// console.log(">>> processGiftAmountChange()", event.type, jqTarget.attr("name"));
			var newValue = cleanCurrency(jqTarget.val()) || 0.0;
			updateGiftAmount({ baseAmount: newValue });
			jqContainer.find("div.giftOption input").removeClass("selected");

			jqTarget.addClass("selected");
			if (event.type == "change") {
				jq("div.giftFormHeaderContainer").slideDown(666, function() {
					scrollAll(jqContainer);
				});
			}
			if (jqTarget.attr("name") == "giftAmountFreeform") {
				if (event.type == "change" || event.type == "blur") {
					var amount = cleanCurrency(newValue) || 0.0;
					var cleanedAmount = amount.toFixed(2);
					if (cleanedAmount != newValue) {
						jqTarget.val(cleanedAmount);
					}
					if (amount < window.mwdspace.userInputData.minimumAmount) {
						jqTarget.addClass("invalid");
					} else {
						jqTarget.removeClass("invalid");
					}
				}
				jqContainer.find("div.giftOption input[type='radio']").prop("checked", false);
			}
		}

		function updateGiftAmount(input) {
			if (typeof input == "undefined") {
				var input = {};
			}
			try {
				userInputData.baseAmount = userInputData.baseAmount || 0;
				userInputData.extraPercent = userInputData.extraPercent || 0;
				if (typeof input.baseAmount != "undefined") {
					userInputData.baseAmount = parseFloat(input.baseAmount) || 0.0;
				}
				if (typeof input.extraPercent != "undefined") {
					userInputData.extraPercent = parseFloat(input.extraPercent) || 0.0;
				}
				var total = parseFloat(
					userInputData.baseAmount +
						(userInputData.baseAmount * userInputData.extraPercent) / 100
				);
				var displayAmount = total.toFixed(2).split(".");
				jqContainer
					.find("div.amountDisplay span.displayWholeAmount")
					.text(displayAmount[0]);
				jqContainer
					.find("div.amountDisplay span.displaySubAmount")
					.text("." + displayAmount[1]);

				window.mwdspace.sharedUtils.setSessionValue(
					"baseAmount",
					userInputData.baseAmount
				);
				window.mwdspace.sharedUtils.setSessionValue(
					"extraPercent",
					userInputData.extraPercent
				);
			} catch (err) {
				console.log("updateGiftAmount() caught error: ", err.message);
			}
		}

		function updateCurrency() {
			// delete userInputData.currency;
			var currencyCode = jqCurrencySelect.val();
			var currencySymbol = " (?) ";
			var thisItem;
			for (var i = 0; i < window.mwdspace.validCurrencyList.length; i++) {
				thisItem = window.mwdspace.validCurrencyList[i];
				if (thisItem.code == currencyCode && thisItem.symbol) {
					currencySymbol = thisItem.symbol;
					// userInputData.currency = currencyCode;
					break;
				}
			}
			jqContainer.find("span.currencySymbol").html(currencySymbol);
			// getGiftString();
		}

		function updatePayMethod() {
			var payMethod = jqPayMethodSelect.val();
			var thisItem;
			for (var i = 0; i < window.mwdspace.validPayMethodList.length; i++) {
				thisItem = window.mwdspace.validPayMethodList[i];
				if (thisItem.code == payMethod) {
					// userInputData.payMethod = thisItem.code;
					userInputData.minimumAmount = thisItem.minimumAmount;
					if (thisItem.frequencies) {
						console.log("calling freq filter", thisItem);
						filterFrequencyButtons(thisItem.frequencies);
					}
					break;
				}
			}
		}

		function filterFrequencyButtons(frequencyList) {
			if (typeof frequencyList != "object" || frequencyList.length < 1) {
				console.warn(
					"filterFrequencyButtons() ignoring invalid frequency list",
					frequencyList
				);
				return;
			}
			console.log("filterFrequencyButtons()", frequencyList);
			var visibleOptions = 0;
			var selectedOptionNowHidden = false;
			jqContainer
				.find("div.giftFrequencyContainer div.fancyRadioButton input[type='radio']")
				.each(function() {
					if (frequencyList.indexOf(jq(this).val()) >= 0) {
						// show this frequency
						jq(this)
							.closest("div.fancyRadioButton")
							.show();
						visibleOptions++;
					} else {
						// hide this frequency
						if (jq(this).prop("checked")) {
							selectedOptionNowHidden = true;
						}
						jq(this)
							.closest("div.fancyRadioButton")
							.hide();
					}
				});
			if (visibleOptions < 1) {
				// something is wrong, show all
				jqContainer.find("div.giftFrequencyContainer div.fancyRadioButton").show();
			} else if (visibleOptions == 1) {
				// hide all
				jqContainer.find("div.giftFrequencyContainer div.fancyRadioButton").hide();
			}
		}

		function updateFrequency() {
			// var frequency = jqContainer
			// 	.find("div.giftFrequencyContainer input[type='radio']:checked")
			// 	.val();
			// var thisItem;
			// for (var i = 0; i < window.mwdspace.validFrequencyList.length; i++) {
			// 	thisItem = window.mwdspace.validFrequencyList[i];
			// 	if (thisItem.code == frequency) {
			// 		userInputData.frequency = thisItem.code;
			// 		break;
			// 	}
			// }
			getGiftString();
		}

		function prePopulateUserFields() {
			setInputFromUrl("first", "donorFirstName");
			setInputFromUrl("last", "donorLastName");
			setInputFromUrl("email", "donorEmail");
			setInputFromUrl("phone", "donorPhone");
			setInputFromUrl("street", "donorStreet");
			setInputFromUrl("city", "donorCity");
			setInputFromUrl("postcode", "donorPostCode");
			setInputFromUrl("country", "donorCountry");
			setInputFromUrl("region", "donorRegion"); //must be after country

			setInputFromUrl("currency", "giftCurrency");
			setInputFromUrl("amount", "giftAmountFreeform");
		}

		function setInputFromUrl(urlKey, selector) {
			if (typeof urlKey == "undefined" || !urlKey) {
				console.log("setInputFromUrl() given invalid urlKey", urlKey);
				return;
			}
			if (typeof selector == "undefined" || !selector) {
				console.log("setInputFromUrl() given invalid selector", selector);
				return;
			}
			var urlValue = window.mwdspace.sharedUtils.getUrlParameter(urlKey);
			if (urlValue) {
				console.log("-- POPULATING", selector, "with", urlValue);
				var jqTarget = jqContainer
					.find(
						"section.step input[name='" +
							selector +
							"'], section.step select[name='" +
							selector +
							"']"
					)
					.val(urlValue)
					.trigger("change");
			}
		}

		function buildTransactionSendData() {
			console.log("buildTransactionSendData() START");
			try {
				window.mwdspace.transactionSendData = {};
				var sendData = window.mwdspace.transactionSendData;

				var userData = window.mwdspace.userInputData;
				console.log("buildTransactionSendData() userData", userData);

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

				var baseAmount = cleanCurrency(userData.baseAmount) || 0.0;
				var tipPercent = parseFloat(userData.giftExtraPercent) || 0.0;
				var tipAmount = cleanCurrency((baseAmount * tipPercent) / 100);
				sendData.amount = baseAmount + tipAmount;
				sendData.baseAmount = baseAmount.toFixed(2); //mimic test
				sendData.tipAmount = tipAmount.toFixed(2); //mimic test
				sendData.tipPercent = "3.00"; //mimic test

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

				console.log("buildTransactionSendData() sendData", sendData);
				return true;
			} catch (err) {
				console.log("buildTransactionSendData() caught error: ", err.message);
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
			console.log("sendTransaction() SENDING", window.mwdspace.transactionSendData);

			prepAndShowProcessingStep();

			window.mwdspace.transactionLayer.startDonation(
				window.mwdspace.transactionSendData,
				function(response) {
					console.log("SUCCESS FUNCTION", response);

					var transactionData = response.json || {};

					if (transactionData.type == "card") {
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
					} else if (transactionData.type == "bitcoin") {
						prepAndShowBitcoinStep(transactionData);
					} else {
						console.warn("Unrecognized type property in server response", response);
						prepAndShowErrorStep("Unrecognized response from the sever");
					}
				},
				function(response) {
					console.log("FAIL FUNCTION", response);

					console.warn("Donation received fail response from server", response);

					var userMessage;
					if (response.text) {
						// pass thru the transaction system response text
						userMessage = "System message:";
						try {
							userMessage =
								window.mwdspace.labelOverride.transactionError.error
									.systemMessage || userMessage;
						} catch (err) {}
						userMessage += " " + response.text;
					} else {
						userMessage =
							"The server was unable to process the transaction, but provided no explanation.";
						try {
							userMessage =
								window.mwdspace.labelOverride.transactionError.error.unknown ||
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
							console.log("Caught error: ", err.message);
						}
					}

					prepAndShowErrorStep(userMessage);
				}
			);
			return true;
		}

		function getGiftString() {
			var giftStringOptions = {
				// basicRounding: true,
				// minimumDynamicStart: 30.0,
			};
			if (window.mwdspace.userInputData.frequency == "monthly") {
				if (thisWidget.options.listMonthlyGiftAskString) {
					giftStringOptions.giftStringList =
						thisWidget.options.listMonthlyGiftAskString;
					if (!thisWidget.isMonthlyOnlyPage) {
						giftStringOptions.calculateAsMonthly = true;
					}
				}
			} else {
				if (thisWidget.options.listSingleGiftAskString) {
					giftStringOptions.giftStringList =
						thisWidget.options.listSingleGiftAskString;
				}
			}

			var finalGiftString = window.mwdspace.giftUtils.processGiftStringList(
				giftStringOptions
			);
			buildGiftStringButtons(finalGiftString);
		}

		function buildGiftStringButtons(giftStringList) {
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
				console.error("Unable to build the fixed gift buttons", err);
			}
			updateCurrency();
		}

		function buildGiftStringButton(input, options) {
			if (typeof options == "undefined") {
				var options = {};
			}
			if (typeof options != "object") {
				options = {};
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
				console.error("Error building the button for fixed amount:", input, err);
			}
			return domButton;
		}

		/* remove all but digits/dot before converting to float and rounding to 2 digits */
		function cleanCurrency(input) {
			if (typeof input == "undefined") {
				console.warn("cleanCurrency() given empty input");
				var input = "";
			}
			input = "" + input;
			var rawCurrency = parseFloat(input.replace(/[^0-9|\.]/g, ""));
			if (isNaN(rawCurrency)) {
				console.log("cleanCurrency() defaulting invalid input to 0.00", input);
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

		function buildCurrencySelect(options) {
			if (typeof options == "undefined") {
				var options = {};
			}
			if (typeof options != "object") {
				options = {};
				console.warn("buildCurrencySelect(): ignoring invalid option object", options);
			}
			var defaultCurrency = typeof options.default == "string" ? options.default : "USD";
			try {
				if (!window.mwdspace.validCurrencyList) {
					throw new Error("List of valid currencies not found");
				}
				var domCurrencySelect = jqCurrencySelect;
				if (domCurrencySelect.length !== 1) {
					throw new Error("Unable to identify the currency select dropdown");
				}
				var domThisOption, thisCurrency, okToAdd;

				for (var i = 0; i < window.mwdspace.validCurrencyList.length; i++) {
					okToAdd = true;
					thisCurrency = window.mwdspace.validCurrencyList[i];
					if (options.filterList) {
						okToAdd = findListMatch(options.filterList, thisCurrency.code);
					}
					if (okToAdd) {
						domThisOption = buildCurrencyOption(thisCurrency);
						if (domThisOption) {
							domCurrencySelect.append(domThisOption);
						} else {
							console.warn("Unable to add currency:", thisCurrency);
						}
					}
				}
				domCurrencySelect.val(defaultCurrency).trigger("change");
			} catch (err) {
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
				var domThisOption;

				for (var i = 0; i < window.mwdspace.validPayMethodList.length; i++) {
					domThisOption = buildPayMethodOption(window.mwdspace.validPayMethodList[i]);
					if (domThisOption) {
						jqPayMethodSelect.append(domThisOption);
					} else {
						console.warn(
							"Unable to add payment method:",
							window.mwdspace.validPayMethodList[i]
						);
					}
				}
				// hide the selector when it has only one value
				if (window.mwdspace.validPayMethodList.length > 1) {
					jqPayMethodSelect.show();
				} else {
					jqPayMethodSelect.hide();
				}
			} catch (err) {
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
				console.error("Unable to build the option element for method:", method);
			}
			return domOption;
		}

		function buildFrequencyButtons() {
			try {
				if (
					!window.mwdspace.validFrequencyList ||
					window.mwdspace.validFrequencyList.length < 1
				) {
					throw new Error("Invalid list of frequencies given");
				}
				var jqFrequencyContainer = jqContainer.find("div.giftFrequencyContainer");
				if (jqFrequencyContainer.length !== 1) {
					throw new Error("Unable to identify the frequency container");
				}
				// remove any existing options
				jqFrequencyContainer.find("div.fancyRadioButton").remove();

				var domThisButton;

				for (var i = 0; i < window.mwdspace.validFrequencyList.length; i++) {
					domThisButton = buildFrequencyButton(
						window.mwdspace.validFrequencyList[i],
						{ id: window.mwdspace.sharedUtils.makeUniqueId("frequency-" + i) }
					);
					if (domThisButton) {
						jqFrequencyContainer.append(domThisButton);
					} else {
						console.warn(
							"Unable to add frequency:",
							window.mwdspace.validFrequencyList[i]
						);
					}
				}
				jqFrequencyContainer
					.find('input[name="giftFrequency"]')
					.eq(0)
					.prop("checked", true)
					.trigger("change");
			} catch (err) {
				console.error("Unable to build the frequency buttons", err);
			}
		}

		function buildFrequencyButton(frequency, options) {
			if (typeof options == "undefined") {
				var options = {};
			}
			if (typeof options != "object") {
				options = {};
				console.warn("buildFrequencyButton(): ignoring invalid option object", options);
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
				console.warn("prepareRegionInput(): ignoring invalid option object", options);
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
				console.warn("buildRegionSelect(): no regions object", regions);
				return false;
			}
			if (typeof regions != "object" || regions.length < 1) {
				console.warn("buildRegionSelect(): invalid regions object", regions);
				return false;
			}

			try {
				if (jqRegionSelect.length !== 1) {
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
						console.warn("Unable to add region:", thisRegion);
					}
				}
				if (regionCtr > 0) {
					return true;
				}
			} catch (err) {
				console.error("Unable to build the region select dropdown", err);
			}
			return false;
		}

		function buildRegionOption(regionName, attributes) {
			if (typeof attributes == "undefined") {
				var attributes = {};
			}
			if (typeof attributes != "object") {
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
				console.warn("buildCountrySelect(): ignoring invalid option object", options);
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
				var domThisOption, thisCountry, okToAdd;

				for (var i = 0; i < window.mwdspace.validCountryList.length; i++) {
					okToAdd = true;
					thisCountry = window.mwdspace.validCountryList[i];
					if (options.filterList) {
						okToAdd = findListMatch(options.filterList, thisCountry.code);
					}
					if (okToAdd) {
						// var attributes = {};
						domThisOption = buildCountryOption(thisCountry);
						if (domThisOption) {
							domCountrySelect.append(domThisOption);
						} else {
							console.warn("Unable to add country:", thisCountry);
						}
					}
				}
				domCountrySelect.val(defaultCountry).trigger("change");
			} catch (err) {
				console.error("Unable to build the country select dropdown", err);
			}
		}

		function buildCountryOption(country, attributes) {
			if (typeof attributes == "undefined") {
				var attributes = {};
			}
			if (typeof attributes != "object") {
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
						console.warn("Unable to add card expire month:", expireMonth);
					}
				}
			} catch (err) {
				console.error("Unable to build the card expire month select dropdown", err);
			}
		}

		function buildCardExpireMonthOption(month, attributes) {
			if (typeof attributes == "undefined") {
				var attributes = {};
			}
			if (typeof attributes != "object") {
				console.warn(
					"buildRegionOption() ignoring invalid attributes object",
					attributes
				);
				attributes = {};
			}

			var domOption = null;
			try {
				if (typeof month != "number" && typeof month != "string" && !month) {
					console.error("Invalid month given:", month);
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
				console.error("Unable to build the option element for month:", month);
			}
			return domOption;
		}

		function buildCardExpireYearSelect() {
			try {
				// show only current year and beyond (with some fudge factor)
				var recentDate = new Date();
				recentDate.setDate(recentDate.getDate() - 7);
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
						console.warn("Unable to add card expire year:", expireYear);
					}
				}
			} catch (err) {
				console.error("Unable to build the card expire year select dropdown", err);
			}
		}

		function buildCardExpireYearOption(year, attributes) {
			if (typeof attributes == "undefined") {
				var attributes = {};
			}
			if (typeof attributes != "object") {
				console.warn(
					"buildRegionOption() ignoring invalid attributes object",
					attributes
				);
				attributes = {};
			}

			var domOption = null;
			try {
				if (typeof year != "number" && typeof year != "string" && !year) {
					console.error("Invalid year given:", year);
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
					theLabel = thisWidget.labelOverride.donor.matchCompanyPlaceholder;
				}
			} catch (err) {}

			var jqMatchSelect = jq('select[name="donorMatchCompany"]');

			if (typeof jqMatchSelect.select2 != "function") {
				console.warn("SKIPPING COMPANY MATCH SMART SELECTOR");
				return;
			}

			jqMatchSelect.select2({
				minimumInputLength: 3,
				delay: 400,
				placeholder: theLabel,
				width: "100%",
				ajax: {
					url: "https://platform.funraise.io/api/v1/ddcompanies",
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

		async function setupSpreedly() {
			if (thisWidget.promises.spreedlyIframeScript) {
				await thisWidget.promises.spreedlyIframeScript;
				Spreedly.on("ready", function() {
					//format card number
					Spreedly.setPlaceholder("number", "Card");
					Spreedly.setFieldType("number", "text");
					Spreedly.setNumberFormat("prettyFormat");

					//format cvv
					Spreedly.setPlaceholder("cvv", "cvv");

					setSpreedlyLabels();
				});
				Spreedly.on("paymentMethod", function(token, result) {
					console.log("\n\nSPREEDLY PAYMENT TOKENIZED", result);

					window.mwdspace.transactionSendData.paymentToken = token;

					sendTransaction();

					// PROCESS ERROR CHECK NEEDED
				});
				Spreedly.on("errors", function(errors) {
					console.log("\n\nSPREEDLY REPORTS ERRORS:");
					for (var i = 0; i < errors.length; i++) {
						var error = errors[i];
						console.log(error);
					}
					// PROCESS ERROR CHECK NEEDED
				});
				Spreedly.on("fieldEvent", function(name, type, activeEl, response) {
					if (type == "input") {
						window.mwdspace.userInputData.hasValidCardNumber =
							response.validNumber || false;
						window.mwdspace.userInputData.hasValidCardCvv =
							response.validCvv || false;
						window.mwdspace.userInputData.payCardType = response.cardType || false;
						if (name == "number") {
							if (response.validNumber) {
								jqCardNumberFeedback
									.find("span.cardNumberValidity")
									.removeClass("invalid")
									.addClass("valid")
									.html('<i class="fas fa-check-circle"></i>');
							} else {
								jqCardNumberFeedback
									.find("span.cardNumberValidity")
									.removeClass("valid")
									.addClass("invalid")
									.html('<i class="fas fa-times"></i>');
							}
							var iconHtml;
							switch (response.cardType) {
								case "visa":
									iconHtml = payMethodIconHtml.visa;
									break;
								case "master":
									iconHtml = payMethodIconHtml.mastercard;
									break;
								case "american_express":
									iconHtml = payMethodIconHtml.amex;
									break;
								case "discover":
									iconHtml = payMethodIconHtml.discover;
									break;
								default:
									iconHtml = payMethodIconHtml.card;
							}
							jqCardNumberFeedback.find("span.cardType").html(iconHtml);
						}
					}
				});
				Spreedly.init(paymentTokenizerId, {
					numberEl: "cardNumberTarget",
					cvvEl: "cardCvvTarget",
				});
			} else {
				console.error("Spreedly load not found - Skipping Spreedly setup");
			}
		}

		function setSpreedlyLabels() {
			if (typeof Spreedly == "object") {
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

				Spreedly.setStyle("number", "font-size:16px;color:#333;");
				Spreedly.setStyle("cvv", "font-size:16px;color:#333;");
			}
		}

		function tokenizeUserCard() {
			// tokenize only when all fields are ready
			// when successful, this will populate userInputData.paymentToken field

			// PROCESS ERROR CHECK NEEDED

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

					console.log(">> CALLING tokenizeCreditCard", tokenOptions);
					Spreedly.tokenizeCreditCard(tokenOptions);
					return true;
				} else {
					console.error("NO SPREEDLY OBJECT");
				}
			} else {
				console.error("SPREEDLY FIELD NOT READY");
			}
			return false;
		}

		function findListMatch(theList, matchString) {
			for (var i = 0; i < theList.length; i++) {}
		}

		function prepAndShowProcessingStep() {
			var iconHtml = "";

			if (window.mwdspace.userInputData.payMethod == "bitcoin") {
				iconHtml = payMethodIconHtml.bitcoin;
			} else if (window.mwdspace.userInputData.payMethod == "card") {
				switch (window.mwdspace.userInputData.payCardType) {
					case "visa":
						iconHtml = payMethodIconHtml.visa;
						break;
					case "mastercard":
					case "master":
					case "mc":
						iconHtml = payMethodIconHtml.mastercard;
						break;
					case "amex":
					case "american_express":
					case "americanexpress":
						iconHtml = payMethodIconHtml.amex;
						break;
					case "discover":
					case "disc":
						iconHtml = payMethodIconHtml.discover;
						break;
				}
			}

			var jqStep = jqContainer.find('section[data-step-name="processing"]');
			jqStep.find("span.processingPaySymbol").html(iconHtml);

			showStep("processing");
		}

		function prepAndShowBitcoinStep(input) {
			if (typeof input != "object") {
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
				console.warn("updateBitcoinTimer() caught error", err.message);
			}
			jqBitcoinTimeRemaining.html(displayCountdown);
		}

		async function checkBitcoinPaymentStatus(input) {
			console.log(">>> checkBitcoinPaymentStatus()");
			if (typeof input == "undefined") {
				console.warn("checkBitcoinPaymentStatus() given empty url");
				var input = null;
			}

			var baseInvoiceUrl = "https://bitpay.com/invoices/";
			var jqBitcoinContainer = jqContainer.find("div.bitcoinContainer");

			var response;

			if (window.mwdspace.sharedUtils.getUrlParameter("data") == "live") {
				console.log("SENDING LIVE POLL REQUEST");
				response = await new Promise(function(resolve) {
					console.log(">>> checkBitcoinPaymentStatus() INSIDE PROMISE");
					if (typeof input != "string") {
						console.warn(
							"checkBitcoinPaymentStatus() given invalid url type:",
							typeof input,
							input
						);
						resolve(null);
					}
					console.log("checkBitcoinPaymentStatus() start:", input);
					var requestUrl = encodeURI(baseInvoiceUrl + input);
					var xhr = new XMLHttpRequest();

					xhr.addEventListener("load", function(event) {
						// console.log("FILE LOADED:", event);
						var fileContents =
							event.target.responseText || event.target.response || null;
						var tempObject = window.mwdspace.sharedUtils.safeJsonParse(
							fileContents
						);

						if (!tempObject || !tempObject.data) {
							console.log("checkBitcoinPaymentStatus(): invalid response", event);
							resolve(null);
						}

						resolve(tempObject.data);
					});
					xhr.addEventListener("error", function(event) {
						console.error(
							"checkBitcoinPaymentStatus() ERROR EVENT",
							requestUrl,
							event
						);
						resolve(null);
					});
					xhr.addEventListener("abort", function(event) {
						console.warn(
							"checkBitcoinPaymentStatus() ABORT EVENT",
							requestUrl,
							event
						);
						resolve(null);
					});

					xhr.open("get", requestUrl, true);
					xhr.setRequestHeader("Accept", "application/json");
					xhr.send();
				});
			} else {
				response = {
					url: "https://bitpay.com/invoice?id=G8pTXqC6wz8hAyR5EzDM2X",
					status: "complete",
					price: 5,
					currency: "USD",
					orderId: "644353",
					invoiceTime: 1530812344969,
					expirationTime: 1530813244969,
					currentTime: 1530812749555,
					guid: "99044051",
					id: "G8pTXqC6wz8hAyR5EzDM2X",
					lowFeeDetected: false,
					amountPaid: 0,
					exceptionStatus: false,
					refundAddressRequestPending: false,
					buyerProvidedInfo: {},
					paymentSubtotals: {
						BCH: 679800,
						BTC: 76100,
					},
					paymentTotals: {
						BCH: 679800,
						BTC: 77700,
					},
					exchangeRates: {
						BCH: {
							BTC: 0.11193848139253873,
							USD: 735.55,
						},
						BTC: {
							BCH: 8.933100410560373,
							USD: 6571.009999999999,
						},
					},
					supportedTransactionCurrencies: {
						BCH: {
							enabled: true,
						},
						BTC: {
							enabled: true,
						},
					},
					minerFees: {
						BCH: {
							totalFee: 0,
							satoshisPerByte: 0,
						},
						BTC: {
							totalFee: 1600,
							satoshisPerByte: 11.179,
						},
					},
					paymentCodes: {
						BCH: {
							BIP72b:
								"bitcoincash:?r=https://bitpay.com/i/G8pTXqC6wz8hAyR5EzDM2X",
							BIP73: "https://bitpay.com/i/G8pTXqC6wz8hAyR5EzDM2X",
						},
						BTC: {
							BIP72b: "bitcoin:?r=https://bitpay.com/i/G8pTXqC6wz8hAyR5EzDM2X",
							BIP73: "https://bitpay.com/i/G8pTXqC6wz8hAyR5EzDM2X",
						},
					},
					btcPrice: "0.000761",
					token: "5uqeA84nXkFyYDAk2yW3RZUo3XpqfVaNq25v6HjNw27EtxcNoNjCetZBh8375q2rH",
				};
			}

			if (!response) {
				var messageHtml =
					"<div class='spacingContainer error'>Warning: Unable to check the status of this invoice (" +
					new Date().toLocaleTimeString() +
					"). Will try again shortly.</div>";
				jqBitcoinContainer.find("div.bitcoinFeedback").html(messageHtml);
				return;
			}

			console.log("checkBitcoinPaymentStatus() RESPONSE", response);

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
					jqBitcoinContainer.find("div.bitcoinFeedback").append(domMessage);
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

			console.log("jqMessage.length", jqMessage.length);

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
			if (!thisWidget.isLoaded) {
				// don't scroll until after initial page load is complete
				return;
			}

			theElement = jq(theElement);

			var originalScrollTop = jq(window).scrollTop();

			var viewHeight = jq(window).height();
			var viewTop = originalScrollTop;
			var viewBottom = viewTop + viewHeight;
			var padding = (theElement.outerHeight() - theElement.innerHeight()) / 2;
			padding = padding <= 0 ? 4 : padding;
			var elementTop = theElement.offset().top + padding;
			var elementBottom = elementTop + theElement.innerHeight();

			//when the element is taller the screen, scroll to element top (less padding)
			if (theElement.innerHeight() > viewHeight) {
				jq("html,body").animate(
					{
						scrollTop: elementTop,
						easing: "ease",
					},
					444
				);
				return;
			}

			//the element top is off screen so scroll to element top (less padding)
			if (viewTop > elementTop) {
				jq("html,body").animate(
					{
						scrollTop: elementTop,
						easing: "ease",
					},
					999
				);
				return;
			}

			//the element bottom is off screen so scroll up enough to not push the top offscreen
			if (viewBottom < elementBottom) {
				jq("html,body").animate(
					{
						scrollTop: elementBottom - viewHeight + padding,
						easing: "ease",
					},
					999
				);
			}
		}
	};

	window.mwdspace.MFA_Funraise_Widget.prototype.linkExternalStylesheet = function(url) {
		var thisWidget = this;
		return new Promise(function(resolve) {
			// console.log("linkExternalStylesheet() start:", url);
			var domStyleLink = document.createElement("link");
			thisWidget.targetElement.appendChild(domStyleLink);
			domStyleLink.rel = "stylesheet";
			domStyleLink.type = "text/css";
			var timeout = setTimeout(function() {
				console.log("linkExternalStylesheet() No load after 5s", url);
				resolve(false);
			}, 5000);
			domStyleLink.addEventListener("load", function(event) {
				clearTimeout(timeout);
				// console.log("STYLESHEET LOADED:", url);
				resolve(true);
			});
			domStyleLink.addEventListener("error", function(event) {
				console.error("linkExternalStylesheet() ERROR EVENT", url, event);
				resolve(false);
			});
			domStyleLink.addEventListener("abort", function(event) {
				console.warn("linkExternalStylesheet() ABORT EVENT", url, event);
				resolve(false);
			});
			domStyleLink.href = encodeURI(url);
		});
	};

	window.mwdspace.MFA_Funraise_Widget.prototype.linkExternalScript = function(url) {
		var thisWidget = this;
		return new Promise(function(resolve) {
			// console.log("linkExternalScript() start:", url);
			var domScript = document.createElement("script");
			thisWidget.targetElement.appendChild(domScript);
			var timeout = setTimeout(function() {
				console.log("linkExternalScript() No load after 5s", url);
				resolve(false);
			}, 5000);
			domScript.addEventListener("load", function(event) {
				clearTimeout(timeout);
				// console.log("SCRIPT LOADED:", url);
				resolve(true);
			});
			domScript.addEventListener("error", function(event) {
				clearTimeout(timeout);
				console.error("linkExternalScript() ERROR", url, event);
				resolve(false);
			});
			domScript.addEventListener("abort", function(event) {
				clearTimeout(timeout);
				console.warn("linkExternalScript() ABORTED", url, event);
				resolve(false);
			});
			domScript.src = encodeURI(url);
		});
	};

	window.mwdspace.MFA_Funraise_Widget.prototype.loadFile = function(input) {
		var thisWidget = this;
		return new Promise(function(resolve) {
			if (typeof input == "undefined") {
				console.warn("loadFile() given empty url");
				resolve(null);
			}
			if (typeof input != "string") {
				console.warn("loadFile() given invalid url type:", typeof input, input);
				resolve(null);
			}
			// console.log("loadFile() start:", input);
			var requestUrl = encodeURI(input);
			var xhr = new XMLHttpRequest();

			var timeout = setTimeout(function() {
				console.log("linkExternalScript() No load after 5s", url);
				resolve(false);
			}, 5000);
			xhr.addEventListener("load", function(event) {
				clearTimeout(timeout);
				// console.log("FILE LOADED:", input);
				var fileContents = event.target.responseText || event.target.response || null;
				resolve(fileContents);
			});
			xhr.addEventListener("error", function(event) {
				clearTimeout(timeout);
				console.error("loadFile() ERROR EVENT", requestUrl, event);
				resolve(null);
			});
			xhr.addEventListener("abort", function(event) {
				clearTimeout(timeout);
				console.warn("loadFile() ABORT EVENT", requestUrl, event);
				resolve(null);
			});

			xhr.open("get", requestUrl, true);
			xhr.send();
		});
	};

	window.mwdspace.MFA_Funraise_Widget.prototype.prepareLabelOverride = function() {
		var thisWidget = this;
		return new Promise(async (resolve) => {
			if (thisWidget.options.labelOverride) {
				switch (typeof thisWidget.options.labelOverride) {
					case "object":
						thisWidget.labelOverride = thisWidget.options.labelOverride;
						resolve(true);
						break;
					case "string":
						try {
							var overrideFileContents = await thisWidget.loadFile(
								thisWidget.options.labelOverride
							);
							if (overrideFileContents) {
								var tempObject = window.mwdspace.sharedUtils.safeJsonParse(
									overrideFileContents
								);
								if (tempObject) {
									thisWidget.labelOverride = tempObject;
									resolve(true);
								} else {
									console.error(
										"MFA_Funraise_Widget.prepareLabelOverride() - unable to parse text override data from file:",
										thisWidget.options.labelOverride
									);
								}
							} else {
								console.error(
									"MFA_Funraise_Widget.prepareLabelOverride() - unable to load file for text override data:",
									thisWidget.options.labelOverride
								);
							}
						} catch (err) {
							console.log("Caught error: ", err.message);
						}
						break;
				}
			}
			resolve(false);
		});
	};

	window.mwdspace.MFA_Funraise_Widget.prototype.processLabelOverride = function(
		input,
		prefix
	) {
		var thisWidget = this;
		if (typeof input != "object" || !input) {
			console.warn(
				"MFA_Funraise_Widget.processLabelOverride() given invalid object",
				typeof input
			);
			return false;
		}
		if (typeof prefix == "undefined") {
			var prefix = "";
		}
		if (typeof prefix != "string") {
			console.warn("Ignoring invalid string prefix value", prefix);
			prefix = "";
		}
		if (prefix) {
			prefix = prefix + ".";
		}
		var thisSelector;
		for (var key in input) {
			thisSelector = prefix + key;
			if (typeof input[key] == "string") {
				thisWidget.setElementText(thisSelector, input[key]);
			} else {
				// recursive, to handle nested JSON objects
				thisWidget.processLabelOverride(input[key], thisSelector);
			}
		}
	};

	window.mwdspace.MFA_Funraise_Widget.prototype.setElementText = function(labelId, value) {
		var thisWidget = this;
		if (typeof labelId == "undefined") {
			var labelId = "";
		}
		if (!labelId) {
			console.warn("setElementText() given empty labelId");
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
						console.warn("setElementText(): Ignoring tag", labelId, thisTag);
				}
			}
		} else {
			console.warn("REPLACE labelId not found", labelId);
		}
	};
})();
