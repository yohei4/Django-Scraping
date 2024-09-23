import { IUser } from '@app/interfaces/IUser';
import { RootState } from '@app/store';

export const selectUser = (state: RootState): IUser => state.user;
