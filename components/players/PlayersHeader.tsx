"use client"

import React, { useState } from "react"
import { FiPlus, FiUpload, FiSearch, FiFilter, FiChevronDown } from "react-icons/fi"
import { Button, useOverlayState } from "@heroui/react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import BulkImportModal from "./BulkImportModal"
import AdminGuard from "../common/AdminGuard"

interface HeaderProps {
    searchQuery: string
    setSearchQuery: (val: string) => void
    selectedCategory: string
    setSelectedCategory: (val: string) => void
    selectedCountry: string
    setSelectedCountry: (val: string) => void
    selectedStatus: string
    setSelectedStatus: (val: string) => void
    categoryOptions: string[]
    countryOptions: string[]
    statusOptions: string[]
}

const PlayersHeader = ({
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedCountry,
    setSelectedCountry,
    selectedStatus,
    setSelectedStatus,
    categoryOptions,
    countryOptions,
    statusOptions
}: HeaderProps) => {
    const state = useOverlayState();
    const router = useRouter();

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-[900] text-white orbitron tracking-widest">
                        Players
                    </h1>
                    <p className="text-sm text-zinc-400 outfit tracking-wide">
                        Manage all legend profiles in the vault.
                    </p>
                </div>

                <AdminGuard>
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:flex items-center gap-3 w-full lg:w-auto">
                        <Button
                            onPress={state.open}
                            className="flex-1 sm:flex-none h-11 px-6 rounded-xl border border-[#2A3040] bg-[#1A2333]/50 text-zinc-300 font-bold orbitron text-[13px] uppercase tracking-wider hover:bg-[#2A3040] hover:text-white transition-all flex items-center justify-center gap-2"
                        >
                            <FiUpload size={16} />
                            Bulk Import
                        </Button>

                        <Button
                            onPress={() => router.push('/admin/players/new')}
                            className="flex-1 sm:flex-none bg-[#00D4FF] text-[#0B0F19] font-black orbitron uppercase tracking-[0.05em] px-6 h-11 rounded-xl border border-[#00D4FF]/50 shadow-[0_0_20px_rgba(0,212,255,0.25)] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all flex items-center justify-center gap-2"
                        >
                            <FiPlus size={18} strokeWidth={3} />
                            Add Player
                        </Button>
                    </div>
                </AdminGuard>
            </div>

            <BulkImportModal 
                isOpen={state.isOpen} 
                onOpenChange={state.setOpen} 
                onSuccess={() => window.location.reload()} 
            />

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                <div className="flex-1">
                    <div className="relative group">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#00D4FF] transition-colors" size={18} />
                        <input 
                            type="text"
                            placeholder="Find legend by name or sport..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-12 pl-12 pr-4 bg-[#111A2C]/50 border border-[#2A3040] rounded-xl text-white outline-none focus:border-[#00D4FF]/50 focus:ring-1 focus:ring-[#00D4FF]/30 transition-all outfit text-sm placeholder:text-zinc-500"
                        />
                    </div>
                </div>

        {/* Dropdown Filters Container (Ready for future logic) */}
        <div className="flex flex-wrap items-center gap-3 overflow-visible pb-2 lg:pb-0">
          <FilterDropdown 
            label={selectedCategory}
            icon={<FiFilter size={16} />}
            options={categoryOptions}
            onSelect={setSelectedCategory}
          />
          <FilterDropdown 
            label={selectedCountry}
            options={countryOptions}
            onSelect={setSelectedCountry}
          />
          <FilterDropdown 
            label={selectedStatus}
            options={statusOptions}
            onSelect={setSelectedStatus}
          />
        </div>

            </div>
        </div>
    )
}

const FilterDropdown = ({ label, icon, options, onSelect }: { label: string; icon?: React.ReactNode; options: string[]; onSelect: (val: string) => void }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-12 items-center gap-3 px-4 rounded-xl border border-[#2A3040] bg-[#111A2C]/50 text-zinc-400 hover:text-white hover:border-[#2A3040] transition-all whitespace-nowrap group min-w-[150px] justify-between z-20 outline-none"
            >
                <div className="flex items-center gap-2">
                    {icon && <span className="text-zinc-500 group-hover:text-[#00D4FF] transition-colors">{icon}</span>}
                    <span className="text-[14px] outfit font-medium">{label}</span>
                </div> 
                <FiChevronDown className={`text-zinc-600 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} size={16} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="absolute top-14 left-0 w-60 bg-[#0B1121] border border-[#2A3040] rounded-2xl shadow-2xl z-40 overflow-hidden py-2 p-1"
                        >
                            <div className="max-h-60 overflow-y-auto custom-scrollbar px-1">
                                {options.map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => {
                                            onSelect(opt)
                                            setIsOpen(false)
                                        }}
                                        className={`w-full text-left px-4 py-3 rounded-xl transition-all text-[13px] outfit mb-1 ${
                                            label === opt 
                                                ? "bg-[#00D4FF]/10 text-[#00D4FF] font-bold" 
                                                : "text-zinc-400 hover:bg-[#1A2333] hover:text-white"
                                        }`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

export default PlayersHeader