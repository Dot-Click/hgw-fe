"use client"

import React, { useState, useMemo } from "react"
import PlayersHeader from "./PlayersHeader"
import PlayersTable from "./PlayersTable"

// Standard initial players data
const playersData = [
    { id: 1, name: "Michael Jordan", initials: "MJ", category: "Basketball", country: "USA", era: "1984-2003", score: "98.5", status: "published" },
    { id: 2, name: "Muhammad Ali", initials: "MA", category: "Boxing", country: "USA", era: "1960-1981", score: "97.8", status: "published" },
    { id: 3, name: "Lionel Messi", initials: "LM", category: "Football", country: "Argentina", era: "2004-Present", score: "97.2", status: "published" },
    { id: 4, name: "Cristiano Ronaldo", initials: "CR", category: "Football", country: "Portugal", era: "2002-Present", score: "96.8", status: "published" },
    { id: 5, name: "Wayne Gretzky", initials: "WG", category: "Hockey", country: "Canada", era: "1979-1999", score: "96.2", status: "draft" },
    { id: 6, name: "Roger Federer", initials: "RF", category: "Tennis", country: "Switzerland", era: "1998-2022", score: "95.9", status: "published" },
    { id: 7, name: "Usain Bolt", initials: "UB", category: "Athletics", country: "Jamaica", era: "2004-2017", score: "95.4", status: "published" },
    { id: 8, name: "Michael Phelps", initials: "MP", category: "Swimming", country: "USA", era: "2000-2016", score: "95.3", status: "draft" },
]

const PlayersContent = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [category, setCategory] = useState("All Categories")
    const [country, setCountry] = useState("All Countries")
    const [status, setStatus] = useState("All Status")

    // Dynamically derive filter options from the data
    const categories = ["All Categories", ...new Set(playersData.map(p => p.category))]
    const countries = ["All Countries", ...new Set(playersData.map(p => p.country))]
    const statuses = ["All Status", "published", "draft"]

    // Powerful combined filter logic
    const filteredPlayers = useMemo(() => {
        return playersData.filter(player => {
            const matchesSearch = !searchQuery || 
                player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                player.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                player.country.toLowerCase().includes(searchQuery.toLowerCase())

            const matchesCategory = category === "All Categories" || player.category === category
            const matchesCountry = country === "All Countries" || player.country === country
            const matchesStatus = status === "All Status" || player.status === status

            return matchesSearch && matchesCategory && matchesCountry && matchesStatus
        })
    }, [searchQuery, category, country, status])

    return (
        <div className="flex flex-col animate-in fade-in duration-500">
            <PlayersHeader 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery}
                selectedCategory={category}
                setSelectedCategory={setCategory}
                selectedCountry={country}
                setSelectedCountry={setCountry}
                selectedStatus={status}
                setSelectedStatus={setStatus}
                categoryOptions={categories}
                countryOptions={countries}
                statusOptions={statuses}
            />
            
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 mt-8">
                <PlayersTable data={filteredPlayers} />
            </div>
        </div>
    )
}

export default PlayersContent
