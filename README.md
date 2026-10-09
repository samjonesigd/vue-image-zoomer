# Vue Image Zoomer

Lightweight, responsive image zoom component for Vue 3. Hover (or click) to zoom on desktop, tap and drag to zoom on touch devices. Ideal for product images on ecommerce sites.

**[Demo](https://samueljon.es/vue-image-zoomer)**

- **Fast page loads**: the zoom image only loads when it's needed
- **Touch support**: tap to zoom, drag to pan, with a close button or tap to close
- **WebP** with automatic jpg/png fallback for browsers that don't support it
- **Breakpoints** to serve different images at different screen sizes
- **Lazyloading** and a placeholder slot to reduce layout shift
- **Nuxt 3 / SSR** compatible
- **TypeScript** declarations included

Looking for Vue 2? Use the [legacy version](https://www.npmjs.com/package/vue-image-zoomer/v/legacy).

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
npm i vue-image-zoomer
```

## Setup

Remember to import the stylesheet, the component won't display correctly without it.

### Global registration

```js
import { createApp } from 'vue';
import App from './App.vue';
import VueImageZoomer from 'vue-image-zoomer';
import 'vue-image-zoomer/dist/style.css';

createApp(App).use(VueImageZoomer).mount('#app');
```

### Local registration

```vue
<script setup>
import { VueImageZoomer } from 'vue-image-zoomer';
import 'vue-image-zoomer/dist/style.css';
</script>

<template>
  <vue-image-zoomer regular="/img/product.jpg" zoom="/img/product-zoom.jpg" />
</template>
```

### Nuxt 3

Create a plugin, e.g. `plugins/vue-image-zoomer.ts`:

```js
import VueImageZoomer from 'vue-image-zoomer';
import 'vue-image-zoomer/dist/style.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueImageZoomer);
});
```

### TypeScript

Type declarations are included. Global registration also types `<vue-image-zoomer>` in templates, and the `VueImageZoomerProps` and `VueImageZoomerBreakpoint` types are exported:

```ts
import type { VueImageZoomerBreakpoint } from 'vue-image-zoomer';
```

### Without a build step (UMD)

```html
<link rel="stylesheet" href="https://unpkg.com/vue-image-zoomer@2/dist/style.css">
<script src="https://unpkg.com/vue@3"></script>
<script src="https://unpkg.com/vue-image-zoomer@2/dist/vue-image-zoomer.umd.js"></script>
<script>
  Vue.createApp({}).use(VueImageZoomer.default).mount('#app');
</script>
```

## Usage

### Basic

```html
<!-- Zoom image (recommended for a sharp zoom) -->
<vue-image-zoomer
  regular="/img/product.jpg"
  zoom="/img/product-zoom.jpg"
  alt="Product" />

<!-- No zoom image: the regular image is zoomed 2x -->
<vue-image-zoomer regular="/img/product.jpg" />
```

By default the zoom image is shown at its natural size. Use `zoom-amount` to set it to a multiple of the regular image's displayed size instead:

```html
<vue-image-zoomer
  regular="/img/product.jpg"
  zoom="/img/product-zoom.jpg"
  :zoom-amount="3" />
```

### Click to zoom

Mouse devices zoom on hover by default. Use `click-zoom` to zoom on click instead. Touch devices always use tap to zoom.

```html
<vue-image-zoomer
  regular="/img/product.jpg"
  zoom="/img/product-zoom.jpg"
  click-zoom />
```

Clicking outside the image closes the zoom. Add `:close-on-click-outside="false"` to keep it open.

### Edge offset

To see the edge of the zoom image, the cursor normally has to reach the very edge of the image. `edge-offset` makes the edges reachable sooner. For example, `0.1` means the zoom is fully panned once the cursor is within 10% of an edge.

```html
<vue-image-zoomer
  regular="/img/product.jpg"
  zoom="/img/product-zoom.jpg"
  :edge-offset="0.1" />
```

### WebP

The jpg/png images are used as a fallback in browsers that don't support WebP.

```html
<vue-image-zoomer
  regular="/img/product.jpg"
  regular-webp="/img/product.webp"
  zoom="/img/product-zoom.jpg"
  zoom-webp="/img/product-zoom.webp" />
```

> If you set `regular-webp`, set `zoom-webp` too. Otherwise the regular WebP image is used for the zoom at 2x.

### Breakpoints

Serve different images at different screen sizes, for example higher resolution images on desktop. Each `width` is a minimum browser width in pixels. **List breakpoints from largest to smallest width.** The `regular` and `zoom` props are used below the smallest breakpoint.

`width` and `regular` are required. `zoom`, `regularWebp` and `zoomWebp` are optional.

```html
<vue-image-zoomer
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
  ]" />
```

### Placeholder

Content in the default slot is shown until the regular image has loaded, which helps reduce layout shift. A small, low resolution version of the image works well. The slot isn't shown when `lazyload` is set.

```html
<vue-image-zoomer regular="/img/product.jpg" zoom="/img/product-zoom.jpg">
  <img src="/img/product-tiny.jpg" alt="Product" />
</vue-image-zoomer>
```

### Error handling

```vue
<script setup>
import { ref } from 'vue';

const regular = ref('/img/product.jpg');
const zoom = ref('/img/product-zoom.jpg');
</script>

<template>
  <vue-image-zoomer
    :regular="regular"
    :zoom="zoom"
    @regular-error="regular = '/img/fallback.jpg'"
    @zoom-error="zoom = '/img/fallback-zoom.jpg'" />
</template>
```

### Zoom images with a different aspect ratio

The zoom image doesn't need the same aspect ratio as the regular image. The component stays the size of the regular image, so there's no page jump, and the whole zoom image can be panned. A zoom image too short to fill the component is scaled up to cover it.

## Props

| Prop | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| `regular` | String | | **Required.** Path to the regular image. |
| `zoom` | String | `regular` at 2x | **Recommended.** Path to the zoom image. |
| `regular-webp` | String | | Path to a WebP version of the regular image. |
| `zoom-webp` | String | `regular-webp` | Path to a WebP version of the zoom image. |
| `zoom-amount` | Number | Zoom image's natural size | How much to zoom, as a multiple of the regular image's displayed size, e.g. `2`. |
| `breakpoints` | Array | | Different images at different screen sizes. See [Breakpoints](#breakpoints). |
| `alt` | String | | Alt text for the regular image. |
| `img-class` | String | | Class for the regular image, e.g. `img-fluid` in Bootstrap. |
| `img-width` | Number | | `width` attribute for the regular image, helps reduce layout shift. |
| `img-height` | Number | | `height` attribute for the regular image, helps reduce layout shift. |
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
| `right-click` | Boolean | `true` | Set to `false` to disable right click on the images, making them harder to save. |

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
