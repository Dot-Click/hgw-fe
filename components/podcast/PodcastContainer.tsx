"use client";
import React, { useState } from 'react';
import PodcastHeader from "./PodcastHeader";
import PodcastDetails from "./PodcastDetails";
import PodcasCards from "./PodcasCards";
import VideoModal from "./VideoModal";
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/store';

import { incrementPodcastListens } from '@/store/actions/podcastActions';

interface PodcastContainerProps {
    featuredPodcast: any;
}

const PodcastContainer = ({ featuredPodcast: initialFeaturedPodcast }: PodcastContainerProps) => {
    const dispatch = useAppDispatch();
    const { podcasts } = useAppSelector((state: RootState) => state.podcasts);

    // Sync featured podcast with Redux state to reflect listen count updates
    const featuredPodcast = podcasts.find(p => p.id === initialFeaturedPodcast?.id) || initialFeaturedPodcast;

    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState("");

    const handlePlayPodcast = (podcast: any) => {
        if (!podcast) return;

        // Try to find YouTube first, then any other URL
        const youtubePlatform = podcast.platforms?.find(
            (p: any) => p.platform.toLowerCase() === 'youtube'
        );
        const otherPlatform = podcast.platforms?.find((p: any) => p.url);

        const videoUrl = youtubePlatform?.url || otherPlatform?.url || "";

        if (videoUrl) {
            setCurrentVideoUrl(videoUrl);
            setIsVideoModalOpen(true);
            
            // Increment listen count
            dispatch(incrementPodcastListens(podcast.id));
        } else {
            // Fallback or alert if no URL available
            console.warn("No video URL found for this podcast");
        }
    };

    return (
        <section className="min-h-screen pt-36 pb-20 relative flex flex-col gap-3 items-center overflow-hidden">
            <PodcastHeader 
                featuredPodcast={featuredPodcast} 
                onPlay={() => handlePlayPodcast(featuredPodcast)} 
                onExternalClick={() => dispatch(incrementPodcastListens(featuredPodcast.id))}
            />
            <PodcastDetails />
            <PodcasCards 
                featuredPodcastId={featuredPodcast?.id} 
                onPlay={handlePlayPodcast}
                onExternalClick={(podcast) => dispatch(incrementPodcastListens(podcast.id))}
            />

            <VideoModal 
                isOpen={isVideoModalOpen} 
                onClose={() => setIsVideoModalOpen(false)} 
                videoUrl={currentVideoUrl} 
            />
        </section>
    );
};

export default PodcastContainer;
