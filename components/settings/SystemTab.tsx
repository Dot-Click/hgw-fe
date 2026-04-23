"use client"

import React from 'react'
import { Button } from '@heroui/react'
import { FiDatabase, FiServer, FiHardDrive, FiActivity, FiTrash2, FiClock } from 'react-icons/fi'

const SystemTab = () => {
    return (
        <div className="bg-[#0D1424] border border-[#1E293B] rounded-[20px] p-6 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-16 h-16 rounded-full bg-[#111A2C] border border-[#00D4FF]/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,212,255,0.1)]">
                <FiSettings size={32} className="text-[#00D4FF] animate-spin-slow" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white orbitron tracking-wider mb-2">System Module</h2>
            <p className="text-sm text-zinc-500 outfit text-center max-w-md">
                This module is currently offline for maintenance and future enhancements. Check back later for system-wide configuration options.
            </p>
            
            {/* 
            ORIGINAL CONTENT COMMENTED OUT FOR FUTURE USE:
            ... 
            */}
        </div>
    )
}

/*
const OriginalSystemTab = () => {
    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            ...
        </div>
    )
}
*/

const InfoItem = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
    <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#0B1221] border border-[#1E293B] flex items-center justify-center shrink-0">
            {icon}
        </div>
        <div className="flex flex-col gap-1">
            <span className="text-[12px] font-[500] text-zinc-500 orbitron uppercase tracking-widest">{label}</span>
            <span className="text-[15px] font-[400] tracking-wide text-white outfit">{value}</span>
        </div>
    </div>
)

export default SystemTab
