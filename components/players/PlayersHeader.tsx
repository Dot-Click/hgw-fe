"use client"

import React from "react"
import { FiPlus, FiUpload, FiSearch, FiFilter } from "react-icons/fi"
import { Button, InputGroup, cn, useOverlayState } from "@heroui/react"
import BulkImportModal from "./BulkImportModal"

const PlayersHeader = () => {
  const state = useOverlayState();

  return (
    <div className="flex flex-col gap-8 mb-8">
      {/* Top Section: Title & Action Buttons */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-[900] text-white orbitron tracking-widest">
            Players
          </h1>
          <p className="text-sm text-zinc-400 outfit tracking-wide">
            Manage all 12 players in the Legend Vault.
          </p>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:flex items-center gap-3 w-full lg:w-auto">
          <Button
            onPress={state.open}
            className="flex-1 sm:flex-none h-11 px-4 sm:px-6 rounded-xl border border-[#2A3040] bg-[#1A2333]/50 text-zinc-300 font-bold orbitron text-[12px] sm:text-[13px] uppercase tracking-wider hover:bg-[#2A3040] hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <FiUpload size={16} />
            Bulk Import
          </Button>

          <Button
            className="flex-1 sm:flex-none bg-[#00D4FF] text-[#0B0F19] font-black orbitron uppercase tracking-[0.05em] px-4 sm:px-6 h-11 rounded-xl border border-[#00D4FF]/50 shadow-[0_0_20px_rgba(0,212,255,0.25)] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all flex items-center justify-center gap-2"
          >
            <FiPlus size={18} strokeWidth={3} />
            Add Player
          </Button>
        </div>
      </div>

      <BulkImportModal isOpen={state.isOpen} onOpenChange={state.setOpen} />

      {/* Filter & Search Bar Section */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        {/* Search Input */}
        <div className="flex-1">
          <div className="relative group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#00D4FF] transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Search players..."
              className="w-full h-12 pl-12 pr-4 bg-[#111A2C]/50 border border-[#2A3040] rounded-xl text-white outline-none focus:border-[#00D4FF]/50 focus:ring-1 focus:ring-[#00D4FF]/30 transition-all outfit text-sm placeholder:text-zinc-500"
            />
          </div>
        </div>

        {/* Dropdown Filters Container */}
        <div className="flex flex-nowrap lg:flex-wrap items-center gap-3 overflow-x-auto scrollbar-hide pb-2 lg:pb-0">
          <FilterSelect 
            icon={<FiFilter size={16} />}
            label="All Categories" 
          />
          <FilterSelect 
            label="All Countries" 
          />
          <FilterSelect 
            label="All Status" 
          />
        </div>
      </div>
    </div>
  )
}

const FilterSelect = ({ label, icon }: { label: string; icon?: React.ReactNode }) => (
  <button className="flex h-12 items-center gap-3 px-4 rounded-xl border border-[#2A3040] bg-[#111A2C]/50 text-zinc-400 hover:text-white hover:border-[#2A3040] transition-all whitespace-nowrap group min-w-[140px] justify-between">
    <div className="flex items-center gap-2">
      {icon && <span className="text-zinc-500 group-hover:text-[#00D4FF] transition-colors">{icon}</span>}
      <span className="text-[14px] outfit">{label}</span>
    </div>
    <FiPlus className="rotate-45 text-zinc-600 group-hover:text-zinc-400" size={14} />
  </button>
)

export default PlayersHeader