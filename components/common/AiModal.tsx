'use client';

import React, { useState } from 'react';
import { FiX, FiZap } from 'react-icons/fi';
import { IoSend, IoMicOutline } from 'react-icons/io5';
import { cn } from '@heroui/react';
import Image from 'next/image';

interface AiModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AiModal: React.FC<AiModalProps> = ({ isOpen, onClose }) => {
    const [inputValue, setInputValue] = useState('');

    const suggestions = [
        "Who is the GOAT in football?",
        "Why is Messi ranked #1?",
        "Explain the 10 pillars",
        "Compare Ronaldo vs Messi"
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 lg:right-10 z-[100] flex flex-col items-end gap-3 animate-in fade-in slide-in-from-bottom-10 duration-300">
            {/* Modal Container */}
            <div className="w-[280px] xs:w-[300px] md:w-[330px] lg:w-[360px] bg-[#0E1015] border border-[#24262E] rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden">
                
                {/* Header */}
                <div className="p-4 border-b border-[#24262E] flex items-center justify-between bg-[#111217]">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-lg bg-[#1F2128] flex items-center justify-center p-1 border border-[#24262E]">
                            <Image src="/assets/robot.png" alt="Katy" width={32} height={32} />
                        </div>
                        <div className="flex flex-col gap-0">
                            <h3 className="text-[#E7EBEF] font-[700] text-[16px] orbitron tracking-wide leading-tight">Katy</h3>
                            <div className="flex items-center gap-1">
                                <div className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse"></div>
                                <p className="text-[#7B899D] font-[400] text-[10px] outfit tracking-wide">Assistant · Online</p>
                            </div>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-1.5 text-[#7B899D] hover:text-white transition-colors"
                    >
                        <FiX size={18} />
                    </button>
                </div>

                {/* Chat Content */}
                <div className="p-4 flex flex-col gap-4 max-h-[320px] md:max-h-[380px] overflow-y-auto custom-scrollbar bg-[#0E1015]">
                    {/* Welcome Message with Avatar */}
                    <div className="flex gap-2.5">
                        <div className="w-7 h-7 rounded-md bg-[#1F2128] flex items-center justify-center p-1 shrink-0">
                            <Image src="/assets/robot.png" alt="Bot" width={24} height={24} />
                        </div>
                        <div className="bg-[#1F2128] border border-[#24262E] p-3 rounded-[18px] rounded-tl-none">
                            <p className="text-[#D1D9E0] text-[13px] leading-relaxed outfit font-[400]">
                                Hey! I&apos;m Katy. Ask me anything about the HGW Legend Vault or the 10 Pillars! 🏆
                            </p>
                        </div>
                    </div>

                    {/* Suggestions */}
                    <div className="flex flex-wrap gap-2 pl-9">
                        {suggestions.map((text, i) => (
                            <button 
                                key={i}
                                className="px-3 py-1.5 rounded-full border border-[#00CCFF33] bg-[#00CCFF05] text-[#00CCFF] text-[11px] font-[400] outfit hover:bg-[#00CCFF1A] hover:border-[#00CCFF] hover:shadow-[0_0_10px_rgba(0,212,255,0.2)] transition-all duration-300 text-left"
                            >
                                {text}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Input Section */}
                <div className="p-4 bg-[#111217] border-t border-[#24262E] flex items-center gap-2">
                    <div className="relative flex-grow">
                        <input 
                            type="text"
                            placeholder="Type a message..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-full bg-[#1F2128] border border-[#24262E] rounded-xl py-2.5 px-4 pr-10 text-[13px] text-white placeholder-[#4A5567] outline-none focus:border-[#00CCFF33] transition-all"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A5567] hover:text-[#00CCFF] cursor-pointer transition-colors">
                            <IoMicOutline size={18} />
                        </div>
                    </div>
                    <button 
                        className={cn(
                            "w-[44px] h-[44px] rounded-xl flex items-center justify-center transition-all duration-300 shrink-0",
                            inputValue 
                                ? "bg-[#00CCFF] text-[#0B0B0F] shadow-[0_0_15px_rgba(0,212,255,0.4)]" 
                                : "bg-[#1F2128] text-[#00CCFF] border border-[#24262E]"
                        )}
                    >
                        <IoSend size={18} className={cn(inputValue ? "translate-x-0.5" : "text-[#00CCFF80]")} />
                    </button>
                </div>
            </div>

            {/* Floating Action Button (FAB) */}
            <button 
                onClick={onClose}
                className="w-14 h-14 rounded-full hidden md:flex bg-[#00CCFF] hover:bg-[#08b1db] cursor-pointer items-center justify-center text-[#0B0B0F] shadow-[0_0_30px_rgba(0,212,255,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 group"
            >
                <FiX size={28} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>   
        </div>
    );
};

export default AiModal;