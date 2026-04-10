"use client"

import React from "react"
import { FiSend } from "react-icons/fi"
import { HiOutlineSparkles } from "react-icons/hi"
import Image from "next/image"

const AskKaty = () => {      
  const suggestions = [
    "Compare Michael Jordan and LeBron James",
    "Who has the best HGW score in football?",
    "Analyze the top 5 tennis players",    
    "Generate a report on boxing legends"     
  ]
 
  return (                   
    <div className="flex flex-col h-full bg-[#0E1015]/50 border border-[#24262E] rounded-[24px] overflow-hidden backdrop-blur-sm">
      {/* Header */}
      <div className="p-4 border-b border-[#24262E] flex items-center gap-3 bg-[#111217]/50">
        <HiOutlineSparkles className="text-[#00CCFF]" size={18} />
        <h2 className="text-white font-[700] orbitron tracking-wide text-base">Ask Katy</h2>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-6 custom-scrollbar">
        {/* Katy Message */}
        <div className="flex gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#1F2128] border border-[#24262E] flex items-center justify-center p-1.5 shrink-0 shadow-lg">
            <Image src="/assets/robot.png" alt="Katy" width={24} height={24} />
          </div>   
          <div className="bg-[#111217] border border-[#24262E] p-4 rounded-[20px] rounded-tl-none max-w-[90%] shadow-inner">
            <p className="text-[#E7EBEF] font-[600] text-[14px] outfit mb-3 leading-relaxed">
              Hello! I'm Katy, your AI assistant for the HGW Legend Vault. I can help you with:
            </p>
            <ul className="space-y-2 mb-4">
              {[
                "Comparing players across different sports",
                "Analyzing HGW scores and metrics",
                "Generating reports and insights",
                "Answering questions about legend rankings"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-[#7B899D] text-[13px] outfit group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00CCFF] group-hover:scale-125 transition-transform" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-[#E7EBEF] font-[700] text-[14px] outfit tracking-wide">
              What would you like to know?
            </p>
          </div>
        </div>

        {/* Suggestions */}
        <div className="flex flex-wrap gap-2 pt-2">
          {suggestions.map((text, i) => (
            <button 
              key={i}
              className="px-3.5 py-2 rounded-xl border border-[#24262E] bg-[#111217] text-[#7B899D] text-[12px] outfit font-medium hover:border-[#00CCFF]/30 hover:text-[#00CCFF] hover:bg-[#00CCFF]/5 transition-all duration-300"
            >
              {text}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-[#24262E] bg-[#111217]/30">
        <div className="relative group">
          <input 
            type="text"
            placeholder="Ask Katy anything..."
            className="w-full h-12 bg-[#111217] border border-[#24262E] rounded-2xl px-5 pr-28 text-white placeholder-[#4A5567] outline-none focus:border-[#00CCFF]/30 transition-all text-sm outfit"
          />
          <button className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#00D4FF] to-[#7000FF] text-[#0B0F19] px-5 h-9 rounded-xl flex items-center justify-center gap-2 font-black orbitron text-[10px] uppercase tracking-[0.1em] shadow-[0_0_15px_rgba(0,212,255,0.2)] hover:shadow-[0_0_25px_rgba(0,212,255,0.4)] transition-all">
            <FiSend size={12} />
            Send
          </button>
        </div>
      </div>

    </div>
  )
}

export default AskKaty
