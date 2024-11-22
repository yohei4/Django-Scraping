import React from "react";
import { PageTitle } from "@components/molecules/PageTitle";
import { Box } from "@mui/material";
import ImagesGallery from "@components/atoms/ImagesCallery";

export interface AlbumTemplateProps {
    items: string[];
};

export const AlbumTemplate :React.FC<AlbumTemplateProps> = ({
    items,
}) => {
    return (
        <React.Fragment>
            <PageTitle text="画像一覧" sx={{ mb: 4 }}></PageTitle>
            <Box>
                <ImagesGallery
                    galleryId='scraping'
                    download={false}
                    save={false}
                    items={items}
                />
            </Box>
        </React.Fragment>
    );
};
