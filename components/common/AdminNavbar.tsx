"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FiBell, FiLogOut } from "react-icons/fi"
import { Badge } from "@heroui/react"
import { menuItems } from "./Sidebar"

const AdminNavbar = () => {
  const pathname = usePathname()

  const activeItem = menuItems.find(
    (item) =>
      pathname === item.href ||
      (item.href !== "/admin" && pathname.startsWith(item.href))
  )

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-[#2A3040] bg-[#0B0F19]/90 px-6 lg:pl-6 pl-16 backdrop-blur-md">
      
      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">
        <div className=" hidden md:flex flex-col">
          <h1 className="text-[15px] font-semibold uppercase tracking-[0.15em] text-white">
            {activeItem?.label || "Dashboard"}
          </h1>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">

        {/* 🔔 Notifications */}
        <div className="relative flex items-center">
          <Badge.Anchor>
            <div className="cursor-pointer p-1 text-zinc-400 transition-colors hover:text-white">
              <FiBell size={20} />
            </div>
            <Badge
              className="bg-[#00D4FF] text-[#0B0F19] text-[12px]  font-bold "
              color="accent"
              size="sm"
            >
              7
            </Badge>
          </Badge.Anchor>
        </div>

        {/* 👤 USER PROFILE */}
        <div className="flex items-center outfit gap-2">
          <div className="flex p-2 items-center justify-center rounded-full border border-[#2A3040]
           bg-[#3e5364] shadow-inner">
            <span className="text-sm font-bold text-white outfit uppercase">AC</span>
          </div>

          <div className="hidden flex-col md:flex">
            <span className="text-sm font-[700] text-white leading-tight">
              Admin
            </span>
            <span className="text-[10px] uppercase tracking-wider text-zinc-500">
              Super Admin
            </span>
          </div>
        </div>

        {/* 🚪 LOGOUT */}
        <div className="ml-2 hidden outfit sm:flex">
          <Link
            href="/"
            className=" group flex gap-1 items-center  transition-all"
          >
            <div className="rounded-lg  p-1 text-red-500 group-hover:text-white">
              <FiLogOut size={15} />
            </div>
            <span className="text-[12px] font-[700] uppercase text-red-500 group-hover:text-white ">
              Logout
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default AdminNavbar