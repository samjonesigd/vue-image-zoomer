import Vue, { VueConstructor } from 'vue';

export interface ImageZoomBreakpoint {
    width: number;
    regular: string;
    regularWebp?: string;
    zoom?: string;
    zoomWebp?: string;
}

export interface ImageZoomProps {
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
    breakpoints?: ImageZoomBreakpoint[];
    touchZoomPos?: [number, number];
    lazyload?: boolean;
    tapToClose?: boolean;
    closeOnClickOutside?: boolean;
    edgeOffset?: number;
}

declare const ImageZoom: VueConstructor<Vue & ImageZoomProps>;
export default ImageZoom;
