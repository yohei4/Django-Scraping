import { LicenseKbn } from "@enums/LicenseKbn";

/**
 * M_機能権限
 */
export interface MKinoAuth {
    /**
     * 機能権限グループ番号
     */
    KinoAuthGroupNo?: number;
    /**
     * サブシステムコード
     */
    SubSystemCd?: string;
    /**
     * 機能コード
     */
    KinoCd?: string;
    /**
     * 使用許可区分
     */
    LicenseKbn?: LicenseKbn;
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