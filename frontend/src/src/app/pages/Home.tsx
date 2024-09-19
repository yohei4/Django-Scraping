import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { get } from '@utils/client';
import { IMenu } from '@app/admin/interfaces/IMenu';
import { HomeTemplate } from '@app/admin/components/templates/HomeTemplate';
import { FETCH_HOME_MENU } from '@app/admin/constants/ApiUrls';

export const HomeLoader = async ({ params }: LoaderFunctionArgs): Promise<IMenu[]> => {
    return (await get(FETCH_HOME_MENU, params)).data;
}

export const Home = () => {
    const data = useLoaderData() as IMenu[];

    return (
        <HomeTemplate cards={data.map((item) => {
            return {
                text: item.MenuNm,
                path: item.Url,
                icon: item.IconNm,
            }
        })} />
    );
};
