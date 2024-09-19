import { TStowage } from "@interfaces/TStowage";

export interface IStowage extends TStowage {
    id?: number;
    CarrierName?: string;
    TruckNo?: string;
}
