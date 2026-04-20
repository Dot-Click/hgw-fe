import { createSlice } from '@reduxjs/toolkit';
import { AuthState, User } from '../types/auth';
import { 
    fetchSession, 
    signUpWithEmail, 
    signInWithEmail,
    signInSocial,
    logout 
} from '../actions/authActions';

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    loadingProvider: null,
    isInitialLoading: true,
    error: null,
};

const sanitizeUser = (user: any): User => {
    if (!user) return user;
    return {
        ...user,
        createdAt: user.createdAt instanceof Date ? user.createdAt.toISOString() : user.createdAt,
        updatedAt: user.updatedAt instanceof Date ? user.updatedAt.toISOString() : user.updatedAt,
        emailVerified: user.emailVerified instanceof Date ? user.emailVerified.toISOString() : user.emailVerified,
    };
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Session
            .addCase(fetchSession.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSession.fulfilled, (state, action) => {
                state.loading = false;
                state.isInitialLoading = false;
                if (action.payload) {
                    state.user = sanitizeUser(action.payload.user);
                    state.isAuthenticated = true;
                } else {
                    state.user = null;
                    state.isAuthenticated = false;
                }
            })
            .addCase(fetchSession.rejected, (state, action) => {
                state.loading = false;
                state.isInitialLoading = false;
                state.error = action.payload as string;
            })
            // Sign Up
            .addCase(signUpWithEmail.pending, (state) => {
                state.loading = true;
                state.loadingProvider = 'email';
                state.error = null;
            })
            .addCase(signUpWithEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.loadingProvider = null;
                if (action.payload) {
                    state.user = sanitizeUser(action.payload.user);
                    state.isAuthenticated = true;
                }
            })
            .addCase(signUpWithEmail.rejected, (state, action) => {
                state.loading = false;
                state.loadingProvider = null;
                state.error = action.payload as string;
            })
            // Sign In
            .addCase(signInWithEmail.pending, (state) => {
                state.loading = true;
                state.loadingProvider = 'email';
                state.error = null;
            })
            .addCase(signInWithEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.loadingProvider = null;
                if (action.payload) {
                    state.user = sanitizeUser(action.payload.user);
                    state.isAuthenticated = true;
                }
            })
            .addCase(signInWithEmail.rejected, (state, action) => {
                state.loading = false;
                state.loadingProvider = null;
                state.error = action.payload as string;
            })
            // Social Login
            .addCase(signInSocial.pending, (state, action) => {
                state.loading = true;
                state.loadingProvider = action.meta.arg;
                state.error = null;
            })
            .addCase(signInSocial.fulfilled, (state) => {
                state.loading = false;
                state.loadingProvider = null;
            })
            .addCase(signInSocial.rejected, (state, action) => {
                state.loading = false;
                state.loadingProvider = null;
                state.error = action.payload as string;
            })
            // Logout
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.isInitialLoading = false;
                state.loading = false;
            });
    },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
