"use client";

import React from 'react';
import { Skeleton } from '@heroui/react';

const PodcastSkeleton = () => {
    return (
        <div className="bg-[#0D0E12] border border-[#1E293B] rounded-[24px] overflow-hidden flex flex-col gap-5 h-full shadow-2xl">
            {/* Image Section Skeleton */}
            <div className="relative aspect-video overflow-hidden">
                <Skeleton className="w-full h-full bg-zinc-900" />
                
                {/* Badge Skeletons */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                    <Skeleton className="w-16 h-6 rounded-full bg-zinc-800/20" />
                    <Skeleton className="w-16 h-6 rounded-full bg-zinc-800/20" />
                </div>
            </div>

            {/* Content Section Skeleton */}
            <div className="p-5 flex flex-col gap-4 flex-grow">
                {/* Category & Listens */}
                <div className="flex justify-between items-center">
                    <Skeleton className="w-24 h-6 rounded-full bg-zinc-800/20" />
                    <Skeleton className="w-12 h-4 rounded-full bg-zinc-800/10" />
                </div>

                {/* Title & Description */}
                <div className="space-y-3">
                    <Skeleton className="w-full h-5 rounded-md bg-zinc-800/20" />
                    <div className="space-y-2">
                        <Skeleton className="w-full h-3 rounded-md bg-zinc-800/10" />
                        <Skeleton className="w-[80%] h-3 rounded-md bg-zinc-800/10" />
                    </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4">
                    <Skeleton className="w-20 h-4 rounded-md bg-zinc-800/10" />
                    <Skeleton className="w-24 h-4 rounded-md bg-zinc-800/10" />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                    <Skeleton className="w-16 h-6 rounded-full bg-zinc-800/10" />
                    <Skeleton className="w-20 h-6 rounded-full bg-zinc-800/10" />
                    <Skeleton className="w-14 h-6 rounded-full bg-zinc-800/10" />
                </div>
            </div>

            {/* Footer Platforms */}
            <div className="px-5 py-4 border-t border-white/5 bg-black/20 flex gap-3">
                <Skeleton className="w-24 h-8 rounded-full bg-zinc-800/20" />
                <Skeleton className="w-24 h-8 rounded-full bg-zinc-800/20" />
            </div>
        </div>
    );
};

export const PodcastGridSkeleton = () => {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <PodcastSkeleton key={i} />
            ))}
        </div>
    );
};

export const StatsSkeleton = () => {
    return (
        <div className="w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center gap-3 justify-center p-4 rounded-[22px] bg-[#0D0E12] border border-[#1E293B] min-h-[140px] shadow-lg">
                    <Skeleton className="w-6 h-6 rounded-md bg-zinc-800/20" />
                    <Skeleton className="w-16 h-5 rounded-md bg-zinc-800/20" />
                    <Skeleton className="w-24 h-3 rounded-md bg-zinc-800/10" />
                </div>
            ))}
        </div>
    );
};

export default PodcastSkeleton;
