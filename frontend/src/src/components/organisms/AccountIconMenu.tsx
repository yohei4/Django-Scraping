import React from "react";
import { IconButton, Menu, MenuItem, MenuItemProps } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

export interface AccountIconMenuProps {
    items?: MenuItemProps[];
}

export const AccountIconMenu: React.FC<AccountIconMenuProps> = ({ items }) => {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <React.Fragment>
            <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleOpenUserMenu}
                color="inherit"
                >
                <AccountCircle />
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                {
                    items?.map((itemProps, index) => (
                        <MenuItem
                            {...itemProps}
                            key={index}
                            onClick={(e) => {
                                if(itemProps.onClick) itemProps.onClick(e);
                                handleCloseUserMenu();
                            }}
                            sx={{
                                ...itemProps.sx,
                                justifyContent: 'center',
                            }}
                        />
                    ))
                }
            </Menu>
        </React.Fragment>
    );
};