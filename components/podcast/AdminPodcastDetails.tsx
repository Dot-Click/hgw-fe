"use client"

import React from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@heroui/react'
import { FiSearch, FiClock, FiExternalLink, FiMoreHorizontal, FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi'

const episodes = [
  {
    id: 1,
    title: 'The GOAT Debate: MJ vs LeBron',
    duration: '1:24:32',
    platform: 'YouTube',
    date: '2026-04-01',
    status: 'published',
    tags: ['Michael Jordan', 'LeBron James'],
  },
  {
    id: 2,
    title: "Messi's World Cup Legacy",
    duration: '58:15',
    platform: 'Spotify',
    date: '2026-03-25',
    status: 'published',
    tags: ['Lionel Messi'],
  },
  {
    id: 3,
    title: 'Boxing Legends Through History',
    duration: '1:12:45',
    platform: 'YouTube',
    date: '2026-03-20',
    status: 'draft',
    tags: ['Muhammad Ali', 'Mike Tyson'],
  },
  {
    id: 4,
    title: 'Tennis Big 3 Era Review',
    duration: '1:05:20',
    platform: 'Spotify',
    date: '2026-03-15',
    status: 'published',
    tags: ['Roger Federer', 'Rafael Nadal', 'Novak Djokovic'],
  },
  {
    id: 5,
    title: 'NFL Draft 2026 Breakdown',
    duration: '1:32:10',
    platform: 'YouTube',
    date: '2026-03-10',
    status: 'published',
    tags: ['NFL', 'Draft Picks'],
  },
  {
    id: 6,
    title: 'Cricket World Cup Legends',
    duration: '47:30',
    platform: 'Spotify',
    date: '2026-03-05',
    status: 'draft',
    tags: ['Sachin Tendulkar', 'Virat Kohli'],
  },
]

const AdminPodcastDetails = () => {
  const [search, setSearch] = React.useState('')
  const [openDropdown, setOpenDropdown] = React.useState<number | null>(null)
  const [dropdownPos, setDropdownPos] = React.useState({ top: 0, right: 0 })
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const filteredEpisodes = React.useMemo(() => {
    if (!search.trim()) return episodes
    const q = search.toLowerCase()
    return episodes.filter((ep) =>
      ep.title.toLowerCase().includes(q) ||
      ep.platform.toLowerCase().includes(q) ||
      ep.status.toLowerCase().includes(q) ||
      ep.tags.some((t) => t.toLowerCase().includes(q))
    )
  }, [search])

  const handleToggleDropdown = (id: number, e: React.MouseEvent) => {
    if (openDropdown === id) {
      setOpenDropdown(null)
      return
    }
    const btn = e.currentTarget.getBoundingClientRect()
    setDropdownPos({ top: btn.bottom + 4, right: window.innerWidth - btn.right })
    setOpenDropdown(id)
  }

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    if (openDropdown !== null) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [openDropdown])

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Search Bar */}
      <div className="bg-[#0D1424] border border-[#1E293B] p-4 md:p-6 rounded-[20px] md:rounded-[24px]">
        <div className="relative max-w-md group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-[#00D4FF]/60 transition-colors">
            <FiSearch size={20} />   
          </div>
          <input
            type="text"          
            placeholder="Search episodes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={cn(
              "w-full h-10 md:h-12 bg-[#080C14] border border-[#1E293B] rounded-xl pl-14 pr-5 transition-all text-zinc-200 outfit text-xs md:text-sm placeholder:text-zinc-600 outline-none",
              "hover:border-zinc-700 focus:border-[#00D4FF]/40 focus:ring-1 focus:ring-[#00D4FF]/20"
            )}
          />
        </div>
      </div>

      {/* Episodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {filteredEpisodes.map((episode) => (
          <div
            key={episode.id}
            className="bg-[#0B1121] border border-[#1E293B] rounded-2xl p-5 md:p-6 hover:border-[#2A3040] transition-all group"
          >
            {/* Top Row: Title + Status + Menu */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="text-white font-[600] outfit text-sm md:text-base tracking-wide group-hover:text-[#00D4FF] transition-colors line-clamp-1">
                {episode.title}
              </h3>
              <div className="flex items-center gap-2 shrink-0">
                <div className={cn(
                  "inline-flex items-center capitalize outfit text-[10px] md:text-[11px] font-[500] px-2.5 md:px-3 h-6 md:h-7 rounded-full tracking-wider border-none",
                  episode.status === 'published'
                    ? "bg-[#10B981]/10 text-[#10B981]"
                    : "bg-[#F59E0B]/10 text-[#F59E0B]"
                )}>
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full mr-1.5 shadow-[0_0_8px]",
                    episode.status === 'published' ? "bg-[#10B981] shadow-[#10B981]" : "bg-[#F59E0B] shadow-[#F59E0B]"
                  )} />
                  {episode.status}
                </div>
                <button
                  onClick={(e) => handleToggleDropdown(episode.id, e)}
                  className="text-zinc-500 hover:text-white hover:bg-white/5 transition-all rounded-lg h-7 w-7 md:h-8 md:w-8 flex items-center justify-center"
                >
                  <FiMoreHorizontal size={18} />
                </button>
              </div>
            </div>

            {/* Meta Row: Duration, Platform, Date */}
            <div className="flex items-center gap-3 md:gap-4 text-zinc-500 outfit text-[11px] md:text-xs mb-4">
              <div className="flex items-center gap-1.5">
                <FiClock size={13} className="text-zinc-600" />
                {episode.duration}
              </div>
              <div className="flex items-center gap-1.5">
                <FiExternalLink size={13} className="text-zinc-600" />
                {episode.platform}
              </div>
              <span>{episode.date}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {episode.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full border border-[#00D4FF]/20 bg-[#00D4FF]/5 text-[#00D4FF] text-[10px] md:text-[11px] font-medium outfit tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredEpisodes.length === 0 && (
        <div className="bg-[#0B1121] border border-[#1E293B] rounded-2xl p-12 text-center">
          <p className="text-zinc-500 outfit text-sm">No episodes found matching your search.</p>
        </div>
      )}

      {/* Floating Dropdown Portal */}
      {openDropdown !== null && createPortal(
        <div
          ref={dropdownRef}
          className="fixed z-[9999] min-w-[160px] bg-[#111827] border border-[#1E293B] rounded-xl shadow-2xl shadow-black/40 py-1.5 animate-in fade-in zoom-in-95 duration-150"
          style={{ top: dropdownPos.top, right: dropdownPos.right }}
        >
          <button
            onClick={() => { console.log("View", openDropdown); setOpenDropdown(null) }}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-zinc-300 hover:bg-white/5 hover:text-white transition-colors outfit"
          >
            <FiEye size={15} /> View
          </button>
          <button
            onClick={() => { console.log("Edit", openDropdown); setOpenDropdown(null) }}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-zinc-300 hover:bg-white/5 hover:text-white transition-colors outfit"
          >
            <FiEdit2 size={15} /> Edit
          </button>
          <div className="mx-3 my-1 border-t border-[#1E293B]" />
          <button
            onClick={() => { console.log("Delete", openDropdown); setOpenDropdown(null) }}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors outfit"
          >
            <FiTrash2 size={15} /> Delete
          </button>
        </div>,
        document.body
      )}
    </div>
  )
}

export default AdminPodcastDetails