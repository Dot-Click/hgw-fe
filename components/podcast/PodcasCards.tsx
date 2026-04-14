'use client';

import React, { useState } from 'react';
import PodcastCard from './PodcastCard';
import { Button, cn } from '@heroui/react';

const PodcasCards = () => {

    const categories = [
        { id: 1, name: "All Episodes" },
        { id: 2, name: "Football" },
        { id: 3, name: "Rugby" },
        { id: 4, name: "Music" }
    ];

    const sortOptions = [
        { id: 1, name: 'Latest' },
        { id: 2, name: 'Most Popular' },
        { id: 3, name: 'Editor Pick' }
    ];

    const [activeCategory, setActiveCategory] = useState("All Episodes");
    const [activeSort, setActiveSort] = useState('Latest');

    const podcastData = [
        {
            id: 1,
            episode: "EP #11",
            isPick: false,
            category: "Rugby",
            title: "The Jonah Lomu Effect – How One Man Changed Rugby",
            description: "Exploring the cultural and athletic impact of Jonah Lomu. How a single player redefined the wing position forever.",
            duration: "38 min",
            date: "2024-11-15",
            listeners: "31.4k",
            host: "Sean Fitzpatrick, Rugby Vault",
            tags: ["Jonah Lomu", "Richie McCaw"],
            image: "/assets/pd1.png"
        },
        {
            id: 2,
            episode: "EP #12",
            isPick: true,
            category: "Debate",
            title: "Maradona vs Pelé – The Eternal Debate",
            description: "Comparing two football icons through the lens of our scoring system. Who really deserves the crown?",
            duration: "52 min",
            date: "2024-11-01",
            listeners: "62.8k",
            host: "Carlos Vela, The GOAT Panel",
            tags: ["Diego Maradona", "Pelé"],
            image: "/assets/pd2.png"
        },
        {
            id: 3,
            episode: "EP #13",
            isPick: false,
            category: "Culture",
            title: "Bob Marley – Legend Beyond Music",
            description: "How Bob Marley's cultural legacy earns him a place alongside sport greats in the HGW rankings.",
            duration: "41 min",
            date: "2024-10-15",
            listeners: "27.5k",
            host: "Prof. Maya Johnson",
            tags: ["Bob Marley"],
            image: "/assets/pd3.png"
        },
        {
            id: 4,
            episode: "EP #14",
            isPick: true,
            category: "Football",
            title: "Zidane's Masterclass – The Art of the Big Game",
            description: "Analysing Zinedine Zidane's ability to perform on the biggest stages. From World Cup finals to Champions League nights.",
            duration: "47 min",
            date: "2024-10-01",
            listeners: "31.4k",
            host: "Thierry Roland Jr.",
            tags: ["Zinedine Zidane"],
            image: "/assets/pd4.png"
        },
        {
            id: 5,
            episode: "EP #15",
            isPick: false,
            category: "Rugby",
            title: "McCaw vs Lomu – Different Greatness",
            description: "Can consistent excellence beat explosive brilliance? We compare two All Black legends head-to-head.",
            duration: "44 min",
            date: "2024-09-15",
            listeners: "22.9k",
            host: "Dan Carter, HGW Rugby Desk",
            tags: ["Richie McCaw", "Jonah Lomu"],
            image: "/assets/pd5.png"
        }
    ];

    return (
        <div className="w-full max-w-[1400px] px-6 md:px-12 lg:px-20 mt-16 mb-24 relative z-10">
            {/* Filter and Sort Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-7">
                {/* Left: Category Filters */}
                <div className="flex flex-wrap items-center gap-3">
                    {categories.map((cat) => (
                        <Button
                            key={cat.id}
                            onPress={() => setActiveCategory(cat.name)}
                            className={`px-[16px] py-[8px] rounded-[12px] text-center outfit text-[12px] md:text-[16px]  transition-all duration-300 border ${activeCategory === cat.name
                                ? "bg-[#00CCFF] font-[700] text-[#0B0B0F] border-[#00CCFF] shadow-[0_0_20px_rgba(0,204,255,0.3)]"
                                : "bg-[#1F2128] font-[400]  text-[#7B899D] border-[#24262E] hover:text-white hover:bg-[#24262E]"
                                }`}
                        >
                            {cat.name}
                        </Button>
                    ))}
                </div>

                {/* Right: Sort Filters */}
                <div className="flex items-center gap-2  p-1.5  self-start md:self-auto">
                    {sortOptions.map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => setActiveSort(opt.name)}
                            className={cn(
                                "px-3 py-1.5 rounded-[12px] outfit cursor-pointer text-[16px] font-[400] transition-all whitespace-nowrap",
                                activeSort === opt.name
                                    ? "bg-[#3C2F0C] text-[#FFBF00] border border-[#FFBF00]"
                                    : "text-[#7B899D] bg-[#1F2128] hover:text-white"
                            )}
                        >
                            {opt.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {podcastData.map((podcast) => (
                    <PodcastCard
                        key={podcast.id}
                        {...podcast}
                    />
                ))}
            </div>
        </div>
    );
};
    
export default PodcasCards;