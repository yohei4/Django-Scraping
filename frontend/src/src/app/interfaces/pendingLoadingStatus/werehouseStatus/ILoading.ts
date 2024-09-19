import { TLoading } from "@interfaces/TLoading";
import { WaitingStatusTimeKbn } from "@enums/WaitingStatusTimeKbn";

export interface ILoading extends TLoading {
    id?: number;
    No?: number;
    CarrierName?: string;
    TruckNo?: string;
    EventStartDateTime?: Date;
    ElapsedTime?: number;
    WaitingStatusTimeKbn?: WaitingStatusTimeKbn;
}
