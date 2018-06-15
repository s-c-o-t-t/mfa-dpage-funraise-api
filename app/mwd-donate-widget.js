console.log("mwd-donate-widget.js v18.6.15a");

window.mwdspace = window.mwdspace || {};

console.log("BEFORE typeof window.mwdspace.MFA_Funraise_Widget", typeof window.mwdspace.MFA_Funraise_Widget);
window.mwdspace.MFA_Funraise_Widget = function (input) {
    var thisWidget = this;
    if (typeof input == 'object') {
        thisWidget.options = input;
    } else {
        thisWidget.options = {};
    }

    thisWidget.targetElement = {};
    thisWidget.isStarted = false;

    thisWidget.codeVersion = '1.0.0';
    thisWidget.mainStylesUrl = "http://services.mwdagency.com/donate-widget/1.0.0/css/mwd-donate-widget.css";
    thisWidget.mainHtmlUrl = "http://services.mwdagency.com/donate-widget/1.0.0/mwd-donate-widget.html";

    console.log("window.mwdspace.MFA_Funraise_Widget", thisWidget.codeVersion);

    if (!thisWidget.options.loadingText) {
        thisWidget.options.loadingText = 'One moment...';
    }

    if (!thisWidget.options.element) {
        console.warn("Invalid options - No target element:", thisWidget.options);
        return false;
    }
    var target = document.querySelectorAll(thisWidget.options.element);
    if (!target) {
        console.warn("Specified target element not found:", thisWidget.options.element);
        return false;
    }
    thisWidget.targetElement = target[0];

}
console.log("AFTER typeof window.mwdspace.MFA_Funraise_Widget", typeof window.mwdspace.MFA_Funraise_Widget);

window.mwdspace.MFA_Funraise_Widget.prototype.start = async function () {
    var thisWidget = this;
    if (thisWidget.isStarted) {
        console.warn("window.mwdspace.MFA_Funraise_Widget already started");
        return;
    }
    thisWidget.isStarted = true;
    console.log("window.mwdspace.MFA_Funraise_Widget start()", thisWidget.options);

    thisWidget.targetElement.innerHTML = "";

    var stylesUrl = thisWidget.options.styleSheets || thisWidget.mainStylesUrl;
    thisWidget.linkExternalStylesheet(stylesUrl);

    thisWidget.loadFile(thisWidget.mainHtmlUrl, async function (widgetHtml) {

        var container = document.createElement("div");
        container.id = 'mfaDonationWidgetContainer';
        container.style.opacity = 0;
        thisWidget.targetElement.appendChild(container);

        container.innerHTML = widgetHtml;

        setTimeout(function () {
            container.className = "reveal";
            // container.classList.add("reveal");
        }, 1);

        // await thisWidget.linkExternalScript("https://core.spreedly.com/iframe/iframe-v1.min.js");
        await thisWidget.linkExternalScript("http://services.mwdagency.com/donate-widget/1.0.0/js/shared-utils.js");
        thisWidget.linkExternalScript("http://services.mwdagency.com/donate-widget/1.0.0/js/business-logic-layer.js");
        thisWidget.linkExternalScript("http://services.mwdagency.com/donate-widget/1.0.0/js/transaction-system-layer.js");

        await thisWidget.linkExternalScript("https://code.jquery.com/jquery-3.3.1.min.js", {
            integrity: "sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=",
            crossorigin: "anonymous"
        });
        thisWidget.linkExternalScript("http://services.mwdagency.com/donate-widget/1.0.0/js/user-interface-layer.js");

    });

};

window.mwdspace.MFA_Funraise_Widget.prototype.linkExternalStylesheet = function (url) {
    var thisWidget = this;
    // console.log("linkExternalStylesheet()", url);
    var domStyleLink = document.createElement("link");
    thisWidget.targetElement.appendChild(domStyleLink);
    domStyleLink.rel = "stylesheet";
    domStyleLink.type = "text/css";
    domStyleLink.addEventListener('load', function (event) {
        console.log("linkExternalStylesheet() loaded:", url);
    });
    domStyleLink.addEventListener('error', function (event) {
        console.error("linkExternalStylesheet() ERROR EVENT", url, event);
    });
    domStyleLink.addEventListener('abort', function (event) {
        console.warn("linkExternalStylesheet() ABORT EVENT", url, event);
    });
    domStyleLink.href = encodeURI(url);
};

window.mwdspace.MFA_Funraise_Widget.prototype.linkExternalScript = function (url) {
    var thisWidget = this;
    return new Promise(function (resolve, reject) {
        // console.log("linkExternalScript()", url);
        var domScript = document.createElement("script");
        thisWidget.targetElement.appendChild(domScript);
        var timeout = setTimeout(function () {
            console.log("linkExternalScript() No result after 2s", url);
            resolve(false);
        }, 2000);
        domScript.addEventListener('load', function (event) {
            clearTimeout(timeout);
            console.log("linkExternalScript() LOADED", url);
            resolve(true);
        });
        domScript.addEventListener('error', function (event) {
            clearTimeout(timeout);
            console.error("linkExternalScript() ERROR", url, event);
            resolve(false);
        });
        domScript.addEventListener('abort', function (event) {
            clearTimeout(timeout);
            console.warn("linkExternalScript() ABORTED", url, event);
            resolve(false);
        });
        domScript.src = encodeURI(url);
    });
};

window.mwdspace.MFA_Funraise_Widget.prototype.loadFile = function (input, callback) {
    var thisWidget = this;
    if (typeof input == 'undefined') {
        console.warn("loadFile() given empty url");
        return null;
    }
    if (typeof input != 'string') {
        console.warn("loadFile() given invalid url type:", typeof input, input);
        return null;
    }
    console.log("loadFile()", input);
    var requestUrl = encodeURI(input);
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function (event) {
        // console.log("loadFile() EVENT", requestUrl, event);
        // console.log("event.response", event.target.response);
        if (typeof callback == 'function') {
            callback(event.target.response);
        }
    });
    xhr.addEventListener('error', function (event) {
        console.error("loadFile() ERROR EVENT", requestUrl, event);
    });
    xhr.addEventListener('abort', function (event) {
        console.warn("loadFile() ABORT EVENT", requestUrl, event);
    });

    xhr.open("get", requestUrl, true);
    // xhr.setRequestHeader('Accept', acceptContentType);
    xhr.send();
};