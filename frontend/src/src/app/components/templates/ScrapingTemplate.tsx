import React from "react";
import { PageTitle } from "@components/molecules/PageTitle";
import { Box } from "@mui/material";
import { AsyncFreeSolo } from "@components/atoms/AsyncFreeSolo";
import { Icon } from "@components/atoms/Icon";
import { DefaultButton } from "@components/atoms/DefaultButton";
import { ImagesGallery } from "@components/atoms/ImagesCallery";
import { FETCH_SCRAPING_HISTORY } from "@app/constants/ApiUrls";

export interface ScrapingTemplateProps {
    images: string[];
    onSubmit?: React.FormEventHandler<HTMLFormElement>;
};

export const ScrapingTemplate :React.FC<ScrapingTemplateProps> = ({
    images,
    onSubmit
}) => {
    return (
        <React.Fragment>
            <PageTitle text="スクレイピング" sx={{ mb: 4 }}></PageTitle>
            <Box
                component="form"
                onSubmit={onSubmit}
                sx={{
                    display: 'flex',
                    columnGap: 1,
                    justifyContent: 'center',
                    marginBottom: '3rem'
                }}
            >
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
            <Box>
                <ImagesGallery
                    galleryId='scraping'
                    images={images}
                />
            </Box>
        </React.Fragment>
    );
};
