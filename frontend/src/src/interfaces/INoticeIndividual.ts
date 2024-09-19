import { InvalidKbn } from "@enums/InvalidKbn";
import { ImportanceKbn } from "@enums/ImportanceKbn";

// TODO: バックエンド側のモデルと合わせる必要あり
export interface INoticeIndividual {
    code?: number;
    carrierCode?: string;
    vehicleCode?: string;
    isValid?: InvalidKbn;
    importanceKbn?: ImportanceKbn;
    noticeContents?: string;
    updDateTime?: string | Date;
    updCode?: string;
    updContactPersonName?: string;
}
