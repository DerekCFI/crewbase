import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

interface Airport {
  iata: string
  icao: string
  name: string
  city: string
  state: string
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.toLowerCase().trim()

  if (!query || query.length < 2) {
    return NextResponse.json({ airports: [] })
  }

  try {
    // Read airports data
    const filePath = path.join(process.cwd(), 'public/data/airports.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const airports: Airport[] = JSON.parse(fileContents)

    // Search airports by IATA, ICAO, city, or airport name
    const results = airports.filter(airport => 
      airport.iata.toLowerCase().includes(query) ||
      airport.icao.toLowerCase().includes(query) ||
      airport.city.toLowerCase().includes(query) ||
      airport.name.toLowerCase().includes(query)
    )

    // Limit to top 10 results
    return NextResponse.json({ airports: results.slice(0, 10) })
  } catch (error) {
    console.error('Airport search error:', error)
    return NextResponse.json({ airports: [], error: 'Search failed' }, { status: 500 })
  }
}
