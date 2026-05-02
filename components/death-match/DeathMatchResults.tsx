"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PlayerSelection } from "./DeathMatchContainer";
import { GoTrophy } from "react-icons/go";
import { Button, Spinner } from "@heroui/react";

interface DeathMatchResultsProps {
    player1: PlayerSelection;
    player2: PlayerSelection;
    onNewMatch: () => void;
}

const PILLARS = [
    { name: "Dominance", key: "dominance" },
    { name: "Longevity", key: "longevity" },
    { name: "Peak Performance", key: "peakPerformance" },
    { name: "Championships", key: "championships" },
    { name: "Records", key: "records" },
    { name: "Cultural Impact", key: "culturalImpact" },
    { name: "Clutch Factor", key: "clutchFactor" },
    { name: "Versatility", key: "versatility" },
    { name: "Rivalry", key: "rivalry" },
    { name: "Legacy", key: "legacy" },
];

const DeathMatchResults = ({
    player1,
    player2,
    onNewMatch,
}: DeathMatchResultsProps) => {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const res = await fetch("/api/death-match/result", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        player1Id: player1.id,
                        player2Id: player2.id,
                    }),
                });
                const data = await res.json();
                if (!res.ok) {
                    setResult({ error: data.error || "Failed to calculate match results." });
                } else {
                    setResult(data);
                }
            } catch (error) {
                console.error("Failed to fetch match result:", error);
                setResult({ error: "A network error occurred while fetching results." });
            } finally {
                setLoading(false);
            }
        };                                                                         
            
        fetchResult();
    }, [player1.id, player2.id]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] w-full">
                <Spinner size="lg" color="accent" />
                <p className="text-[#7B899D] orbitron text-xs mt-4 tracking-widest uppercase">Calculating Scores...</p>
            </div>
        );
    }

    if (!result || result.error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[300px] w-full bg-[#111217] border border-red-900/30 rounded-xl p-8 mt-10">
                <p className="text-red-400 orbitron text-sm mb-6">{result?.error || "Error loading results."}</p>
                <Button onClick={onNewMatch} className="bg-[#1F2128] text-white orbitron text-xs font-bold uppercase">
                    Try Again
                </Button>
            </div>
        );
    }

    const winnerId = result.winnerId;
    const score1 = result.score1 ?? 0;
    const score2 = result.score2 ?? 0;

    return (
        <div className="pb-20 flex flex-col items-center w-full mt-10 relative overflow-hidden">
            <div className="flex flex-col items-center w-full max-w-[1050px] px-6">
                {/* Overall HGW Score Card */}
                <div className="w-full bg-[linear-gradient(102.05deg,_#1B1C22_0%,_#0D0E12_100%)] border border-gray-800 rounded-[12px] flex flex-col justify-center items-center p-8 mb-8 relative overflow-hidden">
                    <div className="flex justify-center items-center mb-6">
                        <h2 className="text-[#7B899D] orbitron text-[12px] tracking-widest font-[400] uppercase">Overall HGW Score</h2>
                    </div>
                    <div className="flex items-around justify-between px-4 md:px-10 gap-4 w-full md:gap-10">
                        <div className={`text-center transition-all duration-500 ${winnerId === player1.id ? "scale-110" : "opacity-60"}`}>
                            <div className={`text-[28px] md:text-[42px] font-[900] orbitron leading-none mb-1 ${winnerId === player1.id ? "text-[#00CCFF] drop-shadow-[0_0_15px_rgba(0,204,255,0.4)]" : "text-[#7B899D]"}`}>
                                {typeof score1 === 'number' ? score1.toFixed(2) : score1}
                            </div>
                            <div className="text-[#7B899D99] text-[10px] md:text-[12px] outfit font-[400] tracking-widest uppercase truncate max-w-[100px] md:max-w-none">{player1.name}</div>
                            {winnerId === player1.id && <div className="text-[#00CCFF] text-[10px] orbitron mt-1 font-bold">WINNER</div>}
                        </div>

                        <div className="flex flex-col items-center justify-center">
                            <div className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-[#FFBF000D] border border-[#FFBF004D] shadow-[0_0_20px_rgba(255,191,0,0.2)] ${!winnerId ? "grayscale" : ""}`}>
                                <GoTrophy className="text-[#FFBF00] text-2xl md:text-3xl" />
                            </div>
                            {!winnerId && <div className="text-[#7B899D] text-[10px] orbitron mt-2 font-bold tracking-widest">DRAW</div>}
                        </div> 

                        <div className={`text-center transition-all duration-500 ${winnerId === player2.id ? "scale-110" : "opacity-60"}`}>
                            <div className={`text-[28px] md:text-[42px] font-[900] orbitron leading-none mb-1 ${winnerId === player2.id ? "text-[#FFBF00] drop-shadow-[0_0_15px_rgba(255,191,0,0.4)]" : "text-[#7B899D]"}`}>
                                {typeof score2 === 'number' ? score2.toFixed(2) : score2}
                            </div>
                            <div className="text-[#7B899D99] text-[10px] md:text-[12px] outfit font-[400] tracking-widest uppercase truncate max-w-[100px] md:max-w-none">{player2.name}</div>
                            {winnerId === player2.id && <div className="text-[#FFBF00] text-[10px] orbitron mt-1 font-bold">WINNER</div>}
                        </div>
                    </div>
                </div>

                {/* Pillar Breakdown Section */}
                <div className="w-full bg-[#111217] border border-white/5 rounded-[16px] p-6 md:p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-[#7B899D] orbitron text-[14px] tracking-widest font-[400] uppercase">Pillar Breakdown</h2>
                    </div>

                    <div className="flex flex-col gap-8 w-full">
                        {PILLARS.map((pillar) => {
                            const p1Score = result.player1.scores[pillar.key];
                            const p2Score = result.player2.scores[pillar.key];
                            const isWinner1 = p1Score > p2Score;
                            const isWinner2 = p2Score > p1Score;

                            return (
                                <div key={pillar.key} className="flex flex-col w-full gap-3">
                                    <div className="flex items-center justify-between w-full">
                                        <span className={`orbitron text-[13px] md:text-[16px] font-[800] tabular-nums ${isWinner1 ? "text-[#00CCFF]" : "text-[#7B899D]"}`}>
                                            {typeof p1Score === 'number' ? (p1Score * 10).toFixed(2) : p1Score}
                                        </span>
                                        <span className="outfit text-[11px] md:text-[13px] tracking-[2px] font-[500] text-[#7B899D] uppercase">
                                            {pillar.name}
                                        </span>
                                        <span className={`orbitron text-[13px] md:text-[16px] font-[800] tabular-nums ${isWinner2 ? "text-[#FFBF00]" : "text-[#7B899D]"}`}>
                                            {typeof p2Score === 'number' ? (p2Score * 10).toFixed(2) : p2Score}
                                        </span>
                                    </div>

                                    <div className="flex w-full gap-2 md:gap-3">
                                        <div className="w-full h-[10px] bg-[#0A1A20] rounded-sm overflow-hidden">
                                            <div
                                                className={`h-full rounded-sm transition-all duration-1000 ${isWinner1 ? "bg-[#00CCFF] shadow-[0_0_12px_rgba(0,204,255,0.6)]" : "bg-[#00CCFF44]"}`}
                                                style={{ width: `${p1Score * 10}%` }}
                                            />
                                        </div>
                                        <div className="w-full h-[10px] bg-[#1A1400] rounded-sm overflow-hidden">
                                            <div
                                                className={`h-full rounded-sm transition-all duration-1000 ${isWinner2 ? "bg-[#FFBF00] shadow-[0_0_12px_rgba(255,191,0,0.6)]" : "bg-[#FFBF0044]"}`}
                                                style={{ width: `${p2Score * 10}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Reset Button */}
                <div className="mt-12">
                    <Button
                        onClick={onNewMatch}
                        className="py-3 px-8 h-auto rounded-[8px] bg-[#1F2128] border border-[#24262E] text-[#E7EBEF] orbitron text-[13px] tracking-widest hover:border-white/30 hover:bg-white/5 transition-all font-bold uppercase shadow-xl"
                    >
                        Start New Match
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DeathMatchResults;