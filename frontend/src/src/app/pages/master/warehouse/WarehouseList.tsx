import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useClient } from '@hooks/useClient';
import { useDynamicFormControls } from '@hooks/useDynamicFormControls';
import { useSearchConditionContext } from '@hooks/useSearchConditionContext';
import { WAREHOUSE_SEARCH } from '@app/admin/constants/ApiUrls';
import { ISearchCondtion, IWarehouse } from '@app/admin/interfaces/master/warehouse';
import { ListTemplate, formControls as Controls } from '@app/admin/components/templates/master/warehouse/ListTemplate';

export const WarehouseList = () => {
    const condition = useSearchConditionContext();
    const { formControls } = useDynamicFormControls<ISearchCondtion>(Controls);
    const [rows, setRows] = useState<IWarehouse[]>([]);
    const { post } = useClient(true);

    // 初期表示時
    useEffect(() => {
        post(WAREHOUSE_SEARCH, condition, true)
            .then(({ data }) => {
                setRows(data);
            });
    }, []);

    // 検索処理
    const submit: SubmitHandler<ISearchCondtion> = async (data: ISearchCondtion) => {
        await post(WAREHOUSE_SEARCH, data, true)
            .then(({ data }) => {
                setRows(data);
            });
    };

    return (
            <ListTemplate
                rows={rows}
                formControls={formControls}
                submit={submit} />
    );
};
