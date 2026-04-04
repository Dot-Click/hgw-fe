"use client";

import React, { useState } from "react";
import DeathMatchCard from "./DeathMatchCard";

const players = [
  {
    id: 1,
    rank: 1,
    name: "Lionel Messi",
    category: "Football",
    country: "Argentina",
    rating: 98.5,
    image: "/assets/img1.png",
  },
  {
    id: 2,
    rank: 2,
    name: "Pelé",
    category: "Football",
    country: "Brazil",
    rating: 97.8,
    image: "/assets/img2.png",
  },
  {
    id: 3,
    rank: 3,
    name: "Cristiano Ronaldo",
    category: "Football",
    country: "Portugal",
    rating: 97.1,
    image: "/assets/img3.png",
  },
  {
    id: 4,
    rank: 4,
    name: "Diego Maradona",
    category: "Football",
    country: "Argentina",
    rating: 96.2,
    image: "/assets/img4.png",
  },
  {
    id: 5,
    rank: 5,
    name: "Zinedine Zidane",
    category: "Football",
    country: "France",
    rating: 95.3,
    image: "/assets/img5.png",  
  },
  {
    id: 6,
    rank: 6,
    name: "Bob Marley",
    category: "Music",
    country: "Jamaica",
    rating: 94.6,
    image: "/assets/img6.png",
  },
  {
    id: 7,
    rank: 7,
    name: "Richie McCaw",
    category: "Rugby",
    country: "New Zealand",
    rating: 93.7,
    image: "/assets/img7.png",
  },
  {
    id: 8,
    rank: 8,
    name: "Jonah Lomu",
    category: "Rugby",
    country: "New Zealand",
    rating: 91.4,
    image: "/assets/img2.png",
  },
];

const DeathMatchPlayers = () => {
  const [selectedId, setSelectedId] = useState<number>(1);

  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-16 flex flex-col items-center">
      {/* Headers */}
      <div className="text-center mb-12 flex flex-col items-center">
        <h2 className="text-[28px] md:text-[36px] orbitron font-[900] text-white tracking-wide uppercase">
          Choose <span className="text-[#00CCFF] drop-shadow-[0_0_15px_rgba(0,204,255,0.5)]">Legends</span>
        </h2>
        <p className="text-[#7B899D] outfit text-[14px] md:text-[16px] mt-2">
          Select <span className="text-[#00CCFF] font-medium">Player 1</span> from the roster below
        </p>
      </div>

      {/* Grid */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {players.map((player) => (
          <DeathMatchCard
            key={player.id}
            {...player}
            isSelected={selectedId === player.id}
            onSelect={() => setSelectedId(player.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default DeathMatchPlayers;
