'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchPodcasts } from '@/store/actions/podcastActions';
import { fetchCategories } from '@/store/actions/categoryActions';
import PodcastCard from './PodcastCard';
import { PodcastGridSkeleton } from './PodcastSkeleton';
import { Button, cn } from '@heroui/react';
import { FiFilter, FiSearch } from 'react-icons/fi';

const PodcasCards = ({ featuredPodcastId, onPlay, onExternalClick }: { featuredPodcastId?: string, onPlay?: (podcast: any) => void, onExternalClick?: (podcast: any) => void }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { podcasts, loading } = useSelector((state: RootState) => state.podcasts);
    const { categories } = useSelector((state: RootState) => state.categories);

    const [activeCategory, setActiveCategory] = useState("All Episodes");
    const [activeSort, setActiveSort] = useState('Latest');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(fetchPodcasts());
        dispatch(fetchCategories());
    }, [dispatch]);

    const sortOptions = [
        { id: 1, name: 'Latest' },
        { id: 2, name: 'Most Popular' },
        { id: 3, name: 'Editor Pick' }
    ];

    const filteredPodcasts = useMemo(() => {
        let result = [...podcasts];

        // Exclude featured podcast if ID provided
        if (featuredPodcastId) {
            result = result.filter(p => p.id !== featuredPodcastId);
        }

        // Filter by Category
        if (activeCategory !== "All Episodes") {
            result = result.filter(p => p.category?.name === activeCategory);
        }

        // Filter by Search
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(p => 
                p.title.toLowerCase().includes(q) || 
                p.description.toLowerCase().includes(q) ||
                p.players?.some((player: any) => player.name.toLowerCase().includes(q))
            );
        }

        // Sort
        if (activeSort === 'Latest') {
            result.sort((a, b) => new Date(b.releaseDate || b.createdAt).getTime() - new Date(a.releaseDate || a.createdAt).getTime());
        } else if (activeSort === 'Most Popular') {
            result.sort((a, b) => (b.listens || 0) - (a.listens || 0));
        } else if (activeSort === 'Editor Pick') {
            result = result.filter(p => p.isPick);
        }

        return result;
    }, [podcasts, activeCategory, activeSort, searchQuery]);

    if (loading && podcasts.length === 0) {
        return (
            <div className="w-full max-w-[1400px] px-6 md:px-12 lg:px-20 mt-16 mb-24 relative z-10">
                <PodcastGridSkeleton />
            </div>
        );
    }

    return (
        <div className="w-full max-w-[1400px] px-6 md:px-12 lg:px-20 mt-16 mb-24 relative z-10">
            {/* Filter and Sort Header */}
            <div className="flex flex-col gap-8 mb-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    {/* Left: Category Filters */}
                    <div className="flex flex-wrap items-center gap-3">
                        <Button
                            onPress={() => setActiveCategory("All Episodes")}
                            className={cn(
                                "px-6 py-2 rounded-xl text-center outfit text-sm md:text-base transition-all duration-300 border",
                                activeCategory === "All Episodes"
                                    ? "bg-[#00CCFF] font-bold text-[#0B0B0F] border-[#00CCFF] shadow-[0_0_25px_rgba(0,204,255,0.3)]"
                                    : "bg-[#1F2128] font-medium text-[#7B899D] border-[#24262E] hover:text-white hover:bg-[#24262E]"
                            )}
                        >
                            All Episodes
                        </Button>
                        {categories.map((cat) => (
                            <Button
                                key={cat.id}
                                onPress={() => setActiveCategory(cat.name)}
                                className={cn(
                                    "px-6 py-2 rounded-xl text-center outfit text-sm md:text-base transition-all duration-300 border",
                                    activeCategory === cat.name
                                        ? "bg-[#00CCFF] font-bold text-[#0B0B0F] border-[#00CCFF] shadow-[0_0_25px_rgba(0,204,255,0.3)]"
                                        : "bg-[#1F2128] font-medium text-[#7B899D] border-[#24262E] hover:text-white hover:bg-[#24262E]"
                                )}
                            >
                                {cat.name}
                            </Button>
                        ))}
                    </div>

                    {/* Right: Sort Filters */}
                    <div className="flex items-center gap-2 p-1 bg-[#111217] border border-[#24262E] rounded-2xl">
                        {sortOptions.map((opt) => (
                            <button
                                key={opt.id}
                                onClick={() => setActiveSort(opt.name)}
                                className={cn(
                                    "px-4 py-2 rounded-xl outfit text-sm font-medium transition-all whitespace-nowrap",
                                    activeSort === opt.name
                                        ? "bg-[#FFBF00] text-[#0B0B0F] shadow-[0_0_15px_rgba(255,191,0,0.2)]"
                                        : "text-[#7B899D] hover:text-white"
                                )}
                            >
                                {opt.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative group max-w-2xl">
                    <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#00CCFF] transition-colors" size={20} />
                    <input 
                        type="text"
                        placeholder="Search by title, description, or legend..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-14 bg-[#111217] border border-[#24262E] rounded-[20px] pl-14 pr-6 text-sm text-white outfit outline-none focus:border-[#00CCFF]/50 transition-all placeholder:text-zinc-600 shadow-inner"
                    />
                </div>
            </div>

            {/* Grid */}
            {filteredPodcasts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    {filteredPodcasts.map((podcast) => (
                        <PodcastCard
                            key={podcast.id}
                            {...podcast}
                            onPlay={() => onPlay?.(podcast)}
                            onExternalClick={() => onExternalClick?.(podcast)}
                        />
                    ))}
                </div>
            ) : (
                <div className="w-full py-32 text-center border-2 border-dashed border-[#24262E] rounded-[32px] bg-white/[0.01]">
                    <div className="flex flex-col items-center gap-4">
                        <FiFilter className="text-[#00CCFF]/20 text-6xl" />
                        <h3 className="text-xl font-bold text-white orbitron">No Podcasts Found</h3>
                        <p className="text-zinc-500 outfit max-w-xs mx-auto">We couldn't find any episodes matching your current filters or search query.</p>
                        <Button 
                            onPress={() => { setActiveCategory("All Episodes"); setActiveSort("Latest"); setSearchQuery(""); }}
                            className="mt-4 bg-[#00CCFF] text-[#0B0B0F] font-bold orbitron px-8 h-12 rounded-xl"
                        >
                            Reset Filters
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
    
export default PodcasCards;