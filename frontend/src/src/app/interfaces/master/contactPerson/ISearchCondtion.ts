import { InvalidKbn } from "@enums/InvalidKbn";

export interface ISearchCondtion {
    UserCd?: string;
    UserName?: string;
    UserKana?: string;
    KinoAuthGroupNos?: number[];
    CarrierName?: string;
    InvalidKbn?: string | InvalidKbn;
}
