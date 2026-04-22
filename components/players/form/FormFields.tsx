import React from 'react';
import { 
  Input, 
  Select, 
  TextField, 
  FieldError, 
  Label, 
  ListBox, 
  ListBoxItem,
  cn
} from '@heroui/react';
import { FiChevronDown } from 'react-icons/fi';

export const SectionContainer = ({ title, children, headerExtra }: { title: string; children: React.ReactNode; headerExtra?: React.ReactNode }) => (
  <div className="bg-[#111A2C]/50 border border-[#1E293B] rounded-2xl p-8">
    <div className="flex items-center justify-between mb-10 pb-4 border-b border-[#1E293B]/30">
      <h3 className="text-[15px] font-bold text-white orbitron uppercase tracking-[0.15em] m-0">
        {title}
      </h3>
      {headerExtra}
    </div>
    {children}
  </div>
);

export const FormGroup = ({ 
  label, 
  placeholder, 
  type = "text", 
  className,
  showInfo = false,
  isInvalid = false,
  errorMessage,
  ...props
}: { 
  label: string; 
  placeholder: string; 
  type?: string; 
  className?: string;
  showInfo?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  [key: string]: any;
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
      {...props}
    />
    {errorMessage && (
       <FieldError className="text-[10px] orbitron uppercase font-bold tracking-widest mt-1.5 ml-1 text-red-500">
         {errorMessage}
       </FieldError>
    )}
  </TextField>
);

export const FormSelect = ({ 
  label, 
  placeholder, 
  items, 
  isInvalid, 
  errorMessage,
  ...props 
}: { 
  label: string; 
  placeholder: string; 
  items: string[]; 
  isInvalid?: boolean; 
  errorMessage?: string;
  [key: string]: any;
}) => (
  <Select isInvalid={isInvalid} className="flex flex-col gap-3" {...props}>
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
);
