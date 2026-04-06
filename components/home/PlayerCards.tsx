"use client";

import React, { useState, useMemo } from 'react';
import { MdArrowForwardIos } from 'react-icons/md';
import { Button } from "@heroui/react";
import PlayerCard from '@/components/common/Card';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

import { PlayerData, PLAYERS_DATA } from '@/data/players';

const PlayerCards: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("All Sports");

    const categories = [
        { id: 1, name: "All Sports" },
        { id: 2, name: "Football" },
        { id: 3, name: "Rugby" },
        { id: 4, name: "Music" }
    ];

    const filteredPlayers = useMemo(() => {
        if (selectedCategory === "All Sports") return PLAYERS_DATA.slice(0, 8); // Showing top 8 on home
        return PLAYERS_DATA.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }, [selectedCategory]);

    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-8 flex flex-col gap-8">
            {/* Header section with Filter Buttons and Full Leaderboard Link */}
            <div className="relative flex flex-col md:flex-row items-center justify-between w-full gap-6">
                {/* Filter Section */}
                <div className="flex flex-wrap items-center gap-3">
                    {categories.map((cat) => (
                        <Button
                            key={cat.id}
                            onPress={() => setSelectedCategory(cat.name)}
                            className={`px-[16px] py-[8px] rounded-[12px] text-center outfit text-[12px] md:text-[16px] font-[600] transition-all duration-300 border ${selectedCategory === cat.name
                                ? "bg-[#00CCFF] text-[#0B0B0F] border-[#00CCFF] shadow-[0_0_20px_rgba(0,204,255,0.3)]"
                                : "bg-[#1F2128] text-[#7B899D] border-[#24262E] hover:text-white hover:bg-[#24262E]"
                                }`}
                        >
                            {cat.name}
                        </Button>
                    ))}
                </div>

                <Link href="/database" className="z-10 flex items-center gap-1 cursor-pointer text-[#00CCFF] hover:text-[#00CCFFEE] outfit text-xs md:text-[16px] font-[500] tracking-wider group">
                    Full Leaderboard
                    <MdArrowForwardIos className="text-[13px] group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* Player Cards Grid with animations */}
            <motion.div 
                layout 
                className="grid grid-cols-1 md:flex md:flex-wrap lg:grid lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-3 md:gap-6 lg:gap-8"
            >
                <AnimatePresence mode="popLayout">
                    {filteredPlayers.map((player) => (
                        <motion.div
                            key={player.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <PlayerCard player={player} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </section>
    );
};

export default PlayerCards;
