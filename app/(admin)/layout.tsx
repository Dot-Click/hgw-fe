import React from "react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col bg-[#0D0E12] min-h-screen text-white">
      {/* Admin Navbar */}
      <nav className="bg-[#111217] border-b border-[#24262E] px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <Link href="/">
            <img src="/logo.png" alt="Logo" className="w-36 md:w-44 object-contain" />
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium orbitron tracking-wider">
            <Link 
              href="/dashboard" 
              className="text-[#00CCFF] hover:opacity-80 transition-opacity"
            >
              DASHBOARD
            </Link>
            <Link 
              href="/users" 
              className="text-[#7B899D] hover:text-white transition-colors"
            >
              USERS
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="hidden sm:block text-right">
             <p className="text-xs text-[#00CCFF] orbitron font-bold">ADMIN PANEL</p>
             <p className="text-[10px] text-[#7B899D]">Super User</p>
           </div>
           <div className="w-10 h-10 rounded-xl bg-[#00CCFF1A] border border-[#00CCFF33] flex items-center justify-center text-[#00CCFF] font-bold">
             A
           </div>
        </div>
      </nav>

      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
