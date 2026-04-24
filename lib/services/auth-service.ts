import { auth } from "../auth";
import { headers } from "next/headers";

/**
 * PRODUCTION-GRADE AUTH SERVICE
 * 
 * This service handles server-side session retrieval and authorization logic.
 */

export const getServerSession = async () => {
    return await auth.api.getSession({
        headers: await headers(),
    });
};

/**
 * SERVER SIDE: Verify if the current user is an admin
 */
export const isAdmin = async () => {
    const session = await getServerSession();
    return session?.user?.role === "ADMIN";
};

/**
 * SERVER SIDE: Force admin check or return false
 */
export const requireAdmin = async () => {
    const session = await getServerSession();
    
    if (!session || session.user.role !== "ADMIN") {
        return false;
    }
    
    return true;
};

/**
 * API SIDE: Verify admin role and return session or unauthorized response
 */
export const verifyAdminApi = async () => {
    const session = await getServerSession();
    if (!session || session.user.role !== "ADMIN") {
        return { authorized: false, response: adminErrorResponse() };
    }
    return { authorized: true, session };
};

/**
 * API RESPONSE: Standard 403 error for unauthorized admin actions
 */
export const adminErrorResponse = () => {
    return new Response(JSON.stringify({ 
        error: "Unauthorized: Admin access required" 
    }), { 
        status: 403,
        headers: { "Content-Type": "application/json" }
    });
};
