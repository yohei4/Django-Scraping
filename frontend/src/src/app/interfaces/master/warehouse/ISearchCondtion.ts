import { InvalidKbn } from "@enums/InvalidKbn";

export interface ISearchCondtion {
    WarehouseCd?: string;
    WarehouseName?: string;
    WarehouseAbbr?: string;
    InvalidKbn?: string | InvalidKbn;
}
