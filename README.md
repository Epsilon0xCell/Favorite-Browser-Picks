![Intro: a nursery mobile in half light, tin stars and a tin moon on threads over an empty cot, the lowest star huge and close with one bent tip](intro-banner.png)

# Favorite-Browser-Picks

![Banner](banner.png)

![Scene: a mobile seen from the side in three bands of hanging depth, stars turning on their threads at different speeds, the moon crossing a star](assets-scene.svg)

Two separate items kept in one repo: the author's favourite browsers, and a userscript that redirects DuckDuckGo searches to StartPage.

## Favourite browsers

- Opera GX: https://www.opera.com/gx
- Opera Air: https://www.opera.com/air

These are picks, not code; nothing here installs or changes a browser.

![Separator: five small stars hanging at uneven lengths, the middle star turning once](sep-heavy.svg)

## DuckDuckGo to StartPage userscript

`startpage_redirection.js` is a Tampermonkey userscript (version 0.2). On a DuckDuckGo search page it reads the `q` query parameter and sends the browser to `https://www.startpage.com/do/search?q=` plus the encoded query. A page with no query is left alone, and StartPage itself is never matched, so there is no redirect loop.

The `@match` list previously contained only `*://duckduckgo.com/*`, which in Tampermonkey matches the bare `duckduckgo.com` host only. DuckDuckGo is commonly used on `www.duckduckgo.com` and `html.duckduckgo.com`, so a second pattern, `*://*.duckduckgo.com/*`, is now added alongside the original.

> **Note pinned to the cot rail.** NOT RUN IN A REAL BROWSER

## Verified behaviour and limits

Verified with a Node harness that stubs `window.location` and runs the script body: a `duckduckgo.com/?q=hello+world` page redirects to the StartPage search for `hello%20world`, and a page with no query keeps its URL. The `@match` fix is a pattern inspection (Tampermonkey match rules), not a browser run: the script was not loaded in a real browser in this pass. Install it through Tampermonkey by adding a new userscript with this file's contents.

Files: `startpage_redirection.js`, `logo.png`, `banner.png`.
