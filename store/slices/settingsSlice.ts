import { createSlice } from '@reduxjs/toolkit';
import { SettingsState } from '../types/settings';
import { updateProfile, updatePassword, updateAlerts } from '../actions/settingsActions';

const initialState: SettingsState = {
    loading: false,
    success: false,
    error: null,
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        resetSettingsState: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
        clearSettingsError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Update Profile
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateProfile.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Update Password
            .addCase(updatePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updatePassword.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Update Alerts
            .addCase(updateAlerts.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateAlerts.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(updateAlerts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetSettingsState, clearSettingsError } = settingsSlice.actions;
export default settingsSlice.reducer;
