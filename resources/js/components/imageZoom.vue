<style>
	.vue-hover-zoom-outer[v-cloak]{
		display: none;
	}
	.vueHoverZoomFade-enter-active {
	  	transition: opacity .5s;
	}
	.vueHoverZoomFade-enter {
	  	opacity: 0;
	}
	.vue-hover-zoom-outer{
		position: relative;
		display: inline-block;
		line-height:0;
		font-family: Arial, Helvetica, sans-serif;
		color: #fff;
	}
	.vue-hover-zoom-holder{
		position: relative;
		overflow: hidden;
		display: flex;
		justify-content: center;
		touch-action: manipulation;
		cursor: zoom-in;
		align-items: flex-start;
	}
	.vue-hover-zoom-zoom-image{
		position:absolute;
		top:0;
		left:0;
		pointer-events: none;
	}
	.vue-hover-zoom-message{
		position: absolute;
	    bottom: 20px;
	    background-color: rgba(0, 0, 0, 0.65);
	    padding: 8px 15px;
	    border-radius: 50px;
	    text-align: center;
	    line-height: initial;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	}
	.vue-hover-zoom-icon{
		transform: rotate(-45deg);
	    display: block;
	    font-size: 20px;
	    margin-right: 5px;
	    line-height: 20px
	}
	.vue-hover-zoom-close{
		position: absolute;
	    top: 5px;
	    left: 5px;
	    line-height: 0px;
	    background-color: rgba(0, 0, 0, 0.65);
	    border-radius: 50px;
	    font-size: 27px;
	    cursor: pointer;
	    height: 31px;
	    width: 31px;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	}
	.vue-hover-zoom-loading-outer{
		position: absolute;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 100%;
	    background-color: rgba(0, 0, 0, 0.65);
	    pointer-events: none;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	}
	.vue-hover-zoom-loading{
		top: 50%;
		left: 50%;
		font-size:60px;
		line-height: 60px;
		animation: vuehoverzoomspin 1s linear infinite;
		width: 36px;
    	height: 70px;
	}
	@keyframes vuehoverzoomspin {
	    from {transform:rotate(0deg);}
	    to {transform:rotate(360deg);}
	}
</style>

<template>
	<div class="vue-hover-zoom-outer" v-cloak v-click-outside="isZoom">
		<div class="vue-hover-zoom-holder" @mouseenter="isZoom(true)" @mouseleave="isZoom(false)" @mousemove="mousePos" ref="vue-hover-zoom-size" v-if="!touch && !clickZoom">
			<picture>
				<source v-if="options.regular_webp" :srcset="options.regular_webp" type="image/webp">                    
                <source :srcset="options.regular" type="image/jpeg">
				<img :src="options.regular" :class="imageClass" :alt="options.imageAlt" />
			</picture>
			<img 
			v-if="zoomed && webp_supported && options.zoom_webp" 
			:src="options.zoom_webp" 
			class="vue-hover-zoom-zoom-image" 
			:style="{width: zoomWidth + 'px', transform:'translate(-' + x + 'px,-' + y + 'px)'}" />
			<img 
			v-else-if="zoomed" 
			:src="options.zoom" 
			class="vue-hover-zoom-zoom-image" 
			:style="{width: zoomWidth + 'px', transform:'translate(-' + x + 'px,-' + y + 'px)'}" />
			<transition name="vueHoverZoomFade">
				<div class="vue-hover-zoom-message" v-if="!zoomed && !loading" v-html="options.message">
				</div>
			</transition>			
		</div>
		<div class="vue-hover-zoom-holder" @click="isZoom(!zoomed)" @mousemove="mousePos" ref="vue-hover-zoom-size" v-else-if="!touch && clickZoom">
			<picture>
				<source v-if="options.regular_webp" :srcset="options.regular_webp" type="image/webp">                    
                <source :srcset="options.regular" type="image/jpeg">
				<img :src="options.regular" :class="imageClass" :alt="options.imageAlt" />
			</picture>
			<img 
			v-if="zoomed && webp_supported && options.zoom_webp" 
			:src="options.zoom_webp" 
			class="vue-hover-zoom-zoom-image" 
			:style="{width: zoomWidth + 'px', transform:'translate(-' + x + 'px,-' + y + 'px)'}" />
			<img 
			v-else-if="zoomed" 
			:src="options.zoom" 
			class="vue-hover-zoom-zoom-image" 
			:style="{width: zoomWidth + 'px', transform:'translate(-' + x + 'px,-' + y + 'px)'}" />
			<transition name="vueHoverZoomFade">
				<div class="vue-hover-zoom-message" v-if="!zoomed && !loading" v-html="options.clickMessage">
				</div>
			</transition>			
		</div>
		<div class="vue-hover-zoom-holder" @click="isZoom(true)" ref="vue-hover-zoom-size" v-else>
			<picture>
				<source v-if="options.regular_webp" :srcset="options.regular_webp" type="image/webp">                    
                <source :srcset="options.regular" type="image/jpeg">
				<img :src="options.regular" :class="imageClass" :alt="options.imageAlt" />
			</picture>
			<img 
			v-if="zoomed && webp_supported && options.zoom_webp" 
			:src="options.zoom_webp" 
			class="vue-hover-zoom-zoom-image" 
			:style="'width:' + zoomWidth + 'px;transform:' + touchPosition" />
			<img 
			v-else-if="zoomed"
			:src="options.zoom" 
			class="vue-hover-zoom-zoom-image" 
			:style="'width:' + zoomWidth + 'px;transform:' + touchPosition" />
			<transition name="vueHoverZoomFade">
				<div class="vue-hover-zoom-message" v-if="!zoomed && !loading" v-html="options.touchMessage">
				</div>
			</transition>			
		</div>
		<transition name="vueHoverZoomFade">
			<div class="vue-hover-zoom-close" v-if="touch && zoomed && loaded" @click.stop="zoomed = false" v-html="'&times;'">				
			</div>
		</transition>
		<transition name="vueHoverZoomFade">
			<div class="vue-hover-zoom-loading-outer" v-if="loading">			
				<div class="vue-hover-zoom-loading" v-html="'&#9696;'"></div>
			</div>
		</transition>
	</div>
