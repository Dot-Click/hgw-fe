"use client";

import { useState, useEffect, useMemo } from 'react'
import { Card, Button, Skeleton } from "@heroui/react"
import { FiCalendar, FiClock, FiArrowRight, FiUser, FiFileText } from "react-icons/fi"
import Link from "next/link"
import ArticleCard from "@/components/article/ArticleCard"
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { fetchArticles } from '@/store/actions/articleActions'

const ArticleContainer = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { articles, loading } = useSelector((state: RootState) => state.articles)
    const [selectedCategory, setSelectedCategory] = useState("All Articles");
    const [isInitialMount, setIsInitialMount] = useState(true);

    useEffect(() => {
        dispatch(fetchArticles()).finally(() => {
            setIsInitialMount(false);
        });
    }, [dispatch]);

    const categories = useMemo(() => {
        const cats = ["All Articles"];
        const publishedArticles = articles.filter(art => art.status === 'PUBLISHED');
        publishedArticles.forEach(art => {
            if (art.category?.name && !cats.includes(art.category.name)) {
                cats.push(art.category.name);
            }
        });
        return cats;
    }, [articles]);

    const featuredArticle = useMemo(() => {
        return articles.find(art => art.featured && art.status === 'PUBLISHED');
    }, [articles]);

    const latestArticles = useMemo(() => {
        let filtered = articles.filter(art => !art.featured && art.status === 'PUBLISHED');
        
        if (selectedCategory !== "All Articles") {
            filtered = filtered.filter(art => art.category?.name === selectedCategory);
        }
        
        return filtered;
    }, [articles, selectedCategory]);

    if ((loading || isInitialMount) && articles.length === 0) {
        return (
            <section className="min-h-screen pt-36 pb-20 relative flex flex-col items-center">
                <div className="w-full max-w-[1400px] px-6 md:px-12 lg:px-20 flex flex-col">
                    <div className="max-w-6xl w-full flex flex-col gap-10">
                        <div className="flex flex-col gap-4">
                            <Skeleton className="w-32 h-6 rounded-lg bg-[#1E293B]" />
                            <Skeleton className="w-64 h-12 rounded-xl bg-[#1E293B]" />
                            <Skeleton className="w-full max-w-xl h-6 rounded-lg bg-[#1E293B]" />
                        </div>
                        <Skeleton className="w-full aspect-[21/9] rounded-[32px] bg-[#1E293B]" />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map(i => (
                                <Skeleton key={i} className="w-full h-[400px] rounded-[22px] bg-[#1E293B]" />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen pt-36 pb-20 relative flex flex-col items-center">
            <div className="w-full max-w-[1400px] px-6 md:px-12 lg:px-20 flex flex-col">
                <div className="max-w-6xl w-full flex flex-col gap-10">

                    {/* Header Section */}
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-[#00CCFF] tracking-[0.2rem] font-[600]">
                            <span className="text-[16px] md:text-[17px] text-[#00CCFF]"> <FiFileText /></span>
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
                                className={`px-[16px] py-[8px] rounded-[12px] text-center outfit text-[12px] md:text-[16px] font-[600] transition-all duration-300 border ${selectedCategory === cat
                                    ? "bg-[#00CCFF] text-[#0B0B0F] border-[#00CCFF] shadow-[0_0_20px_rgba(0,204,255,0.3)]"
                                    : "bg-[#1F2128] text-[#7B899D] border-[#24262E] hover:text-white hover:bg-[#24262E]"
                                    }`}
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>

                    {/* Featured Article */}
                    {featuredArticle && (
                        <Card className="bg-[#0D0E12] w-full max-w-[950px] mx-auto h-fit border p-0 border-[#747A94CC] rounded-[24px] md:rounded-[32px] overflow-hidden shadow-none group">
                            <div className="relative z-10 flex flex-col">
                                <div className="relative w-full h-[280px] md:h-[600px] overflow-hidden">
                                    <img
                                        src="/assets/gradient.png"
                                        className="absolute inset-x-0 top-0 w-full h-[150px] md:h-[300px] object-cover pointer-events-none z-10 rotate-180"
                                        alt="Top Gradient Overlay"
                                    />
                                    <img
                                        src={featuredArticle.imageUrl}
                                        alt={featuredArticle.title}
                                        className="w-full h-full object-cover opacity-90"
                                    />
                                    <img
                                        src="/assets/gradient.png"
                                        className="absolute inset-x-0 bottom-0 w-full h-[150px] md:h-[300px] object-cover pointer-events-none"
                                        alt="Gradient Overlay"
                                    />
                                    <div className="absolute top-4 md:top-8 left-4 md:left-8 bg-[#00CCFFE5] text-[#0B0B0F] px-4 py-1 rounded-[9999px] text-[10px] md:text-[13px] outfit tracking-[2px] md:tracking-[3px] font-bold z-20">
                                        FEATURED
                                    </div>
                                </div>

                                <div className="px-5 md:px-12 pb-8 -mt-24 md:-mt-56 relative z-20">
                                    <div className="mb-4 md:mb-6">
                                        <span className="px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-[#00CCFF4D] text-[#00CCFF] text-[8px] md:text-[11px] font-medium tracking-[2.5px] md:tracking-[3.5px] uppercase">
                                            {featuredArticle.category?.name}
                                        </span>
                                    </div>

                                    <h2 className="text-[#E7EBEF] text-[18px] md:text-[28px] lg:text-[32px] xl:text-[40px] orbitron font-semibold leading-[1.2] mb-3 tracking-wide drop-shadow-sm">
                                        {featuredArticle.title}
                                    </h2>
    
                                    <p className="text-[#7B899D] text-[14px] md:text-[19px] outfit leading-relaxed line-clamp-2 md:line-clamp-3 opacity-80 max-w-3xl">
                                        {featuredArticle.description}
                                    </p>
        
                                    <div className="flex flex-col gap-6 mt-6">
                                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[#7B899D] text-[13px] md:text-[16px] outfit">
                                            <div className="flex items-center gap-2 group/meta">
                                                <FiUser className="text-[#00CCFF] text-sm md:text-lg" />
                                                <span className="transition-colors group-hover/meta:text-white">{featuredArticle.authorName}</span>
                                            </div>

                                            <div className="flex items-center gap-2 group/meta">
                                                <FiCalendar className="text-[#00CCFF] text-sm md:text-lg" />
                                                <span className="transition-colors group-hover/meta:text-white">
                                                    {new Date(featuredArticle.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2 group/meta">
                                                <FiClock className="text-[#00CCFF] text-sm md:text-lg" />
                                                <span className="transition-colors group-hover/meta:text-white">{featuredArticle.readTime} min read</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-start">
                                            <Link href={`/articles/${featuredArticle.id}`} className="w-full md:w-fit">
                                                <Button className="bg-[#00CCFF] hover:bg-[#00B8E6] text-[#0B0B0F] font-[600] py-6 px-8 rounded-[12px] md:rounded-[14px] flex items-center justify-center gap-3 group/btn outfit text-[15px] md:text-[16px] w-full md:w-fit shadow-[0_0_20px_rgba(0,204,255,0.2)]">
                                                    Read Article
                                                    <FiArrowRight className="text-xl transition-transform group-hover/btn:translate-x-1.5" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* Latest Articles Heading */}
                    <div className='flex flex-col gap-4 mt-4 items-start w-full'>
                        <div className="flex flex-col gap-2 ">
                            <h3 className="orbitron text-[#7B899D] text-[12px] md:text-[15px] font-[700] tracking-[0.2em] uppercase">Latest Articles</h3>
                        </div>

                        {/* Articles Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                            {latestArticles.map((article) => (
                                <ArticleCard 
                                    key={article.id} 
                                    id={article.id}
                                    title={article.title}
                                    description={article.description}
                                    image={article.imageUrl}
                                    category={article.category?.name}
                                    date={new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                                    readTime={`${article.readTime} min read`}
                                />
                            ))}
                        </div>

                        {!loading && !isInitialMount && latestArticles.length === 0 && (
                            <div className="w-full text-center py-20 bg-[#11121740] rounded-3xl border border-[#24262E]">
                                <p className="text-[#7B899D] outfit">No articles found in this category.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ArticleContainer;
