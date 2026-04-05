import Link from 'next/link'
import { getMetafieldValue } from '@/lib/cosmic'
import type { ProductCategory } from '@/types'

interface CategoryCardProps {
  category: ProductCategory;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)
  const categoryImage = category.metadata?.category_image

  return (
    <Link href={`/categories/${category.slug}`} className="card group block relative overflow-hidden">
      <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
        {categoryImage?.imgix_url ? (
          <img
            src={`${categoryImage.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={name}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy-100 to-navy-200">
            <svg className="w-16 h-16 text-navy-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
            {name}
          </h3>
          {description && (
            <p className="text-sm text-navy-200 mt-1 line-clamp-2">
              {description}
            </p>
          )}
          <div className="flex items-center gap-1 mt-2 text-amber-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Browse products
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}