"use client"

import React from 'react'
import { FiMail, FiTrendingUp, FiActivity } from 'react-icons/fi'
import { cn } from '@heroui/react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

const SubscribersDetails = () => {
    const { subscribers } = useSelector((state: RootState) => state.subscribers)
    
    // Dynamic Calculations
    const now = new Date()
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    
    // 1. Calculate This Month's Subscribers
    const thisMonthSubscribers = subscribers.filter(s => new Date(s.createdAt) >= thisMonthStart)
    const thisMonthCount = thisMonthSubscribers.length
    
    // 2. Calculate Growth Percentage (relative to total)
    const growthPercentage = subscribers.length > 0 
        ? ((thisMonthCount / subscribers.length) * 100).toFixed(1) 
        : "0"

    const stats = [
        {
            label: "Total Subscribers",
            value: subscribers.length.toLocaleString(),
            icon: <FiMail className="text-[#00D4FF]" size={20} />,
            bg: "bg-[#00D4FF]/10",
        },
        {
            label: "This Month",
            value: `+${thisMonthCount}`,
            badge: `+${growthPercentage}%`,
            badgeColor: "text-[#10B981]",
            bg: "bg-[#10B981]/10",
        },
        {
            label: "Open Rate",
            value: "100%", // Defaulting to 100% since they just joined
            badge: "Avg",
            badgeColor: "text-[#A855F7]",
            bg: "bg-[#A855F7]/10",
        }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {stats.map((stat, index) => (
                <div 
                    key={index}
                    className="bg-[#0B1121] border border-[#1E293B] rounded-[20px] p-6 flex items-center justify-between group hover:border-zinc-700 transition-all duration-300"
                >
                    <div className="flex flex-col gap-1">
                        <span className="text-[12px] font-medium text-zinc-500 outfit uppercase tracking-wider">
                            {stat.label}
                        </span>
                        <h2 className="text-3xl font-[700] text-white orbitron  tracking-wider">
                            {stat.value}
                        </h2>
                    </div>

                    <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110",
                        stat.bg
                    )}>
                        {stat.icon ? (
                            stat.icon
                        ) : (
                            <span className={cn("text-xs font-bold uppercase outfit", stat.badgeColor)}>
                                {stat.badge}
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SubscribersDetails