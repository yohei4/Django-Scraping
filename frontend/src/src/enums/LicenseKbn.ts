import { MenuItemProps } from "@mui/material";

/**
 * 使用許可区分
 */
export enum LicenseKbn {
    /**
     * 使用不可
     */
    NoLicense = 0,
    /**
     * 使用可
     */
    License = 1,
}

/**
 * 表示用名称を取得します。
 */
export const LicenseKbnDisplayNames: { [key in LicenseKbn]: string } = {
    [LicenseKbn.NoLicense]: '使用不可',
    [LicenseKbn.License]: '使用可',
};

/**
 * 区分数値を取得します。
 */
export const LicenseKbnValues: { [key in LicenseKbn]: number } = {
    [LicenseKbn.NoLicense]: 0,
    [LicenseKbn.License]: 0,
};

/**
 * keyを取得します。
 */
export const LicenseKbnKeys: { [key in LicenseKbn]: string } = {
    [LicenseKbn.NoLicense]: 'NoLicense',
    [LicenseKbn.License]: 'License',
};

/**
 * optionsを取得します。
 * @returns 
 */
export const getLicenseKbnOptions = (): MenuItemProps[] => {
    return Object.values(LicenseKbn).filter(kbn => typeof kbn === 'number').map((kbn, index) => ({ value: kbn, children: LicenseKbnDisplayNames[kbn as LicenseKbn] }));
};

