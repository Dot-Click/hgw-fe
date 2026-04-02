import HomeHeader from "@/components/home/HomeHeader";
import LegendOfDay from "@/components/home/LegendOfDay";
import GlobalLeaderboard from "@/components/home/GlobalLeaderboard";
import PlayerCards from "@/components/home/PlayerCards";
import NewsLetter from "@/components/home/NewsLetter";




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
