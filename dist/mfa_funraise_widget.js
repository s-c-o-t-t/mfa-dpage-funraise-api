"use strict";(function(){var es5Only=!1;if(!1 in window)es5Only=!0;else try{eval("async () => {}")}catch(a){a instanceof SyntaxError&&(es5Only=!0)}es5Only&&console.warn("Browser does not support modern features. Will load transpiled code version.");var scriptFilename=es5Only?"es5-mwd-donate-widget.js":"mwd-donate-widget.js",url="https://quiz.mercyforanimals.org/donate-widget/1.0.0/js/"+scriptFilename;"localhost"==window.location.hostname&&(url="http://localhost:8888/mwd/mfa/mfa-dpage-funraise-api/dist/js/"+scriptFilename,console.warn("LOADING TEST WIDGET",url));try{var inlineInclude="<script src=\""+encodeURI(url)+"\"></script>";document.write(inlineInclude)}catch(a){console.error("mfa_funraise_widget.js: Unable to run:",a)}})();