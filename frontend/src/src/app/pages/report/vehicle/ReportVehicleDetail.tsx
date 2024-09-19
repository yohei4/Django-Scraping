import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { DetailTemplate, Row, formControls as Controls } from '@app/admin/components/templates/report/vehicle/DetailTemplate';
import { useDynamicFormControls } from '@hooks/useDynamicFormControls';
import { ISearchCondtion } from '@app/admin/interfaces/report/vehicle';

export const ReportVehicleDetail = () => {
    const { formControls } = useDynamicFormControls(Controls);

    // 検索処理
    const submit: SubmitHandler<ISearchCondtion> = (data: ISearchCondtion) => {
        console.log(data);
    };

    const [rows, setRows] = useState<Row[]>([
        { id: 1, date: '2024/06/20', carrierName: '○○○運送', vehicleCode: '12-34', event: '荷役合計', startTime: '15:00:00', completeTime: '17:30:00', loadingTime: '150分', overTime: '30分' },
        { id: 2, date: '2024/06/20', carrierName: '○○○運送', vehicleCode: '12-34', event: '○○○倉庫', startTime: '15:10:00', completeTime: '15:40:00', loadingTime: '30分', overTime: '0分' },
        { id: 3, date: 'XXXX/XX/XX', carrierName: 'NNNNNNNNNN', vehicleCode: 'XXXXX', event: 'NNNNNNNNNN', startTime: 'XX:XX:XX', completeTime: 'XX:XX:XX', loadingTime: 'XXXXX', overTime: 'XXXXX' },
        { id: 4, date: 'XXXX/XX/XX', carrierName: 'NNNNNNNNNN', vehicleCode: 'XXXXX', event: 'NNNNNNNNNN', startTime: 'XX:XX:XX', completeTime: 'XX:XX:XX', loadingTime: 'XXXXX', overTime: 'XXXXX' },
        { id: 5, date: 'XXXX/XX/XX', carrierName: 'NNNNNNNNNN', vehicleCode: 'XXXXX', event: 'NNNNNNNNNN', startTime: 'XX:XX:XX', completeTime: 'XX:XX:XX', loadingTime: 'XXXXX', overTime: 'XXXXX' },
        { id: 6, date: 'XXXX/XX/XX', carrierName: 'NNNNNNNNNN', vehicleCode: 'XXXXX', event: 'NNNNNNNNNN', startTime: 'XX:XX:XX', completeTime: 'XX:XX:XX', loadingTime: 'XXXXX', overTime: 'XXXXX' },
        { id: 7, date: 'XXXX/XX/XX', carrierName: 'NNNNNNNNNN', vehicleCode: 'XXXXX', event: 'NNNNNNNNNN', startTime: 'XX:XX:XX', completeTime: 'XX:XX:XX', loadingTime: 'XXXXX', overTime: 'XXXXX' },
        { id: 8, date: 'XXXX/XX/XX', carrierName: 'NNNNNNNNNN', vehicleCode: 'XXXXX', event: 'NNNNNNNNNN', startTime: 'XX:XX:XX', completeTime: 'XX:XX:XX', loadingTime: 'XXXXX', overTime: 'XXXXX' },
        { id: 9, date: 'XXXX/XX/XX', carrierName: 'NNNNNNNNNN', vehicleCode: 'XXXXX', event: 'NNNNNNNNNN', startTime: 'XX:XX:XX', completeTime: 'XX:XX:XX', loadingTime: 'XXXXX', overTime: 'XXXXX' },
        { id: 10, date: 'XXXX/XX/XX', carrierName: 'NNNNNNNNNN', vehicleCode: 'XXXXX', event: 'NNNNNNNNNN', startTime: 'XX:XX:XX', completeTime: 'XX:XX:XX', loadingTime: 'XXXXX', overTime: 'XXXXX' },
    ]);

    return (
        <DetailTemplate
            rows={rows}
            formControls={formControls}
            submit={submit} />
    );
};
