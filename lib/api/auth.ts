import { authClient } from "@/lib/auth-client";

export const authApi = {
    signInSocial: async (provider: "google" | "facebook", callbackURL: string = "/") => {
        return await authClient.signIn.social({
            provider,
            callbackURL,
        });
    },

    signUpEmail: async (data: any) => {
        return await authClient.signUp.email({
            email: data.email,
            password: data.password,
            name: data.fullName,
            agreedTerms: data.agreedTerms,
        });
    },

    signInEmail: async (data: any) => {
        return await authClient.signIn.email({
            email: data.email,
            password: data.password,
        });
    },

    getSession: async () => {
        console.time("⏱️ [authApi.getSession]");
        const response = await authClient.getSession();
        console.timeEnd("⏱️ [authApi.getSession]");
        return response;
    },

    signOut: async () => {
        return await authClient.signOut();
    },

    forgetPassword: async ({ email, redirectTo }: { email: string, redirectTo: string }) => {
        return await authClient.requestPasswordReset({
            email,
            redirectTo,
        });
    },

    resetPassword: async ({ newPassword, token }: { newPassword: string, token: string }) => {
        return await authClient.resetPassword({
            newPassword,
            token,
        });
    },
};
