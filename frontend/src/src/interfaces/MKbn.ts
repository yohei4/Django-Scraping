import { DefaultKbn } from "@enums/DefaultKbn";

/**
 * M_区分
 */
export interface MKbn {
    /**
     * サブシステムコード
     */
    SubSystemCd?: string;
    /**
     * 区分種類コード
     */
    KbnKindCd?: string;
    /**
     * 区分コード
     */
    KbnCd?: number;
    /**
     * 区分名
     */
    KbnNm?: string;
    /**
     * 区分数値
     */
    KbnNoValue?: number;
    /**
     * デフォルト区分
     */
    DefaultKbn?: DefaultKbn;
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