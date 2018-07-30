"use strict";
(function() {
	var es5Only = false;

	if (!"Promise" in window) {
		es5Only = true;
	} else {
		try {
			eval("async () => {}");
		} catch (e) {
			if (e instanceof SyntaxError) {
				es5Only = true;
			}
		}
	}

	if (es5Only) {
		if (window.console)
			console.warn(
				"Browser does not support modern features. Will load transpiled code version."
			);
	}

	var scriptFilename = es5Only ? "es5-mwd-donate-widget.js" : "mwd-donate-widget.js";

	var url = "https://quiz.mercyforanimals.org/donate-widget/1.0.0/js/" + scriptFilename;
	if (window.location.hostname == "localhost") {
		url = "http://localhost:8888/mwd/mfa/mfa-dpage-funraise-api/dist/js/" + scriptFilename;
		if (window.console) console.warn("LOADING TEST WIDGET", url);
	}

	try {
		var inlineInclude = '<script src="' + encodeURI(url) + '"></script>';
		document.write(inlineInclude);
	} catch (err) {
		if (window.console) console.error("mfa_funraise_widget.js: Unable to run:", err);
	}
})();
