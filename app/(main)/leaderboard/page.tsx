import LeaderBoardHeader from '@/components/leaderboard/LeaderBoardHeader'
import LeaderboardPlayers from '@/components/leaderboard/LeaderboardPlayers';

const LeaderBoard = () => {
  return (
<div className="flex flex-col pb-10 items-center w-full">
      <LeaderBoardHeader />
      <LeaderboardPlayers/>
   
      {/* Additional sections can be added here */}
    </div>
  )
}

export default LeaderBoard