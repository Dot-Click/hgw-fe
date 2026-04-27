"use client"

import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { createPodcast, updatePodcast } from '@/store/actions/podcastActions'
import { fetchPlayers } from '@/store/actions/playerActions'
import { fetchCategories } from '@/store/actions/categoryActions'
import CustomModal from '../common/CustomModal'
import { cn, toast, Popover } from '@heroui/react'
import { 
    FiX, 
    FiPlus, 
    FiUploadCloud, 
    FiTrash2, 
    FiLink, 
    FiMusic, 
    FiYoutube, 
    FiType, 
    FiClock, 
    FiCalendar,
    FiCheck,
    FiFileText,
    FiChevronDown,
    FiUsers,
    FiStar,
    FiAward
} from 'react-icons/fi'

import axios from 'axios'

interface EpisodeModalProps {
    isOpen: boolean
    onClose: () => void
    podcast?: any
}

export const EpisodeModal = ({ isOpen, onClose, podcast }: EpisodeModalProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const { loading } = useSelector((state: RootState) => state.podcasts)
    const { players } = useSelector((state: RootState) => state.players)
    const { categories } = useSelector((state: RootState) => state.categories)

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        categoryId: '',
        status: 'draft' as 'draft' | 'published',
        featured: false,
        isPick: false,
        duration: '',
        releaseDate: ''
    })
    
    const [platforms, setPlatforms] = useState<{ platform: string; url: string }[]>([
        { platform: 'spotify', url: '' }
    ])
    
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [selectedPlayerIds, setSelectedPlayerIds] = useState<string[]>([])
    
    const [isProcessing, setIsProcessing] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
    const [showPlayerDropdown, setShowPlayerDropdown] = useState(false)
    const [showPlatformDropdown, setShowPlatformDropdown] = useState<number | null>(null)
    
    const fileInputRef = useRef<HTMLInputElement>(null)
    const categoryRef = useRef<HTMLDivElement>(null)
    const playerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isOpen) {
            dispatch(fetchPlayers())
            dispatch(fetchCategories())
            
            if (podcast) {
                setFormData({
                    title: podcast.title || '',
                    description: podcast.description || '',
                    categoryId: podcast.categoryId || '',
                    status: podcast.status || 'draft',
                    featured: podcast.featured || false,
                    isPick: podcast.isPick || false,
                    duration: podcast.duration?.toString() || '',
                    releaseDate: podcast.releaseDate ? new Date(podcast.releaseDate).toISOString().split('T')[0] : ''
                })
                setPlatforms(podcast.platforms && podcast.platforms.length > 0 ? podcast.platforms : [{ platform: 'spotify', url: '' }])
                setPreviewUrl(podcast.imageUrl || null)
                setSelectedPlayerIds(podcast.players?.map((p: any) => p.id) || [])
            } else {
                resetForm()
            }
            setIsSubmitted(false)
        }
    }, [isOpen, podcast, dispatch])

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) {
                setShowCategoryDropdown(false)
            }
            if (playerRef.current && !playerRef.current.contains(e.target as Node)) {
                setShowPlayerDropdown(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            categoryId: '',
            status: 'draft',
            featured: false,
            isPick: false,
            duration: '',
            releaseDate: ''
        })
        setPlatforms([{ platform: 'spotify', url: '' }])
        setPreviewUrl(null)
        setSelectedFile(null)
        setSelectedPlayerIds([])
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedFile(file)
            const reader = new FileReader()
            reader.onloadend = () => setPreviewUrl(reader.result as string)
            reader.readAsDataURL(file)
        }
    }

    const handleAddPlatform = () => {
        setPlatforms([...platforms, { platform: 'spotify', url: '' }])
    }

    const handleRemovePlatform = (index: number) => {
        if (platforms.length > 1) {
            setPlatforms(platforms.filter((_, i) => i !== index))
        }
    }

    const handlePlatformChange = (index: number, field: 'platform' | 'url', value: string) => {
        const next = [...platforms]
        next[index] = { ...next[index], [field]: value }
        setPlatforms(next)
    }

    const togglePlayer = (playerId: string) => {
        if (selectedPlayerIds.includes(playerId)) {
            setSelectedPlayerIds(selectedPlayerIds.filter(id => id !== playerId))
        } else {
            setSelectedPlayerIds([...selectedPlayerIds, playerId])
        }
    }

    const handleSubmit = async () => {
        setIsSubmitted(true)
        if (!formData.title || !formData.description || !formData.categoryId || selectedPlayerIds.length === 0 || !previewUrl) {
            toast.danger("Please fill in all required fields")
            return
        }
        
        const validPlatforms = platforms.filter(p => p.platform && p.url.trim())
        if (validPlatforms.length === 0) {
            toast.danger("At least one platform link is required")
            return
        }

        setIsProcessing(true)
        try {
            let imageUrl = previewUrl
            
            // Upload Thumbnail
            if (selectedFile) {
                const uploadFormData = new FormData()
                uploadFormData.append('file', selectedFile)
                uploadFormData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '')
                const res = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, uploadFormData)
                imageUrl = res.data.secure_url
            }

            const payload = {
                ...formData,
                duration: parseInt(formData.duration) || 0,
                releaseDate: formData.releaseDate || new Date().toISOString().split('T')[0],
                imageUrl,
                playerIds: selectedPlayerIds,
                platforms: validPlatforms
            }

            if (podcast) {
                await dispatch(updatePodcast({ id: podcast.id, data: payload })).unwrap()
                toast.success("Podcast updated")
            } else {
                await dispatch(createPodcast(payload)).unwrap()
                toast.success("Podcast published")
            }
            onClose()
        } catch (error: any) {
            toast.danger(typeof error === 'string' ? error : error.message || 'Error saving podcast')
        } finally {
            setIsProcessing(false)
        }
    }

    const getPlatformIcon = (platform: string) => {
        switch(platform) {
            case 'spotify': return <FiMusic size={14} className="text-[#1DB954]" />
            case 'youtube': return <FiYoutube size={14} className="text-[#FF0000]" />
            default: return <FiLink size={14} className="text-gray-500" />
        }
    }

    const selectedCategory = categories.find(c => c.id === formData.categoryId)
    const selectedPlayersList = players.filter(p => selectedPlayerIds.includes(p.id))

    return (
        <CustomModal isOpen={isOpen} onClose={onClose} maxWidth="max-w-[680px]">
            {/* Header */}
            <div className="px-6 py-5 flex items-center justify-between bg-[#0D0D12] border-b border-[#1F1F2A]">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                        <FiFileText size={18} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white tracking-tight">
                            {podcast ? 'Edit Episode' : 'New Episode'}
                        </h2>
                        <p className="text-[11px] text-gray-500 mt-0.5">Episode Configuration</p>
                    </div>
                </div>
                <button 
                    onClick={onClose} 
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1A1A20] text-gray-400 hover:text-white transition-all"
                >
                    <FiX size={16} />
                </button>
            </div>

            {/* Content */}
            <div className="px-6 py-5 max-h-[55vh] overflow-y-auto bg-[#0A0A0F]">
                <div className="flex flex-col gap-5">
                    
                    {/* Thumbnail Artwork */}
                    <div>
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">Thumbnail Artwork</label>
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className={cn(
                                "w-full aspect-[21/9] rounded-xl bg-[#121218] border-2 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer overflow-hidden",
                                isSubmitted && !previewUrl ? "border-red-500/60" : "border-[#252530] hover:border-blue-500/50"
                            )}
                        >
                            {previewUrl ? (
                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                                        <FiUploadCloud size={22} className="text-blue-500" />
                                    </div>
                                    <span className="text-xs text-gray-400">Click to upload thumbnail</span>
                                    <span className="text-[10px] text-gray-600">21:9 ratio recommended</span>
                                </div>
                            )}
                            <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/*" className="hidden" />
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Episode Title <span className="text-red-500">*</span></label>
                        <div className={cn(
                            "flex items-center gap-2 bg-[#121218] border rounded-xl px-4 h-11 transition-all",
                            isSubmitted && !formData.title ? "border-red-500/60" : "border-[#252530] focus-within:border-blue-500/50"
                        )}>
                            <FiType size={15} className="text-gray-500" />
                            <input 
                                type="text"
                                placeholder="Enter episode title"
                                value={formData.title}
                                onChange={(e) => setFormData(p => ({...p, title: e.target.value}))}
                                className="flex-1 bg-transparent text-sm text-white placeholder:text-gray-600 outline-none"
                            />
                        </div>
                    </div>

                    {/* Row: Category + Duration */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Category Dropdown */}
                        <div className="relative">
                            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Category <span className="text-red-500">*</span></label>
                            <Popover>
                                <Popover.Trigger>
                                    <div 
                                        className={cn(
                                            "flex items-center justify-between bg-[#121218] border rounded-xl px-4 h-11 cursor-pointer transition-all",
                                            isSubmitted && !formData.categoryId ? "border-red-500/60" : "border-[#252530] hover:border-gray-600"
                                        )}
                                    >
                                        <span className={cn("text-sm", formData.categoryId ? "text-white" : "text-gray-500")}>
                                            {selectedCategory?.name || "Select category"}
                                        </span>
                                        <FiChevronDown size={14} className="text-gray-500" />
                                    </div>
                                </Popover.Trigger>
                                <Popover.Content placement="bottom start" offset={8} className="bg-[#121218] border border-[#252530] rounded-xl z-[9999] max-h-48 overflow-y-auto shadow-2xl p-1 min-w-[200px]">
                                    {categories.length > 0 ? (
                                        <div className="flex flex-col">
                                            {categories.map(cat => (
                                                <div
                                                    key={cat.id}
                                                    onClick={() => {
                                                        setFormData(p => ({...p, categoryId: cat.id}))
                                                    }}
                                                    className="px-4 py-2.5 text-sm text-gray-300 hover:bg-blue-500/10 hover:text-white cursor-pointer transition-colors rounded-lg"
                                                >
                                                    {cat.name}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="px-4 py-2 text-xs text-gray-500">No categories found</div>
                                    )}
                                </Popover.Content>
                            </Popover>
                        </div>

                        {/* Duration */}
                        <div className="col-span-2">
                            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Duration (min)</label>
                            <div className="flex items-center gap-2 bg-[#121218] border border-[#252530] rounded-xl px-4 h-11">
                                <FiClock size={15} className="text-gray-500" />
                                <input 
                                    type="number"
                                    placeholder="0"
                                    value={formData.duration}
                                    onChange={(e) => setFormData(p => ({...p, duration: e.target.value}))}
                                    className="w-full bg-transparent text-sm text-white placeholder:text-gray-600 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Release Date</label>
                        <div className="flex items-center gap-2 bg-[#121218] border border-[#252530] rounded-xl px-4 h-11 focus-within:border-blue-500/50 transition-all">
                            <FiCalendar size={15} className="text-gray-500" />
                            <input 
                                type="date"
                                value={formData.releaseDate}
                                onChange={(e) => setFormData(p => ({...p, releaseDate: e.target.value}))}
                                className="flex-1 bg-transparent text-sm text-white outline-none [color-scheme:dark] cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Description <span className="text-red-500">*</span></label>
                        <textarea 
                            rows={3}
                            placeholder="Write episode description..."
                            value={formData.description}
                            onChange={(e) => setFormData(p => ({...p, description: e.target.value}))}
                            className={cn(
                                "w-full bg-[#121218] border rounded-xl p-3 text-sm text-white outline-none resize-none transition-all placeholder:text-gray-600",
                                isSubmitted && !formData.description ? "border-red-500/60" : "border-[#252530] focus:border-blue-500/50"
                            )}
                        />
                    </div>

                    {/* Featured Legends Dropdown */}
                    <div className="relative">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Featured Legends <span className="text-red-500">*</span></label>
                        <Popover>
                            <Popover.Trigger>
                                <div 
                                    className={cn(
                                        "flex items-center justify-between bg-[#121218] border rounded-xl px-4 min-h-11 py-2 cursor-pointer transition-all",
                                        isSubmitted && selectedPlayerIds.length === 0 ? "border-red-500/60" : "border-[#252530] hover:border-gray-600"
                                    )}
                                >
                                    <div className="flex flex-wrap gap-1.5 flex-1">
                                        {selectedPlayersList.length === 0 ? (
                                            <span className="text-sm text-gray-500">Select featured legends...</span>
                                        ) : (
                                            selectedPlayersList.map(player => (
                                                <div key={player.id} className="flex items-center gap-1 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-md text-xs text-blue-400">
                                                    {player.name}
                                                    <FiX size={10} className="cursor-pointer hover:text-white" onClick={(e) => { e.stopPropagation(); togglePlayer(player.id); }} />
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    <FiChevronDown size={14} className="text-gray-500 ml-2" />
                                </div>
                            </Popover.Trigger>
                            <Popover.Content placement="bottom start" offset={8} className="bg-[#121218] border border-[#252530] rounded-xl z-[9999] max-h-48 overflow-y-auto shadow-2xl p-1 min-w-[240px]">
                                {players.length > 0 ? (
                                    <div className="flex flex-col">
                                        {players.map(player => (
                                            <div
                                                key={player.id}
                                                onClick={() => togglePlayer(player.id)}
                                                className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-300 hover:bg-blue-500/10 hover:text-white cursor-pointer transition-colors rounded-lg"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className={cn("w-4 h-4 rounded border flex items-center justify-center transition-all", selectedPlayerIds.includes(player.id) ? "bg-blue-500 border-blue-500" : "border-gray-600")}>
                                                        {selectedPlayerIds.includes(player.id) && <FiCheck size={10} className="text-white" />}
                                                    </div>
                                                    <span>{player.name}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="px-4 py-2 text-xs text-gray-500">No players found</div>
                                )}
                            </Popover.Content>
                        </Popover>
                    </div>

                    {/* Status & Featured Switches */}
                    <div className="grid grid-cols-2 gap-4 bg-[#121218] border border-[#252530] rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-sm font-medium text-white">Status</span>
                                <p className="text-[10px] text-gray-500">Draft or Published</p>
                            </div>
                            <div className={cn(
                                "px-3 py-1 rounded-lg text-xs font-bold",
                                formData.status === 'published' ? "bg-emerald-500/10 text-emerald-500" : "bg-orange-500/10 text-orange-500"
                            )}>
                                {formData.status.toUpperCase()}
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer"
                                    checked={formData.status === 'published'}
                                    onChange={(e) => setFormData(p => ({...p, status: e.target.checked ? 'published' : 'draft'}))}
                                />
                                <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FiStar size={14} className="text-amber-500" />
                                <span className="text-sm font-medium text-white">Featured</span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer"
                                    checked={formData.featured}
                                    onChange={(e) => setFormData(p => ({...p, featured: e.target.checked}))}
                                />
                                <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        <div className="col-span-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FiAward size={14} className="text-blue-500" />
                                <span className="text-sm font-medium text-white">Pick of the Week</span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer"
                                    checked={formData.isPick}
                                    onChange={(e) => setFormData(p => ({...p, isPick: e.target.checked}))}
                                />
                                <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Platform Links</label>
                            <button onClick={handleAddPlatform} className="text-blue-500 hover:text-blue-400 text-xs flex items-center gap-1">
                                <FiPlus size={12} /> Add
                            </button>
                        </div>
                        <div className="space-y-3">
                            {platforms.map((p, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    {/* Platform Dropdown */}
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowPlatformDropdown(showPlatformDropdown === index ? null : index)}
                                            className="w-9 h-9 flex items-center justify-center bg-[#121218] border border-[#252530] rounded-lg hover:border-gray-600 transition-all"
                                        >
                                            {getPlatformIcon(p.platform)}
                                        </button>
                                        {showPlatformDropdown === index && (
                                            <div className="absolute top-full left-0 mt-1 bg-[#121218] border border-[#252530] rounded-lg z-50 min-w-[120px] shadow-xl">
                                                {['spotify', 'youtube', 'apple', 'google', 'other'].map(plat => (
                                                    <div
                                                        key={plat}
                                                        onClick={() => {
                                                            handlePlatformChange(index, 'platform', plat)
                                                            setShowPlatformDropdown(null)
                                                        }}
                                                        className="px-3 py-2 text-xs text-gray-300 hover:bg-blue-500/10 hover:text-white capitalize cursor-pointer transition-colors"
                                                    >
                                                        {plat}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <input 
                                        type="text"
                                        placeholder="Episode URL"
                                        value={p.url}
                                        onChange={(e) => handlePlatformChange(index, 'url', e.target.value)}
                                        className="flex-1 h-9 bg-[#121218] border border-[#252530] rounded-lg px-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-blue-500/50 transition-all"
                                    />
                                    {platforms.length > 1 && (
                                        <button onClick={() => handleRemovePlatform(index)} className="text-gray-500 hover:text-red-500 transition-colors">
                                            <FiTrash2 size={14} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-[#1F1F2A] bg-[#0D0D12] flex gap-3">
                <button 
                    onClick={onClose}
                    className="flex-1 h-10 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                    Cancel
                </button>
                <button 
                    onClick={handleSubmit}
                    disabled={isProcessing || loading}
                    className="flex-[1.5] h-10 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                >
                    {(isProcessing || loading) ? (
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        podcast ? 'Update Episode' : 'Publish Episode'
                    )}
                </button>
            </div>
        </CustomModal>
    )
}