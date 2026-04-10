import * as React from "react"
import type { Metadata } from "next"
import PlayersContent from "@/components/players/PlayersContent"

export const metadata: Metadata = {
  title: "Manage Players | HGW Legend Vault Admin",
  description: "Comprehensive management area for all athletes and legends in the HGW ecosystem. Search, filter, and bulk import legendary profiles with real-time updates.",
  keywords: ["Legends", "HGW Admin", "Player Management", "Vault Profiles", "Real-time Search"],
  robots: {
    index: false,
    follow: false,
  },
}

const PlayersPage = () => {
  return (
    <div className="flex flex-col">
      <PlayersContent />
    </div>
  )
}

export default PlayersPage