import React from "react";
import { Drawer, DrawerProps, Divider, styled, List, CSSObject, Theme, Box, IconButton, Typography, Backdrop } from "@mui/material";
import * as Icons from '@mui/icons-material';
import { Icon } from '@components/atoms/Icon';
import { SideBarTree, SideBarTreeProps } from "@components/molecules/SideBarTree";

interface SideBarProps extends DrawerProps {
    open: boolean;
    title?: string;
    icon?: keyof typeof Icons;
    tree?: SideBarTreeProps[];
}

// アニメーション定義
const openedMixin = (theme: Theme): CSSObject => ({
    width: theme.sideBar.width,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});
const closedMixin = (theme: Theme): CSSObject => ({
    width: 0,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    [theme.breakpoints.up('md')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    }
});

// サイドバーヘッダーのスタイル定義
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1.5),
    ...theme.mixins.toolbar,
    backgroundColor: theme.sideBar.header.backgroundColor,
    color: theme.palette.default.contrastText,
}));

const CustomSideBar = (props: SideBarProps) => {
    return (
        <React.Fragment>
            <Drawer {...props} variant="permanent" onClick={undefined} open={props.open}>
                <DrawerHeader>
                    <Box>
                        <IconButton>
                            <Icon name={props.icon} />
                        </IconButton>
                        <Typography variant="subtitle1">{props.title}</Typography>
                    </Box>
                </DrawerHeader>
                <Divider />
                <List component="nav">
                    {
                        props.tree?.map((item, index) => {
                            return (
                            <SideBarTree key={index} {...item} />
                            )
                        })
                    }
                </List>
            </Drawer>
            <Backdrop
                sx={[
                    { zIndex: (theme) => theme.zIndex.drawer - 1,},
                    ((theme) => ({
                        [theme.breakpoints.up('md')]: {
                            display: 'none',
                        }
                    })),
                ]}
                open={props.open}
                onClick={props.onClick}
            />
        </React.Fragment>
    );
};

// スタイル
export const SideBar = styled(CustomSideBar)<SideBarProps>(
    ({ theme, open }) => ({
        width: 0,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        '& .MuiBox-root': {
            display: 'flex',
            alignItems: 'center',
            ...(open && {
                '& .MuiTypography-root': {
                    opacity: 1,
                }
            }),
            ...(!open && {
                '& .MuiTypography-root': {
                    opacity: 0,
                }
            }),
        },
        '& .MuiPaper-root.MuiDrawer-paper': {
            backgroundColor: theme.sideBar.backgroundColor,
        },
        '& .MuiSvgIcon-root, & .MuiListItemText-root': {
            color: '#fff',
        },
        '& a': {
            textDecoration: 'none', 
        },
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
            '& .sidebar-item-button': {
                justifyContent: 'initial',
            },
            '& .sidebar-item-button-child': {
                paddingLeft: '32px',
            },
            '& .sidebar-arrow-icon': {
                display: 'block',
            },
            '& .sidebar-item-text': {
                opacity: 1,
            }
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
            '& .sidebar-item-button': {
                justifyContent: 'center',
            },
            '& .sidebar-item-icon': {
                marginRight: 'auto'
            },
            '& .sidebar-arrow-icon': {
                display: 'none',
            },
            '& .sidebar-item-text': {
                opacity: 0,
            }
        }),
        [theme.breakpoints.up('md')]: {
            '& .MuiBackdrop-root': {
                display: 'none',
            }
        }
    }),
);
