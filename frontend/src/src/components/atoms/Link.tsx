import { Link as RouterLink, To } from 'react-router-dom';
import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material";
import React from 'react';

export interface LinkProps extends MuiLinkProps {
    to: To;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
    return <MuiLink component={RouterLink} ref={ref} {...props} />;
});
