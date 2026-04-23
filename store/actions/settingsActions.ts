import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProfileUpdatePayload, SecurityUpdatePayload, AlertsUpdatePayload } from '../types/settings';

export const updateProfile = createAsyncThunk(
    'settings/updateProfile',
    async (payload: ProfileUpdatePayload, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/settings/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || 'Failed to update profile');
            }

            return data.user;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Something went wrong');
        }
    }
);

export const updatePassword = createAsyncThunk(
    'settings/updatePassword',
    async (payload: SecurityUpdatePayload, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/settings/security', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || 'Failed to update password');
            }

            return data.message;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Something went wrong');
        }
    }
);

export const updateAlerts = createAsyncThunk(
    'settings/updateAlerts',
    async (payload: AlertsUpdatePayload, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/settings/alerts', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || 'Failed to update alerts');
            }

            return data.user;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Something went wrong');
        }
    }
);
