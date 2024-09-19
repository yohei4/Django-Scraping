import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { get } from '@utils/client';
import { IMenu } from '@app/admin/interfaces/IMenu';
import { PendingLoadingStatusTemplate } from '@app/admin/components/templates/pendingLoadingStatus/PendingLoadingStatusTemplate';
import { FETCH_PENDING_LOADING_STATUS_MENU } from '@app/admin/constants/ApiUrls';

export const PendingLoadingStatusLoader = async ({ params }: LoaderFunctionArgs): Promise<IMenu[]> => {
    return (await get(FETCH_PENDING_LOADING_STATUS_MENU, params)).data;
}

export const PendingLoadingStatus = () => {
    const data = useLoaderData() as IMenu[];

    return (
        <PendingLoadingStatusTemplate cards={data.map((item) => {
            return {
                text: item.MenuNm,
                path: item.Url,
            }
        })} />
    );
};
