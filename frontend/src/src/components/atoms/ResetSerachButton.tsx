import { Box, Link, SxProps, Theme } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import React, { ReactNode } from "react";

export interface ResetSerachButtonProps {
    children?: ReactNode; 
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    sx?: SxProps<Theme>;
}

export const ResetSerachButton = (props: ResetSerachButtonProps) => {
    return (
        <Link sx={{ display: 'flex', alignItems: 'center', minWidth: 'fit-content', ...props.sx }} component="button" onClick={props.onClick} underline="none">
            <CancelIcon fontSize="small" />
            <Box component="span" sx={{ marginTop: '.1rem', marginLeft: '.1rem' }}>{props.children}</Box>
        </Link>
    );
};