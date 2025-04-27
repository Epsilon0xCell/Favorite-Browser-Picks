// ==UserScript==
// @name         DuckDuckGo to StartPage Redirect
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Redirect DuckDuckGo search queries to StartPage
// @match        *://duckduckgo.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    const searchURL = 'https://www.startpage.com/do/search?q=';
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');
    if (query) {
        window.location.href = searchURL + encodeURIComponent(query);
    }
})();
