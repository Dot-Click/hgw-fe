"use client";

import React from "react";
import { Spinner } from "@heroui/react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

const Loader = ({ size = "lg", label = "Entering the Vault...", className }: LoaderProps) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <div className="relative group">
        {/* Outer Glow Effect */}
        <div className="absolute inset-0 bg-[#00CCFF] rounded-full blur-[20px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
        
        <Spinner 
          size={size} 
          color="accent"
          className="text-[#00CCFF]"
        />
        {label && (
          <p className="text-[#7B899D] orbitron text-[12px] uppercase tracking-[3px] mt-2 text-center animate-pulse">
            {label}
          </p>
        )}
      </div>
    </div>
  );
};

export default Loader;
