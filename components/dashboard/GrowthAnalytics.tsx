"use client"

import React, { useState, useEffect, useMemo, useRef } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { FiChevronDown, FiTrendingUp } from "react-icons/fi"
import { Skeleton } from "@heroui/react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchDashboardStats } from "@/store/actions/dashboardActions"

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-[#2A3040] bg-[#0B0F19]/95 p-3 shadow-2xl backdrop-blur-xl ring-1 ring-white/5">
        <p className="mb-2 text-[11px] font-bold text-zinc-500 uppercase tracking-widest outfit">{label}</p>
        <div className="flex flex-col gap-2">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.3)]" style={{ backgroundColor: entry.color }} />
                <span className="text-[13px] font-medium text-zinc-300 outfit">{entry.name}</span>
              </div>
              <span className="text-[14px] font-bold text-white outfit">{entry.value}</span>
            </div>         
          ))}
        </div>
      </div>       
    )
  }              
  return null
}

const GrowthAnalytics = () => {
  const dispatch = useAppDispatch()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { growthChart, loading } = useAppSelector((state) => state.dashboard)
  const [selectedKey, setSelectedKey] = useState("7")

  useEffect(() => {
    setMounted(true)
    if (growthChart.length === 0) {
      dispatch(fetchDashboardStats(7))
    }

    // Close dropdown on click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (key: string) => {
    setSelectedKey(key)
    setIsDropdownOpen(false)
    const days = parseInt(key)
    dispatch(fetchDashboardStats(days))
  }

  const selectedValue = useMemo(() => {
    if (selectedKey === "7") return "Last Week";
    if (selectedKey === "30") return "Last Month";
    if (selectedKey === "365") return "Last Year";
    return "Timeframe";
  }, [selectedKey]);

  const maxVal = Math.max(
    ...growthChart.map((d) => Math.max(d.players || 0, d.subscribers || 0)),
    10
  )
  const yMax = Math.ceil(maxVal / 5) * 5 + 5       
  const ticks = Array.from({ length: 5 }, (_, i) => Math.round((yMax / 4) * i))

  return (
    <div className="group relative rounded-3xl border border-[#2A3040] bg-[#111A2C]/60 p-8 transition-all duration-500 hover:border-[#00D4FF]/30 hover:bg-[#111A2C]/80 shadow-2xl">
      {/* Background Glow Effect */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#00D4FF]/5 blur-[120px] pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-[#8B5CF6]/5 blur-[120px] pointer-events-none" />

      {/* Header Section */}
      <div className="relative z-20 mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1A2333] border border-[#2A3040] shadow-inner group-hover:border-[#00D4FF]/40 transition-colors duration-500">
            <FiTrendingUp className="h-6 w-6 text-[#00D4FF]" />
          </div>
          <div>
            <h2 className="text-[20px] font-bold text-white orbitron tracking-tight">
              Growth Analytics
            </h2>
            <p className="text-[12px] text-zinc-500 outfit font-medium">Player & Subscriber acquisition trends</p>
          </div>
        </div>

        {/* CUSTOM DROPDOWN - FIXED POSITIONING */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`flex h-10 items-center justify-between gap-3 rounded-xl border border-[#2A3040] bg-[#1A2333]/40 px-5 text-[13px] font-semibold text-white transition-all hover:bg-[#1A2333] hover:border-[#00D4FF]/30 outfit min-w-[150px] ${isDropdownOpen ? 'border-[#00D4FF]/50 ring-2 ring-[#00D4FF]/10' : ''}`}
          >
            {selectedValue}
            <FiChevronDown className={`h-4 w-4 text-zinc-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-white' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-[calc(100%+8px)] z-[100] min-w-[180px] overflow-hidden rounded-xl border border-[#2A3040] bg-[#0B0F19] p-1.5 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in duration-200 origin-top-right">
              {[
                { key: "7", label: "Last Week" },
                { key: "30", label: "Last Month" },
                { key: "365", label: "Last Year" }
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleSelect(item.key)}
                  className={`flex w-full items-center px-4 py-2.5 text-[13px] font-medium rounded-lg transition-all outfit ${selectedKey === item.key ? 'bg-[#1A2333] text-[#00D4FF]' : 'text-zinc-400 hover:bg-[#1A2333]/50 hover:text-white'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chart Section */}
      <div className="relative h-[380px] w-full">
        {loading || !mounted || growthChart.length === 0 ? (
          <div className="flex flex-col gap-6 h-full justify-center px-4">
            <div className="flex items-end gap-3 h-full pb-8">
              {[45, 60, 35, 80, 55, 90, 70].map((h, i) => (
                <Skeleton
                  key={i}
                  className="flex-1 rounded-t-xl bg-[#1A2333]/50"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={growthChart} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPlayers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00D4FF" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSubs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A3040" vertical={false} opacity={0.5} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#71717a", fontSize: 11, fontWeight: 500 }}
                dy={15}
                className="outfit"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#71717a", fontSize: 11, fontWeight: 500 }}
                dx={-10}
                domain={[0, yMax]}
                ticks={ticks}
                className="outfit"
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#2A3040', strokeWidth: 1 }} />
              <Legend
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ paddingTop: "40px" }}
                formatter={(value) => (
                  <span className="text-[13px] font-semibold text-zinc-400 capitalize outfit ml-1.5 hover:text-white transition-colors cursor-default">
                    {value}
                  </span>
                )}
              />
              <Area
                name="Players"
                type="monotone"
                dataKey="players"
                stroke="#00D4FF"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorPlayers)"
                activeDot={{ r: 6, stroke: "#00D4FF", strokeWidth: 2, fill: "#111A2C" }}
              />
              <Area
                name="Subscribers"
                type="monotone"
                dataKey="subscribers"
                stroke="#8B5CF6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorSubs)"
                activeDot={{ r: 6, stroke: "#8B5CF6", strokeWidth: 2, fill: "#111A2C" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}

export default GrowthAnalytics