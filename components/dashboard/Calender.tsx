"use client"

import React from "react"
import { Calendar, cn } from "@heroui/react"
import { today, getLocalTimeZone } from "@internationalized/date"
import { FiCalendar, FiChevronLeft, FiChevronRight } from "react-icons/fi"

const Calender = () => {
  // Use real state for the calendar
  const [value, setValue] = React.useState(today(getLocalTimeZone()))

  return (
    <div className="flex flex-col h-full rounded-2xl border border-[#2A3040] bg-[#111A2C]/50 transition-all duration-300 hover:border-[#00D4FF]/20 overflow-hidden">
      {/* 
          We use the HeroUI Calendar sub-components to perfectly match the 
          requested design while keeping it a "real" functional calendar.
      */}
      <Calendar
        aria-label="Dashboard Calendar"
        value={value}
        onChange={setValue}
        className="w-full p-0 shadow-none border-none bg-transparent"
      >
        <Calendar.Header className="p-6 border-b border-[#2A3040] flex items-center justify-between bg-transparent">
          <div className="flex items-center gap-3">
            <FiCalendar className="text-[#00D4FF] h-5 w-5" />
            <Calendar.Heading className="text-[18px] font-[700] text-white orbitron tracking-wider" />
          </div>
          <div className="flex gap-2">
            <Calendar.NavButton 
              slot="previous" 
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#2A3040] bg-[#1A2333]/50 text-zinc-400 hover:text-white transition-colors min-w-0"
            >
              <FiChevronLeft size={18} />
            </Calendar.NavButton>
            <Calendar.NavButton 
              slot="next" 
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#00D4FF]/30 bg-[#00D4FF]/10 text-[#00D4FF] hover:bg-[#00D4FF]/20 transition-colors min-w-0"
            >
              <FiChevronRight size={18} />
            </Calendar.NavButton>
          </div>
        </Calendar.Header>

        <div className="p-6">
          <Calendar.Grid className="w-full border-separate border-spacing-y-2">
            <Calendar.GridHeader>
              {(day) => (
                <Calendar.HeaderCell className="text-center text-[13px] font-medium text-zinc-500 outfit lowercase pb-4">
                  {day}
                </Calendar.HeaderCell>
              )}
            </Calendar.GridHeader>
            <Calendar.GridBody>
              {(date) => (
                <Calendar.Cell 
                  date={date}
                  className={cn(
                    "relative flex h-10 items-center justify-center text-[14px] font-medium outfit transition-all duration-200 cursor-pointer rounded-full",
                    "data-[outside-month=true]:text-zinc-800 data-[outside-month=true]:pointer-events-none",
                    "data-[selected=true]:bg-[#00D4FF] data-[selected=true]:text-[#0B0F19] data-[selected=true]:font-bold data-[selected=true]:shadow-[0_0_15px_rgba(0,212,255,0.4)] data-[selected=true]:w-16 data-[selected=true]:h-8 data-[selected=true]:mx-auto",
                    "data-[hovered=true]:text-white data-[hovered=true]:bg-white/5",
                    "text-zinc-400"
                  )}
                >
                  {date.day}
                </Calendar.Cell>
              )}
            </Calendar.GridBody>
          </Calendar.Grid>
        </div>
      </Calendar>
    </div>
  )
}

export default Calender