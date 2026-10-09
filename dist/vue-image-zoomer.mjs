import { nextTick as y, resolveDirective as w, openBlock as r, createElementBlock as l, Fragment as u, renderSlot as b, createCommentVNode as m, withDirectives as k, createElementVNode as d, normalizeClass as a, renderList as c, normalizeStyle as g, createVNode as f, Transition as z, withCtx as v, withModifiers as W, vShow as Z } from "vue";
const x = (e, o) => {
  const s = e.__vccOpts || e;
  for (const [i, t] of o)
    s[i] = t;
  return s;
}, _ = {
  name: "VueImageZoomer",
  emits: ["onZoom", "offZoom", "regularLoaded", "zoomLoaded", "zoomLoading", "regularError", "zoomError"],
  directives: {
    clickOutside: {
      mounted(e, o) {
        e.clickOutsideEvent = function(s) {
          e == s.target || e.contains(s.target) || o.value(s, e);
        }, document.addEventListener("click", e.clickOutsideEvent);
      },
      unmounted(e) {
        document.removeEventListener("click", e.clickOutsideEvent);
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
    this.check_webp_feature("lossy", (o, s) => {
      s && (this.webp_supported = !0);
    }), this.get_options();
    const e = this.$refs["vue-hover-zs-regular"];
    e && e.complete && e.naturalWidth && (this.showSlot = !1, this.$emit("regularLoaded")), ("ontouchstart" in window || navigator.msMaxTouchPoints) && (this.touch = !0), this.touchLogic(), this.resizeHandler = this.debounce(() => {
      this.resize();
    }, 500), window.addEventListener("resize", this.resizeHandler);
  },
  unmounted() {
    window.removeEventListener("resize", this.resizeHandler);
  },
  methods: {
    async touchLogic() {
      await y();
      let e, o, s = !1;
      this.$refs["vue-hover-zs"].addEventListener("touchstart", (i) => {
        if (this.zoomed) {
          i.cancelable && i.preventDefault();
          let t = i.changedTouches[0];
          e = t.pageX - this.cx, o = t.pageY - this.cy;
        }
      }), this.$refs["vue-hover-zs"].addEventListener("touchmove", (i) => {
        if (this.zoomed) {
          let t = i.changedTouches[0];
          this.x = t.pageX - e, this.y = t.pageY - o, t.pageX - e <= this.origX - this.zoomWidth && (this.x = this.origX - this.zoomWidth), t.pageX - e >= 0 && (this.x = -1), t.pageY - o <= this.origY - this.zoomHeight && (this.y = this.origY - this.zoomHeight), t.pageY - o >= 0 && (this.y = -1), this.touchPosition = "translate3d(" + this.x + "px," + this.y + "px,0)", s = !0;
        }
      }), this.$refs["vue-hover-zs"].addEventListener("touchend", (i) => {
        if (this.zoomed) {
          let t = i.changedTouches[0];
          this.cx = t.pageX - e, this.cy = t.pageY - o, !s && this.tapToClose && (this.zoomed = !1, this.$emit("offZoom")), s = !1;
        }
      });
    },
    debounce(e, o) {
      let s;
      return (...i) => {
        const t = this;
        clearTimeout(s), s = setTimeout(() => e.apply(t, i), o);
      };
    },
    get_options() {
      this.options.zoomAmount = this.zoomAmount, this.options.zoom = this.zoom, this.options.zoomWebp = this.zoomWebp, this.zoom || (this.options.zoom = this.regular, this.zoomWebp || (this.options.zoomWebp = this.regularWebp), this.options.zoomAmount = this.zoomAmount || 2), this.resize();
    },
    resize() {
      this.zoomed = !1, this.loaded = !1;
    },
    check_webp_feature(e, o) {
      let s = {
        lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA"
      }, i = new Image();
      i.onload = () => {
        let t = i.width > 0 && i.height > 0;
        o(e, t);
      }, i.onerror = () => {
        o(e, !1);
      }, i.src = "data:image/webp;base64," + s[e];
    },
    breakpointZoom(e) {
      return e.zoom ? { zoom: e.zoom, zoomWebp: e.zoomWebp } : { zoom: e.regular, zoomWebp: e.zoomWebp || e.regularWebp };
    },
    loadImage(e, o, s) {
      const i = new Image();
      i.onload = o, i.onerror = s, i.src = e;
    },
    setZoomSize() {
      const e = this.zoomRatio || this.origY / this.origX;
      this.zoomWidth = this.origX * this.options.zoomAmount, this.zoomHeight = this.zoomWidth * e, this.zoomHeight < this.origY && (this.zoomHeight = this.origY, this.zoomWidth = this.origY / e);
    },
    loadZoom() {
      this.offset(), this.options.zoomAmount != 0 && (this.setZoomSize(), this.touch && this.mobilePos()), this.loaded ? this.zoomed = !0 : this.zoomLoad();
    },
    zoomLoad() {
      (!this.clickZoom || this.touch) && (this.loading = !0, this.$emit("zoomLoading"));
      const e = this.breakpoints && this.breakpoints.find((i) => window.innerWidth >= i.width), o = e ? this.breakpointZoom(e) : this.options;
      let s = o.zoom;
      this.webp_supported && o.zoomWebp && (s = o.zoomWebp), this.loadImage(s, (i) => {
        this.zoomRatio = i.target.height / i.target.width, this.options.zoomAmount == 0 && (this.options.zoomAmount = i.target.width / this.origX), this.setZoomSize(), this.loaded = !0, this.loading = !1, this.$emit("zoomLoaded"), (!this.clickZoom || this.touch) && (this.zoomed = !0, this.mobilePos());
      }, (i) => {
        this.loading = !1, this.$emit("zoomError", i);
      });
    },
    isZoom(e, o) {
      (o == "hover" && !this.clickZoom && !this.touch || o == "click" && (this.clickZoom || this.touch)) && (this.zoomed = !1, e == !0 ? (this.loadZoom(), this.$emit("onZoom")) : this.$emit("offZoom"));
    },
    clickOutside() {
      this.closeOnClickOutside && this.zoomed && (this.zoomed = !1, this.$emit("offZoom"));
    },
    edgePos(e) {
      const o = Math.min(Math.max(this.edgeOffset, 0), 0.49);
      return Math.min(Math.max((e - o) / (1 - 2 * o), 0), 1);
    },
    mobilePos() {
      let e = (this.zoomWidth - this.origX) * this.touchZoomPos[0], o = (this.zoomHeight - this.origY) * this.touchZoomPos[1];
      (this.touchZoomPos[0] > 1 || this.touchZoomPos[0] < 0 || this.touchZoomPos[1] > 1 || this.touchZoomPos[1] < 0) && (e = 0, o = 0), this.cx = -e, this.cy = -o, this.x = -e, this.y = -o, this.touchPosition = "translate3d(-" + e + "px,-" + o + "px,0)";
    },
    offset() {
      this.origX = parseFloat(this.$refs["vue-hover-zs"].offsetWidth), this.origY = parseFloat(this.$refs["vue-hover-zs"].offsetHeight);
    },
    mousePos(e) {
      this.offsetLeft = window.pageXOffset + this.$refs["vue-hover-zs"].getBoundingClientRect().left, this.offsetTop = window.pageYOffset + this.$refs["vue-hover-zs"].getBoundingClientRect().top, !this.touch && !this.loading && (this.loaded ? (this.x = this.edgePos((e.pageX - this.offsetLeft) / this.origX) * (this.zoomWidth - this.origX), this.y = this.edgePos((e.pageY - this.offsetTop) / this.origY) * (this.zoomHeight - this.origY)) : (this.offset(), this.zoomLoad()));
    }
  }
}, A = { class: "vh--outer vh--rel" }, L = ["srcset", "media"], M = ["srcset", "media"], P = ["srcset"], T = ["loading", "src", "alt", "width", "height"], H = { key: 0 }, S = ["srcset", "media"], C = ["srcset", "media"], Y = ["srcset"], X = ["src"], E = ["src"], O = ["innerHTML"], B = ["innerHTML"], I = ["innerHTML"], V = {
  key: 1,
  class: "vh--loading-o vh--abs vh--flex vh--jc vh--ai"
};
function N(e, o, s, i, t, n) {
  const p = w("click-outside");
  return r(), l(u, null, [
    t.showSlot && !s.lazyload ? b(e.$slots, "default", { key: 0 }) : m("", !0),
    k((r(), l("div", A, [
      d("div", {
        class: a(["vh--holder vh--rel vh--flex vh--jc", { "vh--no-click": !s.rightClick }]),
        onMouseenter: o[2] || (o[2] = (h) => n.isZoom(!0, "hover")),
        onMouseleave: o[3] || (o[3] = (h) => n.isZoom(!1, "hover")),
        onMousemove: o[4] || (o[4] = (...h) => n.mousePos && n.mousePos(...h)),
        ref: "vue-hover-zs",
        onClick: o[5] || (o[5] = (h) => n.isZoom(!t.zoomed, "click"))
      }, [
        d("picture", {
          class: a({ "vh--none": t.zoomed })
        }, [
          (r(!0), l(u, null, c(s.breakpoints, (h) => (r(), l(u, {
            key: h.width
          }, [
            h.regularWebp ? (r(), l("source", {
              key: 0,
              srcset: h.regularWebp,
              type: "image/webp",
              media: "(min-width:" + h.width + "px)"
            }, null, 8, L)) : m("", !0),
            h.regular ? (r(), l("source", {
              key: 1,
              srcset: h.regular,
              media: "(min-width:" + h.width + "px)"
            }, null, 8, M)) : m("", !0)
          ], 64))), 128)),
          s.regularWebp ? (r(), l("source", {
            key: 0,
            srcset: s.regularWebp,
            type: "image/webp"
          }, null, 8, P)) : m("", !0),
          d("img", {
            ref: "vue-hover-zs-regular",
            loading: s.lazyload ? "lazy" : "eager",
            src: s.regular,
            class: a(s.imgClass),
            alt: s.alt,
            onLoad: o[0] || (o[0] = (h) => (e.$emit("regularLoaded"), t.showSlot = !1)),
            width: s.imgWidth,
            height: s.imgHeight,
            onError: o[1] || (o[1] = (h) => e.$emit("regularError", h))
          }, null, 42, T)
        ], 2),
        t.zoomed ? (r(), l("picture", H, [
          (r(!0), l(u, null, c(s.breakpoints, (h) => (r(), l(u, {
            key: h.width
          }, [
            n.breakpointZoom(h).zoomWebp ? (r(), l("source", {
              key: 0,
              srcset: n.breakpointZoom(h).zoomWebp,
              type: "image/webp",
              media: "(min-width:" + h.width + "px)"
            }, null, 8, S)) : m("", !0),
            n.breakpointZoom(h).zoom ? (r(), l("source", {
              key: 1,
              srcset: n.breakpointZoom(h).zoom,
              media: "(min-width:" + h.width + "px)"
            }, null, 8, C)) : m("", !0)
          ], 64))), 128)),
          t.options.zoomWebp ? (r(), l("source", {
            key: 0,
            srcset: t.options.zoomWebp,
            type: "image/webp"
          }, null, 8, Y)) : m("", !0),
          t.touch ? (r(), l("img", {
            key: 2,
            src: t.options.zoom,
            class: "vh--image vh--abs",
            style: g("width:" + t.zoomWidth + "px;transform:" + t.touchPosition)
          }, null, 12, E)) : (r(), l("img", {
            key: 1,
            src: t.options.zoom,
            class: "vh--image vh--abs",
            style: g({ width: t.zoomWidth + "px", transform: "translate(-" + t.x + "px,-" + t.y + "px)" })
          }, null, 12, X))
        ])) : m("", !0),
        f(z, { name: "VueHoverfade" }, {
          default: v(() => [
            !t.zoomed && !t.loading && !s.clickZoom && !t.touch && s.showMessage ? (r(), l("div", {
              key: 0,
              class: a(["vh--message vh--abs vh--flex vh--jc vh--ai", "vh--message-" + s.messagePos]),
              innerHTML: s.hoverMessage
            }, null, 10, O)) : !t.zoomed && !t.loading && !t.touch && s.showMessage ? (r(), l("div", {
              key: 1,
              class: a(["vh--message vh--abs vh--flex vh--jc vh--ai", "vh--message-" + s.messagePos]),
              innerHTML: s.clickMessage
            }, null, 10, B)) : !t.zoomed && !t.loading && t.touch && s.showMessageTouch ? (r(), l("div", {
              key: 2,
              class: a(["vh--message vh--abs vh--flex vh--jc vh--ai", "vh--message-" + s.messagePos]),
              innerHTML: s.touchMessage
            }, null, 10, I)) : m("", !0)
          ]),
          _: 1
        })
      ], 34),
      f(z, { name: "VueHoverfade" }, {
        default: v(() => [
          t.touch && t.zoomed && t.loaded && !s.tapToClose ? (r(), l("div", {
            key: 0,
            class: a(["vh--close vh--abs vh--flex vh--jc vh--ai", "vh--" + s.closePos]),
            onClick: o[6] || (o[6] = W((h) => (t.zoomed = !1, e.$emit("offZoom")), ["stop"])),
            innerHTML: "×"
          }, null, 2)) : t.loading ? (r(), l("div", V, o[7] || (o[7] = [
            d("div", {
              class: "vh--loading",
              innerHTML: "◠"
            }, null, -1)
          ]))) : m("", !0)
        ]),
        _: 1
      })
    ])), [
      [p, n.clickOutside],
      [Z, !t.showSlot || s.lazyload]
    ])
  ], 64);
}
const R = /* @__PURE__ */ x(_, [["render", N]]), D = {
  install: (e, o) => {
    e.component("VueImageZoomer", R);
  }
};
export {
  R as VueImageZoomer,
  D as default
};
