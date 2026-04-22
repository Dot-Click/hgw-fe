import { authClient } from "./auth-client";

/**
 * CLIENT SIDE: Hook to check if the current user is an admin
 * 
 * Safe for use in Client Components. It uses the better-auth client
 * which fetches session data via standard fetch, avoiding next/headers.
 */
export const useIsAdmin = () => {
    const { data: session, isPending } = authClient.useSession();
    return {
        isAdmin: session?.user?.role === "ADMIN",
        isLoading: isPending
    };
};
