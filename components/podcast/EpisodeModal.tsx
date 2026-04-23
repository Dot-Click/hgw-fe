"use client"

import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { createPodcast, updatePodcast, deletePodcast } from '@/store/actions/podcastActions'
import BaseModal from '../common/BaseModal'
import { Button, Spinner, cn, toast } from '@heroui/react'
import { FiCamera, FiX, FiPlus, FiMusic, FiYoutube, FiChevronDown, FiCheck, FiUploadCloud, FiSearch, FiTrash2 } from 'react-icons/fi'
import axios from 'axios'
import { fetchPlayers } from '@/store/actions/playerActions'

interface EpisodeModalProps {
    isOpen: boolean
    onClose: () => void
    podcast?: any // If provided, we are in Edit mode
}

export const EpisodeModal = ({ isOpen, onClose, podcast }: EpisodeModalProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const { loading } = useSelector((state: RootState) => state.podcasts)
    const { players } = useSelector((state: RootState) => state.players)

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        spotify: '',
        youtube: '',
        status: 'draft' as 'draft' | 'published'
    })
    
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [selectedPlayerIds, setSelectedPlayerIds] = useState<Set<string>>(new Set())
    const [isProcessing, setIsProcessing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [showPlayerDropdown, setShowPlayerDropdown] = useState(false)
    const [playerSearch, setPlayerSearch] = useState('')
    
    const fileInputRef = useRef<HTMLInputElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isOpen) {
            dispatch(fetchPlayers())
            if (podcast) {
                setFormData({
                    title: podcast.title || '',
                    description: podcast.description || '',
                    spotify: podcast.platformLinks?.spotify || '',
                    youtube: podcast.platformLinks?.youtube || '',
                    status: podcast.status || 'draft'
                })
                setPreviewUrl(podcast.imageUrl || null)
                setSelectedPlayerIds(new Set(podcast.players?.map((p: any) => p.id) || []))
            } else {
                setFormData({ title: '', description: '', spotify: '', youtube: '', status: 'draft' })
                setPreviewUrl(null)
                setSelectedPlayerIds(new Set())
            }
        }
    }, [isOpen, podcast, dispatch])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowPlayerDropdown(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedFile(file)
            const reader = new FileReader()
            reader.onloadend = () => setPreviewUrl(reader.result as string)
            reader.readAsDataURL(file)
        }
    }

    const togglePlayer = (id: string) => {
        const next = new Set(selectedPlayerIds)
        if (next.has(id)) {
            next.delete(id)
        } else {
            next.add(id)
        }
        setSelectedPlayerIds(next)
    }

    const handleClose = () => {
        setFormData({ title: '', description: '', spotify: '', youtube: '', status: 'draft' })
        setSelectedFile(null)
        setPreviewUrl(null)
        setSelectedPlayerIds(new Set())
        setShowPlayerDropdown(false)
        setPlayerSearch('')
        onClose()
    }

    const handleSubmit = async () => {
        if (!formData.title) {
            return toast.danger("Please enter a podcast title")
        }
        if (!previewUrl) {
            return toast.danger("Please upload a cover image")
        }
        if (selectedPlayerIds.size === 0) {
            return toast.danger("Select at least one featured player")
        }

        setIsProcessing(true)
        try {
            let imageUrl = previewUrl
            
            // 1. Upload image if a new file was selected
            if (selectedFile) {
                const uploadFormData = new FormData()
                uploadFormData.append('file', selectedFile)
                uploadFormData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '')

                const res = await axios.post(
                    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                    uploadFormData
                )
                imageUrl = res.data.secure_url
            }

            const payload = {
                title: formData.title,
                description: formData.description,
                status: formData.status,
                imageUrl,
                playerIds: Array.from(selectedPlayerIds),
                platformLinks: {
                    spotify: formData.spotify,
                    youtube: formData.youtube
                }
            }

            if (podcast) {
                await dispatch(updatePodcast({ id: podcast.id, data: payload })).unwrap()
                toast.success("Podcast updated successfully")
            } else {
                await dispatch(createPodcast(payload)).unwrap()
                toast.success("Podcast created successfully")
            }
            handleClose()
        } catch (error: any) {
            // unwrap() throws the string from rejectWithValue
            const errorMessage = typeof error === 'string' ? error : (error.message || 'Something went wrong')
            toast.danger(errorMessage)
        } finally {
            setIsProcessing(false)
        }
    }

    const handleDelete = async () => {
        if (!podcast) return
        
        if (!window.confirm("Are you sure you want to delete this podcast?")) return

        setIsDeleting(true)
        try {
            await dispatch(deletePodcast(podcast.id)).unwrap()
            toast.success("Podcast deleted successfully")
            handleClose()
        } catch (error: any) {
            const errorMessage = typeof error === 'string' ? error : (error.message || 'Failed to delete')
            toast.danger(errorMessage)
        } finally {
            setIsDeleting(false)
        }
    }

    const filteredPlayers = players.filter(p => 
        p.name.toLowerCase().includes(playerSearch.toLowerCase())
    )

    return (
        <BaseModal isOpen={isOpen} onClose={handleClose} maxWidth="max-w-4xl">
            {/* Header */}
            <div className="px-8 py-5 border-b border-white/5 bg-white/[0.02]">
                <h2 className="text-xl font-bold text-white outfit">{podcast ? 'Edit' : 'Add New'} <span className="text-[#00D4FF]">Podcast</span></h2>
                <p className="text-zinc-400 text-xs mt-0.5 outfit">{podcast ? 'Update the details of this podcast episode.' : 'Fill in the details below to publish your new episode.'}</p>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Cover Image Section */}
                    <div className="lg:col-span-4 flex flex-col gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-zinc-300 outfit px-1 uppercase tracking-wider">Podcast Cover <span className="text-red-500">*</span></label>
                            <div 
                                onClick={() => fileInputRef.current?.click()}
                                className="aspect-square rounded-2xl bg-white/[0.03] border-2 border-dashed border-white/10 hover:border-[#00D4FF]/50 transition-all flex items-center justify-center cursor-pointer group overflow-hidden relative"
                            >
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex flex-col items-center gap-2 text-zinc-500 group-hover:text-zinc-300">
                                        <FiUploadCloud size={32} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Upload Artwork</span>
                                    </div>
                                )}
                                <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/*" className="hidden" />
                            </div>
                            {previewUrl && (
                                <button 
                                    onClick={() => { setPreviewUrl(null); setSelectedFile(null) }}
                                    className="text-[10px] text-red-400 font-bold hover:text-red-300 transition-colors mt-1.5 self-center uppercase tracking-widest"
                                >
                                    Remove Image
                                </button>
                            )}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-zinc-300 outfit px-1 uppercase tracking-wider">Visibility</label>
                            <div className="flex bg-white/[0.03] p-1 rounded-xl border border-white/5">
                                <button 
                                    onClick={() => setFormData(p => ({...p, status: 'draft'}))}
                                    className={cn(
                                        "flex-1 py-2 rounded-lg text-[10px] font-bold transition-all uppercase tracking-widest",
                                        formData.status === 'draft' ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20" : "text-zinc-500 hover:text-zinc-300"
                                    )}
                                >
                                    DRAFT
                                </button>
                                <button 
                                    onClick={() => setFormData(p => ({...p, status: 'published'}))}
                                    className={cn(
                                        "flex-1 py-2 rounded-lg text-[10px] font-bold transition-all uppercase tracking-widest",
                                        formData.status === 'published' ? "bg-green-600 text-white shadow-lg shadow-green-600/20" : "text-zinc-500 hover:text-zinc-300"
                                    )}
                                >
                                    PUBLISHED
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Form Details */}
                    <div className="lg:col-span-8 flex flex-col gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-zinc-300 outfit px-1 uppercase tracking-wider">Podcast Title <span className="text-red-500">*</span></label>
                            <input 
                                placeholder="e.g. The Future of Gaming Episode #42"
                                value={formData.title}
                                onChange={(e) => setFormData(p => ({...p, title: e.target.value}))}
                                className="w-full h-11 bg-white/[0.03] border border-white/10 rounded-xl px-4 text-sm text-white outfit focus:border-[#00D4FF] outline-none transition-all placeholder:text-zinc-600"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-zinc-300 outfit px-1 uppercase tracking-wider">Description</label>
                            <textarea 
                                placeholder="What is this episode about?"
                                rows={3}
                                value={formData.description}
                                onChange={(e) => setFormData(p => ({...p, description: e.target.value}))}
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-sm text-white outfit focus:border-[#00D4FF] outline-none transition-all placeholder:text-zinc-600 resize-none"
                            />
                        </div>

                        {/* Custom Multi-Select for Players */}
                        <div className="flex flex-col gap-1.5 relative" ref={dropdownRef}>
                            <label className="text-xs font-semibold text-zinc-300 outfit px-1 uppercase tracking-wider">Featured Players <span className="text-red-500">*</span></label>
                            <div 
                                onClick={() => setShowPlayerDropdown(!showPlayerDropdown)}
                                className="min-h-[3.25rem] bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2 flex items-center justify-between cursor-pointer hover:border-white/20 transition-all"
                            >
                                <div className="flex flex-wrap gap-2">
                                    {selectedPlayerIds.size === 0 ? (
                                        <span className="text-zinc-600 text-sm">Select players to feature...</span>
                                    ) : (
                                        players.filter(p => selectedPlayerIds.has(p.id)).map(player => (
                                            <div key={player.id} className="flex items-center gap-2 bg-[#00D4FF]/10 border border-[#00D4FF]/20 py-1 pl-1 pr-2 rounded-lg group">
                                                <img src={player.image || ''} className="w-5 h-5 rounded-md object-cover" />
                                                <span className="text-[10px] font-bold text-[#00D4FF] uppercase tracking-wider">{player.name}</span>
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); togglePlayer(player.id) }}
                                                    className="text-[#00D4FF] hover:text-white transition-colors"
                                                >
                                                    <FiX size={12} />
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                                <FiChevronDown className={cn("text-zinc-500 transition-transform", showPlayerDropdown && "rotate-180")} />
                            </div>

                            {showPlayerDropdown && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-[#1A1F2E] border border-white/10 rounded-2xl shadow-2xl z-50 p-2 animate-in fade-in slide-in-from-top-2">
                                    <div className="relative mb-2">
                                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                                        <input 
                                            autoFocus
                                            placeholder="Search players..."
                                            value={playerSearch}
                                            onChange={(e) => setPlayerSearch(e.target.value)}
                                            className="w-full h-10 bg-black/20 rounded-xl pl-10 pr-4 text-sm text-white outline-none border border-transparent focus:border-[#00D4FF]/30"
                                        />
                                    </div>
                                    <div className="max-h-60 overflow-y-auto custom-scrollbar flex flex-col gap-1">
                                        {filteredPlayers.length === 0 ? (
                                            <div className="py-8 text-center text-zinc-600 text-sm">No players found</div>
                                        ) : (
                                            filteredPlayers.map(player => {
                                                const isSelected = selectedPlayerIds.has(player.id)
                                                return (
                                                    <div 
                                                        key={player.id}
                                                        onClick={() => togglePlayer(player.id)}
                                                        className={cn(
                                                            "flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all",
                                                            isSelected ? "bg-[#00D4FF]/10" : "hover:bg-white/5"
                                                        )}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <img src={player.image || ''} className="w-8 h-8 rounded-lg object-cover" />
                                                            <span className={cn("text-sm font-medium", isSelected ? "text-[#00D4FF]" : "text-zinc-300")}>
                                                                {player.name}
                                                            </span>
                                                        </div>
                                                        {isSelected && <FiCheck className="text-[#00D4FF]" />}
                                                    </div>
                                                )
                                            })
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-zinc-300 outfit px-1 uppercase tracking-wider flex items-center gap-2">
                                    <FiMusic className="text-[#1DB954]" /> Spotify
                                </label>
                                <input 
                                    placeholder="Spotify link..."
                                    value={formData.spotify}
                                    onChange={(e) => setFormData(p => ({...p, spotify: e.target.value}))}
                                    className="w-full h-11 bg-white/[0.03] border border-white/10 rounded-xl px-4 text-sm text-white outfit focus:border-[#00D4FF] outline-none transition-all placeholder:text-zinc-600"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-zinc-300 outfit px-1 uppercase tracking-wider flex items-center gap-2">
                                    <FiYoutube className="text-[#FF0000]" /> YouTube
                                </label>
                                <input 
                                    placeholder="YouTube link..."
                                    value={formData.youtube}
                                    onChange={(e) => setFormData(p => ({...p, youtube: e.target.value}))}
                                    className="w-full h-11 bg-white/[0.03] border border-white/10 rounded-xl px-4 text-sm text-white outfit focus:border-[#00D4FF] outline-none transition-all placeholder:text-zinc-600"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/5 bg-white/[0.02] flex items-center gap-4">
                {podcast && (
                    <button 
                        onClick={handleDelete}
                        disabled={isDeleting || isProcessing}
                        className="flex-none w-12 h-12 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center outline-none"
                        title="Delete Podcast"
                    >
                        {isDeleting ? <Spinner size="sm" color="current" /> : <FiTrash2 size={20} />}
                    </button>
                )}
                <button 
                    onClick={handleClose}
                    className="flex-1 h-12 rounded-xl text-zinc-400 font-bold text-xs uppercase tracking-widest hover:text-white hover:bg-white/5 border border-white/10 transition-all outline-none"
                >
                    Cancel
                </button>
                <button 
                    onClick={handleSubmit}
                    disabled={isProcessing || loading || isDeleting}
                    className="flex-1 h-12 bg-[#00D4FF] hover:bg-[#00D4FF]/90 disabled:opacity-50 disabled:cursor-not-allowed text-[#030712] font-bold rounded-xl shadow-lg shadow-[#00D4FF]/20 transition-all flex items-center justify-center gap-2 outline-none active:scale-[0.98] uppercase text-xs tracking-widest"
                >
                    {isProcessing || loading ? (
                        <>
                            <Spinner size="sm" color="current" />
                            <span>{podcast ? 'UPDATING...' : 'CREATING...'}</span>
                        </>
                    ) : (
                        <>
                            <FiCheck size={18} className="stroke-[3]" />
                            <span>{podcast ? 'UPDATE PODCAST' : 'CREATE PODCAST'}</span>
                        </>
                    )}
                </button>
            </div>
        </BaseModal>
    )
}
