import { AppBar as MuiAppBar, AppBarProps as MuiAppBarProps, IconButton, Toolbar, styled, Box } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

export interface AppBarProps extends MuiAppBarProps {
    open: boolean;
    rightToolbar?: React.ReactNode;
}

const CustomAppBar = (props: AppBarProps) => {
    return (
        <MuiAppBar position={props.position} className={props.className} onClick={undefined} >
            <Toolbar>
                <IconButton onClick={props.onClick} size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                {props.rightToolbar}
            </Toolbar>
        </MuiAppBar>
    );
};

export const AppBar = styled(CustomAppBar)<AppBarProps>
    (({ theme, open }) => ({
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            [theme.breakpoints.up('md')]: {
                width: `calc(100% - (${theme.spacing(7)} + 1px))`,
                marginLeft: `calc(${theme.spacing(7)} + 1px)`,
                ...(open && {
                    width: `calc(100% - ${theme.sideBar.width}px)`,
                    marginLeft: theme.sideBar.width,
                    transition: theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                }),
            },
    }));
