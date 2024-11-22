import { LgSaveClickEvent, LgSaveClickEventHandler } from "./lg-save-event";

export interface SaveStrings {
    save: string;
}

export interface SaveSettings {
    /**
     * Enable/Disable save option
     */
    save?: boolean;

    /**
     * Custom translation strings for aria-labels
     */
    savePluginStrings?: SaveStrings;

    /**
     * Save on click event handler.
     */
    onSaveClick?: LgSaveClickEventHandler<HTMLButtonElement>;
}

export const saveSettings: SaveSettings = {
    save: true,
    savePluginStrings: {
        save: 'Save image'
    },
    onSaveClick: (e: LgSaveClickEvent<HTMLButtonElement>) => {
        console.log('Save on clicked.', e);
    }
};