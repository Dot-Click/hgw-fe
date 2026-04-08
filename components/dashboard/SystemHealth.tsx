import React from "react"
import { FiActivity, FiWifi, FiDatabase, FiZap } from "react-icons/fi"
import { cn } from "@heroui/react"

const healthData = [
  { name: "API Server", value: "45ms", icon: FiWifi },
  { name: "Database", value: "12ms", icon: FiDatabase },
  { name: "CDN", value: "8ms", icon: FiZap },
]

const SystemHealth = () => {
  return (
    <div className="flex flex-col h-full rounded-2xl border border-[#2A3040] bg-[#111A2C]/50 transition-all duration-300 hover:border-[#00D4FF]/20">
      {/* Header */}
      <div className="p-6 border-b border-[#2A3040] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FiActivity className="text-[#00D4FF] h-5 w-5 animate-pulse" />
          <h2 className="text-[18px] font-[700] text-white orbitron tracking-wider">
            System Health
          </h2>
        </div>
      </div>

      {/* Health List */}
      <div className="p-6 flex flex-col gap-4">
        {healthData.map((item, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-4 rounded-xl border border-[#2A3040] bg-[#1A2333]/30 transition-all hover:border-[#00D4FF]/30 group"
          >
            <div className="flex items-center gap-3">
              <item.icon className="text-zinc-500 group-hover:text-[#00D4FF] transition-colors h-5 w-5" />
              <span className="text-[14px] font-[700] tracking-widest text-white hover:text-white transition-colors orbitron">
                {item.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-[500] text-zinc-500 outfit">{item.value}</span>
              <div className="h-2 w-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" />
            </div>
          </div>
        ))}
      </div>

      {/* Footer / Active Users */}
      <div className="mt-auto p-6 border-t border-[#2A3040] flex items-center justify-between">
        <span className="text-[13px] font-medium text-zinc-500 outfit">Active Users</span>
        <div className="flex items-center gap-2">
          <span className="text-[16px] font-black text-white orbitron">247</span>
          <span className="text-[12px] font-[500] text-[#00D4FF] outfit uppercase tracking-wider">online</span>
        </div>
      </div>
    </div>
  )
}

export default SystemHealth