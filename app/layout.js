import './globals.css'
import { Work_Sans } from 'next/font/google'
import Link from 'next/link'
import HeaderSearch from './components/HeaderSearch'
import MobileMenu from './components/MobileMenu'
import Footer from './components/Footer'

const workSans = Work_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-work-sans'
})

export const metadata = {
  title: 'CrewIntel',
  description: 'Your crew\'s guide to the best travel services',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`flex flex-col min-h-screen ${workSans.variable}`}>
        <nav className="bg-blue-600 text-white p-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold" style={{ fontFamily: 'var(--font-work-sans)' }}>
              CrewIntel
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <HeaderSearch />
              
              <Link href="/hotels" className="hover:underline">
                Hotels
              </Link>
              <Link href="/fbos" className="hover:underline">
                FBOs
              </Link>
              <Link href="/rentals" className="hover:underline">
                Car Rentals
              </Link>
              <Link href="/restaurants" className="hover:underline">
                Restaurants
              </Link>

              <Link href="/add" className="bg-white text-blue-600 px-4 py-2 rounded font-semibold hover:bg-gray-100">
                + Add Location
              </Link>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </nav>
        
        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
}
