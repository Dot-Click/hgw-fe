import React from 'react';
import Image from 'next/image';
import { BsTrophy } from 'react-icons/bs';
import { FaCrown } from 'react-icons/fa';
import { FiAward } from 'react-icons/fi';
import { BiTransfer } from 'react-icons/bi';
import { Button } from "@heroui/react";
import { LuCrown, LuMedal } from 'react-icons/lu';

const getCategoryStyles = (category: string) => {
    switch (category?.toUpperCase()) {
        case "FOOTBALL":
            return "bg-[#00CCFF26] text-[#00CCFF] border-[#00CCFF33]";
        case "MUSIC":
            return "bg-[#A855F726] text-[#C084FC] border-[#A855F733]";
        case "RUGBY":
            return "bg-[#FFBF0026] text-[#FFBF00] border-[#FFBF0033]";
        default:
            return "bg-[#00CCFF26] text-[#00CCFF] border-[#00CCFF33]";
    }
};

const getThemeByRank = (rank: number) => {
    switch (rank) {
        case 1:
            return {
                wrapper: "",
                cardSize: "w-[280px] md:w-[230px] lg:w-[320px] h-[420px] md:h-[360px] lg:h-[450px]",
                borderColor: "border-[2px] border-[#FFBF004D]",
                shadow: "shadow-[0_0_35px_rgba(255,184,0,0.35)]",
                badgeBg: "bg-[#FFBF00]",
                badgeText: "text-[#0B0B0F]",
                barColor: "bg-[#FFBF00]",
                topIcon: <LuCrown className="text-[#FFBF00] text-[20px]" />,
            };
        case 2:
            return {
                wrapper: "lg:mt-[40px]",
                cardSize: "w-[260px] md:w-[210px] lg:w-[280px] h-[380px] md:h-[330px] lg:h-[400px]",
                borderColor: "border-[2px] border-[#ABB3BA66]",
                shadow: "shadow-none",
                badgeBg: "bg-[#ABB3BA]",
                badgeText: "text-[#0B0B0F]",
                barColor: "bg-[#00CCFF]",
                topIcon: <LuMedal className="text-[#ABB3BA] text-[20px]" />,
            };
        case 3:
            return {
                wrapper: "lg:mt-[40px]",
                cardSize: "w-[260px] md:w-[210px] lg:w-[280px] h-[380px] md:h-[330px] lg:h-[400px]",
                borderColor: "border-[2px] border-[#C3652266]",
                shadow: "shadow-none",
                badgeBg: "bg-[#C36522]",
                badgeText: "text-[#0B0B0F]",
                barColor: "bg-[#00CCFF]",
                topIcon: <LuMedal className="text-[#C36522] text-[20px]" />,
            };
        default:
            return {
                wrapper: "lg:mt-[40px]",
                cardSize: "w-[260px] md:w-[210px] lg:w-[280px] h-[380px] md:h-[330px] lg:h-[400px]",
                borderColor: "border-[2px] border-[#D1D5DB]/30",
                shadow: "shadow-none",
                badgeBg: "bg-[#D1D5DB]",
                badgeText: "text-[#0B0B0F]",
                barColor: "bg-[#00CCFF]",
                topIcon: <FiAward className="text-[#D1D5DB] text-[24px]" />,
            };
    }
};

const legends = [
    {
        rank: 2,
        rankLabel: "2ND",
        name: "Pelé",
        position: "Forward",
        category: "Football",
        trophies: 25,
        score: "97.8",
        image: "/assets/img5.png",
    },
    {
        rank: 1,
        rankLabel: "1ST",
        name: "Lionel Messi",
        position: "Forward",
        category: "Football",
        trophies: 44,
        score: "98.5",
        image: "/assets/img3.png",
    },
    {
        rank: 3,
        rankLabel: "3RD",
        name: "Cristiano Ronaldo",
        position: "Forward",
        category: "Football",
        trophies: 35,
        score: "97.1",
        image: "/assets/img2.png",
    }
];

