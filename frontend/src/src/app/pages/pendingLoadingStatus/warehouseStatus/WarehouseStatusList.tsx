import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useClient } from '@hooks/useClient';
import { useSearchConditionContext } from '@hooks/useSearchConditionContext';
import { useDynamicFormControls } from '@hooks/useDynamicFormControls';
import { useInterval } from '@app/admin/hooks';
import { ISearchCondtion } from '@app/admin/interfaces/pendingLoadingStatus/werehouseStatus';
import { IWarehouse } from "@app/admin/interfaces/pendingLoadingStatus/werehouseStatus";
import { ListTemplate, formControls as Controls } from '@app/admin/components/templates/pendingLoadingStatus/warehouseStatus/ListTemplate';
import { WAREHOUSE_STATUS_CHANGE, WAREHOUSE_STATUS_SERACH } from '@app/admin/constants/ApiUrls';

export const WarehouseStatusList = () => {
    const condition = useSearchConditionContext<ISearchCondtion>();
    const { formControls } = useDynamicFormControls(Controls);
    const { post } = useClient(true);
    const [rows, setRows] = useState<IWarehouse[]>([]);

    // 初期表示時
    useEffect(() => {
        post(WAREHOUSE_STATUS_SERACH, condition, true)
            .then(({ data }) => {
                setRows(data);
            });
    }, []);

    // 自動更新
    useInterval(useCallback(() => {
        post<IWarehouse[]>(WAREHOUSE_STATUS_SERACH, condition, false)
            .then(({ data }) => {
                setRows(data);
            });
    }, [condition]));

    // 検索処理
    const submit: SubmitHandler<ISearchCondtion> = (data: ISearchCondtion) => {
        post(WAREHOUSE_STATUS_SERACH, data, true)
            .then(({ data }) => {
                setRows(data);
            });
    };

    // 人数変更処理
    const numberChangeSubmit: SubmitHandler<IWarehouse> = async (data: IWarehouse) => {
        try {
            await post<IWarehouse[]>(WAREHOUSE_STATUS_CHANGE, data, true)
            const rows = (await post<IWarehouse[]>(WAREHOUSE_STATUS_SERACH, condition, false)).data;
            setRows(rows);
        } catch {
            return false;
        }
        return true;
    };

    // リフレッシュボタン処理
    const handleRefreshButtonClick = () => {
        post(WAREHOUSE_STATUS_SERACH, condition, true)
            .then(({ data }) => {
                setRows(data);
            });
    };

    return (
        <ListTemplate
            rows={rows}
            formControls={formControls}
            submit={submit}
            numberChangeSubmit={numberChangeSubmit}
            onRefreshButtonClick={handleRefreshButtonClick} />
    );
};
