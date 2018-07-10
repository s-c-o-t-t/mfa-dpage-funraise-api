"use strict";(function(){console.log("mwd-donate-widget.js v18.7.10d"),window.mwdspace=window.mwdspace||{};var e={card:"<i class=\"far fa-credit-card\"></i>",visa:"<i class=\"fab fa-cc-visa\"></i>",mastercard:"<i class=\"fab fa-cc-mastercard\"></i>",amex:"<i class=\"fab fa-cc-amex\"></i>",discover:"<i class=\"fab fa-cc-discover\"></i>",bitcoin:"<i class=\"fab fa-bitcoin\"></i>"};window.mwdspace.MFA_Funraise_Widget=function(e){var t=this;if(t.options="object"==typeof e?e:{},t.isStarted=!1,t.isLoaded=!1,t.codeVersion="1.0.0",t.baseWidgetUrl="https://quiz.mercyforanimals.org/donate-widget/"+t.codeVersion+"/",t.targetElement={},t.promises={},t.intervals={},t.mainStylesUrl=t.baseWidgetUrl+"css/mwd-donate-widget.css",t.mainHtmlUrl=t.baseWidgetUrl+"mwd-donate-widget.html",console.log("window.mwdspace.MFA_Funraise_Widget",t.codeVersion),t.options.loadingText||(t.options.loadingText="One moment..."),!t.options.element)return console.warn("Invalid options - No target element:",t.options),!1;"string"==typeof t.options.organizationId&&t.options.organizationId.trim()||(t.options.organizationId="fcb4d538-ca92-4212-86cc-06d8ac929c4d"),"number"==typeof t.options.formId&&"string"==typeof t.options.formId&&t.options.formId||(t.options.formId=1194),t.options.listSingleGiftAskString&&t.options.listSingleGiftAskString.length||(t.options.listSingleGiftAskString=[25,50,75,100]),t.options.listMonthlyGiftAskString&&t.options.listMonthlyGiftAskString.length||(t.options.listMonthlyGiftAskString=[5,10,15,20]),window.mwdspace.pageIdPrefix="form"+t.options.formId;var n=document.querySelectorAll(t.options.element);return n?void(t.targetElement=n[0]):(console.warn("Specified target element not found:",t.options.element),!1)},window.mwdspace.MFA_Funraise_Widget.prototype.start=async function(){var e=this;if(e.isStarted)return void console.warn("window.mwdspace.MFA_Funraise_Widget already started");e.isStarted=!0,e.targetElement.innerHTML="";var t=e.linkExternalStylesheet("https://use.fontawesome.com/releases/v5.1.0/css/all.css"),n=e.options.styleSheets||e.mainStylesUrl,a=e.linkExternalStylesheet(n);e.linkExternalStylesheet("https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css"),await Promise.all([t,a]);var i,r,o=e.loadFile(e.mainHtmlUrl),d=e.linkExternalScript(e.baseWidgetUrl+"js/shared-utils.js");if([i,r]=await Promise.all([o,d]),!i)return void console.error("MFA_Funraise_Widget.start() - unable to load base HTML");var s=document.createElement("div");s.id="mfaDonationWidgetContainer",s.style.opacity=0,e.targetElement.appendChild(s),s.innerHTML=i,setTimeout(function(){s.className="reveal"},1),e.promises.spreedlyIframeScript=e.linkExternalScript("https://core.spreedly.com/iframe/iframe-v1.min.js");var l=await e.linkExternalScript("https://code.jquery.com/jquery-3.3.1.min.js"),c=e.linkExternalScript("https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js"),p=e.linkExternalScript(e.baseWidgetUrl+"js/gift-utilities.js"),u=e.linkExternalScript(e.baseWidgetUrl+"js/transaction-system-layer.js");await Promise.all([p,u,c]),e.jquery=l?jQuery.noConflict():$||{},e.run()},window.mwdspace.MFA_Funraise_Widget.prototype.run=async function(){function t(){switch(mwdspace.currentStepName){case"giftAmount":if(i())return a("donorInfo"),!0;break;case"donorInfo":if(r())return"card"==window.mwdspace.userInputData.payMethod?(a("cardInfo"),!0):v();break;case"cardInfo":if(o())return R();}return!1}function n(){switch(mwdspace.currentStepName){case"donorInfo":a("giftAmount");break;case"cardInfo":a("donorInfo");}}function a(e){mwdspace.currentStepName="",e=window.mwdspace.sharedUtils.ensureString(e),e||(e=window.mwdspace.sharedUtils.getSessionValue("savedStepName"),!e&&(e="giftAmount")),X.find("div.loadingDisplay").hide();for(var t,n=0;n<Q.length;n++)t=Q[n].getAttribute("data-step-name"),t==e?("donorInfo"===e||"cardInfo"===e?(G("div.giftFormHeaderContainer").show(),J.fadeIn(888)):J.hide(),G(Q[n]).fadeIn(666,function(){H(X)}),mwdspace.currentStepName=t,"confirmation"==e&&window.mwdspace.sharedUtils.removeSessionValue("savedStepName")):G(Q[n]).hide()}function i(){var e=!0;if("number"!=typeof z.baseAmount||z.baseAmount<z.minimumAmount){console.warn("baseAmount is invalid",z.baseAmount),e=!1;var t="Please enter a valid gift amount";try{t=V.labelOverride.gift.error.invalidAmount}catch(e){}d("giftAmount",t,!0)}else d("giftAmount");return"string"!=typeof z.giftCurrency&&(console.warn("Currency is invalid",z.giftCurrency),e=!1),"string"!=typeof z.payMethod&&(console.warn("Pay Method is invalid",z.payMethod),e=!1),"string"!=typeof z.giftFrequency&&(console.warn("Gift frequency is invalid",z.giftFrequency),e=!1),e}function r(){console.log(">>> checkStepDonor()");var e=!0;return console.log("JQ MATCH #1",X.find("section.step[data-step-name='donorInfo'] .changeWatch").length),console.log("JQ MATCH #2",X.find("div.billingInfoContainer select[name='donorCountry']").length,X.find("div.billingInfoContainer select[name='donorCountry']").val()),X.find("section.step[data-step-name='donorInfo'] .changeWatch").each(function(){"donorCountry"!=G(this).attr("name")&&"none"!=G(this).css("display")&&G(this).trigger("change")}),z.donorCountry=X.find("div.billingInfoContainer select[name='donorCountry']").val()||null,"string"!=typeof z.donorFirstName&&(console.warn("donorFirstName is invalid",z.donorFirstName),e=!1),"string"!=typeof z.donorLastName&&(console.warn("donorLastName is invalid",z.donorLastName),e=!1),"string"!=typeof z.donorEmail&&(console.warn("donorEmail is invalid",z.donorEmail),e=!1),"undefined"!=typeof z.donorPhone&&"string"!=typeof z.donorPhone&&(console.warn("donorPhone is invalid",z.donorPhone),e=!1),"string"!=typeof z.donorStreet&&(console.warn("donorStreet is invalid",z.donorStreet),e=!1),"string"!=typeof z.donorRegion&&(console.warn("donorRegion is invalid",z.donorRegion),e=!1),"string"!=typeof z.donorPostCode&&(console.warn("donorPostCode is invalid",z.donorPostCode),e=!1),"string"!=typeof z.donorCountry&&(console.warn("donorCountry is invalid",z.donorCountry),e=!1),"on"==z.companyMatch&&("string"!=typeof z.donorMatchCompany&&(console.warn("donorMatchCompany is invalid",z.donorMatchCompany),e=!1),"string"!=typeof z.donorMatchEmail&&(console.warn("donorMatchEmail is invalid",z.donorMatchEmail),e=!1)),e}function o(){console.log(">>> checkStepCard()");var e=!0;X.find("section.step[data-step-name='cardInfo'] .changeWatch").trigger("change");var t=X.find("div.payInfoContainer div#cardNumberTarget");!0===z.hasValidCardNumber?t.removeClass("invalid"):(e=!1,t.addClass("invalid"),console.warn("hasValidCardNumber is invalid",z.hasValidCardNumber));var n=X.find("div.payInfoContainer div#cardCvvTarget");return!0===z.hasValidCardCvv?n.removeClass("invalid"):(e=!1,n.addClass("invalid"),console.warn("hasValidCardCvv is invalid",z.hasValidCardCvv)),"string"!=typeof z.payCardExpireMonth&&(console.warn("payCardExpireMonth is invalid",z.payCardExpireMonth),e=!1),"string"!=typeof z.payCardExpireYear&&(console.warn("payCardExpireYear is invalid",z.payCardExpireYear),e=!1),e}function d(e,t,n){if("undefined"==typeof e)var e="";if("undefined"==typeof t)var t="";if("undefined"==typeof n)var n=!1;e||console.log("showStepFeedback() given invalid input",e,t);var a=G("section[data-step-name=\"giftAmount\"] div.userFeedback p.message");t?(a.html(t).fadeIn(444),n?a.addClass("error"):a.removeClass("error")):a.fadeOut(222,function(){G(this).html(""),G(this).removeClass("error")})}function s(e,t){if("undefined"==typeof t)var t={};var n=!0,a=null;if(t.validationPattern=e.attr("data-validation"),t.validationPattern&&(n=l(e,t)),n){var i=e.attr("type");"checkbox"==i||"radio"==i?e.prop("checked")&&(a=t.value):a=t.value}z[t.name]=a,window.mwdspace.sharedUtils.setSessionValue(t.name,t.value)}function l(e,t){if("undefined"==typeof t)var t={};var n=!0,a="";switch("undefined"!=typeof t.value&&null!==t.value&&(a=t.value+""),t.validationPattern){case"email":n=a.match(/^[\w|\.|\-|\_]+@[\w|\.|\-|\_]+\.[a-z]{2,}$/i);break;default:var i=new RegExp(t.validationPattern,"i");n=a.match(i);}return n?(e.removeClass("invalid"),!0):(e.addClass("invalid"),!1)}function c(e){var t=G(e.target),n=S(t.val())||0;if(p({baseAmount:n}),X.find("div.giftOption input").removeClass("selected"),t.addClass("selected"),"change"==e.type&&G("div.giftFormHeaderContainer").slideDown(666,function(){H(X)}),"giftAmountFreeform"==t.attr("name")){if("change"==e.type||"blur"==e.type){var a=S(n)||0,i=a.toFixed(2);i!=n&&t.val(i),a<window.mwdspace.userInputData.minimumAmount?t.addClass("invalid"):t.removeClass("invalid")}X.find("div.giftOption input[type='radio']").prop("checked",!1)}}function p(e){if("undefined"==typeof e)var e={};try{z.baseAmount=z.baseAmount||0,z.extraPercent=z.extraPercent||0,"undefined"!=typeof e.baseAmount&&(z.baseAmount=parseFloat(e.baseAmount)||0),"undefined"!=typeof e.extraPercent&&(z.extraPercent=parseFloat(e.extraPercent)||0);var t=parseFloat(z.baseAmount+z.baseAmount*z.extraPercent/100),n=t.toFixed(2).split(".");X.find("div.amountDisplay span.displayWholeAmount").text(n[0]),X.find("div.amountDisplay span.displaySubAmount").text("."+n[1]),window.mwdspace.sharedUtils.setSessionValue("baseAmount",z.baseAmount),window.mwdspace.sharedUtils.setSessionValue("extraPercent",z.extraPercent)}catch(e){console.log("updateGiftAmount() caught error: ",e.message)}}function u(){for(var e,t=te.val(),n=" (?) ",a=0;a<window.mwdspace.validCurrencyList.length;a++)if(e=window.mwdspace.validCurrencyList[a],e.code==t&&e.symbol){n=e.symbol;break}X.find("span.currencySymbol").html(n)}function m(){for(var e,t=Z.val(),n=0;n<window.mwdspace.validPayMethodList.length;n++)if(e=window.mwdspace.validPayMethodList[n],e.code==t){z.minimumAmount=e.minimumAmount,e.frequencies&&(console.log("calling freq filter",e),g(e.frequencies));break}}function g(e){if("object"!=typeof e||1>e.length)return void console.warn("filterFrequencyButtons() ignoring invalid frequency list",e);console.log("filterFrequencyButtons()",e);var t=0,n=!1;X.find("div.giftFrequencyContainer div.fancyRadioButton input[type='radio']").each(function(){0<=e.indexOf(G(this).val())?(G(this).closest("div.fancyRadioButton").show(),t++):(G(this).prop("checked")&&(n=!0),G(this).closest("div.fancyRadioButton").hide())}),1>t?X.find("div.giftFrequencyContainer div.fancyRadioButton").show():1==t&&X.find("div.giftFrequencyContainer div.fancyRadioButton").hide()}function f(){b()}function h(e,t){if("undefined"==typeof e||!e)return void console.log("setInputFromUrl() given invalid urlKey",e);if("undefined"==typeof t||!t)return void console.log("setInputFromUrl() given invalid selector",t);var n=window.mwdspace.sharedUtils.getUrlParameter(e);if(n){console.log("-- POPULATING",t,"with",n);X.find("section.step input[name='"+t+"'], section.step select[name='"+t+"']").val(n).trigger("change")}}function y(){console.log("buildTransactionSendData() START");try{window.mwdspace.transactionSendData={};var e=window.mwdspace.transactionSendData,t=window.mwdspace.userInputData;console.log("buildTransactionSendData() userData",t),e.organizationId=V.options.organizationId||null,e.formId=V.options.formId?V.options.formId+"":"",e.formAllocationId=V.options.formAllocationId||null,e.bank_account_holder_type="personal",e.bank_account_number="",e.bank_account_type="checking",e.bank_name="",e.bank_routing_number="",e.comment="",e.payment_method_token="",e.tags=null,e.first_name=t.donorFirstName||"",e.last_name=t.donorLastName||"",e.email=t.donorEmail||"",e.phone=t.donorPhone||"",e.address=t.donorStreet||"",e.city=t.donorCity||"",e.state=t.donorRegion||"",e.postalCode=t.donorPostCode||"",e.country=t.donorCountry||"";var n=S(t.baseAmount)||0,a=parseFloat(t.giftExtraPercent)||0,i=S(n*a/100);switch(e.amount=n+i,e.baseAmount=n.toFixed(2),e.tipAmount=i.toFixed(2),e.tipPercent="3.00",t.giftFrequency){case"single":e.recurring=!1,e.frequency="o";break;case"monthly":e.recurring=!0,e.frequency="m";break;default:e.recurring=null,e.frequency="";}return e.currency=t.giftCurrency||"",e.paymentType=t.payMethod||"","card"==e.paymentType&&(e.month=t.payCardExpireMonth||"",e.year=t.payCardExpireYear||""),e.donateDouble=!0===t.isCompanyMatch,e.company=t.companyMatchName||"",e.employeeEmail=t.companyMatchEmail||"",console.log("buildTransactionSendData() sendData",e),e}catch(e){console.log("buildTransactionSendData() caught error: ",e.message)}return null}function v(){return(window.mwdspace.transactionSendData=y(),!!window.mwdspace.transactionLayer.validateSendData(window.mwdspace.transactionSendData))&&(console.log("sendTransaction() SENDING",window.mwdspace.transactionSendData),O(),window.mwdspace.transactionLayer.startDonation(window.mwdspace.transactionSendData,function(e){if(console.log("SUCCESS FUNCTION",e),"card"==e.type){var t=e.status+"";t.match(/complete/i)?B():W("The server appears to have had an error processing this card transaction, and reported status \""+t+"\".")}else"bitcoin"==e.type?q(e):(console.warn("Unrecognized type property in server response",e),W("Unrecognized response from the sever"))},function(e){console.log("FAIL FUNCTION",e),console.warn("Donation received fail response from server",e);var t=e.text||"The server was unable to process the transaction, but provided no explanation.";W(t)}),!0)}function b(){var e={};"monthly"==window.mwdspace.userInputData.frequency?V.options.listMonthlyGiftAskString&&(e.giftStringList=V.options.listMonthlyGiftAskString,!V.isMonthlyOnlyPage&&(e.calculateAsMonthly=!0)):V.options.listSingleGiftAskString&&(e.giftStringList=V.options.listSingleGiftAskString);var t=window.mwdspace.giftUtils.processGiftStringList(e);C(t)}function C(e){if("undefined"==typeof e)var e=[];try{if(!e||1>e.length)throw new Error("Invalid gift string list given");var t=X.find("div.fixedAmountContainer");if(1!==t.length)throw new Error("Unable to identify the fixed gift amount container");t.empty();for(var n,a,r,o=null,d=0;d<e.length;d++)a=e[d],r=window.mwdspace.sharedUtils.makeUniqueId("amount-"+d),!o&&(a+"").match(/\*/)&&(o=r),n=w(a,{id:r}),n?t.append(n):console.warn("Unable to add fixed gift button:",a);o?t.find("div.giftAmountContainer input#"+o).prop("checked",!0).trigger("change"):t.find("div.giftAmountContainer input[name='giftAmountFixed']").eq(1).prop("checked",!0).trigger("change")}catch(e){console.error("Unable to build the fixed gift buttons",e)}u()}function w(e,t){if("undefined"==typeof t)var t={};"object"!=typeof t&&(t={},console.warn("buildGiftStringButton(): ignoring invalid option object",t));var n=null;try{var a={amount:S(e),displayText:E(e)};if(!a.amount||!a.displayText)throw new Error("Invalid gift string amount");n=document.createElement("div"),G(n).addClass("giftOption fixed fancyRadioButton");var i=document.createElement("input");i.setAttribute("type","radio"),i.setAttribute("name","giftAmountFixed"),i.setAttribute("value",a.amount),t.id&&i.setAttribute("id",t.id),n.appendChild(i);var r=document.createElement("label");t.id&&r.setAttribute("for",t.id),n.appendChild(r);var o=document.createElement("span");G(o).addClass("currencySymbol"),r.appendChild(o);var d=document.createElement("span");G(d).addClass("displayAmount"),d.innerHTML=a.displayText||"Unknown",r.appendChild(d)}catch(t){console.error("Error building the button for fixed amount:",e,t)}return n}function S(e){if("undefined"==typeof e){console.warn("cleanCurrency() given empty input");var e=""}e=""+e;var t=parseFloat(e.replace(/[^0-9|\.]/g,""));return isNaN(t)?(console.log("cleanCurrency() defaulting invalid input to 0.00",e),0):Math.round(100*t)/100}function E(e){if("undefined"==typeof e)var e="";e=""+e;var t=S(e);return t=t.toFixed(2),t=t.replace(/\.00$/g,""),t}function A(e){var t=null;try{e.code&&(t=document.createElement("option"),t.setAttribute("value",e.code),t.innerText=e.code+" "+(e.name||""))}catch(t){console.error("Unable to build the option element for currency:",e)}return t}function x(e){var t=null;try{e.code&&(t=document.createElement("option"),t.setAttribute("value",e.code),t.setAttribute("data-label-id","gift.payMethod."+e.code),t.innerText=e.description||"Unknown")}catch(t){console.error("Unable to build the option element for method:",e)}return t}function I(e,t){if("undefined"==typeof t)var t={};"object"!=typeof t&&(t={},console.warn("buildFrequencyButton(): ignoring invalid option object",t));var n=null;try{if(e.code){n=document.createElement("div"),G(n).addClass("fancyRadioButton");var a=document.createElement("input");G(a).addClass("changeWatch"),a.setAttribute("type","radio"),a.setAttribute("name","giftFrequency"),a.setAttribute("value",e.code),t.id&&a.setAttribute("id",t.id),n.appendChild(a);var i=document.createElement("label");i.setAttribute("data-label-id","gift.frequency."+e.code),i.innerHTML=e.name||"Unknown",t.id&&i.setAttribute("for",t.id),n.appendChild(i)}}catch(t){console.error("Error building the button for frequency:",e,t)}return n}function T(){if("undefined"==typeof e)var e={};"object"!=typeof e&&(e={},console.warn("prepareRegionInput(): ignoring invalid option object",e));try{for(var t,n=X.find("select[name=\"donorCountry\"]").val(),a=0;a<window.mwdspace.validCountryList.length;a++)if(t=window.mwdspace.validCountryList[a],(n==t.code||n==t.name)&&t.regions&&k(t.regions))return}catch(e){console.error("Unable to prepare the region input method",e)}F()}function F(){K.hide(),ee.val("").show().trigger("change")}function k(e){if(ee.hide(),K.val("").show().trigger("change"),"undefined"==typeof e)return console.warn("buildRegionSelect(): no regions object",e),!1;if("object"!=typeof e||1>e.length)return console.warn("buildRegionSelect(): invalid regions object",e),!1;try{if(1!==K.length)return console.error("Unable to identify the region select dropdown"),!1;var t,n,a=0;K.empty(),t=P("State/Region...",{"data-label-id":"donor.regionPlaceholder",value:""}),K.append(t);for(var r=0;r<e.length;r++)n=e[r],t=P(n.name),t?(K.append(t),a++):console.warn("Unable to add region:",n);if(0<a)return!0}catch(e){console.error("Unable to build the region select dropdown",e)}return!1}function P(e,t){if("undefined"==typeof t)var t={};"object"!=typeof t&&(console.warn("buildRegionOption() ignoring invalid attributes object",t),t={});try{if("string"==typeof e&&e.trim()){var n=null;for(var a in n=document.createElement("option"),n.innerText=e,t)n.setAttribute(a,t[a]);return n}}catch(e){console.error("Unable to build the option element for region:",region)}return null}function L(e,t){if("undefined"==typeof t)var t={};"object"!=typeof t&&(console.warn("buildCountryOption() ignoring invalid attributes object",t),t={});var n=null;try{e.code&&(n=document.createElement("option"),n.innerText=e.name)}catch(t){console.error("Unable to build the option element for country:",e)}for(var a in t)n.setAttribute(a,t[a]);return n}function M(e,t){if("undefined"==typeof t)var t={};"object"!=typeof t&&(console.warn("buildRegionOption() ignoring invalid attributes object",t),t={});var n=null;try{if("number"!=typeof e&&"string"!=typeof e&&!e)console.error("Invalid month given:",e);else{try{var a=parseInt(e);!isNaN(a)&&0<=a&&10>a&&(e="0"+a)}catch(e){}for(var i in n=document.createElement("option"),t)n.setAttribute(i,t[i]);n.innerText=e}}catch(t){console.error("Unable to build the option element for month:",e)}return n}function U(e,t){if("undefined"==typeof t)var t={};"object"!=typeof t&&(console.warn("buildRegionOption() ignoring invalid attributes object",t),t={});var n=null;try{if("number"!=typeof e&&"string"!=typeof e&&!e)console.error("Invalid year given:",e);else{if("undefined"==typeof e);for(var a in n=document.createElement("option"),t)n.setAttribute(a,t[a]);n.innerText=e}}catch(t){console.error("Unable to build the option element for year:",e)}return n}function N(){if("object"==typeof Spreedly){var e="Card",t="cvv";try{V.labelOverride.cardInfo.cardNumberPlaceholder&&(e=V.labelOverride.cardInfo.cardNumberPlaceholder)}catch(e){}try{V.labelOverride.cardInfo.cvvPlaceholder&&(t=V.labelOverride.cardInfo.cvvPlaceholder)}catch(e){}Spreedly.setPlaceholder("number",e),Spreedly.setPlaceholder("cvv",t),Spreedly.setStyle("number","font-size:16px;color:#333;"),Spreedly.setStyle("cvv","font-size:16px;color:#333;")}}function R(){if(z.hasValidCardNumber&&z.hasValidCardCvv&&z.payCardExpireMonth&&z.donorFirstName&&z.donorLastName&&z.payCardExpireYear){if("object"==typeof Spreedly){var e={first_name:z.donorFirstName,last_name:z.donorLastName,month:z.payCardExpireMonth,year:z.payCardExpireYear};return z.donorEmail&&(e.email=z.donorEmail),z.donorPhone&&(e.phone_number=z.donorPhone),z.donorStreet&&(e.address1=z.donorStreet),z.donorCity&&(e.city=z.donorCity),z.donorRegion&&(e.state=z.donorRegion),z.donorPostCode&&(e.zip=z.donorPostCode),z.donorCountry&&(e.country=z.donorCountry),console.log(">> CALLING tokenizeCreditCard",e),Spreedly.tokenizeCreditCard(e),!0}console.error("NO SPREEDLY OBJECT")}else console.error("SPREEDLY FIELD NOT READY");return!1}function D(e){for(var t=0;t<e.length;t++);}function O(){var t="";if("bitcoin"==window.mwdspace.userInputData.payMethod)t=e.bitcoin;else if("card"==window.mwdspace.userInputData.payMethod)switch(window.mwdspace.userInputData.payCardType){case"visa":t=e.visa;break;case"mastercard":case"master":case"mc":t=e.mastercard;break;case"amex":case"american_express":case"americanexpress":t=e.amex;break;case"discover":case"disc":t=e.discover;}var n=X.find("section[data-step-name=\"processing\"]");n.find("span.processingPaySymbol").html(t),a("processing")}function q(e){if("object"!=typeof e)return console.warn("prepAndShowBitcoinStep() given invalid input",e),void W("Unable to display Bitcoin invoice screen");var t=X.find("section[data-step-name=\"bitcoinInvoice\"]");t.find("span.bitcoinStatus").html(e.invoice_status),t.find("img.scanCode").attr("src","data:image/png;charset=utf-8;base64,"+e.img_data),t.find("span.bitcoinAmount").html(e.alt_amount),t.find("span.bitcoinWalletLink").html(e.checkout_url),t.find("a.bitcoinWalletLink").attr("href",e.checkout_url),j(e.exp),V.intervals.bitcoinTimer=setInterval(function(){j(e.exp)},1e3),a("bitcoinInvoice"),V.intervals.bitcoinStatusChecker=setInterval(function(){_(e.transaction_id)},3e4)}function j(e){if("undefined"==typeof e)var e=null;var t="Unknown time";try{var n=0,a=0,i=new Date(e).getTime(),r=new Date().getTime(),o=(i-r)/1e3/60;0<o?(n=parseInt(o),a=parseInt(60*(o-n)),2>o&&ae.closest("div.bitcoinStatusDisplay").addClass("warning")):(ae.closest("div.bitcoinStatusDisplay").addClass("error"),clearInterval(V.intervals.bitcoinTimer)),10>a&&(a="0"+a),t=n.toFixed()+":"+a}catch(e){console.warn("updateBitcoinTimer() caught error",e.message)}ae.html(t)}async function _(e){if(console.log(">>> checkBitcoinPaymentStatus()"),"undefined"==typeof e){console.warn("checkBitcoinPaymentStatus() given empty url");var e=null}var t,n=X.find("div.bitcoinContainer");if("live"==window.mwdspace.sharedUtils.getUrlParameter("data")?(console.log("SENDING LIVE POLL REQUEST"),t=await new Promise(function(t){console.log(">>> checkBitcoinPaymentStatus() INSIDE PROMISE"),"string"!=typeof e&&(console.warn("checkBitcoinPaymentStatus() given invalid url type:",typeof e,e),t(null)),console.log("checkBitcoinPaymentStatus() start:",e);var n=encodeURI("https://bitpay.com/invoices/"+e),a=new XMLHttpRequest;a.addEventListener("load",function(e){var n=e.target.responseText||e.target.response||null,a=window.mwdspace.sharedUtils.safeJsonParse(n);a&&a.data||(console.log("checkBitcoinPaymentStatus(): invalid response",e),t(null)),t(a.data)}),a.addEventListener("error",function(e){console.error("checkBitcoinPaymentStatus() ERROR EVENT",n,e),t(null)}),a.addEventListener("abort",function(e){console.warn("checkBitcoinPaymentStatus() ABORT EVENT",n,e),t(null)}),a.open("get",n,!0),a.setRequestHeader("Accept","application/json"),a.send()})):t={url:"https://bitpay.com/invoice?id=G8pTXqC6wz8hAyR5EzDM2X",status:"complete",price:5,currency:"USD",orderId:"644353",invoiceTime:1530812344969,expirationTime:1530813244969,currentTime:1530812749555,guid:"99044051",id:"G8pTXqC6wz8hAyR5EzDM2X",lowFeeDetected:!1,amountPaid:0,exceptionStatus:!1,refundAddressRequestPending:!1,buyerProvidedInfo:{},paymentSubtotals:{BCH:679800,BTC:76100},paymentTotals:{BCH:679800,BTC:77700},exchangeRates:{BCH:{BTC:.11193848139253873,USD:735.55},BTC:{BCH:8.933100410560373,USD:6571.009999999999}},supportedTransactionCurrencies:{BCH:{enabled:!0},BTC:{enabled:!0}},minerFees:{BCH:{totalFee:0,satoshisPerByte:0},BTC:{totalFee:1600,satoshisPerByte:11.179}},paymentCodes:{BCH:{BIP72b:"bitcoincash:?r=https://bitpay.com/i/G8pTXqC6wz8hAyR5EzDM2X",BIP73:"https://bitpay.com/i/G8pTXqC6wz8hAyR5EzDM2X"},BTC:{BIP72b:"bitcoin:?r=https://bitpay.com/i/G8pTXqC6wz8hAyR5EzDM2X",BIP73:"https://bitpay.com/i/G8pTXqC6wz8hAyR5EzDM2X"}},btcPrice:"0.000761",token:"5uqeA84nXkFyYDAk2yW3RZUo3XpqfVaNq25v6HjNw27EtxcNoNjCetZBh8375q2rH"},!t){var a="<div class='spacingContainer error'>Warning: Unable to check the status of this invoice ("+new Date().toLocaleTimeString()+"). Will try again shortly.</div>";return void n.find("div.bitcoinFeedback").html(a)}switch(console.log("checkBitcoinPaymentStatus() RESPONSE",t),n.find("div.bitcoinStatus").html(t.status),t.status){case"paid":case"confirmed":case"complete":B(),clearInterval(V.intervals.bitcoinStatusChecker);break;case"expired":W("The Bitcoin invoice expired before payment was received."),clearInterval(V.intervals.bitcoinStatusChecker);break;case"invalid":var i=document.createElement("div");i.innerHTML="The invoice received payments, but is listed as invalid.",G(i).addClass("spacingContainer error"),n.find("div.bitcoinFeedback").append(i);}}function B(e){if("undefined"==typeof e)var e={};var t=X.find("section[data-step-name=\"confirmation\"] span.transactionSuccessMessage");console.log("jqMessage.length",t.length);var n="Thank you";try{V.labelOverride.transactionSuccess.thankYouText&&(n=V.labelOverride.transactionSuccess.thankYouText)}catch(e){}t.html(n);try{if(window.mwdspace.userInputData.donorFirstName){var i=document.createElement("strong");i.innerHTML=window.mwdspace.userInputData.donorFirstName,t.append(", "),t.append(i)}}catch(e){}t.append("!"),a("confirmation")}function W(e){if("undefined"==typeof e)var e={};var t=X.find("section[data-step-name=\"processError\"]");t.find("span.errorDescription").html(e),a("processError")}function H(e){if(V.isLoaded){e=G(e);var t=G(window).scrollTop(),n=G(window).height(),a=t,i=(e.outerHeight()-e.innerHeight())/2;i=0>=i?4:i;var r=e.offset().top+i,o=r+e.innerHeight();return e.innerHeight()>n?void G("html,body").animate({scrollTop:r,easing:"ease"},444):a>r?void G("html,body").animate({scrollTop:r,easing:"ease"},999):void(a+n<o&&G("html,body").animate({scrollTop:o-n+i,easing:"ease"},999))}}var V=this;"function"!=typeof V.jquery&&(console.error("jQuery (thisWidget.jquery) not found"),exit());var G=V.jquery;window.mwdspace.userInputData={},window.mwdspace.transactionSendData={};var z=window.mwdspace.userInputData;z.minimumAmount=5,V.defaultGiftList=[25,50,75,100];var Y=V.options.paymentTokenizerId||"ECDNSGhIR0fYQisIc1PHH7NX0pN",X=G("div.giftFormContainer"),Q=X.find("section.step"),J=X.find("button.goPreviousStep"),Z=X.find("select[name=\"payMethod\"]"),K=X.find("select[name=\"donorRegion\"]"),ee=X.find("input[name=\"donorRegion\"]"),te=X.find("select[name=\"giftCurrency\"]"),ne=X.find("div.payInfoContainer div.cardNumberFeedback"),ae=X.find("div.bitcoinContainer span.bitcoinTimeRemaining");V.promises.labelOverrideLoad=V.prepareLabelOverride(),function(e){if("undefined"==typeof e)var e={};"object"!=typeof e&&(e={},console.warn("buildCurrencySelect(): ignoring invalid option object",e));var t="string"==typeof e.default?e.default:"USD";try{if(!window.mwdspace.validCurrencyList)throw new Error("List of valid currencies not found");var n=te;if(1!==n.length)throw new Error("Unable to identify the currency select dropdown");for(var a,r,o,d=0;d<window.mwdspace.validCurrencyList.length;d++)o=!0,r=window.mwdspace.validCurrencyList[d],e.filterList&&(o=D(e.filterList,r.code)),o&&(a=A(r),a?n.append(a):console.warn("Unable to add currency:",r));n.val(t).trigger("change")}catch(e){console.error("Unable to build the currency select dropdown",e)}}(),function(){try{if(!window.mwdspace.validPayMethodList)throw new Error("List of valid payment methods not found");if(1!==Z.length)throw new Error("Unable to identify the payment method select dropdown");for(var e,t=0;t<window.mwdspace.validPayMethodList.length;t++)e=x(window.mwdspace.validPayMethodList[t]),e?Z.append(e):console.warn("Unable to add payment method:",window.mwdspace.validPayMethodList[t]);1<window.mwdspace.validPayMethodList.length?Z.show():Z.hide()}catch(e){console.error("Unable to build the payment method select dropdown",e)}}(),function(e){if("undefined"==typeof e)var e={};"object"!=typeof e&&(e={},console.warn("buildCountrySelect(): ignoring invalid option object",e));var t="string"==typeof e.default?e.default:"United States";try{if(!window.mwdspace.validCountryList)throw new Error("List of valid countries not found");var n=X.find("select[name=\"donorCountry\"]");if(n.on("change",T),1!==n.length)throw new Error("Unable to identify the country select dropdown");for(var a,r,o,d=0;d<window.mwdspace.validCountryList.length;d++)o=!0,r=window.mwdspace.validCountryList[d],e.filterList&&(o=D(e.filterList,r.code)),o&&(a=L(r),a?n.append(a):console.warn("Unable to add country:",r));n.val(t).trigger("change")}catch(e){console.error("Unable to build the country select dropdown",e)}}(),function(){try{var e=X.find("select[name=\"payCardExpireMonth\"]");if(1!==e.length)throw new Error("Unable to identify the card expire month select dropdown");var t=M("Month",{value:"","data-label-id":"cardInfo.cardExpireMonthPlaceholder"});e.append(t);for(var n=1;12>=n;n++)t=M(n),t?e.append(t):console.warn("Unable to add card expire month:",n)}catch(e){console.error("Unable to build the card expire month select dropdown",e)}}(),function(){try{var e=new Date;e.setDate(e.getDate()-7);var t=e.getFullYear(),n=X.find("select[name=\"payCardExpireYear\"]");if(1!==n.length)throw new Error("Unable to identify the card expire year select dropdown");var a=U("Year",{value:"","data-label-id":"cardInfo.cardExpireYearPlaceholder"});n.append(a);for(var i=t;i<t+20;i++)a=U(i),a?n.append(a):console.warn("Unable to add card expire year:",i)}catch(e){console.error("Unable to build the card expire year select dropdown",e)}}(),async function(){V.promises.spreedlyIframeScript&&(await V.promises.spreedlyIframeScript);var e="Search by company name";try{V.labelOverride.donor.matchCompanyPlaceholder&&(e=V.labelOverride.donor.matchCompanyPlaceholder)}catch(e){}var t=G("select[name=\"donorMatchCompany\"]");return"function"==typeof t.select2?void t.select2({minimumInputLength:3,delay:400,placeholder:e,width:"100%",ajax:{url:"https://platform.funraise.io/api/v1/ddcompanies",data:function(e){var t={q:e.term};return t},processResults:function(e){var t={results:[]};if("object"==typeof e&&e.length)for(var n=0;n<e.length;n++)e[n].name&&t.results.push({id:e[n].name,text:e[n].name});return t}}}):void console.warn("SKIPPING COMPANY MATCH SMART SELECTOR")}(),function(){G(document).on("change blur",function(e){var t=G(e.target),n=t.attr("name"),a=t.val(),i=(t.prop("tagName")+"").toLowerCase();if(t.hasClass("changeWatch")&&s(t,{name:n,value:a}),("giftAmountFixed"==n||"giftAmountFreeform"==n)&&"input"==i)c(e);else if("giftExtraPercent"==n&&"input"==i){var r=0;t.prop("checked")&&(r=t.val()),p({extraPercent:r})}else"giftCurrency"==n&&"select"==i?u():"payMethod"==n&&"select"==i?m():"giftFrequency"==n&&"input"==i&&f()}),X.find("div.giftOption input[name=\"giftAmountFreeform\"]").on("focus keyup paste",function(e){console.log("FREEFORM EVENT",e.type),c(e)}),te.trigger("change"),Z.trigger("change"),X.trigger("change"),X.find("input#inputCompanyMatch").change(function(){G(this).prop("checked")?X.find("div#collapsableCompanyMatch").slideDown(666,function(){H(X)}):X.find("div#collapsableCompanyMatch").slideUp(333,function(){H(X)})}).trigger("change")}(),function(){try{if(!window.mwdspace.validFrequencyList||1>window.mwdspace.validFrequencyList.length)throw new Error("Invalid list of frequencies given");var e=X.find("div.giftFrequencyContainer");if(1!==e.length)throw new Error("Unable to identify the frequency container");e.find("div.fancyRadioButton").remove();for(var t,n=0;n<window.mwdspace.validFrequencyList.length;n++)t=I(window.mwdspace.validFrequencyList[n],{id:window.mwdspace.sharedUtils.makeUniqueId("frequency-"+n)}),t?e.append(t):console.warn("Unable to add frequency:",window.mwdspace.validFrequencyList[n]);e.find("input[name=\"giftFrequency\"]").eq(0).prop("checked",!0).trigger("change")}catch(e){console.error("Unable to build the frequency buttons",e)}}(),function(){h("first","donorFirstName"),h("last","donorLastName"),h("email","donorEmail"),h("phone","donorPhone"),h("street","donorStreet"),h("city","donorCity"),h("postcode","donorPostCode"),h("country","donorCountry"),h("region","donorRegion"),h("currency","giftCurrency"),h("amount","giftAmountFreeform")}(),await V.promises.labelOverrideLoad,V.labelOverride&&V.processLabelOverride(V.labelOverride),a(),async function(){V.promises.spreedlyIframeScript?(await V.promises.spreedlyIframeScript,Spreedly.on("ready",function(){Spreedly.setPlaceholder("number","Card"),Spreedly.setFieldType("number","text"),Spreedly.setNumberFormat("prettyFormat"),Spreedly.setPlaceholder("cvv","cvv"),N()}),Spreedly.on("paymentMethod",function(e){window.mwdspace.transactionSendData.paymentToken=e,v()}),Spreedly.on("errors",function(e){console.log("\n\nSPREEDLY REPORTS ERRORS:");for(var t,n=0;n<e.length;n++)t=e[n],console.log(t)}),Spreedly.on("fieldEvent",function(t,n,a,i){if("input"==n&&(window.mwdspace.userInputData.hasValidCardNumber=i.validNumber||!1,window.mwdspace.userInputData.hasValidCardCvv=i.validCvv||!1,window.mwdspace.userInputData.payCardType=i.cardType||!1,"number"==t)){i.validNumber?ne.find("span.cardNumberValidity").removeClass("invalid").addClass("valid").html("<i class=\"fas fa-check-circle\"></i>"):ne.find("span.cardNumberValidity").removeClass("valid").addClass("invalid").html("<i class=\"fas fa-times\"></i>");var r;switch(i.cardType){case"visa":r=e.visa;break;case"master":r=e.mastercard;break;case"american_express":r=e.amex;break;case"discover":r=e.discover;break;default:r=e.card;}ne.find("span.cardType").html(r)}}),Spreedly.init(Y,{numberEl:"cardNumberTarget",cvvEl:"cardCvvTarget"})):console.error("Spreedly load not found - Skipping Spreedly setup")}(),setTimeout(function(){V.isLoaded=!0},999),document.addEventListener("click",function(e){var i=G(e.target).closest("button, .clickTarget");i&&(i.hasClass("processDonation")?console.log("You shoudn't be seeing this"):i.hasClass("goNextStep")?!t()&&(i.addClass("showInvalid"),setTimeout(function(){i.removeClass("showInvalid")},1500)):i.hasClass("goPreviousStep")?n():i.hasClass("errorRestart")&&(window.mwdspace.donationInProgress=!1,a("giftAmount")))})},window.mwdspace.MFA_Funraise_Widget.prototype.linkExternalStylesheet=function(e){var t=this;return new Promise(function(n){var a=document.createElement("link");t.targetElement.appendChild(a),a.rel="stylesheet",a.type="text/css";var i=setTimeout(function(){console.log("linkExternalStylesheet() No load after 5s",e),n(!1)},5e3);a.addEventListener("load",function(){clearTimeout(i),n(!0)}),a.addEventListener("error",function(t){console.error("linkExternalStylesheet() ERROR EVENT",e,t),n(!1)}),a.addEventListener("abort",function(t){console.warn("linkExternalStylesheet() ABORT EVENT",e,t),n(!1)}),a.href=encodeURI(e)})},window.mwdspace.MFA_Funraise_Widget.prototype.linkExternalScript=function(e){var t=this;return new Promise(function(n){var a=document.createElement("script");t.targetElement.appendChild(a);var i=setTimeout(function(){console.log("linkExternalScript() No load after 5s",e),n(!1)},5e3);a.addEventListener("load",function(){clearTimeout(i),n(!0)}),a.addEventListener("error",function(t){clearTimeout(i),console.error("linkExternalScript() ERROR",e,t),n(!1)}),a.addEventListener("abort",function(t){clearTimeout(i),console.warn("linkExternalScript() ABORTED",e,t),n(!1)}),a.src=encodeURI(e)})},window.mwdspace.MFA_Funraise_Widget.prototype.loadFile=function(e){this;return new Promise(function(t){"undefined"==typeof e&&(console.warn("loadFile() given empty url"),t(null)),"string"!=typeof e&&(console.warn("loadFile() given invalid url type:",typeof e,e),t(null));var n=encodeURI(e),a=new XMLHttpRequest,i=setTimeout(function(){console.log("linkExternalScript() No load after 5s",url),t(!1)},5e3);a.addEventListener("load",function(e){clearTimeout(i);var n=e.target.responseText||e.target.response||null;t(n)}),a.addEventListener("error",function(e){clearTimeout(i),console.error("loadFile() ERROR EVENT",n,e),t(null)}),a.addEventListener("abort",function(e){clearTimeout(i),console.warn("loadFile() ABORT EVENT",n,e),t(null)}),a.open("get",n,!0),a.send()})},window.mwdspace.MFA_Funraise_Widget.prototype.prepareLabelOverride=function(){var e=this;return new Promise(async t=>{if(e.options.labelOverride)switch(typeof e.options.labelOverride){case"object":e.labelOverride=e.options.labelOverride,t(!0);break;case"string":try{var n=await e.loadFile(e.options.labelOverride);if(n){var a=window.mwdspace.sharedUtils.safeJsonParse(n);a?(e.labelOverride=a,t(!0)):console.error("MFA_Funraise_Widget.prepareLabelOverride() - unable to parse text override data from file:",e.options.labelOverride)}else console.error("MFA_Funraise_Widget.prepareLabelOverride() - unable to load file for text override data:",e.options.labelOverride)}catch(e){console.log("Caught error: ",e.message)}}t(!1)})},window.mwdspace.MFA_Funraise_Widget.prototype.processLabelOverride=function(e,t){var n=this;if("object"!=typeof e||!e)return console.warn("MFA_Funraise_Widget.processLabelOverride() given invalid object",typeof e),!1;if("undefined"==typeof t)var t="";"string"!=typeof t&&(console.warn("Ignoring invalid string prefix value",t),t=""),t&&(t+=".");var a;for(var i in e)a=t+i,"string"==typeof e[i]?n.setElementText(a,e[i]):n.processLabelOverride(e[i],a)},window.mwdspace.MFA_Funraise_Widget.prototype.setElementText=function(e,t){this;if("undefined"==typeof e)var e="";if(!e)return void console.warn("setElementText() given empty labelId");var n,a="[data-label-id=\""+e+"\"]",r=document.querySelectorAll(a);if(r)for(var o=0;o<r.length;o++)n=(r[o].tagName+"").toLowerCase(),"input"===n?r[o].setAttribute("placeholder",t):"label"===n||"span"===n||"div"===n||"option"===n||"h1"===n||"h2"===n||"h3"===n||"h4"===n||"h5"===n||"h6"===n||"p"===n||"li"===n?r[o].innerHTML=t:console.warn("setElementText(): Ignoring tag",e,n);else console.warn("REPLACE labelId not found",e)}})();