const TopLegends = () => {
    return (
        <section className="w-full flex flex-col items-center justify-center pb-24 relative z-10">
            <div className="max-w-[1400px] w-full px-6 flex flex-col items-center gap-16">
                
                {/* Section Title */}
                <div className="flex items-center justify-center gap-4 w-full text-center">
                    <div className="h-[1px] bg-gradient-to-r from-transparent to-[#FFB800] opacity-60 w-16 md:w-64"></div>
                    <span className="text-[#FFB800] font-[700] text-[13px] md:text-[15px] tracking-[0.2em] uppercase orbitron">
                        Top Legends
                    </span>
                    <div className="h-[1px] bg-gradient-to-l from-transparent to-[#FFB800] opacity-60 w-16 md:w-64"></div>
                </div>

                {/* Cards Container */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-3 lg:gap-10">
                    {legends.map((legend) => {
                        const theme = getThemeByRank(legend.rank);
                        const orderClass = legend.rank === 1 ? 'order-1 md:order-2' : legend.rank === 2 ? 'order-2 md:order-1' : 'order-3 md:order-3';
                        
                        return (
                        <div key={legend.rank} className={`flex flex-col items-center ${theme.wrapper || ''} ${orderClass}`}>
                            
                            {/* Top Icon */}
                            <div className="mb-4">
                                {theme.topIcon}
                            </div>
                            
                            {/* Card Content */}
                            <div className={`relative flex flex-col justify-between p-4 md:p-5 rounded-[20px] bg-[#0B0C10] ${theme.borderColor} ${theme.shadow} ${theme.cardSize} transition-all duration-300`}>
                                <div className="absolute inset-x-0 top-0 h-[65%] object-top z-0 rounded-t-[18px] overflow-hidden">
                                    <Image 
                                        src={legend.image} 
                                        alt={legend.name} 
                                        fill 
                                        quality={90}
                                        className="object-cover object-top" 
                                        sizes="(max-width: 768px) 100vw, 600px"
                                    />
                                </div>

                                {/* Top Badges */}
                                <div className="relative z-20 flex justify-between items-center w-full">
                                    <span className={`${theme.badgeBg} ${theme.badgeText} text-[10px] md:text-[11px] font-[700] px-3  orbitron py-1 rounded-full uppercase tracking-wider`}>
                                        {legend.rankLabel}
                                    </span>
                                    <span className={`${theme.badgeBg} ${theme.badgeText} text-[10px] md:text-[11px] font-[700] px-3  orbitron py-1 rounded-full`}>
                                        {legend.score}
                                    </span>
                                </div>

                                {/* Bottom Content */}
                                <div className="relative z-20 flex flex-col gap-1 w-full mt-auto">
                                    <h3 className="text-white text-[20px] md:text-[16px] font-[700] orbitron leading-tight">
                                        {legend.name}
                                    </h3>
                                    <p className="text-[#7B899D] text-[13px] font-[500] md:text-[12px] outfit mb-2">
                                        {legend.position}
                                    </p>
                                    
                                    <div className="flex items-center justify-between mb-3 w-full">
                                        <span className={`px-3 py-1 rounded-full text-[10px] md:text-[11px] font-[500] outfit tracking-wider border ${getCategoryStyles(legend.category)}`}>
                                            {legend.category}
                                        </span>
                                        <div className="flex items-center gap-1 text-[#7B899D]">
                                            <BsTrophy className="text-[12px]" />
                                            <span className="text-[12px]  tracking-wide outfit md:text-[11px] font-[500]">{legend.trophies}</span>
                                        </div>
                                    </div>
                                    
                                    {/* Progress Bar line */}
                                    <div className={`w-full h-[7px] rounded-full ${theme.barColor}`}></div>
                                </div>
                            </div>

                            {/* Compare Button */}
                            <Button
                                className="mt-4 bg-[#1F2128] hover:bg-[#24262E] text-[#7B899D] hover:text-white border border-[#24262E] px-3 py-1 rounded-[12px] text-[12px] md:text-[13px] font-[400] transition-colors h-auto min-h-0 outfit"
                            >
                                <BiTransfer className="text-[16px]" /> Compare
                            </Button>
                        </div>
                    )})}
                </div>

            </div>
        </section>
    );
};

export default TopLegends;