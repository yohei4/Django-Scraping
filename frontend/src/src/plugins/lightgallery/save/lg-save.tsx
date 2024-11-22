// Dom manipulation utility module from lightGallery
import { LgQuery } from 'lightgallery/lgQuery';
// lightGallery core
import { LightGallery } from 'lightgallery/lightgallery';
import { SaveSettings, saveSettings } from './lg-save-settngs';
import { LgSaveClickEvent } from './lg-save-event';

export default class Save {
    core: LightGallery;
    private $LG!: LgQuery;
    private settings: SaveSettings;
    constructor(instance: LightGallery, $LG: LgQuery) {
        // get lightGallery core plugin instance
        this.core = instance;
        this.$LG = $LG;

        // extend module default settings with lightGallery core settings
        this.settings = { ...saveSettings, ...this.core.settings };

        return this;
    }

    // Do not call init function in constructor
    // lightGallery will automatically call init at the right time
    init(): void {
        if (!this.settings.save) {
            return;
        }
        this.buildTemplates();

        this.core.$toolbar.find('#lg-save').first().on('click', (e: LgSaveClickEvent<HTMLButtonElement>) => {
            e.src = this.getCurrentImageSrc();
            if(this.settings.onSaveClick) this.settings.onSaveClick(e);
        });
    }

    closeGallery(): void {
    }

    // Cleanup plugin
    destroy(): void {
    }

    /**
     * HTML building method.
     */
    private buildTemplates(): void {
        this.core.$toolbar.append(`<button type="button" id="lg-save" aria-label="${this.settings.savePluginStrings?.save}" class="lg-save lg-icon"></button>`);
    }

    /**
     * HTML building method.
     */
    private getCurrentImageSrc(): string {
        return this.core.getSlideItem(this.core.index).find('.lg-image').first().attr('src') ?? '';
    }
}