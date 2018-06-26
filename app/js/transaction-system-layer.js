console.log('transaction-system-layer.js v18.4.19');

window.mwdspace = window.mwdspace || {};

// https://platform.funraise.io/
var apiConstants = {
	baseUrl: 'http://scottcrowningshield.com/funraise/public/api/v2/',
	organizationId: '1e78fec4-8fd0-4a3e-b82b-866c29012531',
};

var requestTimeoutSeconds = 20;
var requestInitialPollDelay = 1000;
window.mwdspace = window.mwdspace || {};

window.mwdspace.donationInProgress = false;
window.mwdspace.donationStartTime = false;

window.mwdspace.validCurrencyList = [{
		code: 'USD',
		name: 'U.S. Dollar',
		symbol: '$',
	},
	{
		code: 'CAD',
		name: 'Canadian Dollar',
		symbol: '$',
	},
	{
		code: 'MXN',
		name: 'Mexican Peso',
		symbol: 'MEX',
	},
	{
		code: 'BRL',
		name: 'Brazilian Real',
		symbol: 'R$',
	},
	{
		code: 'INR',
		name: 'Indian Rupee',
		symbol: '&#8360;', // &#8360; &#8377;
	},
];

window.mwdspace.validPayMethodList = [{
		code: 'card',
		name: 'Card',
		description: 'Donate With Card',
		minimumAmount: 5.0,
		maximumAmount: 20000.0,
		subtypes: [{
			code: 'card',
			name: 'Donate With Card',
		}, ],
		frequencies: [{
				code: 'single',
				name: 'One-Time',
			},
			{
				code: 'monthly',
				name: 'Monthly',
			},
		],
	},
	{
		code: 'bitcoin',
		name: 'Bitcoin',
		description: 'Donate With Bitcoin',
		minimumAmount: 5.0,
		maximumAmount: 20000.0,
		frequencies: [{
			code: 'single',
			name: 'One-Time',
		}, ],
	},
];

function startDonation(options, successFunction, failFunction) {
	console.log('>>>> startDonation()');
	if (typeof options == 'undefined') {
		var options = {};
	}
	window.mwdspace.donationInProgress = true;

	var sendData = options.data || {};
	sendData.organizationId = apiConstants.organizationId;
	sendData.sourceUrl = sendData.sourceUrl || window.location.hostname + window.location.pathname;
	sendData.referrer = sendData.referrer || document.referrer || '';

	var donationOptions = {
		method: 'post',
		url: apiConstants.baseUrl + 'donation',
		sendData: sendData,
		verbose: true,
	};

	//initial post to create donation
	try {
		sendXhrRequest(
			donationOptions,
			function (response) {
				console.log('response INITIAL', typeof response, response);
				if (!response.json || !response.json.id) {
					console.error('startDonation(): Invalid response, no "id":');
					console.log(response);
					return failFunction(response);
				}
				var donateId = response.json.id;
				window.mwdspace.donationStartTime = new Date();
				setSessionValue('donationId', donateId);
				setSessionValue('donationStartTime', window.mwdspace.donationStartTime.toUTCString());
				completeDonation(donateId, requestInitialPollDelay, successFunction, failFunction);
			},
			failFunction
		);
	} catch (err) {
		console.error('startDonation CAUGHT ERROR', err);
		failFunction({});
	}
}

//poll API for response
function completeDonation(donateId, delayMilliseconds, successFunction, failFunction) {
	if (typeof donateId == 'undefined') {
		var donateId = '';
	}
	if (typeof delayMilliseconds == 'undefined') {
		var delayMilliseconds = 0;
	}
	if (!donateId) {
		console.error('completeDonation(): Empty id given');
		failFunction({});
	}
	if (delayMilliseconds <= 0) {
		delayMilliseconds = 1000;
	}
	console.log('>>>> completeDonation() (', typeof donateId, ')', donateId, delayMilliseconds);
	var elapsedMilliseconds = new Date().getTime() - window.mwdspace.donationStartTime.getTime();
	console.log('elapsedMilliseconds', elapsedMilliseconds);
	if (elapsedMilliseconds > requestTimeoutSeconds * 1000) {
		console.error('completeDonation(): request timeout reached, calling fail function.');
		return failFunction({});
	}

	setTimeout(function () {
		console.log('completeDonation() RUNNING');

		var targetUrl = apiConstants.baseUrl + 'donation/' + donateId;

		var donationOptions = {
			method: 'get',
			url: targetUrl,
			verbose: true,
		};

		sendXhrRequest(
			donationOptions,
			function (response) {
				console.log('response POLL', typeof response, response);
				if (response.status == 204) {
					console.log('STATUS 204 RECEIVED, DONATION STILL PROCESSING');
					return completeDonation(
						donateId,
						(delayMilliseconds *= 1.25),
						successFunction,
						failFunction
					);
				}
				if (!response.json) {
					console.error('completeDonation(): Invalid response follows:');
					console.warn(response);
					return failFunction(response);
				}

				removeSessionValue('donationId');
				removeSessionValue('donationStartTime');
				return successFunction(response);
			},
			failFunction
		);
	}, delayMilliseconds);
}

