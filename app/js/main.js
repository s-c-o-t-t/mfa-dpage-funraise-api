console.log('main.js v18.4.19b');

var stepList = document.querySelectorAll('section.step');

showStep('giftAmount');

setTimeout(function() {
	showStep('payment');
}, 3000);

window.onload = function() {
	console.log('window.onload: $ is ', typeof $);
	// $('input[type=radio]').change(function() {
	// 	$('div.giftFormHeader span.giftDisplayContainer').slideDown(666);
	// });
};
document.onload = function() {
	console.log('document.onload: $ is ', typeof $);
};

document.addEventListener('click', function(event) {
	if (event.target.tagName.match(/button/i)) {
		var htmlWorking = event.target.getAttribute('data-working');
		if (htmlWorking) {
			event.target.classList.add('blocked');
			event.target.innerHTML = htmlWorking;
		}
	}
});

function showStep(targetStepName) {
	var thisBackButton = document.querySelector('button.goPreviousStep');
	var thisName;
	stepList.forEach(function(step) {
		thisName = step.getAttribute('data-step-name');

		if (thisName == targetStepName) {
			safeFadeIn(step);
		} else {
			step.style.display = 'none';
		}
		if (thisName == 'giftAmount') {
			thisBackButton.style.display = 'none';
		} else {
			safeFadeIn(thisBackButton);
		}
	});
}

function safeFadeIn(target, duration) {
	if (typeof $ == 'function') {
		$(target).fadeIn(duration);
	} else {
		target.style.display = 'block';
	}
}

function safeFadeOut(target, duration) {
	if (typeof $ == 'function') {
		$(target).fadeOut(duration);
	} else {
		target.style.display = 'none';
	}
}
