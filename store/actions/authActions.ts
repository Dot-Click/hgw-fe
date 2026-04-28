import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '@/lib/api/auth';

export const fetchSession = createAsyncThunk(
    'auth/fetchSession',
    async (_, { rejectWithValue }) => {
        try {
            const { data, error } = await authApi.getSession();
            if (error) return rejectWithValue(error.message || 'Failed to fetch session');
            if (!data) return null;
            return JSON.parse(JSON.stringify(data));
        } catch (err: any) {
            return rejectWithValue(err.message || 'Failed to fetch session');
        }
    }
);

export const signInSocial = createAsyncThunk(
    'auth/signInSocial',
    async ({ provider, callbackURL }: { provider: 'google' | 'facebook', callbackURL?: string }, { rejectWithValue }) => {
        try {
            const { error } = await authApi.signInSocial(provider, callbackURL);
            if (error) return rejectWithValue(error.message || `${provider} login failed`);
            return null;
        } catch (err: any) {
            return rejectWithValue(err.message || `${provider} login failed`);
        }
    }
);

export const signUpWithEmail = createAsyncThunk(
    'auth/signUpWithEmail',
    async (formData: any, { rejectWithValue }) => {
        try {
            const { data, error } = await authApi.signUpEmail(formData);
            if (error) return rejectWithValue(error.message || 'Signup failed');
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
            if (error) return rejectWithValue(error.message || 'Login failed');
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
            if (error) return rejectWithValue(error.message || 'Logout failed');
            return null;
        } catch (err: any) {
            return rejectWithValue(err.message || 'Logout failed');
        }
    }
);

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (email: string, { rejectWithValue }) => {
        try {
            const { error } = await authApi.forgetPassword({
                email,
                redirectTo: `${window.location.origin}/change-password`,
            });
            if (error) {
                // Custom requirement: show "Invalid credentials" if email doesn't exist
                if (error.status === 404 || error.message?.toLowerCase().includes('not found')) {
                    return rejectWithValue('Invalid credentials');
                }
                return rejectWithValue(error.message || 'Failed to send reset link');
            }
            return true;
        } catch (err: any) {
            return rejectWithValue(err.message || 'Failed to send reset link');
        }
    }
);

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async ({ newPassword, token }: { newPassword: string, token: string }, { rejectWithValue }) => {
        try {
            const { error } = await authApi.resetPassword({
                newPassword,
                token
            });
            if (error) return rejectWithValue(error.message || 'Failed to reset password');
            return true;
        } catch (err: any) {
            return rejectWithValue(err.message || 'Failed to reset password');
        }
    }
);
