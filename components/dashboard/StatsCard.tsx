import React from "react"
import { FiArrowUpRight } from "react-icons/fi"
import { IconType } from "react-icons"

export type StatsColor = "cyan" | "green" | "orange" | "purple" | "red"

interface StatsCardProps {
  label: string
  value: string
  change: string
  icon: IconType
  color: StatsColor
}

const getColorClasses = (color: StatsColor) => {
  switch (color) {
    case "cyan":
      return { text: "text-[#00D4FF]", bg: "bg-[#00D4FF]" }
    case "green":
      return { text: "text-[#10B981]", bg: "bg-[#10B981]" }
    case "orange":
      return { text: "text-[#F59E0B]", bg: "bg-[#F59E0B]" }
    case "purple":
      return { text: "text-[#8B5CF6]", bg: "bg-[#8B5CF6]" }
    case "red":
      return { text: "text-[#EF4444]", bg: "bg-[#EF4444]" }
    default:
      return { text: "text-[#00D4FF]", bg: "bg-[#00D4FF]" }
  }
}

const StatsCard = ({ label, value, change, icon: Icon, color }: StatsCardProps) => {
  const themes = getColorClasses(color)

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#2A3040] bg-[#111A2C]/50 p-6 transition-all duration-300 hover:border-[#00D4FF]/30 hover:bg-[#111A2C]/80">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[15px] font-medium text-zinc-500 outfit tracking-wide">
            {label}
          </p>
          <h3 className="mt-2 text-3xl font-bold text-white orbitron">
            {value}
          </h3>
          <div className="mt-3 flex items-center gap-1.5">
            <FiArrowUpRight className={`h-4 w-4 ${themes.text}`} />
            <span className={`text-[13px] font-medium ${themes.text} outfit`}>
              {change}
            </span>
          </div>
        </div>
        
        <div className="relative flex h-14 w-14 items-center justify-center">
          {/* Glowing Background Circle */}
          <div className={`absolute inset-0 rounded-full ${themes.bg} blur-md opacity-20 group-hover:opacity-40 transition-opacity`} />
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#1A2333]/80 border border-[#2A3040] shadow-inner">
            <Icon className={`h-5 w-5 ${themes.text}`} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatsCard