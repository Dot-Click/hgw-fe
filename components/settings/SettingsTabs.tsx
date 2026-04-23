"use client"

import React from 'react'
import { Tabs, cn } from '@heroui/react'
import { FiUser, FiSettings } from 'react-icons/fi'
import { GoBell, GoLock } from 'react-icons/go'
import ProfileTab from './ProfileTab'
import SecurityTab from './SecurityTab'
import NotificationsTab from './NotificationsTab'
import SystemTab from './SystemTab'

const tabStyle = cn(
    "flex items-center justify-center gap-1.5 md:gap-2 px-2 md:px-6 py-2.5 md:py-3 rounded-[10px] md:rounded-[12px] bg-transparent cursor-pointer transition-all duration-300 outline-none relative overflow-hidden whitespace-nowrap",
    "text-zinc-500 font-bold outfit text-[10px] sm:text-[12px] md:text-[14px] uppercase tracking-[0.05em] md:tracking-[0.1em] hover:text-zinc-300",
    "data-[selected=true]:text-white data-[selected=true]:bg-[#111A2C] data-[selected=true]:shadow-[inset_0_0_10px_rgba(0,212,255,0.1)] data-[selected=true]:border data-[selected=true]:border-[#00D4FF]/30"
)

const SettingsTabs = () => {
    return (
        <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
            <Tabs>
                <Tabs.List className="grid grid-cols-3 gap-1 md:gap-2 bg-[#080C14] border border-[#1E293B] p-1.5 rounded-[16px] w-full md:w-fit mb-4">
                    <Tabs.Tab id="profile" className={tabStyle}>
                        <FiUser size={16} className="shrink-0" />
                        <span>Profile</span>
                    </Tabs.Tab>

                    <Tabs.Tab id="security" className={tabStyle}>
                        <GoLock size={16} className="shrink-0" />
                        <span>Security</span>
                    </Tabs.Tab>

                    <Tabs.Tab id="notifications" className={tabStyle}>
                        <GoBell size={18} className="shrink-0" />
                        <span>Alerts</span>
                    </Tabs.Tab>

                    {/* <Tabs.Tab id="system" className={tabStyle}>
                        <FiSettings size={16} className="shrink-0" />
                        <span>System</span>
                    </Tabs.Tab> */}
                </Tabs.List>

                <div className="mt-2">
                    <Tabs.Panel id="profile" className="outline-none">
                        <ProfileTab />
                    </Tabs.Panel>
                    
                    <Tabs.Panel id="security" className="outline-none">
                        <SecurityTab />
                    </Tabs.Panel>
                    
                    <Tabs.Panel id="notifications" className="outline-none">
                        <NotificationsTab />
                    </Tabs.Panel>
                    
                    {/* <Tabs.Panel id="system" className="outline-none">
                        <SystemTab />
                    </Tabs.Panel> */}
                </div>
            </Tabs>
        </div>
    )
}

export default SettingsTabs
