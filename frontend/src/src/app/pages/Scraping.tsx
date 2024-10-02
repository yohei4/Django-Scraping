import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useClient } from '@hooks';
import { IScrapingHistory } from '@app/interfaces/IScrapingHistory';
import { ScrapingTemplate } from '@app/components/templates/ScrapingTemplate';
import { SCRAPING } from '@app/constants/ApiUrls';

export const Scraping = () => {
    const methods = useForm();
    const { post } = useClient(true);
    const [images, setImages] = useState<string[]>([]);

    // submit 処理
    const submit: SubmitHandler<IScrapingHistory> = async (data: IScrapingHistory) => {
        console.log(data);
        await post(SCRAPING, data, true)
            .then(({ data }) => {
                console.log(data);
                setImages(data);
            });
    };

    return (
        <FormProvider {...methods}>
            <ScrapingTemplate
                onSubmit={methods.handleSubmit(submit)}
            />
            {
                images.map((src) => (
                    <img src={src} ></img>
                ))
            }
        </FormProvider>
    );
};
