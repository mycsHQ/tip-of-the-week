# Preload

## Recap
- Browser may stops parsing HTML when it comes over a `<script>...</script>` tag, to excecute it 
  - Reason: The script could make change to the DOM
  - It will continue to look for external files (CSS, scripts, images, @import [not FF]) and load then, though
  - It may construct speculative DOM-tree
- Browser may stops parsing HTML when it comes over a CSS definition (`<style>` or `<link rel="stylesheet">`)
  - But it stops Rendering for sure (it creats the CSSDOM which will be used for rendering)

![](https://hacks.mozilla.org/files/2017/09/blocking-bold@2x-1-500x162.png)

Another example:

![](https://hacks.mozilla.org/files/2017/09/waterfall-2-bold@2x-500x208.png)

- That's why we usually put CSS in the head and scripts to the bottom of the HTML

## defer and async
- Tell the browser to handle these scripts asynchronously

`<script src="foo.js" defer></script>` or `<script src="foo.js" async></script>`

- `defer` execution starts after parsing is completely finished

![](https://hacks.mozilla.org/files/2017/09/defer-bold@2x-500x164.png)

- `async` execute at the first opportunity after they finish downloading

![](https://hacks.mozilla.org/files/2017/09/async-bold@2x-500x151.png)

## preload
- Used to load resources (script, style, image, font, audio, video) as soon as possible 

`<link rel="preload" href="important.js" as="script">` or `<link rel="preload" href="font.woff" as="font">`

- e.g. fonts are usually not loaded before the browser is sure they are used (when CSS is parsed and applied)

## Links
* [Mozilla block](https://hacks.mozilla.org/2017/09/building-the-dom-faster-speculative-parsing-async-defer-and-preload/)
* [Can I use it?](https://caniuse.com/#search=preload)