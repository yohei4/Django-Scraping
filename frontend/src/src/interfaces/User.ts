/**
 * ユーザー
 */
export interface User {
    /**
     * ID
     */
    id?: string | number;
    /**
     * パスワード
     */
    password?: string;
    /**
     * 最終ログイン日時
     */
    last_login?: string | Date;
    /**
     * ユーザー名
     */
    username?: string;
    /**
     * メールアドレス
     */
    email?: string;
    /**
     * アクティブフラグ
     */
    is_active?: boolean;
    /**
     * 管理者権限フラグ
     */
    is_admin?: boolean;
    /**
     * 作成日時
     */
    created_at?: string | Date;
    /**
     * 更新日時
     */
    updated_at?: string | Date;
}