import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '@/lib/api/auth';

export const fetchSession = createAsyncThunk(
    'auth/fetchSession',
    async (_, { rejectWithValue }) => {
        try {
            const { data, error } = await authApi.getSession();
            if (error) return rejectWithValue(error.message);
            if (!data) return null;
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
