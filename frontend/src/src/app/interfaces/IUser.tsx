import { AdminAuthKbn } from "@enums/AdminAuthKbn";
import { MUser } from "@interfaces/MUser";

export interface IUser extends MUser {
    UserName?: string;
    UserKana?: string;
    AdminAuthKbn?: AdminAuthKbn;
}
