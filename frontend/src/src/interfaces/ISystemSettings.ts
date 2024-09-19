// TODO: バックエンド側のモデルと合わせる必要あり
export interface ISystemSettings {
    handlingTime?: number;
    receiptTime?: number;
    updateIntervalEmployee?: number;
    updateIntervalDriver?: number;
    alertMessage?: string;
    updDateTime?: string | Date;
    updContactPersonName?: string;
}
