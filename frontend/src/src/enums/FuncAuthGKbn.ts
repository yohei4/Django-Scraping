import { MenuItemProps } from "@mui/material";

/**
 * 機能権限グループ区分
 */
export enum FuncAuthGKbn {
    /**
     * システム管理
     */
    System = 1,
    /**
     * 運輸課
     */
    Transport = 2,
    /**
     * 倉庫係
     */
    Warehouse = 3,
    /**
     * 輸送業者
     */
    Carrier = 4,
}

/**
 * 表示用名称を取得します。
 */
export const FuncAuthGKbnDisplayNames: { [key in FuncAuthGKbn]: string } = {
    [FuncAuthGKbn.System]: 'システム管理',
    [FuncAuthGKbn.Transport]: '運輸課',
    [FuncAuthGKbn.Warehouse]: '倉庫係',
    [FuncAuthGKbn.Carrier]: '輸送業者',
};

/**
 * 区分数値を取得します。
 */
export const FuncAuthGKbnValues: { [key in FuncAuthGKbn]: number } = {
    [FuncAuthGKbn.System]: 0,
    [FuncAuthGKbn.Transport]: 0,
    [FuncAuthGKbn.Warehouse]: 0,
    [FuncAuthGKbn.Carrier]: 0,
};

/**
 * keyを取得します。
 */
export const FuncAuthGKbnKeys: { [key in FuncAuthGKbn]: string } = {
    [FuncAuthGKbn.System]: 'System',
    [FuncAuthGKbn.Transport]: 'Transport',
    [FuncAuthGKbn.Warehouse]: 'Warehouse',
    [FuncAuthGKbn.Carrier]: 'Carrier',
};

/**
 * optionsを取得します。
 * @returns 
 */
export const getFuncAuthGKbnOptions = (): MenuItemProps[] => {
    return Object.values(FuncAuthGKbn).filter(kbn => typeof kbn === 'number').map((kbn, index) => ({ value: kbn, children: FuncAuthGKbnDisplayNames[kbn as FuncAuthGKbn] }));
};

