"use client";

import Image from "next/image";
import PodcastHeader from "./PodcastHeader";
import PodcastDetails from "./PodcastDetails";
import PodcasCards from "./PodcasCards";


const PodcastContainer = () => {
    return (
        <section className="min-h-screen pt-36 pb-20 relative flex flex-col gap-3 items-center overflow-hidden">
            {/* BACKGROUND IMAGE WITH OVERLAY */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <Image
                    src="/assets/podcastBg.png"
                    alt="Background"
                    fill
                    className="object-cover opacity-100"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-b from-[#0B0B0F] via-transparent to-[#0B0B0F]" />
            </div>
            <PodcastHeader />
            <PodcastDetails />
            <PodcasCards/>
    
        </section>
    );
};

export default PodcastContainer;
