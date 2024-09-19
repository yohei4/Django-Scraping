import { InvalidKbn } from "@enums/InvalidKbn";

/**
 * M_倉庫
 */
export interface MWarehouse {
    /**
     * 倉庫コード
     */
    WarehouseCd?: string;
    /**
     * 倉庫名
     */
    WarehouseName?: string;
    /**
     * 倉庫名略
     */
    WarehouseAbbr?: string;
    /**
     * 積込想定時間
     */
    LoadingTime?: number;
    /**
     * アラート待機台数
     */
    AlertWaitNum?: number;
    /**
     * 初期配置人数
     */
    DefaultLiftman?: number;
    /**
     * 表示順
     */
    SortOrder?: number;
    /**
     * 備考
     */
    Remark?: string;
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
     * 登録担当者名
     */
    InsUserName?: string;
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
    /**
     * 更新担当者名
     */
    UpdUserName?: string;
}