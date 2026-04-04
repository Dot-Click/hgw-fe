"use client";

import React from "react";
import Image from "next/image";
import { FiSearch, FiZap, FiTarget, FiGlobe } from "react-icons/fi";
import { LuBrain, LuSwords, LuTrophy, LuUsers } from "react-icons/lu";
import { Button, CalendarGridBody, Card, Chip, InputGroup } from "@heroui/react";

const LeaderBoardHeader = () => {
  const [activeCard, setActiveCard] = React.useState<1 | 2>(1);
  return (
    <header className="min-h-[85vh] pt-24 md:pt-40 flex flex-col items-center justify-center relative w-full overflow-hidden">

      {/* Background Image Layer */}
      <div className="absolute inset-0 p-0 -z-10 pointer-events-none w-full h-full">
        <Image
          src="/assets/homeBg.jpg"
          alt="How Good Was - Legend Vault Background"
          fill
          className="object-cover h-full object-center"
          priority
        />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl text-center gap-3 px-6">

        {/* Top Badge */}
        <div className="flex items-center gap-2 px-4 py-1 tracking-[0.2rem] text-[#FFBF00] orbitron text-[10px] md:text-[12px] font-[700]  uppercase">
          <FiZap className="text-sm" aria-hidden="true" />
          Head-to-Head Analysis
        </div>

        {/* Main Hero Header */}
        <div className="flex flex-col gap-1">
          <div className="text-[32px] md:text-[63px] flex flex-wrap justify-center items-center orbitron font-[900] leading-tight">
            <h1 className="      text-[#FFFFFF] text-shadow-[0px_-5px_25.6px_#00000020]">Death  <span className="text-[#00CCFF] text-shadow-[0px_-5px_25.6px_#00CCFF6E]">MATCH</span></h1>
          </div>
          <p className="text-[#7B899D] font-[400] text-[16px] md:text-[20px] outfit leading-relaxed">
            Select two legends and compare their HGW pillar scores side byside          </p>
        </div>

        {/* Matchup Container */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8 w-full max-w-[800px]">
          
          {/* Player 1 Card */}
          <div 
            onClick={() => setActiveCard(1)}
            className={`w-full md:w-[460px] h-[200px] orbitron flex flex-col items-center justify-center gap-2 rounded-[16px] relative cursor-pointer group transition-all ${
              activeCard === 1 
                ? "border border-[#00CCFF] bg-[#00CCFF]/[0.02] shadow-[0_0_30px_#00CCFF26] backdrop-blur-[2px] hover:bg-[#00CCFF]/[0.05]" 
                : "border border-dashed border-[#2A2E3B] bg-black/20 backdrop-blur-sm hover:border-[#3A455C]"
            }`}
          >
            <div className={`w-[65px] h-[65px] rounded-full border border-dashed flex items-center justify-center mb-1 transition-colors ${
              activeCard === 1 ? "border-[#00CCFF] bg-[#00CCFF]/10" : "border-[#3A455C] group-hover:border-[#7B899D]"
            }`}>
              <h1 className={`text-[26px] font-[400] transition-colors bg-transparent ${
                activeCard === 1 ? "text-[#00CCFF]" : "text-[#7B899D] group-hover:text-white"
              }`}>?</h1>
            </div>
            <span className="text-[#7B899D99] text-[12px] tracking-wider">Player 1</span>
            <div className="h-[20px] flex items-center justify-center mt-1">
              {activeCard === 1 && (
                <span className="text-[#00CCFF] text-[10px] tracking-wider font-[400]">Select below</span>
              )}
            </div>
          </div>

          {/* VS Badge */}
          <div className="w-[54px] h-[54px] shrink-0 rounded-full border border-[#FFBF0066] bg-[#0B0B0F] bg-[#FFBF001A] shadow-[0_0_20px_rgba(255,191,0,0.3)] flex flex-col items-center justify-center z-10">
            <span className="text-[#FFBF00] font-[900] orbitron text-[20px] tracking-wider">VS</span>
          </div>

          {/* Player 2 Card */}
          <div 
            onClick={() => setActiveCard(2)}
            className={`w-full md:w-[460px] h-[200px] orbitron flex flex-col items-center justify-center gap-2 rounded-[16px] relative cursor-pointer group transition-all ${
              activeCard === 2
                ? "border border-[#00CCFF] bg-[#00CCFF]/[0.02] shadow-[0_0_30px_#00CCFF26] backdrop-blur-[2px] hover:bg-[#00CCFF]/[0.05]" 
                : "border border-dashed border-[#2A2E3B] bg-black/20 backdrop-blur-sm hover:border-[#3A455C]"
            }`}
          >
            <div className={`w-[65px] h-[65px] rounded-full border border-dashed flex items-center justify-center mb-1 transition-colors ${
              activeCard === 2 ? "border-[#00CCFF] bg-[#00CCFF]/10" : "border-[#3A455C] group-hover:border-[#7B899D]"
            }`}>
              <h1 className={`text-[26px] font-[400] transition-colors bg-transparent ${
                activeCard === 2 ? "text-[#00CCFF]" : "text-[#7B899D] group-hover:text-white"
              }`}>?</h1>
            </div>
            <span className="text-[#7B899D99] text-[12px] tracking-wider">Player 2</span>
            <div className="h-[20px] flex items-center justify-center mt-1">
              {activeCard === 2 && (
                <span className="text-[#00CCFF] text-[10px] tracking-wider font-[400]">Select below</span>
              )}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default LeaderBoardHeader;
