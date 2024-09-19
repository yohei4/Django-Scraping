import { InvalidKbn } from "@enums/InvalidKbn";

/**
 * M_輸送業者
 */
export interface MCarrier {
    /**
     * 輸送業者コード
     */
    CarrierCd?: string;
    /**
     * 輸送業者名
     */
    CarrierName?: string;
    /**
     * 輸送業者名カナ
     */
    CarrierKana?: string;
    /**
     * 備考
     */
    Remark?: string;
    /**
     * 無効区分
     */
    InvalidKbn?: InvalidKbn;
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
     * 登録担当者名
     */
    InsUserName?: string;
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
    /**
     * 更新担当者名
     */
    UpdUserName?: string;
}