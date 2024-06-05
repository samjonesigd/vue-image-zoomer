declare module "VueImageZoomer.vue" {
    const _default: import("vue").DefineComponent<Readonly<import("vue").ComponentPropsOptions<{
        [x: string]: unknown;
    }>>, any, {
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
    }, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("onZoom" | "offZoom" | "regularLoaded" | "zoomLoaded" | "zoomLoading")[], "onZoom" | "offZoom" | "regularLoaded" | "zoomLoaded" | "zoomLoading", import("vue").PublicProps, Readonly<readonly string[] | import("vue").ExtractPropTypes<Readonly<import("vue").ComponentObjectPropsOptions<{
        [x: string]: unknown;
    }>>>> & {
        onOnZoom?: (...args: any[]) => any;
        onOffZoom?: (...args: any[]) => any;
        onRegularLoaded?: (...args: any[]) => any;
        onZoomLoaded?: (...args: any[]) => any;
        onZoomLoading?: (...args: any[]) => any;
    }, {
        readonly [x: number]: string;
    } | {}, {}>;
    export default _default;

}
