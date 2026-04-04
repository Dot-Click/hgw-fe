"use client";

import React, { useState } from "react";
import DeathMatchHeader from "./DeathMatchHeader";
import DeathMatchPlayers from "./DeathMatchPlayers";
import DeathMatchResults from "./DeathMatchResults";

export interface PlayerSelection {
  id: number;
  name: string;
  image: string;
  role?: string;
  rating?: number;
  category?: string;
  country?: string;
}

const DeathMatchContainer = () => {
  const [player1, setPlayer1] = useState<PlayerSelection | null>(null);
  const [player2, setPlayer2] = useState<PlayerSelection | null>(null);
  const [activeSlot, setActiveSlot] = useState<1 | 2>(1);
  const [isMatchStarted, setIsMatchStarted] = useState(false);

  const handleSelectPlayer = (player: PlayerSelection) => {
    if (activeSlot === 1) {
      if (player2?.id === player.id) return;
      setPlayer1(player);
      if (!player2) setActiveSlot(2);
    } else {
      if (player1?.id === player.id) return;
      setPlayer2(player);
    }
  };

  const handleResetSlot = (slot: 1 | 2) => {
    if (slot === 1) setPlayer1(null);
    else setPlayer2(null);
    setActiveSlot(slot);
  };

  const handleStartMatch = () => {
    if (player1 && player2) {
      setIsMatchStarted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNewMatch = () => {
    setPlayer1(null);
    setPlayer2(null);
    setActiveSlot(1);
    setIsMatchStarted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col w-full">
      <DeathMatchHeader
        player1={player1}
        player2={player2}
        activeSlot={activeSlot}
        setActiveSlot={setActiveSlot}
        onResetSlot={handleResetSlot}
        onStartMatch={handleStartMatch}
        isMatchStarted={isMatchStarted}
      />

      
      {isMatchStarted && player1 && player2 ? (
        <DeathMatchResults
          player1={player1}
          player2={player2}
          onNewMatch={handleNewMatch}
        />
      ) : (
        <DeathMatchPlayers
          onSelect={handleSelectPlayer}
          player1Id={player1?.id}
          player2Id={player2?.id}
          activeSlot={activeSlot}
        />
      )}
    </div>
  );
};


export default DeathMatchContainer;

