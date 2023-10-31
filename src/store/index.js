import { configureStore } from '@reduxjs/toolkit';
import auth from './authSlice';
import activate from './activateSlice';
import chatReducer from './chatReducer'; // Import your chat reducer

export const store = configureStore({
    reducer: {
        auth,
        activate,
        chat: chatReducer,
    },
});
