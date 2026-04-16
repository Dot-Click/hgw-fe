"use client";

import React from "react";

const PILLARS = [
  {
    id: "D",
    name: "Durability",
    tagline: "The Engine",
    description: "Did they stay at the absolute top for decades, or did they burn out and fade away after a short peak?"
  },
  {
    id: "O",
    name: "Output",
    tagline: "The Numbers",
    description: "The cold, hard math. Championships, platinum records, box office hits, and verified historical wins."
  },
  {
    id: "M",
    name: "Mastery",
    tagline: "The Technique",
    description: "Flawless execution. Do they possess perfect technical skill and absolute mastery over the details of their craft?"
  },
  {
    id: "I",
    name: "Intimidation",
    tagline: "The Presence",
    description: "The psychological edge. Does their mere presence dominate the room, the stage, or the field, instantly outshining the competition?"
  },
  {
    id: "N",
    name: "Nerve",
    tagline: "The Ice",
    description: "The ultimate clutch factor. When the pressure is highest and the lights are brightest, do they freeze, or do they deliver?"
  },
  {
    id: "A",
    name: "Aura",
    tagline: "The Star Power",
    description: "Global gravity. Are they a household name whose personal brand completely transcends their specific industry?"
  },
  {
    id: "T",
    name: "Total Impact",
    tagline: "The Legacy",
    description: "Did their sheer presence shift the culture around them and build a multi-year dynasty or movement?"
  },
  {
    id: "I",
    name: "Innovation",
    tagline: "The Blueprint",
    description: "Did they invent a brand new style? Did they force their industry to literally rewrite the rules?"
  },
  {
    id: "O",
    name: "Omnipotence",
    tagline: "The Ownership",
    description: "Total control. The rare ability to single-handedly dictate the entire pace, trend, and flow of a performance or an era."
  },
  {
    id: "N",
    name: "Nature",
    tagline: "The Hardware",
    description: "Raw, undeniable talent. Were they simply born with freakish physical or creative gifts that others cannot replicate?"
  }
];

const PillarsOfDomination = () => {
  return (
    <section className="relative w-full overflow-hidden  py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-10">
        {/* Header Section */}
        <div className="flex flex-col gap-1">
          <h2 className="orbitron text-[14px] md:text-[34px] font-[900]  leading-tight">
            <span className="text-white">The 10 Pillars of </span>
            <span className="text-[#00CCFF]">D-O-M-I-N-A-T-I-O-N</span>
          </h2>
          <p className="max-w-3xl text-[#7B899D] outfit text-[11px] md:text-[16px] font-[400] leading-relaxed opacity-80">
            Following the Core Rules, every legend is evaluated across these 10 pillars to produce their final HGW 
            score.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="flex flex-col gap-4">
          {PILLARS.map((pillar, index) => (
            <div 
              key={`${pillar.id}-${index}`}
              className="group flex flex-row items-start gap-4 md:gap-6 p-4 md:p-5.5 rounded-[16px] bg-[#1F212866] border border-[#24262E] hover:border-[#00CCFF33] hover:bg-[#15161D] transition-all duration-300 shadow-xl"
            >
              {/* Letter Box */}
              <div className="flex-shrink-0 w-[38px] h-[38px] md:w-[50px] md:h-[50px] rounded-[8px] md:rounded-[12px] border border-[#00CCFF33] bg-[#00CCFF1A] group-hover:border-[#00CCFF] group-hover:shadow-[0_0_15px_rgba(0,204,255,0.2)] flex items-center justify-center orbitron text-[#00CCFF] text-[14px] md:text-[18px] font-[700] transition-all duration-300">
                {pillar.id}
              </div>

              {/* Content Box */}
              <div className="flex flex-col gap-1 w-full text-left">
                <div className="flex flex-row items-center flex-wrap gap-2 md:gap-3">
                  <h3 className="orbitron text-[#E7EBEF] text-[12px] md:text-[17px] font-[700] tracking-widest leading-none">
                    {pillar.name}
                  </h3>
                  <span className="orbitron text-[#FFBF00B2] text-[9px] md:text-[11px] font-[700] uppercase tracking-widest leading-none">
                    {pillar.tagline}
                  </span>
                </div>
                <p className="text-[#7B899D] outfit text-[10px] md:text-[13.5px] leading-relaxed font-[400] opacity-90">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PillarsOfDomination;