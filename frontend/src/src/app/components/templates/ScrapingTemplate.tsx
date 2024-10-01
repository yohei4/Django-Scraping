import React from "react";
import { PageTitle } from "@components/molecules/PageTitle";
import { Box } from "@mui/material";
import { AsyncFreeSolo } from "@components/atoms/AsyncFreeSolo";
import { FETCH_SCRAPING_HISTORY } from "@app/constants/ApiUrls";

export interface ScrapingTemplateProps {
};

export const ScrapingTemplate :React.FC<ScrapingTemplateProps> = (props) => {
    return (
        <React.Fragment>
            <PageTitle text="スクレイピング" sx={{ mb: 4 }}></PageTitle>
            <Box>
                <AsyncFreeSolo name='' url={FETCH_SCRAPING_HISTORY} />
            </Box>
        </React.Fragment>
    );
};