"use client";

import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchArticles } from '@/store/actions/articleActions';
import { Card, Button, Skeleton } from '@heroui/react';
import { FiArrowRight, FiCalendar, FiClock, FiStar } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const FeaturedArticle = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { articles, loading } = useSelector((state: RootState) => state.articles);

    useEffect(() => {
        if (articles.length === 0) {
            dispatch(fetchArticles());
        }
    }, [dispatch, articles.length]);

    const featuredArticle = useMemo(() => {
        return articles.find(art => art.featured && art.status === 'PUBLISHED');
    }, [articles]);

    if (loading && articles.length === 0) {
        return (
            <div className="w-full max-w-6xl px-6 mt-10">
                <Skeleton className="w-full h-[300px] md:h-[450px] rounded-[32px] bg-[#1E293B]/50" />
            </div>
        );
    }

    if (!featuredArticle) return null;

    return (
        <section className="w-full max-w-7xl px-6 mt-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
                        <FiStar size={20} />
                    </div>
                    <h2 className="orbitron text-[#7B899D] text-[14px] md:text-[16px] font-[700] tracking-[0.2em] uppercase">Featured Article</h2>
                </div>

                <Card 
                    className="group relative overflow-hidden bg-[#0D0E12] border border-[#747A944D] rounded-[32px] shadow-2xl hover:border-[#00CCFF55] transition-all duration-500 cursor-pointer"
                    onClick={() => router.push(`/articles`)}
                >
                    <div className="flex flex-col lg:flex-row min-h-[400px]">
                        {/* Image Section */}
                        <div className="relative w-full lg:w-[55%] h-[250px] lg:h-auto overflow-hidden">
                            <img 
                                src={featuredArticle.imageUrl} 
                                alt={featuredArticle.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0D0E12] via-transparent to-transparent z-10" />
                        </div>

                        {/* Content Section */}
                        <div className="w-full lg:w-[45%] p-8 lg:p-12 flex flex-col justify-center gap-6 z-20">
                            <div className="flex flex-col gap-3">
                                <span className="px-3 py-1 w-fit rounded-full bg-[#00CCFF1A] border border-[#00CCFF4D] text-[#00CCFF] text-[10px] md:text-[12px] font-bold uppercase tracking-widest outfit">
                                    {featuredArticle.category?.name}
                                </span>
                                <h3 className="orbitron text-white text-[24px] md:text-[32px] font-bold leading-tight group-hover:text-[#00CCFF] transition-colors">
                                    {featuredArticle.title}
                                </h3>
                                <p className="text-[#7B899D] outfit text-[14px] md:text-[16px] leading-relaxed line-clamp-3">
                                    {featuredArticle.description}
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-6 text-[#7B899D] text-[12px] md:text-[14px] outfit">
                                <div className="flex items-center gap-2">
                                    <FiCalendar className="text-[#00CCFF]" />
                                    <span>{new Date(featuredArticle.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FiClock className="text-[#00CCFF]" />
                                    <span>{featuredArticle.readTime} min read</span>
                                </div>
                            </div>

                            <Button 
                                className="w-fit bg-[#00CCFF] hover:bg-[#00B8E6] text-[#0B0B0F] font-bold py-6 px-8 rounded-xl flex items-center gap-3 orbitron text-[14px] shadow-[0_0_20px_rgba(0,204,255,0.2)]"
                                onPress={() => router.push(`/articles`)}
                            >
                                Read Full Story
                                <FiArrowRight size={18} />
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    );
};

export default FeaturedArticle;
