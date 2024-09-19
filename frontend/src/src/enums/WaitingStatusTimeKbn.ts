import { MenuItemProps } from "@mui/material";

/**
 * 待機状況時間区分
 */
export enum WaitingStatusTimeKbn {
    /**
     * 良好
     */
    Ok = 1,
    /**
     * 時間超過発生中
     */
    Ng = 2,
}

/**
 * 表示用名称を取得します。
 */
export const WaitingStatusTimeKbnDisplayNames: { [key in WaitingStatusTimeKbn]: string } = {
    [WaitingStatusTimeKbn.Ok]: '良好',
    [WaitingStatusTimeKbn.Ng]: '時間超過発生中',
};

/**
 * 区分数値を取得します。
 */
export const WaitingStatusTimeKbnValues: { [key in WaitingStatusTimeKbn]: number } = {
    [WaitingStatusTimeKbn.Ok]: 0,
    [WaitingStatusTimeKbn.Ng]: 0,
};

/**
 * keyを取得します。
 */
export const WaitingStatusTimeKbnKeys: { [key in WaitingStatusTimeKbn]: string } = {
    [WaitingStatusTimeKbn.Ok]: 'Ok',
    [WaitingStatusTimeKbn.Ng]: 'Ng',
};

/**
 * optionsを取得します。
 * @returns 
 */
export const getWaitingStatusTimeKbnOptions = (): MenuItemProps[] => {
    return Object.values(WaitingStatusTimeKbn).filter(kbn => typeof kbn === 'number').map((kbn, index) => ({ value: kbn, children: WaitingStatusTimeKbnDisplayNames[kbn as WaitingStatusTimeKbn] }));
};

