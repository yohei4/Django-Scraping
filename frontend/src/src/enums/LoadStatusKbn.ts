import { MenuItemProps } from "@mui/material";

/**
 * 積込状況区分
 */
export enum LoadStatusKbn {
    /**
     * 荷役開始
     */
    LoadingStart = 1,
    /**
     * 積込前
     */
    LoadingBefore = 2,
    /**
     * 待機中
     */
    LoadingStandby = 3,
    /**
     * 積込中
     */
    Loading = 4,
    /**
     * 完了
     */
    LoadingEnd = 5,
}

/**
 * 表示用名称を取得します。
 */
export const LoadStatusKbnDisplayNames: { [key in LoadStatusKbn]: string } = {
    [LoadStatusKbn.LoadingStart]: '荷役開始',
    [LoadStatusKbn.LoadingBefore]: '積込前',
    [LoadStatusKbn.LoadingStandby]: '待機中',
    [LoadStatusKbn.Loading]: '積込中',
    [LoadStatusKbn.LoadingEnd]: '完了',
};

/**
 * 区分数値を取得します。
 */
export const LoadStatusKbnValues: { [key in LoadStatusKbn]: number } = {
    [LoadStatusKbn.LoadingStart]: 0,
    [LoadStatusKbn.LoadingBefore]: 0,
    [LoadStatusKbn.LoadingStandby]: 0,
    [LoadStatusKbn.Loading]: 0,
    [LoadStatusKbn.LoadingEnd]: 0,
};

/**
 * keyを取得します。
 */
export const LoadStatusKbnKeys: { [key in LoadStatusKbn]: string } = {
    [LoadStatusKbn.LoadingStart]: 'LoadingStart',
    [LoadStatusKbn.LoadingBefore]: 'LoadingBefore',
    [LoadStatusKbn.LoadingStandby]: 'LoadingStandby',
    [LoadStatusKbn.Loading]: 'Loading',
    [LoadStatusKbn.LoadingEnd]: 'LoadingEnd',
};

/**
 * optionsを取得します。
 * @returns 
 */
export const getLoadStatusKbnOptions = (): MenuItemProps[] => {
    return Object.values(LoadStatusKbn).filter(kbn => typeof kbn === 'number').map((kbn, index) => ({ value: kbn, children: LoadStatusKbnDisplayNames[kbn as LoadStatusKbn] }));
};

