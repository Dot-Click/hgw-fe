import React from 'react'
import { Metadata } from 'next'
import AdminPodcastHeader from '@/components/podcast/AdminPodcastHeade'
import AdminPodcastDetails from '@/components/podcast/AdminPodcastDetails'

export const metadata: Metadata = {
  title: 'Podcasts Management | HGW Admin',
  description: 'Manage and publish podcast episodes and embeds for the Legend Vault.',
  keywords: ['Podcasts Management', 'HGW Podcasts', 'Publish Podcasts', 'Legend Vault Audio', 'Admin Podcasts'],
}

const PodcastPage = () => {
  return (
    <div className="flex flex-col gap-2">
      <AdminPodcastHeader />
      <AdminPodcastDetails />
    </div>
  )
}

export default PodcastPage