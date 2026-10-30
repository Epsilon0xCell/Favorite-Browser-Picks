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

// I list two @match patterns because neither one covers the other:
// the first reaches the bare duckduckgo.com host on its own, and the
// second reaches the subdomains I actually land on, such as www and
// html. I ask for no Tampermonkey grants because I only read the
// address bar and assign a new one, which a page script can already
// do on its own.
(function() {
    'use strict';
    // I run this at document-start on purpose, and that choice is
    // load-bearing: I need the redirect to fire before DuckDuckGo
    // renders its own page, or I see the search engine I asked not
    // to use and the browser does the work twice. Nothing I do here
    // needs the DOM to exist first.
    const searchURL = 'https://www.startpage.com/do/search?q=';
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');
    if (query) {
        // I encode the query again on the way out because
        // URLSearchParams hands me the decoded text ("hello world"
        // for ?q=hello+world). If I skipped encodeURIComponent, a
        // query containing & or # would break out of my q parameter
        // and change what the StartPage URL means.
        window.location.href = searchURL + encodeURIComponent(query);
    }
    // If there is no query, I leave the page alone. That same check
    // keeps me out of a loop: StartPage is on neither @match pattern,
    // and a bare DuckDuckGo visit gives me no q to act on.
})();
