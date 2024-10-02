// Store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slice'; 
import ProfileSlice from './ProfileSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer, 
        profileData:ProfileSlice,
    },

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
