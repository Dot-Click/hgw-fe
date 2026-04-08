import { AdminLeaderboardDetail } from '@/components/leaderboard/AdminLeaderboardDetail'
import LeaderboardTable from '@/components/leaderboard/LeaderboardTable'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Leaderboard Management | Legend Vault Admin',
    description: 'Manage and monitor the HGW Legend rankings and player statistics.',
    robots: 'noindex, nofollow',
}

export default function LeaderboardPage() {
    return (
        <main className="min-h-screen flex flex-col gap-8 pb-8 animate-in fade-in duration-500">

            {/* Page Title Section */}
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-[900] text-white orbitron tracking-widest">Leaderboard Management</h1>
                <p className="text-sm text-zinc-500 outfit">View and manage the HGW Legend rankings.</p>
            </div>


            <AdminLeaderboardDetail />

            {/* Table Section (Ready for implementation) */}
            <LeaderboardTable />
        </main>
    )
}