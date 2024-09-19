import { StatusKbn } from "@enums/StatusKbn";

/**
 * T_ステータス
 */
export interface TStatus {
    /**
     * ドライバーID
     */
    DriverId?: number;
    /**
     * 受付日時
     */
    StartDateTime?: Date;
    /**
     * ステータス区分
     */
    StatusKbn?: StatusKbn;
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