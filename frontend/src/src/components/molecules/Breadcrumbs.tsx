import React from 'react';
import { To } from 'react-router-dom';
import {  BreadcrumbsProps as MuiBreadcrumbsProps, Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material";
import { Link } from '@components/atoms/Link';
import { Icon } from '@components/atoms/Icon';

interface Breadcrumb {
    path?: To;
    text?: React.ReactNode;
}

export interface BreadcrumbsProps extends Omit<MuiBreadcrumbsProps, 'children'> {
    children: Breadcrumb[];
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ children, ...props }) => {
    return (
        <MuiBreadcrumbs separator={<Icon name="NavigateNext" fontSize="small" />} {...props} >
            {
                children.map(({ path, text }, index) => (
                    path ?
                    <Link underline="hover" key={index} color="inherit" to={path}><Typography sx={{ color: 'text.primary' }}>{text}</Typography></Link> :
                    <Typography key={index} sx={{ color: 'text.primary' }}>{text}</Typography>
                ))
            }
        </MuiBreadcrumbs>
    );
}