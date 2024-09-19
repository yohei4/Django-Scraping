import { StowageStatusKbn } from "@enums/StowageStatusKbn";

/**
 * T_積付表受渡状況
 */
export interface TStowage {
    /**
     * ドライバーID
     */
    DriverId?: number;
    /**
     * 受付日時
     */
    StartDateTime?: Date;
    /**
     * 完成日時
     */
    CompleteDateTime?: Date;
    /**
     * 積付表受渡状況区分
     */
    StowageStatusKbn?: StowageStatusKbn;
    /**
     * 登録日時
     */
    InsDateTime?: Date;
    /**
     * 登録機能コード
     */
    InsKinoCd?: string;
    /**
     * 登録担当者コード
     */
    InsUserCd?: string;
    /**
     * 更新日時
     */
    UpdDateTime?: Date;
    /**
     * 更新機能コード
     */
    UpdKinoCd?: string;
    /**
     * 更新担当者コード
     */
    UpdUserCd?: string;
}