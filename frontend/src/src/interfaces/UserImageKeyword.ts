/**
 * ユーザー画像_キーワード
 */
export interface UserImageKeyword {
    /**
     * ID
     */
    id?: string | number;
    /**
     * 画像ID
     */
    image_id?: string | number;
    /**
     * キーワード
     */
    keyword?: string;
    /**
     * 作成日時
     */
    created_at?: string | Date;
    /**
     * 更新日時
     */
    updated_at?: string | Date;
}