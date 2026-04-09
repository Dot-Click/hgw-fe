"use client";

import React from "react";
import LeaderboardLegendList from "@/components/common/LeaderboardLegendList";

const player3 = "/assets/player3.png";
const player4 = "/assets/player4.png";
const player5 = "/assets/player5.png";
const player6 = "/assets/player6.png";
const player7 = "/assets/player7.png";

const leaderboardData = [
    {
        id: 1,
        rank: "#4",
        name: "Diego Maradona",
        role: "Attacking Midfielder",
        category: "FOOTBALL",
        categoryColor: "bg-[#00CCFF26] text-[#00CCFF] border-[#00CCFF33]",
        stats: { users: 491, trophies: 11 },
        score: 96.2,
        image: player3,
        highlight: true,
    },
    {
        id: 2,
        rank: "#5",
        name: "Zinedine Zidane",
        role: "Attacking Midfielder",
        category: "FOOTBALL",
        categoryColor: "bg-[#00CCFF26] text-[#00CCFF] border-[#00CCFF33]",
        stats: { users: 689, trophies: 16 },
        score: 95.3,
        image: player4,
    },
    {
        id: 3,
        rank: "#6",
        name: "Bob Marley",
        role: "Vocalist / Songwriter",
        category: "MUSIC",
        categoryColor: "bg-[#A855F726] text-[#C084FC] border-[#A855F733]",
        stats: { users: 491, trophies: 8 },
        score: 94.6,
        image: player5,
    },
    {
        id: 4,
        rank: "#7",
        name: "Richie McCaw",
        role: "Flanker",
        category: "RUGBY",
        categoryColor: "bg-[#FFBF0026] text-[#FFBF00] border-[#FFBF0033]",
        stats: { users: 148, trophies: 12 },
        score: 93.7,
        image: player6,
    },
    {
        id: 5,
        rank: "#8",
        name: "Jonah Lomu",
        role: "Wing",
        category: "RUGBY",
        categoryColor: "bg-[#FFBF0026] text-[#FFBF00] border-[#FFBF0033]",
        stats: { users: 73, trophies: 4 },
        score: 91.4,
        image: player7,
    },
];

const Ranking = () => {
    return (
        <section className="w-full max-w-7xl  mx-auto px-4 py-8">
            <div className="text-center  w-full ">
                <h2 className="text-[#7B899D]  font-[700] tracking-[5px] text-[13px] uppercase orbitron ">Ranking</h2>
            </div>
            <LeaderboardLegendList data={leaderboardData} />
        </section>
    );
};

export default Ranking;