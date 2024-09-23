import React, { ReactEventHandler } from "react";
import { SideBar } from "@components/molecules/SideBar";
import { AppBar } from "@components/molecules/AppBar";
import { SideBarTreeProps } from "@components/molecules/SideBarTree";
import * as Icons from '@mui/icons-material';

interface MenuProps {
    open: boolean;
    position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
    title?: string;
    icon?: keyof typeof Icons;
    sideBarTree?: SideBarTreeProps[];
    appBarRightToolbar?: React.ReactNode;
    onClick?: ReactEventHandler<HTMLElement>;
}

export const Menu =(props: MenuProps) => {
    return (
        <React.Fragment>
            <AppBar position={props.position} open={props.open} onClick={props.onClick} rightToolbar={props.appBarRightToolbar} />
            <SideBar tree={props.sideBarTree} title={props.title} icon={props.icon} open={props.open} onClick={props.onClick} />
        </React.Fragment>
    )
}