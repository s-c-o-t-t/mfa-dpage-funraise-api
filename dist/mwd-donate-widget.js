console.log("mwd-donate-widget.js v18.6.15a"),window.mwdspace=window.mwdspace||{},console.log("BEFORE typeof window.mwdspace.MFA_Funraise_Widget",typeof window.mwdspace.MFA_Funraise_Widget),window.mwdspace.MFA_Funraise_Widget=function(a){var b=this;if(b.options="object"==typeof a?a:{},b.targetElement={},b.isStarted=!1,b.codeVersion="1.0.0",b.mainStylesUrl="http://services.mwdagency.com/donate-widget/1.0.0/css/mwd-donate-widget.css",b.mainHtmlUrl="http://services.mwdagency.com/donate-widget/1.0.0/mwd-donate-widget.html",console.log("window.mwdspace.MFA_Funraise_Widget",b.codeVersion),b.options.loadingText||(b.options.loadingText="One moment..."),!b.options.element)return console.warn("Invalid options - No target element:",b.options),!1;var c=document.querySelectorAll(b.options.element);return c?void(b.targetElement=c[0]):(console.warn("Specified target element not found:",b.options.element),!1)},console.log("AFTER typeof window.mwdspace.MFA_Funraise_Widget",typeof window.mwdspace.MFA_Funraise_Widget),window.mwdspace.MFA_Funraise_Widget.prototype.start=async function(){var a=this;if(a.isStarted)return void console.warn("window.mwdspace.MFA_Funraise_Widget already started");a.isStarted=!0,console.log("window.mwdspace.MFA_Funraise_Widget start()",a.options),a.targetElement.innerHTML="";var b=a.options.styleSheets||a.mainStylesUrl;a.linkExternalStylesheet(b),a.loadFile(a.mainHtmlUrl,async function(b){var c=document.createElement("div");c.id="mfaDonationWidgetContainer",c.style.opacity=0,a.targetElement.appendChild(c),c.innerHTML=b,setTimeout(function(){c.className="reveal"},1),await a.linkExternalScript("http://services.mwdagency.com/donate-widget/1.0.0/js/shared-utils.js"),a.linkExternalScript("http://services.mwdagency.com/donate-widget/1.0.0/js/business-logic-layer.js"),a.linkExternalScript("http://services.mwdagency.com/donate-widget/1.0.0/js/transaction-system-layer.js"),await a.linkExternalScript("https://code.jquery.com/jquery-3.3.1.min.js",{integrity:"sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=",crossorigin:"anonymous"}),a.linkExternalScript("http://services.mwdagency.com/donate-widget/1.0.0/js/user-interface-layer.js")})},window.mwdspace.MFA_Funraise_Widget.prototype.linkExternalStylesheet=function(a){var b=this,c=document.createElement("link");b.targetElement.appendChild(c),c.rel="stylesheet",c.type="text/css",c.addEventListener("load",function(){console.log("linkExternalStylesheet() loaded:",a)}),c.addEventListener("error",function(b){console.error("linkExternalStylesheet() ERROR EVENT",a,b)}),c.addEventListener("abort",function(b){console.warn("linkExternalStylesheet() ABORT EVENT",a,b)}),c.href=encodeURI(a)},window.mwdspace.MFA_Funraise_Widget.prototype.linkExternalScript=function(a){var b=this;return new Promise(function(c){var d=document.createElement("script");b.targetElement.appendChild(d);var e=setTimeout(function(){console.log("linkExternalScript() No result after 2s",a),c(!1)},2e3);d.addEventListener("load",function(){clearTimeout(e),console.log("linkExternalScript() LOADED",a),c(!0)}),d.addEventListener("error",function(b){clearTimeout(e),console.error("linkExternalScript() ERROR",a,b),c(!1)}),d.addEventListener("abort",function(b){clearTimeout(e),console.warn("linkExternalScript() ABORTED",a,b),c(!1)}),d.src=encodeURI(a)})},window.mwdspace.MFA_Funraise_Widget.prototype.loadFile=function(a,b){this;if("undefined"==typeof a)return console.warn("loadFile() given empty url"),null;if("string"!=typeof a)return console.warn("loadFile() given invalid url type:",typeof a,a),null;console.log("loadFile()",a);var c=encodeURI(a),d=new XMLHttpRequest;d.addEventListener("load",function(a){"function"==typeof b&&b(a.target.response)}),d.addEventListener("error",function(a){console.error("loadFile() ERROR EVENT",c,a)}),d.addEventListener("abort",function(a){console.warn("loadFile() ABORT EVENT",c,a)}),d.open("get",c,!0),d.send()};