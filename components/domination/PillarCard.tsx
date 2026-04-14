"use client";

import React from "react";
import { motion } from "framer-motion";

interface PillarCardProps {
  letter: string;
  title: string;
  description: string;
}

const PillarCard: React.FC<PillarCardProps> = ({ letter, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className="relative flex flex-col gap-3 p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent hover:from-white/[0.06] transition-all duration-300 overflow-hidden"
    >
      {/* Background Letter Watermark */}
      <div className="absolute -right-4 -bottom-8 text-[120px] font-black text-white/[0.02] select-none pointer-events-none orbitron">
        {letter}
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 orbitron text-xl font-bold">
          {letter}
        </div>
        <h4 className="text-lg font-bold text-white tracking-wide">
          {title}
        </h4>
      </div>
      
      <p className="text-slate-400 text-sm leading-relaxed relative z-10">
        {description}
      </p>

      {/* Subtle Glow Effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] -z-10" />
    </motion.div>
  );
};

export default PillarCard;
