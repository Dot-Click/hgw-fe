"use client";

import React from "react";
import Image from "next/image";
import { LuTrophy, LuUsers } from "react-icons/lu";
import {
    Chip,
    Card,
    CardContent,
    Avatar,
    ProgressBar,
    Button,
    Tooltip
} from "@heroui/react";
import { motion } from "framer-motion";

interface PlayerData {
    id: number | string;
    rank: string;
    name: string;
    role: string;
    category: string;
    categoryColor: string;
    stats: { users: number; trophies: number };
    score: number;
    image: string;
    highlight?: boolean;
}

interface LeaderboardLegendListProps {
    data: PlayerData[];
}

const LeaderboardLegendList = ({ data }: LeaderboardLegendListProps) => {
    return (
        <div className="flex flex-col gap-4 mt-4 md:mt-3">
            {data.map((player, index) => (
                <motion.div
                    key={player.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                >
                    <Card
                        className={`relative overflow-hidden rounded-[18px] bg-[linear-gradient(94.78deg,_#1B1C22_0%,_#0D0E12_100%)]  ${player.highlight
                            ? " border-[0.5px] border-[#37D7FF] shadow-[0_0_10px_#37D7FF2E]"
                            : "  border border-white/5"
                            }`}
                    >
                        <CardContent className="p-0 overflow-hidden">
                            <div className="relative z-10 flex flex-col xl:flex-row justify-between items-center gap-4 xl:gap-8 p-3 md:p-4 lg:p-1">

                                {/* Rank and Player Info - Container 1 */}
                                <div className="flex items-center w-full xl:w-[35%] gap-4 md:gap-3 px-2 md:px-2">
                                    <span
                                        className={`orbitron text-lg md:text-[16px] bg-[#1F2128] rounded-[12px] font-[700] px-2 py-1 shrink-0 text-[#7B899D]`}
                                    >
                                        {player.rank}
                                    </span>

                                    <div className="flex items-center gap-3">
                                        <Avatar className="w-12 h-12 md:w-[75px] md:h-[75px] rounded-[24px] overflow-hidden border-none ring-0 bg-transparent">
                                            <Avatar.Image
                                                className="object-cover w-full h-full"
                                                alt={player.name}
                                                src={player.image}
                                            />
                                        </Avatar>
                                        <div className="flex flex-col leading-6.5">
                                            <span className="orbitron text-[18px] md:text-[20px] font-[700] text-[#E7EBEF] tracking-wide">
                                                {player.name}
                                            </span>
                                            <span className="outfit text-[#7B899D] text-[13px] md:text-[16px] font-[400]">
                                                {player.role}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats and Score - Container 2 */}
                                <div className="flex flex-wrap md:flex-nowrap items-center justify-between lg:justify-end gap-3 w-full xl:w-[65%] px-2 md:px-2">

                                    {/* Category Tag */}
                                    <Chip
                                        className={`${player.categoryColor} border outfit text-[10px] md:text-[11px] font-[500]  px-2.5 py-1 tracking-widest rounded-full flex shrink-0 uppercase`}
                                    >
                                        <Chip.Label>{player.category}</Chip.Label>
                                    </Chip>

                                    {/* Numerical Stats with Tooltips */}
                                    <div className="flex items-center gap-2 text-[#7B899D] outfit text-sm md:text-[14px] font-[400] whitespace-nowrap">
                                        <Tooltip>
                                            <Tooltip.Trigger>
                                                <div className="flex items-center gap-1">
                                                    <LuUsers className="text-[14px] md:text-[16px]" />
                                                    <span>{player.stats.users}</span>
                                                </div>
                                            </Tooltip.Trigger>
                                            <Tooltip.Content>Global Users</Tooltip.Content>
                                        </Tooltip>
                                        <Tooltip>
                                            <Tooltip.Trigger>
                                                <div className="flex items-center gap-1">
                                                    <LuTrophy className="text-[14px] md:text-[16px]" />
                                                    <span>{player.stats.trophies}</span>
                                                </div>
                                            </Tooltip.Trigger>
                                            <Tooltip.Content>Trophies Won</Tooltip.Content>
                                        </Tooltip>
                                    </div>

                                    {/* Score Section */}
                                    <div className="flex flex-col gap-1.5 min-w-[160px] md:min-w-[130px] w-full md:w-auto">
                                        <ProgressBar
                                            value={player.score}
                                            aria-label="Performance Score"
                                            className="w-full flex flex-col gap-1"
                                        >
                                            <div className="flex items-center justify-between w-full">
                                                <span className="outfit font-[400] text-[16px] tracking-wider text-[#7B899D]">HGW</span>
                                                <span className="orbitron text-[18px] font-[700] text-[#00CCFF]">{player.score.toFixed(1)}</span>
                                            </div>
                                            <ProgressBar.Track className="h-1 bg-[#1B1C22] rounded-full overflow-hidden">
                                                <ProgressBar.Fill className="bg-[#00CCFF] shadow-[0_0_12px_#00CCFF80]" />
                                            </ProgressBar.Track>
                                        </ProgressBar>
                                    </div>

                                    {/* Share Button */}
                                    <Button
                                        isIconOnly
                                        aria-label="Compare player"
                                        className={`min-w-10 min-h-10 md:min-w-12 md:min-h-12 rounded-2xl ${player.highlight
                                            ? "bg-[#00CCFF1A] text-[#00CCFF] hover:bg-[#00CCFF26]"
                                            : "bg-[#1B1C22] text-[#7B899D] hover:text-[#00CCFF] hover:bg-[#1B1C22DD]"
                                            }`}
                                    >
                                        <Image 
                                            src="/assets/shareIcon.png" 
                                            alt="Share" 
                                            width={45} 
                                            height={45} 
                                        />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
};

export default LeaderboardLegendList;
