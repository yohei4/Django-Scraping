import { MenuItemProps } from "@mui/material";

/**
 * イベント区分
 */
export enum EventKbn {
    /**
     * 積付表受渡
     */
    Stowage = 1,
    /**
     * 荷役合計
     */
    Loading = 2,
    /**
     * 倉庫到着
     */
    Warehouse = 3,
}

/**
 * 表示用名称を取得します。
 */
export const EventKbnDisplayNames: { [key in EventKbn]: string } = {
    [EventKbn.Stowage]: '積付表受渡',
    [EventKbn.Loading]: '荷役合計',
    [EventKbn.Warehouse]: '倉庫到着',
};

/**
 * 区分数値を取得します。
 */
export const EventKbnValues: { [key in EventKbn]: number } = {
    [EventKbn.Stowage]: 0,
    [EventKbn.Loading]: 0,
    [EventKbn.Warehouse]: 0,
};

/**
 * keyを取得します。
 */
export const EventKbnKeys: { [key in EventKbn]: string } = {
    [EventKbn.Stowage]: 'Stowage',
    [EventKbn.Loading]: 'Loading',
    [EventKbn.Warehouse]: 'Warehouse',
};

/**
 * optionsを取得します。
 * @returns 
 */
export const getEventKbnOptions = (): MenuItemProps[] => {
    return Object.values(EventKbn).filter(kbn => typeof kbn === 'number').map((kbn, index) => ({ value: kbn, children: EventKbnDisplayNames[kbn as EventKbn] }));
};

