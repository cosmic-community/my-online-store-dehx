import type { Metadata } from 'next'
import Link from 'next/link'
import ReviewCard from '@/components/ReviewCard'
import StarRating from '@/components/StarRating'
import { getReviews } from '@/lib/cosmic'

export const metadata: Metadata = {
  title: 'Customer Reviews | My Online Store',
  description: 'Read authentic customer reviews at My Online Store.',
}

export const revalidate = 60

export default async function ReviewsPage() {
  const reviews = await getReviews()

  // Calculate stats
  const totalReviews = reviews.length
  const avgRating = totalReviews > 0
    ? reviews.reduce((sum, r) => sum + (r.metadata?.rating || 0), 0) / totalReviews
    : 0

  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => (r.metadata?.rating || 0) === stars).length
    return { stars, count, percentage: totalReviews > 0 ? (count / totalReviews) * 100 : 0 }
  })

  return (
    <>
      {/* Header */}
      <section className="bg-navy-950 py-16 md:py-20">
        <div className="container-wide">
          <nav className="flex items-center gap-2 text-sm text-navy-400 mb-4">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Reviews</span>
          </nav>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Customer Reviews
          </h1>
          <p className="text-navy-300 text-lg mt-3">
            Hear from our satisfied customers
          </p>
        </div>
      </section>

      {/* Stats */}
      {totalReviews > 0 && (
        <section className="bg-white border-b border-gray-100 py-8">
          <div className="container-wide">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Overall Rating */}
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-5xl font-bold text-navy-900">{avgRating.toFixed(1)}</p>
                  <StarRating rating={Math.round(avgRating)} size="md" />
                  <p className="text-sm text-navy-500 mt-1">
                    {totalReviews} review{totalReviews !== 1 ? 's' : ''}
                  </p>
                </div>

                {/* Distribution */}
                <div className="flex-1 space-y-2">
                  {ratingDistribution.map(({ stars, count, percentage }) => (
                    <div key={stars} className="flex items-center gap-2">
                      <span className="text-sm text-navy-600 w-6 text-right">{stars}</span>
                      <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.62L10 0 7.19 6.62 0 7.24l5.46 4.73L3.82 19z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-navy-500 w-8">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Reviews Grid */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container-wide">
          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <svg className="w-16 h-16 text-navy-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h2 className="text-xl font-bold text-navy-900 mb-2">No Reviews Yet</h2>
              <p className="text-navy-500">Customer reviews will appear here once added to your Cosmic dashboard.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}