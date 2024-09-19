import { MenuItemProps } from "@mui/material";

/**
 * 待機状況車両区分
 */
export enum WaitingStatusTruckKbn {
    /**
     * 良好
     */
    Ok = 1,
    /**
     * 車両待機発生中
     */
    Ng = 2,
}

/**
 * 表示用名称を取得します。
 */
export const WaitingStatusTruckKbnDisplayNames: { [key in WaitingStatusTruckKbn]: string } = {
    [WaitingStatusTruckKbn.Ok]: '良好',
    [WaitingStatusTruckKbn.Ng]: '車両待機発生中',
};

/**
 * 区分数値を取得します。
 */
export const WaitingStatusTruckKbnValues: { [key in WaitingStatusTruckKbn]: number } = {
    [WaitingStatusTruckKbn.Ok]: 0,
    [WaitingStatusTruckKbn.Ng]: 0,
};

/**
 * keyを取得します。
 */
export const WaitingStatusTruckKbnKeys: { [key in WaitingStatusTruckKbn]: string } = {
    [WaitingStatusTruckKbn.Ok]: 'Ok',
    [WaitingStatusTruckKbn.Ng]: 'Ng',
};

/**
 * optionsを取得します。
 * @returns 
 */
export const getWaitingStatusTruckKbnOptions = (): MenuItemProps[] => {
    return Object.values(WaitingStatusTruckKbn).filter(kbn => typeof kbn === 'number').map((kbn, index) => ({ value: kbn, children: WaitingStatusTruckKbnDisplayNames[kbn as WaitingStatusTruckKbn] }));
};

