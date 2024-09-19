import { Outlet } from "react-router-dom";
import { ISearchCondtion } from '@app/admin/interfaces/master/contactPerson';
import { SearchConditionContextProvider } from "@hooks/useSearchConditionContext";
import { InvalidKbn } from "@enums/InvalidKbn";

/**
 * 初期検索条件
 */
const initialSearchCondition: ISearchCondtion = {
    UserCd: '',
    UserName: '',
    UserKana: '',
    KinoAuthGroupNos: [],
    CarrierName: '',
    InvalidKbn: InvalidKbn.Off,
}

export const ContactPerson = () => {
    return (
        <SearchConditionContextProvider initialState={initialSearchCondition}>
            <Outlet />
        </SearchConditionContextProvider>
    );
}
