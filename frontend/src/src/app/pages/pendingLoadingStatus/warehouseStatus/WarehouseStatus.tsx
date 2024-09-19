import { Outlet } from "react-router-dom";
import { SearchConditionContextProvider } from "@hooks/useSearchConditionContext";
import { ISearchCondtion } from '@app/admin/interfaces/pendingLoadingStatus/werehouseStatus';

/**
* 初期検索条件
*/
export const initialSearchCondition: ISearchCondtion = {
    WarehouseName: '',
    WaitingStatusTruckKbn: '',
}

export const WarehouseStatus = () => {
    return (
        <SearchConditionContextProvider initialState={initialSearchCondition}>
            <Outlet />
        </SearchConditionContextProvider>
    );
}
