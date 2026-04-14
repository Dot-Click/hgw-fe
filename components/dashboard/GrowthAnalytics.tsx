"use client"

import React from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { FiChevronDown } from "react-icons/fi"

const data = [
  { name: "Mar 28", players: 45, subscribers: 120 },
  { name: "Mar 29", players: 52, subscribers: 145 },
  { name: "Mar 30", players: 48, subscribers: 132 },
  { name: "Mar 31", players: 62, subscribers: 180 },
  { name: "Apr 1", players: 55, subscribers: 165 },
  { name: "Apr 2", players: 68, subscribers: 202 },
  { name: "Apr 3", players: 72, subscribers: 215 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-[#2A3040] bg-[#0B0F19]/90 p-3 shadow-xl backdrop-blur-md">
        <p className="mb-2 text-[12px] font-bold text-zinc-500 uppercase tracking-wider outfit">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 py-0.5">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-[13px] font-medium text-white outfit">
              {entry.name}: <span className="font-bold">{entry.value}</span>
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

const GrowthAnalytics = () => {
  return (
    <div className="rounded-2xl border border-[#2A3040] bg-[#111A2C]/50 p-6 transition-all duration-300 hover:border-[#00D4FF]/20">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-[18px] font-[700] text-white orbitron tracking-wider">
          Growth Analytics
        </h2>
        <button className="flex items-center gap-2 rounded-lg border border-[#2A3040] bg-[#1A2333]/50 px-3 py-1.5 text-[13px] font-medium text-zinc-400 transition-colors hover:border-[#00D4FF]/30 hover:text-white outfit">
          Last 7 days
          <FiChevronDown className="h-4 w-4" />
        </button>
      </div>

      {/* Chart Container */}
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#2A3040" 
              vertical={false}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#71717a", fontSize: 11 }}
              dy={10}
              className="outfit"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#71717a", fontSize: 11 }}
              dx={-5}
              domain={[0, 220]}
              ticks={[0, 55, 110, 165, 220]}
              className="outfit"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              align="center"
              iconType="circle"
              wrapperStyle={{ paddingTop: "30px" }}
              formatter={(value) => (
                <span className="text-[13px] font-medium text-zinc-400 capitalize outfit ml-1">
                  {value}
                </span>  
              )}
            />
            <Line
              name="Players"
              type="monotone"
              dataKey="players"
              stroke="#00D4FF"
              strokeWidth={3}
              dot={{ fill: "#00D4FF", strokeWidth: 2, r: 4, stroke: "#111A2C" }}
              activeDot={{ r: 6, stroke: "#00D4FF", strokeWidth: 2, fill: "#111A2C" }}
            />
            <Line
              name="Subscribers"
              type="monotone"                 
              dataKey="subscribers"
              stroke="#8B5CF6"
              strokeWidth={3}
              dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4, stroke: "#111A2C" }}
              activeDot={{ r: 6, stroke: "#8B5CF6", strokeWidth: 2, fill: "#111A2C" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default GrowthAnalytics