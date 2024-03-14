import { configureStore } from '@reduxjs/toolkit';

import stateCameraReducer from './reducers/stateCamera';
import stateCursorReducer from './reducers/stateCursor';
import stateHotspotsReducer from './reducers/stateHotspots';

const store = configureStore({
    reducer: {
        stateCamera: stateCameraReducer,
        stateCursor: stateCursorReducer,
        stateHotspots: stateHotspotsReducer,
    },
});

export default store;