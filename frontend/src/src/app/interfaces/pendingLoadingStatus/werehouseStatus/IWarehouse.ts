import { MWarehouse } from "@interfaces/MWarehouse";
import { ILoading } from "./ILoading";
import { WaitingStatusTruckKbn } from "@enums/WaitingStatusTruckKbn";

export interface IWarehouse extends MWarehouse {
    id?: number;
    Loading?: number | ILoading[];
    Standby?: number;
    Liftman?: number;
    WaitingStatusTruckKbn?: WaitingStatusTruckKbn;
}
