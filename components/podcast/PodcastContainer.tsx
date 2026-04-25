"use client";
import PodcastHeader from "./PodcastHeader";
import PodcastDetails from "./PodcastDetails";
import PodcasCards from "./PodcasCards";

interface PodcastContainerProps {
    featuredPodcast: any;
}

const PodcastContainer = ({ featuredPodcast }: PodcastContainerProps) => {
    return (
        <section className="min-h-screen pt-36 pb-20 relative flex flex-col gap-3 items-center overflow-hidden">
            <PodcastHeader featuredPodcast={featuredPodcast} />
            <PodcastDetails />
            <PodcasCards featuredPodcastId={featuredPodcast?.id} />
        </section>
    );
};

export default PodcastContainer;
