import { Box, Grid } from "@mui/material";
import { CardLink, CardLinkProps } from "../atoms/CardLink";
import React from "react";

export interface CardLinksProps {
    cards?: CardLinkProps[];
}

export const CardLinks : React.FC<CardLinksProps> = ({cards}) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
                {
                    cards?.map((card, index) => {
                        return (
                            <Grid key={index} item xs={6} sm={4} md={3} sx={{
                                '& .MuiPaper-root': {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }
                            }} >
                                <CardLink {...card} />
                            </Grid>
                        );
                    })
                }
            </Grid>

        </Box>
    );
};