console.log('user-interface-layer.js v18.6.15c');

window.mwdspace = window.mwdspace || {};

if (typeof window.mwdspace.jquery !== 'function') {
	console.error("jQuery (window.mwdspace.jquery) not found");
	exit();
}

var jq = window.mwdspace.jquery;

console.log("Using jQuery version", jq.fn.jquery);

// GLOBALS
var paymentTokenizerId = 'ODBm2idmYFT3pBge5qxRBjQaWH9';

// DOM OBJECTS
var stepList = jq('div.giftFormContainer section.step');
var domMainBackButton = jq('button.goPreviousStep');

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

jq('input[type=radio]').change(function () {
	jq(this)
		.closest('section')
		.find('input[type=radio]')
		.closest('label')
		.removeClass('selected');
	jq(this)
		.closest('label')
		.addClass('selected');
	jq('div.giftFormHeaderContainer').slideDown(666);
});

// GENERAL CLICK HANDLER
document.addEventListener('click', function (event) {
	console.log('click', event.target.tagName, event.target.className);
	var clickTarget = jq(event.target).closest('button, .clickTarget');
	if (clickTarget) {
		if (clickTarget.hasClass('processDonation')) {
			if (window.mwdspace.donationInProgress) {
				alert("There's already a donation processing.");
				return false;
			}
			var buttonHtml = event.target.getAttribute('data-working');
			if (buttonHtml) {
				jq(event.target).addClass('blocked').html(buttonHtml);
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
					jq(event.target).removeClass('blocked').html(buttonHtml);
				},
				function (donationInfo) {
					console.log('FAIL FUNCTION', donationInfo);
					var buttonHtml = event.target.getAttribute('data-error');
					jq(event.target).removeClass('blocked').addClass('error').html(buttonHtml);
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
	jq('div.giftFormContainer div.loadingDisplay').hide();
	var thisName;
	for (var i = 0; i < stepList.length; i++) {

		thisName = stepList[i].getAttribute('data-step-name');
		if (thisName == targetStepName) {
			if (thisName == 'giftAmount') {
				domMainBackButton.hide();
			} else {
				domMainBackButton.fadeIn(888);
			}
			jq(stepList[i]).fadeIn(666);
		} else {
			jq(stepList[i]).hide();
		}

	}
	// stepList.forEach(function (step) {
	// 	thisName = step.getAttribute('data-step-name');

	// 	if (thisName == targetStepName) {
	// 		if (thisName == 'giftAmount') {
	// 			domMainBackButton.hide();
	// 		} else {
	// 			domMainBackButton.fadeIn(888);
	// 		}
	// 		jq(step).fadeIn(666);
	// 	} else {
	// 		jq(step).hide();
	// 	}
	// });
}

function buildCurrencySelect() {
	try {
		if (!window.mwdspace.currencyList) {
			throw new Error('List of valid currencies not found');
		}
		var domCurrencySelect = jq('form.mainGiftForm select[name="giftCurrency"]');
		if (domCurrencySelect.length !== 1) {
			throw new Error('Unable to identify the currency select dropdown');
		}
		var domThisOption;

		for (var i = 0; i < window.mwdspace.currencyList.length; i++) {

			domThisOption = buildCurrencyOption(window.mwdspace.currencyList[i]);
			if (domThisOption) {
				domCurrencySelect.append(domThisOption);
			} else {
				console.warn('Unable to add currency:', window.mwdspace.currencyList[i]);
			}

		}
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
		var domPayMethodSelect = jq('form.mainGiftForm select[name="payMethod"]');
		if (domPayMethodSelect.length !== 1) {
			throw new Error('Unable to identify the payment method select dropdown');
		}
		var domThisOption;

		for (var i = 0; i < window.mwdspace.payMethodList.length; i++) {
			domThisOption = buildPayMethodOption(window.mwdspace.payMethodList[i]);
			if (domThisOption) {
				domPayMethodSelect.append(domThisOption);
			} else {
				console.warn('Unable to add payment method:', window.mwdspace.payMethodList[i]);
			}
		}

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
		if (!frequencyList || frequencyList.length < 1) {
			throw new Error('Invalid list of frequencies given');
		}
		var domFrequencyContainer = jq('form.mainGiftForm div.giftFrequencyContainer');
		if (domFrequencyContainer.length !== 1) {
			throw new Error('Unable to identify the frequency select dropdown');
		}
		// remove any existing options
		domFrequencyContainer.find('div.giftOption').remove();

		var domThisButton;

		for (var i = 0; i < frequencyList.length; i++) {
			domThisButton = buildFrequencyButton(frequencyList[i]);
			if (domThisButton) {
				domFrequencyContainer.append(domThisButton);
			} else {
				console.warn('Unable to add frequency:', frequencyList[i]);
			}
		}
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
			jq(domButton).addClass('giftOption fixed');

			// the label
			var domLabel = document.createElement('label');
			jq(domLabel).addClass('giftOption');
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

		var domCardExpireYearSelect = jq(
			'form.mainGiftForm select[name="payCardExpireYear"]'
		);
		if (domCardExpireYearSelect.length !== 1) {
			throw new Error('Unable to identify the card expire year select dropdown');
		}
		var domThisOption;
		for (var expireYear = startYear; expireYear < startYear + yearsToShow; expireYear++) {
			domThisOption = buildCardExpireYearOption(expireYear);
			if (domThisOption) {
				domCardExpireYearSelect.append(domThisOption);
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