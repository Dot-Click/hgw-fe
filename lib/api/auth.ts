import { authClient } from "@/lib/auth-client";

export const authApi = {
    signInSocial: async (provider: "google" | "facebook") => {
        return await authClient.signIn.social({
            provider,
            callbackURL: "/",
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
        return await authClient.getSession();
    },

    signOut: async () => {
        return await authClient.signOut();
    },
};
