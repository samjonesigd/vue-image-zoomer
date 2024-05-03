# Vue Image Zoomer

Lightweight responsive image zoom component for Vue.js 3 & 2, that also works on touch devices. Perfect for zooming on product images on an ecommerce website. For Vue 2 please check out the legacy version <https://www.npmjs.com/package/vue-image-zoomer/v/legacy>.

Works on hover(default) or click on mouse devices, tap to zoom on touch screens.

Performance and pageload is important, zoom images do not load until needed, so only the regular sized images load on pageload. Webp format also available with jpg/png backwards compatabilty for browsers that do not yet support webp. There is also an option to lazyload the regular image and breakpoints to have different res images on different screen sizes.

Zoom source is not needed but recommended for a sharper zoom, if there is no zoom image selected then the regular image will be zoomed by 2 by default.

Demo: <https://samueljon.es/vue-image-zoomer>

<a href="https://www.buymeacoffee.com/samueljones" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

## Installation

```sh
npm i vue-image-zoomer
```

Usage:

```js
//global
import { createApp } from 'vue';
import App from './App.vue'
import VueImageZoomer from 'vue-image-zoomer'
import 'vue-image-zoomer/dist/style.css';

const app = createApp(App);

app.use(VueImageZoomer);

app.mount('#app');

//in component
import { VueImageZoomer } from 'vue-image-zoomer'
import 'vue-image-zoomer/dist/style.css';

export default {
  name: 'App',
  components: {
    VueImageZoomer
  }
}
```

Also comes with a UMD version and css file if not using a module compiler in the dist folder.

## Usage examples

```html
<!-- Example without zoom image -->
<vue-image-zoomer 
	regular="path-to-regular.jpg" />

<!-- jpg example -->
<vue-image-zoomer 
	regular="path-to-regular.jpg" 
	zoom="path-to-zoom.jpg" />

<!-- png example -->
<vue-image-zoomer 
	regular="path-to-regular.png" 
	zoom="path-to-zoom.png" />

<!-- webp example -->
<vue-image-zoomer 
	regular="path-to-regular.jpg" 
	regular-webp="path-to-regular.webp"
	zoom="path-to-zoom.jpg"
	zoom-webp="path-to-zoom.webp" />
```

## Placeholder

Placeholder slot, helps with CLS improvements & page jumping.

```html
<vue-image-zoomer 
	regular="path-to-regular.jpg" 
	zoom="path-to-zoom.jpg">
	<img src="path-to-low-res-placeholder.jpg" />
</vue-image-zoomer>
```

## Breakpoints

This option is an array of objects that allows you to have different images on different screen sizes. For example to load a higher res image on desktop. 

Order of the objects must start from highest min width, e.g. in the example below we start with the 1200 min width then 992. This is the min width of the browser in pixels when that breakpoint will show.

Like without breakpoints, if using breakpoints, the zoom parameters aren't required but recommended for a higher quality zoom image, width and regular parameters are **required**. Addition parameters to the array are 'regularWebp' and 'zoomWebp' if using webp images(will be defaulted to standard if browser does not support webp).

```html
<vue-image-zoomer 
	regular="path-to-regular.jpg" 
	zoom="path-to-zoom.jpg"
	:breakpoints="[
		{
			width: 1200,
			regular: 'path-to-regular-1200.jpg',
			zoom: 'path-to-zoom-1200.jpg'
		},
		{
			width: 992,
			regular: 'path-to-regular-992.jpg',
			zoom: 'path-to-zoom-992.jpg'
		}						
	]" />

<!-- webp example -->
<vue-image-zoomer 
	regular="path-to-regular.jpg" 
	regular-webp="path-to-regular.webp" 
	zoom="path-to-zoom.jpg"
	zoom-webp="path-to-zoom.webp" 
	:breakpoints="[
		{
			width: 1200,
			regular: 'path-to-regular-1200.jpg',
			regularWebp: 'path-to-regular-1200.webp',
			zoom: 'path-to-zoom-1200.jpg'
			zoomWebp: 'path-to-zoom-1200.webp'
		},
		{
			width: 992,
			regular: 'path-to-regular-992.jpg',
			regularWebp: 'path-to-regular-992.webp',
			zoom: 'path-to-zoom-992.jpg'
			zoomWebp: 'path-to-zoom-992.webp'
		}						
	]" />
```

## All Options

The following props can be added to the html above

| Property                    | Type    | Default | Description|
|:----------------------------|:--------|:--------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| alt            | String |    | Alt tag for regular image|
| breakpoints            | Array |    | Array of objects that allows you to have different images on different screen sizes. Example is shown above, width and regular parameters are needed when using this, adition optional parameters are; regularWebp, zoom, zoomWebp |
| close-pos            | String | top-left   | Position of the close button on mobile: **top-left, top-right, top-center, bottom-left, bottom-right, bottom-center**|
| click-zoom            | Boolean | false   | Click to zoom instead of hover to zoom which is default|
| click-message            | String | <span class="vue-hover-zoom-icon">&#9906;</span> Click to zoom   | To change the message that appears on top of the image before you zoom when click-zoom is set to true, accepts html|
| hover-message            | String | <span class="vue-hover-zoom-icon">&#9906;</span> Hover to zoom   | To change the message that appears on top of the image before you hover to zoom, accepts html|
| img-class            | String |    | Class for regular image, e.g. 'img-fluid' in bootstrap|
| img-height            | Number |    | img height attribute for improved lighthouse performance |
| img-width            | Number |    | img width attribute for improved lighthouse performance |
| lazyload            | Boolean |  false  | To lazyload the regular image, uses HTML loading attribute |
| message-pos            | String |  bottom  | Position of the message that appears on top of the image before you zoom: **top, bottom**|
| regular            | String |    | **Required** Path to the regular image source|
| regular-webp            | String |    | Path to the regular webp image source, regular option will default as backup if browser doesn't support webp|
| right-click            | Boolean | true   | Set to false to disable right click on images (stop easy image stealing) |
| show-message            | Boolean | true   | Set to false to hide zoom message on non-touch devices |
| show-message-touch            | Boolean | true   | Set to false to hide zoom message on touch devices |
| tap-to-close            | Boolean | false   | Set to true to tap to close zoom on mobile, instead of the close button |
| touch-message            | String | <span class="vue-hover-zoom-icon">&#9906;</span> Tap to zoom   | To change the message that appears on top of the image before you tap to zoom on a touch screen, accepts html|
| touch-zoom-pos            | Array | [0.5, 0.5]   | X & Y position from top left of where the zoom starts on touch devices e.g. `[0.5, 0.5]` the default, is center, `[0, 0]` is top left. Max value is 1, min value is 0. |
| zoom            | String |  Regular image  | **Recommended** Path to the zoom image source. If zoom not selected then will use the regular image times by 2.|
| zoom-amount            | Number |    | Amount you want the zoom image to zoom by e.g. '2' would be 2 times as large as the regular image's dom size. Zoom is defaulted to be the size of the zoom image source, if there is not zoom image source then default zoom is 2|
| zoom-webp            | String |    | Path to the zoom webp image source, zoom option will default as backup if browser doesn't support webp. zoom-webp will be regular-webp image if nothing is selected for zoom-webp, but there's a regular-webp image|

## Events

The events that the component emits.

| Event                     | Description|
|:----------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| regular-loaded            | Fires when the regular image has loaded on page|
| off-zoom            | Fires when you are not zooming |
| on-zoom            | Fires when you are zooming |
| zoom-loaded            | Fires when the zoom image has loaded|
| zoom-loading            | Fires when the zoom image is loading|

## License

This project is licensed under the MIT License                                                                                                                             