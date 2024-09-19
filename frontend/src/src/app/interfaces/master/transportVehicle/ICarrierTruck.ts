import { InvalidKbn } from "@enums/InvalidKbn";
import { MCarrierTruck } from "@interfaces/MCarrierTruck";

export interface ICarrierTruck extends MCarrierTruck {
    CarrierName?: string;
    CarrierKana?: string;
    InvalidKbn?: InvalidKbn;
}