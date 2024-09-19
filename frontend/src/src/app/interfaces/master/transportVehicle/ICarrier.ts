import { MCarrier } from "@interfaces/MCarrier";
import { ICarrierTruck } from "./ICarrierTruck";

export interface ICarrier extends MCarrier {
    CarrierTrucks?: ICarrierTruck[];
}
