import { list } from '@vercel/blob'

export const revalidate = 0 // Don't cache this page

export default async function HotelsPage() {
  let hotels = []
  
  try {
    // Get hotels from Blob storage
    const { blobs } = await list()
    const hotelsBlob = blobs.find(b => b.pathname === 'hotels.json')
    
    if (hotelsBlob) {
      const response = await fetch(hotelsBlob.url)
      hotels = await response.json()
    }
  } catch (error) {
    console.error('Error loading hotels:', error)
  }
  
  // Show sample data if no hotels yet
  if (hotels.length === 0) {
    hotels = [
      {
        id: '1',
        name: 'Hilton Garden Inn - Airport',
        city: 'Dallas',
        state: 'TX',
        rating: 4.5,
        has24HourCheckin: true,
        hasBlackoutCurtains: true,
        noiseLevel: 'Quiet'
      }
    ]
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">Hotels</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-2">{hotel.name}</h2>
              <p className="text-gray-600 mb-4">{hotel.city}, {hotel.state}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Rating:</span>
                  <span className="font-semibold">{hotel.rating}/5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>24hr Check-in:</span>
                  <span>{hotel.has24HourCheckin ? '✓' : '✗'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Blackout Curtains:</span>
                  <span>{hotel.hasBlackoutCurtains ? '✓' : '✗'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Noise Level:</span>
                  <span>{hotel.noiseLevel}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
