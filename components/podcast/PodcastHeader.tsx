"use client";
import { Button } from '@heroui/react'
import Image from 'next/image'
import { FaPlay } from 'react-icons/fa'
import { FiCalendar, FiClock, FiExternalLink, FiHeadphones, FiYoutube, FiMusic } from 'react-icons/fi'
import { IoMicOutline, IoPersonOutline, IoStarOutline } from 'react-icons/io5'

interface PodcastHeaderProps {
    featuredPodcast?: any;
    onPlay?: () => void;
    onExternalClick?: () => void;
}

const PodcastHeader = ({ featuredPodcast, onPlay, onExternalClick }: PodcastHeaderProps) => {
    // If no featured podcast is provided, we can show a placeholder or hide.
    // For now, let's keep the design and make it dynamic if data exists.
    
    const title = featuredPodcast?.title || "HGW Legend Deep Dives";
    const description = featuredPodcast?.description || "Explore the careers of history's greatest icons through the 10 Pillars of Domination.";
    const imageUrl = featuredPodcast?.imageUrl || "/assets/pdimg.svg";
    const duration = featuredPodcast?.duration || 0;
    const releaseDate = featuredPodcast?.releaseDate || featuredPodcast?.createdAt;
    const listens = featuredPodcast?.listens || 0;
    const categoryName = featuredPodcast?.category?.name || "Analytics";
    const hostName = featuredPodcast?.createdBy?.name || "HGW Team";
    const players = featuredPodcast?.players || [];
    const guests = featuredPodcast?.guests || [];
    const platforms = featuredPodcast?.platforms || [];

    return (
        <div className="w-full relative">
            {/* BACKGROUND IMAGE WITH OVERLAY */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <Image
                    src="/assets/podcastBg.png"
                    alt="Background"
                    fill
                    className="object-cover opacity-100"
                    priority
                />
                {/* Optional gradient overlay to blend into the dark theme */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#0D0E12] to-transparent" />
            </div>

            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col gap-3 relative z-10 font-[400]">
                {/* Section Title */}
                <div className="flex items-center gap-2 text-[#00CCFF]  font-[500]">
                    <IoMicOutline className="text-[18px] md:text-[22px]" />
                    <span className="text-[11px] md:text-[15px] uppercase outfit">HGW PODCAST</span>
                </div>

                {/* Featured Episode Section (Two Columns) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10  items-start">

                    {/* Left Column: Featured Image Card */}
                    <div className="lg:col-span-6 xl:col-span-6 relative">
                        <div 
                            onClick={onPlay}
                            className="relative h-[220px] md:h-[400px] lg:h-[400px]  xl:h-[360px] w-full rounded-[23px] overflow-hidden border border-[#747A9499] shadow-[0_0_40px_rgba(0,0,0,0.5)] group cursor-pointer"
                        >
                            <Image
                                src={imageUrl}
                                alt={title}
                                fill
                                className="object-cover lg:object-right xl:object-center h-full transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

                            {/* Featured Badge */}
                            <div className="absolute top-3 left-3 bg-[#FFBF00] text-[#0B0B0F] px-3 py-1.5 rounded-full text-[8px] md:text-[10px]  font-[800] orbitron tracking-wider shadow-[0_0_20px_rgba(255,191,0,0.4)]">
                                FEATURED EPISODE #{featuredPodcast?.episodeNumber || "0"}
                            </div>

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Button 
                                    onPress={onPlay}
                                    className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#00CCFF] text-[#0B0B0F] min-w-0 p-0 shadow-[0_0_30_rgba(0,204,255,0.4)] hover:bg-[#0aabd3] transition-transform group-hover:scale-110"
                                >
                                    <FaPlay className="text-xl md:text-3xl text-white ml-1" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Episode Details */}
                    <div className="lg:col-span-6 xl:col-span-6 flex flex-col gap-3 py-3">

                        {/* Category Tag */}
                        <div>
                            <span className="px-3 py-1.5 rounded-full bg-[#00CCFF33] border border-[#00CCFF4D] text-[#00CCFF] text-[12px] tracking-wider font-[600] outfit">
                                {categoryName}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-[17px] md:text-[24px] lg:text-[30px] orbitron font-[900] leading-tight text-[#FFFFFF] uppercase tracking-wider">
                            {title}
                        </h1>

                        {/* Description */}
                        <p className="text-[#7B899D] text-[14px] md:text-[16px] font-[400] outfit leading-relaxed max-w-xl line-clamp-3">
                            {description}
                        </p>

                        {/* Stats Row */}
                        <div className="flex flex-wrap items-center gap-6 text-[#7B899D] font-[400] text-[14px] md:text-[16px] outfit">
                            <div className="flex items-center gap-2">
                                <FiClock className="text-[#00CCFF]" />
                                <span>{duration} min</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiCalendar className="text-[#00CCFF]" />
                                <span>{releaseDate ? new Date(releaseDate).toLocaleDateString() : 'Recent'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiHeadphones className="text-[#00CCFF]" />
                                <span>{listens.toLocaleString()} listens</span>
                            </div>
                        </div>

                        {/* Details List */}
                        <div className="flex flex-col gap-3">
                            {guests.length > 0 && (
                                <div className="flex items-center gap-3">
                                    <IoPersonOutline className="text-[#FFBF00] text-lg" />
                                    <span className="text-[#7B899D] text-[14px] font-[400] md:text-[15px] outfit">
                                        Guests: <span className="text-[#E7EBEF]">{guests.map((g: any) => g.name).join(", ")}</span>
                                    </span>
                                </div>
                            )}
                            <div className="flex items-center gap-3">
                                <IoStarOutline className="text-[#FFBF00] text-lg" />
                                <span className="text-[#7B899D] text-[14px] font-[400] md:text-[15px] outfit">
                                    Legends: {players.map((p: any, idx: number) => (
                                        <span key={p.id} className="text-[#00CCFF] font-medium cursor-pointer hover:underline mr-2">
                                            {p.name}{idx < players.length - 1 ? "," : ""}
                                        </span>
                                    ))}
                                </span>
                            </div>
                        </div>

                        {/* Platform Action Buttons */}
                        <div className="flex flex-wrap items-center gap-3 mt-4">
                            {platforms.length > 0 ? platforms.map((p: any, idx: number) => {
                                const Icon = p.platform.toLowerCase() === 'spotify' ? FiMusic : p.platform.toLowerCase() === 'youtube' ? FiYoutube : FiExternalLink;
                                return (
                                    <a 
                                        key={idx} 
                                        href={p.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        onClick={onExternalClick}
                                        className="py-2 px-4 bg-[#1F2128CC] border border-[#24262E80] text-[#7B899D] rounded-[23px] flex items-center gap-2 hover:bg-white/5 transition-all text-[11px] md:text-[13px] font-[400] h-10 no-underline"
                                    >
                                        <Icon className="text-[#00CCFF]" />
                                        <span className="capitalize">{p.platform}</span>
                                    </a>
                                );
                            }) : (
                                <p className="text-[#7B899D] text-xs orbitron italic">Listen on your favorite platforms soon.</p>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PodcastHeader