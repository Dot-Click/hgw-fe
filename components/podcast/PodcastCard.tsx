import React from 'react';
import Image from 'next/image';
import { Button } from '@heroui/react';
import { FiClock, FiCalendar, FiHeadphones, FiExternalLink } from 'react-icons/fi';
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
    episode: string;
    isPick?: boolean;
    category: string;
    title: string;
    description: string;
    duration: string;
    date: string;
    listeners: string;
    host: string;
    tags: string[];
    image: string;
}

const PodcastCard: React.FC<PodcastCardProps> = ({
    episode,
    isPick,
    category,
    title,
    description,
    duration,
    date,
    listeners,
    host,
    tags,
    image
}) => {
    const platforms = [
        { id: 1, name: 'Spotify' },
        { id: 2, name: 'Apple' },
        { id: 3, name: 'YouTube' }
    ];

    return (
        <div className="bg-[#111217] border border-[#24262E] rounded-[24px] overflow-hidden flex flex-col group transition-all hover:border-[#3D414E]">
            {/* Image Section */}
            <div className="relative aspect-video overflow-hidden">
                <Image 
                    src={image} 
                    alt={title} 
                    fill 
                    className="object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-100 transition-opacity">
                    <Button className="w-12 h-12 rounded-full bg-[#00CCFFE5] hover:bg-[#0aabd3] text-[#0B0B0F] min-w-0 p-0 shadow-[0_0_20px_rgba(0,204,255,0.4)] ">
                        <FaPlay  className="text-xl ml-0.5 text-white" />
                    </Button>
                </div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                    <div className="bg-[#111217CC] tracking-wider text-[#E7EBEF] px-3 py-1 rounded-full text-[11px] font-[600] orbitron">
                        {episode}
                    </div>
                    {isPick && (
                        <div className="bg-[#FFBF00E5] text-[#0B0B0F] px-3 py-1 rounded-full text-[11px] font-[600] outfit flex items-center gap-1">
                            <span className="text-[12px]"><GoStar /></span> Pick
                        </div>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col gap-3 flex-grow">
                {/* Category */}
                <div>
                    <span 
                        className={`px-3 py-1 rounded-full text-[11px] font-[600] tracking-wide outfit border ${getCategoryStyles(category)}`}
                    >
                        {category}
                    </span>
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
                        <span>{duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <FiCalendar className="" />
                        <span>{date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <FiHeadphones className="" />
                        <span>{listeners}</span>
                    </div>
                </div>

                {/* Host */}
                <div className="flex items-center gap-2 text-[#7B899D] text-[12px]  font-[400] tracking-wider outfit">
                    <IoPersonOutline className="text-[#FFBF00] text-sm" />
                    <span className="truncate">{host}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, idx) => (
                        <span key={idx} className="text-[#00CCFF] border border-[#24262E] px-2 py-1 bg-[#1F2128] rounded-[62px] hover:underline cursor-pointer text-[12px] font-[400] outfit">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Platform Buttons */}
            <div className=" gap-3 flex justify-start px-5 pt-1 pb-3 items-center">
                {platforms.map((platform) => (
                    <Button 
                        key={platform.id}
                        className="py-1 px-4 bg-[#1F2128CC] hover:text-white border border-[#24262E80] text-[#7B899D] rounded-[44px] flex items-center justify-center gap-1.5 hover:bg-white/5 transition-all text-[14px] font-[400]"
                    >
                        <FiExternalLink /> {platform.name}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default PodcastCard;
