import { Metadata } from 'next';
import DatabaseFilters from "@/components/database/DatabaseFilters";
import Card from "@/components/common/Card";
import { PLAYERS_DATA } from '@/data/players';

export const metadata: Metadata = {
    title: "Legend Database | Search & Filter History's Greatest | HGW",
    description: "Search through the most comprehensive database of sporting and cultural icons. Filter by sport, era, and dominance stats to explore history's greatest legends.",
    keywords: ["Legend Database", "Search Athletes", "Athlete Database", "HGW Archive", "Sports Icon Search", "Filter Legends", "Legend Vault"],
};


const Database = () => {
    return (
        <section className="min-h-screen pt-28 pb-20 relative flex flex-col items-center">
            {/* Centered outer container to "stuck" the content's horizontal position */}
            <div className="w-full max-w-[1400px] px-6 md:px-12 lg:px-20 flex flex-col">
                <div className="max-w-7xl w-full flex flex-col gap-10">

                    {/* Header Section */}
                    <div className="flex flex-col gap-1">
                        <div className="text-[32px] md:text-[56px] font-[900] flex flex-wrap items-center gap-x-6 gap-y-2 orbitron leading-tight">
                            <h1 className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Player</h1>
                            <h1 className="text-[#00CCFF] drop-shadow-[0_0_15px_rgba(0,204,255,0.4)]">Database</h1>
                        </div>
                        <p className="text-[#7B899D] font-medium text-[16px] md:text-[18px] outfit leading-relaxed max-w-3xl">
                            Search and filter the complete legend archive
                        </p>
                    </div>

                    {/* Search & Filter Section */}
                    <DatabaseFilters />

                    {/* Legends Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 justify-items-center">
                        {PLAYERS_DATA.map((player) => (
                            <Card key={player.id} player={player} />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Database;
