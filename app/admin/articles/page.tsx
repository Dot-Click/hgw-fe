import React from 'react'
import { Metadata } from 'next'
import ArticleHeader from '@/components/article/ArticleHeader'
import ArticleTable from '@/components/article/ArticleTable'

export const metadata: Metadata = {
  title: 'Articles Management | HGW Admin',
  description: 'Manage and publish blog posts and articles for the Legend Vault.',
}

const ArticlePage = () => {
  return (
    <div className="flex flex-col gap-2">
      <ArticleHeader />
      <ArticleTable />
    </div>
  )
}

export default ArticlePage