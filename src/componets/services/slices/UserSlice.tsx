import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../authService';

interface AuthState {
    accessToken: string | null;
    isAuthenticated: boolean;
    user: TUser | null;
}

const initialState: AuthState = {
    accessToken: null,
    isAuthenticated: false,
    user: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<{ user: TUser | null; accessToken: string; }>) {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;
        },
        logout(state) {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
    },
});

export const { login, logout, setAccessToken } = authSlice.actions;
export default authSlice.reducer;