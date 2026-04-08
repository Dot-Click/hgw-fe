import React, { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { 
  Modal, 
  Button, 
  cn,
} from '@heroui/react'
import { FiX } from 'react-icons/fi'

interface AddCategoryModalProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

const AddCategoryModal = ({ isOpen, onOpenChange }: AddCategoryModalProps) => {
  const [mounted, setMounted] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#00D4FF');
  const colorInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <Modal.Root isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop className="bg-black/60 fixed inset-0 z-[9998] animate-in fade-in duration-300" />
      <Modal.Container className="fixed inset-0 z-[9999] flex items-center justify-center p-1 w-screen h-screen left-0 top-0">
        <Modal.Dialog className="max-w-[500px] w-full bg-[#0D1424] border border-[#1E293B] rounded-[24px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300 outline-none">
          <div className="relative p-3">
            {/* Close Button */}
            <button 
              onClick={() => onOpenChange(false)}
              className="absolute top-2 right-2 text-zinc-500 hover:text-white transition-colors z-10"
            >
              <FiX size={20} />
            </button>

            <Modal.Header className="p-0 mb-6 flex flex-col gap-1">
              <h2 className="text-lg font-[900] text-white orbitron tracking-widest leading-tight">
                Add Category
              </h2>
            </Modal.Header>

            <Modal.Body className="p-0 flex flex-col gap-5">
              {/* Category Name Field */}
              <div className="flex flex-col gap-2.5">
                <label className="text-[11px] font-[600] text-zinc-500 outfit uppercase tracking-wider px-1">
                  Category Name
                </label>
                <input 
                  placeholder="e.g. Esports"
                  className={cn(
                    "h-10 bg-[#080C14] border border-[#1E293B] rounded-xl px-4 transition-all text-zinc-200 outfit text-xs placeholder:text-zinc-600 outline-none",
                    "hover:border-zinc-700 focus:border-[#00D4FF]/40"
                  )}
                />
              </div>

              {/* Color Selection Wrapper */}
              <div className="flex flex-col gap-3">
                <label className="text-[11px] font-[600] text-zinc-500 outfit uppercase tracking-wider px-1">
                  Select Color
                </label>
                
                {/* Hidden Native Color Input */}
                <input 
                  type="color"
                  ref={colorInputRef}
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="sr-only"
                />

                {/* The Interactive Preview Bar */}
                <div 
                  onClick={() => colorInputRef.current?.click()}
                  className="h-10 w-full rounded-xl border-2 cursor-pointer transition-all duration-300 shadow-lg flex items-center justify-center group"
                  style={{ 
                    backgroundColor: selectedColor, 
                    borderColor: `${selectedColor}40`,
                    boxShadow: `0 0 20px ${selectedColor}15`
                  }}
                >
                  <div className="overflow-hidden rounded-lg flex items-center justify-center">
                    <span className="text-[10px] orbitron font-black text-white transition-all uppercase tracking-[0.2em]">Color Cycle</span>
                  </div>
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer className="p-0 mt-8 flex items-center justify-center gap-2.5">
              <Button 
                onPress={() => onOpenChange(false)}
                variant="tertiary"
                className="bg-[#111A2C] border w-full text-[10px] border-[#1E293B] text-white/80 font-[600] orbitron uppercase tracking-[0.15em] h-10 px-4 rounded-xl hover:bg-[#1A2333] transition-all"
              >
                Cancel
              </Button>
              <Button 
                className="bg-[#00D4FF] w-full text-[10px] text-[#0B1221] font-[800] orbitron uppercase tracking-[0.15em] h-10 px-4 rounded-xl shadow-[0_4px_15px_rgba(0,212,255,0.15)] hover:bg-[#00D4FF]/90 transition-all font-bold"
              >
                Create
              </Button>
            </Modal.Footer>
          </div>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Root>
,
    document.body
  )
}

export default AddCategoryModal
