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
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-stretch">
        {/* Left Column: Chat Interface (Spans larger portion on big screens) */}
        <div className="xl:col-span-3 h-[750px]">
          <AskKaty />
        </div>

        {/* Right Column: Status & Settings */}
        <div className="flex flex-col gap-6 xl:h-[750px]">
          <AiStatus />
          <QuickSettings />
        </div>
      </div>
    </div>
  )
}

export default AI

