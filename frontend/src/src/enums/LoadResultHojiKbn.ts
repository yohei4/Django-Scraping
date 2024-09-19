import { MenuItemProps } from "@mui/material";

/**
 * 荷役実績保持期間区分
 */
export enum LoadResultHojiKbn {
    /**
     * 保持期間
     */
    Year = 1,
}

/**
 * 表示用名称を取得します。
 */
export const LoadResultHojiKbnDisplayNames: { [key in LoadResultHojiKbn]: string } = {
    [LoadResultHojiKbn.Year]: '保持期間',
};

/**
 * 区分数値を取得します。
 */
export const LoadResultHojiKbnValues: { [key in LoadResultHojiKbn]: number } = {
    [LoadResultHojiKbn.Year]: 7,
};

/**
 * keyを取得します。
 */
export const LoadResultHojiKbnKeys: { [key in LoadResultHojiKbn]: string } = {
    [LoadResultHojiKbn.Year]: 'Year',
};

/**
 * optionsを取得します。
 * @returns 
 */
export const getLoadResultHojiKbnOptions = (): MenuItemProps[] => {
    return Object.values(LoadResultHojiKbn).filter(kbn => typeof kbn === 'number').map((kbn, index) => ({ value: kbn, children: LoadResultHojiKbnDisplayNames[kbn as LoadResultHojiKbn] }));
};

