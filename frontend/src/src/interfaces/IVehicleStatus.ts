import { InvalidKbn } from "@enums/InvalidKbn";
import { ImportanceKbn } from "@enums/ImportanceKbn";

// TODO: バックエンド側のモデルと合わせる必要あり
export type IVehicleStatus = {
    code?: number;
    isValid?: InvalidKbn;
    importanceKbn?: ImportanceKbn;
    noticeContents?: string;
    updDateTime?: string | Date;
    updCode?: string;
    updContactPersonName?: string;
}
