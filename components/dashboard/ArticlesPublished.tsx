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

const data = [
  { name: "Mar 28", count: 3 },
  { name: "Mar 29", count: 2 },
  { name: "Mar 30", count: 4 },
  { name: "Mar 31", count: 5 },
  { name: "Apr 1", count: 3 },
  { name: "Apr 2", count: 6 },
  { name: "Apr 3", count: 4 },
]

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

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex flex-col h-full rounded-2xl border border-[#2A3040] bg-[#111A2C]/50 transition-all duration-300 hover:border-[#F59E0B]/20">
      <div className="p-6 border-b border-[#2A3040]">
        <h2 className="text-[18px] font-[700] text-white orbitron tracking-wider">
          Articles Published
        </h2>
      </div>

      <div className="flex-1 p-6">
        <div className="h-[250px] w-full min-w-0">
          {mounted && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
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
                  domain={[0, 8]}
                  ticks={[0, 2, 4, 6, 8]}
                  className="outfit"
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1A2333', opacity: 0.4 }} />
                <Bar 
                  dataKey="count" 
                  fill="#F59E0B" 
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                >
                  {data.map((entry, index) => (
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