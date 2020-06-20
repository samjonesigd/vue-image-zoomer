# Vue Image Zoomer

Image zoom component for Vue.js, that also works on touch devices.

Demo: https://samueljon.es/vue-image-zoomer

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

## Usage

```html
<image-zoom 
	regular="path-to-regular.jpg" 
	zoom="path-to-zoom.jpg">				
</image-zoom>
```

## Options

The following props can be added to the html above

| Property                    | Type    | Default | Description|
|:----------------------------|:--------|:--------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| click-zoom            | Boolean | false   | Click to zoom instead of hover to zoom which is default|
| click-message            | String | <span class="vue-hover-zoom-icon">&#9906;</span> Click to zoom   | To change the message that appears on top of the image before you zoom when clickZoom is enabled, accepts html|
| hover-message            | String | <span class="vue-hover-zoom-icon">&#9906;</span> Hover to zoom   | To change the message that appears on top of the image before you hover to zoom, accepts html|
| alt            | String |    | Alt tag for regular image|
| img-class            | String |    | Class for regular image, e.g. 'img-fluid' in bootstrap|
| regular            | String |    | **Required** Path to the regular image source|
| regular-webp            | String |    | Path to the regular webp image source, regular option will default as backup if browser doesn't support webp|
| touch-message            | String | <span class="vue-hover-zoom-icon">&#9906;</span> Tap to zoom   | To change the message that appears on top of the image before you tap to zoom on a touch screen, accepts html|
| zoom            | String |    | **Required** Path to the zoom image source|
| zoom-amount            | Number |    | Amount you want the zoom image to zoom by e.g. '2' would be 2 times as large as the regular image's dom size. Zoom is defaulted to be the size of the zoom image source|
| zoom-webp            | String |    | Path to the zoom webp image source, zoom option will default as backup if browser doesn't support webp|

## License

This project is licensed under the MIT License                                                                                                                             