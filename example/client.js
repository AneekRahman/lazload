// import LazLoad from "../src/index.js";

new LazLoad({
  revealAnim: LazLoad.anims.FADE_IN,
  onContentLoaded: (element, url) => {
    console.log("Im loaded: " + url);
  },
  onLoadError: (element) => {
    console.log("Error loading: " + element.src);
  },
}).init();
