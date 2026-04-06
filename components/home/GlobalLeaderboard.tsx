"use client";

import LeaderboardLegendList from "@/components/common/LeaderboardLegendList";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { MdArrowForwardIos } from "react-icons/md";

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

const GlobalLeaderboard = () => {
    const router = useRouter();
    return (
        <section className="w-full max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-20 flex flex-col gap-6">
            {/* Header section with title and decorative divider */}
            <div className="relative flex flex-row items-center justify-between w-full h-12 md:h-20">
                <h2 className="orbitron text-[18px] md:text-[27px] font-black text-[#E7EBEF] capitalize z-10 text-left pr-4 md:pr-8">
                    Global Leaderboard
                </h2>

                <Button 
                  onClick={() => router.push("/leaderboard")}
                  className="z-10 flex bg-transparent items-center gap-1 cursor-pointer text-[#00CCFF] hover:text-[#00CCFFEE] outfit text-[11px] md:text-[16px] font-medium tracking-wider group transition-all">
                    View Full Leaderboard
                    <MdArrowForwardIos className="text-xs md:text-[13px] group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>

            {/* Leaderboard List */}
            <div className="w-full">
                <LeaderboardLegendList data={leaderboardData} />
            </div>
        </section>
    );
};

export default GlobalLeaderboard;