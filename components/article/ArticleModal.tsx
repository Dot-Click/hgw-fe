"use client"

import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { fetchCategories } from '@/store/actions/categoryActions'
import { createArticle, updateArticle } from '@/store/actions/articleActions'
import CustomModal from '../common/CustomModal'
import { cn, Popover, Spinner } from '@heroui/react'
import { 
    FiX, 
    FiUploadCloud, 
    FiType, 
    FiClock, 
    FiChevronDown,
    FiUser,
    FiStar,
    FiFileText,
    FiAlignLeft,
    FiCheck
} from 'react-icons/fi'
import axios from 'axios'

interface ArticleModalProps {
    isOpen: boolean
    onClose: () => void
    article?: any
}

export const ArticleModal = ({ isOpen, onClose, article }: ArticleModalProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const { categories } = useSelector((state: RootState) => state.categories)
    const { loading } = useSelector((state: RootState) => state.articles)

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        authorName: '',
        categoryId: '',
        readTime: '',
        featured: false,
        status: 'DRAFT' as 'PUBLISHED' | 'DRAFT'
    })
    
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isOpen) {
            dispatch(fetchCategories())
            
            if (article) {
                setFormData({
                    title: article.title || '',
                    description: article.description || '',
                    authorName: article.authorName || '',
                    categoryId: article.categoryId || '',
                    readTime: article.readTime?.toString() || '',
                    featured: article.featured || false,
                    status: article.status || 'DRAFT'
                })
                setPreviewUrl(article.imageUrl || null)
                setImageUrl(article.imageUrl || null)
            } else {
                resetForm()
            }
            setIsSubmitted(false)
        }
    }, [isOpen, article, dispatch])

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            authorName: '',
            categoryId: '',
            readTime: '',
            featured: false,
            status: 'DRAFT'
        })
        setPreviewUrl(null)
        setImageUrl(null)
        setSelectedFile(null)
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedFile(file)
            const reader = new FileReader()
            reader.onloadend = () => setPreviewUrl(reader.result as string)
            reader.readAsDataURL(file)
            setImageUrl(null) // reset finalized url
        }
    }

    const handleSubmit = async () => {
        setIsSubmitted(true)
        if (!formData.title || !formData.description || !formData.categoryId || !formData.authorName || (!selectedFile && !previewUrl && !imageUrl)) {
            return
        }

        let finalImageUrl = imageUrl || previewUrl;

        if (selectedFile) {
            setIsUploading(true);
            const uploadData = new FormData();
            uploadData.append('file', selectedFile);
            uploadData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "hgw_players");

            try {
                const res = await axios.post(
                    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                    uploadData
                );
                finalImageUrl = res.data.secure_url;
                setImageUrl(finalImageUrl);
            } catch (error) {
                console.error("Upload error:", error);
                setIsUploading(false);
                return; // Stop if upload fails
            }
            setIsUploading(false);
        }
        
        if (!finalImageUrl) return;

        const payload = {
            ...formData,
            imageUrl: finalImageUrl,
        }

        if (article) {
            await dispatch(updateArticle({ id: article.id, data: payload }))
        } else {
            await dispatch(createArticle(payload))
        }
        
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
            <div className="px-6 py-5 max-h-[70vh] overflow-y-auto bg-[#0A0A0F]">
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
                        </div>
                        <div className="flex gap-2 w-full mt-2">
                            <button 
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full bg-[#1A1A20] hover:bg-[#252530] text-gray-300 py-2 rounded-lg text-xs font-medium transition-colors"
                            >
                                {selectedFile || previewUrl ? 'Change Image' : 'Select Image'}
                            </button>
                        </div>
                        <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/*" className="hidden" />
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

                    {/* Description */}
                    <div>
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Description <span className="text-red-500">*</span></label>
                        <div className={cn(
                            "flex gap-2 bg-[#121218] border rounded-xl px-4 py-3 min-h-[120px] transition-all",
                            isSubmitted && !formData.description ? "border-red-500/60" : "border-[#252530] focus-within:border-blue-500/50"
                        )}>
                            <FiAlignLeft size={15} className="text-gray-500 mt-1" />
                            <textarea 
                                placeholder="Enter article description (long text)..."
                                value={formData.description}
                                onChange={(e) => setFormData(p => ({...p, description: e.target.value}))}
                                className="flex-1 bg-transparent text-sm text-white placeholder:text-gray-600 outline-none resize-none"
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

                    {/* Status & Featured Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Status Switch */}
                        <div className="bg-[#121218] border border-[#252530] rounded-xl p-4 flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-white">Status</span>
                                <span className="text-[10px] text-gray-500">Draft or Published</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={cn(
                                    "px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest",
                                    formData.status === 'PUBLISHED' ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-orange-500/10 text-orange-500 border border-orange-500/20"
                                )}>
                                    {formData.status}
                                </span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        className="sr-only peer"
                                        checked={formData.status === 'PUBLISHED'}
                                        onChange={(e) => setFormData(p => ({...p, status: e.target.checked ? 'PUBLISHED' : 'DRAFT'}))}
                                    />
                                    <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>

                        {/* Featured Switch */}
                        <div className="bg-[#121218] border border-[#252530] rounded-xl p-4 flex items-center justify-between">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <FiStar size={14} className={formData.featured ? "text-amber-500" : "text-gray-500"} />
                                    <span className="text-sm font-bold text-white">Featured</span>
                                </div>
                                <span className="text-[10px] text-gray-500">Highlight article</span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer"
                                    checked={formData.featured}
                                    onChange={(e) => setFormData(p => ({...p, featured: e.target.checked}))}
                                />
                                <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-[#1F1F2A] bg-[#0D0D12] flex gap-3">
                <button 
                    onClick={onClose}
                    disabled={loading || isUploading}
                    className="flex-1 h-10 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-50"
                >
                    Cancel
                </button>
                <button 
                    onClick={handleSubmit}
                    disabled={loading || isUploading}
                    className="flex-[2] h-10 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg text-sm shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {isUploading ? <><Spinner size="sm" color="current" /> Uploading...</> : loading ? <Spinner size="sm" color="current" /> : (article ? 'Update Article' : 'Save Article')}
                </button>
            </div>
        </CustomModal>
    )
}
