import { MUser } from "@interfaces/MUser";

export interface IUser extends MUser {
    ConfirmPassword?: string;
    UserName?: string;
    UserKana?: string;
    CarrierName?: string;
    KinoAuthGroupNm?: string;
}
