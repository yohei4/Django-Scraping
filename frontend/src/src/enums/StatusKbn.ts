import { MenuItemProps } from "@mui/material";

/**
 * ステータス区分
 */
export enum StatusKbn {
    /**
     * 受付待ち
     */
    Reception = 1,
    /**
     * 積付倉庫登録
     */
    Warehouse = 2,
    /**
     * 積込状況
     */
    Load = 3,
}

/**
 * 表示用名称を取得します。
 */
export const StatusKbnDisplayNames: { [key in StatusKbn]: string } = {
    [StatusKbn.Reception]: '受付待ち',
    [StatusKbn.Warehouse]: '積付倉庫登録',
    [StatusKbn.Load]: '積込状況',
};

/**
 * 区分数値を取得します。
 */
export const StatusKbnValues: { [key in StatusKbn]: number } = {
    [StatusKbn.Reception]: 0,
    [StatusKbn.Warehouse]: 0,
    [StatusKbn.Load]: 0,
};

/**
 * keyを取得します。
 */
export const StatusKbnKeys: { [key in StatusKbn]: string } = {
    [StatusKbn.Reception]: 'Reception',
    [StatusKbn.Warehouse]: 'Warehouse',
    [StatusKbn.Load]: 'Load',
};

/**
 * optionsを取得します。
 * @returns 
 */
export const getStatusKbnOptions = (): MenuItemProps[] => {
    return Object.values(StatusKbn).filter(kbn => typeof kbn === 'number').map((kbn, index) => ({ value: kbn, children: StatusKbnDisplayNames[kbn as StatusKbn] }));
};

