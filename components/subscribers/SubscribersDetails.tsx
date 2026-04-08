import React from 'react'
import { FiMail, FiTrendingUp, FiActivity } from 'react-icons/fi'
import { cn } from '@heroui/react'

const SubscribersDetails = () => {
    const stats = [
        {
            label: "Total Subscribers",
            value: "15,432",
            icon: <FiMail className="text-[#00D4FF]" size={20} />,
            bg: "bg-[#00D4FF]/10",
        },
        {
            label: "This Month",
            value: "+842",
            badge: "+5.4%",
            badgeColor: "text-[#10B981]",
            bg: "bg-[#10B981]/10",
        },
        {
            label: "Open Rate",
            value: "32.8%",
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