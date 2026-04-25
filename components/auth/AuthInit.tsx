"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchSession } from "@/store/actions/authActions";
import Loader from "@/components/common/Loader";
import { useRouter, usePathname } from "next/navigation";

export function AuthInit({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { isInitialLoading, user, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Single source of truth for session initialization
    dispatch(fetchSession());
  }, [dispatch]);

  useEffect(() => {
    // Global redirection logic for authenticated users
    if (!isInitialLoading && isAuthenticated && user) {
      // 1. Redirect if they try to access login/signup while already logged in
      if (pathname === "/login" || pathname === "/signup") {
        router.push(user.role === "ADMIN" ? "/admin" : "/");
        return;
      }

      // 2. Redirect admins to dashboard if they land on the main site root
      if (user.role === "ADMIN" && pathname === "/") {
        router.push("/admin");
        return;
      }
    }
  }, [isInitialLoading, isAuthenticated, user, pathname, router]);

  if (isInitialLoading) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0B0B0F]">
        <Loader label="Opening the Vault..." />
      </div>
    );
  }

  return <>{children}</>;
}
