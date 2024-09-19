import '@mui/material/styles';

declare module '@mui/material/Chip' {
    interface ChipPropsColorOverrides {
        danger: true;
        default: true;
    }
}