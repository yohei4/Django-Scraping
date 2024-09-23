import { RootState } from '@/app/store';

export const selectLoading = (state: RootState): boolean => state.loading;
