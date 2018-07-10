"use strict";
(function() {
	console.log("shared-utils.js v18.7.9a");

	window.mwdspace = window.mwdspace || {};

	window.mwdspace.sharedUtils = window.mwdspace.sharedUtils || {};
	var sharedUtils = window.mwdspace.sharedUtils;

	sharedUtils.safeJsonParse = function(input) {
		try {
			return JSON.parse(input);
		} catch (e) {
			console.error("safeJsonParse(): Caught error: " + e.message);
			console.log("safeJsonParse() INPUT:", input);
		}
		return null;
	};

	sharedUtils.safeJsonString = function(input) {
		var sJson = null;
		try {
			sJson = JSON.stringify(input);
		} catch (e) {
			console.error("safeJsonString(): Caught error: " + e.message);
			console.log("safeJsonString() INPUT:", input);
		}
		return sJson;
	};

	sharedUtils.stringEquals = function(input1, input2) {
		return sharedUtils.ensureString(input1) == sharedUtils.ensureString(input2);
	};

	sharedUtils.stringEqualsIgnore = function(input1, input2) {
		return (
			sharedUtils.ensureString(input1).toLowerCase() ==
			sharedUtils.ensureString(input2).toLowerCase()
		);
	};

	sharedUtils.ensureString = function(input) {
		if (typeof input != "undefined" && input !== null) {
			try {
				return String(input);
			} catch (err) {
				console.warn("ensureString() caught error:", err);
			}
		}
		return "";
	};

	sharedUtils.isEmpty = function(input) {
		if (typeof input == "undefined") {
			return true;
		}
		if (!input) {
			return true;
		}
		// strings with only spaces
		if (typeof input == "string" && input.trim() == "") {
			return true;
		}
		// arrays with no items
		if (
			typeof input == "object" &&
			typeof input.length != "undefined" &&
			input.length < 1
		) {
			return true;
		}
		// empty objects
		if (
			typeof input == "object" &&
			Object.keys(input).length === 0 &&
			input.constructor === Object
		) {
			return true;
		}
		return false;
	};

	sharedUtils.setSessionValue = function(key, value) {
		if (typeof value == "undefined") {
			var value = "";
		}
		try {
			var pageKey = sharedUtils.getPageId() + "_" + key;
			sessionStorage.setItem(pageKey, value);
		} catch (e) {
			// use cookie when session storage isn't available
			console.warn("setSessionValue(): Unable to use session storage.");
			sharedUtils.createCookie(name, value, 0);
		}
	};

	sharedUtils.getSessionValue = function(key) {
		var value = null;
		try {
			var pageKey = sharedUtils.getPageId() + "_" + key;
			value = sessionStorage.getItem(pageKey);
		} catch (e) {
			// use cookie when session storage isn't available
			console.warn("getSessionValue(): Unable to use session storage.");
			value = readCookie(name);
		}
		return value;
	};

	sharedUtils.removeSessionValue = function(key) {
		try {
			var pageKey = sharedUtils.getPageId() + "_" + key;
			sessionStorage.removeItem(pageKey);
			return true;
		} catch (e) {
			// use cookie when session storage isn't available
			console.warn("removeLocalValue(): Unable to use session storage.");
			sharedUtils.createCookie(name, "", -1);
		}
		return false;
	};

	sharedUtils.setLocalValue = function(key, value) {
		if (typeof value == "undefined") {
			var value = "";
		}
		try {
			var pageKey = sharedUtils.getPageId() + "_" + key;
			localStorage.setItem(pageKey, value);
		} catch (e) {
			// use cookie when local storage isn't available
			console.warn("setLocalValue(): Unable to use local storage.");
			sharedUtils.createCookie(name, value, 365);
		}
	};

	sharedUtils.getLocalValue = function(key) {
		var value = null;
		try {
			var pageKey = sharedUtils.getPageId() + "_" + key;
			value = localStorage.getItem(pageKey);
		} catch (e) {
			// use cookie when local storage isn't available
			console.warn("getLocalValue(): Unable to use local storage.");
			value = sharedUtils.readCookie(name);
		}
		return value;
	};

	sharedUtils.removeLocalValue = function(key) {
		try {
			var pageKey = sharedUtils.getPageId() + "_" + key;
			localStorage.removeItem(pageKey);
			return true;
		} catch (e) {
			// use cookie when local storage isn't available
			console.warn("removeLocalValue(): Unable to use local storage.");
			sharedUtils.createCookie(name, "", -1);
		}
		return false;
	};

	sharedUtils.getPageId = function() {
		if (typeof window.mwdspace.pageId != "string") {
			var cleanPath = String(window.location.pathname).replace(/\W/g, "_");
			var prefix = window.mwdspace.pageIdPrefix || "page";
			window.mwdspace.pageId = prefix + "_" + cleanPath;
		}
		return window.mwdspace.pageId;
	};

	sharedUtils.createCookie = function(name, value, days) {
		var expires = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
			expires = "; expires=" + date.toGMTString();
		}
		document.cookie = name + "=" + value + expires + "; path=/";
	};

	sharedUtils.readCookie = function(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(";");
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == " ") c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) {
				return c.substring(nameEQ.length, c.length);
			}
		}
		return false;
	};

	sharedUtils.getUrlParameter = function(input, ignoreCase) {
		if (typeof input == "undefined") {
			var input = "";
		}
		if (typeof ignoreCase == "undefined") {
			var ignoreCase = true;
		}
		var targetKey = sharedUtils.ensureString(input);
		if (sharedUtils.isEmpty(targetKey)) {
			console.warn("getUrlParameter() given empty input");
			return "";
		}
		if (typeof window.mwdspace.urlParameters != "object") {
			sharedUtils.makeUrlParameterList();
		}
		var regexFlag = ignoreCase ? "i" : "";
		var regex = new RegExp(targetKey, regexFlag);
		for (var parameterKey in window.mwdspace.urlParameters) {
			if (parameterKey.match(regex)) {
				return window.mwdspace.urlParameters[parameterKey];
			}
		}
		return "";
	};

	sharedUtils.makeUrlParameterList = function() {
		window.mwdspace.urlParameters = {};
		var rawPairs = window.location.search.split(/[\?&]/);
		var thisPair, thisKey;
		for (var i = 0; i < rawPairs.length; i++) {
			if (!sharedUtils.isEmpty(rawPairs[i])) {
				thisPair = rawPairs[i].split("=");
				// account for plus signs as spaces in URL
				thisKey = sharedUtils.ensureString(thisPair[0]).replace("+", " ");
				thisKey = decodeURIComponent(thisKey);
				if (!sharedUtils.isEmpty(thisKey)) {
					window.mwdspace.urlParameters[thisKey] = decodeURIComponent(thisPair[1]);
				}
			}
		}
	};

	sharedUtils.makeUniqueId = function(prefix) {
		if (typeof prefix == "undefined") {
			var prefix = "";
		}
		function fromRandom() {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		}
		function fromTime() {
			return new Date()
				.getTime()
				.toString(16)
				.substring(1);
		}

		prefix = String(prefix).trim();
		return prefix + fromRandom() + fromTime() + fromRandom();
	};
})();
