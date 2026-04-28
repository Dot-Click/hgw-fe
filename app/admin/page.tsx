"use client"

import React, { useEffect } from "react"
import {
  FiUsers,
  FiCheckCircle,
  FiFileText,
  FiMail
} from "react-icons/fi"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import StatsCard, { type StatsColor } from "@/components/dashboard/StatsCard"
import GrowthAnalytics from "@/components/dashboard/GrowthAnalytics"
import ArticlesPublished from "@/components/dashboard/ArticlesPublished"
import Calender from "@/components/dashboard/Calender"
import RecentPlayers from "@/components/dashboard/RecentPlayers"
import SystemHealth from "@/components/dashboard/SystemHealth"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchDashboardStats } from "@/store/actions/dashboardActions"
import { Skeleton } from "@heroui/react"

interface StatItem {
  label: string
  value: string
  change: string
  icon: any
  color: StatsColor
}

const AdminDashboardPage = () => {
  const dispatch = useAppDispatch()
  const { stats, loading } = useAppSelector((state) => state.dashboard)

  useEffect(() => {
    dispatch(fetchDashboardStats())
  }, [dispatch])

  const formatNumber = (num: number) => {
    return num >= 1000 ? num.toLocaleString() : String(num)
  }

  const statItems: StatItem[] = stats
    ? [
        {
          label: "Total Players",
          value: formatNumber(stats.totalPlayers),
          change: stats.playersChange,
          icon: FiUsers,
          color: "cyan",
        },
        {
          label: "Published",
          value: formatNumber(stats.publishedPlayers),
          change: stats.publishedChange,
          icon: FiCheckCircle,
          color: "green",
        },
        {
          label: "Articles",
          value: formatNumber(stats.totalArticles),
          change: stats.articlesChange,
          icon: FiFileText,
          color: "orange",
        },
        {
          label: "Subscribers",
          value: formatNumber(stats.totalSubscribers),
          change: stats.subscribersChange,
          icon: FiMail,
          color: "purple",
        },
      ]
    : []

  return (
    <div className="flex flex-col gap-8 py-2">
      <DashboardHeader />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {loading || !stats
          ? [1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#2A3040] bg-[#111A2C]/50 p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-3 w-full">
                    <Skeleton className="w-24 h-4 rounded-lg bg-[#1A2333]" />
                    <Skeleton className="w-32 h-9 rounded-lg bg-[#1A2333]" />
                    <Skeleton className="w-28 h-4 rounded-lg bg-[#1A2333]" />
                  </div>
                  <Skeleton className="w-14 h-14 rounded-full bg-[#1A2333] shrink-0" />
                </div>
              </div>
            ))
          : statItems.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
      </div>

      {/* Growth Analytics Section */}
      <div className="mt-2">
        <GrowthAnalytics />
      </div>

      {/* Secondary Analytics Row */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ArticlesPublished />
        <Calender />
      </div>

      {/* Tertiary Row: Recent Players & System Health */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentPlayers />
        </div>
        <div className="lg:col-span-1">
          <SystemHealth />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage
