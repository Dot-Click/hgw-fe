"use client";

import { useState } from 'react'
import { Card, Button } from "@heroui/react"
import { FiCalendar, FiClock, FiArrowRight, FiUser, FiFileText, FiChevronDown, FiSliders } from "react-icons/fi"
import { BsTrophy } from 'react-icons/bs';
import { BiSortAlt2 } from "react-icons/bi";

const LeaderBoardHeader = () => {
    const [selectedCategory, setSelectedCategory] = useState("All Sports");

    const categories = ["All Sports", "Football", "Rugby", "Music"];

    return (
        <section className=" pt-28 pb-20 relative flex flex-col items-center">
            {/* Centered outer container to "stuck" the content's horizontal position */}
            <div className="w-full max-w-[1400px] px-6 md:px-12 lg:px-20 flex flex-col">
                <div className="max-w-6xl w-full flex flex-col gap-5">

                    {/* Header Section */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-[#00CCFF] border border-[#00CCFF4D] bg-[#00CCFF1A] rounded-full w-fit px-2 py-1  tracking-wide  font--[500]">
                            <span className="text-[16px]   md:text-[14px]"> <BsTrophy /></span>
                            <span className='text-[10px] md:text-[14px] uppercase'>GLOBAL RANKINGS</span>
                        </div>
                        <div className="text-[32px] md:text-[56px] flex flex-wrap items-center gap-x-6 gap-y-2 orbitron font-[900] leading-tight">
                            <h1 className="text-[#FFFFFF] text-shadow-[0px_-5px_25.6px_#00000040]">Global  <span className="text-[#00CCFF] drop-shadow-[0px_-5px_25.6px_#00CCFF6E]">Leaderboard</span></h1>
                        </div>
                        <p className="text-[#7B899D] font-[400] text-[16px] md:text-[18px] outfit leading-relaxed max-w-2xl">
                            The definitive ranking of sporting and cultural legends, powered by the HGW scoring system.
                        </p>
                    </div>

                    {/* Filter Section */}
                    <div className="flex flex-wrap items-center gap-3">
                        <Button
                            className="px-[16px] py-[8px] rounded-[12px] bg-[#1F2128] text-[#E7EBEF] border border-[#24262E] hover:text-white hover:bg-[#24262E] outfit text-[12px] md:text-[15px] font-[400] transition-all duration-300 h-auto min-h-0"
                        >
                            <BiSortAlt2 className="text-[16px] " />
                            Highest HGW Score
                            <FiChevronDown className="text-[16px]" />
                        </Button>
                        
                        <Button
                            className="px-[16px] py-[8px] rounded-[12px] bg-[#1F2128] text-[#7B899D] border border-[#24262E] hover:text-white hover:bg-[#24262E] outfit text-[12px] md:text-[15px] font-[400] transition-all duration-300 h-auto min-h-0"
                        >
                            <FiSliders className="text-[16px]" />
                            Filters
                            <FiChevronDown className="text-[16px]" />
                        </Button>

                        {categories.map((cat) => (
                            <Button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-[16px] py-[8px] rounded-[12px] text-center outfit text-[12px] md:text-[15px] font-[500] transition-all duration-300 border h-auto min-h-0 ${selectedCategory === cat
                                    ? "bg-[#00CCFF] text-[#0B0B0F] border-[#00CCFF] shadow-[0_0_20px_rgba(0,204,255,0.4)]"
                                    : "bg-[#1F2128] text-[#7B899D] border-[#24262E] hover:text-white hover:bg-[#24262E]"
                                    }`}
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default LeaderBoardHeader;