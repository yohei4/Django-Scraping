import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IMenu } from '@app/admin/interfaces/IMenu';

interface MenuState {
    items: IMenu[];
}

const initialState: MenuState = {
    items: [],
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        resetMenu: (state) => {
            return { ...state, initialState };
        },
        setMenu: (state, action: PayloadAction<IMenu[]>) => {
            return { ...state, items: action.payload };
        },
    },
});

export const { resetMenu, setMenu } = menuSlice.actions;
export default menuSlice.reducer;