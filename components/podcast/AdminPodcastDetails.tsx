"use client"

import React, { useEffect } from 'react'
import { cn, toast, Skeleton } from '@heroui/react'
import { FiSearch, FiClock, FiExternalLink, FiMoreHorizontal, FiEye, FiEdit2, FiTrash2, FiYoutube, FiMusic, FiStar, FiAward, FiCalendar, FiHeadphones } from 'react-icons/fi'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchPodcasts, deletePodcast } from '@/store/actions/podcastActions'
import DeleteConfirmationModal from '../common/DeleteConfirmationModal'
import { Popover, PopoverTrigger } from '@heroui/react'

interface AdminPodcastDetailsProps {
  onEdit: (podcast: any) => void
}

const AdminPodcastDetails = ({ onEdit }: AdminPodcastDetailsProps) => {
  const dispatch = useAppDispatch()
  const { podcasts, loading } = useAppSelector((state) => state.podcasts)
  
  const [search, setSearch] = React.useState('')
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

  if (loading && podcasts.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in duration-500">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-[#0D1424] border border-[#1E293B] rounded-[24px] p-6 space-y-4">
            <div className="flex gap-4">
              <Skeleton className="w-20 h-20 rounded-xl bg-zinc-900" />
              <div className="flex-1 space-y-3">
                <Skeleton className="w-3/4 h-5 rounded bg-zinc-900" />
                <Skeleton className="w-1/2 h-3 rounded bg-zinc-800/20" />
              </div>
            </div>
            <div className="flex gap-3">
              <Skeleton className="w-24 h-4 rounded bg-zinc-800/20" />
              <Skeleton className="w-24 h-4 rounded bg-zinc-800/20" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="w-16 h-6 rounded-lg bg-zinc-900" />
              <Skeleton className="w-16 h-6 rounded-lg bg-zinc-900" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 outfit">
      {/* Search Bar */}
      <div className="bg-[#0D1424] border border-[#1E293B] p-4 md:p-6 rounded-[20px] md:rounded-[24px] shadow-xl">
        <div className="relative max-w-md group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-[#00D4FF]/60 transition-colors">
            <FiSearch size={20} />   
          </div>
          <input
            type="text"          
            placeholder="Search by title, player, or status..."
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
            className="bg-[#0B1121] border border-[#1E293B] rounded-2xl p-4 md:p-5 hover:border-[#2A3040] transition-all group relative overflow-hidden shadow-lg hover:shadow-2xl"
          >
            {/* Top Row: Thumbnail + Info + Menu */}
            <div className="flex gap-4 mb-4 relative z-10">
              {/* Thumbnail Preview */}
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border border-white/5 shrink-0 shadow-lg">
                <img 
                  src={episode.imageUrl || "/assets/pdimg.svg"} 
                  alt={episode.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>

              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col gap-0.5">
                    <h3 className="text-white font-[600] outfit text-sm md:text-base tracking-wide group-hover:text-[#00D4FF] transition-colors line-clamp-1">
                      {episode.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-zinc-500 orbitron uppercase font-bold tracking-widest">
                        EP #{episode.episodeNumber || "0"}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-zinc-800" />
                      <span className="text-[10px] text-zinc-500 orbitron uppercase font-bold tracking-widest">
                        {episode.createdBy?.name || 'Admin'}
                      </span>
                    </div>
                  </div>

                  <Popover>
                    <Popover.Trigger>
                      <button className="text-zinc-500 hover:text-white hover:bg-white/5 transition-all rounded-lg h-7 w-7 md:h-8 md:w-8 flex items-center justify-center outline-none shrink-0">
                        <FiMoreHorizontal size={18} />
                      </button>
                    </Popover.Trigger>
                    <Popover.Content placement="bottom end" offset={8} className="outfit bg-[#111827] border border-[#1E293B] rounded-xl text-white p-1.5 min-w-[160px] shadow-2xl z-[9999]">
                      <div className="flex flex-col gap-1">
                        <button 
                          onClick={() => { console.log("View", episode.id) }}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-all text-left"
                        >
                          <FiEye size={16} className="text-zinc-400" />
                          <span>View</span>
                        </button>
                        <button 
                          onClick={() => onEdit(episode)}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-all text-left"
                        >
                          <FiEdit2 size={16} className="text-[#00D4FF]" />
                          <span>Edit</span>
                        </button>
                        <div className="h-px bg-[#1E293B] my-1 mx-1" />
                        <button 
                          onClick={() => {
                            setPodcastToDelete(episode.id)
                            setIsDeleteModalOpen(true)
                          }}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all text-left"
                        >
                          <FiTrash2 size={16} className="text-red-500" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </Popover.Content>
                  </Popover>
                </div>

                {/* Status & Quick Stats */}
                <div className="flex items-center gap-3 mt-2">
                  <div className={cn(
                    "inline-flex items-center capitalize outfit text-[10px] font-[500] px-2.5 h-6 rounded-full tracking-wider border border-white/5",
                    episode.status === 'published'
                      ? "bg-[#10B981]/10 text-[#10B981]"
                      : "bg-[#F59E0B]/10 text-[#F59E0B]"
                  )}>
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full mr-1.5",
                      episode.status === 'published' ? "bg-[#10B981]" : "bg-[#F59E0B]"
                    )} />
                    {episode.status}
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400 text-[11px] font-medium border-l border-white/5 pl-3">
                    <FiHeadphones size={12} className="text-[#00D4FF]" />
                    {episode.listens?.toLocaleString() || 0}
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400 text-[11px] font-medium border-l border-white/5 pl-3">
                    <FiStar size={12} className="text-[#FFBF00]" />
                    {episode.rating?.toFixed(1) || "4.9"}
                  </div>
                </div>
              </div>
            </div>

            {/* Meta Row: Links, Date, Duration */}
            <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-zinc-500 outfit text-[11px] border-t border-white/5 pt-4 mb-4">
              <div className="flex items-center gap-2 pr-3 border-r border-white/10">
                {(episode.platforms || []).map((p: any, i: number) => {
                  const Icon = p.platform === 'spotify' ? FiMusic : p.platform === 'youtube' ? FiYoutube : FiExternalLink;
                  const color = p.platform === 'spotify' ? '#1DB954' : p.platform === 'youtube' ? '#FF0000' : '#00D4FF';
                  return (
                    <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform opacity-70 hover:opacity-100" style={{ color }}>
                      <Icon size={14} title={p.platform} />
                    </a>
                  );
                })}
              </div>
              <div className="flex items-center gap-1.5">
                <FiClock size={13} className="text-[#00D4FF]/60" />
                {episode.duration || 0} min
              </div>
              <div className="flex items-center gap-1.5">
                <FiCalendar size={13} className="text-zinc-600" />
                {new Date(episode.releaseDate || episode.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
              </div>
              {episode.featured && (
                <div className="flex items-center gap-1 text-yellow-500 font-bold orbitron text-[9px] uppercase tracking-tighter">
                  <FiStar size={10} /> Featured
                </div>
              )}
              {episode.isPick && (
                <div className="flex items-center gap-1 text-[#00D4FF] font-bold orbitron text-[9px] uppercase tracking-tighter">
                  <FiAward size={10} /> Pick
                </div>
              )}
            </div>

            {/* Featured Players as Tags */}
            <div className="flex flex-wrap gap-2">
              {episode.players?.map((player: any) => (
                <span
                  key={player.id}
                  className="px-2.5 py-1 rounded-lg border border-[#1E293B] bg-[#080C14] text-[#00D4FF] text-[9px] font-bold orbitron uppercase tracking-widest hover:border-[#00D4FF]/30 transition-colors"
                >
                  {player.name}
                </span>
              ))}
              {episode.guests?.map((guest: any) => (
                <span
                  key={guest.id}
                  className="px-2.5 py-1 rounded-lg border border-purple-500/10 bg-purple-500/5 text-purple-400 text-[9px] font-bold orbitron uppercase tracking-widest hover:border-purple-500/30 transition-colors"
                >
                  {guest.name}
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