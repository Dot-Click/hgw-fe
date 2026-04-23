"use client"

import React, { useEffect } from 'react';
import DatabaseFilters from "@/components/database/DatabaseFilters";
import Card, { CardSkeleton } from "@/components/common/Card";
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPlayers } from '@/store/actions/playerActions';
import { fetchCategories } from '@/store/actions/categoryActions';

const Database = () => {
    const dispatch = useAppDispatch();
    const { players, loading } = useAppSelector((state) => state.players);

    useEffect(() => {
        dispatch(fetchPlayers());
        dispatch(fetchCategories());
    }, [dispatch]);

    // Filter published players and sort by finalScore descending
    const publishedPlayers = players
        .filter(p => p.status === "PUBLISHED")
        .sort((a, b) => b.finalScore - a.finalScore);

    return (
        <section className="min-h-screen pt-28 pb-20 relative flex flex-col items-center">
            <div className="w-full max-w-[1400px] px-6 md:px-12 lg:px-20 flex flex-col">
                <div className="max-w-7xl w-full flex flex-col gap-10">

                    {/* Header Section */}
                    <div className="flex flex-col gap-1">
                        <div className="text-[32px] md:text-[56px] font-[900] flex flex-wrap items-center gap-x-6 gap-y-2 orbitron leading-tight">
                            <h1 className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">HGW</h1>
                            <span className="text-[#00CCFF] drop-shadow-[0_0_15px_rgba(0,204,255,0.4)]">Database</span>
                        </div>
                        <p className="text-[#7B899D] font-medium text-[16px] md:text-[18px] outfit leading-relaxed max-w-3xl">
                            Search and filter the complete legend archive
                        </p>
                    </div>

                    {/* Search & Filter Section */}
                    <DatabaseFilters />

                    {/* Legends Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 justify-items-center">
                        {loading ? (
                            // Show Skeletons while loading
                            Array.from({ length: 8 }).map((_, i) => (
                                <CardSkeleton key={i} />
                            ))
                        ) : publishedPlayers.length > 0 ? (
                            publishedPlayers.map((player, index) => (
                                <Card key={player.id} player={player} rank={index + 1} />
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center">
                                <p className="text-zinc-500 orbitron text-sm tracking-widest">No Legends found.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Database;
