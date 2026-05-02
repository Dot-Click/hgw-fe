"use client";

import React, { useEffect, useState } from 'react'
import { Card, cn, Spinner } from '@heroui/react'
import { FiTrendingUp, FiTrendingDown, FiMinus } from 'react-icons/fi'

const LeaderboardTable = () => {
  const [legends, setLegends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("/api/leaderboard");
        const data = await res.json();
        setLegends(data);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <Card className="bg-[#111A2C]/50 border border-[#1E293B] rounded-2xl p-12 flex items-center justify-center">
        <Spinner color="accent" />
      </Card>
    );
  }

  return (
    <Card className="bg-[#111A2C]/50 border border-[#1E293B] rounded-2xl p-6 sm:p-8 shadow-none animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center mb-8 px-2">
        <h3 className="text-sm font-bold text-white orbitron uppercase tracking-[0.1em]">Global Leaderboard</h3>
        <span className="text-[10px] text-zinc-500 orbitron uppercase tracking-widest">Sorted by Wins</span>
      </div>

      <div className="flex flex-col">
        {legends.length > 0 ? (
          legends.map((player, index) => {
            const rank = index + 1;
            const winRatio = player.totalMatches > 0 ? (player.wins / player.totalMatches * 100).toFixed(0) : "0";
            
            return (
              <div 
                key={player.id}
                className={cn(
                  "flex items-center justify-between py-5 px-2 group transition-all duration-300",
                  index !== legends.length - 1 ? "border-b border-[#1E293B]/60" : ""
                )}
              >
                {/* Rank & Player Info */}
                <div className="flex items-center gap-4 sm:gap-6">
                  <div 
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-black orbitron transition-transform group-hover:scale-110 shadow-sm",
                      rank === 1 ? "bg-[#FACC15] text-[#0B0F19]" :
                      rank === 2 ? "bg-[#94A3B8] text-[#0B0F19]" :
                      rank === 3 ? "bg-[#D97706] text-[#0B0F19]" :      
                      "bg-[#1A2333] text-zinc-500 border border-zinc-800"
                    )}
                  >
                    {rank}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px] sm:text-[17px] font-bold text-white orbitron tracking-widest leading-none mb-1 group-hover:text-[#00D4FF] transition-colors">
                      {player.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] sm:text-[13px] text-zinc-500 outfit font-medium uppercase tracking-tighter">
                        {player.category?.name || "LEGEND"}
                      </span>     
                      <span className="text-zinc-700 text-[10px]">•</span>
                      <span className="text-[11px] sm:text-[12px] text-zinc-400 outfit font-semibold">
                        {player.wins}W - {player.losses}L
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ratio & Score */}
                <div className="flex items-center gap-6 sm:gap-12">
                  <div className="hidden sm:flex flex-col items-end min-w-[80px]">
                    <span className="text-[10px] text-zinc-600 orbitron uppercase tracking-widest mb-0.5">Win Rate</span>
                    <span className="text-[13px] font-bold text-white orbitron">{winRatio}%</span>
                  </div>

                    <div className="bg-[#0D1424] border border-[#00D4FF]/30 rounded-full py-2 px-4 min-w-[75px] flex flex-col items-center justify-center shadow-[0_0_15px_rgba(0,212,255,0.05)] group-hover:border-[#00D4FF]/60 transition-all duration-300">
                    <span className="text-[14px] sm:text-[16px] font-black text-[#00D4FF] orbitron">
                      {(player.averageHGWScore ?? 0).toFixed(2)}
                    </span>
                    <span className="text-[8px] text-[#00D4FF]/60 orbitron font-bold -mt-0.5 uppercase">AVG</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-20 text-zinc-600 orbitron uppercase text-xs tracking-widest">
            No rankings available yet.
          </div>
        )}
      </div>
    </Card>
  )
}

export default LeaderboardTable