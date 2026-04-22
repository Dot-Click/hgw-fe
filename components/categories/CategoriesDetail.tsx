"use client"

import React, { useEffect } from 'react'
import { Card, cn, Button, Tooltip, Spinner } from '@heroui/react'
import { FiGrid, FiUsers, FiEdit3, FiTrash2, FiSearch } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { fetchCategories } from '@/store/slices/categorySlice'

const CategoriesDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  if (loading && categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Spinner size="lg" color="accent" />
        <span className="text-zinc-500 orbitron text-xs tracking-widest uppercase animate-pulse">Loading Vault...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-6 duration-700">            
      
      {/* Top Stats Tier */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="bg-[#111A2C]/40 border border-[#1E293B] p-6 rounded-2xl flex flex-row items-center gap-5 shadow-none group transition-all">
          <div className="w-14 h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 bg-[#00D4FF14] text-[#00D4FF]">
            <FiGrid size={24} />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[12px] font-medium text-zinc-500 outfit tracking-wider uppercase">Total Categories</span>
            <span className="text-[24px] font-black text-white orbitron tracking-tight">{categories.length}</span>   
          </div>
        </Card>
        <Card className="bg-[#111A2C]/40 border border-[#1E293B] p-6 rounded-2xl flex flex-row items-center gap-5 shadow-none group transition-all">
          <div className="w-14 h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 bg-[#A855F714] text-[#A855F7]">
            <FiUsers size={24} />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[12px] font-medium text-zinc-500 outfit tracking-wider uppercase">Total Players</span>
            <span className="text-[24px] font-black text-white orbitron tracking-tight">0</span>   
          </div>
        </Card>
      </div>
       
      {/* Category Grid Tier */}
      {categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed border-[#1E293B] rounded-[32px] bg-[#111A2C]/20 gap-4">
          <div className="w-16 h-16 rounded-full bg-[#1E293B] flex items-center justify-center text-zinc-500">
            <FiSearch size={32} />
          </div>
          <div className="text-center">
            <h3 className="text-white font-bold orbitron uppercase tracking-widest text-sm mb-1">No Categories Found</h3>
            <p className="text-zinc-500 outfit text-xs">Start by adding a new classification to your vault.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((category) => (
            <Card     
              key={category.id}     
              className="bg-[#111A2C]/50 border border-[#1E293B] p-5 rounded-2xl flex flex-row items-center justify-between shadow-none group hover:border-[#00D4FF]/30 transition-all duration-300"
            >                
              <div className="flex items-center gap-4">      
                {/* Initials Icon */}             
                <div           
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-[14px] font-black orbitron shadow-lg transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${category.color}15`, color: category.color }}   
                >       
                  {getInitials(category.name)}   
                </div>
                                 
                <div className="flex flex-col">  
                  <span className="text-[16px] font-bold text-white orbitron tracking-widest truncate max-w-[120px]">{category.name}</span>
                  <span className="text-[12px] text-zinc-500 outfit">0 players</span>
                </div>
              </div>    
       
              {/* Actions */}
              <div className="flex items-center gap-1">     
                 <Tooltip content="Edit Category" placement="top" className="bg-[#1A2333] text-white orbitron text-[10px] rounded-lg border border-[#1E293B]">  
                    <Button isIconOnly variant="light" className="text-zinc-500 hover:text-white transition-colors h-9 w-9 min-w-0">
                      <FiEdit3 size={18} />  
                    </Button>           
                 </Tooltip>  
  
                 <Tooltip content="Delete Category" placement="top" className="bg-red-950 text-red-200 orbitron text-[10px] rounded-lg border border-red-900/50">
                    <Button isIconOnly variant="light" className="text-zinc-500 hover:text-red-500 transition-colors h-9 w-9 min-w-0">
                      <FiTrash2 size={18} />
                    </Button>   
                 </Tooltip>  
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoriesDetail