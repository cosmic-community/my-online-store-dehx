// app/products/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import StarRating from '@/components/StarRating'
import ReviewCard from '@/components/ReviewCard'
import ProductCard from '@/components/ProductCard'
import { getProductBySlug, getProducts, getReviewsByProduct, getMetafieldValue } from '@/lib/cosmic'

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return { title: 'Product Not Found | My Online Store' }
  }

  const name = getMetafieldValue(product.metadata?.product_name) || product.title

  return {
    title: `${name} | My Online Store`,
    description: getMetafieldValue(product.metadata?.description) || `Check out ${name} at My Online Store.`,
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const name = getMetafieldValue(product.metadata?.product_name) || product.title
  const description = getMetafieldValue(product.metadata?.description)
  const price = product.metadata?.price
  const salePrice = product.metadata?.sale_price
  const inventoryStatus = getMetafieldValue(product.metadata?.inventory_status)
  const sku = getMetafieldValue(product.metadata?.sku)
  const featuredImage = product.metadata?.featured_image
  const gallery = product.metadata?.gallery
  const category = product.metadata?.category
  const hasSale = salePrice && price && salePrice < price

  // Fetch reviews for this product
  let reviews = await getReviewsByProduct(product.id).catch(() => [])

  // Fetch related products
  const allProducts = await getProducts()
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  // Calculate average rating
  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + (r.metadata?.rating || 0), 0) / reviews.length
    : 0

  function getStatusStyle(status: string) {
    switch (status.toLowerCase()) {
      case 'in stock':
        return 'badge-success'
      case 'low stock':
        return 'badge-warning'
      case 'out of stock':
        return 'badge-danger'
      case 'pre-order':
        return 'badge-info'
      default:
        return 'badge-success'
    }
  }

  return (
    <>
      {/* Breadcrumbs */}
      <section className="bg-navy-50 py-4">
        <div className="container-wide">
          <nav className="flex items-center gap-2 text-sm text-navy-400">
            <Link href="/" className="hover:text-navy-700 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-navy-700 transition-colors">Products</Link>
            {category?.title && (
              <>
                <span>/</span>
                <Link href={`/categories/${category.slug}`} className="hover:text-navy-700 transition-colors">
                  {category.title}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-navy-700 font-medium">{name}</span>
          </nav>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Images */}
            <div>
              <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden">
                {featuredImage?.imgix_url ? (
                  <img
                    src={`${featuredImage.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
                    alt={name}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-24 h-24 text-navy-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Gallery */}
              {gallery && gallery.length > 0 && (
                <div className="grid grid-cols-4 gap-3 mt-4">
                  {gallery.map((img, index) => (
                    <div key={index} className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
                      <img
                        src={`${img.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
                        alt={`${name} gallery ${index + 1}`}
                        width={150}
                        height={150}
                        className="w-full h-full object-cover hover:opacity-80 transition-opacity cursor-pointer"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              {/* Category */}
              {category?.title && (
                <Link
                  href={`/categories/${category.slug}`}
                  className="text-sm font-semibold text-amber-600 uppercase tracking-wider hover:text-amber-700 transition-colors"
                >
                  {category.title}
                </Link>
              )}

              <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mt-2">
                {name}
              </h1>

              {/* Ratings */}
              {reviews.length > 0 && (
                <div className="flex items-center gap-3 mt-3">
                  <StarRating rating={Math.round(avgRating)} size="md" showValue />
                  <span className="text-sm text-navy-500">
                    ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-center gap-3 mt-6">
                {hasSale ? (
                  <>
                    <span className="text-3xl font-bold text-red-600">
                      ${salePrice.toFixed(2)}
                    </span>
                    <span className="text-xl text-navy-400 line-through">
                      ${price.toFixed(2)}
                    </span>
                    <span className="badge bg-red-100 text-red-700">
                      {Math.round(((price - salePrice) / price) * 100)}% OFF
                    </span>
                  </>
                ) : price ? (
                  <span className="text-3xl font-bold text-navy-900">
                    ${price.toFixed(2)}
                  </span>
                ) : (
                  <span className="text-lg text-navy-400">Price not available</span>
                )}
              </div>

              {/* Status & SKU */}
              <div className="flex flex-wrap items-center gap-3 mt-5">
                {inventoryStatus && (
                  <span className={getStatusStyle(inventoryStatus)}>
                    {inventoryStatus}
                  </span>
                )}
                {sku && (
                  <span className="text-sm text-navy-400">
                    SKU: {sku}
                  </span>
                )}
              </div>

              {/* Divider */}
              <hr className="my-6 border-gray-200" />

              {/* Description */}
              {description && (
                <div>
                  <h2 className="text-lg font-semibold text-navy-900 mb-3">Description</h2>
                  <p className="text-navy-600 leading-relaxed">
                    {description}
                  </p>
                </div>
              )}

              {/* Content (rich text) */}
              {product.content && (
                <div className="mt-6">
                  <div
                    className="prose prose-navy max-w-none text-navy-600"
                    dangerouslySetInnerHTML={{ __html: product.content }}
                  />
                </div>
              )}

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3 bg-navy-50 rounded-lg p-3">
                  <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-navy-700 font-medium">Quality Assured</span>
                </div>
                <div className="flex items-center gap-3 bg-navy-50 rounded-lg p-3">
                  <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span className="text-sm text-navy-700 font-medium">Fast Shipping</span>
                </div>
                <div className="flex items-center gap-3 bg-navy-50 rounded-lg p-3">
                  <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-sm text-navy-700 font-medium">Secure Purchase</span>
                </div>
                <div className="flex items-center gap-3 bg-navy-50 rounded-lg p-3">
                  <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="text-sm text-navy-700 font-medium">Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container-wide">
            <h2 className="section-heading mb-8">
              Customer Reviews ({reviews.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} showProduct={false} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="container-wide">
            <h2 className="section-heading mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}