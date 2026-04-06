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
        <div className="fixed bottom-6 right-6 md:right-10 z-[100] flex flex-col items-end gap-4 animate-in fade-in slide-in-from-bottom-10 duration-300">
            {/* Modal Container */}
            <div className="w-[320px] md:w-[410px] bg-[#0E1015] border border-[#24262E] rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden">
                
                {/* Header */}
                <div className="p-5 border-b border-[#24262E] flex items-center justify-between bg-[#111217]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#1F2128] flex items-center justify-center p-1.5 border border-[#24262E]">
                            <Image src="/assets/robot.png" alt="Katy" width={40} height={40} />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <h3 className="text-[#E7EBEF] font-[700] text-[18px] orbitron tracking-wide leading-tight">Katy</h3>
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></div>
                                <p className="text-[#7B899D] font-[400] text-[12px] outfit tracking-wide">HGW AI Assistant · Online</p>
                            </div>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-1.5 text-[#7B899D] hover:text-white transition-colors"
                    >
                        <FiX size={20} />
                    </button>
                </div>

                {/* Chat Content */}
                <div className="p-5 flex flex-col gap-6 max-h-[420px] overflow-y-auto custom-scrollbar bg-[#0E1015]">
                    {/* Welcome Message with Avatar */}
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#1F2128] flex items-center justify-center p-1 shrink-0">
                            <Image src="/assets/robot.png" alt="Bot" width={30} height={30} />
                        </div>
                        <div className="bg-[#1F2128] border border-[#24262E] p-4 rounded-[20px] rounded-tl-none">
                            <p className="text-[#D1D9E0] text-[14px] leading-relaxed outfit font-[400]">
                                Hey! I&apos;m Katy, your HGW Legend Vault assistant. Ask me about any legend &mdash; who&apos;s the GOAT, why someone&apos;s ranked higher, or anything about the 10 Pillars. 🏆
                            </p>
                        </div>
                    </div>

                    {/* Suggestions */}
                    <div className="flex flex-wrap gap-2.5 pl-11">
                        {suggestions.map((text, i) => (
                            <button 
                                key={i}
                                className="px-4 py-2 rounded-full border border-[#00CCFF33] bg-[#00CCFF05] text-[#00CCFF] text-[13px] font-[400] outfit hover:bg-[#00CCFF1A] hover:border-[#00CCFF] hover:shadow-[0_0_15px_rgba(0,204,255,0.2)] transition-all duration-300 text-left"
                            >
                                {text}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Input Section */}
                <div className="p-5 bg-[#111217] border-t border-[#24262E] flex items-center gap-3">
                    <div className="relative flex-grow">
                        <input 
                            type="text"
                            placeholder="Ask Katy about any legend..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-full bg-[#1F2128] border border-[#24262E] rounded-2xl py-3.5 px-5 pr-12 text-[14px] text-white placeholder-[#4A5567] outline-none focus:border-[#00CCFF33] transition-all"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4A5567] hover:text-[#00CCFF] cursor-pointer transition-colors">
                            <IoMicOutline size={20} />
                        </div>
                    </div>
                    <button 
                        className={cn(
                            "w-[54px] h-[54px] rounded-2xl flex items-center justify-center transition-all duration-300 shrink-0",
                            inputValue 
                                ? "bg-[#00CCFF] text-[#0B0B0F] shadow-[0_0_20px_rgba(0,204,255,0.4)]" 
                                : "bg-[#1F2128] text-[#00CCFF] border border-[#24262E]"
                        )}
                    >
                        <IoSend size={22} className={cn(inputValue ? "translate-x-0.5" : "text-[#00CCFF80]")} />
                    </button>
                </div>
            </div>

            {/* Floating Action Button (FAB) */}
            <button 
                onClick={onClose}
                className="p-5 rounded-full hidden md:flex bg-[#00CCFF]  hover:bg-[#08b1db] cursor-pointer  items-center justify-center text-[#0B0B0F] shadow-[0_0_30px_rgba(0,204,255,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 group"
            >
                <FiX size={32} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
        </div>
    );
};

export default AiModal;