'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddHotelPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    state: '',
    rating: 5,
    has24HourCheckin: false,
    hasBlackoutCurtains: false,
    noiseLevel: 'Quiet'
  })

  const handleSubmit = async (e) => {
  e.preventDefault()
  
  try {
    const response = await fetch('/api/hotels/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    
    if (response.ok) {
      alert('Hotel saved successfully!')
      router.push('/hotels')
    } else {
      alert('Error saving hotel')
    }
  } catch (error) {
    alert('Error: ' + error.message)
  }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">Add Hotel</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Hotel Name</label>
            <input
              type="text"
              required
              className="w-full border rounded p-2"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">City</label>
              <input
                type="text"
                required
                className="w-full border rounded p-2"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">State</label>
              <input
                type="text"
                required
                maxLength="2"
                className="w-full border rounded p-2"
                value={formData.state}
                onChange={(e) => setFormData({...formData, state: e.target.value.toUpperCase()})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Rating (1-5)</label>
            <input
              type="number"
              min="1"
              max="5"
              step="0.5"
              className="w-full border rounded p-2"
              value={formData.rating}
              onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})}
            />
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.has24HourCheckin}
                onChange={(e) => setFormData({...formData, has24HourCheckin: e.target.checked})}
              />
              <span>24-Hour Check-in Available</span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.hasBlackoutCurtains}
                onChange={(e) => setFormData({...formData, hasBlackoutCurtains: e.target.checked})}
              />
              <span>Blackout Curtains</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Noise Level</label>
            <select
              className="w-full border rounded p-2"
              value={formData.noiseLevel}
              onChange={(e) => setFormData({...formData, noiseLevel: e.target.value})}
            >
              <option>Quiet</option>
              <option>Moderate</option>
              <option>Loud</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded py-3 font-semibold hover:bg-blue-700"
          >
            Add Hotel
          </button>
        </form>
      </div>
    </main>
  )
}
