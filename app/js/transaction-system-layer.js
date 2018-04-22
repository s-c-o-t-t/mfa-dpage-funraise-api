console.log('transaction-system-layer.js v18.4.19');

// https://platform.funraise.io/
var apiConstants = { baseUrl: 'localhost:8080/funraise/public/v2/' };

var donationStartTime;
var requestTimeoutSeconds = 20;

function startDonation(options, successFunction, failFunction) {
	console.log('>>>> startDonation()');
	console.log();
	if (typeof options == 'undefined') {
		var options = {};
	}

	var donationOptions = {
		method: 'post',
		url: apiConstants + 'donation',
	};

	//initial post to create donation
	sendXhrRequest(
		donationOptions,
		function(response) {
			if (!response.jsonData || !response.jsonData.id) {
				console.error('startDonation(): Invalid response, no "id". Response from', url, 'follows:');
				return failFunction(response);
			}
			var donateId = response.jsonData.id;
			donationStartTime = new Date();
			setSessionValue('donationInProgress', donateId);
			setSessionValue('donationStartTime', donationStartTime.toUTCString());
			completeDonation(donateId, 100, successFunction, failFunction);
		},
		failFunction
	);
}

//poll API for response
function completeDonation(donateId, delayMilliseconds, successFunction, failFunction) {
	console.log('>>>> completeDonation()', donateId, delayMilliseconds);
	var elapsedMilliseconds = new Date().getTime() - donationStartTime.getTime();
	console.log('elapsedMilliseconds', elapsedMilliseconds);
	if (elapsedMilliseconds > requestTimeoutSeconds * 1000) {
		console.error('completeDonation(): request timeout reached, calling fail function.');
		return failFunction({});
	}
	console.log('completeDonation() WAITING...');
	setTimeout(function() {
		console.log('completeDonation() RUNNING');

		var donationOptions = {
			method: 'get',
			url: apiConstants + 'donation/' + donateId,
		};

		sendXhrRequest(
			donationOptions,
			function(response) {
				if (response.status == 204) {
					console.log('STATUS 204 RECEIVED, DONATION STILL PROCESSING');
					return completeDonation(donateId, (delayMilliseconds *= 1.5));
				}
				if (!response.jsonData) {
					console.error(
						'completeDonation(): Invalid response, no "id". Response from',
						url,
						'follows:'
					);
					return failFunction(response);
				}

				removeSessionValue('donationInProgress');
				removeSessionValue('donationStartTime');
				successFunction(response);
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
	var verboseMode = options.verbose === true ? true : false;
	var sendContentType = getContentType(options.sendContentType || null);
	var acceptContentType = getContentType(options.acceptContentType || null);
	var progressCallback = typeof options.progressFunction === 'function' ? options.progressFunction : false;

	var xhr = new XMLHttpRequest();
	xhr.setRequestHeader('Content-Type', sendContentType);
	xhr.setRequestHeader('Accept', acceptContentType);

	xhr.addEventListener('load', requestComplete);
	xhr.addEventListener('error', requestFailed);
	xhr.addEventListener('abort', requestCanceled);
	if (progressCallback) {
		xhr.addEventListener('progress', requestProgress);
	}

	var requestUrlArgString = options.urlArgString;
	if (verboseMode) {
		console.log('>>> sendXhrRequest() sending to', requestUrl);
	}
	xhr.open(requestMethod, requestUrl, true);
	xhr.send();

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
			if (verboseMode) {
				console.log(this.responseText);
			}
			var xfrPackage = safeJsonParse(this.responseText);
			if (xfrPackage && !isEmpty(xfrPackage.messages)) {
				for (var i = 0; i < xfrPackage.messages.length; i++) {
					showUserMessage('Server says - ' + xfrPackage.messages[i]);
				}
			}
			if (xfrPackage) {
				successFunction(xfrPackage);
			} else {
				console.error('INVALID RESPONSE FROM SERVER. RESPONSE FOLLOWS:');
				console.log(this.responseText);
				showUserMessage('There appears to be a problem on the server.', {
					isError: true,
				});
				successFunction({});
			}
		} else {
			console.log('>>> sendXhrRequest() raw response', this.responseText);
			showUserMessage('The server has reported an issue.', {
				isError: true,
			});
			successFunction({});
		}
	}

	function requestFailed() {
		console.warn('sendXhrRequest(): request failed');
		failFunction(this);
	}

	function requestFailed() {
		console.warn('sendXhrRequest(): request canceled');
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
			return 'application/json; charset=utf-8';
	}
}
