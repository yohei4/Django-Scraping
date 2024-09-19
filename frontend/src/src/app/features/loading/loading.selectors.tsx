import { RootState } from '@app/admin/store';

export const selectLoading = (state: RootState): boolean => state.loading;
