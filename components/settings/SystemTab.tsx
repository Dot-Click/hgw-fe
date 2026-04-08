"use client"

import React from 'react'
import { Button } from '@heroui/react'
import { FiDatabase, FiServer, FiHardDrive, FiActivity, FiTrash2, FiClock } from 'react-icons/fi'

const SystemTab = () => {
    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* System Information Section */}
            <div className="bg-[#0D1424] border border-[#1E293B] rounded-[20px] p-6 md:p-10">
                <div className="flex flex-col gap-1 mb-10">
                    <h2 className="text-xl md:text-2xl font-bold text-white orbitron tracking-wider">System Information</h2>
                    <p className="text-sm text-zinc-500 outfit">View system status and configuration.</p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-10">
                    <InfoItem label="Version" value="HGW Vault v2.4.1" icon={<FiServer className="text-[#00D4FF]" />} />
                    <InfoItem label="Database" value="PostgreSQL 15.2" icon={<FiDatabase className="text-[#00D4FF]" />} />
                    <InfoItem label="Last Backup" value="2026-04-03 02:00 UTC" icon={<FiClock className="text-[#00D4FF]" />} />
                    <InfoItem label="Storage Used" value="2.4 GB / 10 GB" icon={<FiHardDrive className="text-[#00D4FF]" />} />
                </div>

                {/* Status Card */}
                <div className="bg-[#0B1221] border border-[#1E293B] rounded-xl p-5 flex items-center justify-between group hover:border-[#00D4FF]/30 transition-all">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                            <div className="absolute inset-0 w-3 h-3 rounded-full bg-emerald-500 blur-[4px]"></div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[18px] font-[600] tracking-wide text-white outfit">System Status</span>
                            <span className="text-[15px] text-zinc-500 outfit">All services operational</span>
                        </div>
                    </div>
                    <button className="text-[18px] font-[700] text-[#00D4FF] hover:underline orbitron tracking-wider bg-transparent border-none outline-none cursor-pointer">
                        View Logs
                    </button>
                </div>
            </div>

            {/* Danger Zone Section */}
            <div className="bg-[#0D1424] border border-red-500/20 rounded-[20px] p-6 md:p-10 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/40 to-transparent" />
                
                <div className="flex flex-col gap-1 mb-10">
                    <h2 className="text-xl md:text-2xl font-bold text-red-500 orbitron tracking-wider">Danger Zone</h2>
                    <p className="text-sm text-zinc-500 outfit">Irreversible actions that affect your entire system.</p>
                </div>

                {/* Danger Actions Row */}
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl border border-[#1E293B] bg-[#0B1221]/50">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-[18px] font-[600] tracking-wide text-white outfit">Clear All Cache</h3>
                            <p className="text-[15px] text-zinc-500 outfit max-w-md">This will clear all cached data and may temporarily slow down the system.</p>
                        </div>
                        <Button 
                            variant="outline" 
                            className="bg-transparent border-red-500/40 text-red-500 font-[700] outfit uppercase tracking-wider text-[14px] h-10 px-6 rounded-lg hover:bg-red-500/10 hover:border-red-500 transition-all"
                        >
                            <FiTrash2 className="mr-2" />
                            Clear Cache
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

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
