declare module "VueImageZoomer.vue" {
    const _default: import("vue").DefineComponent<{}, {}, {
        touch: boolean;
        zoomed: boolean;
        x: number;
        y: number;
        touchPosition: number;
        origX: number;
        origY: number;
        offsetLeft: number;
        offsetTop: number;
        zoomWidth: number;
        zoomHeight: number;
        options: {
            zoomAmount: number;
            zoom: boolean;
            zoomWebp: boolean;
        };
        loaded: boolean;
        loading: boolean;
        webp_supported: boolean;
        cx: number;
        cy: number;
        showSlot: boolean;
    }, {
        propChanges(): string;
    }, {
        touchLogic(): Promise<void>;
        debounce(callback: any, wait: any): (...args: any[]) => void;
        get_options(): void;
        resize(): void;
        check_webp_feature(feature: any, callback: any): void;
        loadImage(src: any, callback: any): void;
        loadZoom(): void;
        zoomLoad(): void;
        isZoom(type: any, action: any): void;
        mobilePos(): void;
        offset(): void;
        mousePos(e: any): void;
    }, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("onZoom" | "offZoom" | "regularLoaded" | "zoomLoaded" | "zoomLoading" | "regularError" | "zoomError")[], "onZoom" | "offZoom" | "regularLoaded" | "zoomLoaded" | "zoomLoading" | "regularError" | "zoomError", import("vue").PublicProps, Readonly<{}> & Readonly<{
        onOnZoom?: (...args: any[]) => any;
        onOffZoom?: (...args: any[]) => any;
        onRegularLoaded?: (...args: any[]) => any;
        onZoomLoaded?: (...args: any[]) => any;
        onZoomLoading?: (...args: any[]) => any;
        onRegularError?: (...args: any[]) => any;
        onZoomError?: (...args: any[]) => any;
    }>, {
        clickZoom: boolean;
        tapToClose: boolean;
        lazyload: boolean;
        imgClass: string;
        zoomAmount: number;
        hoverMessage: string;
        touchMessage: string;
        clickMessage: string;
        closePos: string;
        messagePos: string;
        showMessage: boolean;
        showMessageTouch: boolean;
        touchZoomPos: unknown[];
        rightClick: boolean;
    }, {}, {}, {
        clickOutside: {
            mounted(el: any, binding: import("vue").DirectiveBinding<any, string, string>): void;
            unmounted(el: any): void;
        };
    }, string, import("vue").ComponentProvideOptions, true, {}, any>;
    export default _default;
}
