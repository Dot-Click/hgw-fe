import * as React from "react"
import type { Metadata } from "next"
import Sidebar from "@/components/common/Sidebar"
import AdminNavbar from "@/components/common/AdminNavbar"
import { getServerSession } from "@/lib/services/auth-service"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Admin Dashboard | HGW Legend Vault",
  description: "Manage players, categories, articles, and podcasts in the HGW ecosystem.",
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Server-Side Safety Layer (Required)
  const session = await getServerSession();

  // 1. If no session -> redirect /login
  if (!session) {
    redirect("/login");
  }

  // 2. If role is not admin -> redirect /
  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#0B0F19] text-white">
      <Sidebar />

      {/* Main Content Component Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <AdminNavbar />

        {/* Primary Page Content Wrapper */}
        <main className="flex-1 overflow-auto bg-[#0B0F19] relative">
          {/* Subtle Ambient Background Shades for Premium Look */}
          <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-[#00D4FF11] blur-[150px] -z-10 rounded-full animate-pulse" />
          
          <div className="p-4 md:p-8 max-w-[1600px] mx-auto min-h-full">
             {children}
          </div>
        </main>
      </div>
    </div>
  )
}
