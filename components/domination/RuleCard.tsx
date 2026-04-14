"use client";

import React from "react";
import { motion } from "framer-motion";

interface RuleCardProps {
  index: string;
  title: string;
  description: string;
}

const RuleCard: React.FC<RuleCardProps> = ({ index, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, borderColor: "rgba(0, 204, 255, 0.5)" }}
      className="relative group p-6 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-colors duration-300"
    >
      {/* Neon Accent Line */}
      <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-cyan-500 transition-all duration-500 rounded-l-xl" />
      
      <div className="flex flex-col gap-4">
        <span className="text-cyan-500 font-mono text-sm tracking-wider">
          [{index}]
        </span>
        <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
          {title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default RuleCard;
