"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  FiGrid,
  FiUsers,
  FiUserPlus,
  FiFolder,
  FiFileText,
  FiMic,
  FiMail,
  FiCpu,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiChevronLeft,
} from "react-icons/fi"
import { LuTrophy } from "react-icons/lu"
import { 
  Button, 
  ScrollShadow,
  cn
} from "@heroui/react"

export const menuItems = [
  { label: "Dashboard", icon: FiGrid, href: "/admin" },
  { label: "Players", icon: FiUsers, href: "/admin/players" },
  { label: "Add New Player", icon: FiUserPlus, href: "/admin/players/new" },
  { label: "Leaderboard", icon: LuTrophy, href: "/admin/leaderboard" },
  { label: "Categories", icon: FiFolder, href: "/admin/categories" },
  { label: "Articles", icon: FiFileText, href: "/admin/articles" },
  { label: "Podcasts", icon: FiMic, href: "/admin/podcasts" },
  { label: "Subscribers", icon: FiMail, href: "/admin/subscribers" },
  { label: "AI (Katy)", icon: FiCpu, href: "/admin/ai" },
  { label: "Settings", icon: FiSettings, href: "/admin/settings" },
]

const Sidebar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  // Reset to default state on navigation (Closed on mobile, Open on desktop)
  React.useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <>
      {/* Desktop Toggle Button - Positioned to follow the sidebar right edge */}
      <div 
        className={cn(
          "hidden md:flex fixed top-20 z-130 transition-all duration-300 ease-in-out",
          isOpen ? "left-0" : "left-[274px]"
        )}
      >
        <Button
          isIconOnly
          size="sm"
          variant="ghost"
          onPress={() => setIsOpen(!isOpen)}
          className="bg-[#0F1420] border border-[#2A3040] text-zinc-400 hover:text-[#00D4FF] shadow-xl h-8 w-8 min-w-0 rounded-full hover:border-[#00D4FF]/50 transition-all border-l-0 rounded-l-none"
        >
          {isOpen ? <FiMenu size={16} /> : <FiChevronLeft size={16} />}
        </Button>
      </div>


      {/* Mobile Toggle Button - Strictly for mobile, transitions to inside the sidebar when open */}
      <div 
        className={cn(
          "md:hidden fixed top-3 z-[150] transition-all duration-300 ease-in-out",
          isOpen ? "left-[234px]" : "left-4"
        )}
      >
        <Button
          isIconOnly
          size="sm"
          variant="ghost"               
          onPress={() => setIsOpen(!isOpen)}
          className="bg-[#0F1420] border border-[#2A3040] text-zinc-400 shadow-xl h-10 w-10 rounded-xl"
        >
          {isOpen ? <FiChevronLeft size={20} /> : <FiMenu size={20} />}
        </Button>
      </div>

      {/* Backdrop for mobile/tablet when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-110 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}       
        />
      )}

      <aside 
        className={cn(
          "bg-[#0F1420] border-r border-[#2A3040] transition-all duration-300 ease-in-out flex flex-col h-full",
          // Layout Behavior: Relative on desktop (pushes content), Fixed on mobile (overlay)
          "lg:relative fixed inset-y-0 left-0 z-120 shadow-2xl overflow-hidden",
          isOpen ? "lg:w-0 w-72 translate-x-0" : "lg:w-72 w-72 -translate-x-full lg:translate-x-0"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center gap-3 px-6 py-3 h-16 border-b border-[#2A3040]">
          <div className="flex h-9 w-9 min-w-9 items-center justify-center rounded-full border border-[#00D4FF]/30 bg-[#00D4FF]/10 shadow-[0_0_15px_rgba(0,212,255,0.2)]">
            <span className="font-bold text-[#00D4FF] text-[10px]">HGW</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-[700] tracking-wider text-white orbitron">HGW ADMIN</span>
            <span className="text-[10px] text-zinc-500 outfit uppercase tracking-widest">Legend Vault Panel</span>
          </div>
        </div>

        {/* Sidebar Menu */}
        <ScrollShadow className="flex-1 py-4 px-3 overflow-y-auto">
          <nav className="flex flex-col gap-1.5 font-sans">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/admin" && pathname.startsWith(item.href))
              
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-2 py-2 rounded-xl transition-all duration-200 group relative",
                    isActive 
                      ? "bg-[#00D4FF]/10 text-[#00D4FF] shadow-[0_0_10px_rgba(0,212,255,0.1)]" 
                      : "text-zinc-400 hover:bg-[#1A1F2E] hover:text-white"
                  )}
                >
                  <item.icon className={cn("h-4 w-4 min-w-4 transition-colors", isActive ? "text-[#00D4FF]" : "group-hover:text-white")} />
                  <span className="text-[14px] font-[400] tracking-wider outfit whitespace-nowrap">
                    {item.label}
                  </span>
                  
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#00D4FF] rounded-r-md shadow-[0_0_10px_#00D4FF]" />
                  )}
                </Link>
              )
            })}
          </nav>
        </ScrollShadow>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#2A3040]">
           <Link
            href="/"
            className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative text-red-500/80 hover:text-red-400 hover:bg-red-500/10"
          >
            <FiLogOut className="h-5 w-5 min-w-5 shrink-0" />
            <span className="text-sm font-semibold outfit uppercase tracking-widest">
              Logout
            </span>
          </Link>
        </div>
      </aside>
    </>
  )
}

export default Sidebar