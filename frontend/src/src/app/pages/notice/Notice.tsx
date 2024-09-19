import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { get } from '@utils/client';
import { NoticeTemplate } from '@app/admin/components/templates/notice/NoticeTemplate';
import { IMenu } from '@app/admin/interfaces/IMenu';
import { FETCH_NOTICE_MENU } from '@app/admin/constants/ApiUrls';

export const NoticeLoader = async ({ params }: LoaderFunctionArgs): Promise<IMenu[]> => {
    return (await get(FETCH_NOTICE_MENU, params)).data;
}

export const Notice = () => {
    const data = useLoaderData() as IMenu[];

    return (
        <NoticeTemplate cards={data.map((item) => {
            return {
                text: item.MenuNm,
                path: item.Url,
            }
        })} />
    );
};
