/**
 * ユーザー画像
 */
export interface UserImage {
    /**
     * ID
     */
    id?: string | number;
    /**
     * ユーザーID
     */
    user_id?: string | number;
    /**
     * 画像パス
     */
    path?: string;
    /**
     * ファイル名
     */
    filename?: string;
    /**
     * 元リンク
     */
    oirgin_link?: string;
    /**
     * 作成日時
     */
    created_at?: string | Date;
    /**
     * 更新日時
     */
    updated_at?: string | Date;
}