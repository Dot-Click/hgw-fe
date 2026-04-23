"use client"

import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { cn, Spinner } from '@heroui/react'
import { FiSearch, FiClock, FiExternalLink, FiMoreHorizontal, FiEye, FiEdit2, FiTrash2, FiYoutube, FiMusic } from 'react-icons/fi'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchPodcasts, deletePodcast } from '@/store/actions/podcastActions'
import DeleteConfirmationModal from '../common/DeleteConfirmationModal'
import { toast } from '@heroui/react'


interface AdminPodcastDetailsProps {
  onEdit: (podcast: any) => void
}

const AdminPodcastDetails = ({ onEdit }: AdminPodcastDetailsProps) => {
  const dispatch = useAppDispatch()
  const { podcasts, loading } = useAppSelector((state) => state.podcasts)
  
  const [search, setSearch] = React.useState('')
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)
  const [dropdownPos, setDropdownPos] = React.useState({ top: 0, right: 0 })
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [podcastToDelete, setPodcastToDelete] = React.useState<string | null>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)

  useEffect(() => {
    dispatch(fetchPodcasts())
  }, [dispatch])

  const handleConfirmDelete = async () => {
    if (!podcastToDelete) return
    setIsDeleting(true)
    try {
      await dispatch(deletePodcast(podcastToDelete)).unwrap()
      toast.success("Podcast deleted successfully")
      setIsDeleteModalOpen(false)
      setPodcastToDelete(null)
    } catch (error: any) {
      const errorMessage = typeof error === 'string' ? error : (error.message || 'Failed to delete')
      toast.danger(errorMessage)
    } finally {
      setIsDeleting(false)
    }
  }

  const filteredEpisodes = React.useMemo(() => {
    if (!search.trim()) return podcasts
    const q = search.toLowerCase()
    return podcasts.filter((ep) =>
      ep.title.toLowerCase().includes(q) ||
      ep.status.toLowerCase().includes(q) ||
      ep.players.some((p: any) => p.name.toLowerCase().includes(q))
    )
  }, [search, podcasts])

  const handleToggleDropdown = (id: string, e: React.MouseEvent) => {
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

  if (loading && podcasts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-[#0D1424] border border-[#1E293B] rounded-[24px]">
        <Spinner size="lg" color="accent" />
        <p className="mt-4 text-zinc-500 orbitron text-xs font-bold uppercase tracking-widest">Loading episodes...</p>
      </div>
    )
  }

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
            className="bg-[#0B1121] border border-[#1E293B] rounded-2xl p-5 md:p-6 hover:border-[#2A3040] transition-all group relative overflow-hidden"
          >
            {/* Background Thumbnail Blur */}
            <div 
              className="absolute top-0 right-0 w-32 h-32 opacity-10 blur-2xl -mr-10 -mt-10 pointer-events-none"
              style={{ background: `radial-gradient(circle, #00D4FF 0%, transparent 70%)` }}
            />

            {/* Top Row: Title + Status + Menu */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex flex-col gap-1">
                <h3 className="text-white font-[600] outfit text-sm md:text-base tracking-wide group-hover:text-[#00D4FF] transition-colors line-clamp-1">
                  {episode.title}
                </h3>
                <span className="text-[10px] text-zinc-500 orbitron uppercase font-bold tracking-widest">
                  by {episode.createdBy?.name || 'Admin'}
                </span>
              </div>
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

            {/* Meta Row: Links, Date */}
            <div className="flex items-center gap-3 md:gap-4 text-zinc-500 outfit text-[11px] md:text-xs mb-4">
              <div className="flex items-center gap-2">
                {episode.platformLinks?.spotify && (
                  <a href={episode.platformLinks.spotify} target="_blank" rel="noopener noreferrer" className="text-[#1DB954] hover:scale-110 transition-transform">
                    <FiMusic size={14} title="Spotify" />
                  </a>
                )}
                {episode.platformLinks?.youtube && (
                  <a href={episode.platformLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-[#FF0000] hover:scale-110 transition-transform">
                    <FiYoutube size={16} title="YouTube" />
                  </a>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <FiClock size={13} className="text-zinc-600" />
                {new Date(episode.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
              </div>
            </div>

            {/* Featured Players as Tags */}
            <div className="flex flex-wrap gap-2">
              {episode.players?.map((player: any) => (
                <span
                  key={player.id}
                  className="px-2.5 py-1 rounded-full border border-[#1E293B] bg-[#080C14] text-zinc-400 text-[10px] md:text-[11px] font-medium outfit tracking-wide"
                >
                  {player.name}
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
            onClick={() => { 
              const episode = podcasts.find(p => p.id === openDropdown)
              if (episode) onEdit(episode)
              setOpenDropdown(null) 
            }}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-zinc-300 hover:bg-white/5 hover:text-white transition-colors outfit"
          >
            <FiEdit2 size={15} /> Edit
          </button>
          <div className="mx-3 my-1 border-t border-[#1E293B]" />
          <button
            onClick={() => { 
              setPodcastToDelete(openDropdown)
              setIsDeleteModalOpen(true)
              setOpenDropdown(null) 
            }}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors outfit"
          >
            <FiTrash2 size={15} /> Delete
          </button>
        </div>,
        document.body
      )}

      <DeleteConfirmationModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
        title="Delete Podcast"
        message="Are you sure you want to delete this podcast episode? This action cannot be undone."
      />
    </div>
  )
}

export default AdminPodcastDetails