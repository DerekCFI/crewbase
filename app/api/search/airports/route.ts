import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

interface Airport {
  iata_code: string
  icao_code: string
  name: string
  city: string
  state: string
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.toUpperCase().trim()

  if (!query || query.length < 2) {
    return NextResponse.json({ airports: [] })
  }

  try {
    const sql = neon(process.env.DATABASE_URL!)

    // Search by ICAO, IATA, city, or airport name
    // Handle both "DTW" (IATA) and "KDTW" (ICAO)
    const results = await sql`
      SELECT 
        iata_code as iata,
        icao_code as icao,
        name,
        city,
        state
      FROM airports
      WHERE 
        UPPER(icao_code) LIKE ${`%${query}%`} OR
        UPPER(iata_code) LIKE ${`%${query}%`} OR
        UPPER(city) LIKE ${`%${query}%`} OR
        UPPER(name) LIKE ${`%${query}%`}
      ORDER BY
        CASE
          WHEN UPPER(icao_code) = ${query} THEN 1
          WHEN UPPER(iata_code) = ${query} THEN 2
          WHEN UPPER(icao_code) LIKE ${`${query}%`} THEN 3
          WHEN UPPER(iata_code) LIKE ${`${query}%`} THEN 4
          ELSE 5
        END
      LIMIT 10
    `

    return NextResponse.json({ airports: results })
  } catch (error) {
    console.error('Airport search error:', error)
    return NextResponse.json({ airports: [], error: 'Search failed' }, { status: 500 })
  }
}
