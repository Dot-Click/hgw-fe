import React from 'react'
import { Card, cn, Button, Tooltip } from '@heroui/react'
import { FiGrid, FiUsers, FiEdit3, FiTrash2 } from 'react-icons/fi'

const summaryData = [
  { label: "Total Categories", value: "10", icon: <FiGrid size={24} />, color: "#00D4FF", bg: "bg-[#00D4FF14]" },
  { label: "Total Players", value: "1,789", icon: <FiUsers size={24} />, color: "#A855F7", bg: "bg-[#A855F714]" },
];

const categoryList = [
  { id: 1, name: "Basketball", initials: "BA", color: "#F97316", players: 245 },
  { id: 2, name: "Football", initials: "FO", color: "#00D4FF", players: 412 },
  { id: 3, name: "Tennis", initials: "TE", color: "#10B981", players: 156 },
  { id: 4, name: "Athletics", initials: "AT", color: "#EAB308", players: 198 },
  { id: 5, name: "Boxing", initials: "BO", color: "#EF4444", players: 134 },
  { id: 6, name: "Hockey", initials: "HO", color: "#8B5CF6", players: 178 },
  { id: 7, name: "Swimming", initials: "SW", color: "#06B6D4", players: 112 },
  { id: 8, name: "Golf", initials: "GO", color: "#22C55E", players: 89 },
  { id: 9, name: "Baseball", initials: "BA", color: "#EC4899", players: 167 },
  { id: 10, name: "MMA", initials: "MM", color: "#F97316", players: 98 },           
];

const CategoriesDetail = () => {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-6 duration-700">            
      
      {/* Top Stats Tier */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {summaryData.map((stat, index) => (   
          <Card key={index} className="bg-[#111A2C]/40 border border-[#1E293B] p-6 rounded-2xl flex flex-row items-center gap-5 shadow-none group transition-all">
            <div className={cn("w-14 h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-110", stat.bg)} style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[12px] font-medium text-zinc-500 outfit tracking-wider uppercase">{stat.label}</span>
              <span className="text-[24px] font-black text-white orbitron tracking-tight">{stat.value}</span>   
            </div>
          </Card>
        ))}
      </div>
       
      {/* Category Grid Tier */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categoryList.map((category) => (
          <Card     
            key={category.id}     
            className="bg-[#111A2C]/50 border border-[#1E293B] p-5 rounded-2xl flex flex-row items-center justify-between shadow-none group hover:border-zinc-700 transition-all duration-300"
          >                
            <div className="flex items-center gap-4">      
              {/* Initials Icon */}             
              <div           
                className="w-12 h-12 rounded-xl flex items-center justify-center text-[14px] font-black orbitron shadow-lg"
                style={{ backgroundColor: `${category.color}15`, color: category.color }}   
              >       
                {category.initials}   
              </div>
                             
              <div className="flex flex-col">  
                <span className="text-[16px] font-bold text-white orbitron tracking-widest">{category.name}</span>
                <span className="text-[12px] text-zinc-500 outfit">{category.players} players</span>
              </div>
            </div>    
     
            {/* Actions */}
            <div className="flex items-center gap-1  transition-opacity">
               <Tooltip>  
                  <Tooltip.Trigger>   
                    <Button isIconOnly variant="tertiary" className="text-white bg-[#0a4653] hover:bg-[#0a4653] hover:text-white transition-colors h-9 w-9">
                      <FiEdit3 size={18} />  
                    </Button>           
                  </Tooltip.Trigger>
                  <Tooltip.Content className="bg-[#1A2333] text-white outfit text-[10px] rounded-lg border border-[#1E293B] px-2 py-1 shadow-xl">
                    Edit Category
                  </Tooltip.Content>
               </Tooltip>  

               <Tooltip>
                  <Tooltip.Trigger>
                    <Button isIconOnly variant="tertiary" className="text-white bg-[#5d0404] hover:bg-[#5d0404] hover:text-white transition-colors h-9 w-9">
                      <FiTrash2 size={18} />
                    </Button>   
                  </Tooltip.Trigger>
                  <Tooltip.Content className="bg-red-950 text-red-200 outfit text-[10px] rounded-lg border border-red-900/50 px-2 py-1 shadow-xl">
                    Delete Category
                  </Tooltip.Content>
               </Tooltip>  
            </div>
          </Card>
        ))}
      </div>

    </div>
  )
}

export default CategoriesDetail