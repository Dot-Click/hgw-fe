import { Metadata } from 'next';
import { PlayerService } from '@/lib/services/player.service';
import PlayerDetailClient from '@/components/player/PlayerDetailClient';

interface Props {
    params: Promise<{ id: string }>;
}

/**
 * SEO OPTIMIZED PLAYER DETAIL PAGE
 * Uses Server Component for metadata generation to ensure
 * dynamic titles and descriptions for search engines.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    
    try {
        const player = await PlayerService.getPlayerById(id);
        
        if (!player) {
            return {
                title: 'Legend Not Found | HGW Database',
                description: 'The requested legend could not be found in the HGW database.'
            };
        }

        return {
            title: `${player.name} | HGW Legend Vault`,
            description: `View the complete HGW performance breakdown for ${player.name}. Explore career stats, 10 Pillars of Domination, and historical ranking.`,
            openGraph: {
                title: `${player.name} - Historical Greatness Weighting`,
                description: `Deep dive into the legacy of ${player.name} with our proprietary HGW scoring system.`,
                images: player.image ? [player.image] : [],
            },
            twitter: {
                card: 'summary_large_image',
                title: `${player.name} | HGW Legend Vault`,
                description: `Historical analysis of ${player.name}'s career dominance.`,
                images: player.image ? [player.image] : [],
            }
        };
    } catch (error) {
        return {
            title: 'HGW Legend Database',
            description: 'Explore the historical greatness of sports legends.'
        };
    }
}

export default async function PlayerPage({ params }: Props) {
    // The client component handles the Redux logic and interactive UI
    return <PlayerDetailClient />;
}
