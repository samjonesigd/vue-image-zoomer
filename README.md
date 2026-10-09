# Vue Image Zoomer (Vue 2)

Lightweight, responsive image zoom component for Vue 2. Hover (or click) to zoom on desktop, tap and drag to zoom on touch devices. Ideal for product images on ecommerce sites.

**[Demo](https://samueljon.es/vue-image-zoomer)**

> This is the legacy version for Vue 2. For Vue 3, use the [latest version](https://www.npmjs.com/package/vue-image-zoomer).

- **Fast page loads**: the zoom image only loads when it's needed
- **Touch support**: tap to zoom, drag to pan, with a close button or tap to close
- **WebP** with automatic jpg/png fallback for browsers that don't support it
- **Breakpoints** to serve different images at different screen sizes
- **Lazyloading** and a placeholder slot to reduce layout shift
- **Nuxt 2 / SSR** compatible
- **TypeScript** declarations included
- No stylesheet to import, styles are included

<a href="https://www.buymeacoffee.com/samueljones" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

## Contents

- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [Props](#props)
- [Events](#events)
- [License](#license)

## Installation

```sh
npm i vue-image-zoomer@legacy
```

## Setup

### Global registration

```js
import Vue from 'vue';
import ImageZoom from 'vue-image-zoomer';

Vue.component('image-zoom', ImageZoom);
```

### Local registration

```js
import ImageZoom from 'vue-image-zoomer';

export default {
  components: {
    ImageZoom
  }
};
```

### CommonJS

```js
const ImageZoom = require('vue-image-zoomer').default;
```

### Nuxt 2

Create a plugin, e.g. `plugins/vue-image-zoomer.js`:

```js
import Vue from 'vue';
import ImageZoom from 'vue-image-zoomer';

Vue.component('image-zoom', ImageZoom);
```

Then add it to `nuxt.config.js`:

```js
export default {
  plugins: ['~/plugins/vue-image-zoomer.js']
};
```

### TypeScript

Type declarations are included, as well as the `ImageZoomProps` and `ImageZoomBreakpoint` types:

```ts
import type { ImageZoomBreakpoint } from 'vue-image-zoomer';
```

## Usage

### Basic

```html
<!-- Zoom image (recommended for a sharp zoom) -->
<image-zoom
  regular="/img/product.jpg"
  zoom="/img/product-zoom.jpg"
  alt="Product">
</image-zoom>

<!-- No zoom image: the regular image is zoomed 2x -->
<image-zoom regular="/img/product.jpg"></image-zoom>
```

By default the zoom image is shown at its natural size. Use `zoom-amount` to set it to a multiple of the regular image's displayed size instead:

```html
<image-zoom
  regular="/img/product.jpg"
  zoom="/img/product-zoom.jpg"
  :zoom-amount="3">
</image-zoom>
```

### Click to zoom

Mouse devices zoom on hover by default. Use `click-zoom` to zoom on click instead. Touch devices always use tap to zoom.

```html
<image-zoom
  regular="/img/product.jpg"
  zoom="/img/product-zoom.jpg"
  click-zoom>
</image-zoom>
```

Clicking outside the image closes the zoom. Add `:close-on-click-outside="false"` to keep it open.

### Edge offset

To see the edge of the zoom image, the cursor normally has to reach the very edge of the image. `edge-offset` makes the edges reachable sooner. For example, `0.1` means the zoom is fully panned once the cursor is within 10% of an edge.

```html
<image-zoom
  regular="/img/product.jpg"
  zoom="/img/product-zoom.jpg"
  :edge-offset="0.1">
</image-zoom>
```

### WebP

The jpg/png images are used as a fallback in browsers that don't support WebP.

```html
<image-zoom
  regular="/img/product.jpg"
  regular-webp="/img/product.webp"
  zoom="/img/product-zoom.jpg"
  zoom-webp="/img/product-zoom.webp">
</image-zoom>
```

If there's no `zoom` image, `regular-webp` is used for the zoom too. If there's a `zoom` image but no `zoom-webp`, the `zoom` image is used.

### Breakpoints

Serve different images at different screen sizes, for example higher resolution images on desktop. Each `width` is a minimum browser width in pixels. **List breakpoints from largest to smallest width.** The `regular` and `zoom` props are used below the smallest breakpoint.

`width` and `regular` are required. `zoom`, `regularWebp` and `zoomWebp` are optional.

```html
<image-zoom
  regular="/img/product-sm.jpg"
  regular-webp="/img/product-sm.webp"
  zoom="/img/product-sm-zoom.jpg"
  zoom-webp="/img/product-sm-zoom.webp"
  :breakpoints="[
    {
      width: 1200,
      regular: '/img/product-lg.jpg',
      regularWebp: '/img/product-lg.webp',
      zoom: '/img/product-lg-zoom.jpg',
      zoomWebp: '/img/product-lg-zoom.webp'
    },
    {
      width: 992,
      regular: '/img/product-md.jpg',
      regularWebp: '/img/product-md.webp',
      zoom: '/img/product-md-zoom.jpg',
      zoomWebp: '/img/product-md-zoom.webp'
    }
  ]">
</image-zoom>
```

### Placeholder

Content in the default slot is shown until the regular image has loaded, which helps reduce layout shift. A small, low resolution version of the image works well. The slot isn't shown when `lazyload` is set.

```html
<image-zoom regular="/img/product.jpg" zoom="/img/product-zoom.jpg">
  <img src="/img/product-tiny.jpg" alt="Product" />
</image-zoom>
```

### Error handling

```html
<image-zoom
  :regular="regular"
  :zoom="zoom"
  @regular-error="regular = '/img/fallback.jpg'"
  @zoom-error="zoom = '/img/fallback-zoom.jpg'">
</image-zoom>
```

### Zoom images with a different aspect ratio

The zoom image doesn't need the same aspect ratio as the regular image. The component stays the size of the regular image, so there's no page jump, and the whole zoom image can be panned. A zoom image too short to fill the component is scaled up to cover it.

### Carousels and sliders

Tested and works well with [Vue Carousel](https://www.npmjs.com/package/vue-carousel).

## Props

| Prop | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| `regular` | String | | **Required.** Path to the regular image. |
| `zoom` | String | `regular` at 2x | **Recommended.** Path to the zoom image. |
| `regular-webp` | String | | Path to a WebP version of the regular image. |
| `zoom-webp` | String | `regular-webp` if there's no `zoom` | Path to a WebP version of the zoom image. |
| `zoom-amount` | Number | Zoom image's natural size, or `2` with no `zoom` | How much to zoom, as a multiple of the regular image's displayed size, e.g. `2`. |
| `breakpoints` | Array | | Different images at different screen sizes. See [Breakpoints](#breakpoints). |
| `alt` | String | | Alt text for the regular image. |
| `img-class` | String | | Class for the regular image, e.g. `img-fluid` in Bootstrap. |
| `lazyload` | Boolean | `false` | Lazyload the regular image using the native `loading` attribute. |
| `click-zoom` | Boolean | `false` | Zoom on click instead of hover on mouse devices. |
| `close-on-click-outside` | Boolean | `true` | Close the zoom when clicking or tapping outside the image. |
| `edge-offset` | Number | `0` | Fraction of the image (0 to 0.49) at each edge where the zoom is already fully panned to that edge. See [Edge offset](#edge-offset). |
| `tap-to-close` | Boolean | `false` | Close the zoom with a tap on touch devices instead of a close button. |
| `touch-zoom-pos` | Array | `[0.5, 0.5]` | Where the zoom starts on touch devices, as `[x, y]` from the top left between 0 and 1. `[0.5, 0.5]` is the centre, `[0, 0]` is the top left. |
| `close-pos` | String | `top-left` | Position of the close button on touch devices: `top-left`, `top-right`, `top-center`, `bottom-left`, `bottom-right` or `bottom-center`. |
| `show-message` | Boolean | `true` | Show the zoom message on mouse devices. |
| `show-message-touch` | Boolean | `true` | Show the zoom message on touch devices. |
| `message-pos` | String | `bottom` | Position of the zoom message: `top` or `bottom`. |
| `hover-message` | String | `Hover to zoom` | Message shown on hover zoom. Accepts HTML. |
| `click-message` | String | `Click to zoom` | Message shown on click zoom. Accepts HTML. |
| `touch-message` | String | `Tap to zoom` | Message shown on touch devices. Accepts HTML. |

> The message props are rendered as HTML, so don't pass them unsanitised user input.

## Events

| Event | Payload | Description |
|:------|:--------|:------------|
| `regular-loaded` | | The regular image has loaded. |
| `regular-error` | `Event` | The regular image failed to load. |
| `zoom-loading` | | The zoom image has started loading. |
| `zoom-loaded` | | The zoom image has loaded. |
| `zoom-error` | `Event` | The zoom image failed to load. |
| `on-zoom` | | Zoom started. |
| `off-zoom` | | Zoom ended. |

## License

[MIT](https://opensource.org/licenses/MIT)
