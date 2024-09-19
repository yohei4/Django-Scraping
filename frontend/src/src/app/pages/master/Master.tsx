import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { get } from '@utils/client';
import { MasterTemplate } from '@app/admin/components/templates/master/MasterTemplate';
import { IMenu } from '@app/admin/interfaces/IMenu';
import { FETCH_MASTER_MENU } from '@app/admin/constants/ApiUrls';

export const MasterLoader = async ({ params }: LoaderFunctionArgs): Promise<IMenu[]> => {
    return (await get(FETCH_MASTER_MENU, params)).data;
}

export const Master = () => {
    const data = useLoaderData() as IMenu[];
    
    return (
        <MasterTemplate cards={data.map((item) => {
            return {
                text: item.MenuNm,
                path: item.Url,
            }
        })} />
    );
};
