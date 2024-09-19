import { IUser } from '@app/admin/interfaces/IUser';
import { RootState } from '@app/admin/store';

export const selectUser = (state: RootState): IUser => state.user;
