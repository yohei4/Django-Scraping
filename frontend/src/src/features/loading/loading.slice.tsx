import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: boolean = false;

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        resetLoading: (state) => {
            return false;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            return action.payload;
        },
    },
});

export const { resetLoading, setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
