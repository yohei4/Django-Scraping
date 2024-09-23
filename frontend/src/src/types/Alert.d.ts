import '@mui/material/styles';

declare module '@mui/material/Alert' {
    interface AlertPropsColorOverrides {
        primary: true;
        secondary: true;
        danger: true;
        default: true;
        grey: true;
    }
}