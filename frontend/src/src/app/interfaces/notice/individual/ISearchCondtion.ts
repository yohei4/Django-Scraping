import { InvalidKbn } from "@enums/InvalidKbn";

export interface ISearchCondtion {
    CarrierName?: string;
    TruckNo?: string;
    InvalidKbn?: string | InvalidKbn;
}
