interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

export default function StarRating({ rating, size = 'md', showValue = false }: StarRatingProps) {
  const safeRating = Math.min(5, Math.max(0, rating || 0))

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          className={`${sizeClasses[size]} ${
            index < safeRating ? 'text-amber-400' : 'text-gray-200'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.62L10 0 7.19 6.62 0 7.24l5.46 4.73L3.82 19z"
            clipRule="evenodd"
          />
        </svg>
      ))}
      {showValue && (
        <span className={`${textSizes[size]} text-navy-500 ml-1 font-medium`}>
          {safeRating.toFixed(1)}
        </span>
      )}
    </div>
  )
}