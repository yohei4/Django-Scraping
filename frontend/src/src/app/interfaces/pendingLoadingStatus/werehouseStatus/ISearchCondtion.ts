import { WaitingStatusTruckKbn } from "@enums/WaitingStatusTruckKbn";

export type ISearchCondtion = {
    WarehouseName?: string;
    WaitingStatusTruckKbn?: string | WaitingStatusTruckKbn;
}
