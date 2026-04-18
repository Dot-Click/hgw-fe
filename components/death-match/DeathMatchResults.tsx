import React from "react";
import Image from "next/image";
import { PlayerSelection } from "./DeathMatchContainer";
import { LuSwords, LuCrown } from "react-icons/lu";
import { FiMapPin } from "react-icons/fi";
import { Button } from "@heroui/react";
import { GoTrophy } from "react-icons/go";

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
        <div className="pb-20 flex flex-col items-center w-full mt-10 relative overflow-hidden">
            <div className="flex flex-col items-center w-full max-w-[1050px] px-6">
                {/* Overall HGW Score Card */}
                <div className="w-full bg-[linear-gradient(102.05deg,_#1B1C22_0%,_#0D0E12_100%)] border border-gray-800 rounded-[12px] flex flex-col justify-center items-center p-8 mb-8 relative overflow-hidden">
                    <div className="flex justify-center items-center mb-6">
                        <h2 className="text-[#7B899D] orbitron text-[12px] ml-[56px] tracking-widest font-[400] uppercase">Overall HGW Score</h2>
                    </div>
                    <div className="flex items-around justify-between px-4 md:px-10 gap-4  w-full     md:gap-10">
                        <div className="text-center group">
                            <div className="text-[#00CCFF] text-[28px] md:text-[36px] font-[900] orbitron leading-none mb-1 drop-shadow-[0_0_15px_rgba(0,204,255,0.3)]">{player1.rating?.toFixed(1)}</div>
                            <div className="text-[#7B899D99] text-[10px] md:text-[12px] outfit font-[400] tracking-widest uppercase truncate max-w-[80px] md:max-w-none">{player1.name}</div>
                        </div>
                        <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#FFBF000D] border border-[#FFBF004D] shadow-[0_0_20px_rgba(255,191,0,0.1)]">
                            <GoTrophy className="text-[#FFBF00] text-lg md:text-xl" />
                        </div>
                        <div className="text-center group">
                            <div className="text-[#7B899D] text-[28px] md:text-[36px] font-[900] orbitron leading-none mb-1 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">{player2.rating?.toFixed(1)}</div>
                            <div className="text-[#7B899D99] text-[10px] md:text-[12px] outfit font-[400] tracking-widest uppercase truncate max-w-[80px] md:max-w-none">{player2.name}</div>
                        </div>
                    </div>
                </div>

                {/* Pillar Breakdown Section */}
                <div className="w-full bg-[#111217] border border-white/5 rounded-[16px] p-6 md:p-7">
                    <div className="text-center mb-5">
                        <h2 className="text-[#7B899D] orbitron text-[14px] tracking-widest font-[400] uppercase">Pillar Breakdown</h2>
                    </div>

                    <div className="flex flex-col gap-6 w-full">
                        {PILLARS.map((pillar, index) => {
                            const score1 = getPillarScore(player1.rating || 90, index, true);
                            const score2 = getPillarScore(player2.rating || 90, index, false);
                            const isWinner1 = score1 > score2;
                            const isWinner2 = score2 > score1;

                            return (
                                <div key={pillar.key} className="flex flex-col w-full gap-2">
                                    {/* Row 1: Score | Pillar Name | Score */}
                                    <div className="flex items-center justify-between w-full">
                                        <span className={`orbitron text-[11px] md:text-[13.5px] font-[700] tabular-nums ${isWinner1 ? "text-[#00CCFF]" : "text-[#7B899D]"}`}>
                                            {score1.toFixed(0)}
                                        </span>
                                        <span className="outfit text-[10px] md:text-[12px] tracking-[0.5px] font-[400] text-[#7B899D] uppercase">
                                            {pillar.name}
                                        </span>
                                        <span className={`orbitron text-[11px] md:text-[13.5px] font-[700] tabular-nums ${isWinner2 ? "text-[#FFBF00]" : "text-[#7B899D]"}`}>
                                            {score2.toFixed(0)}
                                        </span>
                                    </div>

                                    {/* Row 2: Two separate stacked bars */}
                                    <div className="flex w-full gap-1.5">
                                        {/* Cyan bar — Player 1 */}
                                        <div className="w-full h-[8px] md:h-[10px] bg-[#0A1A20] rounded-sm overflow-hidden">
                                            <div
                                                className={`h-full rounded-sm transition-all duration-700 ${isWinner1 ? "bg-[linear-gradient(90deg,rgba(0,204,255,0.6)_0%,#00CCFF_100%)] shadow-[0_0_16px_rgba(0,204,255,0.4)]" : "bg-[#00CCFF66]"}`}
                                                style={{ width: `${score1}%` }}
                                            />
                                        </div>     
                                        {/* Gold bar — Player 2 */}
                                        <div className="w-full h-[8px] md:h-[8px] bg-[#1A1400] rounded-sm overflow-hidden">
                                            <div
                                                className={`h-full rounded-sm transition-all duration-700 ${isWinner2 ? "bg-[linear-gradient(90deg,#FFBF00_0%,rgba(255,191,0,0.6)_100%)] shadow-[0_0_16px_rgba(204,170,0,0.4)]" : "bg-[#FFBF0066]"}`}
                                                style={{ width: `${score2}%` }}
                                            />
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
                        Reset
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DeathMatchResults;