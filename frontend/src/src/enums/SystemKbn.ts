import { MenuItemProps } from "@mui/material";

/**
 * システム区分
 */
export enum SystemKbn {
    /**
     * 社員APP
     */
    StaffApp = 1,
    /**
     * ドライバーAPP
     */
    DriverApp = 2,
}

/**
 * 表示用名称を取得します。
 */
export const SystemKbnDisplayNames: { [key in SystemKbn]: string } = {
    [SystemKbn.StaffApp]: '社員APP',
    [SystemKbn.DriverApp]: 'ドライバーAPP',
};

/**
 * 区分数値を取得します。
 */
export const SystemKbnValues: { [key in SystemKbn]: number } = {
    [SystemKbn.StaffApp]: 0,
    [SystemKbn.DriverApp]: 0,
};

/**
 * keyを取得します。
 */
export const SystemKbnKeys: { [key in SystemKbn]: string } = {
    [SystemKbn.StaffApp]: 'StaffApp',
    [SystemKbn.DriverApp]: 'DriverApp',
};

/**
 * optionsを取得します。
 * @returns 
 */
export const getSystemKbnOptions = (): MenuItemProps[] => {
    return Object.values(SystemKbn).filter(kbn => typeof kbn === 'number').map((kbn, index) => ({ value: kbn, children: SystemKbnDisplayNames[kbn as SystemKbn] }));
};

