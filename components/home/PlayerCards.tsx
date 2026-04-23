"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { MdArrowForwardIos } from 'react-icons/md';
import { Button, Skeleton } from "@heroui/react";
import PlayerCard from '@/components/common/Card';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchPlayers } from '@/store/actions/playerActions';
import { fetchCategories } from '@/store/actions/categoryActions';

const PlayerCardSkeleton = () => (
    <div className="w-[300px] h-[430px] rounded-[22px] bg-[#0A0B0F] border border-[#24262E] overflow-hidden p-0 flex flex-col">
        <div className="h-[300px] w-full bg-zinc-900/50 animate-pulse" />
        <div className="p-6 space-y-4 flex-1 flex flex-col justify-end">
            <div className="space-y-2">
                <Skeleton className="w-3/4 h-5 rounded-lg bg-zinc-800" />
                <Skeleton className="w-1/2 h-3 rounded-lg bg-zinc-800" />
            </div>
            <div className="flex justify-between items-center pt-2">
                <Skeleton className="w-20 h-6 rounded-full bg-zinc-800" />
                <Skeleton className="w-12 h-6 rounded-lg bg-zinc-800" />
            </div>
            <Skeleton className="w-full h-8 rounded-lg bg-zinc-800" />
        </div>
    </div>
);

const PlayerCards: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { players, loading: playersLoading } = useSelector((state: RootState) => state.players);
    const { categories: dbCategories, loading: catsLoading } = useSelector((state: RootState) => state.categories);
    
    const [selectedCategory, setSelectedCategory] = useState<string>("All Sports");

    useEffect(() => {
        dispatch(fetchPlayers());
        dispatch(fetchCategories());
    }, [dispatch]);

    // Build categories list with "All Sports" at the start
    const categoriesList = useMemo(() => {
        const list = [{ id: 'all', name: "All Sports" }];
        dbCategories.forEach(cat => {
            list.push({ id: cat.id, name: cat.name });
        });
        return list;
    }, [dbCategories]);

    // Filter published players and sort by score descending to determine rank
    const publishedPlayers = useMemo(() => {
        return [...players]
            .filter(p => p.status === "PUBLISHED")
            .sort((a, b) => (b.finalScore || 0) - (a.finalScore || 0));
    }, [players]);

    const filteredPlayers = useMemo(() => {
        if (selectedCategory === "All Sports") return publishedPlayers.slice(0, 8); 
        return publishedPlayers.filter(p => p.category?.name?.toLowerCase() === selectedCategory.toLowerCase());
    }, [selectedCategory, publishedPlayers]);

    if (playersLoading || catsLoading) {
        return (
            <section className="w-full max-w-7xl mx-auto px-4 py-8 flex flex-col gap-8">
                <div className="flex flex-wrap items-center gap-3">
                    {[1, 2, 3, 4].map(i => (
                        <Skeleton key={i} className="w-24 h-10 rounded-[12px] bg-zinc-900/50" />
                    ))}
                </div>
                <div className="grid grid-cols-1 md:flex md:flex-wrap lg:grid lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-3 md:gap-6 lg:gap-8">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <PlayerCardSkeleton key={i} />)}
                </div>
            </section>
        );
    }

    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-8 flex flex-col gap-8">
            {/* Header section with Filter Buttons and Full Leaderboard Link */}
            <div className="relative flex flex-col md:flex-row items-center justify-between w-full gap-6">
                {/* Filter Section */}
                <div className="flex flex-wrap items-center gap-3">
                    {categoriesList.map((cat) => (
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
            <div className="min-h-[430px]">
                {filteredPlayers.length > 0 ? (
                    <motion.div 
                        layout 
                        className="grid grid-cols-1 md:flex md:flex-wrap lg:grid lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-3 md:gap-6 lg:gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredPlayers.map((player) => {
                                // Find global rank from publishedPlayers
                                const rank = publishedPlayers.findIndex(p => p.id === player.id) + 1;
                                return (
                                    <motion.div
                                        key={player.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                    >
                                        <PlayerCard player={player as any} rank={rank} />
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <div className="w-full py-20 text-center">
                        <p className="text-zinc-500 orbitron uppercase tracking-widest">No players found in this category.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default PlayerCards;
