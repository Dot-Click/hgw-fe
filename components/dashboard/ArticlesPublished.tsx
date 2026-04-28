"use client"

import React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { Skeleton } from "@heroui/react"
import { useAppSelector } from "@/store/hooks"

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-[#2A3040] bg-[#0B0F19]/90 p-3 shadow-xl backdrop-blur-md">
        <p className="text-[12px] font-bold text-zinc-500 uppercase tracking-wider outfit">{label}</p>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-[14px] font-bold text-[#F59E0B] outfit">
            {payload[0].value} Articles
          </span>
        </div>
      </div>
    )
  }
  return null
}

const ArticlesPublished = () => {
  const [mounted, setMounted] = React.useState(false)
  const { articlesChart, loading } = useAppSelector((state) => state.dashboard)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const maxCount = Math.max(...articlesChart.map((d) => d.count || 0), 4)
  const yMax = Math.ceil(maxCount / 2) * 2 + 2
  const ticks = Array.from({ length: 5 }, (_, i) => Math.round((yMax / 4) * i))

  return (
    <div className="flex flex-col h-full rounded-2xl border border-[#2A3040] bg-[#111A2C]/50 transition-all duration-300 hover:border-[#F59E0B]/20">
      <div className="p-6 border-b border-[#2A3040]">
        <h2 className="text-[18px] font-[700] text-white orbitron tracking-wider">
          Articles Published
        </h2>
      </div>

      <div className="flex-1 p-6">
        <div className="h-[250px] w-full min-w-0">
          {loading || !mounted || articlesChart.length === 0 ? (
            <div className="flex items-end justify-between gap-3 h-full px-4 pb-6">
              {[40, 60, 35, 80, 55, 90, 45].map((h, i) => (
                <Skeleton
                  key={i}
                  className="rounded-t-md bg-[#1A2333] flex-1"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <BarChart
                data={articlesChart}
                margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                barGap={0}
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
                  dx={-2}
                  domain={[0, yMax]}
                  ticks={ticks}
                  className="outfit"
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1A2333', opacity: 0.4 }} />
                <Bar
                  dataKey="count"
                  fill="#F59E0B"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                >
                  {articlesChart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#F59E0B" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  )
}

export default ArticlesPublished