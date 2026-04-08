
import React from 'react'
import { Card, cn } from '@heroui/react'
import { LuTrophy } from 'react-icons/lu'
import { FiTrendingUp } from 'react-icons/fi'

export const AdminLeaderboardDetail = () => {
  const statsData = [
    {
      label: "Current #1",
      value: "Michael Jordan",
      icon: <LuTrophy size={26} />,
      accent: "#FACC15",
      bg: "bg-[#1A1F26]",
      hover: "hover:border-[#FACC15]/30"
    },
    {
      label: "Biggest Riser",
      value: "Wayne Gretzky",
      subValue: "(+2)",
      icon: <FiTrendingUp size={26} />,
      accent: "#10B981",
      bg: "bg-[#1A2624]",
      hover: "hover:border-[#10B981]/30"
    },
    {
      label: "Average Score",
      value: "Top 10 Avg",
      score: "95.8",
      accent: "#00D4FF",
      bg: "bg-[#112431]",
      hover: "hover:border-[#00D4FF]/30"
    }
  ];

  return (
    <div className="">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {statsData.map((stat, index) => (
          <Card 
            key={index} 
            className={cn(
              "bg-[#111A2C]/50 border border-[#1E293B] p-6 rounded-2xl flex flex-row items-center gap-5 shadow-none group transition-all duration-300",
              stat.hover
            )}
          >
            <div className={cn(
              "w-14 h-14 rounded-full border flex items-center justify-center transition-transform group-hover:scale-110",
              stat.bg,
              stat.score ? "border-[#00D4FF]/30" : `border-[${stat.accent}]/20`
            )} style={{ color: stat.accent }}>
              {stat.score ? (
                <span className="text-[16px] font-black orbitron">{stat.score}</span>
              ) : (
                stat.icon
              )}
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[12px] font-medium text-zinc-500 outfit tracking-wider uppercase">{stat.label}</span>
              <span className="text-[18px] font-bold text-white orbitron flex items-center gap-2 tracking-widest">
                {stat.value}
                {stat.subValue && <span className="text-[#10B981] text-[14px]">{stat.subValue}</span>}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
