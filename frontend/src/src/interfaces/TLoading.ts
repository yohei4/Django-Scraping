import { EventKbn } from "@enums/EventKbn";
import { LoadStatusKbn } from "@enums/LoadStatusKbn";

/**
 * T_積込状況
 */
export interface TLoading {
    /**
     * ドライバーID
     */
    DriverId?: number;
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
     * 積込状況区分
     */
    LoadStatusKbn?: LoadStatusKbn;
    /**
     * 受付日時
     */
    StartDateTime?: Date;
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