// Dom manipulation utility module from lightGallery
import { LgQuery } from '../../lgQuery';
// lightGallery core
import { LightGallery } from '../../lightgallery';
import { AutoplaySettings, autoplaySettings } from './lg-medium-zoom-settings';

export default class Save {
    core: LightGallery;
    settings: AutoplaySettings;
    private $LG!: LgQuery;
    constructor(instance: LightGallery, $LG: LgQuery) {
        // get lightGallery core plugin instance
        this.core = instance;

        this.$LG = $LG;

        // extend module default settings with lightGallery core settings
        this.settings = { ...autoplaySettings, ...this.core.settings };

        return this;
    }

    // Do not call init function in constructor
    // lightGallery will automatically call init at the right time
    init(): void {
        if (this.settings.autoplay) {
            // Write your awesome stuff
        }
    }

    // Cleanup plugin
    destroy(): void {}
}