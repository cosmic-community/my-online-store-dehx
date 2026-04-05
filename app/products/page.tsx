import type { Metadata } from 'next'
import ProductCard from '@/components/ProductCard'
import { getProducts, getCategories } from '@/lib/cosmic'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'All Products | My Online Store',
  description: 'Browse our complete collection of quality products.',
}

export const revalidate = 60

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ])

  return (
    <>
      {/* Header */}
      <section className="bg-navy-950 py-16 md:py-20">
        <div className="container-wide">
          <nav className="flex items-center gap-2 text-sm text-navy-400 mb-4">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Products</span>
          </nav>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            All Products
          </h1>
          <p className="text-navy-300 text-lg mt-3">
            {products.length} product{products.length !== 1 ? 's' : ''} available
          </p>
        </div>
      </section>

      {/* Category Filter */}
      {categories.length > 0 && (
        <section className="bg-white border-b border-gray-100 py-4 sticky top-16 md:top-20 z-30 backdrop-blur-sm bg-white/95">
          <div className="container-wide">
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              <span className="text-sm font-medium text-navy-500 flex-shrink-0">Filter:</span>
              <Link
                href="/products"
                className="badge bg-navy-900 text-white flex-shrink-0"
              >
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="badge bg-navy-100 text-navy-700 hover:bg-navy-200 transition-colors flex-shrink-0"
                >
                  {cat.metadata?.name || cat.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Grid */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container-wide">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <svg className="w-16 h-16 text-navy-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h2 className="text-xl font-bold text-navy-900 mb-2">No Products Yet</h2>
              <p className="text-navy-500">Products will appear here once added to your Cosmic dashboard.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}