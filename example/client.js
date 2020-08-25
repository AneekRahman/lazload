new LazLoad({
  revealAnim: LazLoad.anims.FADE_IN,
  onContentLoaded: (element, url) => {
    console.log("Im loaded: " + url);
    element.style.transform = "rotate(30deg)";
  },
  onLoadError: (element) => {
    console.log("Error loading: " + element.src);
  },
}).init();
