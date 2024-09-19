import { styled } from "@mui/material";

interface MainProps {
    open?: boolean;
}

export const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<MainProps>
    (({ theme, open }) => ({
        padding: `${theme.spacing(5)} ${theme.spacing(5)}`,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: `calc(${theme.spacing(7)} + 1px)`,
            ...(open && {
                marginLeft: theme.sideBar.width,
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            }),
        },
        [theme.breakpoints.down('sm')]: {
            padding: `${theme.spacing(4)} ${theme.spacing(2)}`,
        }
    }));
