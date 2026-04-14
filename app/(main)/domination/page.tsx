import React from "react";
import { Metadata } from "next";
import RuleCard from "@/components/domination/RuleCard";
import PillarCard from "@/components/domination/PillarCard";
import * as motion from "framer-motion/client";

export const metadata: Metadata = {
  title: "THE ASSESSMENT FRAMEWORK: D-O-M-I-N-A-T-I-O-N",
  description: "Explore the internal scoring framework of the HGW algorithm.",
};

const rules = [
  {
    index: "01",
    title: "The Zero-Inference Rule (The Receipts)",
    description: "We never guess. Reputation and \"vibes\" mean nothing. Evidence must be measurable, verifiable, and documented. If it cannot be proven, it does not exist in the HGW matrix."
  },
  {
    index: "02",
    title: "Era-Standard Deviation (The Timeline Lock)",
    description: "You cannot compare a 1960s pioneer to a 2020s athlete using raw totals alone. We adjust for technology, medical advancements, and global athlete pools to normalize excellence across centuries."
  },
  {
    index: "03",
    title: "Market Density Weighting (The Competition Tax)",
    description: "How hard was it to reach the top? A dominant run in a crowded, global market carries more weight than dominance in a niche or developing era. The higher the density, the higher the score."
  },
  {
    index: "04",
    title: "The Recency Bias Audit (The Reality Filter)",
    description: "The machine does not get distracted by what is trending today. We prioritize longitudinal consistency over viral moments, ensuring that the 'Greatest of All Time' actually spans all time."
  },
  {
    index: "05",
    title: "The 1.2% Natural Decay Rule (The Drop-Off)",
    description: "Greatness inevitably fades. We track the rate of decline to identify who stayed dangerous at the end versus those who simply hung on for the paycheck. Longevity is only valid if efficiency remains."
  },
  {
    index: "06",
    title: "The 5% Exclusivity Cap (The Gatekeeper)",
    description: "The God-Tier is restricted. Only the top 5% of all recorded data points can qualify for 'Elite' status in any single Pillar. If everyone is a legend, nobody is."
  },
  {
    index: "07",
    title: "The Buster Douglas Clause (The Anomaly Margin)",
    description: "Absolute perfection is a myth. Every data set accounts for the outlier—the day the giant fell. We look for the response to the anomaly, not just the anomaly itself."
  }
];

const pillars = [
  {
    letter: "D",
    title: "Durability (The Engine)",
    description: "Did they stay at the absolute top for decades, or were they a flash in the pan?"
  },
  {
    letter: "O",
    title: "Output (The Numbers)",
    description: "The cold, hard math. Statistical dominance relative to their immediate peers."
  },
  {
    letter: "M",
    title: "Mastery (The Technique)",
    description: "Flawless execution of the fundamental mechanics of their craft."
  },
  {
    letter: "I",
    title: "Intimidation (The Presence)",
    description: "The psychological edge. The effect their name had on opponents before the event began."
  },
  {
    letter: "N",
    title: "Nerve (The Ice)",
    description: "The ultimate clutch factor. Performance under the highest possible stakes."
  },
  {
    letter: "A",
    title: "Aura (The Star Power)",
    description: "Global gravity. The ability to pull eyes from across the world to a single point."
  },
  {
    letter: "T",
    title: "Total Impact (The Legacy)",
    description: "Did their presence shift the culture or the rules of the game itself?"
  },
  {
    letter: "I",
    title: "Innovation (The Blueprint)",
    description: "Did they invent a new style or technique that others were forced to copy?"
  },
  {
    letter: "O",
    title: "Omnipotence (The Ownership)",
    description: "Total control over their environment, narrative, and competitive landscape."
  },
  {
    letter: "N",
    title: "Nature (The Hardware)",
    description: "Raw, undeniable talent that cannot be taught, only documented."
  }
];

export default function DominationPage() {
  return (
    <div className="relative min-h-screen py-20 px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full -z-10" />

      {/* Header Section */}
      <header className="min-h-[70vh] flex flex-col justify-center mb-24 text-center md:text-left">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block px-4 py-1.5 mb-6 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-mono tracking-widest uppercase self-center md:self-start"
        >
          Internal Protocol: 77-Alpha
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-8xl font-black text-white leading-none orbitron tracking-tighter mb-10"
        >
          THE ASSESSMENT<br className="hidden md:block" /> FRAMEWORK<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient [background-size:200%_auto]">
            D-O-M-I-N-A-T-I-O-N
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-2xl text-slate-400 text-lg md:text-2xl leading-relaxed font-light italic"
        >
          "Before an asset is graded on the 10 Pillars, their data must pass through the seven strict calibration protocols of the HGW algorithm."
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-mono">Archive Data</span>
          <div className="w-px h-12 bg-gradient-to-b from-cyan-500 to-transparent" />
        </motion.div>
      </header>

      {/* 7 Core Rules Section */}
      <section className="mb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white orbitron mb-2">
              HGW Archive - The 7 Core Rules
            </h2>
            <div className="h-1 w-20 bg-cyan-500 rounded-full" />
          </div>
          <p className="text-slate-500 font-mono text-sm max-w-md">
            // CALIBRATION_LAYER_V2.0
            <br />
            Ensuring data integrity across multi-generational datasets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rules.map((rule) => (
            <RuleCard
              key={rule.index}
              index={rule.index}
              title={rule.title}
              description={rule.description}
            />
          ))}
          {/* Decorative Empty Card */}
          <div className="hidden lg:flex items-center justify-center border border-dashed border-white/5 rounded-xl p-6 opacity-20">
            <span className="font-mono text-xs uppercase tracking-[0.2em]">Next Protocol Pending...</span>
          </div>
        </div>
      </section>

      {/* 10 Pillars Section */}
      <section>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white orbitron mb-4">
            The 10 Pillars of Domination
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            The final weighted metrics that define global greatness.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {pillars.map((pillar, idx) => (
            <PillarCard
              key={`${pillar.letter}-${idx}`}
              letter={pillar.letter}
              title={pillar.title}
              description={pillar.description}
            />
          ))}
        </div>
      </section>

      {/* Footer Note */}
      <footer className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-600 font-mono text-xs uppercase tracking-widest">
        <span>© 2026 HGW Algorithm Corp</span>
        <span>Status: Data Stream Active</span>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>System Optimized</span>
        </div>
      </footer>
    </div>
  );
}
