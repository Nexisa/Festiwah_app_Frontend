import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
    },
    reducers: {
        login: (state) => {
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.isAuthenticated = false;
        },
    },
});

export const { login, logout } = authSlice.actions;

export const selectIsAuthenticated = (state: { auth: { isAuthenticated: any; }; }) => state.auth.isAuthenticated;

export default authSlice.reducer;



