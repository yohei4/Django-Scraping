import { MenuItemProps } from "@mui/material";

/**
 * デフォルト区分
 */
export enum DefaultKbn {
    /**
     * デフォルト外
     */
    Off = 0,
    /**
     * デフォルト
     */
    On = 1,
}

/**
 * 表示用名称を取得します。
 */
export const DefaultKbnDisplayNames: { [key in DefaultKbn]: string } = {
    [DefaultKbn.Off]: 'デフォルト外',
    [DefaultKbn.On]: 'デフォルト',
};

/**
 * 区分数値を取得します。
 */
export const DefaultKbnValues: { [key in DefaultKbn]: number } = {
    [DefaultKbn.Off]: 0,
    [DefaultKbn.On]: 0,
};

/**
 * keyを取得します。
 */
export const DefaultKbnKeys: { [key in DefaultKbn]: string } = {
    [DefaultKbn.Off]: 'Off',
    [DefaultKbn.On]: 'On',
};

/**
 * optionsを取得します。
 * @returns 
 */
export const getDefaultKbnOptions = (): MenuItemProps[] => {
    return Object.values(DefaultKbn).filter(kbn => typeof kbn === 'number').map((kbn, index) => ({ value: kbn, children: DefaultKbnDisplayNames[kbn as DefaultKbn] }));
};

