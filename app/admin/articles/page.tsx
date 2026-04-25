"use client"

import React, { useState } from 'react'
import ArticleHeader from '@/components/article/ArticleHeader'
import ArticleTable from '@/components/article/ArticleTable'
import { ArticleModal } from '@/components/article/ArticleModal'

const ArticlePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <ArticleHeader onAdd={() => setIsModalOpen(true)} />
      <ArticleTable />
      
      <ArticleModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  )
}

export default ArticlePage