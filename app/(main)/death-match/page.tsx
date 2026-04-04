import { Metadata } from 'next';
import DeathMatchContainer from '@/components/death-match/DeathMatchContainer';

export const metadata: Metadata = {
  title: 'Death Match | Compare Sporting & Cultural Legends | HGW',
  description: 'Enter the HGW Death Match and compare two legends side-by-side. See who comes out on top based on our advanced pillar scoring system.',
  keywords: ['HGW', 'Death Match', 'Legend Comparison', 'Sporting Legends', 'HGW Score', 'Player Stats'],
  
};

const DeathMatch = () => {
  return (
    <div className="flex flex-col pb-10 items-center w-full">
      <DeathMatchContainer />
      {/* Additional sections can be added here */}
    </div>
  );
};

export default DeathMatch;
