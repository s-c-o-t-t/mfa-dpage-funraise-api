console.log("mwd-donate-widget.js v18.7.2");

window.mwdspace = window.mwdspace || {};

window.mwdspace.MFA_Funraise_Widget = function(input) {
	var thisWidget = this;
	if (typeof input == "object") {
		thisWidget.options = input;
	} else {
		thisWidget.options = {};
	}

	thisWidget.targetElement = {};
	thisWidget.isStarted = false;

	thisWidget.codeVersion = "1.0.0";
	thisWidget.mainStylesUrl =
		window.location.protocol +
		"//services.mwdagency.com/donate-widget/1.0.0/css/mwd-donate-widget.css";
	thisWidget.mainHtmlUrl =
		window.location.protocol +
		"//services.mwdagency.com/donate-widget/1.0.0/mwd-donate-widget.html";

	console.log("window.mwdspace.MFA_Funraise_Widget", thisWidget.codeVersion);

	if (!thisWidget.options.loadingText) {
		thisWidget.options.loadingText = "One moment...";
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
};

window.mwdspace.MFA_Funraise_Widget.prototype.start = async function() {
	var thisWidget = this;
	if (thisWidget.isStarted) {
		console.warn("window.mwdspace.MFA_Funraise_Widget already started");
		return;
	}
	thisWidget.isStarted = true;
	console.log("window.mwdspace.MFA_Funraise_Widget start()", thisWidget.options);

	thisWidget.targetElement.innerHTML = "";

	var promiseFontStyles = thisWidget.linkExternalStylesheet(
		"https://use.fontawesome.com/releases/v5.1.0/css/all.css"
	);
	var stylesUrl = thisWidget.options.styleSheets || thisWidget.mainStylesUrl;
	var promiseMainStyles = thisWidget.linkExternalStylesheet(stylesUrl);
	thisWidget.linkExternalStylesheet(
		"https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css"
	);
	await Promise.all([promiseFontStyles, promiseMainStyles]);

	var widgetHtml, sharedUtilResult;
	var promiseMainHtml = thisWidget.loadFile(thisWidget.mainHtmlUrl);
	var promiseSharedUtils = thisWidget.linkExternalScript(
		window.location.protocol +
			"//services.mwdagency.com/donate-widget/1.0.0/js/shared-utils.js"
	);
	[widgetHtml, sharedUtilResult] = await Promise.all([promiseMainHtml, promiseSharedUtils]);
	if (!widgetHtml) {
		console.error("MFA_Funraise_Widget.start() - unable to load base HTML");
		return;
	}

	console.warn("");
	var container = document.createElement("div");
	container.id = "mfaDonationWidgetContainer";
	container.style.opacity = 0;
	thisWidget.targetElement.appendChild(container);

	container.innerHTML = widgetHtml;

	setTimeout(function() {
		container.className = "reveal";
	}, 1);

	if (thisWidget.options.textOverride) {
		var overrideObject = {};

		if (typeof thisWidget.options.textOverride == "string") {
			try {
				var overrideFileContents = await thisWidget.loadFile(
					thisWidget.options.textOverride
				);
				if (!overrideFileContents) {
					console.error(
						"MFA_Funraise_Widget.start() - unable to load text override data from file:",
						thisWidget.options.textOverride
					);
					return;
				}

				overrideObject = window.mwdspace.sharedUtils.safeJsonParse(
					overrideFileContents
				);
			} catch (err) {
				console.log("Caught error: ", err.message);
			}
		} else {
			overrideObject = thisWidget.options.textOverride;
		}

		thisWidget.processTextOverride(overrideObject);
	}

	var promiseSpreedlyIframe = thisWidget.linkExternalScript(
		"https://core.spreedly.com/iframe/iframe-v1.min.js"
	);
	var promiseJquery = thisWidget.linkExternalScript(
		"https://code.jquery.com/jquery-3.3.1.min.js"
	);
	var isJqueryLoaded, resultSpreedlyIframe;
	[isJqueryLoaded, resultSpreedlyIframe] = await Promise.all([
		promiseSpreedlyIframe,
		promiseJquery,
	]);

	var promiseSpecialSelectCode = thisWidget.linkExternalScript(
		"https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js"
	);

	var promiseBusinessLayer = thisWidget.linkExternalScript(
		window.location.protocol +
			"//services.mwdagency.com/donate-widget/1.0.0/js/business-logic-layer.js"
	);
	var promiseTransactionLayer = thisWidget.linkExternalScript(
		window.location.protocol +
			"//services.mwdagency.com/donate-widget/1.0.0/js/transaction-system-layer.js"
	);

	await Promise.all([
		promiseBusinessLayer,
		promiseTransactionLayer,
		promiseSpecialSelectCode,
	]);
	if (isJqueryLoaded) {
		window.mwdspace.jquery = jQuery.noConflict();
	} else {
		window.mwdspace.jquery = $ || {};
	}

	await thisWidget.linkExternalScript(
		window.location.protocol +
			"//services.mwdagency.com/donate-widget/1.0.0/js/user-interface-layer.js"
	);
};

window.mwdspace.MFA_Funraise_Widget.prototype.linkExternalStylesheet = function(url) {
	var thisWidget = this;
	return new Promise(function(resolve) {
		console.log("linkExternalStylesheet() start:", url);
		var domStyleLink = document.createElement("link");
		thisWidget.targetElement.appendChild(domStyleLink);
		domStyleLink.rel = "stylesheet";
		domStyleLink.type = "text/css";
		var timeout = setTimeout(function() {
			console.log("linkExternalStylesheet() No result after 2s", url);
			resolve(false);
		}, 2000);
		domStyleLink.addEventListener("load", function(event) {
			clearTimeout(timeout);
			console.log("linkExternalStylesheet() LOADED:", url);
			resolve(true);
		});
		domStyleLink.addEventListener("error", function(event) {
			console.error("linkExternalStylesheet() ERROR EVENT", url, event);
			resolve(false);
		});
		domStyleLink.addEventListener("abort", function(event) {
			console.warn("linkExternalStylesheet() ABORT EVENT", url, event);
			resolve(false);
		});
		domStyleLink.href = encodeURI(url);
	});
};

window.mwdspace.MFA_Funraise_Widget.prototype.linkExternalScript = function(url) {
	var thisWidget = this;
	return new Promise(function(resolve) {
		console.log("linkExternalScript() start:", url);
		var domScript = document.createElement("script");
		thisWidget.targetElement.appendChild(domScript);
		var timeout = setTimeout(function() {
			console.log("linkExternalScript() No result after 2s", url);
			resolve(false);
		}, 2000);
		domScript.addEventListener("load", function(event) {
			clearTimeout(timeout);
			console.log("linkExternalScript() LOADED:", url);
			resolve(true);
		});
		domScript.addEventListener("error", function(event) {
			clearTimeout(timeout);
			console.error("linkExternalScript() ERROR", url, event);
			resolve(false);
		});
		domScript.addEventListener("abort", function(event) {
			clearTimeout(timeout);
			console.warn("linkExternalScript() ABORTED", url, event);
			resolve(false);
		});
		domScript.src = encodeURI(url);
	});
};

window.mwdspace.MFA_Funraise_Widget.prototype.loadFile = function(input) {
	var thisWidget = this;
	return new Promise(function(resolve) {
		if (typeof input == "undefined") {
			console.warn("loadFile() given empty url");
			resolve(null);
		}
		if (typeof input != "string") {
			console.warn("loadFile() given invalid url type:", typeof input, input);
			resolve(null);
		}
		console.log("loadFile() start:", input);
		var requestUrl = encodeURI(input);
		var xhr = new XMLHttpRequest();

		xhr.addEventListener("load", function(event) {
			console.log(">> loadFile() LOADED:", input);
			// console.log(">> loadFile() event.target", typeof event.target);
			// console.log(">> loadFile() event.target.response", typeof event.target.response);
			// console.log(event);

			var fileContents = event.target.responseText || event.target.response || null;
			resolve(fileContents);
		});
		xhr.addEventListener("error", function(event) {
			console.error("loadFile() ERROR EVENT", requestUrl, event);
			resolve(null);
		});
		xhr.addEventListener("abort", function(event) {
			console.warn("loadFile() ABORT EVENT", requestUrl, event);
			resolve(null);
		});

		xhr.open("get", requestUrl, true);
		// xhr.setRequestHeader('Accept', acceptContentType);
		xhr.send();
	});
};

window.mwdspace.MFA_Funraise_Widget.prototype.processTextOverride = function(input) {
	var thisWidget = this;
	if (typeof input == "undefined") {
		var input = {};
	}
	if (typeof input != "object" || !input) {
		console.log(
			"MFA_Funraise_Widget.processTextOverride() given invalid object",
			typeof input
		);
		return false;
	}
	console.warn("processTextOverride() input", input);
	var changeList = [];
	var thisSelector;
	for (var key in input) {
		if (typeof input[key] == "object") {
			for (var subkey in input[key]) {
				thisSelector = key + "." + subkey;
				thisWidget.setElementText(thisSelector, input[key][subkey]);
			}
		}
	}
};

window.mwdspace.MFA_Funraise_Widget.prototype.setElementText = function(labelId, value) {
	console.warn("REPLACE", labelId, value);
	var thisWidget = this;
	if (typeof labelId == "undefined") {
		var labelId = "";
	}
	if (!labelId) {
		console.warn("setElementText() given empty labelId");
		return;
	}
	var selector = '[data-label-id="' + labelId + '"]';
	var elementList = document.querySelectorAll(selector);
	var thisTag;
	if (elementList) {
		for (var i = 0; i < elementList.length; i++) {
			thisTag = String(elementList[i].tagName).toLowerCase();
			console.warn(" >>", labelId, "=", thisTag);
			switch (thisTag) {
				case "input":
					elementList[i].setAttribute("placeholder", value);
					break;
				case "label":
				case "span":
				case "h1":
				case "h2":
				case "h3":
				case "h4":
				case "h5":
				case "h6":
				case "p":
					elementList[i].innerHTML = value;
					break;
				default:
					console.warn("setElementText(): Ignoring tag", labelId, thisTag);
			}
		}
	}
};
