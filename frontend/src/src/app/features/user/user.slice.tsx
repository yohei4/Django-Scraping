import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from '@app/admin/interfaces//IUser';

const initialState: IUser = {
    UserCd: undefined,
    UserNameSei: undefined,
    UserNameMei: undefined,
    UserKanaSei: undefined,
    UserKanaMei: undefined,
    KinoAuthGroupNo: undefined,
    CarrierCd: undefined,
    Password: undefined,
    InvalidKbn: undefined,
    InsDateTime: undefined,
    InsKinoCd: undefined,
    InsUserCd: undefined,
    InsUserName: undefined,
    UpdDateTime: undefined,
    UpdKinoCd: undefined,
    UpdUserCd: undefined,
    UpdUserName: undefined,
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