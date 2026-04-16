"use client";

import React from "react";
import Image from "next/image";
import { HiOutlineBolt } from "react-icons/hi2";


const DominationHeader = () => {
    return (
        <header className="min-h-[50vh]  pt-32 md:pt-48 pb-20 flex flex-col items-center justify-center relative w-full overflow-hidden">


            <div className="relative z-10 flex flex-col items-center w-full max-w-5xl text-center gap-2 px-6 scale-[0.9] md:scale-100">
                {/* Top Badge/Tagline */}
                <div className="flex items-center gap-2 px-4 py-1 bg-[#00CCFF1A] border border-[#00CCFF33] rounded-full tracking-wider text-[#00CCFF] outfit text-[10px] md:text-[13px] font-[500] uppercase mb-1">
                    <span><HiOutlineBolt className="text-[16px]" /></span>
                    <span>THE ASSESSMENT FRAMEWORK</span>
                </div>

                {/* Main Hero Header */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-[30px] md:text-[55px] lg:text-[65px] orbitron font-[900] leading-tight tracking-[-0.02em]">
                        <span className=" text-[#FFFFFF]">D-O-M-I-N-A-T-I-O-</span>
                        <span className="text-[#00CCFF]">N</span>
                    </h1>
                    <div className="flex items-center w-full md:w-[700px] justify-center gap-4 mt-1">

                        <p className="text-[#7B899D] font-[400] text-[10px] md:text-[15px] outfit">
                            The proprietary scoring framework used by HGW to evaluate and rank the greatest
                            legends across sport and culture. Every legend is graded through the 7 Core Rules and
                            measured across the 10 Pillars of Domination.
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DominationHeader;