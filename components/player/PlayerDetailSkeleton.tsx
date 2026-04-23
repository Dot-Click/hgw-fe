"use client";

import React from "react";
import { Skeleton } from "@heroui/react";

const PlayerDetailSkeleton = () => (
    <section className="min-h-screen pt-28 pb-20 relative flex flex-col items-center">
        <div className="w-full max-w-[1400px] px-4 md:px-12 lg:px-20 flex flex-col">
            <div className="max-w-7xl w-full flex flex-col gap-8">
                <Skeleton className="w-32 h-5 rounded-lg bg-zinc-900" />
                <div className="flex flex-col md:flex-row gap-8">
                    <Skeleton className="w-[230px] h-[230px] rounded-[16px] bg-zinc-900" />
                    <div className="flex-1 flex flex-col gap-4">
                        <Skeleton className="w-2/3 h-12 rounded-lg bg-zinc-900" />
                        <Skeleton className="w-1/3 h-6 rounded-lg bg-zinc-900" />
                        <div className="flex gap-4">
                            <Skeleton className="w-24 h-5 rounded-lg bg-zinc-900" />
                            <Skeleton className="w-24 h-5 rounded-lg bg-zinc-900" />
                            <Skeleton className="w-24 h-5 rounded-lg bg-zinc-900" />
                        </div>
                    </div>
                </div>
                <Skeleton className="w-full h-64 rounded-[22px] bg-zinc-900" />
            </div>
        </div>
    </section>
);

export default PlayerDetailSkeleton;
