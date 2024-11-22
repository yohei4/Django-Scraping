import { SaveSettings } from '@plugins/lightgallery/save';

declare module 'lightgallery/react' {
    export interface LightGalleryProps extends SaveSettings {
    }
}
