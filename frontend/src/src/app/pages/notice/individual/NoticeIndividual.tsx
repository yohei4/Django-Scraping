import { Outlet } from "react-router-dom";
import { SearchConditionContextProvider } from "@hooks/useSearchConditionContext";
import { ISearchCondtion } from '@app/admin/interfaces/notice/individual';

/**
 * 初期検索条件
 */
const initialSearchCondition: ISearchCondtion = {
    CarrierName: undefined,
    TruckNo: undefined,
    InvalidKbn: '',
}

export const NoticeIndividual = () => {
    return (
        <SearchConditionContextProvider initialState={initialSearchCondition}>
            <Outlet />
        </SearchConditionContextProvider>
    );
}
