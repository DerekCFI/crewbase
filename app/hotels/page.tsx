'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Filters, { FilterValues } from '../components/Filters'

interface Review {
  id: number
  location_name: string
  address: string
  airport_code: string
  overall_rating: number
  review_text: string
  created_at: string
  would_recommend: boolean
  crew_recognition: boolean
  shuttle_service: boolean
  fitness_center: boolean
  breakfast: string
  wifi_quality: number
}

export default function HotelsPage() {
  const [filters, setFilters] = useState<FilterValues>({})
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews?category=hotels')
      if (!response.ok) throw new Error('Failed to fetch reviews')
      const data = await response.json()
      setReviews(data.reviews || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Hotels</h1>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            <span className="ml-3 text-gray-600">Loading hotels...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Hotels</h1>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error loading reviews: {error}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Hotels</h1>
            <p className="text-gray-600">Find crew-friendly hotels with the amenities you need</p>
          </div>
          <Link
            href="/add"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Add Review
          </Link>
        </div>

        <Filters onFilterChange={handleFilterChange} />

        {reviews.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500">No hotels listed yet. Be the first to add one!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      {review.location_name}
                    </h2>
                    <p className="text-gray-600 text-sm mb-2">{review.address}</p>
                    <p className="text-blue-600 font-semibold">Airport: {review.airport_code}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 mb-2">
                      {renderStars(review.overall_rating)}
                    </div>
                    {review.would_recommend && (
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                        ✓ Recommended
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-gray-700 mb-4 line-clamp-3">{review.review_text}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {review.crew_recognition && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      Crew Rates
                    </span>
                  )}
                  {review.shuttle_service && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      Shuttle Service
                    </span>
                  )}
                  {review.fitness_center && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      Fitness Center
                    </span>
                  )}
                  {review.breakfast && review.breakfast !== 'not-available' && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      Breakfast
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Reviewed {new Date(review.created_at).toLocaleDateString()}</span>
                  <Link
                    href={`/hotels/${review.id}`}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    View Full Review →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
