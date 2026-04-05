import Link from 'next/link'
import { getMetafieldValue } from '@/lib/cosmic'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const name = getMetafieldValue(product.metadata?.product_name) || product.title
  const description = getMetafieldValue(product.metadata?.description)
  const price = product.metadata?.price
  const salePrice = product.metadata?.sale_price
  const inventoryStatus = getMetafieldValue(product.metadata?.inventory_status)
  const featuredImage = product.metadata?.featured_image
  const category = product.metadata?.category

  const hasSale = salePrice && price && salePrice < price

  function getStatusBadge(status: string) {
    switch (status.toLowerCase()) {
      case 'in stock':
        return <span className="badge-success">In Stock</span>
      case 'low stock':
        return <span className="badge-warning">Low Stock</span>
      case 'out of stock':
        return <span className="badge-danger">Out of Stock</span>
      case 'pre-order':
        return <span className="badge-info">Pre-order</span>
      default:
        return status ? <span className="badge-success">{status}</span> : null
    }
  }

  return (
    <Link href={`/products/${product.slug}`} className="card group block">
      {/* Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        {featuredImage?.imgix_url ? (
          <img
            src={`${featuredImage.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
            alt={name}
            width={300}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-navy-50">
            <svg className="w-16 h-16 text-navy-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Sale Badge */}
        {hasSale && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
            SALE
          </div>
        )}

        {/* Status Badge */}
        {inventoryStatus && (
          <div className="absolute top-3 right-3">
            {getStatusBadge(inventoryStatus)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        {/* Category */}
        {category?.title && (
          <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1.5">
            {category.title}
          </p>
        )}

        {/* Name */}
        <h3 className="text-lg font-bold text-navy-900 group-hover:text-amber-600 transition-colors line-clamp-1">
          {name}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-navy-500 mt-1.5 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}

        {/* Pricing */}
        <div className="flex items-center gap-2 mt-3">
          {hasSale ? (
            <>
              <span className="text-xl font-bold text-red-600">
                ${salePrice.toFixed(2)}
              </span>
              <span className="text-sm text-navy-400 line-through">
                ${price.toFixed(2)}
              </span>
            </>
          ) : price ? (
            <span className="text-xl font-bold text-navy-900">
              ${price.toFixed(2)}
            </span>
          ) : (
            <span className="text-sm text-navy-400">Price not available</span>
          )}
        </div>
      </div>
    </Link>
  )
}