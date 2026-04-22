"use client"

import React, { useState } from "react"
import { FiUpload, FiFileText, FiGlobe, FiDownload, FiX } from "react-icons/fi"
import { AnimatePresence, motion } from "framer-motion"

interface BulkImportModalProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onSuccess?: () => void
}

const BulkImportModal = ({ isOpen, onOpenChange, onSuccess }: BulkImportModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [activeTab, setActiveTab] = useState<"csv" | "api">("csv")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Custom Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="absolute inset-0 bg-black/50"
          />

          {/* Custom Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative w-full max-w-[500px] bg-[#0B0F19] border border-[#2A3040] shadow-[0_0_80px_rgba(0,0,0,0.8)] rounded-[28px] overflow-hidden z-[210] outline-none"
          >
            
            {/* Header / Close Button Area */}
            <div className="absolute top-6 right-6 z-[220]">
              <button 
                onClick={() => onOpenChange(false)}
                className="text-zinc-500 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-all cursor-pointer bg-transparent border-none outline-none"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Header Content */}
            <div className="pt-8 px-8 pb-3">
              <h2 className="text-[22px] font-[900] orbitron tracking-wide text-white m-0">
                Bulk Import Players
              </h2>
              <p className="text-[13px] font-[400] outfit text-zinc-400 mt-1">
                Import multiple players at once via CSV or API.
              </p>
            </div>

            {/* Body Content */}
            <div className="px-8 py-4">
              <div className="flex flex-col gap-5">
                
                {/* Custom Pill Tabs */}
                <div className="flex items-center bg-[#080B12] p-1 rounded-full w-fit border border-[#2A3040]/50 relative">
                  <button 
                    onClick={() => setActiveTab("csv")}
                    className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full outline-none cursor-pointer transition-all font-semibold outfit text-[13px] tracking-wide relative z-10 ${
                      activeTab === "csv" ? "text-[#0B0F19]" : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    <FiFileText size={16} className="relative z-20" />
                    <span className="relative z-20">CSV Upload</span>
                    {activeTab === "csv" && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute inset-0 bg-[#00D4FF] rounded-full z-0"
                        transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                      />
                    )}
                  </button>
                  <button 
                    onClick={() => setActiveTab("api")}
                    className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full outline-none cursor-pointer transition-all font-semibold outfit text-[13px] tracking-wide relative z-10 ${
                      activeTab === "api" ? "text-[#0B0F19]" : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    <FiGlobe size={16} className="relative z-20" />
                    <span className="relative z-20">API Import</span>
                    {activeTab === "api" && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute inset-0 bg-[#00D4FF] rounded-full z-0"
                        transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                      />
                    )}
                  </button>
                </div>


                {/* Tab Content Panels */}
                <AnimatePresence mode="wait">
                  {activeTab === "csv" ? (
                    <motion.div 
                      key="csv-panel"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="flex flex-col gap-5"
                    >
                      {/* Dotted Upload Dropzone */}
                      <div className="relative group/drop">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00D4FF]/10 to-[#7000FF]/10 rounded-2xl blur opacity-0 group-hover/drop:opacity-100 transition duration-500"></div>
                        <div className="relative border border-dashed border-[#2A3040] rounded-2xl p-8 flex flex-col items-center justify-center gap-4 transition-all bg-[#0D1424]/40 hover:bg-[#0D1424]/60 hover:border-[#00D4FF]/40">
                          <div className="w-14 h-14 rounded-full bg-[#111A2C] border border-[#2A3040] flex items-center justify-center text-[#00D4FF] group-hover/drop:scale-105 transition-transform shadow-[0_0_15px_rgba(0,212,255,0.15)]">
                            <FiUpload size={24} />
                          </div>
                          
                          <div className="text-center">
                            <p className="text-[14px] font-bold text-zinc-200 outfit">
                              Drag & drop your CSV file here
                            </p>
                            <p className="text-[12px] text-zinc-500 outfit mt-1.5 font-medium">
                              Supports: .csv, .xlsx (max 10MB)
                            </p>
                          </div>
                          
                          {/* File Selection Box */}
                          <div className="w-full max-w-[320px] relative group/input">
                            <input
                              type="file"
                              accept=".csv,.xlsx"
                              onChange={handleFileChange}
                              className="absolute inset-0 opacity-0 cursor-pointer z-20"
                            />
                            <div className="h-10 bg-[#080B12] border border-[#2A3040] rounded-xl flex items-center px-4 group-hover/input:border-[#00D4FF]/40 transition-all">
                              <span className="text-[13px] font-medium text-zinc-400 outfit truncate">
                                {selectedFile ? selectedFile.name : "Choose file..."}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Download Template Link */}
                      <button className="flex items-center gap-2 text-[#00D4FF] hover:text-[#00D4FF] transition-all cursor-pointer ml-0.5 w-fit bg-transparent border-none outline-none group/link">
                        <FiDownload size={16} className="group-hover:translate-y-0.5 transition-transform" />
                        <span className="text-[12px] font-black outfit uppercase tracking-[0.06em] border-b border-[#00D4FF]/20 group-hover:border-[#00D4FF]/60 pb-0.5">
                          Download CSV template
                        </span>
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="api-panel"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex flex-col gap-5 pt-3 outline-none"
                    >
                      <div className="flex flex-col gap-5">
                        {/* API Endpoint Input */}
                        <div className="flex flex-col gap-2">
                          <label className="text-[12px] font-bold outfit text-zinc-500 uppercase tracking-widest ml-1">
                            API Endpoint
                          </label>
                          <div className="relative group">
                            <input 
                              type="text" 
                              placeholder="https://api.example.com/players"
                              className="w-full h-11 bg-[#080B12] border border-[#2A3040] rounded-xl px-4 text-white outfit text-sm placeholder:text-zinc-600 focus:border-[#00D4FF]/40 focus:ring-1 focus:ring-[#00D4FF]/20 transition-all outline-none"
                            />
                          </div>
                        </div>

                        {/* API Key Input */}
                        <div className="flex flex-col gap-2">
                          <label className="text-[12px] font-bold outfit text-zinc-500 uppercase tracking-widest ml-1">
                            API Key (Optional)
                          </label>
                          <div className="relative group">
                            <input 
                              type="password" 
                              placeholder="Enter API key"
                              className="w-full h-11 bg-[#080B12] border border-[#2A3040] rounded-xl px-4 text-white outfit text-sm placeholder:text-zinc-600 focus:border-[#00D4FF]/40 focus:ring-1 focus:ring-[#00D4FF]/20 transition-all outline-none"
                            />
                          </div>                     
                        </div>
                      </div>

                      <p className="text-[11px] text-zinc-600 outfit leading-relaxed ml-1 mt-1">
                        Ensure your API endpoint returns data in the supported JSON format.
                      </p>
                    </motion.div>     
                  )}

                </AnimatePresence>
              </div>
            </div>

            {/* Footer / Action Button */}
            <div className="pt-4 pb-8 px-8">
              <button
                onClick={() => {
                  onOpenChange(false);
                  if (onSuccess) onSuccess();
                }}
                className="w-full bg-[#00D4FF] text-[#0B0F19] font-black orbitron uppercase tracking-[0.1em] h-12 rounded-xl shadow-[0_0_20px_rgba(0,212,255,0.2)] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] active:scale-[0.98] transition-all cursor-pointer text-[14px] border-none outline-none"
              >
                Start Import
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}


export default BulkImportModal
