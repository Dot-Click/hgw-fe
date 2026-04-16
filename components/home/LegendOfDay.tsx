"use client";

import React from "react";
import Image from "next/image";
import { FiMapPin, FiCalendar, FiUsers } from "react-icons/fi";
import { Chip } from "@heroui/react";
import { CiStar } from "react-icons/ci";
import { BsTrophy } from "react-icons/bs";

const LegendOfDay = () => {
  return (
    <section className="w-full flex flex-col pt-3 items-center justify-center relative">
      
      {/* Glow effect behind the section - subtle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-[#00CCFF1A] blur-[80px] pointer-events-none -z-10" />

      {/* Hero-like Title for the section */}
      <div className="flex items-center gap-2 mb-4 uppercase orbitron tracking-[0.2em] text-[11px] md:text-[14px] font-[700] text-[#FFBF00] uppercase">
        <span className="text-xl"><CiStar /></span>
        Legend of the Week
      </div>

      {/* Main Legend Card */}
      <div className="relative group cursor-pointer">
    
        <div className="w-[280px] md:w-[340px] bg-[#0A0B0FEE] backdrop-blur-xl border border-[#FFBF00] rounded-[24px] shadow-[0px_0px_8px_4px_#FFBF004D] overflow-hidden">
          
          {/* Top Player Image Container */}
          <div className="relative w-full h-[240px] md:h-[300px] overflow-hidden mb-3 md:mb-5 border border-[#24262E66]">
            <Image
              src="/assets/player1.png"
              alt="Legend of the Day - Player"
              fill
              sizes="(max-width: 768px) 280px, 340px"
              className="object-cover"
            />
            
            {/* Score Badge - Top Right */}
            <div className="absolute top-3 right-3 bg-[#FFB800] text-black font-black orbitron text-[12px] md:text-[14px] px-2.5 md:px-3 py-1 md:py-1.5 rounded-lg shadow-[0_4px_12px_rgba(255,184,0,0.5)] z-20">
              94.8
            </div>
            
            {/* Gradient Overlays for Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0FBF] via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
          </div>

          {/* Player Details Container */}
          <div className="flex flex-col px-5 md:px-6 gap-3 md:gap-4 pb-4">
            
            {/* Header: Name and Profession */}
            <div className="flex flex-col gap-1 md:gap-1.5">
              <h3 className="orbitron text-[18px] md:text-[22px] font-[700] text-[#E7EBEF] tracking-tight ">
                Bob Marley
              </h3>
              <p className="outfit text-[#7B899D] text-[12px] md:text-[13px] font-[400] tracking-wide">
                Vocalist / Songwriter
              </p>
            </div>

            {/* Stats Row 1: Years and Origin */}
            <div className="flex items-center gap-3 md:gap-5 text-[#7B899D] text-[13px] md:text-[14px] outfit font-normal">
              <div className="flex items-center gap-1.5 md:gap-2">
                <FiCalendar className="text-[#00CCFF80] text-sm md:text-base" aria-hidden="true" />
                <span>1960s—1980s</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <FiMapPin className="text-[#00CCFF80] text-sm md:text-base" aria-hidden="true" />
                <span>Jamaica</span>
              </div>
            </div>

            {/* Stats Row 2: Category and Global Users */}
            <div className="flex items-center justify-between mt-0.5">
              <Chip
                className="bg-[#A855F726] text-[#C084FC] border border-[#A855F733] outfit text-[11px] md:text-[12px] h-5 md:h-6 font-[500] uppercase tracking-[0.1em] px-2 md:px-3"
                variant="soft"
              >
                Music
              </Chip>
              
              <div className="flex items-center gap-2 md:gap-2.5 text-[#7B899D] text-[13px] md:text-[15px] outfit font-[500]">
                <BsTrophy className="text-[#FFFFFF66]" aria-hidden="true" />
                <span>6</span>
              </div>
            </div>   

            {/* Score Visualization: Progress Bar */}
            <div className="flex flex-col gap-1.5 md:gap-2.5 mt-1">
              <div className="flex items-center justify-between text-[11px] md:text-[13px] tracking-[0.15em] mb-0.5">
                <span className="text-[#7B899D] outfit font-[500]">HGW SCORE</span>
                <span className="text-[#FFBF00] orbitron font-[700]">94.8</span>
              </div>
              {/* Progress bar matches the mockup style better */}
              <div 
                className="w-full h-[8px] md:h-[10px] bg-[#1B1C22] rounded-full overflow-hidden shadow-inner"
                role="progressbar"
                aria-label="HGW Score Progress"
                aria-valuenow={94.8}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div 
                  className="h-full bg-[linear-gradient(90deg,_rgba(255,191,0,0.8)_0%,_#FFBF00_100%)] rounded-full shadow-[0_0_10px_rgba(255,184,0,0.5)] transition-all duration-1000 ease-out"
                  style={{ width: '94.8%' }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
};

export default LegendOfDay;