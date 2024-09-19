/**
 * M_区分種類
 */
export interface MKbnKind {
    /**
     * サブシステムコード
     */
    SubSystemCd?: string;
    /**
     * 区分種類コード
     */
    KbnKindCd?: string;
    /**
     * 区分種類名
     */
    KbnKindNm?: string;
    /**
     * 備考
     */
    Remark?: string;
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