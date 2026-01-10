'use client'

import { useState } from 'react'
import Filters, { FilterValues } from '../components/Filters'

export default function RestaurantsPage() {
  const [filters, setFilters] = useState<FilterValues>({})

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Restaurants</h1>
        <p className="text-gray-600 mb-6">Discover great restaurants near airports</p>

        <Filters onFilterChange={handleFilterChange} />

        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600">
            {filters.state && `Filtering by ${filters.state} • `}
            {filters.sortBy && `Sorted by ${filters.sortBy}`}
            {!filters.state && !filters.sortBy && 'No filters applied'}
          </p>
          <p className="text-gray-500 mt-4">No restaurants listed yet. Be the first to add one!</p>
        </div>
      </div>
    </div>
  )
}
