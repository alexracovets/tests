import { createSlice } from '@reduxjs/toolkit';

const stateCamera = createSlice({
    name: 'camera',
    initialState: {
        position: [2.206, 1.32, -2.276],
        orbitMode: false,
        autoRotate: false,
    },
    reducers: {
        setPosition: (state, action) => {
            state.position = action.payload;
        },
    }
});

export const { setPosition } = stateCamera.actions;

export default stateCamera.reducer;