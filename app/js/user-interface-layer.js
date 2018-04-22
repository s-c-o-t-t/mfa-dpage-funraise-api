console.log('user-interface-layer.js v18.4.19');

// GLOBALS
var stepList = document.querySelectorAll('section.step');

// DOM OBJECTS
var domMainBackButton = document.querySelector('button.goPreviousStep');

showStep('giftAmount');

// setTimeout(function() {
// 	showStep('payment');
// }, 3000);

$('input[type=radio]').change(function() {
	$('div.giftFormHeaderContainer').slideDown(666);
});

// GENERAL CLICK HANDLER
document.addEventListener('click', function(event) {
	console.log('CLICK ON', event.target.tagName, event.target.className);
	var clickTarget = $(event.target).closest('button, .clickTarget');
	if (clickTarget) {
		if (clickTarget.hasClass('processDonation')) {
			var buttonHtml = event.target.getAttribute('data-working');
			if (buttonHtml) {
				event.target.classList.add('blocked');
				event.target.innerHTML = buttonHtml;
			}
			var data = {
				amount: 6.66,
			};
			startDonation(
				data,
				function(donationInfo) {
					console.log('SUCCESS FUNCTION', donationInfo);
					var buttonHtml = event.target.getAttribute('data-success');
					event.target.classList.remove('blocked');
					event.target.innerHTML = buttonHtml;
					alert(donationInfo.text);
				},
				function(donationInfo) {
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
	var thisName;
	stepList.forEach(function(step) {
		thisName = step.getAttribute('data-step-name');

		if (thisName == targetStepName) {
			if (thisName == 'giftAmount') {
				$(domMainBackButton).hide();
			} else {
				$(domMainBackButton).show();
			}
			$(step).fadeIn(666);
		} else {
			$(step).hide();
		}
	});
}
