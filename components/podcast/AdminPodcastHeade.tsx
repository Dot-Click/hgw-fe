"use client"

import React from 'react'
import { Button } from '@heroui/react'
import { FiPlus } from 'react-icons/fi'

interface AdminPodcastHeaderProps {
  onAdd: () => void
}

const AdminPodcastHeader = ({ onAdd }: AdminPodcastHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-[900] text-white orbitron tracking-widest">Podcasts</h1>
        <p className="text-sm text-zinc-500 outfit">Manage podcast episodes and embeds.</p>
      </div>

      <Button 
        onPress={onAdd}
        className="bg-[#00D4FF] text-[#0B1221] font-black orbitron uppercase tracking-wider h-11 px-6 rounded-xl shadow-[0_4px_20px_rgba(0,212,255,0.2)] hover:bg-[#00D4FF]/90 transition-all flex items-center gap-2"
      >
        <FiPlus size={18} className="stroke-[3px]" />
        Add Episode
      </Button>
    </div>
  )
}

export default AdminPodcastHeader