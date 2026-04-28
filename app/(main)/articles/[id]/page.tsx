import React from 'react'
import { prisma } from "@/lib/prisma"
import { notFound } from 'next/navigation'
import { FiCalendar, FiClock, FiUser, FiArrowLeft, FiStar } from "react-icons/fi"
import Link from "next/link"
import ArticleContent from "@/components/article/ArticleContent"

interface Props {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props) {
    const { id } = await params
    const article = await prisma.article.findUnique({
        where: { id },
        select: { title: true, description: true }
    })

    if (!article) return { title: 'Article Not Found' }

    return {
        title: `${article.title} | HGW Legend Vault`,
        description: article.description,
    }
}

const ArticleDetailPage = async ({ params }: Props) => {
    const { id } = await params
    
    const article = await prisma.article.findUnique({
        where: { id },
        include: {
            category: true,
            createdBy: {
                select: {
                    name: true,
                    image: true
                }
            }
        }
    })

    if (!article) {
        notFound()
    }

    return (
        <article className="min-h-screen pt-32 pb-20 relative flex flex-col items-center">
            <div className="w-full max-w-[1400px] px-6 md:px-12 lg:px-20 flex flex-col items-center">
                
                {/* Back Button */}
                <div className="w-full max-w-4xl mb-8">
                    <Link 
                        href="/articles" 
                        className="flex items-center gap-2 text-[#7B899D] hover:text-[#00CCFF] transition-colors text-sm font-medium group"
                    >
                        <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
                        Back to Articles
                    </Link>
                </div>

                {/* Hero Section */}
                <div className="w-full max-w-4xl flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <span className="px-4 py-1 rounded-full border border-[#00CCFF4D] text-[#00CCFF] text-[10px] md:text-[12px] font-bold tracking-[2px] uppercase">
                                {article.category?.name}
                            </span>
                            {article.featured && (
                                <span className="flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#FFB8001A] border border-[#FFB80033] text-[#FFB800] text-[10px] md:text-[12px] font-bold tracking-[2px] uppercase">
                                    <FiStar size={12} />
                                    Featured
                                </span>
                            )}
                        </div>
                        
                        <h1 className="text-[32px] md:text-[48px] lg:text-[56px] orbitron font-bold text-white leading-tight">
                            {article.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[#7B899D] text-sm md:text-base outfit border-b border-[#24262E] pb-8 mt-2">
                            <div className="flex items-center gap-2">
                                <FiUser className="text-[#00CCFF]" />
                                <span>{article.authorName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiCalendar className="text-[#00CCFF]" />
                                <span>{new Date(article.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiClock className="text-[#00CCFF]" />
                                <span>{article.readTime} min read</span>
                            </div>
                        </div>
                    </div>

                    {/* Cover Image */}
                    <div className="w-full aspect-[21/9] rounded-[24px] md:rounded-[32px] overflow-hidden border border-[#24262E] shadow-2xl relative">
                        <img 
                            src={article.imageUrl} 
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0D] to-transparent opacity-40"></div>
                    </div>

                    {/* Description / Summary */}
                    <p className="text-[18px] md:text-[22px] text-[#E7EBEF] outfit font-medium leading-relaxed italic border-l-4 border-[#00CCFF] pl-6 py-2">
                        {article.description}
                    </p>

                    {/* Main Content */}
                    <div className="w-full max-w-3xl">
                        <ArticleContent content={article.content || ''} />
                    </div>
                </div>
            </div>
        </article>
    )
}

export default ArticleDetailPage
