import { useState, useCallback } from 'react';
import { LoaderFunctionArgs, useLoaderData, useParams } from "react-router-dom";
import { post } from '@utils/client';
import { useClient } from '@hooks/useClient';
import { useInterval } from '@app/admin/hooks';
import { IWarehouse } from "@app/admin/interfaces/pendingLoadingStatus/werehouseStatus";
import { DetailTemplate } from '@app/admin/components/templates/pendingLoadingStatus/warehouseStatus/DetailTemplate';
import { WAREHOUSE_STATUS_DETAIL } from '@app/admin/constants/ApiUrls';

export const WarehouseStatusDetailLoader = async ({ params }: LoaderFunctionArgs): Promise<IWarehouse> => {
    return (await post<IWarehouse>(WAREHOUSE_STATUS_DETAIL, params)).data;
}

export const WarehouseStatusDetail = () => {
    const { WarehouseCd } = useParams(); 
    const { post } = useClient(true);
    const data = useLoaderData() as IWarehouse;
    const [warehouse, setWarehouse] = useState<IWarehouse>(data);

    // 自動更新
    useInterval(() => {
        post<IWarehouse>(WAREHOUSE_STATUS_DETAIL, { WarehouseCd: WarehouseCd }, false)
            .then(({ data }) => {
                setWarehouse(data);
            });
    });

    // リフレッシュボタン処理
    const handleRefreshButtonClick = () => {
        post<IWarehouse>(WAREHOUSE_STATUS_DETAIL, { WarehouseCd: WarehouseCd }, true)
            .then(({ data }) => {
                setWarehouse(data);
            });
    };

    return (
        <DetailTemplate
            warehouse={warehouse}
            onRefreshButtonClick={handleRefreshButtonClick} />
    );
};
