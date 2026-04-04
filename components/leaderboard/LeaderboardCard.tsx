import React from 'react';
import Image from 'next/image';
import { FiMapPin } from 'react-icons/fi';

export interface LeaderboardCardProps {
  id: number;
  rank: number;
  name: string;
  category: string;
  country: string;
  rating: number;
  image: string;
  isSelected?: boolean;
  onSelect?: () => void;
}

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'football': 
      return 'text-[#00CCFF] border-[#00CCFF]';
    case 'music': 
      return 'text-[#A855F7] border-[#A855F7]';
    case 'rugby': 
      return 'text-[#FFBF00] border-[#FFBF00]';
    default: 
      return 'text-gray-400 border-gray-400';
  }
};

const LeaderboardCard = ({
  id, rank, name, category, country, rating, image, isSelected, onSelect
}: LeaderboardCardProps) => {

  const rankColor = rank <= 3 
    ? 'text-[#FFBF00] border-[#FFBF00] bg-[#FFBF00]/10' 
    : 'text-[#7B899D] border-[#3A455C] bg-[#1B1C224D]';

  return (
    <div 
      onClick={onSelect}
      className={`relative w-full h-[240px] sm:h-[320px] rounded-[16px] bg-[#111217] flex flex-col overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
        isSelected 
          ? 'border border-[#00CCFF] shadow-[0_0_20px_#00CCFF4D] z-10' 
          : 'border border-[#2A2E3B] hover:border-[#3A455C] hover:shadow-lg'
      }`}
    >
      {/* Optional Inner Glow if Selected */}
      {isSelected && (
        <div className="absolute inset-0 rounded-[16px] shadow-[inset_0_0_20px_#00CCFF4D] pointer-events-none z-20"></div>
      )}

      {/* Rank Badge */}
      <div className={`absolute top-4 right-4 w-[28px] h-[28px] rounded-full border flex items-center justify-center z-30 text-[11px] orbitron font-bold backdrop-blur-md ${rankColor}`}>
        {rank}
      </div>

      {/* Image Container */}
      <div className="w-full h-[60%] relative flex-shrink-0 bg-[#0B0F19]">
        {/* Subtle gradient overlay at the bottom of the image for smooth blend */}
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          priority={rank <= 4}
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow p-3 sm:p-5 pt-0 sm:pt-0 justify-between z-10 relative">
        <h3 className="orbitron text-white text-[13px] sm:text-[16px] font-[500] truncate mt-1">{name}</h3>
        
        <div className="flex items-center gap-1 sm:gap-3 mt-1 sm:mt-2">
          <div className={`text-[8px] sm:text-[9px] uppercase tracking-wider px-2 py-[2px] rounded-full border ${getCategoryColor(category)}`}>
            {category}
          </div>
          <div className="flex items-center gap-1 text-[#7B899D] text-[9px] sm:text-[11px] outfit truncate">
            <FiMapPin className="text-[#3A455C] shrink-0" />
            <span className="truncate">{country}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-1 sm:pt-2">
          <span className="text-[#7B899D] text-[10px] sm:text-[12px] outfit tracking-wider uppercase font-medium">HGW</span>
          <span className="text-[#FFBF00] orbitron font-[700] text-[16px] sm:text-[20px] tracking-wide">{rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardCard;
