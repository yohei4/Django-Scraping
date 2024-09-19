import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useClient } from '@hooks/useClient';
import { useDynamicFormControls } from '@hooks/useDynamicFormControls';
import { SearchConditionContextProvider, useSearchConditionContext } from '@hooks/useSearchConditionContext';
import { useInterval } from '@app/admin/hooks';
import { ISearchCondtion, IStowage } from '@app/admin/interfaces/loadingStatus';
import { LoadingStatusTemplate, formControls as Controls } from '@app/admin/components/templates/LoadingStatusTemplate';
import { LOADING_STATUS_COMPLETE, LOADING_STATUS_DELETE, LOADING_STATUS_SEARCH } from '@app/admin/constants/ApiUrls';

const LoadingStatusInner = () => {
    const condition = useSearchConditionContext<ISearchCondtion>();
    const [rows, setRows] = useState<IStowage[]>([]);
    const { formControls } = useDynamicFormControls(Controls);
    const { post } = useClient(true);

    // 初期表示時
    useEffect(() => {
        post(LOADING_STATUS_SEARCH, condition, true)
            .then(({ data }) => {
                setRows(data);
            });
    }, []);

    // 自動更新
    useInterval(useCallback(() => {
        post<IStowage[]>(LOADING_STATUS_SEARCH, condition, false)
            .then(({ data }) => {
                setRows(data);
            });
    }, [condition]));

    // 検索処理
    const submit: SubmitHandler<ISearchCondtion> = (data: ISearchCondtion) => {
        post<IStowage[]>(LOADING_STATUS_SEARCH, data, true)
            .then(({ data }) => {
                setRows(data);
            });
    };

    // 完成連絡 submit 処理
    const completionNoticeSubmit: SubmitHandler<any> = async (data: any): Promise<boolean> => {
        try {
            await post<IStowage[]>(LOADING_STATUS_COMPLETE, data, true)
            const rows = (await post<IStowage[]>(LOADING_STATUS_SEARCH, condition, false)).data;
            setRows(rows);
        } catch {
            return false;
        }
        return true;
    };

    // 受付削除 submit 処理
    const receptionDeleteSubmit: SubmitHandler<any> = async (data: any): Promise<boolean> => {
        try {
            await post<IStowage[]>(LOADING_STATUS_DELETE, data, true)
            const rows = (await post<IStowage[]>(LOADING_STATUS_SEARCH, condition, false)).data;
            setRows(rows);
        } catch {
            return false;
        }
        return true;
    };

    // リフレッシュボタン処理
    const handleRefreshButtonClick = () => {
        post<IStowage[]>(LOADING_STATUS_SEARCH, condition, true)
            .then(({ data }) => {
                setRows(data);
            });
    };

    return (
        <LoadingStatusTemplate
            rows={rows}
            formControls={formControls}
            submit={submit}
            completionNoticeSubmit={completionNoticeSubmit}
            receptionDeleteSubmit={receptionDeleteSubmit}
            onRefreshButtonClick={handleRefreshButtonClick} />
    );
}

/**
 * 初期検索条件
 */
const initialSearchCondition: ISearchCondtion = {
    StowageStatusKbn: '',
    CarrierCd: undefined,
    CarrierName: undefined,
    TruckNo: undefined,
}

export const LoadingStatus = () => {

    return (
        <SearchConditionContextProvider initialState={initialSearchCondition}>
            <LoadingStatusInner />
        </SearchConditionContextProvider>
    );
};
