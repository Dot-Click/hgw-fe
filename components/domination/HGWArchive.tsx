"use client";

import React from "react";

const RULES = [
  {
    id: "01",
    title: "The Zero-Inference Rule",
    badge: "THE RECEIPTS",
    description: "We never guess. Reputation and \"vibes\" mean nothing. Every single point must be backed by verified historical data, contracts, or undeniable facts. No receipt, no score."
  },
  {
    id: "02",
    title: "Era-Standard Deviation",
    badge: "THE TIMELINE LOCK",
    description: "You cannot compare a 1960s pioneer to a modern superstar using today's tools. The machine locks the baseline to their specific era, judging them strictly against the boundaries of their own time."
  },
  {
    id: "03",
    title: "Market Density Weighting",
    badge: "THE COMPETITION TAX",
    description: "How hard was it to reach the top? The algorithm applies a difficulty tax based on the size of the market. Dominating a highly competitive global era scores mathematically higher than ruling a small, localized scene."
  },
  {
    id: "04",
    title: "The Recency Bias Audit",
    badge: "THE REALITY FILTER",
    description: "The machine does not get distracted by what is trending today. It actively audits the data to ensure modern assets are not artificially inflated over historical legends just because they have higher media visibility."
  },
  {
    id: "05",
    title: "The 1.2% Natural Decay Rule",
    badge: "THE DROP-OFF",
    description: "Greatness inevitably fades. The algorithm automatically tracks the biological or creative decline of an asset as they age past their peak, penalizing their score unless they innovate to offset the drop."
  },
  {
    id: "06",
    title: "The 5% Exclusivity Cap",
    badge: "THE GATEKEEPER",
    description: "The God-Tier is restricted. The system is mathematically hardcoded to ensure that a maximum of 5% of the entire database can ever achieve a 90.0+ rating. The elite club remains truly elite."
  },
  {
    id: "07",
    title: "The Buster Douglas Clause",
    badge: "THE ANOMALY MARGIN",
    description: "Absolute perfection is a myth. The maximum algorithmic Confidence Score is capped at 98%. The HGW algorithm always leaves a 2% margin for the impossible, the unexplainable, or the ultimate underdog upset."
  }
];

const HGWArchive = () => {
  return (
    <section className="relative w-full overflow-hidden ">

      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-10">
        {/* Header Section */}
        <div className="flex flex-col gap-1">
          <h2 className="orbitron text-[14px] md:text-[34px] font-[900] tracking-tight leading-tight">
            <span className="text-white">HGW Archive – THE 7 </span>
            <span className="text-[#00CCFF]">CORE RULES</span>
          </h2>
          <p className="max-w-3xl text-[#7B899D] outfit text-[11px] md:text-[16px] font-[400] leading-relaxed opacity-80">
            Before an asset is graded on the 10 Pillars of domination, their data must pass through the seven strict calibration 
            protocols of the HGW algorithm.
          </p> 
        </div>
                          
          {/* Rules Grid */}
        <div className="flex flex-col gap-4">
          {RULES.map((rule) => (
            <div 
              key={rule.id}
              className="group flex flex-row items-start gap-4 md:gap-6 p-4 md:p-5.5 rounded-[16px] bg-[#111217] border border-[#24262E] hover:border-[#00CCFF33] hover:bg-[#15161D] transition-all duration-300 shadow-xl"
            >
              {/* Number Box */}
              <div className="flex-shrink-0 py-2 px-2.5 md:py-4 md:px-3.5 rounded-[8px] md:rounded-[12px] border border-[#00CCFF33] bg-[#00CCFF1A] group-hover:border-[#00CCFF] group-hover:shadow-[0_0_15px_rgba(0,204,255,0.2)] flex items-center justify-center orbitron text-[#00CCFF] text-[11px] md:text-[17px] font-[700] tracking-wider transition-all duration-300">
                [{rule.id}]
              </div>

            {/* Content Box */}
            <div className="flex flex-col gap-1 w-full text-left">
              <div className="flex flex-row items-center flex-wrap gap-2 md:gap-4">
                <h3 className="orbitron text-[#E7EBEF] text-[12px] md:text-[16px] font-[700] tracking-wide leading-none">
                  {rule.title}
                </h3>
                <span className="px-2 py-1.5 rounded-full border border-[#FFBF0033] bg-[#FFBF001A] text-[#FE7B02] orbitron tracking-[0.1em] text-[8px] md:text-[10px] font-[700] uppercase leading-none">
                  {rule.badge}
                </span>
              </div>
              <p className="text-[#7B899D] outfit text-[10px] md:text-[13px] leading-relaxed font-[400] opacity-90">
                {rule.description}
              </p>
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
};

export default HGWArchive;