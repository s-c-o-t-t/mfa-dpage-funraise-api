"use strict";
(function() {
	console.log("mwd-donate-widget.js v18.7.8a");

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

		thisWidget.targetElement = {};
		thisWidget.promises = {};
		thisWidget.intervals = {};

		thisWidget.mainStylesUrl =
			window.location.protocol +
			"//services.mwdagency.com/donate-widget/1.0.0/css/mwd-donate-widget.css";
		thisWidget.mainHtmlUrl =
			window.location.protocol +
			"//services.mwdagency.com/donate-widget/1.0.0/mwd-donate-widget.html";

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
		if (!thisWidget.options.formId || isNaN(thisWidget.options.formId)) {
			thisWidget.options.formId = 4394;
		}
		if (
			!thisWidget.options.listSingleGiftAskString ||
			!thisWidget.options.listSingleGiftAskString.length
		) {
			thisWidget.options.listSingleGiftAskString = [25, "50*", 75, 100];
		}

		if (
			!thisWidget.options.listMonthlyGiftAskString ||
			!thisWidget.options.listMonthlyGiftAskString.length
		) {
			thisWidget.options.listMonthlyGiftAskString = [5, 10, "15*", 20];
		}

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
			window.location.protocol +
				"//services.mwdagency.com/donate-widget/1.0.0/js/shared-utils.js"
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
			window.location.protocol +
				"//services.mwdagency.com/donate-widget/1.0.0/js/gift-utilities.js"
		);
		var promiseTransactionLayer = thisWidget.linkExternalScript(
			window.location.protocol +
				"//services.mwdagency.com/donate-widget/1.0.0/js/transaction-system-layer.js"
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
		console.log("MFA_Funraise_Widget using jQuery version", jq.fn.jquery);

		window.mwdspace.userInputData = {};
		var userInputData = window.mwdspace.userInputData;
		thisWidget.defaultGiftList = [25, 50, 75, 100];

		// GLOBALS
		// Funraise environment key: ECDNSGhIR0fYQisIc1PHH7NX0pN
		// MWD test environment key: ODBm2idmYFT3pBge5qxRBjQaWH9
		var paymentTokenizerId =
			thisWidget.options.paymentTokenizerId || "ODBm2idmYFT3pBge5qxRBjQaWH9";

		// JQUERY OBJECTS
		var jqContainer = jq("div.giftFormContainer");
		var jqStepList = jqContainer.find("section.step");
		var jqMainBackButton = jqContainer.find("button.goPreviousStep");
		var jqPayMethodSelect = jqContainer.find('select[name="payMethod"]');
		var jqRegionSelect = jqContainer.find('select[name="donorRegion"]');
		var jqRegionInput = jqContainer.find('input[name="donorRegion"]');
		var jqGiftAmountFields = jqContainer.find("div.giftOption input");
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
		buildFrequencyButtons();
		getGiftString();

		buildCountrySelect();
		setupCompanyMatchSelect();
		buildCardExpireMonthSelect();
		buildCardExpireYearSelect();

		// ensure text override file load (if any) is complete
		await thisWidget.promises.labelOverrideLoad;
		if (thisWidget.labelOverride) {
			thisWidget.processLabelOverride(thisWidget.labelOverride);
		}

		showStep();

		setupInputWatchers();
		setupSpreedly(); //async, but waiting not required

		setTimeout(function() {
			thisWidget.isLoaded = true;
		}, 999);

		// GENERAL CLICK HANDLER
		document.addEventListener("click", function(event) {
			// console.log("click", event.target.tagName, event.target.className);
			var clickTarget = jq(event.target).closest("button, .clickTarget");
			if (clickTarget) {
				if (clickTarget.hasClass("processDonation")) {
					if (window.mwdspace.donationInProgress) {
						alert("A donation is processing.");
					} else {
						window.mwdspace.transactionSendData = buildTransactionSendData();
						if (
							window.mwdspace.transactionLayer.validateSendData(
								window.mwdspace.transactionSendData
							)
						) {
							prepAndShowProcessingStep();
							sendTransaction(clickTarget);
						} else {
							window.mwdspace.donationInProgress = false;
							clickTarget.addClass("showInvalid");
							setTimeout(function() {
								clickTarget.removeClass("showInvalid");
							}, 1500);
						}
					}
				} else if (clickTarget.hasClass("goNextStep")) {
					if (!showNextStep()) {
						clickTarget.addClass("showInvalid");
						setTimeout(function() {
							clickTarget.removeClass("showInvalid");
						}, 1500);
					}
				} else if (clickTarget.hasClass("goPreviousStep")) {
					showPreviousStep();
				} else if (clickTarget.hasClass("errorRestart")) {
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
						showStep("payment");
						return true;
					}
					break;
				case "payment":
					if (checkStepPayment()) {
						alert("Would process donation");
						return true;
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
				case "payment":
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
					if (i == 0 || targetStepName == "confirmation") {
						jqMainBackButton.hide();
					} else {
						jq("div.giftFormHeaderContainer").show();
						jqMainBackButton.fadeIn(888);
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
				userInputData.baseAmount < userInputData.minimumAmount ||
				userInputData.baseAmount < 1
			) {
				console.warn("baseAmount is invalid", userInputData.baseAmount);
				isValid = false;
			}
			if (typeof userInputData.giftCurrency != "string") {
				console.warn("giftCurrency is invalid", userInputData.giftCurrency);
				isValid = false;
			}
			if (typeof userInputData.payMethod != "string") {
				console.warn("payMethod is invalid", userInputData.payMethod);
				isValid = false;
			}
			if (typeof userInputData.giftFrequency != "string") {
				console.warn("giftFrequency is invalid", userInputData.giftFrequency);
				isValid = false;
			}
			return isValid;
		}

		function checkStepDonor() {
			var isValid = true;
			if (typeof userInputData.donorFirstname != "string") {
				console.warn("donorFirstname is invalid", userInputData.donorFirstname);
				isValid = false;
			}
			if (typeof userInputData.donorLastname != "string") {
				console.warn("donorLastname is invalid", userInputData.donorLastname);
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

		function checkStepPayment() {
			return false;
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

				if (name == "giftAmountFixed" && tag == "input") {
					processGiftAmountChange(event);
				} else if (name == "giftAmountFreeform" && tag == "input") {
					jqGiftAmountFields.prop("checked", false);
					var amount = cleanFloat(newValue) || 0.0;
					var cleanedAmount = amount.toFixed(2);
					if (cleanedAmount != newValue) {
						jqThis.val(cleanedAmount);
					}
					if (amount < 0 || amount < window.mwdspace.userInputData.minimumAmount) {
						jqThis.addClass("invalid");
					} else {
						jqThis.removeClass("invalid");
					}
					processGiftAmountChange(event);
				} else if (name == "giftCurrency" && tag == "select") {
					updateCurrency();
				} else if (name == "payMethod" && tag == "select") {
					updatePayMethod();
				} else if (name == "giftFrequency" && tag == "input") {
					updateFrequency();
				}

				console.log(window.mwdspace.userInputData);
			});

			// AMOUNT - also show header display
			jqContainer
				.find('div.giftOption input[name="giftAmountFreeform"]')
				.on("focus keyup paste", function(event) {
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
				// check if card info tokenization is required
				if (jqThis.hasClass("tokenizeWatch")) {
					tokenizeUserCard();
				}
			}
			userInputData[options.name] = validatedValue;
		}

		function validateInputField(jqThis, options) {
			if (typeof options == "undefined") {
				var options = {};
			}
			var re;
			switch (options.validationPattern) {
				case "email":
					re = new RegExp(/^\w+@\w+\.[a-z]{2,}$/i);
					break;
				default:
					re = new RegExp(options.validationPattern, "i");
			}
			if (options.value.match(re)) {
				jqThis.removeClass("invalid");
				return true;
			}
			jqThis.addClass("invalid");
			return false;
		}

		function processGiftAmountChange(event) {
			jqGiftAmountFields.removeClass("selected");
			var jqTarget = jq(event.target);
			jqTarget.addClass("selected");
			var newAmount = cleanFloat(jqTarget.val()) || 0.0;
			updateGiftAmount({ baseAmount: newAmount });
			if (event.type == "change") {
				jq("div.giftFormHeaderContainer").slideDown(666, function() {
					scrollAll(jqContainer);
				});
			}
		}

		function updateGiftAmount(input) {
			if (typeof input == "undefined") {
				var input = {};
			}
			try {
				userInputData.baseAmount = parseFloat(input.baseAmount) || 0.0;
				userInputData.extraPercent = parseFloat(input.extraPercent) || 0.0;
				var total = parseFloat(
					userInputData.baseAmount +
						userInputData.baseAmount * userInputData.extraPercent
				);
				var displayAmount = total.toFixed(2).split(".");
				jqContainer
					.find("div.amountDisplay span.displayWholeAmount")
					.text(displayAmount[0]);
				jqContainer
					.find("div.amountDisplay span.displaySubAmount")
					.text("." + displayAmount[1]);
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
			// delete userInputData.payMethod;
			// var payMethod = jqPayMethodSelect.val();
			// var thisItem;
			// for (var i = 0; i < window.mwdspace.validPayMethodList.length; i++) {
			// 	thisItem = window.mwdspace.validPayMethodList[i];
			// 	if (thisItem.code == payMethod) {
			// 		userInputData.payMethod = thisItem.code;
			// 		userInputData.minimumAmount = thisItem.minimumAmount;
			// 		break;
			// 	}
			// }
			// buildFrequencyButtons();
		}

		function updateFrequency() {
			// delete userInputData.frequency;
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

		// GIFT AMOUNT STEP
		function validateDataGiftAmount() {
			try {
				if (isNaN(userInputData.baseAmount) || userInputData.baseAmount <= 0) {
					return false;
				}
				if (!validatePaymentType(input.paymentType)) {
					return false;
				}
				if (!validateFrequency(input.frequency)) {
					return false;
				}

				return true;
			} catch (err) {
				console.log("validateDataGiftAmount() caught error: ", err.message);
			}
			return false;
		}

		function validatePaymentType(input) {
			if (typeof input != "string") {
				return false;
			}

			return true;
		}

		function validateFrequency(input) {
			if (typeof input != "string") {
				return false;
			}

			return true;
		}

		function buildTransactionSendData() {
			var userData = window.mwdspace.userInputData;
			var sendData = {};

			// sendData = {
			// 	amount: 99.99,
			// 	currency: "USD",
			// 	paymentType: "card",
			// 	firstName: "First",
			// 	lastName: "Last",
			// 	email: "first.last@example.com",
			// 	address: "123 Street",
			// 	city: "Long Beach",
			// 	state: "CA",
			// 	postalCode: "90802",
			// 	country: "United States",
			// 	month: 12,
			// 	year: 2022,
			// 	baseAmount: 99.0,
			// 	formId: 4394,
			// 	organizationId: "fcb4d538-ca92-4212-86cc-06d8ac929c4d",
			// 	paymentToken: "1HI7mQMBL58UpYJZCTBreQGd419",
			// };

			try {
				sendData.organizationId = thisWidget.options.organizationId;
				sendData.formId = thisWidget.options.formId;

				if (userData.organizationId) sendData.organizationId = userData.organizationId;
				if (userData.formId) sendData.formId = userData.formId;
				if (userData.paymentToken) sendData.paymentToken = userData.paymentToken;

				if (userData.firstName) sendData.firstName = userData.donorFirstName;
				if (userData.lastName) sendData.lastName = userData.donorLastName;
				if (userData.email) sendData.email = userData.donorEmail;
				if (userData.streetAddress) sendData.address = userData.donorStreet;
				if (userData.city) sendData.city = userData.donorCity;
				if (userData.region) sendData.state = userData.donorRegion;
				if (userData.postCode) sendData.postalCode = userData.donorPostCode;
				if (userData.country) sendData.country = userData.donorCountry;

				if (typeof userData.baseAmount == "number") {
					var totalAmount = userData.baseAmount;
					if (typeof userData.extraPercentage == "number") {
						totalAmount += userData.extraPercentage * userData.baseAmount;
					}
					sendData.amount = totalAmount;
					sendData.baseAmount = userData.baseAmount;
				}

				if (userData.currency) sendData.currency = userData.giftCurrency;
				if (userData.payMethod) sendData.paymentType = userData.payMethod;

				if (userData.payMethod == "card") {
					if (userData.cardExpireMonth) sendData.month = userData.cardExpireMonth;
					if (userData.cardExpireYear) sendData.year = userData.cardExpireYear;

					if (userData.cardType) sendData.cardType = userData.cardType;
					if (userData.cardLastFour) sendData.lastFour = userData.cardLastFour;
				}

				if (userData.isCompanyMatch === true) {
					sendData.donateDouble = true;
					if (userData.companyMatchName) sendData.company = userData.companyMatchName;
					if (userData.companyMatchEmail)
						sendData.employeeEmail = userData.companyMatchEmail;
				}

				return sendData;
			} catch (err) {
				console.log("buildTransactionSendData() caught error: ", err.message);
			}
			return null;
		}

		function sendTransaction(clickTarget) {
			clickTarget.addClass("blocked");

			window.mwdspace.transactionLayer.startDonation(
				window.mwdspace.transactionSendData,
				function(donationInfo) {
					console.log("SUCCESS FUNCTION", donationInfo);
					clickTarget.removeClass("blocked");
					if (donationInfo.type == "card") {
						var transactionStatus = String(donationInfo.status);
						if (transactionStatus.match(/complete/i)) {
							prepAndShowConfirmationStep();
						} else {
							prepAndShowErrorStep(
								'The server appears to have had an error processing this card transaction, and reported status "' +
									transactionStatus +
									'".'
							);
						}
					} else if (donationInfo.type == "bitcoin") {
						prepAndShowBitcoinStep(donationInfo);
					} else {
						console.warn(
							"Unrecognized type property in server response",
							donationInfo
						);
						prepAndShowErrorStep("Unrecognized response from the sever");
					}
				},
				function(donationInfo) {
					console.log("FAIL FUNCTION", donationInfo);
					clickTarget.removeClass("blocked");
					console.warn("Donation received fail response from server", donationInfo);
					prepAndShowErrorStep("The server was unable to process the transaction");
				}
			);
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

				var domThisButton;

				for (var i = 0; i < giftStringList.length; i++) {
					domThisButton = buildGiftStringButton(giftStringList[i], {
						id: window.mwdspace.sharedUtils.makeUniqueId("amount-" + i),
					});
					if (domThisButton) {
						jqGiftStringContainer.append(domThisButton);
					} else {
						console.warn("Unable to add fixed gift button:", giftStringList[i]);
					}
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
					amount: cleanFloat(input),
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

		/* remove all but digits/dot before converting to float */
		function cleanFloat(input) {
			if (typeof input == "undefined") {
				var input = "";
			}
			input = "" + input;
			return parseFloat(input.replace(/[^0-9|\.]/g, ""));
		}

		/* remove all chars but digits/dot before convert to float */
		function formatDisplayGift(input) {
			if (typeof input == "undefined") {
				var input = "";
			}
			input = "" + input;
			var amount = cleanFloat(input);
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
			var defaultCountry = typeof options.default == "string" ? options.default : "US";
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

		function buildCountryOption(country) {
			var domOption = null;
			try {
				if (country.code) {
					domOption = document.createElement("option");
					domOption.innerText = country.name;
				}
			} catch (err) {
				console.error("Unable to build the option element for country:", country);
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
					"data-label-id": "payment.cardExpireMonthPlaceholder",
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
					if (typeof value == "undefined") {
						var value = month;
					}
					try {
						month = window.mwdspace.sharedUtils.ensureString(month);
						month = month.padStart(2, "0");
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
				var yearsToShow = 15;

				var domCardExpireYearSelect = jqContainer.find(
					'select[name="payCardExpireYear"]'
				);
				if (domCardExpireYearSelect.length !== 1) {
					throw new Error("Unable to identify the card expire year select dropdown");
				}
				// add placeholder value
				var domThisOption = buildCardExpireYearOption("Year", {
					value: "",
					"data-label-id": "payment.cardExpireYearPlaceholder",
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

			jq('select[name="donorMatchCompany"]').select2({
				minimumInputLength: 3,
				delay: 400,
				placeholder: theLabel,
				width: "100%",
				// theme: "classic",
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
					console.log("\n\nSPREEDLY READY", Spreedly);

					//format card number
					Spreedly.setPlaceholder("number", "Card");
					Spreedly.setFieldType("number", "text");
					Spreedly.setNumberFormat("prettyFormat");

					//format cvv
					Spreedly.setPlaceholder("cvv", "CVV");

					setSpreedlyLabels();

					// Spreedly.setValue("number", "4111111111111111");
					// Spreedly.setValue("cvv", "123");
				});
				Spreedly.on("paymentMethod", function(token, result) {
					console.log("\n\nSPREEDLY PAYMENT TOKENIZED", token, result);

					window.mwdspace.userInputData.paymentToken = token;
					window.mwdspace.userInputData.cardType = result.card_type;
					window.mwdspace.userInputData.cardLastFour = result.last_four_digits;
				});
				Spreedly.on("errors", function(errors) {
					console.log("\n\nSPREEDLY REPORTS ERRORS:");
					for (var i = 0; i < errors.length; i++) {
						var error = errors[i];
						console.log(error);
					}
				});
				Spreedly.on("fieldEvent", function(name, type, activeEl, response) {
					console.log("activeEl", activeEl);
					if (type == "input") {
						console.log("CARD NUMBER EVENT", response);
						if (response.validNumber && response.validCvv) {
							console.log("BOTH FIELDS VALID");
						}
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
							console.log("Changing card type to", iconHtml);
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
					if (thisWidget.labelOverride.payment.cardNumberPlaceholder) {
						labelCard = thisWidget.labelOverride.payment.cardNumberPlaceholder;
					}
				} catch (err) {}
				try {
					if (thisWidget.labelOverride.payment.cvvPlaceholder) {
						labelCvv = thisWidget.labelOverride.payment.cvvPlaceholder;
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
			if (
				userInputData.donorFirstname &&
				userInputData.donorLastname &&
				userInputData.payCardNumber &&
				userInputData.payCardCvv &&
				userInputData.payCardExpireMonth &&
				userInputData.payCardExpireYear
			) {
				if (typeof Spreedly == "object") {
					var tokenOptions = {
						// Required
						first_name: userInputData.donorFirstname,
						last_name: userInputData.donorLastname,
						month: userInputData.payCardExpireMonth,
						year: userInputData.payCardExpireYear,
					};
					// Optional
					if (userInputData.donorPostCode) {
						tokenOptions.zip = userInputData.donorPostCode;
					}
					console.log("tokenOptions", tokenOptions);
					Spreedly.tokenizeCreditCard(tokenOptions);
				} else {
					console.error("NO SPREEDLY OBJECT - Skipping Spreedly tokenization");
				}
			} else {
				console.warn("Skipping Spreedly tokenization - fields not ready");
			}
		}

		function findListMatch(theList, matchString) {
			for (var i = 0; i < theList.length; i++) {}
		}

		function prepAndShowProcessingStep() {
			var iconHtml = "";

			if (window.mwdspace.userInputData.payMethod == "bitcoin") {
				iconHtml = payMethodIconHtml.bitcoin;
			} else if (window.mwdspace.userInputData.payMethod == "card") {
				switch (window.mwdspace.userInputData.cardType) {
					case "visa":
						iconHtml = payMethodIconHtml.visa;
						break;
					case "mastercard":
						iconHtml = payMethodIconHtml.mastercard;
						break;
					case "amex":
						iconHtml = payMethodIconHtml.amex;
						break;
					case "discover":
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

			var response = await new Promise(function(resolve) {
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
					var tempObject = window.mwdspace.sharedUtils.safeJsonParse(fileContents);

					if (!tempObject || !tempObject.data) {
						console.log("checkBitcoinPaymentStatus(): invalid response", event);
						resolve(null);
					}

					resolve(tempObject.data);
				});
				xhr.addEventListener("error", function(event) {
					console.error("checkBitcoinPaymentStatus() ERROR EVENT", requestUrl, event);
					resolve(null);
				});
				xhr.addEventListener("abort", function(event) {
					console.warn("checkBitcoinPaymentStatus() ABORT EVENT", requestUrl, event);
					resolve(null);
				});

				xhr.open("get", requestUrl, true);
				xhr.setRequestHeader("Accept", "application/json");
				xhr.send();
			});

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

			var firstName = window.mwdspace.userInputData.firstName || "";

			var domFirstName = document.createElement("strong");
			domFirstName.innerHTML = firstName;

			var jqStep = jqContainer.find('section[data-step-name="confirmation"]');
			jqStep
				.find("span.transactionSuccessName")
				.append(domFirstName)
				.append("!");
			showStep("confirmation");
		}

		function prepAndShowErrorStep(input) {
			if (typeof input == "undefined") {
				var input = {};
			}
			var jqStep = jqContainer.find('section[data-step-name="processError"]');
			jqStep.find("span.errorDescription").html(input);
			showStep("processError");
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
					666
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
						// console.warn("REPLACE (placeholder)", labelId, thisTag,value);
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
						// console.warn("REPLACE (inner html)", labelId, thisTag, value);
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
