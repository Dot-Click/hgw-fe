"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchSession } from "@/store/actions/authActions";
import Loader from "@/components/common/Loader";

export function AuthInit({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { isInitialLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Single source of truth for session initialization
    dispatch(fetchSession());
  }, [dispatch]);

  if (isInitialLoading) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0B0B0F]">
        <Loader label="Opening the Vault..." />
      </div>
    );
  }

  return <>{children}</>;
}
