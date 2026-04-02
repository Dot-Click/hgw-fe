"use client";

import React, { useState, useMemo } from 'react';
import { MdArrowForwardIos } from 'react-icons/md';
import { Button } from "@heroui/react";
import PlayerCard from './Card';
import { motion, AnimatePresence } from 'framer-motion';

interface PlayerData {
    id: number;
    rank: string;
    rankIcon?: string;
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
    glowColor?: string;
}

const PlayerCards: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("All Sports");

    const categories = [
        { id: 1, name: "All Sports" },
        { id: 2, name: "Football" },
        { id: 3, name: "Rugby" },
        { id: 4, name: "Music" }
    ];

    const playerData: PlayerData[] = [
        {
            id: 1,
            rank: "#1",
            rankIcon: "👑",
            name: "Lionel Messi",
            role: "Forward",
            stats: { apps: "1050 apps", years: "2000s-2020s", country: "Argentina" },
            category: "FOOTBALL",
            trophies: 44,
            score: 98.5,
            image: "/assets/img1.png",
            glowColor: "border-[#FFBF00] shadow-[0_0_20px_#FFBF0033]"
        },
        {
            id: 2,
            rank: "#2",
            rankIcon: "🏆",
            name: "Pelé",
            role: "Forward",
            stats: { apps: "1363 apps", years: "1950s-1970s", country: "Brazil" },
            category: "FOOTBALL",
            trophies: 26,
            score: 97.8,
            image: "/assets/img2.png",
            glowColor: "border-[#00CCFF] shadow-[0_0_20px_#00CCFF33]"
        },
        {
            id: 3,
            rank: "#3",
            rankIcon: "🏆",
            name: "Cristiano Ronaldo",
            role: "Forward",
            stats: { apps: "1200 apps", years: "2000s-2020s", country: "Portugal" },
            category: "FOOTBALL",
            trophies: 35,
            score: 97.1,
            image: "/assets/img3.png",
            glowColor: "border-[#F97316] shadow-[0_0_20px_#F9731633]"
        },
        {
            id: 4,
            rank: "#4",
            name: "Diego Maradona",
            role: "Attacking Midfielder",
            stats: { apps: "491 apps", years: "1980s-1990s", country: "Argentina" },
            category: "FOOTBALL",
            trophies: 11,
            score: 96.2,
            image: "/assets/img4.png"
        },
        {
            id: 5,
            rank: "#5",
            name: "Zinedine Zidane",
            role: "Attacking Midfielder",
            stats: { apps: "689 apps", years: "1990s-2000s", country: "France" },
            category: "FOOTBALL",
            trophies: 16,
            score: 95.3,
            image: "/assets/img5.png"
        },
        {
            id: 6,
            rank: "#6",
            name: "Bob Marley",
            role: "Vocalist / Songwriter",
            stats: { apps: "1960s-1980s", years: "Jamaica", country: "" },
            category: "MUSIC",
            trophies: 8,
            score: 94.6,
            image: "/assets/img6.png"
        },
        {
            id: 7,
            rank: "#7",
            name: "Richie McCaw",
            role: "Flanker",
            stats: { apps: "148 apps", years: "2000s-2010s", country: "New Zealand" },
            category: "RUGBY",
            trophies: 12,
            score: 93.7,
            image: "/assets/img7.png"
        },
        {
            id: 8,
            rank: "#8",
            name: "Jonah Lomu",
            role: "Wing",
            stats: { apps: "73 apps", years: "1990s-2000s", country: "New Zealand" },
            category: "RUGBY",
            trophies: 4,
            score: 91.4,
            image: "/assets/player1.png"
        }
    ];

    const filteredPlayers = useMemo(() => {
        if (selectedCategory === "All Sports") return playerData;
        return playerData.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
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

                <button className="z-10 flex items-center gap-1 cursor-pointer text-[#00CCFF] hover:text-[#00CCFFEE] outfit text-xs md:text-[16px] font-[500] tracking-wider group">
                    Full Leaderboard
                    <MdArrowForwardIos className="text-[13px] group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            {/* Player Cards Grid with animations */}
            <motion.div 
                layout 
                className="flex justify-center w-full flex-wrap gap-4"
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
