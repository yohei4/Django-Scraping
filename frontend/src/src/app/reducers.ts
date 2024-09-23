import { combineReducers } from 'redux';
import loadingReducer from '@features/loading/loading.slice';
import userReducer from '@app/features/user/user.slice';

export const rootReducer = combineReducers({
    loading: loadingReducer,
    user: userReducer,
});
