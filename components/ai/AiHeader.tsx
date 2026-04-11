"use client"

import React from "react"
import Image from "next/image"

const AiHeader = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-4 pb-4 border-b border-zinc-800/50">
      <div className="flex items-center gap-5">
        {/* Avatar/Icon with Premium Gradient Glow */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-tr from-[#00D4FF] via-[#7000FF] to-[#00D4FF] rounded-full blur-md opacity-25 group-hover:opacity-40 transition duration-700 animate-pulse"></div>
          <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#111A2C] border-2 border-[#2A3040] shadow-2xl flex items-center justify-center p-2.5 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/10 to-[#7000FF]/10 z-0" />
            <Image 
              src="/assets/robot.png" 
              alt="Katy AI" 
              width={64} 
              height={64} 
              className="relative z-10 drop-shadow-[0_0_8px_rgba(0,212,255,0.4)]"
            />
          </div>
        </div>
          
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-[900] text-white orbitron tracking-tight leading-none">
              Katy AI
            </h1>
          </div>
          <p className="text-sm md:text-base text-zinc-400 outfit tracking-wide font-[400]">
            Your intelligent legend analysis assistant.
          </p>
        </div>
      </div>
 
      <div className="flex items-center self-end md:self-center">
        <div className="px-5 py-2 rounded-full border border-green-500/20 bg-green-500/10 flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[11px] font-bold text-green-500 uppercase tracking-[0.1em] orbitron">
            Online
          </span>
        </div>
      </div>
    </div>
  )
}

export default AiHeader
