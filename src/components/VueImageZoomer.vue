<style>.VueHoverfade-enter-active,.VueHoverfade-leave-active{transition:opacity .5s}.VueHoverfade-enter,.VueHoverfade-leave-to{opacity:0}.vh--outer[v-cloak]{display:none}.vh--flex{display:flex}.vh--jc{justify-content:center}.vh--ai{align-items:center}.vh--rel{position:relative}.vh--abs{position:absolute}.vh--outer{display:inline-block;line-height:0;font-family:Arial,Helvetica,sans-serif;color:#fff}.vh--holder{overflow:hidden;touch-action:manipulation;cursor:zoom-in;align-items:flex-start}.vh--image{top:0;left:0;pointer-events:none}.vh--message{background-color:rgba(0,0,0,.65);padding:8px 15px;border-radius:50px;text-align:center;line-height:initial}.vh--message-top{top:20px}.vh--message-bottom{bottom:20px}.vh--icon{transform:rotate(-45deg);display:block;font-size:20px;margin-right:5px;line-height:20px}.vh--close{line-height:0;background-color:rgba(0,0,0,.65);border-radius:50px;font-size:23px;cursor:pointer;height:28px;width:28px}.vh--top-left{top:5px;left:5px}.vh--top-right{top:5px;right:5px}.vh--top-center{top:5px;left:50%;transform:translateX(-50%)}.vh--bottom-left{bottom:5px;left:5px}.vh--bottom-right{bottom:5px;right:5px}.vh--bottom-center{bottom:5px;left:50%;transform:translateX(-50%)}.vh--loading-o{top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,.65);pointer-events:none}.vh--loading{top:50%;left:50%;font-size:60px;line-height:60px;animation:vuehoverzoomspin 1s linear infinite;width:36px;height:70px}.vh--none{opacity:0}.vh--no-click img{pointer-events: none}@keyframes vuehoverzoomspin{from{transform:rotate(0)}to{transform:rotate(360deg)}}</style>

<template>
    <div class="vh--outer vh--rel" 
    v-cloak 
    v-click-outside="isZoom">
        <div class="vh--holder vh--rel vh--flex vh--jc" 
        :class="{'vh--no-click': !rightClick}"
        @mouseenter="isZoom(true, 'hover')" 
        @mouseleave="isZoom(false, 'hover')" 
        @mousemove="mousePos" 
        ref="vue-hover-zs" 
        @click="isZoom(!zoomed, 'click')">
            <picture :class="{'vh--none': zoomed}">
                <template v-for="breakpoint in breakpoints" :key="breakpoint.width">
                    <source v-if="breakpoint.regularWebp" 
                        :srcset="breakpoint.regularWebp" 
                        type="image/webp"
                        :media="'(min-width:' + breakpoint.width + 'px)'"/>
                    <source v-if="breakpoint.regular" 
                    :srcset="breakpoint.regular"
                    :media="'(min-width:' + breakpoint.width + 'px)'"/>
                </template>
                <source v-if="regularWebp" :srcset="regularWebp" type="image/webp">    
                <img :loading="lazyload ? 'lazy' : 'eager'" :src="regular" :class="imgClass" :alt="alt" />
            </picture>
            <picture v-if="zoomed">       
                <template v-for="breakpoint in breakpoints" :key="breakpoint.width">
                    <source v-if="breakpoint.zoomWebp" 
                    :srcset="breakpoint.zoomWebp" 
                    type="image/webp"
                    :media="'(min-width:' + breakpoint.width + 'px)'"/>
                    <source v-else-if="breakpoint.regularWebp" 
                    :srcset="breakpoint.regularWebp" 
                    type="image/webp"
                    :media="'(min-width:' + breakpoint.width + 'px)'"/>
                    <source v-if="breakpoint.zoom" 
                    :srcset="breakpoint.zoom"
                    :media="'(min-width:' + breakpoint.width + 'px)'"/>
                    <source v-else-if="breakpoint.regular" 
                    :srcset="breakpoint.regular"
                    :media="'(min-width:' + breakpoint.width + 'px)'"/>
                </template>
                <source v-if="options.zoomWebp" 
                :src="options.zoomWebp" 
                type="image/webp"/>
                <img :src="options.zoom" 
                class="vh--image vh--abs" 
                :style="{width: zoomWidth + 'px', transform:'translate(-' + x + 'px,-' + y + 'px)'}"
                v-if="!touch"/>
                <img :src="options.zoom" 
                class="vh--image vh--abs" 
                :style="'width:' + zoomWidth + 'px;transform:' + touchPosition"
                v-else/>
            </picture>
            <transition name="VueHoverfade">
                <div class="vh--message vh--abs vh--flex vh--jc vh--ai"
                :class="'vh--message-' + messagePos" 
                v-if="!zoomed && !loading && !clickZoom && !touch && showMessage" 
                v-html="hoverMessage">
                </div>
                <div class="vh--message vh--abs vh--flex vh--jc vh--ai"
                :class="'vh--message-' + messagePos" 
                v-else-if="!zoomed && !loading && !touch && showMessage" 
                v-html="clickMessage">
                </div>
                <div class="vh--message vh--abs vh--flex vh--jc vh--ai"
                :class="'vh--message-' + messagePos" 
                v-else-if="!zoomed && !loading && touch && showMessageTouch" 
                v-html="touchMessage">
                </div>
            </transition>   
        </div>
        <transition name="VueHoverfade">
            <div class="vh--close vh--abs vh--flex vh--jc vh--ai" 
            :class="'vh--' + closePos"
            v-if="touch && zoomed && loaded" 
            @click.stop="zoomed = false" 
            v-html="'&times;'">       
            </div>
            <div class="vh--loading-o vh--abs vh--flex vh--jc vh--ai" 
            v-else-if="loading">      
                <div class="vh--loading" 
                v-html="'&#9696;'">         
                </div>
            </div>
        </transition>
    </div>
</template>

<script>

export default {

    name: 'VueImageZoomer', 

    directives: {
        clickOutside: {
            mounted (el, binding) {
                el.clickOutsideEvent = function (event) {
                    // here I check that click was outside the el and his children
                    if (!(el == event.target || el.contains(event.target))) {
                        // and if it did, call method provided in attribute value
                        binding.value(event, el);
                    }
                };
                document.body.addEventListener('click', el.clickOutsideEvent)
            },
            unmounted (el) {
                document.body.removeEventListener('click', el.clickOutsideEvent)
            },
        }
    },

    data() {
        return { 
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
            zoomHeight: 0,
            options:{
                zoomAmount: 0,
                zoom: false,
                zoomWebp: false,
            },
            loaded: false,
            loading: false,
            webp_supported: false,
            cx: 0,
            cy: 0,
        };
    },

    props: {
        regular: String,
        regularWebp: String,
        zoom: String,
        zoomWebp: String,
        imgClass: {
            type: String,
            default: ''
        },
        alt: String,
        zoomAmount:  {
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
            default: 'top-left'
        },
        messagePos: {
            type: String,
            default: 'bottom'
        },
        showMessage: {
            type: Boolean,
            default: true,
        },
        showMessageTouch: {
            type: Boolean,
            default: true
        },
        breakpoints: Array,
        touchZoomPos: {
            type: Array,
            default() {
                return [0.5, 0.5]
            }
        },
        lazyload: Boolean,
        rightClick: Boolean
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

    mounted(){   
        this.check_webp_feature('lossy', (feature, isSupported) => {
            if (isSupported) {
                this.webp_supported = true;
            }
        });

        this.get_options();

        //check if touch screen
        if('ontouchstart' in window || navigator.msMaxTouchPoints){
            this.touch = true;
        }     
        let sx,sy;
        //touch start
        this.$refs['vue-hover-zs'].addEventListener('touchstart',(e) => {
            if(this.zoomed){
                if (e.cancelable) {
                    e.preventDefault();
                }
                let touchmovement = e.changedTouches[0]
                sx=touchmovement.pageX-this.cx;
                sy=touchmovement.pageY-this.cy; 

            }
        });

        //drag zoom if touch device
        this.$refs['vue-hover-zs'].addEventListener('touchmove',(e) => {
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
        }); 

        //end touch
        this.$refs['vue-hover-zs'].addEventListener('touchend',(e) => {
            if(this.zoomed){
                let touchmovement = e.changedTouches[0]
                this.cx=touchmovement.pageX-sx;
                this.cy=touchmovement.pageY-sy;
            }
        }); 
    },

    created() {     
        window.addEventListener("resize", this.debounce(() => {this.resize()},500));
    },
    unmounted() {   
        window.removeEventListener("resize", this.resize());
    },

    methods: { 
        debounce(callback, wait) {
            let timeout;
            return (...args) => {
                const context = this;
                clearTimeout(timeout);
                timeout = setTimeout(() => callback.apply(context, args), wait);
            };
        },
        get_options(){      
            this.options.zoomAmount = this.zoomAmount;
            this.options.zoom = this.zoom;
            this.options.zoomWebp = this.zoomWebp;

            if(!this.zoom){
                this.options.zoom = this.regular;
                this.options.zoomAmount = 2;
            }

            if(!this.zoomWebp && this.regularWebp){
                this.options.zoomWebp = this.regularWebp;
                this.options.zoomAmount = 2;
            }
            this.resize();      
        },
        resize(){
            this.zoomed = false;
            this.loaded = false;
        },
        check_webp_feature(feature, callback) {
            let kTestImages = {
                lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
            };
            let img = new Image();
            img.onload = () => {
                let result = (img.width > 0) && (img.height > 0);
                callback(feature, result);
            };
            img.onerror = () => {
                callback(feature, false);
            };
            img.src = "data:image/webp;base64," + kTestImages[feature];
        },
        loadImage(src, callback) {
            const sprite = new Image();
            sprite.onload = callback;
            sprite.src = src;
        },
        loadZoom(){
            //get width and height of container
            this.offset();

            //set zoom width if zoom amount option applied
            if(this.options.zoomAmount != 0){
                this.zoomWidth = this.origX * this.options.zoomAmount;
                this.zoomHeight = this.origY * this.options.zoomAmount;
                if(this.touch){
                  this.mobilePos();
                }
            }

            //only do this if we havent loaded the zoom before
            if(!this.loaded){
                this.zoomLoad()
            } else {
                this.zoomed = true;       
                //get zoom amount for default zoom again as screen size may have changed
                if(this.options.zoomAmount == 0){
                  this.options.zoomAmount = this.zoomWidth / this.origX;
                }
            }
        },
        zoomLoad(){
            if(!this.clickZoom || this.touch){
                this.loading = true;
            }
            //load zoom image
            let zoomToLoad = this.options.zoom;
            if(this.breakpoints){
                this.breakpoints.forEach( (item) => {
                    if(window.innerWidth >= item.width){
                        if(item.zoom){
                            zoomToLoad = item.zoom;             
                        } else {
                            zoomToLoad = item.regular;
                        }
                    }
                });
            }
            if(this.webp_supported && this.options.zoomWebp){
                zoomToLoad = this.options.zoomWebp;
                if(this.breakpoints){
                    this.breakpoints.forEach( (item) => {
                        if(window.innerWidth >= item.width){
                            if(item.zoomWebp){
                                zoomToLoad = item.zoomWebp;               
                            } else {
                                zoomToLoad = item.regularWebp;
                            }
                        }
                    });
                }
            }
            this.loadImage(zoomToLoad,(src) => {
                if(this.options.zoomAmount == 0){
                    //if zoom amount not set, work it out from loaded zoom image width
                    this.zoomWidth = src.target.width;
                    this.zoomHeight = src.target.height;
                    this.options.zoomAmount = src.target.width / this.origX;
                }
                this.loaded = true;
                this.loading = false; 
                if(!this.clickZoom || this.touch){
                    this.zoomed = true; 
                    this.mobilePos();
                }
            });
        },
        isZoom(type, action){
            if((action == 'hover' && !this.clickZoom && !this.touch) || (action == 'click' && (this.clickZoom || this.touch)) || typeof type === 'object'){                
                //set zoomed to false
                this.zoomed = false;

                //if true passed load the zoom image
                if(type == true){
                    this.loadZoom();
                }
            }
        },
        mobilePos(){
            let X = (this.zoomWidth - this.origX) * this.touchZoomPos[0];
            let Y = (this.zoomHeight - this.origY) * this.touchZoomPos[1];
            if(this.touchZoomPos[0] > 1 || this.touchZoomPos[0] < 0 || this.touchZoomPos[1] > 1 || this.touchZoomPos[1] < 0){
                X = 0;
                Y = 0;
            }
            this.cx=-X;this.cy=-Y;this.x=-X;this.y=-Y;
            this.touchPosition='translate3d(-'+X+'px,-'+Y+'px,0)';
        },
        offset(){     
            this.origX = parseFloat(this.$refs['vue-hover-zs'].offsetWidth);
            this.origY = parseFloat(this.$refs['vue-hover-zs'].offsetHeight);     
        },
        mousePos(e){  
            //get offset of container
            this.offsetLeft = window.pageXOffset + this.$refs['vue-hover-zs'].getBoundingClientRect().left;
            this.offsetTop = window.pageYOffset + this.$refs['vue-hover-zs'].getBoundingClientRect().top;
            //set x and y of mouse in the container for the transform in style bind
            if(!this.touch && !this.loading){ 
                if(!this.loaded){         
                    this.offset();
                    this.zoomLoad();
                } else {
                    this.x = (e.pageX - this.offsetLeft) * (this.options.zoomAmount - 1);
                    this.y = (e.pageY - this.offsetTop) * (this.options.zoomAmount - 1);
                }
            }
        }
    }

};
</script>