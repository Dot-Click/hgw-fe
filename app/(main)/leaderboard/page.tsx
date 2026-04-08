import type { Metadata } from 'next';
import TopLegends from '@/components/leaderboard/TopLegends';
import Ranking from '@/components/leaderboard/Ranking';
import LeaderBoardHeader from '@/components/leaderboard/LeaderBoardHeader';

export const metadata: Metadata = {
    title: 'Leaderboard | HGW',
    description: 'Explore the definitive rankings of sporting and cultural legends. See the HGW Score and leaderboards for the greatest of all time across all categories.',
    keywords: ['HGW Leaderboard', 'Sport Rankings', 'Legend Rankings', 'Greatest of All Time', 'GOAT Rankings', 'HGW Score'],
};



const LeaderBoardPage = () => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <LeaderBoardHeader/>
            <TopLegends />
            <Ranking />

        </div>
    );
};

export default LeaderBoardPage;