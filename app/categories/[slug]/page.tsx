// app/categories/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import { getCategoryBySlug, getProductsByCategory, getMetafieldValue } from '@/lib/cosmic'

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    return { title: 'Category Not Found | My Online Store' }
  }

  const name = getMetafieldValue(category.metadata?.name) || category.title

  return {
    title: `${name} | My Online Store`,
    description: getMetafieldValue(category.metadata?.description) || `Browse ${name} products at My Online Store.`,
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)
  const categoryImage = category.metadata?.category_image

  const products = await getProductsByCategory(category.id)

  return (
    <>
      {/* Header */}
      <section className="relative bg-navy-950 py-16 md:py-20 overflow-hidden">
        {/* Background Image */}
        {categoryImage?.imgix_url && (
          <div className="absolute inset-0 opacity-20">
            <img
              src={`${categoryImage.imgix_url}?w=1600&h=600&fit=crop&auto=format,compress`}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 to-navy-950/80" />

        <div className="container-wide relative">
          <nav className="flex items-center gap-2 text-sm text-navy-400 mb-4">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-amber-400 transition-colors">Categories</Link>
            <span>/</span>
            <span className="text-white">{name}</span>
          </nav>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            {name}
          </h1>

          {description && (
            <p className="text-navy-300 text-lg mt-3 max-w-2xl">
              {description}
            </p>
          )}

          <p className="text-navy-400 mt-4">
            {products.length} product{products.length !== 1 ? 's' : ''} in this category
          </p>
        </div>
      </section>

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
              <h2 className="text-xl font-bold text-navy-900 mb-2">No Products in This Category</h2>
              <p className="text-navy-500 mb-6">Products will appear here once added to this category.</p>
              <Link href="/products" className="btn-primary">
                Browse All Products
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}