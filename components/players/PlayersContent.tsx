"use client"

import React, { useState, useMemo, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/store/store"
import { fetchPlayers } from "@/store/slices/playerSlice"
import PlayersHeader from "./PlayersHeader"
import PlayersTable from "./PlayersTable"

const PlayersContent = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { players, loading } = useSelector((state: RootState) => state.players)
    
    const [searchQuery, setSearchQuery] = useState("")
    const [category, setCategory] = useState("All Categories")
    const [country, setCountry] = useState("All Countries")
    const [status, setStatus] = useState("All Status")

    // Fetch players via Redux
    useEffect(() => {
        dispatch(fetchPlayers())
    }, [dispatch])

    // Dynamically derive filter options from the data
    const categories = useMemo(() => ["All Categories", ...new Set(players.map(p => p.category?.name || "Uncategorized"))], [players]);
    const countries = useMemo(() => ["All Countries", ...new Set(players.map(p => p.country))], [players]);
    const statuses = ["All Status", "PUBLISHED", "DRAFT"]

    // Combined filter logic
    const filteredPlayers = useMemo(() => {
        return players.filter(player => {
            const matchesSearch = !searchQuery || 
                player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (player.category?.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                player.country.toLowerCase().includes(searchQuery.toLowerCase())

            const matchesCategory = category === "All Categories" || player.category?.name === category
            const matchesCountry = country === "All Countries" || player.country === country
            const matchesStatus = status === "All Status" || player.status === status

            return matchesSearch && matchesCategory && matchesCountry && matchesStatus
        })
    }, [players, searchQuery, category, country, status])

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
                <PlayersTable data={filteredPlayers} isLoading={loading} />
            </div>
        </div>
    )
}

export default PlayersContent
