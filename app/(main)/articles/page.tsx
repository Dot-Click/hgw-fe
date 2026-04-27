import React from 'react'
import ArticleContainer from '@/components/article/ArticleContainer'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Articles | HGW Legend Vault",
    description: "Deep dives, analysis, and rankings of the greatest legends in history.",
}

const ArticlesPage = () => {
    return (
        <ArticleContainer />
    )
}

export default ArticlesPage
