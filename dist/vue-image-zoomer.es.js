import { nextTick as w, resolveDirective as y, openBlock as h, createElementBlock as n, Fragment as a, renderSlot as b, createCommentVNode as m, withDirectives as _, createElementVNode as d, normalizeClass as r, renderList as c, normalizeStyle as g, createVNode as f, Transition as v, withCtx as z, withModifiers as A, vShow as k } from "vue";
const W = (e, o) => {
  const s = e.__vccOpts || e;
  for (const [l, t] of o)
    s[l] = t;
  return s;
}, x = {
  name: "VueImageZoomer",
  emits: ["onZoom", "offZoom", "regularLoaded", "zoomLoaded", "zoomLoading"],
  directives: {
    clickOutside: {
      mounted(e, o) {
        e.clickOutsideEvent = function(s) {
          e == s.target || e.contains(s.target) || o.value(s, e);
        }, document.body.addEventListener("click", e.clickOutsideEvent);
      },
      unmounted(e) {
        document.body.removeEventListener("click", e.clickOutsideEvent);
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
    this.check_webp_feature("lossy", (e, o) => {
      o && (this.webp_supported = !0);
    }), this.get_options(), ("ontouchstart" in window || navigator.msMaxTouchPoints) && (this.touch = !0), this.touchLogic();
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
      await w();
      let e, o, s = !1;
      this.$refs["vue-hover-zs"].addEventListener("touchstart", (l) => {
        if (this.zoomed) {
          l.cancelable && l.preventDefault();
          let t = l.changedTouches[0];
          e = t.pageX - this.cx, o = t.pageY - this.cy;
        }
      }), this.$refs["vue-hover-zs"].addEventListener("touchmove", (l) => {
        if (this.zoomed) {
          let t = l.changedTouches[0];
          this.x = t.pageX - e, this.y = t.pageY - o, t.pageX - e <= this.origX - this.zoomWidth && (this.x = this.origX - this.zoomWidth), t.pageX - e >= 0 && (this.x = -1), t.pageY - o <= this.origY - this.options.zoomAmount * this.origY && (this.y = this.origY - this.options.zoomAmount * this.origY), t.pageY - o >= 0 && (this.y = -1), this.touchPosition = "translate3d(" + this.x + "px," + this.y + "px,0)", s = !0;
        }
      }), this.$refs["vue-hover-zs"].addEventListener("touchend", (l) => {
        if (this.zoomed) {
          let t = l.changedTouches[0];
          this.cx = t.pageX - e, this.cy = t.pageY - o, !s && this.tapToClose && (this.zoomed = !1, this.$emit("offZoom")), s = !1;
        }
      });
    },
    debounce(e, o) {
      let s;
      return (...l) => {
        const t = this;
        clearTimeout(s), s = setTimeout(() => e.apply(t, l), o);
      };
    },
    get_options() {
      this.options.zoomAmount = this.zoomAmount, this.options.zoom = this.zoom, this.options.zoomWebp = this.zoomWebp, this.zoom || (this.options.zoom = this.regular, this.options.zoomAmount = 2), !this.zoomWebp && this.regularWebp && (this.options.zoomWebp = this.regularWebp, this.options.zoomAmount = 2), this.resize();
    },
    resize() {
      this.zoomed = !1, this.loaded = !1;
    },
    check_webp_feature(e, o) {
      let s = {
        lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA"
      }, l = new Image();
      l.onload = () => {
        let t = l.width > 0 && l.height > 0;
        o(e, t);
      }, l.onerror = () => {
        o(e, !1);
      }, l.src = "data:image/webp;base64," + s[e];
    },
    loadImage(e, o) {
      const s = new Image();
      s.onload = o, s.src = e;
    },
    loadZoom() {
      this.offset(), this.options.zoomAmount != 0 && (this.zoomWidth = this.origX * this.options.zoomAmount, this.zoomHeight = this.origY * this.options.zoomAmount, this.touch && this.mobilePos()), this.loaded ? (this.zoomed = !0, this.options.zoomAmount == 0 && (this.options.zoomAmount = this.zoomWidth / this.origX)) : this.zoomLoad();
    },
    zoomLoad() {
      (!this.clickZoom || this.touch) && (this.loading = !0, this.$emit("zoomLoading"));
      let e = this.options.zoom;
      this.breakpoints && this.breakpoints.forEach((o) => {
        window.innerWidth >= o.width && (o.zoom ? e = o.zoom : e = o.regular);
      }), this.webp_supported && this.options.zoomWebp && (e = this.options.zoomWebp, this.breakpoints && this.breakpoints.forEach((o) => {
        window.innerWidth >= o.width && (o.zoomWebp ? e = o.zoomWebp : e = o.regularWebp);
      })), this.loadImage(e, (o) => {
        this.options.zoomAmount == 0 && (this.zoomWidth = o.target.width, this.zoomHeight = o.target.height, this.options.zoomAmount = o.target.width / this.origX), this.loaded = !0, this.loading = !1, this.$emit("zoomLoaded"), (!this.clickZoom || this.touch) && (this.zoomed = !0, this.mobilePos());
      });
    },
    isZoom(e, o) {
      (o == "hover" && !this.clickZoom && !this.touch || o == "click" && (this.clickZoom || this.touch) || typeof e == "object") && (this.zoomed = !1, e == !0 ? (this.loadZoom(), this.$emit("onZoom")) : this.$emit("offZoom"));
    },
    mobilePos() {
      let e = (this.zoomWidth - this.origX) * this.touchZoomPos[0], o = (this.zoomHeight - this.origY) * this.touchZoomPos[1];
      (this.touchZoomPos[0] > 1 || this.touchZoomPos[0] < 0 || this.touchZoomPos[1] > 1 || this.touchZoomPos[1] < 0) && (e = 0, o = 0), this.cx = -e, this.cy = -o, this.x = -e, this.y = -o, this.touchPosition = "translate3d(-" + e + "px,-" + o + "px,0)";
    },
    offset() {
      this.origX = parseFloat(this.$refs["vue-hover-zs"].offsetWidth), this.origY = parseFloat(this.$refs["vue-hover-zs"].offsetHeight);
    },
    mousePos(e) {
      this.offsetLeft = window.pageXOffset + this.$refs["vue-hover-zs"].getBoundingClientRect().left, this.offsetTop = window.pageYOffset + this.$refs["vue-hover-zs"].getBoundingClientRect().top, !this.touch && !this.loading && (this.loaded ? (this.x = (e.pageX - this.offsetLeft) * (this.options.zoomAmount - 1), this.y = (e.pageY - this.offsetTop) * (this.options.zoomAmount - 1)) : (this.offset(), this.zoomLoad()));
    }
  }
}, L = { class: "vh--outer vh--rel" }, Z = ["srcset", "media"], T = ["srcset", "media"], M = ["srcset"], P = ["loading", "src", "alt", "width", "height"], S = { key: 0 }, C = ["srcset", "media"], H = ["srcset", "media"], X = ["srcset", "media"], Y = ["srcset", "media"], E = ["src"], B = ["src"], I = ["src"], V = ["innerHTML"], j = ["innerHTML"], O = ["innerHTML"], N = {
  key: 1,
  class: "vh--loading-o vh--abs vh--flex vh--jc vh--ai"
};
function D(e, o, s, l, t, u) {
  const p = y("click-outside");
  return h(), n(a, null, [
    t.showSlot && !s.lazyload ? b(e.$slots, "default", { key: 0 }) : m("", !0),
    _((h(), n("div", L, [
      d("div", {
        class: r(["vh--holder vh--rel vh--flex vh--jc", { "vh--no-click": !s.rightClick }]),
        onMouseenter: o[1] || (o[1] = (i) => u.isZoom(!0, "hover")),
        onMouseleave: o[2] || (o[2] = (i) => u.isZoom(!1, "hover")),
        onMousemove: o[3] || (o[3] = (...i) => u.mousePos && u.mousePos(...i)),
        ref: "vue-hover-zs",
        onClick: o[4] || (o[4] = (i) => u.isZoom(!t.zoomed, "click"))
      }, [
        d("picture", {
          class: r({ "vh--none": t.zoomed })
        }, [
          (h(!0), n(a, null, c(s.breakpoints, (i) => (h(), n(a, {
            key: i.width
          }, [
            i.regularWebp ? (h(), n("source", {
              key: 0,
              srcset: i.regularWebp,
              type: "image/webp",
              media: "(min-width:" + i.width + "px)"
            }, null, 8, Z)) : m("", !0),
            i.regular ? (h(), n("source", {
              key: 1,
              srcset: i.regular,
              media: "(min-width:" + i.width + "px)"
            }, null, 8, T)) : m("", !0)
          ], 64))), 128)),
          s.regularWebp ? (h(), n("source", {
            key: 0,
            srcset: s.regularWebp,
            type: "image/webp"
          }, null, 8, M)) : m("", !0),
          d("img", {
            loading: s.lazyload ? "lazy" : "eager",
            src: s.regular,
            class: r(s.imgClass),
            alt: s.alt,
            onLoad: o[0] || (o[0] = (i) => (e.$emit("regularLoaded"), t.showSlot = !1)),
            width: s.imgWidth,
            height: s.imgHeight
          }, null, 42, P)
        ], 2),
        t.zoomed ? (h(), n("picture", S, [
          (h(!0), n(a, null, c(s.breakpoints, (i) => (h(), n(a, {
            key: i.width
          }, [
            i.zoomWebp ? (h(), n("source", {
              key: 0,
              srcset: i.zoomWebp,
              type: "image/webp",
              media: "(min-width:" + i.width + "px)"
            }, null, 8, C)) : i.regularWebp ? (h(), n("source", {
              key: 1,
              srcset: i.regularWebp,
              type: "image/webp",
              media: "(min-width:" + i.width + "px)"
            }, null, 8, H)) : m("", !0),
            i.zoom ? (h(), n("source", {
              key: 2,
              srcset: i.zoom,
              media: "(min-width:" + i.width + "px)"
            }, null, 8, X)) : i.regular ? (h(), n("source", {
              key: 3,
              srcset: i.regular,
              media: "(min-width:" + i.width + "px)"
            }, null, 8, Y)) : m("", !0)
          ], 64))), 128)),
          t.options.zoomWebp ? (h(), n("source", {
            key: 0,
            src: t.options.zoomWebp,
            type: "image/webp"
          }, null, 8, E)) : m("", !0),
          t.touch ? (h(), n("img", {
            key: 2,
            src: t.options.zoom,
            class: "vh--image vh--abs",
            style: g("width:" + t.zoomWidth + "px;transform:" + t.touchPosition)
          }, null, 12, I)) : (h(), n("img", {
            key: 1,
            src: t.options.zoom,
            class: "vh--image vh--abs",
            style: g({ width: t.zoomWidth + "px", transform: "translate(-" + t.x + "px,-" + t.y + "px)" })
          }, null, 12, B))
        ])) : m("", !0),
        f(v, { name: "VueHoverfade" }, {
          default: z(() => [
            !t.zoomed && !t.loading && !s.clickZoom && !t.touch && s.showMessage ? (h(), n("div", {
              key: 0,
              class: r(["vh--message vh--abs vh--flex vh--jc vh--ai", "vh--message-" + s.messagePos]),
              innerHTML: s.hoverMessage
            }, null, 10, V)) : !t.zoomed && !t.loading && !t.touch && s.showMessage ? (h(), n("div", {
              key: 1,
              class: r(["vh--message vh--abs vh--flex vh--jc vh--ai", "vh--message-" + s.messagePos]),
              innerHTML: s.clickMessage
            }, null, 10, j)) : !t.zoomed && !t.loading && t.touch && s.showMessageTouch ? (h(), n("div", {
              key: 2,
              class: r(["vh--message vh--abs vh--flex vh--jc vh--ai", "vh--message-" + s.messagePos]),
              innerHTML: s.touchMessage
            }, null, 10, O)) : m("", !0)
          ]),
          _: 1
        })
      ], 34),
      f(v, { name: "VueHoverfade" }, {
        default: z(() => [
          t.touch && t.zoomed && t.loaded && !s.tapToClose ? (h(), n("div", {
            key: 0,
            class: r(["vh--close vh--abs vh--flex vh--jc vh--ai", "vh--" + s.closePos]),
            onClick: o[5] || (o[5] = A((i) => (t.zoomed = !1, e.$emit("offZoom")), ["stop"])),
            innerHTML: "×"
          }, null, 2)) : t.loading ? (h(), n("div", N, o[6] || (o[6] = [
            d("div", {
              class: "vh--loading",
              innerHTML: "◠"
            }, null, -1)
          ]))) : m("", !0)
        ]),
        _: 1
      })
    ])), [
      [p, u.isZoom],
      [k, !t.showSlot || s.lazyload]
    ])
  ], 64);
}
const R = /* @__PURE__ */ W(x, [["render", D]]), Q = {
  install: (e, o) => {
    e.component("VueImageZoomer", R);
  }
};
export {
  R as VueImageZoomer,
  Q as default
};
