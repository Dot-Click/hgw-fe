"use client"

import React, { useState } from 'react'
import { FiArrowLeft, FiChevronDown } from 'react-icons/fi'
import { 
  Input, 
  Select, 
  Switch, 
  Button, 
  Card,
  cn,
  TextField,
  FieldError,
  Label,
  ListBox,
  ListBoxItem
} from '@heroui/react'
import Link from 'next/link'

export const NewPlayerForm = () => {
  const [isDraft, setIsDraft] = useState(true);

  return (
    <div className="flex flex-col gap-8 pb-12 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex items-center gap-4">
        <Link href="/admin/players">
          <div className="w-10 h-10 rounded-xl bg-[#001d2a] border border-[#061c40] flex items-center justify-center text-[#00D4FF] hover:bg-[#072430] transition-all cursor-pointer">
            <FiArrowLeft size={20} />
          </div>
        </Link>
        <div className="flex flex-col gap-0.5">
          <h1 className="text-2xl font-[900] text-white orbitron tracking-widest">Add New Player</h1>
          <p className="text-sm text-zinc-500 outfit">Create a new legend entry in the vault.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Main Form */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Basic Information Section */}
          <SectionContainer title="Basic Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 outfit gap-y-8">
              <FormGroup label="Player Name" placeholder="e.g. Michael Jordan"/>
              <FormSelect 
                label="Category" 
                placeholder="Select category" 
                items={["Basketball", "Football", "Tennis", "Boxing"]} 
              />
              <FormGroup label="Position / Role" placeholder="e.g. Shooting Guard" />
              <FormGroup label="Era" placeholder="e.g. 1984-2003" />
              <FormGroup label="Country" placeholder="e.g. United States" className="md:col-span-2" />
            </div>
          </SectionContainer>

          {/* Career Statistics Section */}
          <SectionContainer title="Career Statistics">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormGroup label="Appearances / Games" placeholder="0" type="number" />
              <FormGroup label="Goals / Points" placeholder="0" type="number" />
              <FormGroup label="Major Achievements" placeholder="0" type="number" />
            </div>
          </SectionContainer>

          {/* HGW Scoring Matrix Section */}
          <SectionContainer 
            title="HGW Scoring Matrix" 
            headerExtra={
              <div className="bg-[#0F2833] border border-[#1E293B] rounded-full px-4 py-1.5 flex items-center gap-2">
                <span className="text-[12px] font-[600] text-zinc-400 outfit uppercase tracking-widest">Final Score:</span>
                <span className="text-[14px] font-[900] text-[#00D4FF] outfit">0</span>
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
              <FormGroup label="Dominance" placeholder="0-10" showInfo />
              <FormGroup label="Longevity" placeholder="0-10" showInfo />
              <FormGroup label="Peak Performance" placeholder="0-10" showInfo />
              <FormGroup label="Championships" placeholder="0-10" showInfo />
              <FormGroup label="Records" placeholder="0-10" showInfo />
              <FormGroup label="Cultural Impact" placeholder="0-10" showInfo />
              <FormGroup label="Clutch Factor" placeholder="0-10" showInfo />
              <FormGroup label="Versatility" placeholder="0-10" showInfo />
              <FormGroup label="Rivalry" placeholder="0-10" showInfo />
              <FormGroup label="Legacy" placeholder="0-10" showInfo />
            </div>
          </SectionContainer>
        </div>

        {/* Right Column - Side Panels */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Status Card */}
          <Card className="bg-[#111A2C]/50 border border-[#1E293B] p-6 rounded-2xl shadow-none">
            <h3 className="text-sm font-bold text-white orbitron uppercase tracking-[0.1em] mb-8">Status</h3>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-[17px] font-[700] text-white outfit uppercase tracking-widest">Draft</span>
                <span className="text-[13px] text-zinc-500 tracking-wider outfit">Player is saved but not visible</span>
              </div>
              <Switch 
                isSelected={isDraft} 
                onChange={setIsDraft}
                className="group flex items-center cursor-pointer"
              >
                <Switch.Control className="w-11 h-6 rounded-full bg-[#08162e] border border-[#ffffff] flex items-center px-[3px] group-data-[selected=true]:bg-[#0d424d] group-data-[selected=true]:border-[#ffffff] transition-all duration-300">
                  <Switch.Thumb className="w-4 h-4 rounded-full bg-white shadow-sm group-data-[selected=true]:translate-x-[9px] transition-transform duration-300" />
                </Switch.Control>
              </Switch>
            </div>
          </Card>

          {/* Score Preview Card */}
          <Card className="bg-[#111A2C]/50 border border-[#1E293B] p-8 rounded-2xl shadow-none flex flex-col items-center justify-center min-h-[340px]">
            <h3 className="text-sm font-bold text-white orbitron uppercase tracking-[0.1em] mb-auto w-full text-left">Score Preview</h3>
            
            <div className="relative flex flex-col items-center justify-center my-8">
              {/* Circular Graphic Placeholder */}
              <div className="w-40 h-40 rounded-full border-[6px] border-[#1A2333] flex items-center justify-center relative">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[3px] w-3 h-3 bg-[#00D4FF] rounded-full shadow-[0_0_10px_#00D4FF]"></div>
                 <div className="flex flex-col items-center text-center">
                    <span className="text-5xl font-black text-white orbitron leading-none">0</span>
                    <span className="text-[10px] font-bold text-zinc-500 orbitron uppercase tracking-widest mt-2">HGW Score</span>
                 </div>
              </div>
            </div>

            <p className="text-[13px] text-zinc-500 outfit tracking-widest mt-auto">
              Score calculated from 10 metrics average
            </p>
          </Card>

          {/* Action Buttons Placeholder */}
          <div className="flex flex-col gap-3 mt-4">
             <Button className="w-full bg-[#00D4FF] text-[#0B0F19] font-black orbitron uppercase tracking-wider h-12 rounded-xl shadow-[0_4px_20px_rgba(0,212,255,0.2)]">
                Save & Publish
             </Button>
             <Button variant="ghost" className="w-full border-[#1E293B] text-zinc-500 font-bold orbitron uppercase tracking-wider h-12 rounded-xl hover:bg-white/5">
                Save Draft
             </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const SectionContainer = ({ title, children, headerExtra }: { title: string; children: React.ReactNode; headerExtra?: React.ReactNode }) => (
  <div className="bg-[#111A2C]/50 border border-[#1E293B] rounded-2xl p-8">
    <div className="flex items-center justify-between mb-10 pb-4 border-b border-[#1E293B]/30">
      <h3 className="text-[15px] font-bold text-white orbitron uppercase tracking-[0.15em] m-0">
        {title}
      </h3>
      {headerExtra}
    </div>
    {children}
  </div>
)

const FormGroup = ({ 
  label, 
  placeholder, 
  type = "text", 
  className,
  showInfo = false,
  isInvalid = false,
  errorMessage
}: { 
  label: string; 
  placeholder: string; 
  type?: string; 
  className?: string;
  showInfo?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
}) => (
  <TextField isInvalid={isInvalid} className={cn("flex flex-col gap-3", className)}>
    <div className="flex items-center gap-1 px-1">
      <Label className="text-[13px] font-[600] text-zinc-500 outfit uppercase tracking-wider cursor-default">
        {label}
      </Label>
      {showInfo && (
        <div className="w-3.5 h-3.5 rounded-full border border-zinc-700 flex items-center justify-center text-[8px] text-zinc-500 hover:text-zinc-300 font-bold cursor-help transition-colors">
          i
        </div>
      )}
    </div>
    <Input 
      type={type}
      placeholder={placeholder}
      className={cn(
        "h-12 bg-[#080C14] border border-[#1E293B] rounded-xl px-5 transition-all text-zinc-200 outfit text-sm placeholder:text-zinc-600 outline-none",
        "hover:border-zinc-700 focus:border-[#00D4FF]/40 focus:ring-1 focus:ring-[#00D4FF]/20",
        isInvalid && "border-red-500/50 bg-red-500/5 focus:border-red-500/50 focus:ring-red-500/20"
      )}
    />
    {errorMessage && (
       <FieldError className="text-[10px] orbitron uppercase font-bold tracking-widest mt-1.5 ml-1 text-red-500">
         {errorMessage}
       </FieldError>
    )}
  </TextField>
)

const FormSelect = ({ label, placeholder, items, isInvalid, errorMessage }: { label: string; placeholder: string; items: string[]; isInvalid?: boolean; errorMessage?: string }) => (
  <Select isInvalid={isInvalid} className="flex flex-col gap-3">
    <Label className="text-[13px] font-[600] text-zinc-500 outfit uppercase tracking-wider px-1">
      {label}
    </Label>
    <Select.Trigger className={cn(
      "h-12 bg-[#080C14] border border-[#1E293B] rounded-xl px-5 flex items-center justify-between text-zinc-500 outfit text-sm transition-all outline-none",
      "hover:border-zinc-700 focus:border-[#00D4FF]/40",
      isInvalid && "border-red-500/50 bg-red-500/5 focus:border-red-500/50"
    )}>
      <Select.Value className="text-zinc-400 group-data-[selected=true]:text-zinc-200" />
      <FiChevronDown className="text-zinc-500 ml-2" />
    </Select.Trigger>
    
    <Select.Popover className="bg-[#0D1424] border border-[#1E293B] shadow-2xl rounded-xl mt-2 overflow-hidden min-w-[200px]">
      <ListBox className="p-1 outline-none">
        {items.map((item) => (
          <ListBoxItem 
            key={item} 
            textValue={item} 
            className="text-zinc-300 px-3 py-2 rounded-lg outline-none cursor-pointer data-[focused=true]:bg-[#00D4FF]/10 data-[focused=true]:text-white transition-all text-sm outfit"
          >
            {item}
          </ListBoxItem>
        ))}
      </ListBox>
    </Select.Popover>

    {errorMessage && (
       <FieldError className="text-[10px] orbitron uppercase font-bold tracking-widest mt-1.5 ml-1 text-red-500">
         {errorMessage}
       </FieldError>
    )}
  </Select>
)
