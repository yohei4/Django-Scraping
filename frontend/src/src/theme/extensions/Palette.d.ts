import '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        danger: {
            main: string;
            light: string;
            contrastText: string;
        };
        default: {
            main: string;
            light: string;
            contrastText: string;
        };
    }

    interface PaletteOptions {
        danger?: {
            main?: string;
            light?: string;
            contrastText?: string;
        };
        default?: {
            main?: string;
            light?: string;
            contrastText?: string;
        };
    }
}