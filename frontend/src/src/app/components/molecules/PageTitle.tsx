import { PageTitle as CPageTitle, PageTitleProps as CPageTitleProps } from "@components/molecules/PageTitle";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";

interface PageTitleProps extends CPageTitleProps {
}

export const PageTitle : React.FC<PageTitleProps> = (props) => {
    return (
        <CPageTitle {...props}>
            {
                props.children ?
                <Box sx={{
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                }}>
                    {props.children}
                </Box> :
                null
            }
        </CPageTitle>
    );
};