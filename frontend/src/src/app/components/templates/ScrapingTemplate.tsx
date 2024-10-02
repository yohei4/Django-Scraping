import React from "react";
import { PageTitle } from "@components/molecules/PageTitle";
import { Box } from "@mui/material";
import { AsyncFreeSolo } from "@components/atoms/AsyncFreeSolo";
import { FETCH_SCRAPING_HISTORY } from "@app/constants/ApiUrls";
import { DefaultButton } from "@components/atoms/DefaultButton";
import { Icon } from "@components/atoms/Icon";

export interface ScrapingTemplateProps {
    onSubmit?: React.FormEventHandler<HTMLFormElement>;
};

export const ScrapingTemplate :React.FC<ScrapingTemplateProps> = (props) => {
    return (
        <React.Fragment>
            <PageTitle text="スクレイピング" sx={{ mb: 4 }}></PageTitle>
            <Box
                component="form"
                onSubmit={props.onSubmit}
                sx={{
                display: 'flex',
                columnGap: 1,
                justifyContent: 'center',
            }}>
                <AsyncFreeSolo
                    name='keyword'
                    url={FETCH_SCRAPING_HISTORY}
                    sx={(theme) => ({
                        width: '100%',
                        [theme.breakpoints.up('lg')]: {
                            width: '50%'
                        }
                    })}
                />
                <DefaultButton type="submit"><Icon name="Search" /></DefaultButton>
            </Box>
        </React.Fragment>
    );
};