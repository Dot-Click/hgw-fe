"use client";

import React from "react";
import Image from "next/image";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { BsTrophy } from "react-icons/bs";
import { IoMdFootball } from "react-icons/io";
import { Card as HeroCard, ProgressBar } from "@heroui/react";
import { LuCrown, LuMedal } from "react-icons/lu";

import Link from "next/link";

interface PlayerProps {
    player: {
        id: number;
        rank: string;
        name: string;
        role: string;
        stats: {
            apps: string;
            years: string;
            country: string;
        };
        category: string;
        trophies: number;
        score: number;
        image: string;
    };
}

const getRankStyles = (rank: string) => {
    switch (rank) {
        case "#1":
            return {
                rankColor: "bg-[linear-gradient(135deg,_#FFC61A_0%,_#C2750A_100%)] text-[#0B0B0F]",
                borderColor: "border-[#FFB80088]",
                glow: "shadow-[0_0_30px_rgba(255,184,0,0.3)]",
                crown: true,
            };
        case "#2":
            return {
                rankColor: "bg-gradient-to-br from-[#C1C7CD] to-[#7B899D] text-[#0B0B0F]",
                borderColor: "border-[#00CCFF66]",
                glow: "shadow-[0_0_30px_rgba(0,204,255,0.2)]",
                crown: false,
            };
        case "#3":
            return {
                rankColor: "bg-gradient-to-br from-[#DD7F3C] to-[#984F1B] text-[#0B0B0F]",
                borderColor: "border-[#FF7A0066]",
                glow: "shadow-[0_0_30px_rgba(255,122,0,0.25)]",
                crown: false,
            };
        default:
            return {
                rankColor: "bg-[#1F2128E5] text-[#E7EBEF]",
                borderColor: "border-[#24262E]",
                glow: "",
                crown: false,
            };
    }
};

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

const Card: React.FC<PlayerProps> = ({ player }) => {
    const styles = getRankStyles(player.rank);
    const categoryStyles = getCategoryStyles(player.category);

    return (
        <Link href={`/player-detail/${player.id}`} className="block h-fit w-fit">
            <HeroCard
                className={`relative flex flex-col rounded-[22px] overflow-hidden bg-[#0A0B0F] 
            border ${styles.borderColor} ${styles.glow}
            transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(0,229,255,0.15)]
            w-[300px] h-[430px] p-0 shadow-none`}
            >
                {/* Header Section: Badges */}
                <div className="absolute top-0 left-0 right-0 flex justify-between items-start z-30  px-3 py-2 pointer-events-none">
                    <div className="flex flex-col gap-1 items-center pointer-events-auto">
                        {styles.crown && (
                            <div className="text-[18px] text-[#FFBF00]"><LuCrown /></div>
                        )}
                        {!styles.crown && (player.rank === "#2" || player.rank === "#3") && (
                            <div className="text-[18px] mb-0.5 text-[#7B899D]"><LuMedal /></div>
                        )}
                        <div
                            className={`p-1.5 h-9 w-9 rounded-full flex items-center orbitron justify-center 
                font-bold text-[14px] tracking-tighter
                ${styles.rankColor} shadow-2xl`}
                        >
                            <span> {player.rank.replace("#", "#")}</span>
                        </div>
                    </div>

                    <div
                        className="bg-[#00CCFFE5] text-[#0B0B0F] font-bold px-3 py-1.5 rounded-[12px] 
                text-[13px] orbitron shadow-[0_0_20px_rgba(0,204,255,0.5)] tracking-wide pointer-events-auto"
                    >
                        {player.score.toFixed(1)}
                    </div>
                </div>

                {/* Body: Image Container */}
                <div className="p-0 overflow-hidden relative h-[400px]">
                    <Image
                        src={player.image}
                        alt={player.name}
                        fill={true}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                        className="object-cover object-top"
                        priority={player.rank === "#1" || player.rank === "#2" || player.rank === "#3"}
                    />
                </div>

                {/* Footer: Details & Stats */}
                <HeroCard.Footer className="flex flex-col px-6 pb-3 pt-0 bg-[#0A0B0F] relative z-20 flex-1 justify-end items-stretch gap-2 border-none">
                    <div className="mb-auto pt-1 flex flex-col gap-1">
                        <h3 className="orbitron text-[16px] font-bold text-[#E7EBEF] tracking-wider mb-0.5 leading-tight">
                            {player.name}
                        </h3>
                        <p className="text-[#7B899D] text-[13px] mb-2 font-normal  outfit">
                            {player.role}
                        </p>

                        {/* Stats Row */}
                        <div className="flex items-center gap-2.5 mb-2">
                            <div className="flex items-center gap-1.5 text-[#7B899D] text-[10px] outfit">
                                <IoMdFootball className="text-[#00CCFF] text-sm" />
                                <span className="whitespace-nowrap">{player.stats.apps}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[#7B899D] text-[10px] outfit">
                                <FiCalendar className="text-[#00CCFF] text-sm" />
                                <span className="whitespace-nowrap">{player.stats.years}</span>
                            </div>
                            {player.stats.country && (
                                <div className="flex items-center gap-1.5 text-[#7B899D] text-[10px] outfit">
                                    <FiMapPin className="text-[#00CCFF] text-sm" />
                                    <span className="whitespace-nowrap">{player.stats.country}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Category + Trophies Row */}
                    <div className="flex items-center justify-between mb-2">
                        <div
                            className={`border px-3 py-1.5 rounded-full 
                text-[11px] font-medium tracking-widest uppercase ${categoryStyles}`}
                        >
                            {player.category}
                        </div>

                        <div className="flex items-center gap-1 text-[#7B899D]">
                            <BsTrophy className="text-[#7B899D] text-base" />
                            <span className="font-medium text-[#7B899D] text-[12px]">{player.trophies}</span>
                        </div>
                    </div>
 
                    {/* Score Progress */}
                    <div className="flex flex-col gap-1.5 min-w-[160px] md:min-w-[130px] w-full md:w-auto">
                        <ProgressBar
                            value={player.score}
                            aria-label="Performance Score"
                            className="w-full flex flex-col gap-1"
                        >
                            <div className="flex items-center justify-between w-full">
                                <span className="outfit font-normal text-[12px] tracking-wider text-[#7B899D]">HGW Score</span>
                                <span className="orbitron text-[14px] font-bold text-[#00CCFF]">{player.score.toFixed(1)}</span>
                            </div>
                            <ProgressBar.Track className="h-2 bg-[#1B1C22] rounded-full overflow-hidden">
                                <ProgressBar.Fill className="bg-[#00CCFF] shadow-[0_0_12px_#00CCFF80]" />
                            </ProgressBar.Track>
                        </ProgressBar>
                    </div>
                </HeroCard.Footer>
            </HeroCard>
        </Link>
    );
};

export default Card;