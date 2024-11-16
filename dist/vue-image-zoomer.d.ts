declare module "vue-image-zoomer" {
    const _default: import("vue").DefineComponent<{
        regular: StringConstructor;
        regularWebp: StringConstructor;
        zoom: StringConstructor;
        zoomWebp: StringConstructor;
        imgClass: {
            type: StringConstructor;
            default: string;
        };
        alt: StringConstructor;
        zoomAmount: {
            type: NumberConstructor;
            default: number;
        };
        clickZoom: BooleanConstructor;
        hoverMessage: {
            type: StringConstructor;
            default: string;
        };
        touchMessage: {
            type: StringConstructor;
            default: string;
        };
        clickMessage: {
            type: StringConstructor;
            default: string;
        };
        closePos: {
            type: StringConstructor;
            default: string;
        };
        messagePos: {
            type: StringConstructor;
            default: string;
        };
        showMessage: {
            type: BooleanConstructor;
            default: boolean;
        };
        showMessageTouch: {
            type: BooleanConstructor;
            default: boolean;
        };
        breakpoints: ArrayConstructor;
        touchZoomPos: {
            type: ArrayConstructor;
            default(): number[];
        };
        lazyload: BooleanConstructor;
        tapToClose: BooleanConstructor;
        lazyloadPlaceholder: {
            type: StringConstructor;
            default: string;
        };
    }, {}, {
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
    }, {
        propChanges(): string;
    }, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
        regular: StringConstructor;
        regularWebp: StringConstructor;
        zoom: StringConstructor;
        zoomWebp: StringConstructor;
        imgClass: {
            type: StringConstructor;
            default: string;
        };
        alt: StringConstructor;
        zoomAmount: {
            type: NumberConstructor;
            default: number;
        };
        clickZoom: BooleanConstructor;
        hoverMessage: {
            type: StringConstructor;
            default: string;
        };
        touchMessage: {
            type: StringConstructor;
            default: string;
        };
        clickMessage: {
            type: StringConstructor;
            default: string;
        };
        closePos: {
            type: StringConstructor;
            default: string;
        };
        messagePos: {
            type: StringConstructor;
            default: string;
        };
        showMessage: {
            type: BooleanConstructor;
            default: boolean;
        };
        showMessageTouch: {
            type: BooleanConstructor;
            default: boolean;
        };
        breakpoints: ArrayConstructor;
        touchZoomPos: {
            type: ArrayConstructor;
            default(): number[];
        };
        lazyload: BooleanConstructor;
        tapToClose: BooleanConstructor;
        lazyloadPlaceholder: {
            type: StringConstructor;
            default: string;
        };
    }>>, {
        imgClass: string;
        zoomAmount: number;
        clickZoom: boolean;
        hoverMessage: string;
        touchMessage: string;
        clickMessage: string;
        closePos: string;
        messagePos: string;
        showMessage: boolean;
        showMessageTouch: boolean;
        touchZoomPos: unknown[];
        lazyload: boolean;
        tapToClose: boolean;
        lazyloadPlaceholder: string;
    }>;
    export default _default;

}
