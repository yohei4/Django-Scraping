import { ScrapingTemplate } from '@app/components/templates/ScrapingTemplate';
import { FormProvider, useForm } from 'react-hook-form';

export const Scraping = () => {
    const methods = useForm();

    return (
        <FormProvider {...methods}>
            <ScrapingTemplate />
        </FormProvider>
    );
};
