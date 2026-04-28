"use client"

import React from "react"
import { FiArrowUpRight } from "react-icons/fi"
import { cn, Skeleton } from "@heroui/react"
import { useAppSelector } from "@/store/hooks"
import { useRouter } from "next/navigation"

const getStatusStyles = (status: string) => {
  switch (status.toLowerCase()) {
    case "published":
      return "bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20"
    case "draft":
      return "bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20"
    default:
      return "bg-zinc-500/10 text-zinc-500 border border-zinc-500/20"
  }
}

const RecentPlayers = () => {
  const router = useRouter()
  const { recentPlayers, loading } = useAppSelector((state) => state.dashboard)

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase()
  }

  return (
    <div className="flex flex-col h-full rounded-2xl border border-[#2A3040] bg-[#111A2C]/50 transition-all duration-300 hover:border-[#00D4FF]/20">
      {/* Header */}
      <div className="p-6 border-b border-[#2A3040] flex items-center justify-between">
        <h2 className="text-[18px] font-[700] text-white orbitron tracking-wider">
          Recent Players
        </h2>
        <button
          onClick={() => router.push("/admin/players")}
          className="flex items-center gap-1.5 text-[13px] font-bold text-[#00D4FF] hover:text-white transition-colors outfit uppercase tracking-wider"
        >
          View All
          <FiArrowUpRight className="h-4 w-4" />
        </button>
      </div>

      {/* List */}
      <div className="p-2">
        {loading || recentPlayers.length === 0 ? (
          // Skeleton loading state
          [1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={cn(
                "flex flex-col gap-4 p-4 rounded-xl",
                "sm:flex-row sm:items-center sm:justify-between sm:gap-4",
                i !== 4 && "border-b border-[#2A3040]/50"
              )}
            >
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full bg-[#1A2333] shrink-0" />
                <div className="flex flex-col gap-1.5">
                  <Skeleton className="w-28 h-4 rounded-md bg-[#1A2333]" />
                  <Skeleton className="w-16 h-3 rounded-md bg-[#1A2333]" />
                </div>                                   
              </div>
              <div className="flex items-center gap-6 pl-14 sm:pl-0">
                <div className="flex flex-col items-end gap-1">
                  <Skeleton className="w-12 h-4 rounded-md bg-[#1A2333]" />
                  <Skeleton className="w-16 h-3 rounded-md bg-[#1A2333]" />
                </div>
                <Skeleton className="w-16 h-6 rounded-full bg-[#1A2333]" />
              </div>
            </div>                                                 
          ))
        ) : (
          recentPlayers.map((player, index) => (
            <div                         
              key={player.id}
              className={cn(
                "flex flex-col gap-4 p-4 rounded-xl transition-all duration-200 hover:bg-[#1A2333]/50 group",
                "sm:flex-row sm:items-center sm:justify-between sm:gap-4",
                index !== recentPlayers.length - 1 && "border-b border-[#2A3040]/50"
              )}
            >
              {/* Player Info (Avatar + Name) */}
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#2A3040] bg-[#1A2333] text-[13px] font-bold text-[#00D4FF] orbitron overflow-hidden">
                  {player.image ? (
                    <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
                  ) : (
                    getInitials(player.name)
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[14px] sm:text-[15px] font-bold text-white orbitron tracking-wider truncate">
                    {player.name}
                  </span>
                  <span className="text-[11px] sm:text-[12px] text-zinc-500 outfit">
                    {player.category.name}
                  </span>
                </div>
              </div>

              {/* Stats & Status */}
              <div className="flex items-center justify-between sm:justify-end gap-6 pl-14 sm:pl-0">
                <div className="flex flex-col items-start sm:items-end">
                  <span className="text-[15px] sm:text-[16px] font-bold text-[#00D4FF] orbitron tracking-wide">
                    {player.finalScore.toFixed(1)}
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase text-zinc-500 font-medium outfit tracking-wider">
                    HGW Score
                  </span>
                </div>

                <div
                  className={cn(
                    "px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-[500] uppercase tracking-widest outfit shrink-0",
                    getStatusStyles(player.status)
                  )}
                >
                  {player.status.toLowerCase()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default RecentPlayers