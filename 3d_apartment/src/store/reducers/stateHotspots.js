import { createSlice } from '@reduxjs/toolkit';

const stateHotspots = createSlice({
    name: 'hotspots',
    initialState: {
        current: {
            position: [2.0, 0.01, -1.6],
            cameraPosition: [2.206, 1.32, -2.276],
            textureRotation: [-3.127, -1.05, -3.127],
            hideIs: [1, 3, 4],
            id: 1
        },
        hotspots: [
            {
                position: [2.0, 0.01, -1.9],
                cameraPosition: [2.206, 1.32, -2.276],
                textureRotation: [-3.127, -1.05, -3.127],
                hideIs: [1, 4],
                id: 1
            },
            {
                position: [-0.47, 0.01, -1.73],
                cameraPosition: [-1.223, 1.321, -2.003],
                textureRotation: [-3.127, 2.56, -3.127],
                hideIs: [2, 4],
                id: 2
            },
            {
                position: [-2.7, 0.01, -2.25],
                cameraPosition: [-2.823, 1.286, -1.791],
                textureRotation: [-3.127, 3.10, -3.127],
                hideIs: [1, 3],
                id: 3
            },
            {
                position: [-2.5, 0.01, 0.2],
                cameraPosition: [-2.533, 1.321, 0.232],
                textureRotation: [-3.127, -1.60, -3.127],
                hideIs: [1, 2],
                id: 4
            }
        ]
    },
    reducers: {
        setCurrent: (state, action) => {
            state.current = action.payload;
        }
    }
});

export const { setCurrent } = stateHotspots.actions;

export default stateHotspots.reducer;