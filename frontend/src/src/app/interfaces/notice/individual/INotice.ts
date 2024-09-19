import { TNotice } from '@interfaces/TNotice';

export interface INotice extends TNotice {
    CarrierName?: string;
    TruckNo?: string;
    UpdUserName?: string;
}
