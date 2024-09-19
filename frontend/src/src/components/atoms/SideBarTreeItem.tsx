import { ListItemButton, ListItemIcon, ListItemText, Collapse, List } from "@mui/material";
import * as Icons from '@mui/icons-material';
import { Icon } from "./Icon";
import React from "react";
import { Link } from "react-router-dom";

export interface SideBarTreeItemProps {
    text?: string;
    path?: string;
    icon?: keyof typeof Icons;
    children?: SideBarTreeItemProps[];
    isChild?: boolean;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    isExpandable?: boolean;
    open?: boolean;
};

export const SideBarTreeItem = (props: SideBarTreeItemProps) => {
    return (
        <React.Fragment>
            <ListItemButton
                onClick={props.onClick}
                sx={{
                    minHeight: 48,
                    justifyContent: 'center',
                    px: 2.5,
                }}
                className={['sidebar-item-button', (props.isChild ? 'sidebar-item-button-child' : null)].join(' ')}
            >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: 3,
                        justifyContent: 'center',
                    }}
                    className="sidebar-item-icon"
                >
                    <Icon name={props.icon} />
                </ListItemIcon>
                <ListItemText className="sidebar-item-text" primary={props.text} />
                { props.isExpandable ? props.open ? <Icons.ExpandLess className="sidebar-arrow-icon" /> : <Icons.ExpandMore className="sidebar-arrow-icon" /> : null }
            </ListItemButton>
            {
                props.isExpandable ?
                <Collapse in={props.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {
                            props.children?.map((item, index) =>
                                item.path ?
                                <Link key={index} to={item.path} ><SideBarTreeItem text={item.text} icon={item.icon} path={item.path} isChild={true} /></Link> :
                                <SideBarTreeItem key={index} text={item.text} icon={item.icon} path={item.path} isChild={true} />
                            )
                        }
                    </List>
                </Collapse>
                : null
            }
        </React.Fragment>
    );
};