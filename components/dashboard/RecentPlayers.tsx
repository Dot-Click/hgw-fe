import React from "react"
import { FiArrowUpRight } from "react-icons/fi"
import { cn } from "@heroui/react"

interface Player {
  name: string
  category: string
  initials: string
  score: string
  status: "published" | "draft" | string
  color: string
}

const players: Player[] = [
  {
    name: "LeBron James",
    category: "Basketball",
    initials: "LJ",
    score: "94.2",
    status: "published",
    color: "cyan",
  },
  {
    name: "Cristiano Ronaldo",
    category: "Football",
    initials: "CR",
    score: "96.8",
    status: "published",
    color: "blue",
  },
  {
    name: "Serena Williams",
    category: "Tennis",
    initials: "SW",
    score: "92.1",
    status: "draft",
    color: "purple",
  },
  {
    name: "Tom Brady",
    category: "Football",
    initials: "TB",
    score: "91.5",
    status: "published",
    color: "orange",
  },
]

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
  return (
    <div className="flex flex-col h-full rounded-2xl border border-[#2A3040] bg-[#111A2C]/50 transition-all duration-300 hover:border-[#00D4FF]/20">
      {/* Header */}
      <div className="p-6 border-b border-[#2A3040] flex items-center justify-between">
        <h2 className="text-[18px] font-[700] text-white orbitron tracking-wider">
          Recent Players
        </h2>
        <button className="flex items-center gap-1.5 text-[13px] font-bold text-[#00D4FF] hover:text-white transition-colors outfit uppercase tracking-wider">
          View All
          <FiArrowUpRight className="h-4 w-4" />
        </button>
      </div>

      {/* List */}
      <div className="p-2">
        {players.map((player, index) => (
          <div 
            key={index} 
            className={cn(
              "flex flex-col gap-4 p-4 rounded-xl transition-all duration-200 hover:bg-[#1A2333]/50 group",
              "sm:flex-row sm:items-center sm:justify-between sm:gap-4",
              index !== players.length - 1 && "border-b border-[#2A3040]/50"
            )}
          >
            {/* Player Info (Avatar + Name) */}
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#2A3040] bg-[#1A2333] text-[13px] font-bold text-[#00D4FF] orbitron">
                {player.initials}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[14px] sm:text-[15px] font-bold text-white orbitron tracking-wider truncate">
                  {player.name}
                </span>
                <span className="text-[11px] sm:text-[12px] text-zinc-500 outfit">
                  {player.category}
                </span>
              </div>
            </div>

            {/* Stats & Status */}
            <div className="flex items-center justify-between sm:justify-end gap-6 pl-14 sm:pl-0">
              <div className="flex flex-col items-start sm:items-end">
                <span className="text-[15px] sm:text-[16px] font-bold text-[#00D4FF] orbitron tracking-wide">
                  {player.score}
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase text-zinc-500 font-medium outfit tracking-wider">
                  HGW Score
                </span>
              </div>
              
              <div className={cn(
                "px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-[500] uppercase tracking-widest outfit shrink-0",
                getStatusStyles(player.status)
              )}>
                {player.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentPlayers