'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { IoSend, IoMicOutline } from 'react-icons/io5';
import { cn } from '@heroui/react';
import Image from 'next/image';
import AiChart from './../ai/AiChart';
import { PLAYERS_DATA } from '@/data/players';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'katy';
    chart?: {
        data: any[];
        title: string;
        dataKey: string;
        nameKey: string;
    }
}

interface AiModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AiModal: React.FC<AiModalProps> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            sender: 'katy',
            text: "Hey! I'm Katy. Ask me anything about the HGW Legend Vault or the 10 Pillars! 🏆"
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    const suggestions = [
        "Top rugby players",
        "Explain the 10 pillars",
        "Compare Ronaldo vs Messi"
    ];

    const handleSend = (text: string = inputValue) => {
        if (!text.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            sender: 'user',
            text
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI Response
        setTimeout(() => {
            let katyResponse: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'katy',
                text: "Checking the vault..."
            };

            if (text.toLowerCase().includes('rugby') || text.toLowerCase().includes('top')) {
                const rugbyPlayers = PLAYERS_DATA.filter(p => p.category === 'RUGBY')
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 5)
                    .map(p => ({
                        name: p.lastName || p.name,
                        score: p.score
                    }));

                katyResponse = {
                    ...katyResponse,
                    text: "I've compiled the latest scores for the top rugby legends. Richie McCaw and Jonah Lomu are currently leading the rankings.",
                    chart: {
                        data: rugbyPlayers,
                        title: "Top 5 Rugby Legends",
                        dataKey: "score",
                        nameKey: "name"
                    }
                };
            } else {
                katyResponse.text = "I'm still learning more about that! But I can show you rankings for Rugby or Football players if you'd like.";
            }

            setMessages(prev => [...prev, katyResponse]);
            setIsTyping(false);
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 lg:right-10 z-[100] flex flex-col items-end gap-3 animate-in fade-in slide-in-from-bottom-10 duration-300">
            {/* Modal Container */}
            <div className="w-[320px] xs:w-[340px] md:w-[380px] lg:w-[420px] bg-[#0E1015] border border-[#24262E] rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden">
                
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
                <div className="p-4 flex flex-col gap-4 max-h-[400px] md:max-h-[500px] overflow-y-auto custom-scrollbar bg-[#0E1015]">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                            {msg.sender === 'katy' && (
                                <div className="w-7 h-7 rounded-md bg-[#1F2128] flex items-center justify-center p-1 shrink-0">
                                    <Image src="/assets/robot.png" alt="Bot" width={24} height={24} />
                                </div>
                            )}
                            <div className={`max-w-[85%] flex flex-col ${msg.sender === 'user' ? 'items-end' : ''}`}>
                                <div className={cn(
                                    "p-3 rounded-[18px] text-[13px] leading-relaxed outfit",
                                    msg.sender === 'katy' 
                                        ? "bg-[#1F2128] border border-[#24262E] text-[#D1D9E0] rounded-tl-none" 
                                        : "bg-[#00CCFF] text-[#0B0B0F] rounded-tr-none font-[600]"
                                )}>
                                    <p>{msg.text}</p>
                                    {msg.chart && (
                                        <div className="mt-2 text-left">
                                            <AiChart 
                                                data={msg.chart.data} 
                                                title={msg.chart.title} 
                                                dataKey={msg.chart.dataKey} 
                                                nameKey={msg.chart.nameKey} 
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex gap-2.5">
                            <div className="w-7 h-7 rounded-md bg-[#1F2128] flex items-center justify-center p-1 shrink-0">
                                <Image src="/assets/robot.png" alt="Bot" width={24} height={24} className="animate-pulse" />
                            </div>
                            <div className="bg-[#1F2128] border border-[#24262E] p-3 rounded-[18px] rounded-tl-none">
                                <div className="flex gap-1">
                                    <span className="w-1 h-1 bg-[#00CCFF] rounded-full animate-bounce" />
                                    <span className="w-1 h-1 bg-[#00CCFF] rounded-full animate-bounce [animation-delay:-0.15s]" />
                                    <span className="w-1 h-1 bg-[#00CCFF] rounded-full animate-bounce [animation-delay:-0.3s]" />
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <div ref={chatEndRef} />

                    {/* Suggestions */}
                    {messages.length === 1 && !isTyping && (
                        <div className="flex flex-wrap gap-2 pl-9">
                            {suggestions.map((text, i) => (
                                <button 
                                    key={i}
                                    onClick={() => handleSend(text)}
                                    className="px-3 py-1.5 rounded-full border border-[#00CCFF33] bg-[#00CCFF05] text-[#00CCFF] text-[11px] font-[400] outfit hover:bg-[#00CCFF1A] hover:border-[#00CCFF] hover:shadow-[0_0_10px_rgba(0,212,255,0.2)] transition-all duration-300 text-left"
                                >
                                    {text}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Input Section */}
                <div className="p-4 bg-[#111217] border-t border-[#24262E]">
                    <form 
                        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                        className="flex items-center gap-2"
                    >
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
                            type="submit"
                            disabled={!inputValue.trim() || isTyping}
                            className={cn(
                                "w-[44px] h-[44px] rounded-xl flex items-center justify-center transition-all duration-300 shrink-0",
                                inputValue 
                                    ? "bg-[#00CCFF] text-[#0B0B0F] shadow-[0_0_15px_rgba(0,212,255,0.4)]" 
                                    : "bg-[#1F2128] text-[#00CCFF80] border border-[#24262E]"
                            )}
                        >
                            <IoSend size={18} className={cn(inputValue ? "translate-x-0.5" : "")} />
                        </button>
                    </form>
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