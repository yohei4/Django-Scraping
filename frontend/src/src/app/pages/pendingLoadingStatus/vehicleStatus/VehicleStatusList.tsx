import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { ListTemplate, Row, formControls as Controls } from '@app/admin/components/templates/pendingLoadingStatus/vehicleStatus/ListTemplate';
import { useSearchConditionContext } from '@hooks/useSearchConditionContext';
import { useDynamicFormControls } from '@hooks/useDynamicFormControls';
import { ISearchCondtion } from '@app/admin/interfaces/pendingLoadingStatus/vehicleStatus';

export const VehicleStatusList = () => {
    const condition = useSearchConditionContext<ISearchCondtion>();
    const { formControls } = useDynamicFormControls(Controls);

    const submit: SubmitHandler<ISearchCondtion> = (data: ISearchCondtion) => {
        console.log(data);
    };

    // リフレッシュボタン処理
    const handleRefreshButtonClick = () => {
        console.log(condition);
    };

    const [rows, setRows] = useState<Row[]>([
        { id: 1, carrierName: '○○○運送', vehicleCode: '12-34', warehouseName: '', loadingStatusKbnNm: '荷役開始', loadingDateTime: '2024/07/08 09:32:42', elapsedTime: '30分', pendingStatusTimeKbnNm: '時間経過発生中' },
        { id: 2, carrierName: '○○○運送', vehicleCode: '12-35', warehouseName: '○○○倉庫', loadingStatusKbnNm: '積込中', loadingDateTime: '2024/07/08 10:11:33', elapsedTime: '20分', pendingStatusTimeKbnNm: '良好' },
        { id: 3, carrierName: 'NNNNNNNNNN', vehicleCode: 'XXXXX', warehouseName: 'NNNNNNNNNN', loadingStatusKbnNm: 'XXXXX', loadingDateTime: 'XXXX/XX/XX XX:XX:XX', elapsedTime: 'XXXXX', pendingStatusTimeKbnNm: 'NNNNNNNNNN' },
        { id: 4, carrierName: 'NNNNNNNNNN', vehicleCode: 'XXXXX', warehouseName: 'NNNNNNNNNN', loadingStatusKbnNm: 'XXXXX', loadingDateTime: 'XXXX/XX/XX XX:XX:XX', elapsedTime: 'XXXXX', pendingStatusTimeKbnNm: 'NNNNNNNNNN' },
        { id: 5, carrierName: 'NNNNNNNNNN', vehicleCode: 'XXXXX', warehouseName: 'NNNNNNNNNN', loadingStatusKbnNm: 'XXXXX', loadingDateTime: 'XXXX/XX/XX XX:XX:XX', elapsedTime: 'XXXXX', pendingStatusTimeKbnNm: 'NNNNNNNNNN' },
        { id: 6, carrierName: 'NNNNNNNNNN', vehicleCode: 'XXXXX', warehouseName: 'NNNNNNNNNN', loadingStatusKbnNm: 'XXXXX', loadingDateTime: 'XXXX/XX/XX XX:XX:XX', elapsedTime: 'XXXXX', pendingStatusTimeKbnNm: 'NNNNNNNNNN' },
        { id: 7, carrierName: 'NNNNNNNNNN', vehicleCode: 'XXXXX', warehouseName: 'NNNNNNNNNN', loadingStatusKbnNm: 'XXXXX', loadingDateTime: 'XXXX/XX/XX XX:XX:XX', elapsedTime: 'XXXXX', pendingStatusTimeKbnNm: 'NNNNNNNNNN' },
        { id: 8, carrierName: 'NNNNNNNNNN', vehicleCode: 'XXXXX', warehouseName: 'NNNNNNNNNN', loadingStatusKbnNm: 'XXXXX', loadingDateTime: 'XXXX/XX/XX XX:XX:XX', elapsedTime: 'XXXXX', pendingStatusTimeKbnNm: 'NNNNNNNNNN' },
        { id: 9, carrierName: 'NNNNNNNNNN', vehicleCode: 'XXXXX', warehouseName: 'NNNNNNNNNN', loadingStatusKbnNm: 'XXXXX', loadingDateTime: 'XXXX/XX/XX XX:XX:XX', elapsedTime: 'XXXXX', pendingStatusTimeKbnNm: 'NNNNNNNNNN' },
        { id: 10, carrierName: 'NNNNNNNNNN', vehicleCode: 'XXXXX', warehouseName: 'NNNNNNNNNN', loadingStatusKbnNm: 'XXXXX', loadingDateTime: 'XXXX/XX/XX XX:XX:XX', elapsedTime: 'XXXXX', pendingStatusTimeKbnNm: 'NNNNNNNNNN' },
    ]);

    return (
        <ListTemplate
            rows={rows}
            formControls={formControls}
            submit={submit}
            onRefreshButtonClick={handleRefreshButtonClick} />
    );
};
