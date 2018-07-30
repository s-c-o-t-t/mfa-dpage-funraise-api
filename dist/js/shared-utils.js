"use strict";(function(){window.console&&console.log("shared-utils.js v18.7.17"),window.mwdspace=window.mwdspace||{},window.mwdspace.sharedUtils=window.mwdspace.sharedUtils||{};var a=window.mwdspace.sharedUtils;a.safeJsonParse=function(a){try{return JSON.parse(a)}catch(b){window.console&&console.warn("safeJsonParse(): Caught error: "+b.message),window.console&&console.warn("safeJsonParse() INPUT:",a)}return null},a.safeJsonString=function(a){var b=null;try{b=JSON.stringify(a)}catch(b){window.console&&console.error("safeJsonString(): Caught error: "+b.message),window.console&&console.log("safeJsonString() INPUT:",a)}return b},a.stringEquals=function(b,c){return a.ensureString(b)==a.ensureString(c)},a.stringEqualsIgnore=function(b,c){return a.ensureString(b).toLowerCase()==a.ensureString(c).toLowerCase()},a.ensureString=function(a){if("undefined"!=typeof a&&null!==a)try{return a+""}catch(a){window.console&&console.warn("ensureString() caught error:",a)}return""},a.isEmpty=function(a){return!("undefined"!=typeof a)||!a||!("string"!=typeof a||""!=a.trim())||!!("object"==typeof a&&"undefined"!=typeof a.length&&1>a.length)||!("object"!=typeof a||0!==Object.keys(a).length||a.constructor!==Object)},a.setSessionValue=function(b,c){if("undefined"==typeof c)var c="";try{var d=a.getPageId()+"_"+b;sessionStorage.setItem(d,c)}catch(b){window.console&&console.warn("setSessionValue(): Unable to use session storage."),a.createCookie(name,c,0)}},a.getSessionValue=function(b){var c=null;try{var d=a.getPageId()+"_"+b;c=sessionStorage.getItem(d)}catch(a){window.console&&console.warn("getSessionValue(): Unable to use session storage."),c=readCookie(name)}return c},a.removeSessionValue=function(b){try{var c=a.getPageId()+"_"+b;return sessionStorage.removeItem(c),!0}catch(b){window.console&&console.warn("removeLocalValue(): Unable to use session storage."),a.createCookie(name,"",-1)}return!1},a.setLocalValue=function(b,c,d){if("undefined"==typeof c)var c="";if("undefined"==typeof d)var d={};try{var e=a.makeKeyPrefix(d.prefix,b);localStorage.setItem(e,c)}catch(b){window.console&&console.warn("setLocalValue(): Unable to use local storage."),a.createCookie(name,c,365)}},a.getLocalValue=function(b,c){if("undefined"==typeof c)var c={};var d=null;try{var e=a.makeKeyPrefix(c.prefix,b);d=localStorage.getItem(e)}catch(b){window.console&&console.warn("getLocalValue(): Unable to use local storage."),d=a.readCookie(name)}return d},a.removeLocalValue=function(b,c){if("undefined"==typeof c)var c={};try{var d=a.makeKeyPrefix(c.prefix,b);return localStorage.removeItem(d),!0}catch(b){window.console&&console.warn("removeLocalValue(): Unable to use local storage."),a.createCookie(name,"",-1)}return!1},a.getPageId=function(){if("string"!=typeof window.mwdspace.pageId){var a=(window.location.pathname+"").replace(/\W/g,"_"),b=window.mwdspace.pageIdPrefix||"page";window.mwdspace.pageId=b+"_"+a}return window.mwdspace.pageId},a.makeKeyPrefix=function(b,c){if("undefined"==typeof b)var b=!0;return!1===b?c:"string"==typeof b?b.trim()+"_"+c:a.getPageId()+"_"+c},a.createCookie=function(a,b,c){var d="";if(c){var e=new Date;e.setTime(e.getTime()+1e3*(60*(60*(24*c)))),d="; expires="+e.toGMTString()}document.cookie=a+"="+b+d+"; path=/"},a.readCookie=function(a){for(var b,d=a+"=",e=document.cookie.split(";"),f=0;f<e.length;f++){for(b=e[f];" "==b.charAt(0);)b=b.substring(1,b.length);if(0==b.indexOf(d))return b.substring(d.length,b.length)}return!1},a.getUrlParameter=function(b,c){if("undefined"==typeof b)var b="";if("undefined"==typeof c)var c=!0;var d=a.ensureString(b);if(a.isEmpty(d))return window.console&&console.warn("getUrlParameter() given empty input"),"";"object"!=typeof window.mwdspace.urlParameters&&a.makeUrlParameterList();var e=c?"i":"",f=new RegExp(d,e);for(var g in window.mwdspace.urlParameters)if(g.match(f))return window.mwdspace.urlParameters[g];return""},a.makeUrlParameterList=function(){window.mwdspace.urlParameters={};for(var b,c,d=window.location.search.split(/[\?&]/),e=0;e<d.length;e++)a.isEmpty(d[e])||(b=d[e].split("="),c=a.ensureString(b[0]).replace("+"," "),c=decodeURIComponent(c),a.isEmpty(c)||(window.mwdspace.urlParameters[c]=decodeURIComponent(b[1])))},a.makeUniqueId=function(a){function b(){return(0|65536*(1+Math.random())).toString(16).substring(1)}if("undefined"==typeof a)var a="";return a=(a+"").trim(),a+b()+function(){return new Date().getTime().toString(16).substring(1)}()+b()}})();