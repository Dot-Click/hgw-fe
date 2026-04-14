"use client"

import React from "react"
import { FiActivity } from "react-icons/fi"
import { Switch } from "@heroui/react"

const AiStatus = () => {
  return (
    <div className="bg-[#0E1015]/50 border border-[#24262E] rounded-[24px] p-5 flex flex-col gap-6 backdrop-blur-sm">
      <div className="flex items-center gap-3 border-b border-[#24262E] pb-3">
        <FiActivity className="text-[#00CCFF]" size={18} />
        <h2 className="text-white font-[700] orbitron tracking-wide text-sm">AI Status</h2>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-white font-bold text-[13px] outfit tracking-wide">Enable Katy AI</span>
          <span className="text-[#7B899D] text-[11px] outfit">Assistant on/off</span>
        </div>

        <Switch 
           defaultSelected
           className="group flex items-center cursor-pointer"
        >
          <Switch.Control className="w-10 h-5 rounded-full bg-[#05080F] border border-[#24262E] flex items-center px-[2px] group-data-[selected=true]:bg-[#00CCFF]/20 group-data-[selected=true]:border-[#00CCFF]/40 transition-all">
            <Switch.Thumb className="w-4 h-4 rounded-full bg-zinc-600 group-data-[selected=true]:bg-[#00CCFF] group-data-[selected=true]:translate-x-[8px] transition-all shadow-[0_0_10px_rgba(0,204,255,0.4)]" />
          </Switch.Control>
        </Switch>

      </div>

      <div className="bg-[#111217] border border-[#24262E] rounded-2xl p-5 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-[#7B899D] outfit text-sm">Model</span>
          <span className="text-white font-[400] outfit text-sm">GPT-4 Turbo</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#7B899D] outfit text-sm">Queries Today</span>
          <span className="text-white font-[400] outfit text-sm">247</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#7B899D] outfit text-sm">Avg Response</span>
          <span className="text-white font-[400] outfit text-sm">1.2s</span>
        </div>
      </div>
    </div>
  )
}
        
export default AiStatus
         