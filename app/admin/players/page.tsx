import * as React from "react"
import type { Metadata } from "next"
import PlayersHeader from "@/components/players/PlayersHeader"
import PlayersTable from "@/components/players/PlayersTable"

export const metadata: Metadata = {
  title: "Manage Players | HGW Legend Vault",
  description: "Comprehensive management area for all athletes and legends in the HGW ecosystem. Filter, search, and update player profiles.",
  robots: {
    index: false,
    follow: false,
  },
}

const PlayersPage = () => {
  return (
    <div className="flex flex-col animate-in fade-in duration-500">
      <PlayersHeader />
      
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
        <PlayersTable />
      </div>
    </div>
  )
}

export default PlayersPage