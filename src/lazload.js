class LazLoad {
  constructor({
    identifier = ".laz",
    triggerRadius = 300,
    revealAnim = "slide-up-white",
    overlayCustomColor = "grey",
    onContentLoaded,
  } = {}) {
    // Won't init if window undefined;
    if (!window || !document)
      return console.error("window / document object not found");
    // Set option variables
    this.identifier = identifier;
    this.triggerRadius = triggerRadius;
    this.revealAnim = revealAnim;
    this.overlayCustomColor = overlayCustomColor;
    this.onContentLoaded = onContentLoaded;
  }

  static anims = {
    NONE: "none",
    SLIDE_UP_WHITE: "slide-up-white",
    SLIDE_UP_BLACK: "slide-up-black",
    FADE_IN: "fade-in",
    SLIDE_UP_CUSTOM_COLOR: "slide-up-custom-color",
  };

  traverseStyle = (fromEle, toEle) => {
    var fromStyle = fromEle.currentStyle || window.getComputedStyle(fromEle);
    toEle.style.marginTop = `${parseInt(fromStyle.marginTop)}px`;
    toEle.style.marginLeft = `${parseInt(fromStyle.marginLeft)}px`;
    toEle.style.marginRight = `${parseInt(fromStyle.marginRight)}px`;
    toEle.style.marginBottom = `${parseInt(fromStyle.marginBottom)}px`;
    toEle.style.backgroundColor = fromStyle.backgroundColor;
    fromEle.style.margin = "0px";
    fromEle.style.backgroundColor = "transparent";
  };

  initiateElements = (elements) => {
    elements.forEach((element, index) => {
      this.addPreAnimStyle(this.revealAnim, element);
    });
  };

  setupWrapperAroundElements = (element) => {
    let newWrapper = document.createElement("div");
    newWrapper.style.height = `${element.clientHeight}px`;
    newWrapper.style.width = `${element.clientWidth}px`;
    newWrapper.style.overflow = "hidden";
    newWrapper.style.position = "relative";
    this.traverseStyle(element, newWrapper);
    // Append targetElement to wrapper
    newWrapper.appendChild(element);
    return newWrapper;
  };

  setupCommonSlideUpAnim = (element, overlayColor) => {
    let parent = element.parentNode;
    // Create and set the overlay style
    let newOverlay = document.createElement("div");
    // Create the wrapper
    let newWrapper = this.setupWrapperAroundElements(element);
    element.style.opacity = 0;

    newOverlay.style.position = "absolute";
    newOverlay.style.top = "0px";
    newOverlay.style.left = "0px";
    newOverlay.style.width = "100%";
    newOverlay.style.height = "100%";
    newOverlay.style.backgroundColor = overlayColor;
    newOverlay.style.transition = "all ease 1.2s";
    newOverlay.style.transform = "translateY(100%)";
    newOverlay.style.zIndex = "100";

    // Append wrapper to the parent
    newWrapper.appendChild(newOverlay);
    parent.appendChild(newWrapper);
  };

  addPreAnimStyle = (revealAnim, element) => {
    switch (revealAnim) {
      case LazLoad.anims.NONE:
        let parent1 = element.parentNode;
        let newWrapper1 = this.setupWrapperAroundElements(element);
        // Append wrapper to the parent
        parent1.appendChild(newWrapper1);
        element.style.opacity = 0;
        break;
      case LazLoad.anims.FADE_IN:
        let parent = element.parentNode;
        let newWrapper = this.setupWrapperAroundElements(element);
        // Append wrapper to the parent
        parent.appendChild(newWrapper);
        element.style.opacity = 0;
        element.style.transition = "all .3s";
        break;
      case LazLoad.anims.SLIDE_UP_WHITE:
        // Setup common styles
        this.setupCommonSlideUpAnim(element, "white");
        break;
      case LazLoad.anims.SLIDE_UP_BLACK:
        // Setup common styles
        this.setupCommonSlideUpAnim(element, "black");
        break;
      case LazLoad.anims.SLIDE_UP_CUSTOM_COLOR:
        // Setup common styles
        this.setupCommonSlideUpAnim(element, this.overlayCustomColor);
        break;
      default:
        break;
    }
  };

  performCommonSlideAnim = (element) => {
    let newWrapper = element.parentNode;
    let newOverlay = newWrapper.childNodes[1];
    newOverlay.style.transform = "translateY(-100%)";
    setTimeout(() => {
      element.style.opacity = 1;
    }, 370); // Because the animation lasts for 1.2s and It takes time to show up
  };

  performStyleAnim = (revealAnim, element) => {
    switch (revealAnim) {
      case LazLoad.anims.NONE:
        element.style.opacity = 1;
        break;
      case LazLoad.anims.FADE_IN:
        setTimeout(() => {
          element.style.opacity = 1;
        }, 300); // It takes time to show up
        break;
      case LazLoad.anims.SLIDE_UP_WHITE:
        this.performCommonSlideAnim(element);
        break;
      case LazLoad.anims.SLIDE_UP_BLACK:
        this.performCommonSlideAnim(element);
        break;
      case LazLoad.anims.SLIDE_UP_CUSTOM_COLOR:
        // Setup common styles
        this.performCommonSlideAnim(element);
        break;
      default:
        break;
    }
  };

  getOffset = (el) => {
    var rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  };

  init = () => {
    // Won't init if window undefined;
    if (!window || !document)
      return console.error("window / document object not found");

    const elements = [...document.querySelectorAll(this.identifier)];
    if (elements.length == 0) return; // Don't listen to anything if there isn't any elements

    // Set up initial styles for target elements
    this.initiateElements(elements);

    window.addEventListener("scroll", (e) => {
      let scrolled = window.scrollY;
      elements.forEach((element, index) => {
        const offsetTop = this.getOffset(elements[0]).top;
        if (offsetTop < scrolled + this.triggerRadius) {
          // Remove the class if the indentifier is a class
          if (this.identifier.charAt(0) === ".")
            element.classList.remove(this.identifier.slice(1));
          // Remove the id if the indentifier is a id
          if (this.identifier.charAt(0) === "#") element.removeAttribute("id");

          if (element.tagName.toUpperCase() == "IMG") {
            // The element is an image
            // Set the src and load the image
            element.src = element.dataset.src;
            element.addEventListener("load", () => {
              this.performStyleAnim(this.revealAnim, element);
              if (this.onContentLoaded)
                this.onContentLoaded(element.dataset.src);
            });
            element.addEventListener("error", function () {
              console.error(
                `LazLoad: Error while loading the image: ${element.dataset.src}`
              );
            });
          } else if (element.tagName.toUpperCase() == "VIDEO") {
            // The element is a video
            // Set the src and load the video
            element.src = element.dataset.src;
            element.onloadeddata = () => {
              this.performStyleAnim(this.revealAnim, element);
              if (this.onContentLoaded)
                this.onContentLoaded(element.dataset.src);
            };
            element.onerror = () => {
              console.error(
                `LazLoad: Error while loading the video: ${element.dataset.src}`
              );
            };
          }
          // Lastly remove the element from the elements array
          elements.splice(index, 1);
        }
      });
    });
  };
}
