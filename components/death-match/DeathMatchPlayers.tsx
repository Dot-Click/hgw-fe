"use client";

import React, { useState, useEffect } from "react";
import DeathMatchCard from "./DeathMatchCard";
import { motion } from "framer-motion";
import { Skeleton } from "@heroui/react";
import { PlayerSelection } from "./DeathMatchContainer";

interface DeathMatchPlayersProps {
  onSelect: (player: PlayerSelection) => void;
  player1Id?: string;
  player2Id?: string;
  activeSlot: 1 | 2;
}

const DeathMatchPlayers = ({ onSelect, player1Id, player2Id, activeSlot }: DeathMatchPlayersProps) => {
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await fetch("/api/players");
        const data = await res.json();
        setPlayers(data);
      } catch (error) {
        console.error("Failed to fetch players:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-16 flex flex-col items-center">
      {/* Headers */}
      <div className="text-center mb-12 flex flex-col items-center">
        <h2 className="text-[28px] md:text-[36px] orbitron font-[900] text-white tracking-wide uppercase">
          Choose <span className="text-[#00CCFF] drop-shadow-[0_0_15px_rgba(0,204,255,0.5)]">Legends</span>
        </h2>
        <motion.p 
          key={activeSlot}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[#7B899D] outfit text-[14px] md:text-[16px] mt-2"
        >            
          Select <span className="text-[#00CCFF] font-medium uppercase tracking-widest">Player {activeSlot}</span> from the roster below
        </motion.p>
      </div>

      {/* Grid */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-[200px] w-full bg-[#111A2C]/50 rounded-2xl border border-[#1E293B] animate-pulse" />
          ))
        ) : players.length > 0 ? (
          players.map((player, index) => {
            const isSelected = player1Id === player.id || player2Id === player.id;
            const isCurrentlySelecting = (activeSlot === 1 && player1Id === player.id) || (activeSlot === 2 && player2Id === player.id);
            
            return (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}            
              >
                <DeathMatchCard
                  id={player.id}
                  rank={index + 1}
                  name={player.name}
                  category={player.category?.name || "Legend"}
                  country={player.country}
                  rating={player.finalScore || 0}
                  image={player.image || "/assets/img1.png"}
                  isSelected={isCurrentlySelecting}
                  onSelect={() => {
                    if (isSelected && !isCurrentlySelecting) return; 
                    onSelect({
                      id: player.id,
                      name: player.name,
                      image: player.image || "/assets/img1.png",
                      rating: player.finalScore || 0,
                      category: player.category?.name,
                      country: player.country
                    });
                  }}
                />
              </motion.div>
            );
          })
        ) : (
          <div className="col-span-full text-center text-[#7B899D] py-10">
            No players found.
          </div>
        )}
      </div>
    </section>
  );
};

export default DeathMatchPlayers;
