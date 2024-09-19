import { AdminAuthKbn } from "@enums/AdminAuthKbn";

/**
 * M_機能権限グループ
 */
export interface MKinoAuthGrp {
    /**
     * 機能権限グループ番号
     */
    KinoAuthGroupNo?: number;
    /**
     * 機能権限グループ名
     */
    KinoAuthGroupNm?: string;
    /**
     * 権限階級
     */
    AuthRank?: number;
    /**
     * 管理権限区分
     */
    AdminAuthKbn?: AdminAuthKbn;
    /**
     * 表示順
     */
    SortOrder?: string;
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