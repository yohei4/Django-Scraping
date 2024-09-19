import { MenuItemProps } from "@mui/material";

/**
 * 受付状況区分
 */
export enum StowageStatusKbn {
    /**
     * 連絡前
     */
    Incomplete = 1,
    /**
     * 連絡済み
     */
    Complete = 2,
}

/**
 * 表示用名称を取得します。
 */
export const StowageStatusKbnDisplayNames: { [key in StowageStatusKbn]: string } = {
    [StowageStatusKbn.Incomplete]: '連絡前',
    [StowageStatusKbn.Complete]: '連絡済み',
};

/**
 * 区分数値を取得します。
 */
export const StowageStatusKbnValues: { [key in StowageStatusKbn]: number } = {
    [StowageStatusKbn.Incomplete]: 0,
    [StowageStatusKbn.Complete]: 0,
};

/**
 * keyを取得します。
 */
export const StowageStatusKbnKeys: { [key in StowageStatusKbn]: string } = {
    [StowageStatusKbn.Incomplete]: 'Incomplete',
    [StowageStatusKbn.Complete]: 'Complete',
};

/**
 * optionsを取得します。
 * @returns 
 */
export const getStowageStatusKbnOptions = (): MenuItemProps[] => {
    return Object.values(StowageStatusKbn).filter(kbn => typeof kbn === 'number').map((kbn, index) => ({ value: kbn, children: StowageStatusKbnDisplayNames[kbn as StowageStatusKbn] }));
};

