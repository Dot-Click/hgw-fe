"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { FiBell, FiLogOut } from "react-icons/fi"
import { Badge, Spinner, Avatar } from "@heroui/react"
import { menuItems } from "./Sidebar"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchSession, logout } from "@/store/actions/authActions"

const AdminNavbar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user, isInitialLoading } = useAppSelector((state) => state.auth)

  React.useEffect(() => {
    if (!user && isInitialLoading) {
      dispatch(fetchSession())
    }
  }, [user, isInitialLoading, dispatch])

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault()
    await dispatch(logout())
    router.push("/login")
  }

  const activeItem = menuItems.find(
    (item) =>
      pathname === item.href ||
      (item.href !== "/admin" && pathname.startsWith(item.href))
  )

  const getInitials = () => {
    if (user?.name) return user.name.substring(0, 2).toUpperCase()
    return "AD"
  }

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
        <div className="flex items-center outfit gap-3">
          {isInitialLoading && !user ? (
            <div className="w-10 h-10 flex items-center justify-center rounded-full border border-[#2A3040] bg-[#3e5364]">
              <Spinner size="sm" color="current" />
            </div>
          ) : (
            <Avatar className="w-10 h-10 border border-[#2A3040] bg-[#3e5364] shrink-0">
              {user?.image && <Avatar.Image src={user.image} className="object-cover" />}
              <Avatar.Fallback className="text-sm font-bold text-white orbitron uppercase">
                {getInitials()}
              </Avatar.Fallback>
            </Avatar>
          )}

          <div className="hidden flex-col md:flex">
            <span className="text-sm font-[700] text-white leading-tight">
              {user?.name || "Admin"}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-zinc-500">
              {user?.role || "User"}
            </span>
          </div>
        </div>

        {/* 🚪 LOGOUT */}
        <div className="ml-2 hidden outfit sm:flex">
          <button
            onClick={handleLogout}
            className=" group flex gap-1 items-center transition-all bg-transparent border-none outline-none cursor-pointer"
          >
            <div className="rounded-lg  p-1 text-red-500 group-hover:text-white">
              <FiLogOut size={15} />
            </div>
            <span className="text-[12px] font-[700] uppercase text-red-500 group-hover:text-white ">
              Logout
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default AdminNavbar