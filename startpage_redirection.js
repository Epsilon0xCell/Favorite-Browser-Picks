// ==UserScript==
// @name         DuckDuckGo to StartPage Redirect
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Redirect DuckDuckGo search queries to StartPage
// @match        *://duckduckgo.com/*
// @match        *://*.duckduckgo.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    // @run-at document-start is load-bearing: the redirect has to fire
    // before DuckDuckGo's own scripts and results render, or the user
    // sees the page they asked not to use and the browser does the work
    // twice. There is nothing here that needs the DOM to exist first.
    const searchURL = 'https://www.startpage.com/do/search?q=';
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');
    if (query) {
        // URLSearchParams hands back the decoded query ("hello world"
        // for ?q=hello+world), so it has to be encoded again on the way
        // out. Skipping encodeURIComponent would let a query containing
        // & or # break out of the q parameter and change the StartPage
        // URL's meaning.
        window.location.href = searchURL + encodeURIComponent(query);
    }
    // No query, no redirect. That test is also what keeps the script
    // out of a loop: StartPage is not in the @match list, and a bare
    // DuckDuckGo visit has no q to act on.
})();
