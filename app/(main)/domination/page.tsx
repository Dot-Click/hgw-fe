import React from 'react'
import { Metadata } from 'next'
import DominationHeader from '@/components/domination/DominationHeader'
import HGWArchive from '@/components/domination/HGWArchive'
import PillarsOfDomination from '@/components/domination/PillarsOfDomination'

export const metadata: Metadata = {
  title: "Domination | HGW Legend Vault Scoring",
  description: "Explore the proprietary HGW Domination framework. Understand the 7 Core Rules of the HGW Archive and the 10 Pillars of Domination used to evaluate and rank the world's greatest legends.",
  keywords: ["HGW Domination", "Legend Ranking Framework", "HGW Archive Rules", "10 Pillars of Domination", "Career Superiority Metric", "Sport Legend Evaluation"],
};


const Domination = () => {
  return (
    <div className="flex flex-col  w-full min-h-screen">
      <DominationHeader />
      <HGWArchive />
      <PillarsOfDomination />
    
    </div>
  )
}

export default Domination