import React from "react";
import Image from "next/image";
import { PlayerSelection } from "./DeathMatchContainer";
import { LuSwords, LuCrown } from "react-icons/lu";
import { FiMapPin } from "react-icons/fi";
import { Button } from "@heroui/react";

interface DeathMatchResultsProps {
    player1: PlayerSelection;
    player2: PlayerSelection;
    onNewMatch: () => void;
}

const PILLARS = [
    { name: "Longevity", key: "longevity" },
    { name: "Peak Dominance", key: "peak" },
    { name: "Statistical Output", key: "stats" },
    { name: "Trophies & Honors", key: "trophies" },
    { name: "International Impact", key: "impact" },
    { name: "Clutch Factor", key: "clutch" },
    { name: "Cultural Legacy", key: "culture" },
    { name: "Innovation & Influence", key: "innovation" },
    { name: "Consistency", key: "consistency" },
    { name: "Era Dominance", key: "era" },
];

const DeathMatchResults = ({
    player1,
    player2,
    onNewMatch,
}: DeathMatchResultsProps) => {

    // Mock pillar data for visual demonstration
    const getPillarScore = (baseRating: number, index: number, isPlayer1: boolean) => {
        const variance = (index * 7 + (isPlayer1 ? 5 : 3)) % 15;
        return Math.min(100, Math.max(70, baseRating - variance + (index * 0.5)));
    };

    return (
        <div className="pb-20 flex flex-col items-center w-full relative overflow-hidden">
            <div className="flex flex-col items-center w-full max-w-5xl px-6">
                {/* Overall HGW Score Card */}
                <div className="w-full bg-[linear-gradient(102.05deg,_#1B1C22_0%,_#0D0E12_100%)] border border-gray-800 rounded-[12px] flex flex-col justify-center items-center p-8 mb-8 relative overflow-hidden">
                    <div className="flex justify-center items-center mb-6">
                        <h1 className="text-[#7B899D99] orbitron text-[12px] ml-12 tracking-wider font-[400] uppercase">Overall HGW Score</h1>
                    </div>
                    <div className="flex items-center justify-between px-4 md:px-10 gap-4 md:gap-10">
                        <div className="text-center group">
                            <div className="text-[#00CCFF] text-[28px] md:text-[36px] font-[900] orbitron leading-none mb-1 drop-shadow-[0_0_15px_rgba(0,204,255,0.3)]">{player1.rating?.toFixed(1)}</div>
                            <div className="text-[#7B899D99] text-[10px] md:text-[12px] outfit font-[400] tracking-widest uppercase truncate max-w-[80px] md:max-w-none">{player1.name}</div>
                        </div>
                        <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#FFBF000D] border border-[#FFBF004D] shadow-[0_0_20px_rgba(255,191,0,0.1)]">
                            <LuCrown className="text-[#FFBF00] text-lg md:text-xl" />
                        </div>
                        <div className="text-center group">
                            <div className="text-[#7B899D] text-[28px] md:text-[36px] font-[900] orbitron leading-none mb-1 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">{player2.rating?.toFixed(1)}</div>
                            <div className="text-[#7B899D99] text-[10px] md:text-[12px] outfit font-[400] tracking-widest uppercase truncate max-w-[80px] md:max-w-none">{player2.name}</div>
                        </div>
                    </div>
                </div>

                {/* Pillar Breakdown Section */}
                <div className="w-full bg-[#111217] border border-white/5 rounded-[16px] p-6 md:p-7">
                    <div className="text-center mb-10">
                        <h2 className="text-[#7B899D] orbitron text-[14px] tracking-widest font-[400] uppercase">Pillar Breakdown</h2>
                    </div>

                    <div className="flex flex-col gap-6 w-full">
                        {PILLARS.map((pillar, index) => {
                            const score1 = getPillarScore(player1.rating || 90, index, true);
                            const score2 = getPillarScore(player2.rating || 90, index, false);
                            const isWinner1 = score1 > score2;
                            const isWinner2 = score2 > score1;

                            return (
                                <div key={pillar.key} className="flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full group">
                                    {/* Mobile: Name on Top | Desktop: Left Score & Bar */}
                                    <div className="flex md:hidden w-full justify-center mb-1">
                                        <div className="text-[12px] font-medium tracking-wide text-[#7B899D] outfit uppercase opacity-80">
                                            {pillar.name}
                                        </div>
                                    </div>

                                    <div className="w-full flex items-center gap-3">
                                        {/* Score 1 */}
                                        <div className={`w-8 md:w-10 text-left orbitron text-[13px] md:text-[14px] font-bold ${isWinner1 ? "text-[#00CCFF] drop-shadow-[0_0_8px_rgba(0,204,255,0.4)]" : "text-[#5D6574]"}`}>
                                            {score1.toFixed(0)}
                                        </div>

                                        {/* Bar 1 */}
                                        <div className="flex-1 h-[8px] md:h-[13px] bg-[#1E1F26] rounded-full overflow-hidden flex justify-end">
                                            <div
                                                className={`h-full rounded-full transition-all duration-700 ${isWinner1 ? "bg-[#00CCFF] shadow-[0_0_12px_rgba(0,204,255,0.4)]" : "bg-[#00CCFF]/20"}`}
                                                style={{ width: `${score1}%` }}
                                            />
                                        </div>

                                        {/* Desktop Only: Name in Middle */}
                                        <div className="hidden md:block px-4 text-center orbitron text-[11px] font-bold tracking-widest text-[#7B899D] uppercase whitespace-nowrap min-w-[140px]">
                                            {pillar.name}
                                        </div>

                                        {/* Bar 2 */}
                                        <div className="flex-1 h-[8px] md:h-[13px] bg-[#1E1F26] rounded-full overflow-hidden flex justify-start">
                                            <div
                                                className={`h-full rounded-full transition-all duration-700 ${isWinner2 ? "bg-[#FFBF00] shadow-[0_0_12px_rgba(255,191,0,0.4)]" : "bg-[#FFBF00]/20"}`}
                                                style={{ width: `${score2}%` }}
                                            />
                                        </div>

                                        {/* Score 2 */}
                                        <div className={`w-8 md:w-10 text-right orbitron text-[13px] md:text-[14px] font-bold ${isWinner2 ? "text-[#FFBF00] drop-shadow-[0_0_8px_rgba(255,191,0,0.4)]" : "text-[#5D6574]"}`}>
                                            {score2.toFixed(0)}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* New Match Button */}
                <div className="mt-12">
                    <Button
                        onClick={onNewMatch}
                        className="py-2.5 px-5 h-auto rounded-[8px] bg-[#1F2128] border border-[#24262E] text-[#E7EBEF] orbitron text-[13px] tracking-widest hover:border-white/30 hover:bg-white/5 transition-all font-bold uppercase"
                    >
                        New Match
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DeathMatchResults;