"use client"

import React from "react"
import { FiSettings } from "react-icons/fi"
import { Switch } from "@heroui/react"

const QuickSettings = () => {
  return (
    <div className="bg-[#0E1015]/50 border border-[#24262E] rounded-[24px] p-5 flex flex-col gap-6 backdrop-blur-sm">
      <div className="flex items-center gap-3 border-b border-[#24262E] pb-3">
        <FiSettings className="text-[#00CCFF]" size={18} />
        <h2 className="text-white font-[700] orbitron tracking-wide text-sm">Quick Settings</h2>
      </div>

      <div className="space-y-4">
        <SettingToggle label="Auto-suggestions" defaultSelected />
        <SettingToggle label="Include player stats" defaultSelected />
        <SettingToggle label="Detailed analysis" />
      </div>

    </div>
  )
}

const SettingToggle = ({ label, defaultSelected }: { label: string, defaultSelected?: boolean }) => (
  <div className="flex items-center justify-between">
    <span className="text-[#7B899D] text-sm outfit font-medium tracking-wide">{label}</span>
    <Switch 
      defaultSelected={defaultSelected}
      className="group flex items-center cursor-pointer"
    >
      <Switch.Control className="w-10 h-5 rounded-full bg-[#05080F] border border-[#24262E] flex items-center px-[2px] group-data-[selected=true]:bg-[#00CCFF]/20 group-data-[selected=true]:border-[#00CCFF]/40 transition-all">
        <Switch.Thumb className="w-4 h-4 rounded-full bg-zinc-600 group-data-[selected=true]:bg-[#00CCFF] group-data-[selected=true]:translate-x-[8px] transition-all shadow-[0_0_10px_rgba(0,204,255,0.4)]" />
      </Switch.Control>
    </Switch>
  </div>
)


export default QuickSettings
