import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useDynamicFormControls } from '@hooks/useDynamicFormControls';
import { ISearchCondtion } from '@app/admin/interfaces/report/vehicle';
import { ListTemplate, Row, formControls as Controls } from '@app/admin/components/templates/report/vehicle/ListTemplate';

export const ReportVehicleList = () => {
    const { formControls } = useDynamicFormControls<ISearchCondtion>(Controls);

    // 検索処理
    const submit: SubmitHandler<ISearchCondtion> = (data: ISearchCondtion) => {
        console.log(data);
    };

    const [rows, setRows] = useState<Row[]>([
        { id: 1, date: '2024/06/20', carrierName: '○○○運送', vehicleCode: '12-34', loadingTableReciveTime: '15:34:21', voucherReciveTime: '17:40:25', loadingTime: '126分', overTime: '6分' },
        { id: 2, date: '2024/06/20', carrierName: '○○○運送', vehicleCode: '12-35', loadingTableReciveTime: '16:21:23', voucherReciveTime: '18:52:53', loadingTime: '90分', overTime: '0分' },
        { id: 3, date: 'XXXX/XX/XX', carrierName: 'NNNNNNNNNN', vehicleCode: 'XXXXX', loadingTableReciveTime: 'XX:XX:XX', voucherReciveTime: 'XX:XX:XX', loadingTime: 'XXXXX', overTime: 'XXXXX' },
        { id: 4, date: 'XXXX/XX/XX', carrierName: 'NNNNNNNNNN', vehicleCode: 'XXXXX', loadingTableReciveTime: 'XX:XX:XX', voucherReciveTime: 'XX:XX:XX', loadingTime: 'XXXXX', overTime: 'XXXXX' },
        { id: 5, date: 'XXXX/XX/XX', carrierName: 'NNNNNNNNNN', vehicleCode: 'XXXXX', loadingTableReciveTime: 'XX:XX:XX', voucherReciveTime: 'XX:XX:XX', loadingTime: 'XXXXX', overTime: 'XXXXX' },
        { id: 6, date: 'XXXX/XX/XX', carrierName: 'NNNNNNNNNN', vehicleCode: 'XXXXX', loadingTableReciveTime: 'XX:XX:XX', voucherReciveTime: 'XX:XX:XX', loadingTime: 'XXXXX', overTime: 'XXXXX' },
        { id: 7, date: 'XXXX/XX/XX', carrierName: 'NNNNNNNNNN', vehicleCode: 'XXXXX', loadingTableReciveTime: 'XX:XX:XX', voucherReciveTime: 'XX:XX:XX', loadingTime: 'XXXXX', overTime: 'XXXXX' },
        { id: 8, date: 'XXXX/XX/XX', carrierName: 'NNNNNNNNNN', vehicleCode: 'XXXXX', loadingTableReciveTime: 'XX:XX:XX', voucherReciveTime: 'XX:XX:XX', loadingTime: 'XXXXX', overTime: 'XXXXX' },
        { id: 9, date: 'XXXX/XX/XX', carrierName: 'NNNNNNNNNN', vehicleCode: 'XXXXX', loadingTableReciveTime: 'XX:XX:XX', voucherReciveTime: 'XX:XX:XX', loadingTime: 'XXXXX', overTime: 'XXXXX' },
        { id: 10, date: 'XXXX/XX/XX', carrierName: 'NNNNNNNNNN', vehicleCode: 'XXXXX', loadingTableReciveTime: 'XX:XX:XX', voucherReciveTime: 'XX:XX:XX', loadingTime: 'XXXXX', overTime: 'XXXXX' },
    ]);

    return (
        <ListTemplate
            rows={rows}
            formControls={formControls}
            submit={submit} />
    );
};
