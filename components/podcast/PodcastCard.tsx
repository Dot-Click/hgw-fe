import React from 'react';
import Image from 'next/image';
import { Button } from '@heroui/react';
import { FiClock, FiCalendar, FiHeadphones, FiExternalLink, FiYoutube, FiMusic } from 'react-icons/fi';
import { IoPersonOutline } from 'react-icons/io5';
import { GoStar } from 'react-icons/go';
import { FaPlay } from 'react-icons/fa';

const getCategoryStyles = (category: string) => {
    switch (category?.toUpperCase()) {
        case "FOOTBALL":
            return "bg-[#00CCFF26] text-[#00CCFF] border-[#00CCFF33]";
        case "MUSIC":
            return "bg-[#A855F726] text-[#C084FC] border-[#A855F733]";
        case "RUGBY":
            return "bg-[#FFBF0026] text-[#FFBF00] border-[#FFBF0033]";
        case "DEBATE":
            return "bg-[#EF444433] text-[#F87171] border-[#EF44444D]";
        case "CULTURE":
            return "bg-[#A855F726] text-[#C084FC] border-[#A855F733]";
        default:
            return "bg-[#00CCFF26] text-[#00CCFF] border-[#00CCFF33]";
    }
};

interface PodcastCardProps {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    featured?: boolean;
    isPick?: boolean;
    episodeNumber?: number;
    duration?: number;
    releaseDate?: string;
    listens?: number;
    category: { name: string; color?: string };
    createdBy: { name: string; image?: string };
    players: { id: string; name: string }[];
    guests?: { id: string; name: string }[];
    platforms: { platform: string; url: string }[];
    onPlay?: () => void;
    onExternalClick?: () => void;
}

const PodcastCard: React.FC<PodcastCardProps> = ({
    title,
    description,
    imageUrl,
    isPick,
    duration,
    releaseDate,
    episodeNumber, // Add episodeNumber here
    listens,
    category,
    createdBy,
    players,
    guests,
    platforms,
    featured, // Add featured to props
    onPlay,
    onExternalClick
}) => {
    return (
        <div className="bg-[#111217] border border-[#24262E] rounded-[24px] overflow-hidden flex flex-col group transition-all hover:border-[#3D414E]">
            {/* Image Section */}
            <div 
                onClick={onPlay}
                className="relative aspect-video overflow-hidden cursor-pointer"
            >
                <Image 
                    src={imageUrl} 
                    alt={title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-100 transition-opacity">
                    <Button 
                        onPress={onPlay}
                        className="w-12 h-12 rounded-full bg-[#00CCFFE5] hover:bg-[#0aabd3] text-[#0B0B0F] min-w-0 p-0 shadow-[0_0_20px_rgba(0,204,255,0.4)] transition-transform group-hover:scale-110"
                    >
                        <FaPlay  className="text-xl ml-0.5 text-white" />
                    </Button>
                </div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className="bg-[#0D0E12CC] backdrop-blur-md text-white/90 px-3 py-1.5 rounded-full text-[10px] font-[800] orbitron border border-white/10 tracking-widest shadow-lg">
                        EP #{episodeNumber || "0"}
                    </div>
                    {isPick && (
                        <div className="bg-[#FFBF00] text-[#0B0B0F] px-3.5 py-1.5 rounded-full text-[11px] font-[800] orbitron flex items-center gap-1.5 shadow-[0_0_20px_rgba(255,191,0,0.4)] border border-[#FFBF00]">
                            <GoStar className="text-[14px]" /> PICK
                        </div>
                    )}
                    {featured && (
                        <div className="bg-[#00CCFF] text-[#0B0B0F] px-4 py-1.5 rounded-full text-[11px] font-[800] orbitron flex items-center gap-1.5 shadow-[0_0_20px_rgba(0,204,255,0.4)] border border-[#00CCFF]">
                            <span className="text-[12px]"><GoStar className="animate-pulse" /></span> FEATURED
                        </div>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col gap-3 flex-grow">
                {/* Category */}
                <div className="flex justify-between items-center">
                    <span 
                        className={`px-3 py-1 rounded-full text-[11px] font-[600] tracking-wide outfit border ${getCategoryStyles(category.name)}`}
                    >
                        {category.name}
                    </span>
                    {listens !== undefined && (
                         <div className="flex items-center gap-1.5 text-[#7B899D] text-[12px] outfit">
                            <FiHeadphones className="" />
                            <span>{listens >= 1000 ? `${(listens / 1000).toFixed(1)}k` : listens}</span>   
                        </div>
                    )}
                </div>

                {/* Title & Description */}
                <div className="flex flex-col gap-2">
                    <h3 className="text-[14px] orbitron font-[700] text-[#E7EBEF] leading-tight tracking-widest line-clamp-2 uppercase">
                        {title}
                    </h3>
                    <p className="text-[#7B899D] text-[12px] outfit leading-snug line-clamp-3 font-[400]">
                        {description}
                    </p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-[#7B899D] text-[14px] outfit">
                    <div className="flex items-center gap-1.5">
                        <FiClock className="" />
                        <span>{duration || 0} min</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <FiCalendar className="" />
                        <span>{releaseDate ? new Date(releaseDate).toLocaleDateString() : 'N/A'}</span>
                    </div>
                </div>
               
                {/* Host */}
                <div className="flex items-center gap-2 text-[#7B899D] text-[12px]  font-[400] tracking-wider outfit">
                    <IoPersonOutline className="text-[#FFBF00] text-sm" />
                    <span className="truncate">Hosted by {createdBy.name}</span>
                </div>
   
                {/* Tags (Players & Guests) */}
                <div className="flex flex-wrap gap-2">
                    {players.map((player) => (
                        <span key={player.id} className="text-[#00CCFF] border border-[#24262E] px-2 py-1 bg-[#1F2128] rounded-[62px] hover:underline cursor-pointer text-[10px] font-bold orbitron uppercase tracking-widest">
                            {player.name}
                        </span>
                    ))}
                    {guests?.map((guest) => (
                        <span key={guest.id} className="text-purple-400 border border-[#24262E] px-2 py-1 bg-[#1F2128] rounded-[62px] hover:underline cursor-pointer text-[10px] font-bold orbitron uppercase tracking-widest">
                            {guest.name}
                        </span>
                    ))}
                </div>
            </div>

            {/* Platform Buttons */}
            <div className=" gap-3 flex flex-wrap justify-start px-5 pt-1 pb-4 items-center border-t border-white/5 bg-white/[0.02]">
                {platforms.map((platform, idx) => {
                    const Icon = platform.platform.toLowerCase() === 'spotify' ? FiMusic : platform.platform.toLowerCase() === 'youtube' ? FiYoutube : FiExternalLink;
                    return (
                        <a 
                            key={idx}
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={onExternalClick}
                            className="py-1.5 px-4 bg-[#1F2128CC] hover:text-white border border-[#24262E80] text-[#7B899D] rounded-[44px] flex items-center justify-center gap-1.5 hover:bg-white/5 transition-all text-[12px] font-[400]"
                        >
                            <Icon /> <span className="capitalize">{platform.platform}</span>
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

export default PodcastCard;
