parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"hPDD":[function(require,module,exports) {
!function(){var e=function(e,t){var n=setInterval(function(){var r=document.querySelector(e);r&&(clearInterval(n),t(r))},500)},t=function(e){if(null!==e){var t=e.querySelector('div[data-name="terra_taxonomies"] select'),r=t.value,a=e.querySelectorAll('div[data-name="terra_term_select"] select optgroup');n(r,a),t.addEventListener("change",function(e){r=e.currentTarget.value,n(r,a)})}},n=function(e,t){e&&t[0]&&t.forEach(function(t){var n=t.getAttribute("label");t.style.display=e===n?"block":"none"})};window.acf&&window.acf.addAction("render_block_preview/type=terra-feed",function(n){null!==(n instanceof jQuery?n[0]:n)&&e(".acf-block-fields",function(e){t(e)})})}();
},{}]},{},["hPDD"], null)
//# sourceMappingURL=/feed-block.js.map