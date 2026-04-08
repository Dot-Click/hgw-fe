import { Metadata } from 'next'
import CategoriesHeader from '@/components/categories/CategoriesHeader'
import CategoriesDetail from '@/components/categories/CategoriesDetail'

export const metadata: Metadata = {
  title: 'Categories Management | Legend Vault Admin',
  description: 'Manage and organize sport and legend categories.',
  robots: 'noindex, nofollow',
}

export default function CategoriesPage() {
  return (
    <main className="min-h-screen">
      <CategoriesHeader />
      <div className="mt-8">
        <CategoriesDetail />
      </div>
    </main>
  )
}
