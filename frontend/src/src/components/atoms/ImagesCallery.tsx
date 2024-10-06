import { FC, useEffect, useMemo } from 'react';
import LightGallery, { LightGalleryProps } from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import fjGallery from 'flickr-justified-gallery';
import { Box, Link } from '@mui/material';

export interface ImagesGalleryProps extends LightGalleryProps {
    images?: string[];
}

export const ImagesGallery: FC<ImagesGalleryProps> = (props) => {
    const { images } = props;

    useEffect(() => {
        if (0 < (images?.length ?? 0)) {
            fjGallery(document.querySelectorAll('.gallery'), {
                itemSelector: '.gallery__item',
                rowHeight: 180,
                lastRow: 'start',
                gutter: 10,
                rowHeightTolerance: 0.1,
                calculateItemsHeight: false,
            });
        } else {
            fjGallery(document.querySelectorAll('.gallery'), 'destroy');
        }
        return () => {
            fjGallery(document.querySelectorAll('.gallery'), 'destroy');
        };
    }, [images]);

    const imageList = useMemo(() => images?.map((src, i) => (
        <Link
            key={i}
            className='gallery__item'
            data-src={src}
            sx={{
                position: 'relative',
            }}
        >
            <Box
                component='img'
                className="img-responsive"
                src={src}
                style={{width: '100%'}}
            />
        </Link>
    )), [images])

    return (
        <LightGallery
            {...props}
            plugins={[lgZoom, lgThumbnail]}
            elementClassNames='gallery'
            mode='lg-fade'
            pager={false}
            thumbnail={true}
            autoplayFirstVideo={false}
            mobileSettings={{
                controls: false,
                showCloseIcon: false,
                download: false,
                rotate: false,
            }}
        >
            {imageList}
        </LightGallery>
    );
};