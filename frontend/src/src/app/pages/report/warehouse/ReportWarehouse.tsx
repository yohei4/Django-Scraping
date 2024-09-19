import { Outlet } from "react-router-dom";
import { SearchConditionContextProvider } from "@hooks/useSearchConditionContext";
import { ISearchCondtion } from '@app/admin/interfaces/report/warehouse';

/**
 * 初期検索条件
 */
export const initialSearchCondition: ISearchCondtion = {
    warehouseName: '',
    carrierName: '',
    vehicleCode: '',
}

export const ReportWarehouse = () => {
    return (
        <SearchConditionContextProvider initialState={initialSearchCondition}>
            <Outlet />
        </SearchConditionContextProvider>
    );
}
