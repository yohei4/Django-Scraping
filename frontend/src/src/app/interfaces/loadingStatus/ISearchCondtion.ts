import { StowageStatusKbn } from "@enums/StowageStatusKbn";

export interface ISearchCondtion {
    StowageStatusKbn?: string | StowageStatusKbn;
    CarrierCd?: string;
    CarrierName?: string;
    TruckNo?: string;
}
