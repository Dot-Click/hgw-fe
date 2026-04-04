import type { Metadata } from 'next';
import LeaderBoardHeader from '@/components/leaderboard/LeaderBoardHeader';
import TopLegends from '@/components/leaderboard/TopLegends';
import Ranking from '@/components/leaderboard/Ranking';

export const metadata: Metadata = {
    title: 'The Vault Articles | HGW Editorial',
    description: 'Insights, analysis, and deep dives from the HGW research team.',
};

const LeaderBoardPage = () => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <LeaderBoardHeader />

            <TopLegends />
            <Ranking />

        </div>
    );
};

export default LeaderBoardPage;