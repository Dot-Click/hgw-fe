"use client";

import { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiMapPin, FiCalendar, FiAward, FiStar, FiArrowRight, FiLock, FiMail } from "react-icons/fi";
import { BsTrophy } from "react-icons/bs";
import { useParams, notFound } from "next/navigation";
import { PLAYERS_DATA } from '@/data/players';
import { CgFileDocument } from 'react-icons/cg';

const PlayerDetail = () => {
    const params = useParams();
    const playerId = Number(params.id);
    const player = PLAYERS_DATA.find(p => p.id === playerId);

    if (!player) {
        return notFound();
    }

    const playerMetadata = [
        { icon: FiMapPin, text: player.location },
        { icon: FiCalendar, text: player.lifespan },
        { icon: BsTrophy, text: player.era }
    ];

    const careerHighlights = [
        "Global ambassador of reggae music",
        "Legend album - best-selling reggae album ever",
        "Rock and Roll Hall of Fame inductee"
    ];

    const majorTrophiesPills = [
        { icon: BsTrophy, text: "Global ambassador of reggae music" },
        { icon: FiAward, text: "Legend album - best-selling reggae album ever" },
        { icon: FiStar, text: "Rock and Roll Hall of Fame inductee" }
    ];

    const pillarsData = [
        { label: "Longevity", score: 78 },
        { label: "Peak Dominance", score: 98 },
        { label: "Statistical Output", score: 85 }
    ];

    return (
        <section className="min-h-screen pt-28 pb-20 relative flex flex-col items-center">
            {/* Centered outer container to "stuck" the content's horizontal position */}
            <div className="w-full max-w-[1400px] px-4 md:px-12 lg:px-20 flex flex-col">
                <div className="max-w-7xl w-full flex flex-col gap-3">

                    {/* Header Section */}
                    <Link href="/database" className="text-[#7B899D] text-[13px] outfit font-normal hover:text-white tracking-wider transition-colors group mb-4 md:mb-0">
                        <span className="flex items-center gap-2">
                            <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span>Back to Vault</span>
                        </span>
                    </Link>

                    <div className='flex flex-col gap-8 md:gap-12 w-full'>
                        {/* Player Hero Section */}
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 relative w-full">

                            {/* Left Column: Image & Trophies */}
                            <div className="flex flex-col items-center md:items-start gap-2 shrink-0 md:w-[230px]">

                                {/* Image Wrapper */}
                                <div className="relative group">
                                    <div
                                        className="relative rounded-[16px] overflow-hidden bg-zinc-900 shadow-[0_0_25px_rgba(0,204,255,0.25)] w-[180px] h-[180px] md:w-[230px] md:h-[230px]"
                                    >
                                        <Image
                                            src={player.image}
                                            alt={player.name}
                                            fill
                                            sizes="(max-width: 768px) 180px, 230px"
                                            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                            priority
                                            quality={80}
                                        />
                                    </div>

                                    {/* Score Badge */}
                                    <div className="absolute -bottom-3 right-1/2 translate-x-1/2 md:translate-x-0 md:right-0 orbitron bg-[#FF8A00] text-[#0B0B0F] font-[900] px-3 py-1 rounded-md text-[16px] md:text-[18px] tracking-wide shadow-[0_4px_15px_rgba(255,138,0,0.6)] z-10">
                                        {player.score}
                                    </div>
                                </div>

                            </div>

                            {/* Info */}
                            <div className="flex flex-col items-center md:items-start gap-3 w-full">

                                {/* Name */}
                                <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
                                    <div className="font-[900] orbitron leading-[1.1] md:leading-none flex flex-wrap justify-center md:justify-start gap-2 md:gap-3 text-[25px] md:text-[30px] lg:text-[40px] xl:text-[60px]">
                                        <h1 className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{player.name}</h1>
                                        <span className="text-[#00CCFF] drop-shadow-[0_0_15px_rgba(0,204,255,0.4)]">{player.lastName}</span>
                                    </div>

                                    <p className="text-[#00CCFF] outfit text-[14px] md:text-[20px] font-[400] mt-1 md:mt-0">
                                        {player.role}
                                    </p>
                                </div>

                                {/* Metadata */}
                                <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 md:gap-6 text-[#7B899D] text-[12px] md:text-[13px] mt-1">
                                    {playerMetadata.map((meta, index) => (
                                        <div key={index} className="flex items-center gap-1.5 md:gap-2">
                                            <meta.icon className="text-[#7B899D] text-[14px] md:text-[16px]" />
                                            <span className="outfit whitespace-nowrap font-[400]">{meta.text}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Tags */}
                                <div className="flex justify-center md:justify-start gap-2 mt-2 flex-wrap">
                                    {player.tags?.map((tag, index) => (
                                        <div
                                            key={index}
                                            className="px-3 py-1 rounded-full bg-[#1F2128]  text-[#D1D9E0] text-[12px] md:text-[14px] outfit font-[400]"
                                        >
                                            {tag}
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>

                        {/* Major Trophies Box */}
                        <div className="w-full max-w-[300px] bg-[linear-gradient(118.35deg,_#1B1C22_0%,_#0D0E12_100%)] border border-[#24262E] rounded-[20px] flex flex-col items-center justify-center py-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] mx-auto md:mx-0">
                            <BsTrophy className="text-[#00CCFF] text-[20px] md:text-[22px] mb-3" />
                            <span className="text-[#E7EBEF] text-[18px] md:text-[20px] font-[700] orbitron leading-none">{player.trophies}</span>
                            <span className="text-[#7B899D] text-[12px] md:text-[14px] font-[400] outfit tracking-[0.1em] uppercase mt-2 opacity-80">Major Trophies</span>
                        </div>

                        <div className="flex flex-col gap-6 w-full">
                            {/* Full-Width Major Trophies List */}
                            <div className="w-full bg-[linear-gradient(118.35deg,_#1B1C22_0%,_#0D0E12_100%)] border border-[#FFBF004D] rounded-[22px] p-5 shadow-lg flex flex-col gap-6 md:gap-8">
                                {/* Top row: Title and Badge */}
                                <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 sm:gap-0">
                                    <div className="flex items-center gap-3">
                                        <BsTrophy className="text-[#FFBF00] text-[18px] md:text-[20px]" />
                                        <span className="text-[#E7EBEF] text-[16px] md:text-[18px] font-bold orbitron tracking-wide">Major Trophies</span>
                                    </div>
                                    <h2 className=" text-[#FFBF00] text-[18px] md:text-[20px] font-[700] orbitron drop-shadow-[0px_0px_20px_0px_#FFBF0026,0px_0px_6px_0px_#FFBF0066]">
                                        {player.trophies}
                                    </h2>
                                </div>

                                {/* Bottom row: Pills */}
                                <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 md:gap-4">
                                    {majorTrophiesPills.map((pill, index) => (
                                        <div key={index} className="flex items-center gap-2 bg-[#1F2128] border border-[#24262E] rounded-full px-4 py-2 md:px-6 md:py-2.5">
                                            <pill.icon className="text-[#FFBF00] text-[16px] md:text-[18px]" />
                                            <span className="text-[#D1D9E0] text-[13px] md:text-[16px] outfit font-[400] tracking-wide text-center">{pill.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Career Highlights Box */}
                            <div className="w-full bg-[linear-gradient(118.35deg,_#1B1C22_0%,_#0D0E12_100%)] border border-[#24262E] rounded-[22px] p-5 md:p-6 flex flex-col gap-6">
                                <h2 className="text-[#E7EBEF] text-[16px] md:text-[19px] font-[700] orbitron tracking-wider text-center md:text-left">Career Highlights</h2>

                                <ul className="flex flex-col gap-3 md:gap-2.5">
                                    {careerHighlights.map((highlight, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-sm bg-[#FFBF00] shrink-0 mt-1 md:mt-1.5" />
                                            <span className="text-[#D1D9E0] text-[13px] md:text-[16px] outfit tracking-wide md:tracking-[0.15em] uppercase font-[300]">
                                                {highlight}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* HGW Analysis */}
                            <div className="w-full bg-[linear-gradient(118.35deg,_#1B1C22_0%,_#0D0E12_100%)] border border-[#24262E] rounded-[22px] p-5 md:p-6 flex flex-col gap-3">
                                <h2 className="text-[#E7EBEF] text-[16px] md:text-[19px] font-[700] orbitron tracking-wider text-center md:text-left">HGW Analysis</h2>
                                <p className="text-[#D1D9E0] text-[14px] md:text-[16px] outfit font-[400] text-center md:text-left">
                                    Bob Marley transcended music to become a global symbol of peace, resistance, and unity. His influence on music, culture, and politics remains immeasurable decades after his passing.
                                </p>
                            </div>

                            {/*HGW Breakdown*/}
                            <div className="w-full bg-[linear-gradient(118.35deg,_#1B1C22_0%,_#0D0E12_100%)] rounded-[22px] p-5 shadow-lg flex flex-col gap-5">
                                {/* Top row: Title and Badge */}
                                <div className="flex items-center md:items-start gap-2 md:gap-3 flex-col justify-start w-full text-center md:text-left">
                                    <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-3">
                                        <CgFileDocument className="text-[#00CCFF] text-[18px] md:text-[20px]" />
                                        <span className="text-[#E7EBEF] text-[16px] md:text-[18px] font-bold orbitron tracking-wide">HGW Breakdown</span>
                                    </div>
                                    <p className=" text-[#7B899D] text-[13px] md:text-[14px] font-[400] outfit tracking-wide md:tracking-[0.1em] ">
                                        This article explains how Bob Marley was scored using the 10 Pillars of Domination.
                                    </p>
                                </div>
                                {/* Inner Block: Understanding the System */}
                                <div className="w-full bg-[#1F212899] border border-[#24262E] rounded-[12px] p-5 md:p-4.5 flex flex-col items-center md:items-start gap-4">
                                    <h3 className="text-[#E7EBEF] text-[15px] md:text-[16px] font-[700] orbitron tracking-wide text-center md:text-left">
                                        Understanding the HGW Scoring System
                                    </h3>
                                    <p className="text-[#E7EBEF] text-[13px] md:text-[14px] outfit font-[400] leading-[1.6] text-center md:text-left">
                                        The HGW (Historical Greatness Weighting) system evaluates legends across 10 proprietary pillars — from raw statistical output to cultural legacy and era-adjusted dominance. Each pillar is weighted and calibrated against peers to produce a definitive score.
                                    </p>
                                    <Link href="#" className="flex items-center justify-center md:justify-start gap-2 text-[#00CCFF] text-[13px] md:text-[14px] font-[700] orbitron hover:opacity-80 transition-opacity mt-1">
                                        Read Full Article <FiArrowRight className="text-[14px] md:text-[16px]" />
                                    </Link>
                                </div>
                            </div>

                            {/* 10 Pillars of Domination */}
                            <div className="w-full bg-[linear-gradient(118.35deg,_#1B1C22_0%,_#0D0E12_100%)] border border-[#00CCFF4D] rounded-[22px] p-5 md:p-6 flex flex-col gap-6 relative overflow-hidden">

                                {/* Header */}
                                <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3 sm:gap-0">
                                    <h2 className="text-[#E7EBEF] text-[16px] md:text-[18px] font-[700] orbitron tracking-wide text-center md:text-left">
                                        10 Pillars of <span className="text-[#00CCFF] tracking-widest leading-relaxed sm:leading-normal block sm:inline">D-O-M-I-N-A-T-I-O-N</span>
                                    </h2>
                                    <FiLock className="text-[#7B899D] text-[16px] md:text-[19px] hidden sm:block" />
                                </div>

                                {/* Progress Bars */}
                                <div className="flex flex-col gap-4 w-full mt-2 sm:mt-0">
                                    {pillarsData.map((pillar, index) => (
                                        <div key={index} className="flex flex-col gap-1.5 md:gap-1 w-full">
                                            <div className="flex justify-between items-center text-[12px] md:text-[13px] outfit text-[#A0AEC0]">
                                                <span className="text-[#D1D9E0] font-[400] outfit text-[13px] md:text-[14px]">{pillar.label}</span>
                                                <span className="text-[#00CCFF] font-[700] tracking-wider orbitron text-[12px] md:text-[13px]">{pillar.score}</span>
                                            </div>
                                            <div className="w-full h-[5px] bg-[#1A1C23] border border-[#24262E]/50 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-[#00CCFF] rounded-full shadow-[0_0_10px_#00CCFF66]"
                                                    style={{ width: `${pillar.score}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Unlock Full Analysis Box */}
                                <div className="w-full bg-[#1F2128] border border-[#24262E] rounded-[22px] p-5 md:p-6 flex flex-col items-center justify-center gap-1 mt-2">
                                    <div className="w-[42px] h-[42px] rounded-full bg-[#00CCFF1A] flex items-center justify-center mb-2 md:mb-4">
                                        <FiMail className="text-[#00CCFF] text-[18px] md:text-[20px]" />
                                    </div>
                                    <h3 className="text-[#E7EBEF] text-[15px] md:text-[16px] font-[700] orbitron tracking-wide text-center">
                                        Unlock Full Analysis
                                    </h3>
                                    <p className="text-[#7B899D] font-[400] text-[12px] md:text-[14px] outfit text-center px-2">
                                        Enter your email to access the complete 10 Pillars breakdown
                                    </p>

                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4 w-full max-w-[460px]">
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            className="bg-[linear-gradient(90deg,_#1C1E26_0%,_rgba(28,30,38,0.8)_100%)] border font-[400] border-[#24262E] rounded-[12px] px-4 py-3 w-full text-[#7B899D] text-center sm:text-left outfit text-[13px] md:text-[14px] outline-none placeholder:text-[#505A6F] flex-1"
                                        />
                                        <button className="bg-[#00CCFF] text-[#0B0B0F] font-[700] orbitron text-[14px] md:text-[15px] px-8 py-3 rounded-[12px] shadow-[0_0_20px_#00CCFF4D] hover:bg-[#00CCFF]/80 cursor-pointer transition-transform shrink-0 w-full sm:w-auto">
                                            Unlock
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlayerDetail;
