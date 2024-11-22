import { useCallback, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useClient } from '@hooks';
import { IScrapingHistory } from '@app/interfaces/IScrapingHistory';
import { ScrapingTemplate } from '@app/components/templates/ScrapingTemplate';
import { LgSaveClickEvent, LgSaveClickEventHandler } from '@plugins/lightgallery/save';
import { SAVE_IMAGE, SCRAPING } from '@app/constants/ApiUrls';

export const Scraping = () => {
    const methods = useForm<IScrapingHistory>();
    const keyword = methods.watch('keyword');
    const { post } = useClient(true);
    const [images, setImages] = useState<string[]>([]);

    // submit 処理
    const submit: SubmitHandler<IScrapingHistory> = async (data: IScrapingHistory) => {
        setImages([]);
        await post(SCRAPING, data, true)
            .then(({ data }) => {
                setImages(data);
            });
    };

    // 画像保存処理
    const handleSaveClick: LgSaveClickEventHandler<HTMLButtonElement> = useCallback(async (e: LgSaveClickEvent) => {
        await post(SAVE_IMAGE, { origin_link: e.src, keyword: keyword }, true);
    }, [keyword]);

    return (
        <FormProvider {...methods}>
            <ScrapingTemplate
                items={images}
                onSubmit={methods.handleSubmit(submit)}
                onSaveClick={handleSaveClick}
            />
        </FormProvider>
    );
};
