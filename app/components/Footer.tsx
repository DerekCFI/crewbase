import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">CrewBase</h3>
            <p className="text-gray-400 text-sm">
              Your crew's guide to the best travel services at airports across the United States.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/hotels" className="text-gray-400 hover:text-white transition-colors">
                  Hotels
                </Link>
              </li>
              <li>
                <Link href="/fbos" className="text-gray-400 hover:text-white transition-colors">
                  FBOs
                </Link>
              </li>
              <li>
                <Link href="/rentals" className="text-gray-400 hover:text-white transition-colors">
                  Car Rentals
                </Link>
              </li>
              <li>
                <Link href="/restaurants" className="text-gray-400 hover:text-white transition-colors">
                  Restaurants
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/add" className="text-gray-400 hover:text-white transition-colors">
                  Add Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold mb-4">Built for Crews</h4>
            <p className="text-gray-400 text-sm">
              Created by flight crew professionals who understand your unique travel needs.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} CrewBase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
