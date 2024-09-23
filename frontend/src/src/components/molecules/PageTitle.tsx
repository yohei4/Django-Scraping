import React from "react";
import { Box, BoxProps, Grid2 as Grid, Typography } from "@mui/material";

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
                <Grid size={{ xs: props.children ? 6 : 12 }} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box><Typography variant="pageTitle">{props.text}</Typography></Box>
                </Grid>
                {
                    props.children ?
                    <Grid size={{ xs: 6 }}>
                        <Box sx={{
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'end',
                            alignItems: 'center',
                        }}>
                            {props.children}
                        </Box>
                    </Grid> :
                    null
                }
            </Grid>
        </Box>
    );
};