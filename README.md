# Vue Image Zoomer

Responsive image zoom component for Vue.js, that also works on touch devices. Perfect for zooming on product images on an ecommerce website.

Works on hover(default) or click on mouse devices, tap to zoom on touch screens.

Performace and pageload is important, zoom images do not load until needed, so only the regular sized images load on pageload. Webp format also available with jpg/png backwards compatabilty for browsers that do not yet support webp.

Demo: https://samueljon.es/vue-image-zoomer

<a href="https://www.buymeacoffee.com/samueljones" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

## Installation

```sh
npm i vue-image-zoomer
```

Usage with Webpack or other module bundlers:

```js
import Vue from 'vue';
import imageZoom from 'vue-image-zoomer'

new Vue({
    el: '#app',
    components:{
    	imageZoom
    }
})

// or

const ImageZoom = require('vue-image-zoomer').default

Vue.component('image-zoom', ImageZoom)
```

## Usage examples

```html
<!-- jpg example -->
<image-zoom 
	regular="path-to-regular.jpg" 
	zoom="path-to-zoom.jpg">				
</image-zoom>

<!-- png example -->
<image-zoom 
	regular="path-to-regular.png" 
	zoom="path-to-zoom.png">				
</image-zoom>

<!-- webp example -->
<image-zoom 
	regular="path-to-regular.jpg" 
	regular-webp="path-to-regular.webp"
	zoom="path-to-zoom.jpg"
	zoom-webp="path-to-zoom.webp">				
</image-zoom>
```

## Options

The following props can be added to the html above

| Property                    | Type    | Default | Description|
|:----------------------------|:--------|:--------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| alt            | String |    | Alt tag for regular image|
| click-zoom            | Boolean | false   | Click to zoom instead of hover to zoom which is default|
| click-message            | String | <span class="vue-hover-zoom-icon">&#9906;</span> Click to zoom   | To change the message that appears on top of the image before you zoom when clickZoom is enabled, accepts html|
| hover-message            | String | <span class="vue-hover-zoom-icon">&#9906;</span> Hover to zoom   | To change the message that appears on top of the image before you hover to zoom, accepts html|
| img-class            | String |    | Class for regular image, e.g. 'img-fluid' in bootstrap|
| regular            | String |    | **Required** Path to the regular image source|
| regular-webp            | String |    | Path to the regular webp image source, regular option will default as backup if browser doesn't support webp|
| touch-message            | String | <span class="vue-hover-zoom-icon">&#9906;</span> Tap to zoom   | To change the message that appears on top of the image before you tap to zoom on a touch screen, accepts html|
| zoom            | String |    | **Required** Path to the zoom image source|
| zoom-amount            | Number |    | Amount you want the zoom image to zoom by e.g. '2' would be 2 times as large as the regular image's dom size. Zoom is defaulted to be the size of the zoom image source|
| zoom-webp            | String |    | Path to the zoom webp image source, zoom option will default as backup if browser doesn't support webp|

## License

This project is licensed under the MIT License                                                                                                                             