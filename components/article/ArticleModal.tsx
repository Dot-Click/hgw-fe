"use client"

import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { fetchCategories } from '@/store/actions/categoryActions'
import CustomModal from '../common/CustomModal'
import { cn, Popover } from '@heroui/react'
import { 
    FiX, 
    FiUploadCloud, 
    FiType, 
    FiClock, 
    FiChevronDown,
    FiUser,
    FiStar,
    FiFileText
} from 'react-icons/fi'

interface ArticleModalProps {
    isOpen: boolean
    onClose: () => void
    article?: any
}

export const ArticleModal = ({ isOpen, onClose, article }: ArticleModalProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const { categories } = useSelector((state: RootState) => state.categories)

    const [formData, setFormData] = useState({
        title: '',
        authorName: '',
        categoryId: '',
        readTime: '',
        featured: false
    })
    
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [isSubmitted, setIsSubmitted] = useState(false)
    
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isOpen) {
            dispatch(fetchCategories())
            
            if (article) {
                setFormData({
                    title: article.title || '',
                    authorName: article.author || '',
                    categoryId: article.categoryId || '',
                    readTime: article.readTime?.toString() || '',
                    featured: article.featured || false
                })
                setPreviewUrl(article.imageUrl || null)
            } else {
                resetForm()
            }
            setIsSubmitted(false)
        }
    }, [isOpen, article, dispatch])

    const resetForm = () => {
        setFormData({
            title: '',
            authorName: '',
            categoryId: '',
            readTime: '',
            featured: false
        })
        setPreviewUrl(null)
        setSelectedFile(null)
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

    const handleSubmit = async () => {
        setIsSubmitted(true)
        if (!formData.title || !formData.categoryId || !formData.authorName || !previewUrl) {
            // In a real scenario we might show a toast here
            return
        }
        
        console.log("Article Data:", {
            ...formData,
            imageUrl: previewUrl,
            file: selectedFile
        })
        
        // Basic behavior as requested: Modal should close properly
        onClose()
    }

    const selectedCategory = categories.find(c => c.id === formData.categoryId)

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
                            {article ? 'Edit Article' : 'New Article'}
                        </h2>
                        <p className="text-[11px] text-gray-500 mt-0.5">Article Configuration</p>
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
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Article Title <span className="text-red-500">*</span></label>
                        <div className={cn(
                            "flex items-center gap-2 bg-[#121218] border rounded-xl px-4 h-11 transition-all",
                            isSubmitted && !formData.title ? "border-red-500/60" : "border-[#252530] focus-within:border-blue-500/50"
                        )}>
                            <FiType size={15} className="text-gray-500" />
                            <input 
                                type="text"
                                placeholder="Enter article title"
                                value={formData.title}
                                onChange={(e) => setFormData(p => ({...p, title: e.target.value}))}
                                className="flex-1 bg-transparent text-sm text-white placeholder:text-gray-600 outline-none"
                            />
                        </div>
                    </div>

                    {/* Row: Category + Read Time */}
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

                        {/* Read Time */}
                        <div>
                            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Read Time (min)</label>
                            <div className="flex items-center gap-2 bg-[#121218] border border-[#252530] rounded-xl px-4 h-11">
                                <FiClock size={15} className="text-gray-500" />
                                <input 
                                    type="number"
                                    placeholder="0"
                                    value={formData.readTime}
                                    onChange={(e) => setFormData(p => ({...p, readTime: e.target.value}))}
                                    className="w-full bg-transparent text-sm text-white placeholder:text-gray-600 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Author Name */}
                    <div>
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Author Name <span className="text-red-500">*</span></label>
                        <div className={cn(
                            "flex items-center gap-2 bg-[#121218] border rounded-xl px-4 h-11 transition-all",
                            isSubmitted && !formData.authorName ? "border-red-500/60" : "border-[#252530] focus-within:border-blue-500/50"
                        )}>
                            <FiUser size={15} className="text-gray-500" />
                            <input 
                                type="text"
                                placeholder="Enter author name"
                                value={formData.authorName}
                                onChange={(e) => setFormData(p => ({...p, authorName: e.target.value}))}
                                className="flex-1 bg-transparent text-sm text-white placeholder:text-gray-600 outline-none"
                            />
                        </div>
                    </div>

                    {/* Featured Switch */}
                    <div className="bg-[#121218] border border-[#252530] rounded-xl p-4">
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
                    className="flex-[1.5] h-10 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                >
                    {article ? 'Update Article' : 'Publish Article'}
                </button>
            </div>
        </CustomModal>
    )
}