</template>

<script>
Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      // here I check that click was outside the el and his childrens
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
});

export default {

    data() {
        return {    
        	options: {
    			regular: false,
    			regular_webp: false,
    			zoom: false,
    			zoom_webp: false,
    			zoomAmount: 1,
    			class: false,
    			message: '<span class="vue-hover-zoom-icon">&#9906;</span> Hover to zoom',
    			clickMessage: '<span class="vue-hover-zoom-icon">&#9906;</span> Click to zoom',
    			touchMessage: '<span class="vue-hover-zoom-icon">&#9906;</span> Tap to zoom',
    			imageClass: false,
    			imageAlt: 'Image zoom',
    			clickZoom: false,
    		},
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
    		loaded: false,
    		loading: false,
    		defaultZoom: false,
    		webp_supported: false,
        };
    },

    props: {
    	regular: String,
    	regular_webp: String,
    	zoom: String,
    	zoom_webp: String,
    	imageClass: String,
    	imageAlt: String,
    	zoomAmount: Number,
    	clickZoom: Boolean,
    	hoverMessage: String,
    	touchMessage: String,
    	clickMessage: String,
    	closeZoom: Boolean,
    },

    mounted(){   
    	this.check_webp_feature('lossy', function (feature, isSupported) {
		    if (isSupported) {
		        this.webp_supported = true;
		    }
		}.bind(this));

    	//check if touch screen
    	if('ontouchstart' in window || navigator.msMaxTouchPoints){
    		this.touch = true;
    	}

    	//load options
    	if(this.regular){
    		this.options.regular = this.regular;
    	}
    	if(this.regular_webp){
    		this.options.regular_webp = this.regular_webp;
    	}
    	if(this.zoom){
    		this.options.zoom = this.zoom;
    	}
    	if(this.zoom_webp){
    		this.options.zoom_webp = this.zoom_webp;
    	}
    	if(this.zoomAmount){
    		this.options.zoomAmount = this.zoomAmount;
    	} else {
    		this.defaultZoom = true;
    	}
    	if(this.imageClass){
    		this.options.imageClass = this.imageClass;
    	} 
    	if(this.imageAlt){
    		this.options.imageAlt = this.imageAlt;
    	} 
    	if(this.clickZoom){
    		this.options.clickZoom = this.clickZoom;
    	}  
    	if(this.hoverMessage){
    		this.options.message = this.hoverMessage;
    	}  
    	if(this.touchMessage){
    		this.options.touchMessage = this.touchMessage;
    	}  
    	if(this.clickMessage){
    		this.options.clickMessage = this.clickMessage;
    	}    

		let sx,sy,cx=0,cy=0,touchobj=this.$refs['vue-hover-zoom-size'];

		//touch start
		touchobj.addEventListener('touchstart', function(e){
			if(this.zoomed){
				if (e.cancelable) {
		 			e.preventDefault();
		 		}
		 		let touchmovement = e.changedTouches[0]
		 		sx=touchmovement.pageX-cx;
		 		sy=touchmovement.pageY-cy;			
		 	}
		}.bind(this));

		//drag zoom if touch device
		touchobj.addEventListener('touchmove', function(e){
			if(this.zoomed){
				let touchmovement = e.changedTouches[0]

		 		this.x = touchmovement.pageX-sx;
		 		this.y = touchmovement.pageY-sy;

		 		if(touchmovement.pageX-sx <= (this.origX - this.zoomWidth)){		 		
		 			this.x = this.origX - this.zoomWidth;
		 		}
		 		if(touchmovement.pageX-sx >= 0){
		 			this.x = -1;
		 		}
		 		if(touchmovement.pageY-sy <= (this.origY - (this.options.zoomAmount * this.origY))){
		 			this.y = this.origY - (this.options.zoomAmount * this.origY);
		 		}
		 		if(touchmovement.pageY-sy >= 0){
		 			this.y = -1;
		 		}

		 		this.touchPosition='translate3d('+
		 		(this.x)+'px,'+(this.y)+'px,0)';
		 	}
		}.bind(this));

		//end touch
		touchobj.addEventListener('touchend', function(e){
			if(this.zoomed){
				let touchmovement = e.changedTouches[0]
		 		cx=touchmovement.pageX-sx;
		 		cy=touchmovement.pageY-sy;
			}
		}.bind(this));
    },

    methods: { 
    	check_webp_feature(feature, callback) {
		    let kTestImages = {
		        lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
		    };
		    let img = new Image();
		    img.onload = function () {
		        let result = (img.width > 0) && (img.height > 0);
		        callback(feature, result);
		    };
		    img.onerror = function () {
		        callback(feature, false);
		    };
		    img.src = "data:image/webp;base64," + kTestImages[feature];
		},
    	loadImage(src, callback) {
		    var sprite = new Image();
		    sprite.onload = callback;
		    sprite.src = src;
		},
		loadZoom(){
			//get width and height of container
			this.origX = parseFloat(this.$refs['vue-hover-zoom-size'].offsetWidth);
			this.origY = parseFloat(this.$refs['vue-hover-zoom-size'].offsetHeight);

			//set zoom width if zoom amount option applied
			if(!this.defaultZoom){
				this.zoomWidth = this.origX * this.options.zoomAmount;
			}

			//only do this if we havent loaded the zoom before
			if(!this.loaded){
				this.loading = true;

				//load zoom image
				let zoomToLoad = this.options.zoom;
				if(this.webp_supported && this.options.zoom_webp){
					zoomToLoad = this.options.zoom_webp;
				}
				this.loadImage(zoomToLoad, function(src) {
					if(this.defaultZoom){
						//if zoom amount not set, work it out from loaded zoom image width
						this.zoomWidth = src.target.width;
						this.options.zoomAmount = src.target.width / this.origX;
					}
					this.loaded = true;
					this.loading = false; 
					this.zoomed = true;						
				}.bind(this));
			} else {
				this.zoomed = true;

				//get zoom amount for default zoom again as screen size may have changed
				if(this.defaultZoom){
					this.options.zoomAmount = this.zoomWidth / this.origX;
				}
			}
		},
		isZoom(type){			
			//set zoomed to false
			this.zoomed = false;

			//if true passed load the zoom image
			if(type == true){
				this.loadZoom();
			}
		},
		mousePos(e){	
			//get offset of container
			this.offsetLeft = window.pageXOffset + this.$refs['vue-hover-zoom-size'].getBoundingClientRect().left;
			this.offsetTop = window.pageYOffset + this.$refs['vue-hover-zoom-size'].getBoundingClientRect().top;
			//set x and y of mouse in the container for the transform in style bind
			if(!this.touch && !this.loading){	
				if(!this.loaded && this.defaultZoom){
					this.origX = parseFloat(this.$refs['vue-hover-zoom-size'].offsetWidth);
					this.origY = parseFloat(this.$refs['vue-hover-zoom-size'].offsetHeight);
					
					let zoomToLoad = this.options.zoom;
					if(this.webp_supported && this.options.zoom_webp){
						zoomToLoad = this.options.zoom_webp;
					}
					this.loadImage(zoomToLoad, function(src) {
						this.zoomWidth = src.target.width;
						this.options.zoomAmount = src.target.width / this.origX;
						this.loaded = true;						
					}.bind(this));
				} else {
					this.x = (e.pageX - this.offsetLeft) * (this.options.zoomAmount - 1);
					this.y = (e.pageY - this.offsetTop) * (this.options.zoomAmount - 1);
				}
			}
		},
    },

};
</script>