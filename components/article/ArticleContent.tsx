"use client";

import React from 'react';

interface ArticleContentProps {
    content: string;
}

const ArticleContent = ({ content }: ArticleContentProps) => {
    return (
        <div className="article-content-wrapper mt-8 w-full">
            <div 
                className="rich-content text-[#A5B4C3] text-[17px] md:text-[19px] leading-[1.8] outfit space-y-6 text-left w-full"
                dangerouslySetInnerHTML={{ __html: content }}
            />
            <style jsx global>{`
                .rich-content {
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                }
                .rich-content * {
                    background-color: transparent !important;
                    box-shadow: none !important;
                }
                .rich-content h1, 
                .rich-content h2, 
                .rich-content h3 {
                    font-family: 'Orbitron', sans-serif;
                    color: white;
                    margin-top: 2.5rem;
                    margin-bottom: 1.25rem;
                    font-weight: 700;
                    line-height: 1.3;
                    text-align: left;
                }
                .rich-content h1 { font-size: 36px; border-bottom: 1px solid #24262E; padding-bottom: 0.5rem; }
                .rich-content h2 { font-size: 28px; border-bottom: 1px solid #24262E; padding-bottom: 0.4rem; }
                .rich-content h3 { font-size: 22px; }
                
                .rich-content p {
                    margin-bottom: 1.8rem;
                    text-align: left;
                    color: #A5B4C3;
                }
                .rich-content strong {
                    color: #FFFFFF;
                    font-weight: 700;
                }
                .rich-content em {
                    color: #E7EBEF;
                    font-style: italic;
                }
                .rich-content ul, .rich-content ol {
                    margin-left: 1.5rem;
                    margin-bottom: 1.8rem;
                    text-align: left;
                }
                .rich-content ul { list-style-type: disc; }
                .rich-content ol { list-style-type: decimal; }
                .rich-content li {
                    margin-bottom: 0.75rem;
                    padding-left: 0.5rem;
                }
                .rich-content a {
                    color: #00CCFF;
                    text-decoration: none;
                    border-bottom: 1px solid rgba(0, 204, 255, 0.3);
                    transition: all 0.2s;
                }
                .rich-content a:hover {
                    color: #33D6FF;
                    border-bottom-color: #00CCFF;
                    background: rgba(0, 204, 255, 0.05);
                }
                .rich-content blockquote {
                    border-left: 4px solid #00CCFF;
                    padding: 1rem 0 1rem 1.5rem;
                    font-style: italic;
                    color: #E7EBEF;
                    background: rgba(0, 204, 255, 0.03);
                    margin: 2.5rem 0;
                    font-size: 1.1em;
                }
                .rich-content img {
                    max-width: 100%;
                    height: auto;
                    rounded: 12px;
                    margin: 2rem 0;
                    border: 1px solid #24262E;
                }
            `}</style>
        </div>
    );
};

export default ArticleContent;
