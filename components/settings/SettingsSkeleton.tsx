"use client"

import React from 'react'
import { Skeleton } from '@heroui/react'

export const SettingsSkeleton = () => {
    return (
        <div className="space-y-12 animate-in fade-in duration-500">
            {/* Header Skeleton */}
            <div className="space-y-3">
                <Skeleton className="w-48 h-8 rounded-lg bg-zinc-800/50" />
                <Skeleton className="w-64 h-4 rounded-md bg-zinc-800/30" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Side (Avatar/Info) */}
                <div className="flex flex-col items-center gap-6">
                    <Skeleton className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-zinc-800/50" />
                    <Skeleton className="w-24 h-4 rounded-md bg-zinc-800/30" />
                </div>

                {/* Right Side (Form Fields) */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <Skeleton className="w-20 h-3 rounded bg-zinc-800/30" />
                            <Skeleton className="w-full h-12 rounded-xl bg-zinc-800/50" />
                        </div>
                        <div className="space-y-3">
                            <Skeleton className="w-20 h-3 rounded bg-zinc-800/30" />
                            <Skeleton className="w-full h-12 rounded-xl bg-zinc-800/50" />
                        </div>
                        <div className="md:col-span-2 space-y-3">
                            <Skeleton className="w-20 h-3 rounded bg-zinc-800/30" />
                            <Skeleton className="w-full h-12 rounded-xl bg-zinc-800/50" />
                        </div>
                    </div>

                    <div className="pt-4">
                        <Skeleton className="w-40 h-12 rounded-xl bg-zinc-800/50" />
                    </div>
                </div>
            </div>
        </div>
    )
}
