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

interface AiChartProps {
  data: any[]
  type?: "bar" | "line"
  title?: string
  dataKey: string
  nameKey: string
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-[#2A3040] bg-[#0B0F19]/90 p-3 shadow-xl backdrop-blur-md">
        <p className="mb-2 text-[12px] font-bold text-zinc-500 uppercase tracking-wider outfit">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 py-0.5">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color || "#00D4FF" }} />
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

const AiChart: React.FC<AiChartProps> = ({ data, type = "bar", title, dataKey, nameKey }) => {
  return (
    <div className="w-full mt-4 rounded-2xl border border-[#24262E] bg-[#111217] p-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {title && (
        <h4 className="text-[14px] font-[700] text-[#E7EBEF] orbitron tracking-wider mb-4 px-2">
          {title}
        </h4>
      )}
      
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {type === "bar" ? (
            <BarChart data={data} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#24262E" 
                vertical={false}
              />
              <XAxis
                dataKey={nameKey}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#7B899D", fontSize: 10 }}
                dy={10}
                className="outfit"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#7B899D", fontSize: 10 }}
                className="outfit"
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1F2128' }} />
              <Bar 
                dataKey={dataKey} 
                radius={[4, 4, 0, 0]}
                barSize={30}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index % 2 === 0 ? "#00CCFF" : "#7000FF"} 
                    className="drop-shadow-[0_0_8px_rgba(0,212,255,0.3)]"
                  />
                ))}
              </Bar>
            </BarChart>
          ) : (
            null // LineChart implementation could go here if needed
          )}
        </ResponsiveContainer>
      </div>
      
      <div className="mt-2 flex justify-end">
        <p className="text-[10px] text-[#4A5567] outfit italic">Interactive AI-generated chart</p>
      </div>
    </div>
  )
}

export default AiChart
