import { Metadata } from 'next';
import { LuChartColumn, LuGlobe, LuZap } from "react-icons/lu";
import { Card } from "@heroui/react";
import AboutCard from "@/components/about/AboutCard";
import { FiShield } from 'react-icons/fi';

export const metadata: Metadata = {
    title: "About HGW | The Mission to Archive Greatness",
    description: "Discover the vision behind How Good Was (HGW). Learn about our proprietary 10-pillar scoring system and our mission to create the definitive archive for the world's greatest sporting and cultural legends.",
    keywords: ["About HGW", "HGW Scoring System", "HGW Mission", "Legend Archiving", "Sport Evaluation", "10 Pillars of Domination"],
};


const About = () => {
    const aboutData = [
        {
            title: "Data-Driven",
            description: "Every score is backed by statistical analysis, historical context, and expert evaluation.",
            icon: <LuChartColumn />
        },
        {
            title: "Fair Comparison",
            description: "Era-adjusted scoring ensures legends from different decades are compared on equal footing.",
            icon: <FiShield  />
        },
        {
            title: "Multi-Category ",
            description: "We rank across football, rugby, and music with more categories coming soon.",
            icon: <LuGlobe />
        },
        {
            title: "Living Archive",
            description: "Scores are continuously updated as new data, achievements, and analysis emerge.",
            icon: <LuZap />
        }
    ];

    const pillars = [
        "Longevity", "Peak Dominance",
        "Statistical Output", "Trophies & Honours",
        "International Impact", "Clutch Factor",
        "Cultural Legacy", "Innovation & Influence",
        "Consistency & Reliability", "Era-Adjusted Dominance"
    ];

    return (
        <section className="min-h-screen pt-36 pb-20 relative flex flex-col items-center">
            {/* Centered outer container to "stuck" the content's horizontal position */}
            <div className="w-full max-w-[1400px] px-6 md:px-12 lg:px-20 flex flex-col">
                <div className="max-w-4xl w-full flex flex-col gap-10">
                
                {/* Header Section */}
                <div className="flex flex-col gap-1 max-w-6xl">
                    <div className="text-[32px] md:text-[56px] flex flex-wrap items-center gap-x-6 gap-y-2 orbitron font-bold leading-tight">
                        <h1 className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">About</h1>
                        <span className="text-[#00CCFF] drop-shadow-[0_0_15px_rgba(0,204,255,0.4)]">How Good Was</span>
                    </div>

                    <p className="text-[#7B899D] font-medium text-[16px] md:text-[18px] outfit leading-relaxed max-w-3xl">
                        The HGW Legend Vault is a digital archive that ranks the greatest sports and music legends of all time using a proprietary scoring system called the <span className="text-[#FFBF00] font-bold">10 Pillars of Domination</span>.
                    </p>
                </div>

                {/* Feature Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    {aboutData.map((item, index) => (
                        <AboutCard 
                            key={index} 
                            title={item.title} 
                            description={item.description} 
                            icon={item.icon} 
                        />
                    ))}
                </div>

                {/* 10 Pillars of Domination Section */}
                <Card className="bg-[#111217] border border-[#00CCFF33] rounded-[32px] p-8 md:p-8 w-full flex flex-col gap-6 shadow-[0_0_40px_rgba(0,204,255,0.05)] border-solid">
                    <Card.Title className="orbitron text-[#E7EBEF] text-[24px] md:text-[27px] font-bold tracking-widest text-center md:text-left">
                        The 10 Pillars of Domination
                    </Card.Title>
                    
                    <Card.Content className="grid grid-cols-1 md:grid-cols-2 gap-3 p-0 bg-transparent">
                        {pillars.map((pillar, index) => (
                            <div key={index} className="flex items-center gap-3 group">
                                <div className="w-7 h-7 rounded-lg bg-[#00CCFF1A] flex items-center justify-center text-[#00CCFF] font-bold text-[14px] orbitron shrink-0">
                                    {index + 1}
                                </div>
                                <span className="text-[#D1D9E0] text-[16px] md:text-[20px] outfit font-[300] group-hover:text-[#00CCFF] transition-colors">
                                    {pillar}
                                </span>
                            </div>
                        ))}
                    </Card.Content>
                </Card>
            </div>
        </div>
    </section>
    );
};

export default About