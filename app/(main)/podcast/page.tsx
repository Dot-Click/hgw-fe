import { Metadata } from 'next';
import PodcastContainer from '@/components/podcast/PodcastContainer';
import { PodcastService } from '@/lib/services/podcast.service';

export const metadata: Metadata = {
    title: 'HGW Podcast | Analyzing the Science of Greatness',
    description: 'Join the HGW research team as they break down sporting and cultural icons using the 10 Pillars of Domination. Listen to statistical deep dives, legend debates, and expert analysis.',
    keywords: ['HGW Podcast', 'Sports Analytics Podcast', 'Messi vs Ronaldo Stats', 'Legend Rankings Podcast', '10 Pillars of Domination', 'Goat Debate Analysis', 'HGW Audio'],
};

const Podcast = async () => {
    // Fetch the featured podcast on the server
    const featuredPodcast = await PodcastService.getFeaturedPodcast();

    return (
        <PodcastContainer featuredPodcast={featuredPodcast} />
    );
};

export default Podcast;
