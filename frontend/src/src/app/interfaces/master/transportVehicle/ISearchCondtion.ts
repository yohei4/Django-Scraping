import { InvalidKbn } from "@enums/InvalidKbn";

export interface ISearchCondtion {
    CarrierCd?: string;
    CarrierName?: string;
    CarrierKana?: string;
    TruckNo?: number;
    TelNo?: string;
    Remark?: string;
    InvalidKbn?: string | InvalidKbn;
}
