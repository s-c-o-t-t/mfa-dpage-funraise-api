console.log("mwd-donate-widget.js v18.7.1d");

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

	var stylesUrl = thisWidget.options.styleSheets || thisWidget.mainStylesUrl;
	thisWidget.linkExternalStylesheet(stylesUrl);
	thisWidget.linkExternalStylesheet(
		"https://use.fontawesome.com/releases/v5.1.0/css/all.css",
		{
			integrity:
				"sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt",
			crossorigin: "anonymous",
		}
	);

	var promiseMainHtml = thisWidget.loadFile(thisWidget.mainHtmlUrl);

	var promiseSharedUtils = thisWidget.linkExternalScript(
		window.location.protocol +
			"//services.mwdagency.com/donate-widget/1.0.0/js/shared-utils.js"
	);

	var widgetHtml, sharedUtilResult;
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

	setTimeout(function() {
		container.className = "reveal";
	}, 1);

	// await thisWidget.linkExternalScript("https://core.spreedly.com/iframe/iframe-v1.min.js");
	thisWidget.linkExternalScript(
		window.location.protocol +
			"//services.mwdagency.com/donate-widget/1.0.0/js/business-logic-layer.js"
	);
	thisWidget.linkExternalScript(
		window.location.protocol +
			"//services.mwdagency.com/donate-widget/1.0.0/js/transaction-system-layer.js"
	);

	var isJqueryLoaded = await thisWidget.linkExternalScript(
		"https://code.jquery.com/jquery-3.3.1.min.js",
		{
			integrity: "sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=",
			crossorigin: "anonymous",
		}
	);
	if (isJqueryLoaded) {
		window.mwdspace.jquery = jQuery.noConflict();
	} else {
		window.mwdspace.jquery = $ || {};
	}
	thisWidget.linkExternalScript(
		window.location.protocol +
			"//services.mwdagency.com/donate-widget/1.0.0/js/user-interface-layer.js"
	);
};

window.mwdspace.MFA_Funraise_Widget.prototype.linkExternalStylesheet = function(url) {
	var thisWidget = this;
	// console.log("linkExternalStylesheet()", url);
	var domStyleLink = document.createElement("link");
	thisWidget.targetElement.appendChild(domStyleLink);
	domStyleLink.rel = "stylesheet";
	domStyleLink.type = "text/css";
	// domStyleLink.addEventListener('load', function (event) {
	//     console.log("linkExternalStylesheet() loaded:", url);
	// });
	domStyleLink.addEventListener("error", function(event) {
		console.error("linkExternalStylesheet() ERROR EVENT", url, event);
	});
	domStyleLink.addEventListener("abort", function(event) {
		console.warn("linkExternalStylesheet() ABORT EVENT", url, event);
	});
	domStyleLink.href = encodeURI(url);
};

window.mwdspace.MFA_Funraise_Widget.prototype.linkExternalScript = function(url) {
	var thisWidget = this;
	return new Promise(function(resolve, reject) {
		// console.log("linkExternalScript()", url);
		var domScript = document.createElement("script");
		thisWidget.targetElement.appendChild(domScript);
		var timeout = setTimeout(function() {
			console.log("linkExternalScript() No result after 2s", url);
			resolve(false);
		}, 2000);
		domScript.addEventListener("load", function(event) {
			clearTimeout(timeout);
			// console.log("linkExternalScript() LOADED", url);
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

window.mwdspace.MFA_Funraise_Widget.prototype.loadFile = async function(input) {
	var thisWidget = this;
	return new Promise(async (resolve, reject) => {
		if (typeof input == "undefined") {
			console.warn("loadFile() given empty url");
			reject(null);
		}
		if (typeof input != "string") {
			console.warn("loadFile() given invalid url type:", typeof input, input);
			reject(null);
		}
		// console.log("loadFile()", input);
		var requestUrl = encodeURI(input);
		var xhr = new XMLHttpRequest();

		xhr.addEventListener("load", function(event) {
			console.log(">> loadFile() complete", input);
			// console.log(">> loadFile() event.target", typeof event.target);
			// console.log(">> loadFile() event.target.response", typeof event.target.response);
			// console.log(event);

			var fileContents = event.target.responseText || event.target.response || null;
			resolve(fileContents);
		});
		xhr.addEventListener("error", function(event) {
			console.error("loadFile() ERROR EVENT", requestUrl, event);
			reject(null);
		});
		xhr.addEventListener("abort", function(event) {
			console.warn("loadFile() ABORT EVENT", requestUrl, event);
			reject(null);
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
