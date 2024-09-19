import { useEffect, useState } from 'react';
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { IVehicleStatus } from '@interfaces/IVehicleStatus';
import { DetailTemplate, Row, gridRows } from '@app/admin/components/templates/pendingLoadingStatus/vehicleStatus/DetailTemplate';
import { useGridFormRows } from "@app/admin/hooks/useGridFormRows";
import { PriorityKbn } from "@enums/PriorityKbn";
import { InvalidKbn } from "@enums/InvalidKbn";


export const VehicleStatusDetailLoader = async ({ params }: LoaderFunctionArgs): Promise<IVehicleStatus> => {
    return {
        isValid: InvalidKbn.On,
        importanceKbn: PriorityKbn.Low,
        noticeContents: 'ドライバーへの個別のお知らせ',
        updDateTime: new Date('2024-06-21T23:21:32.213'),
        updContactPersonName: 'ロジック 太郎',
    } as IVehicleStatus;
}

export const VehicleStatusDetail = () => {
    const data = useLoaderData() as IVehicleStatus;
    const methods = useForm<IVehicleStatus>({ defaultValues: data });
    const isValid = methods.watch('isValid');
    const [enableNoticeContents, setEnableNoticeContents] = useState(false);
    const { gridFormRows, setProperty, setFormControlProperty } = useGridFormRows(gridRows);

    // submit 処理
    const submit: SubmitHandler<IVehicleStatus> = (data: IVehicleStatus) => {
        console.log(data);
    };

    // 一括完了 submit 処理
    const bulkComletionSubmit: SubmitHandler<any> = (data: any) => {
        console.log(data);
        return true;
    };

    // formData変更時
    useEffect(() => {
        setEnableNoticeContents(isValid == 1);
    }, [isValid]);

    // お知らせ内容の入力可否
    useEffect(() => {
        setProperty('required', enableNoticeContents, x => x.formControls.some(y => y.name === 'noticeContents'));
        setFormControlProperty('required', enableNoticeContents, x => x.name === 'noticeContents');
        setFormControlProperty('disabled', !enableNoticeContents, x => x.name === 'noticeContents');
    }, [enableNoticeContents]);

    // リフレッシュボタン処理
    const handleRefreshButtonClick = () => {
    };

    const [rows, setRows] = useState<Row[]>([
        { id: 1, warehouseName: '第1倉庫', loadingStatusKbnNm: '積込完了', arrivalDateTime: '2024/07/08 09:32:42', completeDateTime: '2024/07/08 10:12:57', elapsedTime: '', pendingStatusTimeKbnNm: '' },
        { id: 2, warehouseName: '第2倉庫', loadingStatusKbnNm: '積込中', arrivalDateTime: '2024/07/08 10:11:33', completeDateTime: '', elapsedTime: '20分', pendingStatusTimeKbnNm: '時間経過発生中' },
        { id: 3, warehouseName: 'NNNNNNNNNN', loadingStatusKbnNm: 'XXXXX', arrivalDateTime: 'XXXX/XX/XX XX:XX:XX', completeDateTime: 'XXXX/XX/XX XX:XX:XX', elapsedTime: 'XXXXX', pendingStatusTimeKbnNm: 'NNNNNNNNNN' },
        { id: 4, warehouseName: 'NNNNNNNNNN', loadingStatusKbnNm: 'XXXXX', arrivalDateTime: 'XXXX/XX/XX XX:XX:XX', completeDateTime: 'XXXX/XX/XX XX:XX:XX', elapsedTime: 'XXXXX', pendingStatusTimeKbnNm: 'NNNNNNNNNN' },
        { id: 5, warehouseName: 'NNNNNNNNNN', loadingStatusKbnNm: 'XXXXX', arrivalDateTime: 'XXXX/XX/XX XX:XX:XX', completeDateTime: 'XXXX/XX/XX XX:XX:XX', elapsedTime: 'XXXXX', pendingStatusTimeKbnNm: 'NNNNNNNNNN' },
        { id: 6, warehouseName: 'NNNNNNNNNN', loadingStatusKbnNm: 'XXXXX', arrivalDateTime: 'XXXX/XX/XX XX:XX:XX', completeDateTime: 'XXXX/XX/XX XX:XX:XX', elapsedTime: 'XXXXX', pendingStatusTimeKbnNm: 'NNNNNNNNNN' },
        { id: 7, warehouseName: 'NNNNNNNNNN', loadingStatusKbnNm: 'XXXXX', arrivalDateTime: 'XXXX/XX/XX XX:XX:XX', completeDateTime: 'XXXX/XX/XX XX:XX:XX', elapsedTime: 'XXXXX', pendingStatusTimeKbnNm: 'NNNNNNNNNN' },
        { id: 8, warehouseName: 'NNNNNNNNNN', loadingStatusKbnNm: 'XXXXX', arrivalDateTime: 'XXXX/XX/XX XX:XX:XX', completeDateTime: 'XXXX/XX/XX XX:XX:XX', elapsedTime: 'XXXXX', pendingStatusTimeKbnNm: 'NNNNNNNNNN' },
        { id: 9, warehouseName: 'NNNNNNNNNN', loadingStatusKbnNm: 'XXXXX', arrivalDateTime: 'XXXX/XX/XX XX:XX:XX', completeDateTime: 'XXXX/XX/XX XX:XX:XX', elapsedTime: 'XXXXX', pendingStatusTimeKbnNm: 'NNNNNNNNNN' },
        { id: 10, warehouseName: 'NNNNNNNNNN', loadingStatusKbnNm: 'XXXXX', arrivalDateTime: 'XXXX/XX/XX XX:XX:XX', completeDateTime: 'XXXX/XX/XX XX:XX:XX', elapsedTime: 'XXXXX', pendingStatusTimeKbnNm: 'NNNNNNNNNN' },
    ]);

    return (
        <FormProvider {...methods}>
            <DetailTemplate
                formId="entty_update"
                rows={rows}
                gridFormRows={gridFormRows}
                onSubmit={methods.handleSubmit(submit)}
                bulkComletionSubmit={bulkComletionSubmit}
                onRefreshButtonClick={handleRefreshButtonClick} />
        </FormProvider>
    );
};
