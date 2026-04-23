"use client"

import React, { useState } from 'react'
import AdminPodcastHeader from '@/components/podcast/AdminPodcastHeade'
import AdminPodcastDetails from '@/components/podcast/AdminPodcastDetails'
import { EpisodeModal } from '@/components/podcast/EpisodeModal'

const PodcastPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPodcast, setEditingPodcast] = useState<any>(null)

  const handleOpenAdd = () => {
    setEditingPodcast(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (podcast: any) => {
    setEditingPodcast(podcast)
    setIsModalOpen(true)
  }

  return (
    <div className="flex flex-col gap-2">
      <AdminPodcastHeader onAdd={handleOpenAdd} />
      <AdminPodcastDetails onEdit={handleOpenEdit} />
      
      <EpisodeModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        podcast={editingPodcast}
      />
    </div>
  )
}

export default PodcastPage