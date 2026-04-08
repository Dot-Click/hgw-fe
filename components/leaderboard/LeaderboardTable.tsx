import React from 'react'
import { Card, cn } from '@heroui/react'
import { FiTrendingUp, FiTrendingDown, FiMinus } from 'react-icons/fi'

const legendsData = [
  { rank: 1, name: "Michael Jordan", category: "Basketball", score: 98.5, trend: "steady" },
  { rank: 2, name: "Muhammad Ali", category: "Boxing", score: 97.8, trend: "up", change: 1 },
  { rank: 3, name: "Lionel Messi", category: "Football", score: 97.2, trend: "down", change: 1 },
  { rank: 4, name: "Cristiano Ronaldo", category: "Football", score: 96.8, trend: "steady" },
  { rank: 5, name: "Wayne Gretzky", category: "Hockey", score: 96.2, trend: "up", change: 2 },
  { rank: 6, name: "Roger Federer", category: "Tennis", score: 95.9, trend: "down", change: 1 },
  { rank: 7, name: "Usain Bolt", category: "Athletics", score: 95.4, trend: "steady" },
  { rank: 8, name: "Michael Phelps", category: "Swimming", score: 95.3, trend: "up", change: 1 },
  { rank: 9, name: "Serena Williams", category: "Tennis", score: 94.8, trend: "down", change: 1 },
  { rank: 10, name: "LeBron James", category: "Basketball", score: 94.2, trend: "steady" },
];

const LeaderboardTable = () => {
  return (
    <Card className="bg-[#111A2C]/50 border border-[#1E293B] rounded-2xl p-6 sm:p-8 shadow-none animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h3 className="text-sm font-bold text-white orbitron uppercase tracking-[0.1em] mb-8 px-2">Top 10 Legends</h3>

      <div className="flex flex-col">
        {legendsData.map((player, index) => (
          <div 
            key={player.rank}
            className={cn(
              "flex items-center justify-between py-5 px-2 group transition-all duration-300",
              index !== legendsData.length - 1 ? "border-b border-[#1E293B]/60" : ""
            )}
          >
            {/* Rank & Player Info */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div 
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-black orbitron transition-transform group-hover:scale-110 shadow-sm",
                  player.rank === 1 ? "bg-[#FACC15] text-[#0B0F19]" :
                  player.rank === 2 ? "bg-[#94A3B8] text-[#0B0F19]" :
                  player.rank === 3 ? "bg-[#D97706] text-[#0B0F19]" :
                  "bg-[#1A2333] text-zinc-500 border border-zinc-800"
                )}
              >
                {player.rank}
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] sm:text-[17px] font-bold text-white orbitron tracking-widest leading-none mb-1 group-hover:text-[#00D4FF] transition-colors">
                  {player.name}
                </span>
                <span className="text-[11px] sm:text-[13px] text-zinc-500 outfit font-medium">
                  {player.category}
                </span>
              </div>
            </div>

            {/* Trend & Score */}
            <div className="flex items-center gap-6 sm:gap-12">
              <div className="hidden sm:flex items-center gap-1.5 min-w-[50px] justify-center">
                {player.trend === "up" && (
                  <div className="flex items-center gap-1 text-[#10B981]">
                    <FiTrendingUp size={16} />
                    <span className="text-[12px] font-bold orbitron">+{player.change}</span>
                  </div>
                )}
                {player.trend === "down" && (
                  <div className="flex items-center gap-1 text-[#EF4444]">
                    <FiTrendingDown size={16} />
                    <span className="text-[12px] font-bold orbitron">-{player.change}</span>
                  </div>
                )}
                {player.trend === "steady" && (
                   <FiMinus className="text-zinc-600" size={16} />
                )}
              </div>

              <div className="bg-[#0D1424] border border-[#00D4FF]/30 rounded-full py-2 px-4 min-w-[65px] flex items-center justify-center shadow-[0_0_15px_rgba(0,212,255,0.05)] group-hover:border-[#00D4FF]/60 transition-all duration-300">
                <span className="text-[14px] sm:text-[16px] font-black text-[#00D4FF] orbitron">
                  {player.score.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default LeaderboardTable