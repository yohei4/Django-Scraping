import { EventKbn } from "@enums/EventKbn";

/**
 * T_荷役実績
 */
export interface TLoadResult {
    /**
     * ドライバーID
     */
    DriverId?: number;
    /**
     * 受付日時
     */
    StartDateTime?: Date;
    /**
     * イベント区分
     */
    EventKbn?: EventKbn;
    /**
     * 倉庫コード
     */
    WarehouseCd?: string;
    /**
     * イベント開始日時
     */
    EventStartDateTime?: Date;
    /**
     * イベント完了日時
     */
    EventCompleteDateTime?: Date;
    /**
     * 輸送業者コード
     */
    CarrierCd?: string;
    /**
     * 輸送業者名
     */
    CarrierName?: string;
    /**
     * 車番
     */
    TruckNo?: string;
    /**
     * イベント名
     */
    EventNm?: string;
    /**
     * 倉庫名
     */
    WarehouseName?: string;
    /**
     * 倉庫名略
     */
    WarehouseAbbr?: string;
    /**
     * 登録日時
     */
    InsDateTime?: Date;
    /**
     * 登録機能コード
     */
    InsKinoCd?: string;
    /**
     * 更新日時
     */
    UpdDateTime?: Date;
    /**
     * 更新機能コード
     */
    UpdKinoCd?: string;
}