"use client"

import React, { ReactNode } from 'react'
import { useIsAdmin } from '../../lib/auth-utils'

interface AdminGuardProps {
    children: ReactNode
    fallback?: ReactNode
}

/**
 * UI GUARD: Only renders children if the user is an ADMIN.
 * This prevents UI flicker and safely handles loading states.
 */
const AdminGuard = ({ children, fallback = null }: AdminGuardProps) => {
    const { isAdmin, isLoading } = useIsAdmin();

    // While loading session, show nothing (or optional fallback)
    if (isLoading) return fallback;

    // If not admin, hide the children entirely
    if (!isAdmin) return fallback;

    return <>{children}</>;
}

export default AdminGuard
