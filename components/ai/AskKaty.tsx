"use client"

import React, { useState, useRef, useEffect } from "react"
import { FiSend } from "react-icons/fi"
import { HiOutlineSparkles } from "react-icons/hi"
import Image from "next/image"
import AiChart from "./AiChart"
import { PLAYERS_DATA } from "@/data/players"

interface Message {
  id: string
  text: string
  sender: 'user' | 'katy'
  chart?: {
    data: any[]
    title: string
    dataKey: string
    nameKey: string
  }
}

const AskKaty = () => {      
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'katy',
      text: "Hello! I'm Katy, your AI assistant for the HGW Legend Vault. I can help you with analyzing player stats, comparing legends, and generating insights. What would you like to know?"
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const suggestions = [
    "Top scoring rugby players",
    "Compare Messi vs Ronaldo",
    "Best HGW score in football",
    "Boxing legends report"     
  ]

  const handleSend = (text: string = inputValue) => {
    if (!text.trim()) return

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text
    }

    setMessages(prev => [...prev, userMsg])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI Response
    setTimeout(() => {
      let katyResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'katy',
        text: "I'm looking into that for you..."
      }

      if (text.toLowerCase().includes('rugby') || text.toLowerCase().includes('top scoring')) {
        const rugbyPlayers = PLAYERS_DATA.filter(p => p.category === 'RUGBY')
          .sort((a, b) => b.score - a.score)
          .map(p => ({
            name: p.lastName || p.name,
            score: p.score
          }))

        katyResponse = {
          ...katyResponse,
          text: "Here are the top scoring rugby players in our vault. Richie McCaw leads with a score of 93.7, followed by Jonah Lomu and Dan Carter.",
          chart: {
            data: rugbyPlayers,
            title: "Top Rugby Players by HGW Score",
            dataKey: "score",
            nameKey: "name"
          }
        }
      } else {
        katyResponse.text = "That's a great question! I'm currently expanding my knowledge base. For now, I can mostly help with Rugby and Football player rankings."
      }

      setMessages(prev => [...prev, katyResponse])
      setIsTyping(false)
    }, 1500)
  }

  return (                   
    <div className="flex flex-col h-full bg-[#0E1015]/50 border border-[#24262E] rounded-[24px] overflow-hidden backdrop-blur-sm">
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-[#24262E] flex items-center gap-3.5 bg-[#111217]/50">
        <HiOutlineSparkles className="text-[#00CCFF]" size={22} />
        <h2 className="text-white font-[700] orbitron tracking-wider text-lg">Ask Katy</h2>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-6 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
            {msg.sender === 'katy' && (
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#1F2128] border border-[#24262E] flex items-center justify-center p-2 shrink-0 shadow-lg">
                <Image src="/assets/robot.png" alt="Katy" width={28} height={28} />
              </div>   
            )}
            <div className={`max-w-[85%] flex flex-col ${msg.sender === 'user' ? 'items-end' : ''}`}>
              <div className={`p-4 rounded-[20px] shadow-sm ${
                msg.sender === 'katy' 
                  ? 'bg-[#111217] border border-[#24262E] rounded-tl-none text-[#E7EBEF]' 
                  : 'bg-[#00CCFF] text-[#0B0F19] rounded-tr-none font-medium'
              }`}>
                <p className="text-[14px] md:text-[15px] outfit leading-relaxed tracking-wide">
                  {msg.text}
                </p>
                {msg.chart && (
                  <AiChart 
                    data={msg.chart.data} 
                    title={msg.chart.title} 
                    dataKey={msg.chart.dataKey} 
                    nameKey={msg.chart.nameKey} 
                  />
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#1F2128] border border-[#24262E] flex items-center justify-center p-2 shrink-0">
               <Image src="/assets/robot.png" alt="Katy" width={28} height={28} className="animate-pulse" />
            </div>
            <div className="bg-[#111217] border border-[#24262E] p-4 rounded-[20px] rounded-tl-none">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-[#00CCFF] rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-[#00CCFF] rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-[#00CCFF] rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        )}
        
        <div ref={chatEndRef} />

        {messages.length === 1 && !isTyping && (
          <div className="flex flex-wrap gap-2 pt-2">
            {suggestions.map((text, i) => (
              <button 
                key={i}
                onClick={() => handleSend(text)}
                className="px-3.5 py-2 rounded-xl border border-[#24262E] bg-[#111217] text-[#7B899D] text-[12px] outfit font-medium hover:border-[#00CCFF]/30 hover:text-[#00CCFF] hover:bg-[#00CCFF]/5 transition-all duration-300"
              >
                {text}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-[#24262E] bg-[#111217]/30">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="relative group"
        >
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask Katy anything..."
            className="w-full h-14 bg-[#111217] border border-[#24262E] rounded-2xl px-6 pr-32 text-white placeholder-[#4A5567] outline-none focus:border-[#00CCFF]/30 transition-all text-base md:text-lg outfit"
          />
          <button 
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#00D4FF] to-[#7000FF] disabled:opacity-50 disabled:grayscale text-[#0B0F19] px-6 h-10 rounded-xl flex items-center justify-center gap-2 font-black orbitron text-[12px] md:text-[14px] uppercase tracking-[0.1em] shadow-[0_0_15px_rgba(0,212,255,0.2)] hover:shadow-[0_0_25px_rgba(0,212,255,0.4)] transition-all"
          >
            <FiSend size={14} />
            Send
          </button>
        </form>
      </div>

    </div>
  )
}

export default AskKaty

