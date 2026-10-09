import type { DefineComponent, Plugin } from 'vue';

export interface VueImageZoomerBreakpoint {
    width: number;
    regular: string;
    regularWebp?: string;
    zoom?: string;
    zoomWebp?: string;
}

export interface VueImageZoomerProps {
    regular?: string;
    regularWebp?: string;
    zoom?: string;
    zoomWebp?: string;
    imgClass?: string;
    alt?: string;
    zoomAmount?: number;
    clickZoom?: boolean;
    hoverMessage?: string;
    touchMessage?: string;
    clickMessage?: string;
    closePos?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
    messagePos?: 'top' | 'bottom';
    showMessage?: boolean;
    showMessageTouch?: boolean;
    tapToClose?: boolean;
    breakpoints?: VueImageZoomerBreakpoint[];
    touchZoomPos?: [number, number];
    imgWidth?: number;
    imgHeight?: number;
    lazyload?: boolean;
    rightClick?: boolean;
    closeOnClickOutside?: boolean;
    edgeOffset?: number;
    onOnZoom?: () => void;
    onOffZoom?: () => void;
    onRegularLoaded?: () => void;
    onZoomLoaded?: () => void;
    onZoomLoading?: () => void;
    onRegularError?: (event: Event) => void;
    onZoomError?: (event: Event | string) => void;
}

export declare const VueImageZoomer: DefineComponent<VueImageZoomerProps>;

declare const VueImageZoomerPlugin: Plugin;
export default VueImageZoomerPlugin;

declare module 'vue' {
    export interface GlobalComponents {
        VueImageZoomer: typeof VueImageZoomer;
    }
}
