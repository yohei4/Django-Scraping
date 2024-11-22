import { useState } from 'react';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { getWithToken } from '@utils';
import { AlbumTemplate } from '@app/components/templates/AlbumTemplate';
import { IUserImage } from '@app/interfaces/UserImage';
import { FETCH_USER_IMAGE } from '@app/constants/ApiUrls';


export const AlbumLoader = async ({ params }: LoaderFunctionArgs): Promise<IUserImage[]> => {
    return (await getWithToken<IUserImage[]>(FETCH_USER_IMAGE)).data;
};

export const Album = () => {
    const data = useLoaderData() as IUserImage[];
    const methods = useForm();
    const [images, setImages] = useState<string[]>(data.map((image) => image.path ?? '').filter(x => x));

    return (
        <FormProvider {...methods}>
            <AlbumTemplate
                items={images}
            />
        </FormProvider>
    );
};
