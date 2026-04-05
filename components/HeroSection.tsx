import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative bg-navy-950 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Gradient Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-500/10 to-transparent" />

      <div className="container-wide relative py-20 md:py-32 lg:py-40">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-400 text-sm font-medium">New arrivals available</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Discover Products
            <span className="block text-amber-400">You&apos;ll Love</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-navy-300 mt-6 leading-relaxed max-w-xl">
            Browse our carefully curated collection of quality products.
            From everyday essentials to special finds — we&apos;ve got you covered.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/products" className="btn-primary text-center">
              Shop Now
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/categories" className="btn-outline border-white/20 text-white hover:bg-white/10 hover:border-white/30 text-center">
              Browse Categories
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-12">
            <div>
              <p className="text-2xl font-bold text-white">100+</p>
              <p className="text-sm text-navy-400">Products</p>
            </div>
            <div className="w-px bg-navy-700" />
            <div>
              <p className="text-2xl font-bold text-white">4.8</p>
              <p className="text-sm text-navy-400">Avg. Rating</p>
            </div>
            <div className="w-px bg-navy-700" />
            <div>
              <p className="text-2xl font-bold text-white">Fast</p>
              <p className="text-sm text-navy-400">Shipping</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}