import React from 'react'
import { HiOutlineSignal } from "react-icons/hi2";
import { FiHeadphones, FiTrendingUp } from "react-icons/fi";
import { IoStarOutline } from "react-icons/io5";

const PodcastDetails = () => {
    const stats = [
        {
            icon: <HiOutlineSignal className="text-[#00CCFF] text-xl" />,
            value: "48",
            label: "Total Episodes",
            borderColor: "border-[#24262E]"
        },
        {
            icon: <FiHeadphones className="text-[#FFBF00] text-lg" />,
            value: "1.2M",
            label: "Total Listeners",
            borderColor: "border-[#24262E]"
        },
        {
            icon: <IoStarOutline className="text-[#FFBF00] text-lg" />,
            value: "4.9",
            label: "Average Rating",
            borderColor: "border-[#24262E]"
        },
        {
            icon: <FiTrendingUp className="text-[#00CCFF] text-lg" />,
            value: "2",
            label: "Weekly Releases",
            borderColor: "border-[#24262E]"
        }
    ];

    return (
        <div className="w-full max-w-[1400px] px-6 md:px-12 lg:px-20 mt-12 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, index) => (
                    <div 
                        key={index}
                        className={`flex flex-col items-center gap-2 justify-center p-4 rounded-[22px] bg-[#111217] border ${stat.borderColor} backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all hover:bg-[#111216] group`}
                    >
                        <div className="">
                            {stat.icon}
                        </div>
                        <h3 className="text-[12px] md:text-[18px] orbitron font-[700] text-[#E7EBEF]">
                            {stat.value}
                        </h3>
                        <p className="text-[#7B899D] text-[10px] md:text-[13px] outfit font-[400] tracking-widest uppercase">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PodcastDetails