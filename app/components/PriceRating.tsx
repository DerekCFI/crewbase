'use client'

import { useState } from 'react'

interface PriceRatingProps {
  value: number
  onChange: (value: number) => void
  label: string
}

export default function PriceRating({ value, onChange, label }: PriceRatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null)

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label} *
      </label>
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4].map((price) => (
          <button
            key={price}
            type="button"
            onClick={() => onChange(price)}
            onMouseEnter={() => setHoverValue(price)}
            onMouseLeave={() => setHoverValue(null)}
            className="focus:outline-none transition-colors"
          >
            <span
              className={`text-3xl font-bold ${
                hoverValue !== null && price <= hoverValue
                  ? 'text-[#93c5fd]'
                  : price <= value
                  ? 'text-[#3b82f6]'
                  : 'text-[#d1d5db]'
              }`}
            >
              $
            </span>
          </button>
        ))}
        <span className="ml-2 text-lg font-semibold text-gray-900">
          {'$'.repeat(value || 0)}
        </span>
      </div>
    </div>
  )
}
