import { FC, memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { InitDetail } from 'lightgallery/lg-events';
import LightGallery, { LightGalleryProps } from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import fjGallery from 'flickr-justified-gallery';
import { Box, Link } from '@mui/material';
import lgSave from '@plugins/lightgallery/save/lg-save';

export interface ImagesGalleryProps extends LightGalleryProps {
    items?: string[];
}

const ImagesGallery: FC<ImagesGalleryProps> = (props) => {
    const lightGallery = useRef<any>(null);
    const { elementClassNames, items, onSaveClick } = props;

    useEffect(() => {
        lightGallery.current.refresh();
        if (0 < (items?.length ?? 0)) {
            fjGallery(document.querySelectorAll(elementClassNames ?? '.gallery'), {
                itemSelector: '.gallery-item',
                rowHeight: 180,
                lastRow: 'start',
                gutter: 10,
                rowHeightTolerance: 0.1,
                calculateItemsHeight: false,
            });
        } else {
            fjGallery(document.querySelectorAll(elementClassNames ?? '.gallery'), 'destroy');
        }

        return () => {
            fjGallery(document.querySelectorAll(elementClassNames ?? '.gallery'), 'destroy');
        };
    }, [items]);

    const onInit = useCallback((detail: InitDetail) => {
        if (detail) {
            lightGallery.current = detail.instance;
        }
    }, []);

    const imageList = useMemo(() => items?.map((src, i) => (
        <Link
            key={i}
            className='gallery-item'
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
    )), [items]);
    
    return (
        <LightGallery
            {...props}
            plugins={[lgSave, lgThumbnail]}
            elementClassNames={elementClassNames ?? 'gallery'}
            mode='lg-fade'
            pager={false}
            thumbnail={true}
            autoplayFirstVideo={false}
            onInit={onInit}
            onSaveClick={onSaveClick}
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

export default memo(ImagesGallery, (prevProps, nextProps) => {
    return (
        prevProps.items === nextProps.items
    );
});