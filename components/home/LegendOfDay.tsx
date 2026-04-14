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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#00CCFF1A] blur-[100px] pointer-events-none -z-10" />

      {/* Hero-like Title for the section */}
      <div className="flex items-center gap-2 mb-6 uppercase orbitron tracking-[0.2em] text-[12px] md:text-[16px] font-[700] text-[#FFBF00] uppercase">
        <span className="text-2xl"><CiStar /></span>
        Legend of the Week
      </div>

      {/* Main Legend Card */}
      <div className="relative group cursor-pointer">
    
        <div className="w-[300px] md:w-[400px] bg-[#0A0B0FEE] backdrop-blur-xl border border-[#FFBF00] rounded-[28px] shadow-[0px_0px_10px_5px_#FFBF004D] overflow-hidden">
          
          {/* Top Player Image Container */}
          <div className="relative w-full h-[280px] md:h-[350px] overflow-hidden mb-4 md:mb-6 border border-[#24262E66]">
            <Image
              src="/assets/player1.png"
              alt="Legend of the Day - Player"
              fill
              sizes="(max-width: 768px) 300px, 400px"
              className="object-cover"
            />
            
            {/* Score Badge - Top Right */}
            <div className="absolute top-4 right-4 bg-[#FFB800] text-black font-black orbitron text-[13px] md:text-[15px] px-3 md:px-3.5 py-1 md:py-1.5 rounded-xl shadow-[0_4px_15px_rgba(255,184,0,0.5)] z-20">
              94.8
            </div>
            
            {/* Gradient Overlays for Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0FBF] via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
          </div>

          {/* Player Details Container */}
          <div className="flex flex-col px-6 md:px-8 gap-4 md:gap-5 pb-5">
            
            {/* Header: Name and Profession */}
            <div className="flex flex-col gap-1 md:gap-1.5">
              <h3 className="orbitron text-[20px] md:text-[24px] font-[700] text-[#E7EBEF] tracking-tight ">
                Bob Marley
              </h3>
              <p className="outfit text-[#7B899D] text-[13px] md:text-[18px] font-[400] tracking-wide">
                Vocalist / Songwriter
              </p>
            </div>

            {/* Stats Row 1: Years and Origin */}
            <div className="flex items-center gap-4 md:gap-6 text-[#7B899D] text-[14px] md:text-[16px] outfit font-normal">
              <div className="flex items-center gap-1.5 md:gap-2">
                <FiCalendar className="text-[#00CCFF80] text-base md:text-lg" aria-hidden="true" />
                <span>1960s—1980s</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <FiMapPin className="text-[#00CCFF80] text-base md:text-lg" aria-hidden="true" />
                <span>Jamaica</span>
              </div>
            </div>

            {/* Stats Row 2: Category and Global Users */}
            <div className="flex items-center justify-between mt-0.5 md:mt-1">
              <Chip
                className="bg-[#A855F726] text-[#C084FC] border border-[#A855F733] outfit text-[12px] md:text-[14px] h-6 md:h-7 font-[500] uppercase tracking-[0.1em] px-3 md:px-4"
                variant="soft"
              >
                Music
              </Chip>
              
              <div className="flex items-center gap-2 md:gap-2.5 text-[#7B899D] text-[14px] md:text-[16px] outfit font-[500]">
                <BsTrophy className="text-[#FFFFFF66]" aria-hidden="true" />
                <span>6</span>
              </div>
            </div>   

            {/* Score Visualization: Progress Bar */}
            <div className="flex flex-col gap-2 md:gap-3 mt-1 md:mt-2">
              <div className="flex items-center justify-between text-[12px] md:text-[14px] tracking-[0.15em] mb-0.5">
                <span className="text-[#7B899D] outfit font-[500]">HGW SCORE</span>
                <span className="text-[#FFBF00] orbitron font-[700]">94.8</span>
              </div>
              {/* Progress bar matches the mockup style better */}
              <div 
                className="w-full h-[10px] md:h-[12px] bg-[#1B1C22] rounded-full overflow-hidden shadow-inner"
                role="progressbar"
                aria-label="HGW Score Progress"
                aria-valuenow={94.8}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div 
                  className="h-full bg-[linear-gradient(90deg,_rgba(255,191,0,0.8)_0%,_#FFBF00_100%)] rounded-full shadow-[0_0_12px_rgba(255,184,0,0.5)] transition-all duration-1000 ease-out"
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