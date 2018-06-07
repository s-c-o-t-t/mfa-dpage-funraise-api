console.log("mfa_funraise_widget.js v18.5.17");

var MFA_Funraise_Widget = function (input) {
    if (typeof input == 'object') {
        this.options = input;
    } else {
        this.options = {};
    }

    this.codeVersion = '1.0.0';
    this.mainStylesUrl = "css/mfa_funraise_widget.css";

    console.log("MFA_Funraise_Widget", this.codeVersion);

    if (!this.options.loadingText) {
        this.options.loadingText = 'One moment...';
    }

    var stylesUrl = this.options.styleSheets || this.mainStylesUrl;
    this.loadStylesheet(stylesUrl);

}
MFA_Funraise_Widget.prototype.start = function (input) {
    if (typeof input == 'undefined') {
        var input = {};
    }
    console.log("MFA_Funraise_Widget start()", this.options);

    if (input.loadingText) {
        this.options.loadingText = input.loadingText;
    }

    if (!this.options.element) {
        console.warn("Invalid options given:", this.options);
        return false;
    }

    var target = document.querySelectorAll(this.options.element);
    if (!target) {
        console.warn("Specified target element not found:", this.options.element);
        return false;
    }
    target = target[0];
    target.innerHTML = "";
    var container = document.createElement("div");
    container.classList.add('mfaDonationWidgetContainer');
    container.style.opacity = 0;
    target.appendChild(container);

    var message = document.createElement("h2");
    message.innerText = this.options.loadingText + ' - v' + this.codeVersion;
    container.appendChild(message);

    setTimeout(function () {
        container.classList.add("reveal");
    }, 100);

};
MFA_Funraise_Widget.prototype.loadStylesheet = function (url) {
    console.log("loadStylesheet()", url);
    var domStyleLink = document.createElement("link");
    domStyleLink.rel = "stylesheet";
    domStyleLink.type = "text/css";
    domStyleLink.href = encodeURI(url);
    domStyleLink.addEventListener('onload', function (event) {
        console.log("loadStylesheet() EVENT", url, event);
    });
    domStyleLink.addEventListener('onerror', function (event) {
        console.log("loadStylesheet() EVENT", url, event);
    });
    domStyleLink.addEventListener('onabort', function (event) {
        console.log("loadStylesheet() EVENT", url, event);
    });
    document.getElementsByTagName("head")[0].appendChild(domStyleLink);
};