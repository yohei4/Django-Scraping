import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useClient } from '@hooks/useClient';
import { useDynamicFormControls } from '@hooks/useDynamicFormControls';
import { useSearchConditionContext } from '@hooks/useSearchConditionContext';
import { INotice, ISearchCondtion } from "@app/admin/interfaces/notice/individual";
import { ListTemplate, formControls as Controls } from '@app/admin/components/templates/notice/individual/ListTemplate';
import { NOTICE_INDIVIDUAL_SEARCH } from '@app/admin/constants/ApiUrls';

export const NoticeIndividualList = () => {
    const condition = useSearchConditionContext();
    const { formControls } = useDynamicFormControls<ISearchCondtion>(Controls);
    const { post } = useClient(true);
    const [rows, setRows] = useState<INotice[]>([]);

    // 初期表示時
    useEffect(() => {
        post(NOTICE_INDIVIDUAL_SEARCH, condition, true)
            .then(({ data }) => {
                setRows(data);
            });
    }, []);

    // submit 処理
    const submit: SubmitHandler<ISearchCondtion> = async (data: ISearchCondtion) => {
        await post(NOTICE_INDIVIDUAL_SEARCH, data, true)
            .then(({ data }) => {
                setRows(data);
            });
    };

    // リフレッシュボタン
    const handleRefreshButtonClick = async () => {
        await post(NOTICE_INDIVIDUAL_SEARCH, condition, true)
            .then(({ data }) => {
                setRows(data);
            });
    }

    return (
        <ListTemplate
            rows={rows}
            formControls={formControls} 
            submit={submit}
            onRefreshButtonClick={handleRefreshButtonClick} />
    );
};
