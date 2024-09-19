import { MenuItem as MuiMenuItem, MenuItemProps } from "@mui/material";

export const MenuItem: React.FC<MenuItemProps> = (props) => {
    return (
        <MuiMenuItem {...props} >{props.children}</MuiMenuItem>
    );
}
