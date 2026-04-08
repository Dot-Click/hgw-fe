import { Metadata } from 'next'
import { NewPlayerForm } from '@/components/players/NewPlayerForm'

export const metadata: Metadata = {
  title: 'Add New Player | Legend Vault Admin',
  description: 'Create and manage new legend entries in the HGW Legend Vault.',
  robots: 'noindex, nofollow', // Admin pages should generally not be indexed
}

export default function NewPlayerPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19]">
      <NewPlayerForm />
    </main>
  )
}
