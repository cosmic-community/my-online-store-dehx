import Link from 'next/link'
import StarRating from '@/components/StarRating'
import { getMetafieldValue } from '@/lib/cosmic'
import type { Review } from '@/types'

interface ReviewCardProps {
  review: Review;
  showProduct?: boolean;
}

export default function ReviewCard({ review, showProduct = true }: ReviewCardProps) {
  const reviewerName = getMetafieldValue(review.metadata?.reviewer_name)
  const rating = review.metadata?.rating || 0
  const reviewText = getMetafieldValue(review.metadata?.review_text)
  const product = review.metadata?.product

  return (
    <div className="card p-5 md:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-amber-700 font-bold text-sm">
              {reviewerName ? reviewerName.charAt(0).toUpperCase() : '?'}
            </span>
          </div>
          <div>
            <p className="font-semibold text-navy-900">
              {reviewerName || 'Anonymous'}
            </p>
            <StarRating rating={rating} size="sm" />
          </div>
        </div>
      </div>

      {/* Review Text */}
      {reviewText && (
        <p className="text-navy-600 mt-4 leading-relaxed text-sm">
          &ldquo;{reviewText}&rdquo;
        </p>
      )}

      {/* Product Reference */}
      {showProduct && product?.slug && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-2 text-sm text-amber-600 hover:text-amber-700 font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {getMetafieldValue(product.metadata?.product_name) || product.title}
          </Link>
        </div>
      )}
    </div>
  )
}