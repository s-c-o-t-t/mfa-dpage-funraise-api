console.log('shared-utils.js v18.4.19');

window.mwdspace = window.mwdspace || {};

function safeJsonParse(input) {
	try {
		return JSON.parse(input);
	} catch (e) {
		console.error('safeJsonParse(): Caught error: ' + e.message);
		console.log('safeJsonParse() INPUT:', input);
	}
	return null;
}

function safeJsonString(input) {
	var sJson = null;
	try {
		sJson = JSON.stringify(input);
	} catch (e) {
		console.error('safeJsonString(): Caught error: ' + e.message);
		console.log('safeJsonString() INPUT:', input);
	}
	return sJson;
}

function stringEquals(input1, input2) {
	return ensureString(input1) == ensureString(input2);
}

function stringEqualsIgnore(input1, input2) {
	return ensureString(input1).toLowerCase() == ensureString(input2).toLowerCase();
}

function ensureString(input) {
	if (typeof input != 'undefined' && input !== null) {
		try {
			return String(input);
		} catch (err) {
			console.warn('ensureString() caught error:', err);
		}
	}
	return '';
}

function isEmpty(input) {
	if (typeof input == 'undefined') {
		return true;
	}
	if (!input) {
		return true;
	}
	// strings with only spaces
	if (typeof input == 'string' && input.trim() == '') {
		return true;
	}
	// arrays with no items
	if (typeof input == 'object' && typeof input.length != 'undefined' && input.length < 1) {
		return true;
	}
	// empty objects
	if (typeof input == 'object' && Object.keys(input).length === 0 && input.constructor === Object) {
		return true;
	}
	return false;
}

function setSessionValue(name, value) {
	if (typeof value == 'undefined') {
		var value = '';
	}
	if (value == 'undefined') {
		console.log('getSessionValue() STRING = "UNDEFINED"');
	}
	if (typeof value == 'undefined') {
		console.log('getSessionValue() IS UNDEFINED');
	}
	try {
		sessionStorage.setItem(name, value);
	} catch (e) {
		// use cookie when session storage isn't available
		console.warn('setSessionValue(): Unable to use session storage.');
		createCookie(name, value, 0);
	}
}

function getSessionValue(name) {
	var value = null;
	try {
		value = sessionStorage.getItem(name);
	} catch (e) {
		// use cookie when session storage isn't available
		console.warn('getSessionValue(): Unable to use session storage.');
		value = readCookie(name);
	}
	return value;
}

function removeSessionValue(name) {
	try {
		value = sessionStorage.removeItem(name);
	} catch (e) {
		// use cookie when session storage isn't available
		console.warn('removeLocalValue(): Unable to use session storage.');
		createCookie(name, '', -1);
	}
	return value;
}

function setLocalValue(name, value) {
	if (typeof value == 'undefined') {
		var value = '';
	}
	if (value == 'undefined') {
		console.log('getSessionValue() STRING = "UNDEFINED"');
	}
	if (typeof value == 'undefined') {
		console.log('getSessionValue() IS UNDEFINED');
	}
	try {
		localStorage.setItem(name, value);
	} catch (e) {
		// use cookie when local storage isn't available
		console.warn('setLocalValue(): Unable to use local storage.');
		createCookie(name, value, 365);
	}
}

function getLocalValue(name) {
	var value = null;
	try {
		value = localStorage.getItem(name);
	} catch (e) {
		// use cookie when local storage isn't available
		console.warn('getLocalValue(): Unable to use local storage.');
		value = readCookie(name);
	}
	return value;
}

function removeLocalValue(name) {
	try {
		value = localStorage.removeItem(name);
	} catch (e) {
		// use cookie when local storage isn't available
		console.warn('removeLocalValue(): Unable to use local storage.');
		createCookie(name, '', -1);
	}
	return value;
}

function createCookie(name, value, days) {
	var expires = '';
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = '; expires=' + date.toGMTString();
	}
	document.cookie = name + '=' + value + expires + '; path=/';
}

function readCookie(name) {
	var nameEQ = name + '=';
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) {
			return c.substring(nameEQ.length, c.length);
		}
	}
	return false;
}

function getUrlParameter(input, ignoreCase) {
	if (typeof ignoreCase == 'undefined') {
		var ignoreCase = true;
	}
	var targetKey = ensureString(input);
	if (isEmpty(targetKey)) {
		console.warn('getUrlParameter() given empty input');
		return '';
	}
	if (typeof window.mwdspace.urlParameters != 'object') {
		makeUrlParameterList();
	}
	var regexFlag = ignoreCase ? 'i' : '';
	var regex = new RegExp(targetKey, regexFlag);
	for (parameterKey in window.mwdspace.urlParameters) {
		if (parameterKey.match(regex)) {
			return window.mwdspace.urlParameters[parameterKey];
		}
	}
	return '';
}

function makeUrlParameterList() {
	window.mwdspace.urlParameters = {};
	var rawPairs = window.location.search.split(/[\?&]/);
	var thisPair, thisKey;
	for (var i = 0; i < rawPairs.length; i++) {
		if (!isEmpty(rawPairs[i])) {
			thisPair = rawPairs[i].split('=');
			thisKey = ensureString(thisPair[0]);
			thisKey = thisKey.replace('+', ' ');
			thisKey = decodeURIComponent(thisKey);
			if (!isEmpty(thisKey)) {
				if (!isEmpty(thisKey)) {
					window.mwdspace.urlParameters[thisKey] = decodeURIComponent(thisPair[1]);
				}
			}
		}
	}
}