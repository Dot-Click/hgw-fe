import React from 'react'
import AiHeader from '@/components/ai/AiHeader'
import AskKaty from '@/components/ai/AskKaty'
import AiStatus from '@/components/ai/AiStatus'
import QuickSettings from '@/components/ai/QuickSettings'

const AI = () => {
  return (
    <div className="flex flex-col gap-1">
      <AiHeader />
      
      {/* Main Content Responsive Grid */}
      <div className="grid grid-cols-1   lg:grid-cols-3 gap-6 lg:items-start">
        {/* Left Column: Chat Interface (Spans 2 columns on large screens) */}
        <div className="lg:col-span-2 h-[600px]">
          <AskKaty />
        </div>

        
        {/* Right Column: Status & Settings */}
        <div className="flex flex-col gap-6">
          <AiStatus />
          <QuickSettings />
        </div>
      </div>
    </div>
  )
}

export default AI

