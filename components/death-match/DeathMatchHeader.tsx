"use client";

import React from "react";
import Image from "next/image";
import { LuSwords, LuX, LuCrown } from "react-icons/lu";
import { FiMapPin } from "react-icons/fi";
import { Button } from "@heroui/react";

import { PlayerSelection } from "./DeathMatchContainer";

interface DeathMatchHeaderProps {
  player1: PlayerSelection | null;
  player2: PlayerSelection | null;
  activeSlot: 1 | 2;
  setActiveSlot: (slot: 1 | 2) => void;
  onResetSlot: (slot: 1 | 2) => void;
  onStartMatch: () => void;
  isMatchStarted: boolean;
}


const getCategoryStyles = (category: string) => {
  switch (category?.toUpperCase()) {
    case "FOOTBALL":
      return "bg-[#00CCFF26] text-[#00CCFF] border-[#00CCFF33]";
    case "MUSIC":
      return "bg-[#A855F726] text-[#C084FC] border-[#A855F733]";
    case "RUGBY":
      return "bg-[#FFBF0026] text-[#FFBF00] border-[#FFBF0033]";
    default:
      return "bg-[#00CCFF26] text-[#00CCFF] border-[#00CCFF33]";
  }
};

const DeathMatchHeader = ({
  player1,
  player2,
  activeSlot,
  setActiveSlot,
  onResetSlot,
  onStartMatch,
  isMatchStarted
}: DeathMatchHeaderProps) => {                           

  const isMatchReady = player1 && player2;

  const renderSlot = (slot: 1 | 2, player: PlayerSelection | null) => {
    const isActive = activeSlot === slot;

    return (
      <div
        onClick={() => setActiveSlot(slot)}
        className={`w-full md:w-[460px] h-[200px] orbitron flex flex-col items-center justify-center rounded-[16px] relative cursor-pointer transition-all duration-300 ${isActive
            ? "border border-[#00CCFF] bg-[#00CCFF]/[0.05] shadow-[0_0_30px_rgba(0,204,255,0.2)]"
            : player
              ? "border border-white/5 bg-[#111217] shadow-xl"
              : "border border-dashed border-[#2A2E3B] bg-[#0B0B0F]/40 backdrop-blur-sm hover:border-[#3A455C]"
          } overflow-hidden group`}
      >
        {player ? (
          <div className="flex flex-col items-center justify-center w-full h-full p-4 relative">
            {/* Rank Badge - Matching Image */}
            <div className={`absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full border orbitron text-[10px] font-[700] ${slot === 1
                ? "border-[#FFBF004D] bg-[#FFBF0033] text-[#FFBF00]"
                : "border-[#7B899D4D] bg-transparent text-[#7B899D]"    
              }`}>
              {slot === 1 && <LuCrown className="text-xs shrink-0" />}           
              <span>{slot === 1 ? "#1" : "#4"}</span>      
            </div>                            
  
            {/* Reset Button (Subtle) */}
            <button   
              onClick={(e) => {
                e.stopPropagation();  
                onResetSlot(slot);
              }}  
              className="absolute top-3 right-3 p-1 rounded-full bg-white/5 text-[#7B899D] opacity-0 group-hover:opacity-100 hover:text-white transition-all z-20"
            >            
              <LuX className="text-xs" />    
            </button>

            {/* Circular Image Container (Scaled to 200px height) */}
            <div className="w-[68px] h-[68px] rounded-full border border-white/10 overflow-hidden mb-2 flex-shrink-0">     
              <Image     
                src={player.image}                 
                alt={player.name}                                      
                width={68}        
                height={68}          
                className="object-cover object-top w-full h-full"
              />                      
            </div>                              
                                       
            {/* Name */}
            <h2 className="orbitron text-[#E7EBEF] text-[18px] font-[700] tracking-wide text-center mb-1 leading-tight">
              {player.name}     
            </h2>
     
            {/* Category & Tags Row */}
            <div className="flex items-center gap-3 mb-3">
              <div className={`border text-[10px] px-2 py-1 rounded-full uppercase tracking-widest font-[500] outfit ${getCategoryStyles(player.category || "Unknown")}`}>
                {player.category || "FOOTBALL"}                       
              </div>     
              <div className="flex items-center gap-1 text-[#7B899D] text-[12px] tracking-wide font-[500] outfit leading-none">
                <FiMapPin className="text-[12px]" />
                <span>{player.country}</span>
              </div>
            </div>          
   
            {/* Score */}
            <div className={`orbitron text-[24px] font-[900] leading-none tracking-wide drop-shadow-[0_0_10px_rgba(0,204,255,0.4)] ${slot === 1 ? "text-[#00CCFF]" : "text-[#FFBF00]"
              }`}>
              {player.rating?.toFixed(1)}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">   
            <div className={`w-[65px] h-[65px] rounded-full border border-dashed flex items-center justify-center mb-1 transition-colors ${isActive ? "border-[#00CCFF] bg-[#00CCFF]/10" : "border-[#3A455C] group-hover:border-[#7B899D]"
              }`}>
              <span className={`text-[26px] font-[400] transition-colors bg-transparent ${isActive ? "text-[#00CCFF]" : "text-[#7B899D] group-hover:text-white"
                }`}>?</span>
            </div>
            <span className="text-[#7B899D99] text-[12px] tracking-wider font-[700]">Player {slot}</span>
            <div className="h-[20px] flex items-center justify-center mt-1">
              {isActive && (
                <span className="text-[#00CCFF] text-[10px] tracking-wider font-[400] animate-bounce">Select below</span>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

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
          <LuSwords className="text-sm" aria-hidden="true" />
          Head-to-Head Analysis
        </div>

        {/* Main Hero Header */}
        <div className="flex flex-col gap-1">
          <div className="text-[32px] md:text-[63px] flex flex-wrap justify-center items-center orbitron font-[900] leading-tight">
            <h1 className="    text-[#00CCFF]  text-shadow-[0px_-5px_25.6px_#00CCFF6E] ">HGW  <span className=" text-[#FFFFFF]   text-shadow-[0px_-5px_25.6px_#00000020]">Comparison Tool</span></h1>
          </div> 
          <p className="text-[#7B899D] font-[400] text-[16px] md:text-[20px] outfit leading-relaxed">
            Select two legends and compare their HGW pillar scores side byside          </p>
        </div>

        {/* Matchup Container */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8 w-full max-w-[800px]">
          {renderSlot(1, player1)}

          {/* VS Badge */}                                  
          <div className="w-[54px] h-[54px] shrink-0 rounded-full border border-[#FFBF0066] bg-[#0B0B0F] bg-[#FFBF001A] shadow-[0_0_20px_rgba(255,191,0,0.3)] flex flex-col items-center justify-center z-10">
            <span className="text-[#FFBF00] font-[900] orbitron text-[20px] tracking-wider">VS</span>
          </div>

          {renderSlot(2, player2)}          
        </div>

        {/* Small Start Match Button */}
        {isMatchReady && !isMatchStarted && (
          <div className="mt-8">
            <Button
              onClick={onStartMatch}
              className="py-1 px-4 h-auto rounded-[8px] bg-[#00CCFF] text-[#0B0B0F] font-bold orbitron text-[12px] md:text-[14px] tracking-widest shadow-[0_0_15px_#00CCFF4D] hover:bg-[#00CCFFDD] transition-all"
            >
              START MATCH
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default DeathMatchHeader;
