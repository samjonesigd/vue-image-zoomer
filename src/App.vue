<template>
  <div class="container pb-4">
    <h1 class="text-center my-3">
      Vue Image Zoomer
    </h1>
    <p class="text-center">
      Lightweight responsive image zoom component for Vue.js 3, that also works on touch devices. Perfect for zooming on product images on an ecommerce website. For Vue 2 version please see the <a href="https://www.npmjs.com/package/vue-image-zoomer/v/legacy" target="_blank" rel="noreferrer">legacy version</a>
    </p>
    <div class="d-flex flex-column align-items-center">
      <h2 class="w-100 text-center mt-5 pt-3 border-top">
        Default Hover Zoom
      </h2>
<code>
<pre class="bg-light border rounded p-2 d-inline-block">
&lt;vue-image-zoom 
    regular="img/sky.jpg" 
    zoom="img/sky-zoom.jpg" 
    :zoom-amount="3" 
    img-class="img-fluid"
    alt="Sky"
    :tap-to-close="true"
    @on-zoom="zoom = true"
    @off-zoom="zoom = false" /&gt;

    Zoomed: &#123;&#123; zoom &#125;&#125;
</pre>
</code>
      <vue-image-zoomer 
        regular="/img/sky.jpg" 
        zoom="/img/sky-zoom.jpg" 
        :zoom-amount="3" 
        img-class="img-fluid"
        alt="Sky" 
        :tap-to-close="true"
        @on-zoom="zoom = true"
        @off-zoom="zoom = false" />

        Zoomed: {{ zoom }}

      <h2 class="w-100 text-center mt-5 pt-3 border-top">
        Default Hover Zoom with placeholder
      </h2>
      <p>This helps fix CLS issues, you could use a low res version of the regular image.</p>
<code>
<pre class="bg-light border rounded p-2 d-inline-block">
&lt;vue-image-zoom 
    regular="img/sky.jpg" 
    zoom="img/sky-zoom.jpg" 
    :zoom-amount="3" 
    img-class="img-fluid"
    alt="Sky"&gt;
    &lt;img src="/img/sky.jpg" img-class="img-fluid"/&gt;
&lt;/vue-image-zoom&gt;
</pre>
</code>
      <vue-image-zoomer 
        regular="/img/sky.jpg" 
        zoom="/img/sky-zoom.jpg" 
        :zoom-amount="3" 
        img-class="img-fluid"
        alt="Sky">
          <img src="/img/sky.jpg" img-class="img-fluid"/>
        </vue-image-zoomer>

      <h2 class="w-100 text-center mt-5 pt-3 border-top">Default Hover Zoom with just a regular image</h2>
      <p>Here you can see it is not as sharp as using a zoom image</p>
<code>
<pre class="bg-light border rounded p-2 d-inline-block">
&lt;vue-image-zoom 
    regular="img/sky.jpg" 
    img-class="img-fluid"
    alt="Sky"
    close-pos="top-right"
    message-pos="top" /&gt;
</pre>
</code>
      <vue-image-zoomer 
        regular="img/sky.jpg" 
        img-class="img-fluid"
        alt="Sky"
        close-pos="top-right"
        message-pos="top" />

        <h2 class="w-100 text-center mt-5 pt-3 border-top">Click To Zoom</h2>
<code>
<pre class="bg-light border rounded p-2 d-inline-block">
&lt;vue-image-zoom 
    regular="img/grass.jpg" 
    zoom="img/grass-zoom.jpg" 
    :zoom-amount="3"
    :click-zoom="true"
    img-class="img-fluid"
    alt="Grass" /&gt;
</pre>
</code>
        <vue-image-zoomer 
          regular="img/grass.jpg" 
          zoom="img/grass-zoom.jpg" 
          :zoom-amount="3"
          :click-zoom="true"
          img-class="img-fluid"
          alt="Grass" />

        <h2 class="w-100 text-center mt-5 pt-3 border-top">Custom Messages and default zoom amount</h2>
<code>
<pre class="bg-light border rounded p-2 d-inline-block">
&lt;vue-image-zoom 
    regular="img/balls.jpg" 
    zoom="img/balls-zoom.jpg"
    hover-message="Custom hover message"
    touch-message="Custom touch message"
    img-class="img-fluid"
    alt="Ball pool" /&gt;
</pre>
</code>        
        <vue-image-zoomer 
          regular="img/balls.jpg" 
          zoom="img/balls-zoom.jpg"
          hover-message="Custom hover message"
          touch-message="Custom touch message"
          img-class="img-fluid"
          alt="Ball pool" />

        <h2 class="w-100 text-center mt-5 pt-3 border-top">Breakpoints</h2>
        <p>Browser width 1200px or above will show black &amp; white sky image, 992 and above will show sky inverted. Below 992px will be original sky image set.</p>
        <p>Width order must start from highest min width.</p>
<code>
<pre class="bg-light border rounded p-2 d-inline-block">
&lt;vue-image-zoom 
  regular="img/sky.jpg" 
  zoom="img/sky-zoom.jpg" 
  :zoom-amount="3" 
  img-class="img-fluid"
  alt="Sky"
  :breakpoints="[
    {
      width: 1200,
      regular: 'img/sky-bw.jpg',
      zoom: 'img/sky-zoom-bw.jpg'
    },
    {
    width: 992,
      regular: 'img/sky-inverted.jpg',
      zoom: 'img/sky-zoom-inverted.jpg'
    }           
  ]" /&gt;
</pre>
</code>        
        <vue-image-zoomer 
          regular="img/sky.jpg" 
          zoom="img/sky-zoom.jpg" 
          :zoom-amount="3" 
          img-class="img-fluid"
          alt="Sky"
          :breakpoints="[
            {
              width: 1200,
              regular: 'img/sky-bw.jpg',
              zoom: 'img/sky-zoom-bw.jpg'
            },
            {
            width: 992,
              regular: 'img/sky-inverted.jpg',
              zoom: 'img/sky-zoom-inverted.jpg'
            }           
          ]"/>
    </div>      
  </div>
</template>

<script>
import VueImageZoomer from './components/VueImageZoomer.vue'
import '../dist/vue-image-zoomer.css';

export default {
  name: 'App',
  components: {
    VueImageZoomer
  },
  data() {
    return { 
      zoom: false,
    }
  },
  methods:{
    doAlert(){
      console.log('hello')
    }
  }
}
</script>
