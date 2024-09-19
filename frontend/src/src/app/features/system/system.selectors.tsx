import { RootState } from '@app/admin/store';
import { MSystem } from '@interfaces/MSystem';

export const selectSystem = (state: RootState): MSystem => state.system;
