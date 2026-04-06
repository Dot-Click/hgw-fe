"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiSearch, FiZap, FiTarget, FiGlobe } from "react-icons/fi";
import { LuBrain, LuSwords, LuTrophy, LuUsers } from "react-icons/lu";
import { Button, InputGroup } from "@heroui/react";
import AiModal from "../common/AiModal";

const HomeHeader = () => {
  const router = useRouter();
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

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

      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl text-center gap-4 px-6">

        {/* Top Badge */}
        <div className="flex items-center gap-2 px-4 py-1 rounded-full border border-[#00CCFF4D] tracking-wider bg-[#00CCFF1A] text-[#00CCFF] text-[10px] md:text-[12px] outfit font-[500]  uppercase">
          <FiZap className="text-sm" aria-hidden="true" />
          The Ultimate Ranking System
        </div>

        {/* Main Hero Header */}
        <div className="flex flex-col gap-1">
          <div className="text-[32px] md:text-[63px] flex flex-wrap items-center orbitron font-[900] leading-tight">
            <h1 className="    text-[#00CCFF] text-shadow-[0px_-5px_25.6px_#00CCFF6E]">How  <span className="text-[#FFFFFF] text-shadow-[0px_-5px_25.6px_#00000020]">GOOD</span> WAS</h1>
          </div>
          <p className="text-[#7B899D] font-[400] text-[16px] md:text-[20px] outfit leading-relaxed">
            Archive of the Untouchable. Graded on Domination.
          </p>
        </div>

        {/* Search Bar Section */}
        <div className="w-full max-w-3xl mt-2">
          <InputGroup className="h-14 md:h-16 px-6 bg-[#111217CC] backdrop-blur-xl border border-[#00CCFF] rounded-[18px] flex items-center gap-4 transition-all shadow-[0_0_10px_rgba(0,204,255,0.15)] group">
            <InputGroup.Prefix>
              <FiSearch className="text-[#00CCFF] text-xl md:text-2xl" aria-hidden="true" />
            </InputGroup.Prefix>
            <InputGroup.Input
              id="hero-search"
              type="text"
              aria-label="Search for a legend"
              placeholder="How Good Was Ronaldo?"
              className="bg-transparent outline-none w-full text-white outfit text-[16px] md:text-[20px] placeholder:text-[#7B899D]"
            />
          </InputGroup>
        </div>

        {/* Cta Buttons */}
        <div className="flex flex-col md:flex-row items-center gap-4 mt-2">
          <Button
            onPress={() => router.push("/leaderboard")}
            id="explore-leaderboard-btn"
            className="w-full md:w-auto px-8 py-7 bg-[#00CCFF] text-[#0B0B0F] font-[700] rounded-[12px] flex items-center gap-3 orbitron text-[14px] md:text-[16px] shadow-[0_0_25px_rgba(0,204,255,0.3)] hover:bg-[#00B8E6] transition-all"
          >
            <LuTrophy className="text-2xl" aria-hidden="true" />
            Explore Leaderboard
          </Button>

          <Button
            onPress={() => router.push("/death-match")}
            id="start-deathmatch-btn"
            className="w-full md:w-auto px-8 py-7 bg-[#1F2128] text-[#7B899D] font-bold rounded-[14px] flex items-center gap-3 orbitron text-[14px] md:text-[16px] border border-[#24262E] hover:text-white hover:bg-[#24262E] transition-all"
          >
            <LuSwords className="text-xl" aria-hidden="true" />
            Start Death Match
          </Button>
        </div>

        {/* Footer Stats Line */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mt-8 opacity-80">
          <div className="flex items-center gap-2.5 text-[#AFAFAF] text-[12px] md:text-[16px] outfit font-[400] tracking-wide">
            <LuUsers className="text-[#00CCFF] text-lg" aria-hidden="true" />
            <span className="sr-only">Stat: </span>10,000+ Legends Ranked
          </div>
          <div className="flex items-center gap-2.5 text-[#AFAFAF] text-[12px] md:text-[16px] outfit font-[400] tracking-wide">
            <FiGlobe className="text-[#00CCFF] text-lg" aria-hidden="true" />
            <span className="sr-only">Coverage: </span>30+ Sports Covered
          </div>
          <div className="flex items-center gap-2.5 text-[#AFAFAF] text-[12px] md:text-[16px] outfit font-[400] tracking-wide">
            <LuBrain className="text-[#00CCFF] text-lg" aria-hidden="true" />
            <span>AI Powered HGW Analysis</span>
          </div>
        </div>

      </div>

      {/* Robot Mascot Buddy */}
      <div 
        onClick={() => setIsAiModalOpen(true)}
        className="absolute bottom-0 right-4 md:bottom-0 md:right-[12%] z-20 group cursor-pointer" role="complementary" aria-label="HGW Buddy Assistant"
      >
        <div className="relative">
          <Image
            src="/assets/robot.png"
            alt="HGW Interactive Buddy"
            width={80}
            height={80}
            className="w-16 h-16 md:w-20 md:h-20 drop-shadow-[0_0_15px_rgba(0,204,255,0.4)] animate-bounce"
            style={{ animationDuration: '3s' }}
          />
          <div className="absolute -top-12 right-0 bg-[#1F2128] border border-[#24262E] text-white px-4 py-2 rounded-2xl text-[12px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap outfit pointer-events-none">
            Need help ranking someone?
          </div>
        </div>
      </div>

      <AiModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
    </header>
  );
};

export default HomeHeader;
