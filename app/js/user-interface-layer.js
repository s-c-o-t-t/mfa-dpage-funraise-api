(function() {
	console.log("user-interface-layer.js v18.7.2");

	window.mwdspace = window.mwdspace || {};

	if (typeof window.mwdspace.jquery !== "function") {
		console.error("jQuery (window.mwdspace.jquery) not found");
		exit();
	}

	var jq = window.mwdspace.jquery;

	console.log("Using jQuery version", jq.fn.jquery);

	// GLOBALS
	var paymentTokenizerId = "ODBm2idmYFT3pBge5qxRBjQaWH9";

	window.mwdspace.defaultGiftList = [25, 50, 75, 100];

	// DOM OBJECTS
	var stepList = jq("div.giftFormContainer section.step");
	var domMainBackButton = jq("div.giftFormContainer button.goPreviousStep");
	var domRegionSelect = jq('div.giftFormContainer select[name="donorRegion"]');
	var domRegionInput = jq('div.giftFormContainer input[name="donorRegion"]');

	if (typeof Spreedly == "object") {
		Spreedly.on("ready", function() {
			console.log("\n\nSPREEDLY READY", Spreedly);

			//format card number
			Spreedly.setPlaceholder("number", "Card");
			Spreedly.setFieldType("number", "text");
			Spreedly.setNumberFormat("prettyFormat");
			Spreedly.setLabel("number", "Payment card number");

			//format cvv
			Spreedly.setPlaceholder("cvv", "cvv");
			Spreedly.setLabel("cvv", "Payment card 3-digit verification code");

			Spreedly.setValue("number", "4111111111111111");
			Spreedly.setValue("cvv", "123");
		});
		Spreedly.on("paymentMethod", function(result) {
			console.log("\n\nSPREEDLY PAYMENT TOKENIZED", result);
		});
		Spreedly.on("errors", function(errors) {
			console.log("\n\nSPREEDLY REPORTS ERRORS:");
			for (var i = 0; i < errors.length; i++) {
				var error = errors[i];
				console.log(error);
			}
		});
	} else {
		console.warn("Skipping Spreedly setup");
	}

	buildCurrencySelect();
	buildPayMethodSelect();
	buildFrequencyButtons(window.mwdspace.validPayMethodList[0].frequencies);
	buildCountrySelect();
	buildCardExpireMonthSelect();
	buildCardExpireYearSelect();

	jq('select[name="donorMatchCompany"]').select2({
		minimumInputLength: 3,
		delay: 250,
		placeholder: "Enter your company name",
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
								id: i,
								text: data[i].name,
							});
						}
					}
				}
				return returnObject;
			},
		},
	});
	setInterval(function() {
		jq(".select2-container").css("width", "100%");
	}, 999);

	showStep();
	if (typeof Spreedly == "object") {
		Spreedly.init(paymentTokenizerId, {
			numberEl: "cardNumberTarget",
			cvvEl: "cardCvvTarget",
		});
	}

	jq("input[type=radio]").change(function() {
		jq(this)
			.closest("section")
			.find("input[type=radio]")
			.closest("label")
			.removeClass("selected");
		jq(this)
			.closest("label")
			.addClass("selected");
		jq("div.giftFormHeaderContainer").slideDown(666, function() {
			scrollAll(jq("div.giftFormContainer"));
		});
	});

	// GENERAL CLICK HANDLER
	document.addEventListener("click", function(event) {
		// console.log("click", event.target.tagName, event.target.className);
		var clickTarget = jq(event.target).closest("button, clickTarget");
		if (clickTarget) {
			if (clickTarget.hasClass("processDonation")) {
				if (window.mwdspace.donationInProgress) {
					alert("There's already a donation processing.");
					return false;
				}
				var buttonHtml = event.target.getAttribute("data-working");
				if (buttonHtml) {
					jq(event.target)
						.addClass("blocked")
						.html(buttonHtml);
				}
				var data = {
					amount: 6.66,
				};
				if (typeof Spreedly == "object") {
					var tokenOptions = {
						// Required
						first_name: jq(
							'div.giftFormContainer input[name="donorFirstname"]'
						).val(),
						last_name: jq(
							'div.giftFormContainer input[name="donorLastname"]'
						).val(),
						month: jq(
							'div.giftFormContainer select[name="payCardExpireMonth"]'
						).val(),
						year: jq(
							'div.giftFormContainer select[name="payCardExpireYear"]'
						).val(),

						// Optional
						email: jq('div.giftFormContainer input[name="donorEmail"]').val(),
						zip: jq('div.giftFormContainer input[name="donorPostCode"]').val(),
					};
					console.log("tokenOptions", tokenOptions);
					Spreedly.tokenizeCreditCard(tokenOptions);
				}
				window.mwdspace.transactionLayer.startDonation(
					data,
					function(donationInfo) {
						console.log("SUCCESS FUNCTION", donationInfo);
						var buttonHtml = event.target.getAttribute("data-success");
						jq(event.target)
							.removeClass("blocked")
							.html(buttonHtml);
					},
					function(donationInfo) {
						console.log("FAIL FUNCTION", donationInfo);
						var buttonHtml = event.target.getAttribute("data-error");
						jq(event.target)
							.removeClass("blocked")
							.addClass("error")
							.html(buttonHtml);
					}
				);
			} else if (clickTarget.hasClass("goNextStep")) {
				showNextStep();
			} else if (clickTarget.hasClass("goPreviousStep")) {
				showPreviousStep();
			}
		}
	});

	function showNextStep() {
		switch (mwdspace.currentStepName) {
			case "giftAmount":
				showStep("donorInfo");
				break;
			case "donorInfo":
				showStep("payment");
				break;
		}
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
		jq("div.giftFormContainer div.loadingDisplay").hide();
		var thisName;
		for (var i = 0; i < stepList.length; i++) {
			thisName = stepList[i].getAttribute("data-step-name");
			if (thisName == targetStepName) {
				if (i == 0) {
					domMainBackButton.hide();
				} else {
					jq("div.giftFormHeaderContainer").show();
					domMainBackButton.fadeIn(888);
				}
				jq(stepList[i]).fadeIn(666, function() {
					scrollAll(jq("div.giftFormContainer"));
				});
				mwdspace.currentStepName = thisName;
				window.mwdspace.sharedUtils.setSessionValue("savedStepName", thisName);
			} else {
				jq(stepList[i]).hide();
			}
		}
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
			var domCurrencySelect = jq('div.giftFormContainer select[name="giftCurrency"]');
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
			var domPayMethodSelect = jq('div.giftFormContainer select[name="payMethod"]');
			if (domPayMethodSelect.length !== 1) {
				throw new Error("Unable to identify the payment method select dropdown");
			}
			var domThisOption;

			for (var i = 0; i < window.mwdspace.validPayMethodList.length; i++) {
				domThisOption = buildPayMethodOption(window.mwdspace.validPayMethodList[i]);
				if (domThisOption) {
					domPayMethodSelect.append(domThisOption);
				} else {
					console.warn(
						"Unable to add payment method:",
						window.mwdspace.validPayMethodList[i]
					);
				}
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
				domOption.innerText = method.description || "";
			}
		} catch (err) {
			console.error("Unable to build the option element for method:", method);
		}
		return domOption;
	}

	function buildFrequencyButtons(frequencyList) {
		try {
			if (!frequencyList || frequencyList.length < 1) {
				throw new Error("Invalid list of frequencies given");
			}
			var domFrequencyContainer = jq("div.giftFormContainer div.giftFrequencyContainer");
			if (domFrequencyContainer.length !== 1) {
				throw new Error("Unable to identify the frequency select dropdown");
			}
			// remove any existing options
			domFrequencyContainer.find("div.giftOption").remove();

			var domThisButton;

			for (var i = 0; i < frequencyList.length; i++) {
				domThisButton = buildFrequencyButton(frequencyList[i]);
				if (domThisButton) {
					domFrequencyContainer.append(domThisButton);
				} else {
					console.warn("Unable to add frequency:", frequencyList[i]);
				}
			}
		} catch (err) {
			console.error("Unable to build the frequency buttons", err);
		}
	}

	function buildFrequencyButton(frequency) {
		var domButton = null;
		try {
			if (frequency.code) {
				// the container div
				domButton = document.createElement("div");
				jq(domButton).addClass("giftOption fixed");

				// the label
				var domLabel = document.createElement("label");
				jq(domLabel).addClass("giftOption");
				domLabel.innerText = frequency.name || "Unknown";
				domButton.appendChild(domLabel);

				// the radio
				var domRadio = document.createElement("input");
				domRadio.setAttribute("type", "radio");
				domRadio.setAttribute("name", "giftFrequency");
				domRadio.setAttribute("value", frequency.code);
				domLabel.appendChild(domRadio);
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
			var userCountry = jq('div.giftFormContainer select[name="donorCountry"]').val();
			var thisCountry;
			for (var i = 0; i < window.mwdspace.validCountryList.length; i++) {
				thisCountry = window.mwdspace.validCountryList[i];
				if (userCountry == thisCountry.code || userCountry == thisCountry.name) {
					if (thisCountry.regions && buildRegionSelect(thisCountry.regions)) {
						return true;
					}
				}
			}
		} catch (err) {
			console.error("Unable to prepare the region input method", err);
		}
		showRegionInput();
	}

	function showRegionInput() {
		domRegionInput.val("").show();
		domRegionSelect.hide();
	}

	function buildRegionSelect(regions) {
		domRegionInput.hide();
		domRegionSelect.show();

		if (typeof regions == "undefined") {
			console.warn("buildRegionSelect(): no regions object", regions);
			return false;
		}
		if (typeof regions != "object" || regions.length < 1) {
			console.warn("buildRegionSelect(): invalid regions object", regions);
			return false;
		}

		try {
			if (domRegionSelect.length !== 1) {
				console.error("Unable to identify the region select dropdown");
				return false;
			}
			var domThisOption, thisRegion;

			var regionCtr = 0;

			domRegionSelect.empty();
			domThisOption = buildRegionOption("State/Region...");
			domRegionSelect.append(domThisOption);

			for (var i = 0; i < regions.length; i++) {
				thisRegion = regions[i];
				domThisOption = buildRegionOption(thisRegion.name);
				if (domThisOption) {
					domRegionSelect.append(domThisOption);
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

	function buildRegionOption(regionName) {
		try {
			if (typeof regionName == "string" && regionName.trim()) {
				var domOption = null;
				domOption = document.createElement("option");
				domOption.innerText = regionName;
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
			var domCountrySelect = jq('div.giftFormContainer select[name="donorCountry"]');
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
				domOption.setAttribute("value", country.code);
				domOption.innerText = country.name;
			}
		} catch (err) {
			console.error("Unable to build the option element for country:", country);
		}
		return domOption;
	}

	function buildCardExpireMonthSelect() {
		try {
			var domCardExpireMonthSelect = jq(
				'div.giftFormContainer select[name="payCardExpireMonth"]'
			);
			if (domCardExpireMonthSelect.length !== 1) {
				throw new Error("Unable to identify the card expire month select dropdown");
			}
			// add placeholder value
			var domThisOption = buildCardExpireMonthOption("Month", "");
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

	function buildCardExpireMonthOption(month, value) {
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
				domOption.setAttribute("value", value);
				domOption.innerText = month;
			}
		} catch (err) {
			console.error("Unable to build the option element for month:", month);
		}
		return domOption;
	}

	function buildCardExpireYearSelect() {
		try {
			// show only current year and beyond, but with a few days fudge factor
			var recentDate = new Date();
			recentDate.setDate(recentDate.getDate() - 7);
			var startYear = recentDate.getFullYear();
			var yearsToShow = 15;

			var domCardExpireYearSelect = jq(
				'div.giftFormContainer select[name="payCardExpireYear"]'
			);
			if (domCardExpireYearSelect.length !== 1) {
				throw new Error("Unable to identify the card expire year select dropdown");
			}
			// add placeholder value
			var domThisOption = buildCardExpireYearOption("Year", "");
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

	function buildCardExpireYearOption(year, value) {
		var domOption = null;
		try {
			if (typeof year != "number" && typeof year != "string" && !year) {
				console.error("Invalid year given:", year);
			} else {
				if (typeof value == "undefined") {
					var value = year;
				}

				domOption = document.createElement("option");
				domOption.setAttribute("value", value);
				domOption.innerText = year;
			}
		} catch (err) {
			console.error("Unable to build the option element for year:", year);
		}
		return domOption;
	}

	function findListMatch(theList, matchString) {
		for (var i = 0; i < theList.length; i++) {}
	}

	function scrollAll(theElement) {
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
				999
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
})();
