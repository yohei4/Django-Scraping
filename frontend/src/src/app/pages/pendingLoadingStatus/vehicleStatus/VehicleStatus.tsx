import { Outlet } from "react-router-dom";
import { SearchConditionContextProvider } from "@hooks/useSearchConditionContext";
import { ISearchCondtion } from '@app/admin/interfaces/pendingLoadingStatus/vehicleStatus';

/**
 * 初期検索条件
 */
export const initialSearchCondition: ISearchCondtion = {
}

export const VehicleStatus = () => {
    return (
        <SearchConditionContextProvider initialState={initialSearchCondition}>
            <Outlet />
        </SearchConditionContextProvider>
    );
}
