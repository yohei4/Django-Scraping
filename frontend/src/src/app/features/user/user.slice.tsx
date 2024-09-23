import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from '@app/interfaces//IUser';

const initialState: IUser = {
    id: undefined,
    password: undefined,
    last_login: undefined,
    username: undefined,
    email: undefined,
    is_active: undefined,
    is_admin: undefined,
    created_at: undefined,
    updated_at: undefined,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUser: (state) => {
            return { ...state, initialState };
        },
        setUser: (state, action: PayloadAction<IUser>) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { resetUser, setUser } = userSlice.actions;
export default userSlice.reducer;
