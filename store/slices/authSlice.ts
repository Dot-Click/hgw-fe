import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '@/lib/api/auth';

interface User {
    id: string;
    name: string | null;
    email: string;
    image?: string | null;
    role?: string;
    agreedTerms?: boolean;
    createdAt?: string; // Serialized string
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    isInitialLoading: boolean; // For initial session check
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    isInitialLoading: true,
    error: null,
};

// Helper to sanitize non-serializable data from Better Auth
const sanitizeUser = (user: any): User => {
    if (!user) return user;
    return {
        ...user,
        createdAt: user.createdAt instanceof Date ? user.createdAt.toISOString() : user.createdAt,
        updatedAt: user.updatedAt instanceof Date ? user.updatedAt.toISOString() : user.updatedAt,
        emailVerified: user.emailVerified instanceof Date ? user.emailVerified.toISOString() : user.emailVerified,
    };
};

export const fetchSession = createAsyncThunk(
    'auth/fetchSession',
    async (_, { rejectWithValue }) => {
        try {
            const { data, error } = await authApi.getSession();
            if (error) return rejectWithValue(error.message);
            if (!data) return null;
            // Serialize session and user to avoid Date objects in Redux
            return JSON.parse(JSON.stringify(data));
        } catch (err: any) {
            return rejectWithValue(err.message || 'Failed to fetch session');
        }
    }
);

export const loginWithGoogle = createAsyncThunk(
    'auth/loginWithGoogle',
    async (_, { rejectWithValue }) => {
        try {
            const { error } = await authApi.signInSocial('google');
            if (error) return rejectWithValue(error.message);
            return null;
        } catch (err: any) {
            return rejectWithValue(err.message || 'Google login failed');
        }
    }
);

export const signUpWithEmail = createAsyncThunk(
    'auth/signUpWithEmail',
    async (formData: any, { rejectWithValue }) => {
        try {
            const { data, error } = await authApi.signUpEmail(formData);
            if (error) return rejectWithValue(error.message);
            return JSON.parse(JSON.stringify(data));
        } catch (err: any) {
            return rejectWithValue(err.message || 'Signup failed');
        }
    }
);

export const signInWithEmail = createAsyncThunk(
    'auth/signInWithEmail',
    async (formData: any, { rejectWithValue }) => {
        try {
            const { data, error } = await authApi.signInEmail(formData);
            if (error) return rejectWithValue(error.message);
            return JSON.parse(JSON.stringify(data));
        } catch (err: any) {
            return rejectWithValue(err.message || 'Login failed');
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const { error } = await authApi.signOut();
            if (error) return rejectWithValue(error.message);
            return null;
        } catch (err: any) {
            return rejectWithValue(err.message || 'Logout failed');
        }
    }
);

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
                state.error = null;
            })
            .addCase(signUpWithEmail.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.user = sanitizeUser(action.payload.user);
                    state.isAuthenticated = true;
                }
            })
            .addCase(signUpWithEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Sign In
            .addCase(signInWithEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signInWithEmail.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.user = sanitizeUser(action.payload.user);
                    state.isAuthenticated = true;
                }
            })
            .addCase(signInWithEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Logout
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.isInitialLoading = false;
            });
    },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
