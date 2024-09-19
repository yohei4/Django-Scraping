import '@mui/material/styles';

declare module '@mui/material/InputLabel' {
    interface InputLabelPropsColorOverrides {
        danger: true;
        default: true;
    }
}