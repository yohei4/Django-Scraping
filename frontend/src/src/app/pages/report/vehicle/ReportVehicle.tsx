import { Outlet } from "react-router-dom";
import { SearchConditionContextProvider } from "@hooks/useSearchConditionContext";
import { ISearchCondtion } from '@app/admin/interfaces/report/vehicle';

/**
 * 初期検索条件
 */
export const initialSearchCondition: ISearchCondtion = {
    carrierName: '',
    vehicleCode: '',
}

export const ReportVehicle = () => {
    return (
        <SearchConditionContextProvider>
            <Outlet />
        </SearchConditionContextProvider>
    );
}
