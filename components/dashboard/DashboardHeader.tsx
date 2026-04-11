"use client"

import React from "react"
import { FiPlus } from "react-icons/fi"
import { Button } from "@heroui/react"
import { useRouter } from "next/navigation"

const DashboardHeader = () => {
  const router = useRouter()
  return (
    <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-3xl font-[700] tracking-wideer text-white sm:text-4xl orbitron">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-zinc-400 outfit tracking-wide">
          Welcome back, Admin. Here's your analytics overview.
        </p>
      </div>
        <Button
          onPress={() => router.push('/admin/players/new')}
          className="bg-[#00D4FF] text-[#0B0F19] font-black orbitron uppercase tracking-[0.05em] px-6 h-12 rounded-xl border border-[#00D4FF]/50 shadow-[0_0_20px_rgba(0,212,255,0.25)] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all flex items-center gap-2"
        >
          <FiPlus size={18} strokeWidth={3} />
          Add Player
        </Button>
    </div>
  )
}

export default DashboardHeader