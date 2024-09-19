import { MenuItemProps } from "@mui/material";

/**
 * 無効区分
 */
export enum InvalidKbn {
    /**
     * 有効
     */
    Off = 0,
    /**
     * 無効
     */
    On = 1,
}

/**
 * 表示用名称を取得します。
 */
export const InvalidKbnDisplayNames: { [key in InvalidKbn]: string } = {
    [InvalidKbn.Off]: '有効',
    [InvalidKbn.On]: '無効',
};

/**
 * 区分数値を取得します。
 */
export const InvalidKbnValues: { [key in InvalidKbn]: number } = {
    [InvalidKbn.Off]: 0,
    [InvalidKbn.On]: 0,
};

/**
 * keyを取得します。
 */
export const InvalidKbnKeys: { [key in InvalidKbn]: string } = {
    [InvalidKbn.Off]: 'Off',
    [InvalidKbn.On]: 'On',
};

/**
 * optionsを取得します。
 * @returns 
 */
export const getInvalidKbnOptions = (): MenuItemProps[] => {
    return Object.values(InvalidKbn).filter(kbn => typeof kbn === 'number').map((kbn, index) => ({ value: kbn, children: InvalidKbnDisplayNames[kbn as InvalidKbn] }));
};

