"use client";

import Image from "next/image";
import { FiCalendar, FiClock, FiHeadphones, FiPlay, FiExternalLink } from "react-icons/fi";
import { IoMicOutline, IoPersonOutline, IoStarOutline } from "react-icons/io5";
import { Button, Card } from "@heroui/react";
import { LuPlay } from "react-icons/lu";

const PodcastContainer = () => {
    return (
        <section className="min-h-screen pt-28 pb-20 relative flex flex-col items-center overflow-hidden bg-[#0D0E12]">
            
            {/* Background Background Pattern / Matrix Effect */}
            <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_#00CCFF33_0%,_transparent_50%)]" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            </div>

            <div className="w-full max-w-[1400px] px-6 md:px-12 lg:px-20 flex flex-col gap-10">
                
                {/* Section Title */}
                <div className="flex items-center gap-2 text-[#00CCFF] tracking-[0.2rem] font-[600]">
                    <IoMicOutline className="text-[18px] md:text-[22px]" />
                    <span className="text-[11px] md:text-[14px] uppercase orbitron">HGW PODCAST</span>
                </div>

                {/* Featured Episode Section (Two Columns) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    
                    {/* Left Column: Featured Image Card */}
                    <div className="lg:col-span-6 xl:col-span-6 relative">
                        <div className="relative aspect-video rounded-[24px] overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] group">
                            <Image 
                                src="https://images.unsplash.com/photo-1590602847861-f357a9302bbc?q=80&w=2070&auto=format&fit=crop" 
                                alt="Podcast Featured Episode"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            
                            {/* Featured Badge */}
                            <div className="absolute top-6 left-6 bg-[#FFBF00] text-[#0B0B0F] px-4 py-1.5 rounded-full text-[10px] md:text-[12px] font-black orbitron tracking-wider">
                                FEATURED EP #12
                            </div>

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Button className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#00CCFF] text-[#0B0B0F] min-w-0 p-0 shadow-[0_0_30px_rgba(0,204,255,0.4)] hover:scale-110 transition-transform">
                                    <LuPlay className="text-3xl md:text-4xl ml-1" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Episode Details */}
                    <div className="lg:col-span-6 xl:col-span-6 flex flex-col gap-6 pt-2">
                        
                        {/* Category Tag */}
                        <div>
                            <span className="px-4 py-1 rounded-full bg-[#00CCFF1A] border border-[#00CCFF4D] text-[#00CCFF] text-[11px] font-bold outfit">
                                Football
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-[28px] md:text-[44px] lg:text-[48px] orbitron font-[800] leading-tight text-white">
                            Why Messi is the GOAT – A Statistical Breakdown
                        </h1>

                        {/* Description */}
                        <p className="text-[#7B899D] text-[15px] md:text-[17px] outfit leading-relaxed max-w-xl">
                            We break down Lionel Messi's career using the 10 Pillars of Domination. From longevity to clutch factor, every metric is dissected.
                        </p>

                        {/* Stats Row */}
                        <div className="flex flex-wrap items-center gap-6 text-[#7B899D] text-[14px] md:text-[15px] outfit">
                            <div className="flex items-center gap-2">
                                <FiClock className="text-[#00CCFF]" />
                                <span>45 min</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiCalendar className="text-[#00CCFF]" />
                                <span>2024-12-01</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiHeadphones className="text-[#00CCFF]" />
                                <span>48,200 listens</span>
                            </div>
                        </div>

                        {/* Details List */}
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <IoPersonOutline className="text-[#FFBF00] text-lg" />
                                <span className="text-[#7B899D] text-[14px] md:text-[16px] outfit">
                                    Guests: <span className="text-white">Dr. Alex Torres, HGW Analytics Team</span>
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <IoStarOutline className="text-[#FFBF00] text-lg" />
                                <span className="text-[#7B899D] text-[14px] md:text-[16px] outfit">
                                    Legends: <span className="text-[#00CCFF] font-medium cursor-pointer hover:underline">Lionel Messi</span> <span className="text-[#00CCFF] font-medium cursor-pointer hover:underline ml-2">Cristiano Ronaldo</span>
                                </span>
                            </div>
                        </div>

                        {/* Platform Action Buttons */}
                        <div className="flex flex-wrap items-center gap-3 mt-4">
                            <Button className="h-10 px-4 bg-[#1F2128] border border-white/10 text-[#7B899D] rounded-xl flex items-center gap-2 hover:bg-white/5 transition-all text-[12px] md:text-[14px] font-bold">
                                <FiExternalLink className="text-[#00CCFF]" />
                                Spotify
                            </Button>
                            <Button className="h-10 px-4 bg-[#1F2128] border border-white/10 text-[#7B899D] rounded-xl flex items-center gap-2 hover:bg-white/5 transition-all text-[12px] md:text-[14px] font-bold">
                                <FiExternalLink className="text-[#00CCFF]" />
                                Apple Podcasts
                            </Button>
                            <Button className="h-10 px-4 bg-[#1F2128] border border-white/10 text-[#7B899D] rounded-xl flex items-center gap-2 hover:bg-white/5 transition-all text-[12px] md:text-[14px] font-bold">
                                <FiExternalLink className="text-[#00CCFF]" />
                                YouTube
                            </Button>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default PodcastContainer;
