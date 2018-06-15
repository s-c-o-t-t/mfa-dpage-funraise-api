"use strict";
(function () {

    console.log("mfa_funraise_widget.js v18.6.14d");

    var es5Only = false;

    if (!"Promise" in window) {
        es5Only = true;
    } else {
        try {
            eval('async () => {}');
        } catch (e) {
            if (e instanceof SyntaxError) {
                es5Only = true;
            }

        }
    }

    console.log("es5Only", es5Only);
    if (es5Only) {
        console.warn("Browser does not support modern features. Will load Babel code version.");
    }

    var scriptFilename = es5Only ? 'es5-mwd-donate-widget.js' : 'mwd-donate-widget.js';
    var url = 'http://services.mwdagency.com/donate-widget/1.0.0/' + scriptFilename;

    try {
        var inlineInclude = '<script src="' + encodeURI(url) + '"></script>';
        document.write(inlineInclude);
    } catch (err) {
        console.error("mfa_funraise_widget.js: Unable to run:", err);
    }

})();