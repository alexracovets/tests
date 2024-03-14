import { createSlice } from '@reduxjs/toolkit';

const stateCursor = createSlice({
    name: 'cursor',
    initialState: {
        isCursorHover: false,
        isCursorMove: false
    },
    reducers: {
        setIsCursorHover: (state, action) => {
            state.isCursorHover = action.payload;
        },
        setIsCursorMove: (state, action) => {
            state.isCursorMove = action.payload;
        },
    }
});

export const { setIsCursorHover } = stateCursor.actions;

export default stateCursor.reducer;