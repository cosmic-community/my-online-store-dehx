import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-8xl font-bold text-navy-100 mb-4">404</div>
        <h1 className="text-2xl font-bold text-navy-900 mb-2">Page Not Found</h1>
        <p className="text-navy-500 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  )
}