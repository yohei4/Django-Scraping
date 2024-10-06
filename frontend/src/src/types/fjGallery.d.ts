// src/types/flickr-justified-gallery.d.ts
declare module 'flickr-justified-gallery' {
    export interface fjGalleryOptions {
        itemSelector?: string;
        rowHeight?: number;
        maxRowHeight?: number;
        margins?: number;
        randomize?: boolean;
        lastRow?: 'nojustify' | 'justify' | 'hide' | 'start';
        gutter?: number;
        rowHeightTolerance?: number;
        calculateItemsHeight?: boolean;
        refreshTime?: number;
        refreshSensitivity?: number;
        border?: number;
        captions?: boolean;
        cssAnimation?: boolean;
        rel?: string;
        target?: '_blank' | '_self' | '_parent' | '_top';
        captionSettings?: {
            animationDuration?: number;
            visibleOpacity?: number;
            nonVisibleOpacity?: number;
        };
        imageSize?: 'cover' | 'contain' | 'auto';
        onInit?: () => void;
        onDestroy?: () => void;
        onRefresh?: () => void;
    };

    export default function fjGallery(
        elements: NodeListOf<HTMLElement> | HTMLElement[],
        options?: string | fjGalleryOptions,
    ): void;
}