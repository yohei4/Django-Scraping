import { combineReducers } from 'redux';
import systemReducer from '@features/system/system.slice';
import userReducer from '@app/admin/features/user/user.slice';
import loadingReducer from '@features/loading/loading.slice';
import menuReducer from '@app/admin/features/menu/menu.slice';

export const rootReducer = combineReducers({
    loading: loadingReducer,
    user: userReducer,
    system: systemReducer,
    menu: menuReducer,
});
