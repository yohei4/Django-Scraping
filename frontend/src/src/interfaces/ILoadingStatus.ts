import { DeliveryStatusKbn } from "@enums/DeliveryStatusKbn";

// TODO: バックエンド側のモデルと合わせる必要あり
export interface ILoadingStatus {
    code?: number;
    deliveryStatusKbn?: DeliveryStatusKbn;
    deliveryStatusKbnNm?: string;
    receptionDateTime?: string | Date;
    completeDateTime?: string | Date;
    carrierName?: string;
    vehicleCode?: string;
}
