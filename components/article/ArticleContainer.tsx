"use client";

import { useState } from 'react'
import { Card, Button } from "@heroui/react"
import { FiCalendar, FiClock, FiArrowRight, FiUser, FiFileText } from "react-icons/fi"
import ArticleCard from "@/components/article/ArticleCard"

const ArticleContainer = () => {
    const [selectedCategory, setSelectedCategory] = useState("All Articles");

    const categories = ["All Articles", "Analysis", "Ranking", "Database", "Debates"];

    const articles = [
        {
            id: 1,
            title: "Are Era-Adjusted Scores Fairer Than Raw Stats?",
            description: "Comparing players across decades remains notoriously difficult. Here's how we handle those who perfected...",
            image: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=687&auto=format&fit=crop",
            category: "Analysis",
            date: "Dec 1, 2024",
            readTime: "8 min read"
        },
        {
            id: 2,
            title: "The Greatest Clutch Performers in History",
            description: "When the pressure is highest, these legends deliver. A breakdown of our Clutch Factor pillar.",
            image: "https://images.unsplash.com/photo-1511886929837-de244d82f7c2?q=80&w=2670&auto=format&fit=crop",
            category: "Rankings",
            date: "Nov 20, 2024",
            readTime: "12 min read"
        },
        {
            id: 3,
            title: "Messi vs Ronaldo: The Definitive HGW Breakdown",
            description: "An exhaustive statistical analysis across 10 pillars for the greatest rivalry in modern sports history.",
            image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2693&auto=format&fit=crop",
            category: "Debates",
            date: "Nov 15, 2024",
            readTime: "15 min read"
        },
        {
            id: 4,
            title: "How Cultural Legacy Shapes a Legend's Score",
            description: "Icons are more than just raw stats. Here's how we quantify cultural impact toward the final vault rating.",
            image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2670&auto=format&fit=crop",
            category: "Analysis",
            date: "Oct 25, 2024",
            readTime: "10 min read"
        },
        {
            id: 5,
            title: "Top 10 Legends Who Peaked the Hardest",
            description: "Peak dominance is about short bursts of absolute brilliance. These five had the highest peaks ever recorded.",
            image: "https://images.unsplash.com/photo-1510279770293-c3f9e4a3c32e?q=80&w=2670&auto=format&fit=crop",
            category: "Rankings",
            date: "Oct 12, 2024",
            readTime: "15 min read"
        }
    ];

    const heroArticle = {
        title: "The Science Behind the 10 Pillars of Domination",
        description: "How we built a scoring system that fairly compares legends across different sports and eras. A deep dive into our methodology and the data-driven framework behind every HGW rating.",
        image: "/assets/articleImg.png",
        category: "Methodology",
        author: "HGW Research Team",
        date: "Dec 15, 2024",
        readTime: "15 min read"
    };

    return (
        <section className="min-h-screen pt-28 pb-20 relative flex flex-col items-center">
            {/* Centered outer container to "stuck" the content's horizontal position */}
            <div className="w-full max-w-[1400px] px-6 md:px-12 lg:px-20 flex flex-col">
                <div className="max-w-6xl w-full flex flex-col gap-10">

                    {/* Header Section */}
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-[#00CCFF] tracking-[0.2rem]  font-bold">
                            <span className="text-[16px]   md:text-[17px] text-[#00CCFF]"> <FiFileText /></span>
                            <span className='text-[10px] md:text-[14px] uppercase'>HGW Editorial</span>
                        </div>
                        <div className="text-[32px] md:text-[56px] flex flex-wrap items-center gap-x-6 gap-y-2 orbitron font-bold leading-tight">
                            <h1 className="text-[#FFFFFF] text-shadow-[0px_-5px_25.6px_#00000040]">The <span className="text-[#00CCFF] text-shadow-[0px_-5px_25.6px_#00CCFF6E]">Vault</span> Articles</h1>
                        </div>
                        <p className="text-[#7B899D] font-medium text-[16px] md:text-[18px] outfit leading-relaxed max-w-2xl">
                            Insights, analysis, and deep dives from the HGW research team.
                        </p>
                    </div>

                    {/* Filter Section */}
                    <div className="flex flex-wrap items-center gap-3">
                        {categories.map((cat) => (
                            <Button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-[16px] py-[8px] rounded-[12px] text-center outfit text-[12px] md:text-[16px] font-[600]  transition-all duration-300 border ${selectedCategory === cat
                                    ? "bg-[#00CCFF] text-[#0B0B0F] border-[#00CCFF] shadow-[0_0_20px_rgba(0,204,255,0.3)]"
                                    : "bg-[#1F2128] text-[#7B899D] border-[#24262E] hover:text-white hover:bg-[#24262E]"
                                    }`}
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>

                    {/* Hero Featured Article Card */}
                    <Card className="bg-[#0D0E12] w-[950px] mx-auto h-fit border p-0 border-[#747A94CC] rounded-[32px] overflow-hidden shadow-none group">
                        <div className="relative z-10 flex flex-col">
                            {/* IMAGE SECTION */}
                            <div className="relative w-full h-[300px] md:h-[600px] overflow-hidden">
                                {/* ASSET GRADIENT (BEFORE IMG) */}
                                <img
                                    src="/assets/gradient.png"
                                    className="absolute inset-x-0 top-0 w-full h-[300px] object-cover pointer-events-none z-10 rotate-180"
                                    alt="Top Gradient Overlay"
                                />

                                <img
                                    src="/assets/articleImg.png"
                                    alt={heroArticle.title}
                                    className="w-full h-full object-fill opacity-90"
                                />

                                {/* ASSET GRADIENT */}
                                <img
                                    src="/assets/gradient.png"
                                    className="absolute inset-x-0 bottom-0 w-full h-[300px] object-cover pointer-events-none"
                                    alt="Gradient Overlay"
                                />

                                {/* TOP LEFT "FEATURED" BADGE */}
                                <div className="absolute top-8 left-8 bg-[#00CCFFE5] text-[#0B0B0F] px-4 py-1 rounded-[9999px] text-[10px] md:text-[13px] outfit tracking-[3px] font-bold z-20">
                                    FEATURED
                                </div>
                            </div>

                            {/* CONTENT SECTION */}
                            <div className="px-8 md:px-12 pb-8 -mt-56 relative z-20">
                                {/* CATEGORY BADGE */}
                                <div className="mb-6">
                                    <span className="px-4 py-1.5 rounded-full border border-[#00CCFF4D] text-[#00CCFF] text-[9px] md:text-[11px] font-medium tracking-[3.5px]   uppercase">
                                        {heroArticle.category}
                                    </span>
                                </div>

                                {/* TITLE */}
                                <h2 className="text-[#E7EBEF] text-[20px] md:text-[28px] orbitron font-semibold leading-[1.1] mb-3 tracking-wide drop-shadow-sm">
                                    {heroArticle.title}
                                </h2>
   
                                {/* DESCRIPTION */}
                                <p className="text-[#7B899D] text-[16px] md:text-[19px] outfit leading-relaxed  line-clamp-2 md:line-clamp-none opacity-80">
                                    {heroArticle.description}
                                </p>
      
                                {/* META INFO & BUTTON ROW */}
                                <div className="flex flex-col  gap-6 mt-5">
                                    <div className='flex items-center gap-7'>
                                        {/* ICONS / META */}
                                        <div className="flex items-center gap-2.5 group/meta">
                                            <div className="flex flex-wrap items-center gap-7 text-[#7B899D] text-[16px] outfit">
                                                <FiUser className="text-[#00CCFF] text-lg" />
                                                <span className="transition-colors group-hover/meta:text-white">{heroArticle.author}</span>
                                            </div>

                                            <div className="flex items-center gap-2.5 group/meta">
                                                <FiCalendar className="text-[#00CCFF] text-lg" />
                                                <span className="transition-colors group-hover/meta:text-white">{heroArticle.date}</span>
                                            </div>

                                            <div className="flex items-center gap-2.5 group/meta">
                                                <FiClock className="text-[#00CCFF] text-lg" />
                                                <span className="transition-colors group-hover/meta:text-white">{heroArticle.readTime}</span>
                                            </div>
                                        </div>

                                    </div>

                                    {/* ACTION BUTTON */}
                                    <Button className="bg-[#00CCFF] hover:bg-[#00B8E6] text-[#0B0B0F] font-[500] py-6 px-5 rounded-[14px] flex items-center justify-center gap-3  group/btn outfit text-[16px]">
                                        Read Article
                                        <FiArrowRight className="text-xl transition-transform group-hover/btn:translate-x-1.5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Latest Articles Heading */}
                    <div className='flex flex-col gap-4 mt-4 items-start'>

                        <div className="flex flex-col gap-2 ">
                            <h3 className="orbitron text-[#7B899D] text-[12px] md:text-[15px] font-[700] tracking-[0.2em] uppercase">Latest Articles</h3>
                        </div>

                        {/* Articles Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {articles.map((article) => (
                                <ArticleCard key={article.id} {...article} />
                            ))}
                        </div>

                    </div>


                </div>
            </div>
        </section>
    );
};

export default ArticleContainer;
