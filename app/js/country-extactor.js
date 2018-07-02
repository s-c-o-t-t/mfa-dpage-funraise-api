tempList = [];
thisOption = "";
jQuery('select[name="country"] option').each(function() {
	thisOption = {
		name: jQuery(this).val(),
		code: jQuery(this).attr("data-code"),
	};
	tempList.push(thisOption);
});
console.log(JSON.stringify(tempList));

tempList = [];
thisOption = "";
jQuery('select[name="state"] option').each(function() {
	if (jQuery(this).val()) {
		thisOption = {
			name: jQuery(this).val(),
		};
		tempList.push(thisOption);
	}
});
console.log(JSON.stringify(tempList));
