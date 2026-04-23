export interface ProfileUpdatePayload {
    name: string;
}

export interface SecurityUpdatePayload {
    currentPassword?: string;
    newPassword: string;
    confirmNewPassword: string;
}

export interface AlertsUpdatePayload {
    emailAlerts: boolean;
}

export interface SettingsState {
    loading: boolean;
    success: boolean;
    error: string | null;
}
