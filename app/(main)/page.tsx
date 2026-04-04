import { Metadata } from "next";
import HomeHeader from "@/components/home/HomeHeader";
import LegendOfDay from "@/components/home/LegendOfDay";
import GlobalLeaderboard from "@/components/home/GlobalLeaderboard";
import PlayerCards from "@/components/home/PlayerCards";
import NewsLetter from "@/components/home/NewsLetter";

export const metadata: Metadata = {
    title: "How Good Was | The Ultimate Legend Ranking System",
    description: "Discover the HGW Score: The definitive archive for grading and ranking the greatest legends in sport and culture. Analyze stats, dominance, and legacies in one place.",
    keywords: ["HGW Score", "Sport Rankings", "Legend Archive", "Player Comparison", "All Time Greats"],
};





export default function Home() {
  return (
    <div className="flex flex-col pb-10 items-center w-full">
      <HomeHeader />
      <LegendOfDay />
      <GlobalLeaderboard />
      <PlayerCards />
      <NewsLetter />
      {/* Additional sections can be added here */}
    </div>
  );
}
