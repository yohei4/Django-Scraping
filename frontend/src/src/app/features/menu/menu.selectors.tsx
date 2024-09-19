import { IMenu } from '@app/admin/interfaces/IMenu';
import { RootState } from '@app/admin/store';

export const selectItems = (state: RootState): IMenu[] => state.menu.items;
