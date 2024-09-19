/**
 * M_輸送業者_車両
 */
export interface MCarrierTruck {
    /**
     * ドライバーID
     */
    DriverId?: number;
    /**
     * 輸送業者コード
     */
    CarrierCd?: string;
    /**
     * 車番
     */
    TruckNo?: string;
    /**
     * 電話番号
     */
    TelNo?: string;
    /**
     * 備考
     */
    Remark?: string;
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