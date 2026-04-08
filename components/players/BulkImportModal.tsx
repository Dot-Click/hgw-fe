"use client"

import React, { useState } from "react"
import {
  Modal,
  Tabs,
  Button,
  cn,
} from "@heroui/react"
import { FiUpload, FiFileText, FiGlobe, FiDownload, FiX } from "react-icons/fi"

interface BulkImportModalProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

const BulkImportModal = ({ isOpen, onOpenChange }: BulkImportModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  return (
    <Modal.Backdrop 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      className="fixed inset-0 z-[100] flex items-center justify-center w-full bg-black/70 p-4"
    >
      <Modal.Container className="w-full  outline-none">
        <Modal.Dialog 
          aria-label="Bulk Import Players Modal"
          className="bg-[#0D1424]  border border-[#1E293B] shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-[14px] outline-none relative overflow-visible w-full"
        >
          
          {/* Close Button - Manual trigger for controlled state */}
          <button 
            onClick={() => onOpenChange(false)}
            className="absolute top-5 right-5 text-zinc-500 hover:text-white transition-colors z-50 cursor-pointer outline-none bg-transparent border-none"
          >
            <FiX size={18} />
          </button>

          {/* Header Section */}
          <Modal.Header className="flex flex-col gap-1.5 pt-8 px-8 pb-4 border-none">
            <Modal.Heading className="text-[22px] font-bold orbitron tracking-tight text-white m-0">
              Bulk Import Players
            </Modal.Heading>
            <p className="text-[14px] font-medium outfit text-zinc-500">
              Import multiple players at once via CSV or API.
            </p>
          </Modal.Header>

          <Modal.Body className="px-8 py-0">
            <div className="flex flex-col gap-6">
              <Tabs>
                {/* Tabs Container - Strictly Pill Style */}
                <Tabs.List className="flex items-center gap-4 bg-[#090E17] p-1.5 rounded-[12px] w-fit border border-[#1E293B]/60">
                  <Tabs.Tab 
                    id="csv" 
                    className="flex items-center gap-2 px-4 py-1.5 rounded-[10px] outline-none cursor-pointer transition-all data-[selected=true]:border-[#00D4FF] data-[selected=true]:border data-[selected=true]:bg-[#111A2C] text-zinc-500 data-[selected=true]:text-white font-bold orbitron text-[11px] uppercase tracking-wider"
                  >
                    <FiFileText size={15} className="text-[#00D4FF]" />
                    <span>CSV Upload</span>
                  </Tabs.Tab>
                  <Tabs.Tab 
                    id="api" 
                    className="flex items-center gap-2 px-4 py-1.5 rounded-[10px] outline-none cursor-pointer transition-all text-zinc-500 hover:text-zinc-300 font-bold orbitron text-[11px] uppercase tracking-wider"
                  >
                    <FiGlobe size={15} />
                    <span>API Import</span>
                  </Tabs.Tab>
                </Tabs.List>

                {/* Content Area */}
                <Tabs.Panel id="csv" className="flex flex-col gap-5 pt-6 outline-none">
                  <div className="relative">
                    {/* The prominent dashed border box from the photo */}
                    <div className="border border-dashed border-zinc-700/60 rounded-[12px] p-10 flex flex-col items-center justify-center gap-4 transition-all bg-[#090E17]/20">
                      <FiUpload size={40} className="text-zinc-500 mb-2" />
                      
                      <div className="text-center">
                        <p className="text-[15px] font-semibold text-zinc-200 outfit">
                          Drag & drop your CSV file here, or click to browse
                        </p>
                        <p className="text-[12px] text-zinc-500 outfit mt-1.5 font-medium">
                          Supports: .csv, .xlsx (max 10MB)
                        </p>
                      </div>
                      
                      {/* Dark Styled File Input Box */}
                      <div className="w-full max-w-[340px] mt-2">
                        <div className="relative group/input">
                          <input
                            type="file"
                            accept=".csv,.xlsx"
                            onChange={handleFileChange}
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                          />
                          <div className="h-10 bg-[#090E17] border border-[#1E293B] rounded-lg flex items-center px-4">
                            <span className="text-[13px] font-medium text-zinc-300 outfit truncate">
                              {selectedFile ? selectedFile.name : "Choose File No file chosen"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Icon & Link with Pic styling */}
                  <button className="flex items-center gap-2 text-[#00D4FF] hover:text-[#00D4FF]/80 transition-colors cursor-pointer ml-1 w-fit bg-transparent border-none outline-none">
                    <FiDownload size={16} />
                    <span className="text-[13px] font-bold orbitron uppercase tracking-[0.05em] underline-offset-8 hover:underline transition-all">
                      Download CSV template
                    </span>
                  </button>
                </Tabs.Panel>

                <Tabs.Panel id="api" className="py-16 flex flex-col items-center justify-center text-center gap-3 outline-none">
                   <div className="w-12 h-12 rounded-full bg-[#090E17] border border-[#1E293B] flex items-center justify-center text-zinc-600 mb-2">
                      <FiGlobe size={24} />
                   </div>
                   <h3 className="text-white font-bold orbitron uppercase text-[12px] tracking-wider">API Integration Coming Soon</h3>
                   <p className="text-zinc-500 text-[11px] outfit max-w-[200px] leading-relaxed">
                     Connected API services are finishing development.
                   </p>
                </Tabs.Panel>
              </Tabs>
            </div>
          </Modal.Body>

          {/* Footer with properly styled full-width button */}
          <Modal.Footer className="pt-8 pb-8 px-8 border-none">
            <Button
              className="w-full bg-[#00D4FF] text-[#0B0F19] font-black orbitron uppercase tracking-[0.08em] h-12 rounded-[10px] shadow-[0_4px_20px_rgba(0,212,255,0.3)] hover:scale-[1.01] transition-all cursor-pointer text-[14px]"
              onPress={() => onOpenChange(false)}
            >
              Start Import
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  )
}

export default BulkImportModal
