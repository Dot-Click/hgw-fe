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

/**
 * 🛠️ PRODUCTION-GRADE FORM FIELDS
 * 
 * Rebuilt from scratch to ensure total stability, type safety, 
 * and perfect selection behavior in HeroUI 3 / RAC.
 */

interface SectionContainerProps {
  title: string;
  children: React.ReactNode;
  headerExtra?: React.ReactNode;
}

export const SectionContainer = ({ title, children, headerExtra }: SectionContainerProps) => (
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

interface FormGroupProps {
  label: string;
  placeholder: string;
  type?: string;
  className?: string;
  showInfo?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
}

export const FormGroup = ({ 
  label, 
  placeholder, 
  type = "text", 
  className,
  showInfo = false,
  isInvalid = false,
  errorMessage,
  value,
  onChange,
  ...props
}: FormGroupProps) => (
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
      value={value}
      onChange={onChange}
      aria-label={label}
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

interface SelectItem {
  id: string;
  label: string;
}

interface FormSelectProps {
  label: string;
  placeholder: string;
  items: SelectItem[];
  value?: string;
  onChange?: (id: string) => void;
  isInvalid?: boolean;
  errorMessage?: string;
  className?: string;
}

/**
 * 🔥 FormSelect: Completely Rebuilt
 * Uses a controlled pattern with explicit item normalization and 
 * reliable selection tracking.
 */
export const FormSelect = ({ 
  label, 
  placeholder, 
  items, 
  value,
  onChange,
  isInvalid, 
  errorMessage,
  className
}: FormSelectProps) => {
  
  // Ensure we have a valid selection key for HeroUI Select (must be string or null)
  const selectedKey = value && items.some(i => i.id === value) ? value : null;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <Select 
        isInvalid={isInvalid}
        selectedKey={selectedKey}
        onSelectionChange={(keys: any) => {
          // Robust selection extraction: handle both Set and direct value
          const selectedId = (keys instanceof Set || (typeof keys === 'object' && keys !== null && 'values' in keys))
            ? Array.from(keys)[0] as string 
            : keys as string;
            
          console.log("🎯 FormSelect Change:", { label, selectedId });
          if (onChange && selectedId) onChange(selectedId);
        }}
        items={items as any}
        placeholder={placeholder}
        className="flex flex-col gap-3"
      >
        <Label className="text-[13px] font-[600] text-zinc-500 outfit uppercase tracking-wider px-1">
          {label}
        </Label>
        
        <Select.Trigger className={cn(
          "h-12 bg-[#080C14] border border-[#1E293B] rounded-xl px-5 flex items-center justify-between text-zinc-500 outfit text-sm transition-all outline-none",
          "hover:border-zinc-700 focus:border-[#00D4FF]/40",
          isInvalid && "border-red-500/50 bg-red-500/5 focus:border-red-500/50"
        )}>
          <Select.Value className="text-zinc-200" />
          <FiChevronDown className="text-zinc-500 ml-2" />
        </Select.Trigger>
        
        <Select.Popover className="bg-[#0D1424] border border-[#1E293B] shadow-2xl rounded-xl mt-2 overflow-hidden min-w-[200px] z-[9999]">
          <ListBox items={items as any} className="p-1 outline-none">
            {(item: SelectItem) => (
              <ListBoxItem 
                key={item.id}
                id={item.id}
                textValue={item.label}
                className={cn(
                  "px-3 py-2.5 rounded-lg outline-none cursor-pointer text-sm outfit transition-all",
                  "text-zinc-400 hover:bg-[#00D4FF]/10 hover:text-white",
                  "data-[selected=true]:bg-[#00D4FF]/20 data-[selected=true]:text-[#00D4FF] data-[selected=true]:font-bold",
                  "data-[focused=true]:bg-[#1E293B] data-[focused=true]:text-white"
                )}
              >
                {item.label}
              </ListBoxItem>
            )}
          </ListBox>
        </Select.Popover>

        {errorMessage && (
           <FieldError className="text-[10px] orbitron uppercase font-bold tracking-widest mt-1.5 ml-1 text-red-500">
             {errorMessage}
           </FieldError>
        )}
      </Select>
    </div>
  );
};
