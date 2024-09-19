/**
 * M_システム設定
 */
export interface MSystem {
    /**
     * ID
     */
    Id?: number;
    /**
     * 荷役想定時間
     */
    CargoHandlingTime?: number;
    /**
     * 伝票受取完了時間
     */
    InvoiceReceiptTime?: number;
    /**
     * 自動更新間隔_社員
     */
    AutoUpdateStaff?: number;
    /**
     * 自動更新間隔_ドライバー
     */
    AutoUpdateDriver?: number;
    /**
     * アラートメッセージ
     */
    AlertMessage?: string;
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