'use client'

interface FiltersProps {
  onFilterChange: (filters: FilterValues) => void
}

export interface FilterValues {
  state?: string
  sortBy?: string
}

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
]

export default function Filters({ onFilterChange }: FiltersProps) {
  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ state: e.target.value || undefined })
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ sortBy: e.target.value || undefined })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* State Filter */}
        <div>
          <label htmlFor="state-filter" className="block text-sm font-semibold text-gray-700 mb-2">
            Filter by State
          </label>
          <select
            id="state-filter"
            onChange={handleStateChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          >
            <option value="">All States</option>
            {US_STATES.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
        <div>
          <label htmlFor="sort-filter" className="block text-sm font-semibold text-gray-700 mb-2">
            Sort By
          </label>
          <select
            id="sort-filter"
            onChange={handleSortChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          >
            <option value="recent">Most Recent</option>
            <option value="rating">Highest Rated</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  )
}
