"use client"

import React, { useState, useRef, useEffect } from 'react'
import { 
  Modal, 
  Button, 
  TextField,
  Label,
  InputGroup,
  Spinner,
  cn,
  toast
} from '@heroui/react'
import { FiX, FiCheck, FiPlus } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { updateCategory, Category } from '@/store/slices/categorySlice'

interface EditCategoryModalProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  category: Category | null
}

const PRESET_COLORS = [
  '#00D4FF', // Cyan
  '#F97316', // Orange
  '#10B981', // Green
  '#A855F7', // Purple
  '#EF4444', // Red
  '#EAB308', // Yellow
  '#EC4899', // Pink
  '#6366F1', // Indigo
];

const EditCategoryModal = ({ isOpen, onOpenChange, category }: EditCategoryModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.categories);
  
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);
  const colorInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setSelectedColor(category.color);
    }
  }, [category]);

  const handleUpdate = async () => {
    if (!category) return;
    
    if (!name.trim()) {
      toast.danger('Please enter a category name');
      return;
    }

    try {
      await dispatch(updateCategory({ 
        id: category.id, 
        data: { name, color: selectedColor } 
      })).unwrap();
      
      toast.success('Category updated successfully!');
      onOpenChange(false);
    } catch (err: any) {
      toast.danger(err || 'Failed to update category');
    }
  };

  return (
    <Modal.Root isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop className="bg-black/60 fixed inset-0 z-[9998] animate-in fade-in duration-300" />
      <Modal.Container className="fixed inset-0 z-[9999] flex items-center justify-center p-1 w-screen h-screen left-0 top-0">
        <Modal.Dialog className="max-w-[500px] w-full bg-[#0D1424] border border-[#1E293B] rounded-[24px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300 outline-none relative">
          
          {/* Close Button */}
          <button 
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors z-20 p-1 rounded-full hover:bg-white/5"
          >      
            <FiX size={20} />                    
          </button>

          <div className="p-6">
            <Modal.Header className="p-0 mb-6 flex flex-col gap-1">
              <h2 className="text-xl font-[900] text-white orbitron tracking-widest uppercase">
                Edit Category
              </h2>
              <p className="text-[11px] text-zinc-500 outfit tracking-wider uppercase font-semibold">
                Modify existing classification
              </p>
            </Modal.Header>

            <Modal.Body className="p-0 flex flex-col gap-8">
              {/* Category Name */}
              <TextField className="flex flex-col gap-3">
                <Label className="text-[11px] font-[700] text-zinc-500 outfit uppercase tracking-[0.2em] px-1">
                  Category Name
                </Label>
                <InputGroup className="h-12 bg-[#080C14] border border-[#1E293B] rounded-xl px-5 transition-all focus-within:border-[#00D4FF]/40">
                  <InputGroup.Input 
                    placeholder="e.g. Basketball, Boxing..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-transparent outline-none w-full text-zinc-200 outfit text-sm placeholder:text-zinc-600"
                  />
                </InputGroup>
              </TextField>

              {/* Color Selection */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between px-1">
                  <label className="text-[11px] font-[700] text-zinc-500 outfit uppercase tracking-[0.2em]">
                    Accent Color
                  </label>
                  <span className="text-[10px] font-bold orbitron text-zinc-600 uppercase">
                    {selectedColor}
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-3">
                  {PRESET_COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "w-full aspect-square rounded-xl transition-all cursor-pointer duration-300 relative flex items-center justify-center group",
                        selectedColor === color ? " shadow-lg" : " opacity-60 hover:opacity-100"
                      )}
                      style={{ 
                        backgroundColor: color,
                        boxShadow: selectedColor === color ? `0 0 15px ${color}40` : 'none'
                      }}
                    >
                      <AnimatePresence>
                        {selectedColor === color && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                          >
                            <FiCheck className="text-white drop-shadow-md" size={16} strokeWidth={4} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  ))}
                  
                  {/* Custom Color Trigger */}
                  <button
                    onClick={() => colorInputRef.current?.click()}
                    className="w-full aspect-square rounded-xl bg-[#080C14] border-2 border-dashed border-[#1E293B] flex items-center justify-center text-zinc-500 hover:border-[#00D4FF]/40 hover:text-[#00D4FF] transition-all"
                  >
                    <FiPlus size={20} />
                  </button>
                </div>

                <input 
                  type="color"
                  ref={colorInputRef}
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="sr-only"
                />
              </div>
            </Modal.Body>

            <Modal.Footer className="p-0 mt-8 flex gap-3">
              <Button 
                onPress={() => onOpenChange(false)}
                className="flex-1 bg-[#111A2C] text-zinc-400 font-bold orbitron uppercase tracking-widest h-12 rounded-xl hover:bg-[#1A2333] transition-all text-[11px]"
              >
                Cancel
              </Button>
              <Button 
                onPress={handleUpdate}
                isDisabled={loading}
                className="flex-1 bg-[#00D4FF] text-[#0B1221] font-black orbitron uppercase tracking-widest h-12 rounded-xl shadow-[0_8px_20px_rgba(0,212,255,0.2)] hover:bg-[#00D4FF]/90 transition-all text-[11px] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Spinner size="sm" color="current" />
                    <span>Saving...</span>
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </Modal.Footer>
          </div>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Root>
  )
}

export default EditCategoryModal
