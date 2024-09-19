import { Box, BoxProps, Grid, Typography } from "@mui/material";
import React from "react";

export interface PageTitleProps extends BoxProps {
    text?: string;
    children?: React.ReactNode;
}

export const PageTitle : React.FC<PageTitleProps> = (props) => {
    return (
        <Box
            sx={{ width: '100%', ...props.sx }}
        >
            <Grid container spacing={0}>
                <Grid item xs={props.children ? 6 : 12} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box><Typography variant="pageTitle">{props.text}</Typography></Box>
                </Grid>
                {
                    props.children ?
                    <Grid item xs={6}>
                        {props.children}
                    </Grid> :
                    null
                }
            </Grid>
        </Box>
    );
};