import type { Metadata } from 'next'
import Link from 'next/link'
import CategoryCard from '@/components/CategoryCard'
import { getCategories } from '@/lib/cosmic'

export const metadata: Metadata = {
  title: 'Categories | My Online Store',
  description: 'Browse product categories at My Online Store.',
}

export const revalidate = 60

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <>
      {/* Header */}
      <section className="bg-navy-950 py-16 md:py-20">
        <div className="container-wide">
          <nav className="flex items-center gap-2 text-sm text-navy-400 mb-4">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Categories</span>
          </nav>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Product Categories
          </h1>
          <p className="text-navy-300 text-lg mt-3">
            Browse our organized collection by category
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container-wide">
          {categories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <svg className="w-16 h-16 text-navy-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <h2 className="text-xl font-bold text-navy-900 mb-2">No Categories Yet</h2>
              <p className="text-navy-500">Categories will appear here once added to your Cosmic dashboard.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}