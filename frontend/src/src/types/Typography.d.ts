import '@mui/material/styles';

declare module '@mui/material/styles' {
    interface TypographyVariants {
        pageTitle: React.CSSProperties;
        error?: React.CSSProperties;
        gridFormLabel: React.CSSProperties;
    }

    interface TypographyVariantsOptions {
        pageTitle?: React.CSSProperties;
        error?: React.CSSProperties;
        gridFormLabel: React.CSSProperties;
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        pageTitle: true;
        error: true;
        gridFormLabel: true;
    }
}