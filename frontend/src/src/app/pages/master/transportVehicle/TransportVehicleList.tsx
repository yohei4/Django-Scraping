import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useClient } from '@hooks/useClient';
import { useDynamicFormControls } from '@hooks/useDynamicFormControls';
import { useSearchConditionContext } from '@hooks/useSearchConditionContext';
import { TRANSPORT_VEHICLE_SEARCH } from '@app/admin/constants/ApiUrls';
import { ICarrierTruck, ISearchCondtion } from '@app/admin/interfaces/master/transportVehicle';
import { ListTemplate, formControls as Controls } from '@app/admin/components/templates/master/transportVehicle/ListTemplate';

export const TransportVehicleList = () => {
    const condition = useSearchConditionContext();
    const { formControls } = useDynamicFormControls<ISearchCondtion>(Controls);
    const [rows, setRows] = useState<ICarrierTruck[]>([]);
    const { post } = useClient(true);

    // 初期表示時
    useEffect(() => {
        post(TRANSPORT_VEHICLE_SEARCH, condition, true)
            .then(({ data }) => {
                setRows(data);
            });
    }, []);

    // 検索処理
    const submit: SubmitHandler<ISearchCondtion> = async (data: ISearchCondtion) => {
        await post(TRANSPORT_VEHICLE_SEARCH, data, true)
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
