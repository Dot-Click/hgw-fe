"use client"

import React, { useState, useMemo, useEffect, useRef } from 'react'
import { SectionContainer, FormGroup, FormSelect } from './form/FormFields'
import { FiArrowLeft, FiCamera, FiTrash2, FiFileText, FiPlus, FiUpload, FiCheck } from 'react-icons/fi'
import { 
  Switch, 
  Button, 
  Card,
  toast,
  Spinner
} from '@heroui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

// Constants & Types
import { PLAYER_METRICS } from '@/lib/constants/player-metrics'
import { AppDispatch, RootState } from '@/store/store'
import { fetchCategories } from '@/store/slices/categorySlice'
import { addPlayer } from '@/store/slices/playerSlice'
import { calculateHgwScore, HgwMetrics } from '@/lib/utils/scoring'

/**
 * 🏆 NEW PLAYER FORM (Production Rebuild)
 */

export const NewPlayerForm = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  
  // Data from Redux
  const { categories } = useSelector((state: RootState) => state.categories);
  const { loading } = useSelector((state: RootState) => state.players);
  
  // Local Image State
  const [imageUrl, setImageUrl] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // 1. Basic Form State
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    positionRole: '',
    era: '',
    country: '',
    appearancesGames: '',
    goalsPoints: '',
    majorAchievements: '',
  });

  // 2. Metrics State (HGW scoring pillars)
  const [scores, setScores] = useState<HgwMetrics>({
    dominance: 0,
    longevity: 0,
    peakPerformance: 0,
    championships: 0,
    records: 0,
    culturalImpact: 0,
    clutchFactor: 0,
    versatility: 0,
    rivalry: 0,
    legacy: 0,
  });

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Derived State: Calculate HGW Score
  const finalScore = useMemo(() => {
    return calculateHgwScore(scores);
  }, [scores]);

  // Input Handlers
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleScoreChange = (id: string, value: string) => {
    const numValue = Math.min(10, Math.max(0, Number(value) || 0));
    setScores(prev => ({ ...prev, [id as keyof HgwMetrics]: numValue }));
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 📷 Manual Image Handlers
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setImageUrl(''); // Reset finalized URL if new file is picked
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append('file', selectedFile);
    uploadData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "hgw_players");

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        uploadData
      );
      setImageUrl(res.data.secure_url);
      toast.success("Image uploaded to Cloud!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.danger("Upload failed. Check Cloudinary config.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl('');
    setSelectedFile(null);
    setPreviewUrl(null);
  };


  // Submission Handler
  const handleSubmit = async (status: "DRAFT" | "PUBLISHED") => {
    if (!formData.name || !formData.categoryId) {
      toast.danger("Please fill in at least the Name and Category.");
      return;
    }

    const payload = {
      ...formData,
      ...scores,
      image: imageUrl,
      status: status,
      // Ensure numbers are sent as numbers
      appearancesGames: Number(formData.appearancesGames) || 0,
      goalsPoints: Number(formData.goalsPoints) || 0,
      majorAchievements: Number(formData.majorAchievements) || 0,
    };

    try {
      await dispatch(addPlayer(payload)).unwrap();
      toast.success(status === "PUBLISHED" ? "Player published!" : "Draft saved!");
      router.push('/admin/players');
    } catch (error: any) {
      toast.danger(error || "Failed to save player");
    }
  };

  // Prepare categories for FormSelect
  const categoryOptions = useMemo(() => {
    return categories.map(c => ({ id: c.id, label: c.name }));
  }, [categories]);

  return (
    <div className="max-w-[1200px] mx-auto pb-20">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <Link 
            href="/admin/leaderboard" 
            className="flex items-center gap-2 text-zinc-500 hover:text-[#00D4FF] transition-colors text-xs orbitron uppercase font-bold tracking-widest mb-2 group"
          >
            <FiArrowLeft className="group-hover:-translate-x-0 text-sm transition-transform" />
            Back to Leaderboard
          </Link>
          <h1 className="text-2xl font-[900] text-white orbitron tracking-widest">
            Create <span className="text-[#00D4FF]">Player</span>
          </h1>
          <p className="text-sm text-zinc-400 outfit tracking-wide">Add a new legend to the HGW Scoring Engine.</p>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            className="flex-1 sm:flex-none h-11 px-6 rounded-xl border border-[#2A3040] bg-[#1A2333]/50 text-zinc-300 font-bold orbitron text-[13px] uppercase tracking-wider hover:bg-[#2A3040] hover:text-white transition-all flex items-center justify-center gap-2"
            onClick={() => handleSubmit("DRAFT")}
            isDisabled={loading}
          >
            <FiFileText size={16} />
            Save Draft
          </Button>
          <div className="w-px h-10 bg-zinc-800 mx-2 hidden md:block" />
          <Button 
            className="flex-1 sm:flex-none bg-[#00D4FF] text-[#0B0F19] font-black orbitron uppercase tracking-[0.05em] px-6 h-11 rounded-xl border border-[#00D4FF]/50 shadow-[0_0_20px_rgba(0,212,255,0.25)] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all flex items-center justify-center gap-2"
            onClick={() => handleSubmit("PUBLISHED")}
            isDisabled={loading}
          >
            {loading ? <Spinner size="sm" color="current" /> : <FiPlus size={18} strokeWidth={3} />}
            Save & Publish
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: Main Form */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Image Upload Section */}
          <SectionContainer title="Player Profile Image">
            <div className="flex items-center gap-8">
              <div className="relative group">
                <div className="w-40 h-40 rounded-3xl bg-[#080C14] border-2 border-dashed border-[#1E293B] flex items-center justify-center overflow-hidden transition-all group-hover:border-[#00D4FF]/50">
                  {previewUrl || imageUrl ? (
                    <img src={previewUrl || imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <FiCamera className="text-4xl text-zinc-700" />
                  )}
                </div>
                {(previewUrl || imageUrl) && (
                  <button 
                    onClick={handleRemoveImage}
                    className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform z-10"
                  >
                    <FiTrash2 size={14} />
                  </button>
                )}
              </div>

              <div className="flex-1 space-y-4">
                <h4 className="text-white font-bold orbitron uppercase tracking-wider text-sm">Upload Avatar</h4>
                <p className="text-zinc-500 text-sm outfit">1. Select an image. 2. Click upload to finalize.</p>
                
                <div className="flex items-center gap-3">
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*"
                    className="hidden"
                  />
                  
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="bg-[#00D4FF]/5 text-[#00D4FF] border border-[#00D4FF]/20 font-bold outfit text-[11px] tracking-widest px-4 uppercase h-9"
                  >
                    {selectedFile ? 'Change File' : 'Select Image'}
                  </Button>

                  {selectedFile && !imageUrl && (
                    <Button 
                      onClick={handleUpload}
                      isDisabled={isUploading}
                      className="bg-[#00D4FF] text-[#0B0F19] font-black orbitron uppercase tracking-[0.05em] px-4 h-9 rounded-lg text-[10px] shadow-[0_0_15px_rgba(0,212,255,0.3)] hover:shadow-[0_0_20px_rgba(0,212,255,0.5)] transition-all flex items-center gap-2"
                    >
                      {isUploading ? <Spinner size="sm" color="current" /> : <FiUpload size={14} />}
                      Upload to Cloud
                    </Button>
                  )}

                  {imageUrl && (
                    <div className="flex items-center gap-2 text-green-500 text-[10px] orbitron font-bold uppercase tracking-widest bg-green-500/10 px-3 py-2 rounded-lg border border-green-500/20">
                      <FiCheck size={14} />
                      Ready
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SectionContainer>


          {/* Basic Information Section */}
          <SectionContainer title="Basic Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
              <FormGroup 
                label="Player Name" 
                placeholder="e.g. Michael Jordan"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
              <FormSelect 
                label="Category" 
                placeholder="Select category" 
                items={categoryOptions}
                value={formData.categoryId}
                onChange={(id) => handleInputChange('categoryId', id)}
              />
              <FormGroup 
                label="Position / Role" 
                placeholder="e.g. Shooting Guard" 
                value={formData.positionRole}
                onChange={(e) => handleInputChange('positionRole', e.target.value)}
              />
              <FormGroup 
                label="Era" 
                placeholder="e.g. 1984-2003" 
                value={formData.era}
                onChange={(e) => handleInputChange('era', e.target.value)}
              />
              <FormGroup 
                label="Country / Nationality" 
                placeholder="e.g. United States" 
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
              />
            </div>
          </SectionContainer>

          {/* Statistics Section */}
          <SectionContainer title="Career Statistics">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormGroup 
                label="Total Games" 
                type="number"
                placeholder="0" 
                value={formData.appearancesGames}
                onChange={(e) => handleInputChange('appearancesGames', e.target.value)}
              />
              <FormGroup 
                label="Goals / Points" 
                type="number"
                placeholder="0" 
                value={formData.goalsPoints}
                onChange={(e) => handleInputChange('goalsPoints', e.target.value)}
              />
              <FormGroup 
                label="Major Trophies" 
                type="number"
                placeholder="0" 
                value={formData.majorAchievements}
                onChange={(e) => handleInputChange('majorAchievements', e.target.value)}
              />
            </div>
          </SectionContainer>
        </div>

        {/* RIGHT COLUMN: Scoring Matrix */}
        <div className="space-y-8">
          <Card className="bg-gradient-to-br from-[#111A2C] to-[#080C14] border border-[#1E293B] p-8 rounded-3xl sticky top-8">
            <div className="text-center mb-8 pb-8 border-b border-zinc-800/50">
              <p className="text-[#00D4FF] orbitron text-[10px] font-bold tracking-[0.3em] uppercase mb-2">Projected Score</p>
              <div className="text-6xl font-black text-white orbitron tracking-tighter">
                {finalScore.toFixed(1)}
              </div>
              <p className="text-zinc-500 mt-2 outfit uppercase text-xs tracking-widest font-bold">HGW Domination Index</p>
            </div>

            <div className="space-y-6">
              <h3 className="text-white font-bold orbitron uppercase text-xs tracking-widest border-l-2 border-[#00D4FF] pl-4">HGW Scoring Pillars</h3>
              
              <div className="grid grid-cols-1 gap-5">
                {PLAYER_METRICS.map((metric) => (
                  <div key={metric.id} className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-[11px] text-zinc-400 orbitron uppercase font-bold tracking-wider mb-1">{metric.label}</p>
                      <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#00D4FF] transition-all duration-500 shadow-[0_0_10px_rgba(0,212,255,0.5)]" 
                          style={{ width: `${(scores[metric.id as keyof HgwMetrics] || 0) * 10}%` }}
                        />
                      </div>
                    </div>
                    <input 
                      type="number"
                      min="0"
                      max="10"
                      value={scores[metric.id as keyof HgwMetrics] || 0}
                      onChange={(e) => handleScoreChange(metric.id, e.target.value)}
                      className="w-12 h-10 bg-[#080C14] border border-[#1E293B] rounded-lg text-center text-white outfit font-bold text-sm outline-none focus:border-[#00D4FF]/50"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
