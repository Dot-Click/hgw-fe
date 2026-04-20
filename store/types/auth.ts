export interface User {
    id: string;
    name: string | null;
    email: string;
    image?: string | null;
    role?: string;
    agreedTerms?: boolean;
    createdAt?: string;
    updatedAt?: string;
    emailVerified?: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    isInitialLoading: boolean;
    error: string | null;
}
