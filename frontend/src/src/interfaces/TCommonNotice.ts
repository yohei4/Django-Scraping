import { PriorityKbn } from "@enums/PriorityKbn";
import { InvalidKbn } from "@enums/InvalidKbn";

/**
 * T_共通お知らせ
 */
export interface TCommonNotice {
    /**
     * ID
     */
    Id?: number;
    /**
     * 重要度区分
     */
    PriorityKbn?: PriorityKbn;
    /**
     * お知らせ内容
     */
    Notice?: string;
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