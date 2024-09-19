/**
 * M_メニュー
 */
export interface MMenu {
    /**
     * URL
     */
    Url?: string;
    /**
     * 親機能コード
     */
    ParentKinoCd?: string;
    /**
     * 機能コード
     */
    KinoCd?: string;
    /**
     * メニュー名
     */
    MenuNm?: string;
    /**
     * アイコン名
     */
    IconNm?: string;
    /**
     * 表示順
     */
    SortOrder?: number;
}