import { MenuItemProps } from "@mui/material";

/**
 * 重要度区分
 */
export enum PriorityKbn {
    /**
     * 低
     */
    Low = 1,
    /**
     * 中
     */
    Med = 2,
    /**
     * 高
     */
    High = 3,
}

/**
 * 表示用名称を取得します。
 */
export const PriorityKbnDisplayNames: { [key in PriorityKbn]: string } = {
    [PriorityKbn.Low]: '低',
    [PriorityKbn.Med]: '中',
    [PriorityKbn.High]: '高',
};

/**
 * 区分数値を取得します。
 */
export const PriorityKbnValues: { [key in PriorityKbn]: number } = {
    [PriorityKbn.Low]: 0,
    [PriorityKbn.Med]: 0,
    [PriorityKbn.High]: 0,
};

/**
 * keyを取得します。
 */
export const PriorityKbnKeys: { [key in PriorityKbn]: string } = {
    [PriorityKbn.Low]: 'Low',
    [PriorityKbn.Med]: 'Med',
    [PriorityKbn.High]: 'High',
};

/**
 * optionsを取得します。
 * @returns 
 */
export const getPriorityKbnOptions = (): MenuItemProps[] => {
    return Object.values(PriorityKbn).filter(kbn => typeof kbn === 'number').map((kbn, index) => ({ value: kbn, children: PriorityKbnDisplayNames[kbn as PriorityKbn] }));
};

