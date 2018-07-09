"use strict";
(function() {
	console.log("gift-utilities.js v18.7.9a");

	window.mwdspace = window.mwdspace || {};
	var sharedUtils = window.mwdspace.sharedUtils;

	window.mwdspace.giftUtils = window.mwdspace.giftUtils || {};
	var giftUtils = window.mwdspace.giftUtils;

	giftUtils.processGiftStringList = function(options) {
		if (typeof options == "undefined") {
			var options = {};
		}

		var giftStringList = options.giftStringList || [];

		var listAskReplacement = getUrlAskReplacement(options);
		if (listAskReplacement) {
			// use ask string from URL
			giftStringList = listAskReplacement;
			console.log("Note: Using replacement ask string.");
		} else {
			var listDynamicAsk = getUrlDynamicAsk(options);
			if (listDynamicAsk) {
				// use dynamic ask based on URL starter
				giftStringList = listDynamicAsk;
				console.log("Note: Using dynamic ask string.");
			}
		}

		var selectedAmount = getUrlAskSelectAmount();
		if (selectedAmount) {
			// pre-select the requested ask amount
			giftStringList = preselectAskByAmount(giftStringList, selectedAmount);
			console.log("Note: Pre-selecting by amount.");
		} else {
			var selectedPosition = getUrlAskSelectPosition();
			if (selectedPosition) {
				// pre-select the requested ask level position
				giftStringList = preselectAskByPosition(giftStringList, selectedPosition);
				console.log("Note: Pre-selecting by position.");
			}
		}

		giftStringList = finalizeGiftStringList(giftStringList);
		if (!giftStringList) {
			// use backup ask string
			console.warn("Note: Using backup ask string");
			giftStringList = ["25", "50*", "75", "100"];
		}

		return giftStringList;
	};

	function getUrlAskReplacement(options) {
		if (typeof options == "undefined") {
			var options = {};
		}
		var calculateAsMonthly = options.calculateAsMonthly || false;

		var urlAsk =
			sharedUtils.getUrlParameter("ask") || sharedUtils.getSessionValue("urlAsk");
		if (urlAsk) {
			sharedUtils.setSessionValue("urlAsk", urlAsk);
			var newItem, thisAmount;
			var newList = [];
			var giftStringList = urlAsk.split("|");

			if (giftStringList) {
				for (var i = 0; i < giftStringList.length; i++) {
					thisAmount = giftStringList[i];
					if (calculateAsMonthly) {
						thisAmount = convertSingleAmountToMonthly(thisAmount, options);
					}
					newItem = "" + thisAmount;
					if (hasSelectedFlag(giftStringList[i])) {
						newItem = appendSelectedFlag(newItem);
					}
					newList.push(newItem);
				}
				return newList;
			}
		}
		return null;
	}

	function getUrlDynamicAsk(options) {
		if (typeof options == "undefined") {
			var options = {};
		}
		var minimumDynamicStart = options.minimumDynamicStart || 35;
		var maximumDynamicStart = options.maximumDynamicStart || 500;
		var dynamicFormula = options.dynamicFormula || [1, 1.25, 1.5, 1.75, 2];
		var calculateAsMonthly = options.calculateAsMonthly || false;
		var basicRounding = options.basicRounding || false;

		var urlAskStart =
			sharedUtils.getUrlParameter("ask_start") ||
			sharedUtils.getSessionValue("urlAskStart");
		urlAskStart = cleanFloat(urlAskStart);

		if (
			urlAskStart &&
			urlAskStart >= minimumDynamicStart &&
			urlAskStart <= maximumDynamicStart
		) {
			sharedUtils.setSessionValue("urlAskStart", urlAskStart);
			var newList = [];
			var newItem, thisAmount;
			var formulaList = getUrlDynamicFormula();
			if (!formulaList) {
				formulaList = dynamicFormula;
			}

			if (formulaList) {
				for (var i = 0; i < formulaList.length; i++) {
					thisAmount = urlAskStart * cleanFloat(formulaList[i]);
					if (calculateAsMonthly) {
						thisAmount = convertSingleAmountToMonthly(thisAmount, options);
					}
					thisAmount = basicRounding
						? Math.round(thisAmount)
						: makeNiceEvenNumber(thisAmount);
					newItem = "" + thisAmount;
					if (hasSelectedFlag(formulaList[i])) {
						newItem = appendSelectedFlag(newItem);
					}
					newList.push(newItem);
				}

				return newList;
			}
		}

		return null;
	}

	function getUrlDynamicFormula() {
		var urlFormulaString =
			sharedUtils.getUrlParameter("ask_inc") ||
			sharedUtils.getSessionValue("urlFormulaString");
		if (urlFormulaString) {
			sharedUtils.setSessionValue("urlFormulaString", urlFormulaString);
			var formulaList = urlFormulaString.split("|");
			if (formulaList.length > 0) {
				return formulaList;
			}
		}

		return null;
	}

	/* remove any bad/duplicate values and ensure an element is pre-selected */
	function finalizeGiftStringList(listGiftString, options) {
		if (typeof listGiftString == "undefined") {
			var listGiftString = [];
		}
		if (typeof options == "undefined") {
			var options = {};
		}
		var minimumGiftAmount = options.minimumGiftAmount || 5;

		var listIsDescending = isMostlyDescending(listGiftString);

		// sort ascending for dup check
		listGiftString.sort(function(current, next) {
			return cleanFloat(current) - cleanFloat(next);
		});

		var newList = [];
		var newItem, thisAmount;
		var lastAmount = null;
		var hasPreselect = false;
		for (var i = 0; i < listGiftString.length; i++) {
			thisAmount = cleanFloat(listGiftString[i]);
			if (thisAmount >= minimumGiftAmount) {
				if (thisAmount <= lastAmount) {
					//avoid dups (jump 2 over last level )
					thisAmount = lastAmount + 2;
				}
				newItem = formatDisplayGift(thisAmount);
				if (hasSelectedFlag(listGiftString[i])) {
					if (hasPreselect) {
						// remove duplicate pre-select
						newItem = removeSelectedFlag(newItem);
					} else {
						newItem = appendSelectedFlag(newItem);
						hasPreselect = true;
					}
				}
				newList.push(newItem);
				lastAmount = thisAmount;
			}
		}
		if (listIsDescending) {
			//sort descending
			newList.sort(function(current, next) {
				return cleanFloat(next) - cleanFloat(current);
			});
		}

		if (newList.length > 0) {
			if (!hasPreselect) {
				// no gift level selected, choose something about one-third into the list
				var autoPosition = parseInt(newList.length * 0.33);
				var selectedElement = appendSelectedFlag(newList[autoPosition]);
				newList[autoPosition] = selectedElement;
			}

			return newList;
		}

		return null;
	}

	function getUrlAskSelectAmount() {
		var urlValue =
			sharedUtils.getUrlParameter("ask_selected") ||
			sharedUtils.getSessionValue("urlAskSelectAmount");
		urlValue = parseInt(urlValue);
		if (isNaN(urlValue)) {
			return null;
		}
		sharedUtils.setSessionValue("urlAskSelectAmount", urlValue);
		return urlValue;
	}

	function getUrlAskSelectPosition() {
		var urlValue =
			sharedUtils.getUrlParameter("ask_selected_level") ||
			sharedUtils.getSessionValue("urlAskSelectPosition");
		urlValue = parseInt(urlValue);
		if (isNaN(urlValue)) {
			return null;
		}
		sharedUtils.setSessionValue("urlAskSelectPosition", urlValue);
		return urlValue;
	}

	function preselectAskByAmount(listGiftGiftString, matchAmount) {
		var newList = [];
		var newElement;
		var matchFound = false;
		matchAmount = cleanFloat(matchAmount);
		//build a new list
		for (var i = 0; i < listGiftGiftString.length; i++) {
			if (cleanFloat(listGiftGiftString[i]) == matchAmount) {
				//add asterisk if not there
				newElement = appendSelectedFlag(listGiftGiftString[i]);
				matchFound = true;
			} else {
				//remove any asterisks
				newElement = removeSelectedFlag(listGiftGiftString[i]);
			}
			newList.push(newElement);
		}
		if (matchFound) {
			return newList;
		}
		// selected level invalid, return original list
		return listGiftGiftString;
	}

	function preselectAskByPosition(listGiftGiftString, selectPosition) {
		var newList = [];
		var newElement;
		var matchFound = false;
		var targetIndex = selectPosition - 1;
		//build a new list
		for (var i = 0; i < listGiftGiftString.length; i++) {
			if (i == targetIndex) {
				//add asterisk if not there
				newElement = appendSelectedFlag(listGiftGiftString[i]);
				matchFound = true;
			} else {
				//remove any asterisks
				newElement = removeSelectedFlag(listGiftGiftString[i]);
			}
			newList.push(newElement);
		}
		if (matchFound) {
			return newList;
		}
		// selected level invalid, return original list
		return listGiftGiftString;
	}

	function hasSelectedFlag(input) {
		input = "" + input;
		return input.indexOf("*") > -1;
	}

	function removeSelectedFlag(input) {
		input = "" + input;
		return input.replace(/\*/g, "");
	}

	function appendSelectedFlag(input) {
		input = "" + input;
		if (!hasSelectedFlag(input)) {
			input += "*";
		}
		return input;
	}

	/* evaluate a list to determine if it is mostly in ascending or descending order */
	function isMostlyDescending(givenList) {
		var theList = givenList.slice(0); //create true copy
		if (typeof theList == "undefined") {
			console.warn("isMostlyDescending() given an undefined list value");
			return null;
		}
		/* prep the list by ensuring numbers are not text */
		var testVal;
		for (var i = 0; i < theList.length; i++) {
			testVal = cleanFloat(theList[i]);
			if (!isNaN(testVal)) {
				theList[i] = testVal;
			}
		}

		var tallyAscending = 0;
		var tallyDescending = 0;
		/* compare list in order */
		var lastVal = theList[0];
		var thisVal;
		for (var i = 1; i < theList.length; i++) {
			thisVal = theList[i];
			if (lastVal > thisVal) {
				tallyDescending++;
			} else if (lastVal < thisVal) {
				tallyAscending++;
			}
			lastVal = thisVal;
		}
		/* compare first to last as tie-breaker */
		if (theList[0] > theList[theList.length - 1]) {
			tallyDescending++;
		} else if (theList[0] < theList[theList.length - 1]) {
			tallyAscending++;
		}
		if (tallyDescending > tallyAscending) {
			return true;
		}
		return false;
	}

	/* remove all but digits/dot before converting to float */
	function cleanFloat(input) {
		if (typeof input == "undefined") {
			var input = "";
		}
		input = "" + input;
		return parseFloat(input.replace(/[^0-9|\.]/g, ""));
	}

	/* remove all chars but digits/dot before convert to float */
	function formatDisplayGift(input) {
		input = "" + input;
		var amount = cleanFloat(input);
		amount = amount.toFixed(2);
		amount = amount.replace(/\.00$/g, "");
		return amount;
	}

	function convertSingleAmountToMonthly(singleAmount, options) {
		if (typeof options == "undefined") {
			var options = {};
		}

		var monthlyIncreaseGoal = options.monthlyIncreaseGoal || 1.25;
		var minimumGiftAmount = options.minimumGiftAmount || 5;
		var basicRounding = options.basicRounding || false;

		cleanAmount = cleanFloat(singleAmount);
		if (cleanAmount <= 0) {
			return singleAmount;
		}

		var monthlyAmount = (cleanAmount * monthlyIncreaseGoal) / 12;
		monthlyAmount = monthlyAmount < minimumGiftAmount ? minimumGiftAmount : monthlyAmount;
		monthlyAmount = basicRounding
			? Math.round(monthlyAmount)
			: makeNiceEvenNumber(monthlyAmount);

		return monthlyAmount;
	}

	function makeNiceEvenNumber(input) {
		var originalValue = parseFloat(input);
		if (!isNaN(originalValue)) {
			if (originalValue < 15) {
				return roundUpTo(originalValue, 1);
			} else if (originalValue < 150) {
				return roundUpTo(originalValue, 5);
			} else if (originalValue < 250) {
				return roundUpTo(originalValue, 10);
			} else {
				return roundUpTo(originalValue, 25);
			}
		}
		return input;
	}
})();
