import { Outlet } from "react-router-dom";
import { SearchConditionContextProvider } from "@hooks/useSearchConditionContext";
import { ISearchCondtion } from '@app/admin/interfaces/master/transportVehicle';
import { InvalidKbn } from '@enums/InvalidKbn';

/**
 * 初期検索条件
 */
const initialSearchCondition: ISearchCondtion = {
    CarrierCd: '',
    CarrierName: '',
    CarrierKana: '',
    TruckNo: undefined,
    TelNo: '',
    Remark: '',
    InvalidKbn: InvalidKbn.Off,
}

export const TransportVehicle = () => {
    return (
        <SearchConditionContextProvider initialState={initialSearchCondition}>
            <Outlet />
        </SearchConditionContextProvider>
    );
}
