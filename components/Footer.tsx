import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-navy-900 text-white">
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <span className="text-xl font-bold">My Online Store</span>
            </Link>
            <p className="text-navy-300 max-w-sm leading-relaxed">
              Discover quality products curated just for you. Your satisfaction is our top priority.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/products" className="text-navy-300 hover:text-amber-400 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-navy-300 hover:text-amber-400 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-navy-300 hover:text-amber-400 transition-colors">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2.5 text-navy-300">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                hello@myonlinestore.com
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Worldwide Shipping
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-800 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-navy-400 text-sm">
            © {currentYear} My Online Store. All rights reserved.
          </p>
          <p className="text-navy-400 text-sm">
            Powered by{' '}
            <a href="https://www.cosmicjs.com" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 transition-colors">
              Cosmic
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}