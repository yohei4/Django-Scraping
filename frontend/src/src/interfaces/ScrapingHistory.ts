/**
 * スクレイピング_履歴
 */
export interface ScrapingHistory {
    /**
     * ID
     */
    id?: string | number;
    /**
     * ユーザーID
     */
    user_id?: string | number;
    /**
     * キーワード
     */
    keyword?: string;
    /**
     * URL
     */
    url?: string;
    /**
     * 作成日時
     */
    created_at?: string | Date;
    /**
     * 更新日時
     */
    updated_at?: string | Date;
}