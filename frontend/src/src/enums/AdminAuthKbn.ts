import { MenuItemProps } from "@mui/material";

/**
 * 管理権限区分
 */
export enum AdminAuthKbn {
    /**
     * 一般権限
     */
    Common = 0,
    /**
     * 管理権限
     */
    Admin = 1,
}

/**
 * 表示用名称を取得します。
 */
export const AdminAuthKbnDisplayNames: { [key in AdminAuthKbn]: string } = {
    [AdminAuthKbn.Common]: '一般権限',
    [AdminAuthKbn.Admin]: '管理権限',
};

/**
 * 区分数値を取得します。
 */
export const AdminAuthKbnValues: { [key in AdminAuthKbn]: number } = {
    [AdminAuthKbn.Common]: 0,
    [AdminAuthKbn.Admin]: 0,
};

/**
 * keyを取得します。
 */
export const AdminAuthKbnKeys: { [key in AdminAuthKbn]: string } = {
    [AdminAuthKbn.Common]: 'Common',
    [AdminAuthKbn.Admin]: 'Admin',
};

/**
 * optionsを取得します。
 * @returns 
 */
export const getAdminAuthKbnOptions = (): MenuItemProps[] => {
    return Object.values(AdminAuthKbn).filter(kbn => typeof kbn === 'number').map((kbn, index) => ({ value: kbn, children: AdminAuthKbnDisplayNames[kbn as AdminAuthKbn] }));
};

