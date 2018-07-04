"use strict";(function(){console.log("mwd-donate-widget.js v18.7.4"),window.mwdspace=window.mwdspace||{},window.mwdspace.MFA_Funraise_Widget=function(a){var b=this;if(b.options="object"==typeof a?a:{},b.isStarted=!1,b.codeVersion="1.0.0",b.targetElement={},b.promises={},b.mainStylesUrl=window.location.protocol+"//services.mwdagency.com/donate-widget/1.0.0/css/mwd-donate-widget.css",b.mainHtmlUrl=window.location.protocol+"//services.mwdagency.com/donate-widget/1.0.0/mwd-donate-widget.html",console.log("window.mwdspace.MFA_Funraise_Widget",b.codeVersion),b.options.loadingText||(b.options.loadingText="One moment..."),!b.options.element)return console.warn("Invalid options - No target element:",b.options),!1;"string"==typeof b.options.organizationId&&b.options.organizationId.trim()||(b.options.organizationId="fcb4d538-ca92-4212-86cc-06d8ac929c4d"),(!b.options.formId||isNaN(b.options.formId))&&(b.options.organizationId=4394);var c=document.querySelectorAll(b.options.element);return c?void(b.targetElement=c[0]):(console.warn("Specified target element not found:",b.options.element),!1)},window.mwdspace.MFA_Funraise_Widget.prototype.start=async function(){var a=this;if(a.isStarted)return void console.warn("window.mwdspace.MFA_Funraise_Widget already started");a.isStarted=!0,console.log("window.mwdspace.MFA_Funraise_Widget start()",a.options),a.targetElement.innerHTML="";var b=a.linkExternalStylesheet("https://use.fontawesome.com/releases/v5.1.0/css/all.css"),c=a.options.styleSheets||a.mainStylesUrl,d=a.linkExternalStylesheet(c);a.linkExternalStylesheet("https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css"),await Promise.all([b,d]);var e,f,g=a.loadFile(a.mainHtmlUrl),h=a.linkExternalScript(window.location.protocol+"//services.mwdagency.com/donate-widget/1.0.0/js/shared-utils.js");if([e,f]=await Promise.all([g,h]),!e)return void console.error("MFA_Funraise_Widget.start() - unable to load base HTML");var i=document.createElement("div");i.id="mfaDonationWidgetContainer",i.style.opacity=0,a.targetElement.appendChild(i),i.innerHTML=e,setTimeout(function(){i.className="reveal"},1),a.promises.spreedlyIframeScript=a.linkExternalScript("https://core.spreedly.com/iframe/iframe-v1.min.js");var j=await a.linkExternalScript("https://code.jquery.com/jquery-3.3.1.min.js"),k=a.linkExternalScript("https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js"),l=a.linkExternalScript(window.location.protocol+"//services.mwdagency.com/donate-widget/1.0.0/js/business-logic-layer.js"),m=a.linkExternalScript(window.location.protocol+"//services.mwdagency.com/donate-widget/1.0.0/js/transaction-system-layer.js");await Promise.all([l,m,k]),a.jquery=j?jQuery.noConflict():$||{},a.run()},window.mwdspace.MFA_Funraise_Widget.prototype.run=async function(){function a(){switch(mwdspace.currentStepName){case"giftAmount":if(d())return c("donorInfo"),!0;break;case"donorInfo":if(e())return c("payment"),!0;break;case"payment":if(f())return alert("Would process donation"),!0;}return!1}function b(){switch(mwdspace.currentStepName){case"donorInfo":c("giftAmount");break;case"payment":c("donorInfo");}}function c(a){mwdspace.currentStepName="",a=window.mwdspace.sharedUtils.ensureString(a),a||(a=window.mwdspace.sharedUtils.getSessionValue("savedStepName"),!a&&(a="giftAmount")),C.find("div.loadingDisplay").hide();for(var b,c=0;c<D.length;c++)b=D[c].getAttribute("data-step-name"),b==a?(0==c?E.hide():(z("div.giftFormHeaderContainer").show(),E.fadeIn(888)),z(D[c]).fadeIn(666,function(){x(C)}),mwdspace.currentStepName=b,window.mwdspace.sharedUtils.setSessionValue("savedStepName",b)):z(D[c]).hide()}function d(){var a=!0;return("number"!=typeof A.amount||A.amount<A.minimumAmount||1>A.amount)&&(a=!1),"string"!=typeof A.currency&&(a=!1),"string"!=typeof A.payMethod&&(a=!1),"string"!=typeof A.frequency&&(a=!1),a}function e(){return!0}function f(){return!1}function g(a){if("undefined"==typeof a)var a=0;A.amount=0;try{a=parseFloat(a),A.amount=a||0;var b=A.amount.toFixed(2).split(".");C.find("div.amountDisplay span.displayWholeAmount").text(b[0]),C.find("div.amountDisplay span.displaySubAmount").text("."+b[1])}catch(a){console.log("updateGiftAmount() caught error: ",a.message)}}function h(){delete A.currency;for(var a,b=J.val(),c="???",d=0;d<window.mwdspace.validCurrencyList.length;d++)if(a=window.mwdspace.validCurrencyList[d],a.code==b&&a.symbol){c=a.symbol,A.currency=b;break}C.find("span.currencySymbol").html(c)}function i(){delete A.payMethod;for(var a,b=F.val(),c=0;c<window.mwdspace.validPayMethodList.length;c++)if(a=window.mwdspace.validPayMethodList[c],a.code==b){A.payMethod=a.code,A.minimumAmount=a.minimumAmount;break}}function j(){delete A.frequency;for(var a,b=C.find("div.giftFrequencyContainer input[type='radio']:checked").val(),c=0;c<window.mwdspace.validFrequencyList.length;c++)if(a=window.mwdspace.validFrequencyList[c],a.code==b){A.frequency=a.code;break}}function k(){var a=window.mwdspace.userInputData,b={};try{if(b.organizationId=y.options.organizationId,b.formId=y.options.formId,b.paymentType=a.payMethod||"TEST VALUE",b.currency=a.currency||"TEST VALUE",b.paymentType=a.frequency||"TEST VALUE","card"==a.payMethod&&(b.cardType=a.cardType||"TEST VALUE",b.lastFour=a.cardLastFour||"TEST VALUE",b.month=a.cardExpireMonth||"TEST VALUE",b.year=a.cardExpireYear||"TEST VALUE"),"number"==typeof a.amount){var c=a.amount;"number"==typeof a.addPercentage&&(c+=a.addPercentage*a.amount),b.amount=c,b.baseAmount=a.amount}return b.firstName=a.firstName||"TEST VALUE",b.lastName=a.lastName||"TEST VALUE",b.address=a.street||"TEST VALUE",b.state=a.region||"TEST VALUE",b.postalCode=a.xxx||"TEST VALUE",b.country=a.xxx||"TEST VALUE",b.email=a.xxx||"TEST VALUE",b.phone=a.xxx||"TEST VALUE",!0===a.isCompanyMatch&&(b.donateDouble=!0,b.company=a.companyMatchName||"TEST VALUE",b.employeeEmail=a.companyMatchEmail||"TEST VALUE"),b.sourceUrl=a.xxx||"TEST VALUE",b.referrer=a.xxx||"TEST VALUE",b.pageId=a.xxx||"TEST VALUE",b}catch(a){console.log("buildTransactionSendData() caught error: ",a.message)}return null}function l(a){var b=null;try{a.code&&(b=document.createElement("option"),b.setAttribute("value",a.code),b.innerText=a.code+" "+(a.name||""))}catch(b){console.error("Unable to build the option element for currency:",a)}return b}function m(a){var b=null;try{a.code&&(b=document.createElement("option"),b.setAttribute("value",a.code),b.setAttribute("data-label-id","gift.payMethod."+a.code),b.innerText=a.description||"Unknown")}catch(b){console.error("Unable to build the option element for method:",a)}return b}function n(a,b){if("undefined"==typeof b)var b={};"object"!=typeof b&&(b={},console.warn("prepareRegionInput(): ignoring invalid option object",b));var c=null;try{if(a.code){c=document.createElement("div"),z(c).addClass("fancyRadioButton");var d=document.createElement("input");d.setAttribute("type","radio"),d.setAttribute("name","giftFrequency"),d.setAttribute("value",a.code),b.id&&d.setAttribute("id",b.id),c.appendChild(d);var e=document.createElement("label");z(e).addClass("giftOption"),e.setAttribute("data-label-id","gift.frequency."+a.code),e.innerHtml=a.name||"Unknown",b.id&&e.setAttribute("for",b.id),c.appendChild(e)}}catch(b){console.error("Error building the button for frequency:",a,b)}return c}function o(){if("undefined"==typeof a)var a={};"object"!=typeof a&&(a={},console.warn("prepareRegionInput(): ignoring invalid option object",a));try{for(var b,c=C.find("select[name=\"donorCountry\"]").val(),d=0;d<window.mwdspace.validCountryList.length;d++)if(b=window.mwdspace.validCountryList[d],(c==b.code||c==b.name)&&b.regions&&q(b.regions))return!0}catch(a){console.error("Unable to prepare the region input method",a)}p()}function p(){H.val("").show(),G.hide()}function q(a){if(H.hide(),G.show(),"undefined"==typeof a)return console.warn("buildRegionSelect(): no regions object",a),!1;if("object"!=typeof a||1>a.length)return console.warn("buildRegionSelect(): invalid regions object",a),!1;try{if(1!==G.length)return console.error("Unable to identify the region select dropdown"),!1;var b,c,d=0;G.empty(),b=r("State/Region...",{"data-label-id":"donor.regionPlaceholder"}),G.append(b);for(var e=0;e<a.length;e++)c=a[e],b=r(c.name),b?(G.append(b),d++):console.warn("Unable to add region:",c);if(0<d)return!0}catch(a){console.error("Unable to build the region select dropdown",a)}return!1}function r(a,b){if("undefined"==typeof b)var b={};"object"!=typeof b&&(console.warn("buildRegionOption() ignoring invalid attributes object",b),b={});try{if("string"==typeof a&&a.trim()){var c=null;for(var d in c=document.createElement("option"),c.innerText=a,b)c.setAttribute(d,b[d]);return c}}catch(a){console.error("Unable to build the option element for region:",region)}return null}function s(a){var b=null;try{a.code&&(b=document.createElement("option"),b.setAttribute("value",a.code),b.innerText=a.name)}catch(b){console.error("Unable to build the option element for country:",a)}return b}function t(a,b){if("undefined"==typeof b)var b={};"object"!=typeof b&&(console.warn("buildRegionOption() ignoring invalid attributes object",b),b={});var c=null;try{if("number"!=typeof a&&"string"!=typeof a&&!a)console.error("Invalid month given:",a);else{if("undefined"==typeof d)var d=a;try{a=window.mwdspace.sharedUtils.ensureString(a),a=a.padStart(2,"0")}catch(a){}for(var e in c=document.createElement("option"),b)c.setAttribute(e,b[e]);c.innerText=a}}catch(b){console.error("Unable to build the option element for month:",a)}return c}function u(a,b){if("undefined"==typeof b)var b={};"object"!=typeof b&&(console.warn("buildRegionOption() ignoring invalid attributes object",b),b={});var c=null;try{if("number"!=typeof a&&"string"!=typeof a&&!a)console.error("Invalid year given:",a);else{if("undefined"==typeof a);for(var d in c=document.createElement("option"),b)c.setAttribute(d,b[d]);c.innerText=a}}catch(b){console.error("Unable to build the option element for year:",a)}return c}function v(){if("object"==typeof Spreedly){var a="Card",b="cvv";try{y.labelOverride.payment.cardNumberPlaceholder&&(a=y.labelOverride.payment.cardNumberPlaceholder)}catch(a){}try{y.labelOverride.payment.cvvPlaceholder&&(b=y.labelOverride.payment.cvvPlaceholder)}catch(a){}Spreedly.setPlaceholder("number",a),Spreedly.setPlaceholder("cvv",b)}}function w(a){for(var b=0;b<a.length;b++);}function x(a){a=z(a);var b=z(window).scrollTop(),c=z(window).height(),d=b,e=(a.outerHeight()-a.innerHeight())/2;e=0>=e?4:e;var f=a.offset().top+e,g=f+a.innerHeight();return a.innerHeight()>c?void z("html,body").animate({scrollTop:f,easing:"ease"},999):d>f?void z("html,body").animate({scrollTop:f,easing:"ease"},999):void(d+c<g&&z("html,body").animate({scrollTop:g-c+e,easing:"ease"},999))}var y=this;"function"!=typeof y.jquery&&(console.error("jQuery (thisWidget.jquery) not found"),exit());var z=y.jquery;console.log("MFA_Funraise_Widget using jQuery version",z.fn.jquery),window.mwdspace.userInputData={};var A=window.mwdspace.userInputData;y.defaultGiftList=[25,50,75,100];var B=y.options.paymentTokenizerId||"ODBm2idmYFT3pBge5qxRBjQaWH9",C=z("div.giftFormContainer"),D=C.find("section.step"),E=C.find("button.goPreviousStep"),F=C.find("select[name=\"payMethod\"]"),G=C.find("select[name=\"donorRegion\"]"),H=C.find("input[name=\"donorRegion\"]"),I=C.find("div.giftOption input"),J=C.find("select[name=\"giftCurrency\"]");y.promises.labelOverrideLoad=y.prepareLabelOverride(),function(a){if("undefined"==typeof a)var a={};"object"!=typeof a&&(a={},console.warn("buildCurrencySelect(): ignoring invalid option object",a));var b="string"==typeof a.default?a.default:"USD";try{if(!window.mwdspace.validCurrencyList)throw new Error("List of valid currencies not found");var c=J;if(1!==c.length)throw new Error("Unable to identify the currency select dropdown");for(var d,e,f,g=0;g<window.mwdspace.validCurrencyList.length;g++)f=!0,e=window.mwdspace.validCurrencyList[g],a.filterList&&(f=w(a.filterList,e.code)),f&&(d=l(e),d?c.append(d):console.warn("Unable to add currency:",e));c.val(b).trigger("change")}catch(a){console.error("Unable to build the currency select dropdown",a)}}(),function(){try{if(!window.mwdspace.validPayMethodList)throw new Error("List of valid payment methods not found");if(1!==F.length)throw new Error("Unable to identify the payment method select dropdown");for(var a,b=0;b<window.mwdspace.validPayMethodList.length;b++)a=m(window.mwdspace.validPayMethodList[b]),a?F.append(a):console.warn("Unable to add payment method:",window.mwdspace.validPayMethodList[b]);1<window.mwdspace.validPayMethodList.length?F.show():F.hide()}catch(a){console.error("Unable to build the payment method select dropdown",a)}}(),function(){try{if(!window.mwdspace.validFrequencyList||1>window.mwdspace.validFrequencyList.length)throw new Error("Invalid list of frequencies given");var a=C.find("div.giftFrequencyContainer");if(1!==a.length)throw new Error("Unable to identify the frequency select dropdown");a.find("div.fancyRadioButton").remove();for(var b,c=0;c<window.mwdspace.validFrequencyList.length;c++)b=n(window.mwdspace.validFrequencyList[c],{id:"giftFrequencyButton"+c}),b?a.append(b):console.warn("Unable to add frequency:",window.mwdspace.validFrequencyList[c])}catch(a){console.error("Unable to build the frequency buttons",a)}}(),function(a){if("undefined"==typeof a)var a={};"object"!=typeof a&&(a={},console.warn("buildCountrySelect(): ignoring invalid option object",a));var b="string"==typeof a.default?a.default:"US";try{if(!window.mwdspace.validCountryList)throw new Error("List of valid countries not found");var c=C.find("select[name=\"donorCountry\"]");if(c.on("change",o),1!==c.length)throw new Error("Unable to identify the country select dropdown");for(var d,e,f,g=0;g<window.mwdspace.validCountryList.length;g++)f=!0,e=window.mwdspace.validCountryList[g],a.filterList&&(f=w(a.filterList,e.code)),f&&(d=s(e),d?c.append(d):console.warn("Unable to add country:",e));c.val(b).trigger("change")}catch(a){console.error("Unable to build the country select dropdown",a)}}(),function(){try{var a=C.find("select[name=\"payCardExpireMonth\"]");if(1!==a.length)throw new Error("Unable to identify the card expire month select dropdown");var b=t("Month",{value:"","data-label-id":"payment.cardExpireMonthPlaceholder"});a.append(b);for(var c=1;12>=c;c++)b=t(c),b?a.append(b):console.warn("Unable to add card expire month:",c)}catch(a){console.error("Unable to build the card expire month select dropdown",a)}}(),function(){try{var a=new Date;a.setDate(a.getDate()-7);var b=a.getFullYear(),c=C.find("select[name=\"payCardExpireYear\"]");if(1!==c.length)throw new Error("Unable to identify the card expire year select dropdown");var d=u("Year",{value:"","data-label-id":"payment.cardExpireYearPlaceholder"});c.append(d);for(var e=b;e<b+15;e++)d=u(e),d?c.append(d):console.warn("Unable to add card expire year:",e)}catch(a){console.error("Unable to build the card expire year select dropdown",a)}}(),async function(){y.promises.spreedlyIframeScript&&(await y.promises.spreedlyIframeScript);var a="Enter your company name";try{y.labelOverride.donor.matchCompanyPlaceholder&&(a=y.labelOverride.donor.matchCompanyPlaceholder)}catch(a){}z("select[name=\"donorMatchCompany\"]").select2({minimumInputLength:3,delay:400,placeholder:a,width:"100%",ajax:{url:"https://platform.funraise.io/api/v1/ddcompanies",data:function(a){var b={q:a.term};return b},processResults:function(a){var b={results:[]};if("object"==typeof a&&a.length)for(var c=0;c<a.length;c++)a[c].name&&b.results.push({id:c,text:a[c].name});return b}}})}(),await y.promises.labelOverrideLoad,y.labelOverride&&y.processLabelOverride(y.labelOverride),c(),function(){I.on("change focus keyup",function(a){I.removeClass("selected"),z(this).addClass("selected");var b=parseFloat(z(this).val())||0;g(b),"change"==a.type&&z("div.giftFormHeaderContainer").slideDown(666,function(){x(C)})}),C.find("div.giftAmountContainer input[type='radio']").eq(1).prop("checked",!0).trigger("change"),J.on("change",function(){h()}).trigger("change"),F.on("change",function(){i()}).trigger("change"),C.find("div.giftFrequencyContainer input[type='radio']").on("change",function(){j()}).trigger("change"),C.find("div.giftFrequencyContainer input[type='radio']").eq(0).prop("checked",!0).trigger("change"),C.find("input#inputCompanyMatch").change(function(){A.isCompanyMatch=z(this).prop("checked"),A.isCompanyMatch?C.find("div#collapsableCompanyMatch").slideDown(666,function(){x(C)}):C.find("div#collapsableCompanyMatch").slideUp(333,function(){x(C)})}).trigger("change")}(),async function(){y.promises.spreedlyIframeScript?(await y.promises.spreedlyIframeScript,Spreedly.on("ready",function(){console.log("\n\nSPREEDLY READY",Spreedly),Spreedly.setPlaceholder("number","Card"),Spreedly.setFieldType("number","text"),Spreedly.setNumberFormat("prettyFormat"),Spreedly.setPlaceholder("cvv","CVV"),v(),Spreedly.setValue("number","4111111111111111"),Spreedly.setValue("cvv","123")}),Spreedly.on("paymentMethod",function(a,b){console.log("\n\nSPREEDLY PAYMENT TOKENIZED",a,b),window.mwdspace.transactionSendData.paymentToken=a;var c=C.find("button.processDonation");window.mwdspace.transactionLayer.startDonation(window.mwdspace.transactionSendData,function(a){console.log("SUCCESS FUNCTION",a);var b=c.attr("data-success");c.removeClass("blocked").html(b)},function(a){console.log("FAIL FUNCTION",a);var b=c.attr("data-error");c.removeClass("blocked").addClass("error").html(b)})}),Spreedly.on("errors",function(a){console.log("\n\nSPREEDLY REPORTS ERRORS:");for(var b,c=0;c<a.length;c++)b=a[c],console.log(b)}),Spreedly.init(B,{numberEl:"cardNumberTarget",cvvEl:"cardCvvTarget"})):console.error("Spreedly load not found - Skipping Spreedly setup")}(),document.addEventListener("click",function(c){var d=z(c.target).closest("button, clickTarget");if(d)if(d.hasClass("processDonation")){if(window.mwdspace.donationInProgress)return alert("There's already a donation processing."),!1;var e=c.target.getAttribute("data-working");if(e&&z(c.target).addClass("blocked").html(e),window.mwdspace.transactionSendData=k(),!window.mwdspace.transactionLayer.validateSendData(window.mwdspace.transactionSendData))window.mwdspace.donationInProgress=!1,d.addClass("showInvalid"),setTimeout(function(){d.removeClass("showInvalid")},1500);else if("object"==typeof Spreedly){var f={first_name:window.mwdspace.transactionSendData.firstName||"Test",last_name:window.mwdspace.transactionSendData.lastName||"Tester",month:window.mwdspace.transactionSendData.cardExpireMonth||"12",year:window.mwdspace.transactionSendData.cardExpireMonth||"2025",email:window.mwdspace.transactionSendData.email||"",zip:window.mwdspace.transactionSendData.postCode||""};console.log("tokenOptions",f),Spreedly.tokenizeCreditCard(f)}}else d.hasClass("goNextStep")?a()||(d.addClass("showInvalid"),setTimeout(function(){d.removeClass("showInvalid")},1500)):d.hasClass("goPreviousStep")&&b()})},window.mwdspace.MFA_Funraise_Widget.prototype.linkExternalStylesheet=function(a){var b=this;return new Promise(function(c){var d=document.createElement("link");b.targetElement.appendChild(d),d.rel="stylesheet",d.type="text/css";var e=setTimeout(function(){console.log("linkExternalStylesheet() No load after 2s",a),c(!1)},2e3);d.addEventListener("load",function(){clearTimeout(e),c(!0)}),d.addEventListener("error",function(b){console.error("linkExternalStylesheet() ERROR EVENT",a,b),c(!1)}),d.addEventListener("abort",function(b){console.warn("linkExternalStylesheet() ABORT EVENT",a,b),c(!1)}),d.href=encodeURI(a)})},window.mwdspace.MFA_Funraise_Widget.prototype.linkExternalScript=function(a){var b=this;return new Promise(function(c){var d=document.createElement("script");b.targetElement.appendChild(d);var e=setTimeout(function(){console.log("linkExternalScript() No load after 2s",a),c(!1)},2e3);d.addEventListener("load",function(){clearTimeout(e),c(!0)}),d.addEventListener("error",function(b){clearTimeout(e),console.error("linkExternalScript() ERROR",a,b),c(!1)}),d.addEventListener("abort",function(b){clearTimeout(e),console.warn("linkExternalScript() ABORTED",a,b),c(!1)}),d.src=encodeURI(a)})},window.mwdspace.MFA_Funraise_Widget.prototype.loadFile=function(a){this;return new Promise(function(b){"undefined"==typeof a&&(console.warn("loadFile() given empty url"),b(null)),"string"!=typeof a&&(console.warn("loadFile() given invalid url type:",typeof a,a),b(null));var c=encodeURI(a),d=new XMLHttpRequest,e=setTimeout(function(){console.log("linkExternalScript() No load after 3s",url),b(!1)},3e3);d.addEventListener("load",function(a){clearTimeout(e);var c=a.target.responseText||a.target.response||null;b(c)}),d.addEventListener("error",function(a){clearTimeout(e),console.error("loadFile() ERROR EVENT",c,a),b(null)}),d.addEventListener("abort",function(a){clearTimeout(e),console.warn("loadFile() ABORT EVENT",c,a),b(null)}),d.open("get",c,!0),d.send()})},window.mwdspace.MFA_Funraise_Widget.prototype.prepareLabelOverride=function(){var a=this;return new Promise(async b=>{if(a.options.labelOverride)switch(typeof a.options.labelOverride){case"object":a.labelOverride=a.options.labelOverride,b(!0);break;case"string":try{var c=await a.loadFile(a.options.labelOverride);if(c){var d=window.mwdspace.sharedUtils.safeJsonParse(c);d?(a.labelOverride=d,b(!0)):console.error("MFA_Funraise_Widget.prepareLabelOverride() - unable to parse text override data from file:",a.options.labelOverride)}else console.error("MFA_Funraise_Widget.prepareLabelOverride() - unable to load file for text override data:",a.options.labelOverride)}catch(a){console.log("Caught error: ",a.message)}}b(!1)})},window.mwdspace.MFA_Funraise_Widget.prototype.processLabelOverride=function(a,b){var c=this;if("object"!=typeof a||!a)return console.warn("MFA_Funraise_Widget.processLabelOverride() given invalid object",typeof a),!1;if("undefined"==typeof b)var b="";"string"!=typeof b&&(console.warn("Ignoring invalid string prefix value",b),b=""),b&&(b+=".");var d;for(var e in a)d=b+e,"string"==typeof a[e]?c.setElementText(d,a[e]):c.processLabelOverride(a[e],d)},window.mwdspace.MFA_Funraise_Widget.prototype.setElementText=function(a,b){this;if("undefined"==typeof a)var a="";if(!a)return void console.warn("setElementText() given empty labelId");var c,d="[data-label-id=\""+a+"\"]",e=document.querySelectorAll(d);if(e)for(var f=0;f<e.length;f++)c=(e[f].tagName+"").toLowerCase(),"input"===c?e[f].setAttribute("placeholder",b):"label"===c||"span"===c||"div"===c||"option"===c||"h1"===c||"h2"===c||"h3"===c||"h4"===c||"h5"===c||"h6"===c||"p"===c||"li"===c?e[f].innerHTML=b:console.warn("setElementText(): Ignoring tag",a,c);else console.error("REPLACE labelId not found",a)}})();