![Banner](banner.png)

# Favorite-Browser-Picks

Two separate items kept in one repo: the author's favourite browsers, and a userscript that redirects DuckDuckGo searches to StartPage.

## Favourite browsers

- Opera GX: https://www.opera.com/gx
- Opera Air: https://www.opera.com/air

These are picks, not code; nothing here installs or changes a browser.

## DuckDuckGo to StartPage userscript

`startpage_redirection.js` is a Tampermonkey userscript (version 0.2). On a DuckDuckGo search page it reads the `q` query parameter and sends the browser to `https://www.startpage.com/do/search?q=` plus the encoded query. A page with no query is left alone, and StartPage itself is never matched, so there is no redirect loop.

The `@match` list previously contained only `*://duckduckgo.com/*`, which in Tampermonkey matches the bare `duckduckgo.com` host only. DuckDuckGo is commonly used on `www.duckduckgo.com` and `html.duckduckgo.com`, so a second pattern, `*://*.duckduckgo.com/*`, is now added alongside the original.

## Verified behaviour and limits

Verified with a Node harness that stubs `window.location` and runs the script body: a `duckduckgo.com/?q=hello+world` page redirects to the StartPage search for `hello%20world`, and a page with no query keeps its URL. The `@match` fix is a pattern inspection (Tampermonkey match rules), not a browser run: the script was not loaded in a real browser in this pass. Install it through Tampermonkey by adding a new userscript with this file's contents.

Files: `startpage_redirection.js`, `logo.png`, `banner.png`.
