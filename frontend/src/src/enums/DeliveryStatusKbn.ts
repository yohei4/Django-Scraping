import { MenuItemProps } from '@mui/material';

/**
 * 受渡状況区分
 */
export enum DeliveryStatusKbn {
    Before = 0,
    After = 1,
};

/**
 *  受渡状況の名称を取得
 */
export const DeliveryStatusKbnDisplayNames: { [key in DeliveryStatusKbn]: string } = {
    [DeliveryStatusKbn.Before]: '連絡前',
    [DeliveryStatusKbn.After]: '連絡済み',
};

/**
 * 受渡状況のoptionsを取得
 * @returns
 */
export const getDeliveryStatusKbnOptions = (): MenuItemProps[] => {
    return Object.values(DeliveryStatusKbn).filter(kbn => typeof kbn === 'number').map((kbn, index) => ({ value: kbn, children: DeliveryStatusKbnDisplayNames[kbn as DeliveryStatusKbn] })).sort((a, b) => b.value -  a.value);
}