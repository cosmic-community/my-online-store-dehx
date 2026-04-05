import Link from 'next/link'
import HeroSection from '@/components/HeroSection'
import ProductCard from '@/components/ProductCard'
import CategoryCard from '@/components/CategoryCard'
import ReviewCard from '@/components/ReviewCard'
import { getProducts, getCategories, getReviews } from '@/lib/cosmic'

export const revalidate = 60

export default async function HomePage() {
  const [products, categories, reviews] = await Promise.all([
    getProducts(),
    getCategories(),
    getReviews(),
  ])

  const featuredProducts = products.slice(0, 4)
  const recentReviews = reviews.slice(0, 3)

  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-wide">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="section-heading">Featured Products</h2>
              <p className="section-subheading">Our latest and greatest picks for you</p>
            </div>
            <Link href="/products" className="btn-outline text-sm">
              View All
              <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-navy-50 rounded-2xl">
              <svg className="w-12 h-12 text-navy-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <p className="text-navy-500 font-medium">No products yet. Add some in your Cosmic dashboard!</p>
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-16 md:py-24 bg-navy-50">
          <div className="container-wide">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
              <div>
                <h2 className="section-heading">Shop by Category</h2>
                <p className="section-subheading">Find exactly what you&apos;re looking for</p>
              </div>
              <Link href="/categories" className="btn-outline text-sm">
                All Categories
                <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews */}
      {recentReviews.length > 0 && (
        <section className="py-16 md:py-24 bg-white">
          <div className="container-wide">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
              <div>
                <h2 className="section-heading">Customer Reviews</h2>
                <p className="section-subheading">See what our customers are saying</p>
              </div>
              <Link href="/reviews" className="btn-outline text-sm">
                All Reviews
                <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 md:py-24 bg-navy-900">
        <div className="container-wide text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your Next Favorite?
          </h2>
          <p className="text-navy-300 text-lg max-w-xl mx-auto mb-8">
            Explore our full catalog and discover products that match your style.
          </p>
          <Link href="/products" className="btn-primary text-lg px-8 py-4">
            Browse All Products
          </Link>
        </div>
      </section>
    </>
  )
}