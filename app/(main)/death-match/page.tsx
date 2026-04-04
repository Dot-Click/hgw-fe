import DeathMatchHeader from '@/components/death-match/DeathMatchHeader'
import DeathMatchPlayers from '@/components/death-match/DeathMatchPlayers';

const DeathMatch = () => {
  return (
<div className="flex flex-col pb-10 items-center w-full">
      <DeathMatchHeader />
      <DeathMatchPlayers/>
   
      {/* Additional sections can be added here */}
    </div>
  )
}

export default DeathMatch