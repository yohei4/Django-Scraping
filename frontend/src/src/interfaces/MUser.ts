import { InvalidKbn } from "@enums/InvalidKbn";

/**
 * M_担当者
 */
export interface MUser {
    /**
     * 担当者ID
     */
    UserId?: number;
    /**
     * 担当者コード
     */
    UserCd?: string;
    /**
     * 担当者名_姓
     */
    UserNameSei?: string;
    /**
     * 担当者名_名
     */
    UserNameMei?: string;
    /**
     * 担当者名カナ_姓
     */
    UserKanaSei?: string;
    /**
     * 担当者名カナ_名
     */
    UserKanaMei?: string;
    /**
     * 機能権限グループ番号
     */
    KinoAuthGroupNo?: number;
    /**
     * 輸送業者コード
     */
    CarrierCd?: string;
    /**
     * パスワード
     */
    Password?: string;
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