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
	<div class="vue-hover-zoom-outer" v-cloak>
		<div class="vue-hover-zoom-holder" @mouseenter="isZoom(true)" @mouseleave="isZoom(false)" @mousemove="mousePos" ref="vue-hover-zoom-size" v-if="!touch && !clickZoom">
			<img :src="options.regular" style="max-width:100%" :class="imgClass" />
			<img 
			v-if="zoomed" 
			:src="options.zoom" 
			class="vue-hover-zoom-zoom-image" 
			:style="{width: zoomWidth + 'px', transform:'translate(-' + x + 'px,-' + y + 'px)'}" />
			<transition name="vueHoverZoomFade">
				<div class="vue-hover-zoom-message" v-if="!zoomed && !loading" v-html="options.message">
				</div>
			</transition>			
		</div>
		<div class="vue-hover-zoom-holder" @click="isZoom(!zoomed)" @mousemove="mousePos" ref="vue-hover-zoom-size" v-else-if="!touch && clickZoom">
			<img :src="options.regular" style="max-width:100%" :class="imgClass" />
			<img 
			v-if="zoomed" 
			:src="options.zoom" 
			class="vue-hover-zoom-zoom-image" 
			:style="{width: zoomWidth + 'px', transform:'translate(-' + x + 'px,-' + y + 'px)'}" />
			<transition name="vueHoverZoomFade">
				<div class="vue-hover-zoom-message" v-if="!zoomed && !loading" v-html="options.clickMessage">
				</div>
			</transition>			
		</div>
		<div class="vue-hover-zoom-holder" @click="isZoom(true)" ref="vue-hover-zoom-size" v-else>
			<img :src="options.regular" style="max-width:100%" :class="imgClass" />
			<img 
			v-if="zoomed" 
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

import { debounce } from "debounce";

export default {

    data() {
        return {    
        	options: {
    			regular: '',
    			zoom: '',
    			zoomAmount: 1,
    			class: '',
    			message: '<span class="vue-hover-zoom-icon">&#9906;</span> Hover to zoom',
    			clickMessage: '<span class="vue-hover-zoom-icon">&#9906;</span> Click to zoom',
    			touchMessage: '<span class="vue-hover-zoom-icon">&#9906;</span> Tap to zoom',
    			imgClass: '',
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
        };
    },

    props: {
    	regular: String,
    	zoom: String,
    	imgClass: String,
    	zoomAmount: Number,
    	clickZoom: Boolean,
    	hoverMessage: String,
    	touchMessage: String,
    	clickMessage: String
    },

    created() {
    	window.addEventListener("resize", debounce(this.zoomImageSize,200));
	},
	destroyed() {
	  	window.removeEventListener("resize", this.zoomImageSize);
	},
	updated(){
	  },

    mounted(){    	
    	//check if touch screen
    	if('ontouchstart' in window || navigator.msMaxTouchPoints){
    		this.touch = true;
    	}

    	//load options
    	if(this.regular){
    		this.options.regular = this.regular;
    	}
    	if(this.zoom){
    		this.options.zoom = this.zoom;
    	}
    	if(this.zoomAmount){
    		this.options.zoomAmount = this.zoomAmount;
    	} else {
    		this.defaultZoom = true;
    	}
    	if(this.imgClass){
    		this.options.imgClass = this.imgClass;
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

    	//load regular image
    	this.loadImage(this.regular, function() {
		    this.zoomImageSize();
		}.bind(this));

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
    	loadImage(src, callback) {
		    var sprite = new Image();
		    sprite.onload = callback;
		    sprite.src = src;
		},
		zoomImageSize(){	
			//get width and height of container
			this.origX = parseFloat(this.$refs['vue-hover-zoom-size'].offsetWidth);
			this.origY = parseFloat(this.$refs['vue-hover-zoom-size'].offsetHeight);

			//set zoom width if zoom amount option applied
			if(!this.defaultZoom){
				this.zoomWidth = this.origX * this.options.zoomAmount;
			}		    		
		},
		loadZoom(){
			if(!this.loaded){
				this.loading = true;

				//load zoom image
				this.loadImage(this.zoom, function(src) {
					if(this.defaultZoom){
						//if zoom amount not set, work it out from loaded zoom width
						this.zoomWidth = src.path[0].width;
						this.options.zoomAmount = src.path[0].width / this.origX;
					}
					this.loaded = true;
					this.loading = false; 
					this.zoomed = true;					
				}.bind(this));
			} else {
				this.zoomed = true;
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
				this.x = (e.pageX - this.offsetLeft) * (this.options.zoomAmount - 1);
				this.y = (e.pageY - this.offsetTop) * (this.options.zoomAmount - 1);
			}
		},
    },

};
</script>