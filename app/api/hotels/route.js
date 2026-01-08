import { NextResponse } from 'next/server'

// Sample data - later we'll store this in Blob
const sampleHotels = [
  {
    id: '1',
    name: 'Hilton Garden Inn - Airport',
    city: 'Dallas',
    state: 'TX',
    rating: 4.5,
    crewFriendly: true,
    has24HourCheckin: true,
    hasBlackoutCurtains: true,
    noiseLevel: 'Quiet'
  },
  {
    id: '2',
    name: 'Courtyard Marriott',
    city: 'Phoenix',
    state: 'AZ',
    rating: 4.0,
    crewFriendly: true,
    has24HourCheckin: false,
    hasBlackoutCurtains: true,
    noiseLevel: 'Moderate'
  }
]

export async function GET() {
  return NextResponse.json(sampleHotels)
}
