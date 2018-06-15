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

    var scriptFilename = es5Only ? 'es5-mwd-donate-widget.js' : 'es5-mwd-donate-widget.js';
    var url = 'http://services.mwdagency.com/donate-widget/1.0.0/' + scriptFilename;

    try {
        var inlineInclude = '<script src="' + encodeURI(url) + '"></script>';
        document.write(inlineInclude);
        // var domScript = document.createElement("script");
        // var targetElement = document.getElementsByTagName("body");
        // targetElement[0].appendChild(domScript);
        // var timeout = setTimeout(function () {
        //     console.log("mfa_funraise_widget.js: No result after 2s", url);
        //     resolve(false);
        // }, 2000);
        // domScript.addEventListener('load', function (event) {
        //     clearTimeout(timeout);
        //     console.log("mfa_funraise_widget.js: LOADED", url);
        //     resolve(true);
        // });
        // domScript.addEventListener('error', function (event) {
        //     clearTimeout(timeout);
        //     console.error("mfa_funraise_widget.js: LOAD ERROR", url, event);
        //     resolve(false);
        // });
        // domScript.addEventListener('abort', function (event) {
        //     clearTimeout(timeout);
        //     console.warn("mfa_funraise_widget.js: LOAD ABORTED", url, event);
        //     resolve(false);
        // });
        // domScript.src = encodeURI(url);
    } catch (err) {
        console.error("mfa_funraise_widget.js: Unable to run:", err);
    }

})();