// GENERAL AJAX CALL
function sendXhrRequest(options, successFunction, failFunction) {
	if (typeof options == 'undefined') {
		var options = {};
	}

	// process options
	var requestMethod = options.method || 'post';
	var requestUrl = options.url || '';
	var sendContentType = getContentType(options.sendContentType || null);
	var acceptContentType = getContentType(options.acceptContentType || null);
	var progressCallback = typeof options.progressFunction === 'function' ? options.progressFunction : false;
	var verboseMode = options.verbose === true ? true : false;

	var sendData = options.sendData || {};
	if (sendData && typeof sendData != 'string') {
		sendData = safeJsonString(sendData);
	}

	var xhr = new XMLHttpRequest();

	xhr.addEventListener('load', requestComplete);
	xhr.addEventListener('error', requestFailed);
	xhr.addEventListener('abort', requestCanceled);
	if (progressCallback) {
		xhr.addEventListener('progress', requestProgress);
	}

	//var requestUrlArgString = options.urlArgString;
	if (verboseMode) {
		console.log('>>> sendXhrRequest() sending to', requestUrl);
	}
	xhr.open(requestMethod, requestUrl, true);
	xhr.setRequestHeader('Content-Type', sendContentType);
	xhr.setRequestHeader('Accept', acceptContentType);

	xhr.send(sendData);
	if (verboseMode) {
		console.log('>>> sendXhrRequest() sent with data', sendData);
	}

	// if (options.formData) {
	// 	var jFormData = options.formData;
	// 	console.log('jFormData entries:');
	// 	jFormData.forEach(function(item) {
	// 		console.log(item);
	// 	});
	// 	xhr.open(requestMethod, requestUrl, true);
	// 	xhr.send(jFormData);
	// } else if (options.formToSubmit) {
	// 	var jFormData = new FormData(options.formToSubmit);
	// 	if (verboseMode) {
	// 		console.log('formToSubmit -> jFormData', jFormData);
	// 	}
	// 	xhr.open(requestMethod, requestUrl, true);
	// 	xhr.send(jFormData);
	// } else if (requestMethod == 'POST') {
	// 	if (verboseMode) {
	// 		console.log(
	// 			'>>> sendXhrRequest() sending POST to',
	// 			requestUrl,
	// 			'with requestUrlArgString=',
	// 			requestUrlArgString
	// 		);
	// 	}
	// 	xhr.open(requestMethod, requestUrl, true);
	// 	xhr.send(requestUrlArgString);
	// } else {
	// 	if (requestUrlArgString) {
	// 		requestUrl += requestUrlArgString;
	// 	}

	// 	if (verboseMode) {
	// 		console.log('>>> sendXhrRequest() sending to', requestUrl);
	// 	}
	// 	xhr.open(requestMethod, requestUrl, true);
	// 	xhr.send();
	// }

	function requestComplete() {
		if (this.status >= 200 && this.status <= 299) {
			var response = {
				status: this.status,
				text: this.responseText,
				json: {},
			};
			if (this.responseText) {
				response.json = safeJsonParse(this.responseText) || {};
			}
			// blank response body is valid for status 204
			if (response.json || this.status == 204) {
				successFunction(response);
			} else {
				console.error('INVALID RESPONSE FROM SERVER. RESPONSE FOLLOWS:');
				console.log(this.responseText);
				console.warn('There may be a problem on the server.', {
					isError: true,
				});
				successFunction({});
			}
		} else {
			console.log('>>> sendXhrRequest() raw response', this.responseText);
			console.warn('The server has reported an issue.', {
				isError: true,
			});
			successFunction({});
		}
	}

	function requestFailed(event) {
		console.log('event.status', event.status);
		console.warn('sendXhrRequest(): request failed', this);
		console.log(event);
		failFunction(this);
	}

	function requestCanceled(event) {
		console.warn('sendXhrRequest(): request canceled', this);
		console.log(event);
		failFunction(this);
	}

	function requestProgress(event) {
		event.percentComplete = event.lengthComputable ? event.loaded / event.total * 100 : null;
		progressCallback(event);
	}
}

function getContentType(input) {
	input = ensureString(input).toLowerCase();

	//default to JSON
	switch (input) {
		case 'url':
		case 'urlencoded':
			return 'application/x-www-form-urlencoded';
			break;
		case 'text':
			return 'text/plain';
			break;
		default:
			return 'application/json';
	}
}