import { ImportanceKbn } from "@enums/ImportanceKbn";
import { InvalidKbn } from "@enums/InvalidKbn";

// TODO: バックエンド側のモデルと合わせる必要あり
export interface IGeneralNotice {
    isValid?: InvalidKbn;
    importanceKbn?: ImportanceKbn;
    content?: string;
    updDateTime?: string | Date;
    updContactPersonName?: string;
}
