import { Outlet } from "react-router-dom";
import { SearchConditionContextProvider } from "@hooks/useSearchConditionContext";
import { ISearchCondtion } from '@app/admin/interfaces/master/warehouse';
import { InvalidKbn } from '@enums/InvalidKbn';

/**
* 初期検索条件
*/
export const initialSearchCondition: ISearchCondtion = {
   WarehouseCd: '',
   WarehouseName: '',
   WarehouseAbbr: '',
   InvalidKbn: InvalidKbn.Off,
}

export const Warehouse = () => {
    return (
        <SearchConditionContextProvider initialState={initialSearchCondition}>
            <Outlet />
        </SearchConditionContextProvider>
    );
}
