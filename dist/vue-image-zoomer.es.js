import { nextTick, resolveDirective, openBlock, createElementBlock, Fragment, renderSlot, createCommentVNode, withDirectives, createElementVNode, normalizeClass, renderList, normalizeStyle, createVNode, Transition, withCtx, withModifiers, vShow } from "vue";
var vueImageZoomer_vue_vue_type_style_index_0_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = {
  name: "VueImageZoomer",
  emits: ["onZoom", "offZoom", "regularLoaded", "zoomLoaded", "zoomLoading"],
  directives: {
    clickOutside: {
      mounted(el, binding) {
        el.clickOutsideEvent = function(event) {
          if (!(el == event.target || el.contains(event.target))) {
            binding.value(event, el);
          }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
      },
      unmounted(el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
      }
    }
  },
  data() {
    return {
      touch: false,
      zoomed: false,
      x: 0,
      y: 0,
      touchPosition: 0,
      origX: 0,
      origY: 0,
      offsetLeft: 0,
      offsetTop: 0,
      zoomWidth: 0,
      zoomHeight: 0,
      options: {
        zoomAmount: 0,
        zoom: false,
        zoomWebp: false
      },
      loaded: false,
      loading: false,
      webp_supported: false,
      cx: 0,
      cy: 0,
      showSlot: true
    };
  },
  props: {
    regular: String,
    regularWebp: String,
    zoom: String,
    zoomWebp: String,
    imgClass: {
      type: String,
      default: ""
    },
    alt: String,
    zoomAmount: {
      type: Number,
      default: 0
    },
    clickZoom: Boolean,
    hoverMessage: {
      type: String,
      default: '<span class="vh--icon">&#9906;</span> Hover to zoom'
    },
    touchMessage: {
      type: String,
      default: '<span class="vh--icon">&#9906;</span> Tap to zoom'
    },
    clickMessage: {
      type: String,
      default: '<span class="vh--icon">&#9906;</span> Click to zoom'
    },
    closePos: {
      type: String,
      default: "top-left"
    },
    messagePos: {
      type: String,
      default: "bottom"
    },
    showMessage: {
      type: Boolean,
      default: true
    },
    showMessageTouch: {
      type: Boolean,
      default: true
    },
    tapToClose: Boolean,
    breakpoints: Array,
    touchZoomPos: {
      type: Array,
      default() {
        return [0.5, 0.5];
      }
    },
    imgWidth: Number,
    imgHeight: Number,
    lazyload: Boolean,
    rightClick: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    propChanges() {
      this.get_options();
    }
  },
  computed: {
    propChanges() {
      return `${this.breakpoints}|${this.regular}|${this.regularWebp}|${this.zoom}|${this.zoomAmount}|${this.zoomWebp}|${this.lazyload}`;
    }
  },
  mounted() {
    this.check_webp_feature("lossy", (feature, isSupported) => {
      if (isSupported) {
        this.webp_supported = true;
      }
    });
    this.get_options();
    if ("ontouchstart" in window || navigator.msMaxTouchPoints) {
      this.touch = true;
    }
    this.touchLogic();
  },
  created() {
    window.addEventListener("resize", this.debounce(() => {
      this.resize();
    }, 500));
  },
  unmounted() {
    window.removeEventListener("resize", this.resize());
  },
  methods: {
    async touchLogic() {
      await nextTick();
      let sx, sy;
      let moved = false;
      this.$refs["vue-hover-zs"].addEventListener("touchstart", (e) => {
        if (this.zoomed) {
          if (e.cancelable) {
            e.preventDefault();
          }
          let touchmovement = e.changedTouches[0];
          sx = touchmovement.pageX - this.cx;
          sy = touchmovement.pageY - this.cy;
        }
      });
      this.$refs["vue-hover-zs"].addEventListener("touchmove", (e) => {
        if (this.zoomed) {
          let touchmovement = e.changedTouches[0];
          this.x = touchmovement.pageX - sx;
          this.y = touchmovement.pageY - sy;
          if (touchmovement.pageX - sx <= this.origX - this.zoomWidth) {
            this.x = this.origX - this.zoomWidth;
          }
          if (touchmovement.pageX - sx >= 0) {
            this.x = -1;
          }
          if (touchmovement.pageY - sy <= this.origY - this.options.zoomAmount * this.origY) {
            this.y = this.origY - this.options.zoomAmount * this.origY;
          }
          if (touchmovement.pageY - sy >= 0) {
            this.y = -1;
          }
          this.touchPosition = "translate3d(" + this.x + "px," + this.y + "px,0)";
          moved = true;
        }
      });
      this.$refs["vue-hover-zs"].addEventListener("touchend", (e) => {
        if (this.zoomed) {
          let touchmovement = e.changedTouches[0];
          this.cx = touchmovement.pageX - sx;
          this.cy = touchmovement.pageY - sy;
          if (!moved && this.tapToClose) {
            this.zoomed = false;
            this.$emit("offZoom");
          }
          moved = false;
        }
      });
    },
    debounce(callback, wait) {
      let timeout;
      return (...args) => {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => callback.apply(context, args), wait);
      };
    },
    get_options() {
      this.options.zoomAmount = this.zoomAmount;
      this.options.zoom = this.zoom;
      this.options.zoomWebp = this.zoomWebp;
      if (!this.zoom) {
        this.options.zoom = this.regular;
        this.options.zoomAmount = 2;
      }
      if (!this.zoomWebp && this.regularWebp) {
        this.options.zoomWebp = this.regularWebp;
        this.options.zoomAmount = 2;
      }
      this.resize();
    },
    resize() {
      this.zoomed = false;
      this.loaded = false;
    },
    check_webp_feature(feature, callback) {
      let kTestImages = {
        lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA"
      };
      let img = new Image();
      img.onload = () => {
        let result = img.width > 0 && img.height > 0;
        callback(feature, result);
      };
      img.onerror = () => {
        callback(feature, false);
      };
      img.src = "data:image/webp;base64," + kTestImages[feature];
    },
    loadImage(src, callback) {
      const sprite = new Image();
      sprite.onload = callback;
      sprite.src = src;
    },
    loadZoom() {
      this.offset();
      if (this.options.zoomAmount != 0) {
        this.zoomWidth = this.origX * this.options.zoomAmount;
        this.zoomHeight = this.origY * this.options.zoomAmount;
        if (this.touch) {
          this.mobilePos();
        }
      }
      if (!this.loaded) {
        this.zoomLoad();
      } else {
        this.zoomed = true;
        if (this.options.zoomAmount == 0) {
          this.options.zoomAmount = this.zoomWidth / this.origX;
        }
      }
    },
    zoomLoad() {
      if (!this.clickZoom || this.touch) {
        this.loading = true;
        this.$emit("zoomLoading");
      }
      let zoomToLoad = this.options.zoom;
      if (this.breakpoints) {
        this.breakpoints.forEach((item) => {
          if (window.innerWidth >= item.width) {
            if (item.zoom) {
              zoomToLoad = item.zoom;
            } else {
              zoomToLoad = item.regular;
            }
          }
        });
      }
      if (this.webp_supported && this.options.zoomWebp) {
        zoomToLoad = this.options.zoomWebp;
        if (this.breakpoints) {
          this.breakpoints.forEach((item) => {
            if (window.innerWidth >= item.width) {
              if (item.zoomWebp) {
                zoomToLoad = item.zoomWebp;
              } else {
                zoomToLoad = item.regularWebp;
              }
            }
          });
        }
      }
      this.loadImage(zoomToLoad, (src) => {
        if (this.options.zoomAmount == 0) {
          this.zoomWidth = src.target.width;
          this.zoomHeight = src.target.height;
          this.options.zoomAmount = src.target.width / this.origX;
        }
        this.loaded = true;
        this.loading = false;
        this.$emit("zoomLoaded");
        if (!this.clickZoom || this.touch) {
          this.zoomed = true;
          this.mobilePos();
        }
      });
    },
    isZoom(type, action) {
      if (action == "hover" && !this.clickZoom && !this.touch || action == "click" && (this.clickZoom || this.touch) || typeof type === "object") {
        this.zoomed = false;
        if (type == true) {
          this.loadZoom();
          this.$emit("onZoom");
        } else {
          this.$emit("offZoom");
        }
      }
    },
    mobilePos() {
      let X = (this.zoomWidth - this.origX) * this.touchZoomPos[0];
      let Y = (this.zoomHeight - this.origY) * this.touchZoomPos[1];
      if (this.touchZoomPos[0] > 1 || this.touchZoomPos[0] < 0 || this.touchZoomPos[1] > 1 || this.touchZoomPos[1] < 0) {
        X = 0;
        Y = 0;
      }
      this.cx = -X;
      this.cy = -Y;
      this.x = -X;
      this.y = -Y;
      this.touchPosition = "translate3d(-" + X + "px,-" + Y + "px,0)";
    },
    offset() {
      this.origX = parseFloat(this.$refs["vue-hover-zs"].offsetWidth);
      this.origY = parseFloat(this.$refs["vue-hover-zs"].offsetHeight);
    },
    mousePos(e) {
      this.offsetLeft = window.pageXOffset + this.$refs["vue-hover-zs"].getBoundingClientRect().left;
      this.offsetTop = window.pageYOffset + this.$refs["vue-hover-zs"].getBoundingClientRect().top;
      if (!this.touch && !this.loading) {
        if (!this.loaded) {
          this.offset();
          this.zoomLoad();
        } else {
          this.x = (e.pageX - this.offsetLeft) * (this.options.zoomAmount - 1);
          this.y = (e.pageY - this.offsetTop) * (this.options.zoomAmount - 1);
        }
      }
    }
  }
};
const _hoisted_1 = { class: "vh--outer vh--rel" };
const _hoisted_2 = ["srcset", "media"];
const _hoisted_3 = ["srcset", "media"];
const _hoisted_4 = ["srcset"];
const _hoisted_5 = ["loading", "src", "alt", "width", "height"];
const _hoisted_6 = { key: 0 };
const _hoisted_7 = ["srcset", "media"];
const _hoisted_8 = ["srcset", "media"];
const _hoisted_9 = ["srcset", "media"];
const _hoisted_10 = ["srcset", "media"];
const _hoisted_11 = ["src"];
const _hoisted_12 = ["src"];
const _hoisted_13 = ["src"];
const _hoisted_14 = ["innerHTML"];
const _hoisted_15 = ["innerHTML"];
const _hoisted_16 = ["innerHTML"];
const _hoisted_17 = {
  key: 1,
  class: "vh--loading-o vh--abs vh--flex vh--jc vh--ai"
};
const _hoisted_18 = /* @__PURE__ */ createElementVNode("div", {
  class: "vh--loading",
  innerHTML: "\u25E0"
}, null, -1);
const _hoisted_19 = [
  _hoisted_18
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_click_outside = resolveDirective("click-outside");
  return openBlock(), createElementBlock(Fragment, null, [
    $data.showSlot && !$props.lazyload ? renderSlot(_ctx.$slots, "default", { key: 0 }) : createCommentVNode("", true),
    withDirectives((openBlock(), createElementBlock("div", _hoisted_1, [
      createElementVNode("div", {
        class: normalizeClass(["vh--holder vh--rel vh--flex vh--jc", { "vh--no-click": !$props.rightClick }]),
        onMouseenter: _cache[1] || (_cache[1] = ($event) => $options.isZoom(true, "hover")),
        onMouseleave: _cache[2] || (_cache[2] = ($event) => $options.isZoom(false, "hover")),
        onMousemove: _cache[3] || (_cache[3] = (...args) => $options.mousePos && $options.mousePos(...args)),
        ref: "vue-hover-zs",
        onClick: _cache[4] || (_cache[4] = ($event) => $options.isZoom(!$data.zoomed, "click"))
      }, [
        createElementVNode("picture", {
          class: normalizeClass({ "vh--none": $data.zoomed })
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($props.breakpoints, (breakpoint) => {
            return openBlock(), createElementBlock(Fragment, {
              key: breakpoint.width
            }, [
              breakpoint.regularWebp ? (openBlock(), createElementBlock("source", {
                key: 0,
                srcset: breakpoint.regularWebp,
                type: "image/webp",
                media: "(min-width:" + breakpoint.width + "px)"
              }, null, 8, _hoisted_2)) : createCommentVNode("", true),
              breakpoint.regular ? (openBlock(), createElementBlock("source", {
                key: 1,
                srcset: breakpoint.regular,
                media: "(min-width:" + breakpoint.width + "px)"
              }, null, 8, _hoisted_3)) : createCommentVNode("", true)
            ], 64);
          }), 128)),
          $props.regularWebp ? (openBlock(), createElementBlock("source", {
            key: 0,
            srcset: $props.regularWebp,
            type: "image/webp"
          }, null, 8, _hoisted_4)) : createCommentVNode("", true),
          createElementVNode("img", {
            loading: $props.lazyload ? "lazy" : "eager",
            src: $props.regular,
            class: normalizeClass($props.imgClass),
            alt: $props.alt,
            onLoad: _cache[0] || (_cache[0] = ($event) => (_ctx.$emit("regularLoaded"), $data.showSlot = false)),
            width: $props.imgWidth,
            height: $props.imgHeight
          }, null, 42, _hoisted_5)
        ], 2),
        $data.zoomed ? (openBlock(), createElementBlock("picture", _hoisted_6, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($props.breakpoints, (breakpoint) => {
            return openBlock(), createElementBlock(Fragment, {
              key: breakpoint.width
            }, [
              breakpoint.zoomWebp ? (openBlock(), createElementBlock("source", {
                key: 0,
                srcset: breakpoint.zoomWebp,
                type: "image/webp",
                media: "(min-width:" + breakpoint.width + "px)"
              }, null, 8, _hoisted_7)) : breakpoint.regularWebp ? (openBlock(), createElementBlock("source", {
                key: 1,
                srcset: breakpoint.regularWebp,
                type: "image/webp",
                media: "(min-width:" + breakpoint.width + "px)"
              }, null, 8, _hoisted_8)) : createCommentVNode("", true),
              breakpoint.zoom ? (openBlock(), createElementBlock("source", {
                key: 2,
                srcset: breakpoint.zoom,
                media: "(min-width:" + breakpoint.width + "px)"
              }, null, 8, _hoisted_9)) : breakpoint.regular ? (openBlock(), createElementBlock("source", {
                key: 3,
                srcset: breakpoint.regular,
                media: "(min-width:" + breakpoint.width + "px)"
              }, null, 8, _hoisted_10)) : createCommentVNode("", true)
            ], 64);
          }), 128)),
          $data.options.zoomWebp ? (openBlock(), createElementBlock("source", {
            key: 0,
            src: $data.options.zoomWebp,
            type: "image/webp"
          }, null, 8, _hoisted_11)) : createCommentVNode("", true),
          !$data.touch ? (openBlock(), createElementBlock("img", {
            key: 1,
            src: $data.options.zoom,
            class: "vh--image vh--abs",
            style: normalizeStyle({ width: $data.zoomWidth + "px", transform: "translate(-" + $data.x + "px,-" + $data.y + "px)" })
          }, null, 12, _hoisted_12)) : (openBlock(), createElementBlock("img", {
            key: 2,
            src: $data.options.zoom,
            class: "vh--image vh--abs",
            style: normalizeStyle("width:" + $data.zoomWidth + "px;transform:" + $data.touchPosition)
          }, null, 12, _hoisted_13))
        ])) : createCommentVNode("", true),
        createVNode(Transition, { name: "VueHoverfade" }, {
          default: withCtx(() => [
            !$data.zoomed && !$data.loading && !$props.clickZoom && !$data.touch && $props.showMessage ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(["vh--message vh--abs vh--flex vh--jc vh--ai", "vh--message-" + $props.messagePos]),
              innerHTML: $props.hoverMessage
            }, null, 10, _hoisted_14)) : !$data.zoomed && !$data.loading && !$data.touch && $props.showMessage ? (openBlock(), createElementBlock("div", {
              key: 1,
              class: normalizeClass(["vh--message vh--abs vh--flex vh--jc vh--ai", "vh--message-" + $props.messagePos]),
              innerHTML: $props.clickMessage
            }, null, 10, _hoisted_15)) : !$data.zoomed && !$data.loading && $data.touch && $props.showMessageTouch ? (openBlock(), createElementBlock("div", {
              key: 2,
              class: normalizeClass(["vh--message vh--abs vh--flex vh--jc vh--ai", "vh--message-" + $props.messagePos]),
              innerHTML: $props.touchMessage
            }, null, 10, _hoisted_16)) : createCommentVNode("", true)
          ]),
          _: 1
        })
      ], 34),
      createVNode(Transition, { name: "VueHoverfade" }, {
        default: withCtx(() => [
          $data.touch && $data.zoomed && $data.loaded && !$props.tapToClose ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["vh--close vh--abs vh--flex vh--jc vh--ai", "vh--" + $props.closePos]),
            onClick: _cache[5] || (_cache[5] = withModifiers(($event) => ($data.zoomed = false, _ctx.$emit("offZoom")), ["stop"])),
            innerHTML: "\xD7"
          }, null, 2)) : $data.loading ? (openBlock(), createElementBlock("div", _hoisted_17, _hoisted_19)) : createCommentVNode("", true)
        ]),
        _: 1
      })
    ])), [
      [_directive_click_outside, $options.isZoom],
      [vShow, !$data.showSlot || $props.lazyload]
    ])
  ], 64);
}
var VueImageZoomer = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
var index = {
  install: (app, options) => {
    app.component("VueImageZoomer", VueImageZoomer);
  }
};
export { VueImageZoomer, index as default };
