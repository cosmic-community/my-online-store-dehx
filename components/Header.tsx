import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
      <div className="container-wide">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center shadow-sm group-hover:bg-amber-600 transition-colors">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-navy-900">My Online Store</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-navy-600 hover:text-navy-900 font-medium transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-navy-600 hover:text-navy-900 font-medium transition-colors">
              Products
            </Link>
            <Link href="/categories" className="text-navy-600 hover:text-navy-900 font-medium transition-colors">
              Categories
            </Link>
            <Link href="/reviews" className="text-navy-600 hover:text-navy-900 font-medium transition-colors">
              Reviews
            </Link>
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}

function MobileNav() {
  return (
    <div className="relative group">
      <button className="p-2 text-navy-600 hover:text-navy-900 transition-colors" aria-label="Open menu">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-50">
        <div className="py-2">
          <Link href="/" className="block px-4 py-2.5 text-navy-600 hover:bg-navy-50 hover:text-navy-900 font-medium transition-colors">
            Home
          </Link>
          <Link href="/products" className="block px-4 py-2.5 text-navy-600 hover:bg-navy-50 hover:text-navy-900 font-medium transition-colors">
            Products
          </Link>
          <Link href="/categories" className="block px-4 py-2.5 text-navy-600 hover:bg-navy-50 hover:text-navy-900 font-medium transition-colors">
            Categories
          </Link>
          <Link href="/reviews" className="block px-4 py-2.5 text-navy-600 hover:bg-navy-50 hover:text-navy-900 font-medium transition-colors">
            Reviews
          </Link>
        </div>
      </div>
    </div>
  )
}