/**
 * T_倉庫状況
 */
export interface TWarehouse {
    /**
     * 倉庫コード
     */
    WarehouseCd?: string;
    /**
     * 配置人数
     */
    Liftman?: number;
    /**
     * 登録日時
     */
    InsDateTime?: Date;
    /**
     * 登録機能コード
     */
    InsKinoCd?: string;
    /**
     * 更新日時
     */
    UpdDateTime?: Date;
    /**
     * 更新機能コード
     */
    UpdKinoCd?: string;
}