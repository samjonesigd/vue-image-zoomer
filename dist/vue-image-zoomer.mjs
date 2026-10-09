import { nextTick as w, resolveDirective as y, openBlock as r, createElementBlock as l, Fragment as u, renderSlot as b, createCommentVNode as n, withDirectives as k, createElementVNode as d, normalizeClass as m, renderList as c, normalizeStyle as g, createVNode as f, Transition as z, withCtx as v, withModifiers as W, vShow as x } from "vue";
const _ = (o, e) => {
  const s = o.__vccOpts || o;
  for (const [h, t] of e)
    s[h] = t;
  return s;
}, A = {
  name: "VueImageZoomer",
  emits: ["onZoom", "offZoom", "regularLoaded", "zoomLoaded", "zoomLoading", "regularError", "zoomError"],
  directives: {
    clickOutside: {
      mounted(o, e) {
        o.clickOutsideEvent = function(s) {
          o == s.target || o.contains(s.target) || e.value(s, o);
        }, document.addEventListener("click", o.clickOutsideEvent);
      },
      unmounted(o) {
        document.removeEventListener("click", o.clickOutsideEvent);
      }
    }
  },
  data() {
    return {
      touch: !1,
      zoomed: !1,
      x: 0,
      y: 0,
      touchPosition: 0,
      origX: 0,
      origY: 0,
      offsetLeft: 0,
      offsetTop: 0,
      zoomWidth: 0,
      zoomHeight: 0,
      zoomRatio: 0,
      options: {
        zoomAmount: 0,
        zoom: !1,
        zoomWebp: !1
      },
      loaded: !1,
      loading: !1,
      webp_supported: !1,
      cx: 0,
      cy: 0,
      showSlot: !0
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
      default: !0
    },
    showMessageTouch: {
      type: Boolean,
      default: !0
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
      default: !0
    },
    closeOnClickOutside: {
      type: Boolean,
      default: !0
    },
    edgeOffset: {
      type: Number,
      default: 0
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
    this.check_webp_feature("lossy", (e, s) => {
      s && (this.webp_supported = !0);
    }), this.get_options();
    const o = this.$refs["vue-hover-zs-regular"];
    o && o.complete && o.naturalWidth && (this.showSlot = !1, this.$emit("regularLoaded")), ("ontouchstart" in window || navigator.msMaxTouchPoints) && (this.touch = !0), this.touchLogic(), this.resizeHandler = this.debounce(() => {
      this.resize();
    }, 500), window.addEventListener("resize", this.resizeHandler);
  },
  unmounted() {
    window.removeEventListener("resize", this.resizeHandler);
  },
  methods: {
    async touchLogic() {
      await w();
      let o, e, s = !1;
      this.$refs["vue-hover-zs"].addEventListener("touchstart", (h) => {
        if (this.zoomed) {
          h.cancelable && h.preventDefault();
          let t = h.changedTouches[0];
          o = t.pageX - this.cx, e = t.pageY - this.cy;
        }
      }), this.$refs["vue-hover-zs"].addEventListener("touchmove", (h) => {
        if (this.zoomed) {
          let t = h.changedTouches[0];
          this.x = t.pageX - o, this.y = t.pageY - e, t.pageX - o <= this.origX - this.zoomWidth && (this.x = this.origX - this.zoomWidth), t.pageX - o >= 0 && (this.x = -1), t.pageY - e <= this.origY - this.zoomHeight && (this.y = this.origY - this.zoomHeight), t.pageY - e >= 0 && (this.y = -1), this.touchPosition = "translate3d(" + this.x + "px," + this.y + "px,0)", s = !0;
        }
      }), this.$refs["vue-hover-zs"].addEventListener("touchend", (h) => {
        if (this.zoomed) {
          let t = h.changedTouches[0];
          this.cx = t.pageX - o, this.cy = t.pageY - e, !s && this.tapToClose && (this.zoomed = !1, this.$emit("offZoom")), s = !1;
        }
      });
    },
    debounce(o, e) {
      let s;
      return (...h) => {
        const t = this;
        clearTimeout(s), s = setTimeout(() => o.apply(t, h), e);
      };
    },
    get_options() {
      this.options.zoomAmount = this.zoomAmount, this.options.zoom = this.zoom, this.options.zoomWebp = this.zoomWebp, this.zoom || (this.options.zoom = this.regular, this.options.zoomAmount = 2), !this.zoomWebp && this.regularWebp && (this.options.zoomWebp = this.regularWebp, this.options.zoomAmount = 2), this.resize();
    },
    resize() {
      this.zoomed = !1, this.loaded = !1;
    },
    check_webp_feature(o, e) {
      let s = {
        lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA"
      }, h = new Image();
      h.onload = () => {
        let t = h.width > 0 && h.height > 0;
        e(o, t);
      }, h.onerror = () => {
        e(o, !1);
      }, h.src = "data:image/webp;base64," + s[o];
    },
    loadImage(o, e, s) {
      const h = new Image();
      h.onload = e, h.onerror = s, h.src = o;
    },
    setZoomSize() {
      const o = this.zoomRatio || this.origY / this.origX;
      this.zoomWidth = this.origX * this.options.zoomAmount, this.zoomHeight = this.zoomWidth * o, this.zoomHeight < this.origY && (this.zoomHeight = this.origY, this.zoomWidth = this.origY / o);
    },
    loadZoom() {
      this.offset(), this.options.zoomAmount != 0 && (this.setZoomSize(), this.touch && this.mobilePos()), this.loaded ? this.zoomed = !0 : this.zoomLoad();
    },
    zoomLoad() {
      (!this.clickZoom || this.touch) && (this.loading = !0, this.$emit("zoomLoading"));
      let o = this.options.zoom;
      this.breakpoints && this.breakpoints.forEach((e) => {
        window.innerWidth >= e.width && (e.zoom ? o = e.zoom : o = e.regular);
      }), this.webp_supported && this.options.zoomWebp && (o = this.options.zoomWebp, this.breakpoints && this.breakpoints.forEach((e) => {
        window.innerWidth >= e.width && (e.zoomWebp ? o = e.zoomWebp : o = e.regularWebp);
      })), this.loadImage(o, (e) => {
        this.zoomRatio = e.target.height / e.target.width, this.options.zoomAmount == 0 && (this.options.zoomAmount = e.target.width / this.origX), this.setZoomSize(), this.loaded = !0, this.loading = !1, this.$emit("zoomLoaded"), (!this.clickZoom || this.touch) && (this.zoomed = !0, this.mobilePos());
      }, (e) => {
        this.loading = !1, this.$emit("zoomError", e);
      });
    },
    isZoom(o, e) {
      (e == "hover" && !this.clickZoom && !this.touch || e == "click" && (this.clickZoom || this.touch)) && (this.zoomed = !1, o == !0 ? (this.loadZoom(), this.$emit("onZoom")) : this.$emit("offZoom"));
    },
    clickOutside() {
      this.closeOnClickOutside && this.zoomed && (this.zoomed = !1, this.$emit("offZoom"));
    },
    edgePos(o) {
      const e = Math.min(Math.max(this.edgeOffset, 0), 0.49);
      return Math.min(Math.max((o - e) / (1 - 2 * e), 0), 1);
    },
    mobilePos() {
      let o = (this.zoomWidth - this.origX) * this.touchZoomPos[0], e = (this.zoomHeight - this.origY) * this.touchZoomPos[1];
      (this.touchZoomPos[0] > 1 || this.touchZoomPos[0] < 0 || this.touchZoomPos[1] > 1 || this.touchZoomPos[1] < 0) && (o = 0, e = 0), this.cx = -o, this.cy = -e, this.x = -o, this.y = -e, this.touchPosition = "translate3d(-" + o + "px,-" + e + "px,0)";
    },
    offset() {
      this.origX = parseFloat(this.$refs["vue-hover-zs"].offsetWidth), this.origY = parseFloat(this.$refs["vue-hover-zs"].offsetHeight);
    },
    mousePos(o) {
      this.offsetLeft = window.pageXOffset + this.$refs["vue-hover-zs"].getBoundingClientRect().left, this.offsetTop = window.pageYOffset + this.$refs["vue-hover-zs"].getBoundingClientRect().top, !this.touch && !this.loading && (this.loaded ? (this.x = this.edgePos((o.pageX - this.offsetLeft) / this.origX) * (this.zoomWidth - this.origX), this.y = this.edgePos((o.pageY - this.offsetTop) / this.origY) * (this.zoomHeight - this.origY)) : (this.offset(), this.zoomLoad()));
    }
  }
}, L = { class: "vh--outer vh--rel" }, Z = ["srcset", "media"], M = ["srcset", "media"], P = ["srcset"], T = ["loading", "src", "alt", "width", "height"], H = { key: 0 }, S = ["srcset", "media"], C = ["srcset", "media"], E = ["srcset", "media"], Y = ["srcset", "media"], X = ["srcset"], O = ["src"], B = ["src"], I = ["innerHTML"], V = ["innerHTML"], N = ["innerHTML"], R = {
  key: 1,
  class: "vh--loading-o vh--abs vh--flex vh--jc vh--ai"
};
function j(o, e, s, h, t, a) {
  const p = y("click-outside");
  return r(), l(u, null, [
    t.showSlot && !s.lazyload ? b(o.$slots, "default", { key: 0 }) : n("", !0),
    k((r(), l("div", L, [
      d("div", {
        class: m(["vh--holder vh--rel vh--flex vh--jc", { "vh--no-click": !s.rightClick }]),
        onMouseenter: e[2] || (e[2] = (i) => a.isZoom(!0, "hover")),
        onMouseleave: e[3] || (e[3] = (i) => a.isZoom(!1, "hover")),
        onMousemove: e[4] || (e[4] = (...i) => a.mousePos && a.mousePos(...i)),
        ref: "vue-hover-zs",
        onClick: e[5] || (e[5] = (i) => a.isZoom(!t.zoomed, "click"))
      }, [
        d("picture", {
          class: m({ "vh--none": t.zoomed })
        }, [
          (r(!0), l(u, null, c(s.breakpoints, (i) => (r(), l(u, {
            key: i.width
          }, [
            i.regularWebp ? (r(), l("source", {
              key: 0,
              srcset: i.regularWebp,
              type: "image/webp",
              media: "(min-width:" + i.width + "px)"
            }, null, 8, Z)) : n("", !0),
            i.regular ? (r(), l("source", {
              key: 1,
              srcset: i.regular,
              media: "(min-width:" + i.width + "px)"
            }, null, 8, M)) : n("", !0)
          ], 64))), 128)),
          s.regularWebp ? (r(), l("source", {
            key: 0,
            srcset: s.regularWebp,
            type: "image/webp"
          }, null, 8, P)) : n("", !0),
          d("img", {
            ref: "vue-hover-zs-regular",
            loading: s.lazyload ? "lazy" : "eager",
            src: s.regular,
            class: m(s.imgClass),
            alt: s.alt,
            onLoad: e[0] || (e[0] = (i) => (o.$emit("regularLoaded"), t.showSlot = !1)),
            width: s.imgWidth,
            height: s.imgHeight,
            onError: e[1] || (e[1] = (i) => o.$emit("regularError", i))
          }, null, 42, T)
        ], 2),
        t.zoomed ? (r(), l("picture", H, [
          (r(!0), l(u, null, c(s.breakpoints, (i) => (r(), l(u, {
            key: i.width
          }, [
            i.zoomWebp ? (r(), l("source", {
              key: 0,
              srcset: i.zoomWebp,
              type: "image/webp",
              media: "(min-width:" + i.width + "px)"
            }, null, 8, S)) : i.regularWebp ? (r(), l("source", {
              key: 1,
              srcset: i.regularWebp,
              type: "image/webp",
              media: "(min-width:" + i.width + "px)"
            }, null, 8, C)) : n("", !0),
            i.zoom ? (r(), l("source", {
              key: 2,
              srcset: i.zoom,
              media: "(min-width:" + i.width + "px)"
            }, null, 8, E)) : i.regular ? (r(), l("source", {
              key: 3,
              srcset: i.regular,
              media: "(min-width:" + i.width + "px)"
            }, null, 8, Y)) : n("", !0)
          ], 64))), 128)),
          t.options.zoomWebp ? (r(), l("source", {
            key: 0,
            srcset: t.options.zoomWebp,
            type: "image/webp"
          }, null, 8, X)) : n("", !0),
          t.touch ? (r(), l("img", {
            key: 2,
            src: t.options.zoom,
            class: "vh--image vh--abs",
            style: g("width:" + t.zoomWidth + "px;transform:" + t.touchPosition)
          }, null, 12, B)) : (r(), l("img", {
            key: 1,
            src: t.options.zoom,
            class: "vh--image vh--abs",
            style: g({ width: t.zoomWidth + "px", transform: "translate(-" + t.x + "px,-" + t.y + "px)" })
          }, null, 12, O))
        ])) : n("", !0),
        f(z, { name: "VueHoverfade" }, {
          default: v(() => [
            !t.zoomed && !t.loading && !s.clickZoom && !t.touch && s.showMessage ? (r(), l("div", {
              key: 0,
              class: m(["vh--message vh--abs vh--flex vh--jc vh--ai", "vh--message-" + s.messagePos]),
              innerHTML: s.hoverMessage
            }, null, 10, I)) : !t.zoomed && !t.loading && !t.touch && s.showMessage ? (r(), l("div", {
              key: 1,
              class: m(["vh--message vh--abs vh--flex vh--jc vh--ai", "vh--message-" + s.messagePos]),
              innerHTML: s.clickMessage
            }, null, 10, V)) : !t.zoomed && !t.loading && t.touch && s.showMessageTouch ? (r(), l("div", {
              key: 2,
              class: m(["vh--message vh--abs vh--flex vh--jc vh--ai", "vh--message-" + s.messagePos]),
              innerHTML: s.touchMessage
            }, null, 10, N)) : n("", !0)
          ]),
          _: 1
        })
      ], 34),
      f(z, { name: "VueHoverfade" }, {
        default: v(() => [
          t.touch && t.zoomed && t.loaded && !s.tapToClose ? (r(), l("div", {
            key: 0,
            class: m(["vh--close vh--abs vh--flex vh--jc vh--ai", "vh--" + s.closePos]),
            onClick: e[6] || (e[6] = W((i) => (t.zoomed = !1, o.$emit("offZoom")), ["stop"])),
            innerHTML: "×"
          }, null, 2)) : t.loading ? (r(), l("div", R, e[7] || (e[7] = [
            d("div", {
              class: "vh--loading",
              innerHTML: "◠"
            }, null, -1)
          ]))) : n("", !0)
        ]),
        _: 1
      })
    ])), [
      [p, a.clickOutside],
      [x, !t.showSlot || s.lazyload]
    ])
  ], 64);
}
const D = /* @__PURE__ */ _(A, [["render", j]]), Q = {
  install: (o, e) => {
    o.component("VueImageZoomer", D);
  }
};
export {
  D as VueImageZoomer,
  Q as default
};
