# LazLoad

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

[npm-image]: https://img.shields.io/npm/v/lazload.svg
[npm-url]: https://npmjs.org/package/lazload
[downloads-image]: https://img.shields.io/npm/dm/lazload.svg
[downloads-url]: https://npmjs.org/package/lazload

# What is this?

This is a library which can lazy load:

- Images
- Videos

There are multiple premade image/video reveal animations after the image/video is loaded. More will be added soon. (Please show your support!)

You can set your own animations if you want as well. Just set the `identifier: '.any-class-you-like'` and use the `onContentLoaded: function(element, url){}` callback to perform any action/animation on that element

<p style="color: rgba(0,0,0,0.4)">Also help the development by reporting any bugs. Feel free to contribute to this project. Thanks ❤</p>

# Animation Examples

| ![][fade-in] | ![][white-overlay] |
| :----------: | :----------------: |
|   Fade in    |   White Overlay    |

[fade-in]: docs/fade-in.gif "Fade in animation"
[white-overlay]: docs/white-overlay.gif "White overlay"

## Benefits

- Fast CSS3 animation which uses the GPU
- Extremely lightweight: Only 7.2kB (1.9kB gzipped)
- No dependency: It's all Pure javascript

# CDN

```
<script src="https://unpkg.com/lazload@1.0.4/src/lazload.js">
```

And then use it like this:

```
<img class="laz" data-src='...'>
<video class="laz" data-src='...'></video>
```

```
LazLoad().init();
```

# NPM Installation

```
npm i lazload
```

And then use it like this:

```
<img class="laz" data-src='...'>
<video class="laz" data-src='...'></video>
```

```
import LazLoad from 'lazload';

LazLoad().init();
```

# Callback Examples

```
new LazLoad({
  onContentLoaded: (element, url) => {
    console.log("Im loaded: " + url);
    element.style.transform = "rotate(30deg)"; // Any animation you want to perform
  },
}).init();
```

```
new LazLoad({
  onLoadError: (element) => {
    console.log("Error loading: " + element.src);
  },
}).init();
```

# Options

```
// These are the Defaults
new LazLoad({
  identifier: ".laz",
  revealAnim: LazLoad.anims.SLIDE_UP_WHITE,
  triggerRadius: 300,
  onContentLoaded: function(element, url){}
  onLoadError: function(element){}
}).init();
```

- `identifier`: [string]
  Identify which elements should be parallaxed
- `triggerRadius`: [int] [value > 0]
  How close to the scroll from top should the lazy loading get triggered. The higher the number, the closer it gets to being lazy loaded with scroll.
- `revealAnim`: [LazLoad.anims.OPTION_NAME]
  Possible values:
  - `LazLoad.anims.NONE`
  - `LazLoad.anims.SLIDE_UP_WHITE`
  - `LazLoad.anims.SLIDE_UP_BLACK`
  - `LazLoad.anims.SLIDE_UP_CUSTOM_COLOR`
- `overlayCustomColor`: [color]
  To use this, `revealAnim` must be `LazLoad.anims.SLIDE_UP_CUSTOM_COLOR`
- `onContentLoaded`: [function]
  This callback event is triggered once the lazy-loading content has finished loading
- `onLoadError`: [function]
  This callback event is triggered if content failed to load

# Using custom colors for sliding overlay

```
// MUST! revealAnim: LazLoad.anims.SLIDE_UP_CUSTOM_COLOR
new LazLoad({
  revealAnim: LazLoad.anims.SLIDE_UP_CUSTOM_COLOR,
  overlayCustomColor: "rgb(255, 123, 100)",
}).init();
```

# Achieve the shown examples gifs effects

```
/* Use this for the images you want to parallax */
.parallax-element{
  object-fit: cover; // Fixes image ratio
}
```
