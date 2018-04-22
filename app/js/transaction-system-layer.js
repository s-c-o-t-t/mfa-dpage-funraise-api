console.log('transaction-system-layer.js v18.4.19');

// https://platform.funraise.io/
var apiConstants = { baseUrl: 'http://localhost:8080/funraise/api/v2/' };

var requestTimeoutSeconds = 20;
var donationInProgress = false;
var donationStartTime;

function startDonation(options, successFunction, failFunction) {
	console.log('>>>> startDonation()');
	if (typeof options == 'undefined') {
		var options = {};
	}

	var sendData = options.data || {};

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
			function(response) {
				console.log('response INITIAL', typeof response, response);
				if (!response.json || !response.json.id) {
					console.error('startDonation(): Invalid response, no "id":');
					console.log(response);
					return failFunction(response);
				}
				var donateId = response.json.id;
				donationInProgress = true;
				donationStartTime = new Date();
				setSessionValue('donationInProgress', donateId);
				setSessionValue('donationStartTime', donationStartTime.toUTCString());
				completeDonation(donateId, 1000, successFunction, failFunction);
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
		delayMilliseconds = 500;
	}
	console.log('>>>> completeDonation() (', typeof donateId, ')', donateId, delayMilliseconds);
	var elapsedMilliseconds = new Date().getTime() - donationStartTime.getTime();
	console.log('elapsedMilliseconds', elapsedMilliseconds);
	if (elapsedMilliseconds > requestTimeoutSeconds * 1000) {
		console.error('completeDonation(): request timeout reached, calling fail function.');
		return failFunction({});
	}

	setTimeout(function() {
		console.log('completeDonation() RUNNING');

		var targetUrl = apiConstants.baseUrl + 'donation/' + donateId;

		var donationOptions = {
			method: 'get',
			url: targetUrl,
			verbose: true,
		};

		sendXhrRequest(
			donationOptions,
			function(response) {
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

				removeSessionValue('donationInProgress');
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
	var sendData = options.sendData || {};
	var verboseMode = options.verbose === true ? true : false;
	var sendContentType = getContentType(options.sendContentType || null);
	var acceptContentType = getContentType(options.acceptContentType || null);
	var progressCallback = typeof options.progressFunction === 'function' ? options.progressFunction : false;

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
	//xhr.setRequestHeader('Accept-Charset', 'utf-8');
	xhr.send();
	if (verboseMode) {
		console.log('>>> sendXhrRequest() sent');
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
				console.warn('There appears to be a problem on the server.', {
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
