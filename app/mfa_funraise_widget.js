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
		console.warn(
			"Browser does not support modern features. Will load transpiled code version."
		);
	}

	var scriptFilename = es5Only ? "es5-mwd-donate-widget.js" : "mwd-donate-widget.js";
	var url =
		window.location.protocol +
		"//services.mwdagency.com/donate-widget/1.0.0/js/" +
		scriptFilename;

	try {
		var inlineInclude = '<script src="' + encodeURI(url) + '"></script>';
		document.write(inlineInclude);
	} catch (err) {
		console.error("mfa_funraise_widget.js: Unable to run:", err);
	}
})();
