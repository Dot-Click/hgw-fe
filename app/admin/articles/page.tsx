"use client"

import React, { useState } from 'react'
import ArticleHeader from '@/components/article/ArticleHeader'
import ArticleTable from '@/components/article/ArticleTable'
import { ArticleModal } from '@/components/article/ArticleModal'

const ArticlePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingArticle, setEditingArticle] = useState<any>(null)

  const handleAdd = () => {
    setEditingArticle(null)
    setIsModalOpen(true)
  }

  const handleEdit = (article: any) => {
    setEditingArticle(article)
    setIsModalOpen(true)
  }

  return (
    <div className="flex flex-col gap-2">
      <ArticleHeader onAdd={handleAdd} />
      <ArticleTable onEdit={handleEdit} />
      
      <ArticleModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        article={editingArticle}
      />
    </div>
  )
}

export default ArticlePage