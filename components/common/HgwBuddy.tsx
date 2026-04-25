"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import AiModal from './AiModal'

const HgwBuddy = () => {
    const [isAiModalOpen, setIsAiModalOpen] = useState(false)

    return (
        <>
            <div 
                onClick={() => setIsAiModalOpen(true)}
                className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[50] group cursor-pointer" 
                role="complementary" 
                aria-label="HGW Buddy Assistant"
            >
                <div className="relative">
                    <Image
                        src="/assets/robot.png"
                        alt="HGW Interactive Buddy"
                        width={100}
                        height={100}
                        className="w-16 h-16 md:w-24 md:h-24 drop-shadow-[0_0_20px_rgba(0,204,255,0.5)] animate-bounce hover:scale-110 transition-transform duration-300"
                        style={{ animationDuration: '3s' }}
                    />
                    <div className="absolute -top-14 right-0 bg-[#1F2128]/95 backdrop-blur-sm border border-[#00CCFF]/20 text-white px-5 py-2.5 rounded-2xl text-[13px] opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap outfit pointer-events-none shadow-[0_4px_20px_rgba(0,0,0,0.4)] translate-y-2 group-hover:translate-y-0">
                        <div className="relative flex items-center gap-2 font-medium">
                            <span className="w-1.5 h-1.5 bg-[#00CCFF] rounded-full animate-pulse" />
                            Need help ranking someone?
                        </div>
                        {/* Tooltip Arrow */}
                        <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#1F2128] border-r border-b border-[#00CCFF]/20 rotate-45" />
                    </div>
                </div>
            </div>

            <AiModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
        </>
    )
}

export default HgwBuddy
