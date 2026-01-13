import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    
    if (!category) {
      return NextResponse.json(
        { error: 'Category is required' },
        { status: 400 }
      )
    }

    const sql = neon(process.env.DATABASE_URL!)
    
    // Get aggregated business data
    const businesses = await sql`
      SELECT 
        business_slug,
        location_name,
        address,
        latitude,
        longitude,
        airport_code,
        COUNT(*) as review_count,
        ROUND(AVG(overall_rating)::numeric, 1) as avg_rating,
        MAX(created_at) as latest_review_date,
        BOOL_OR(would_recommend) as has_recommendations
      FROM reviews
      WHERE category = ${category}
      GROUP BY business_slug, location_name, address, latitude, longitude, airport_code
      ORDER BY latest_review_date DESC
    `

    // For each business, get 2 most recent review snippets
    const businessesWithReviews = await Promise.all(
      businesses.map(async (business) => {
        const recentReviews = await sql`
          SELECT id, review_text, overall_rating, would_recommend, created_at
          FROM reviews
          WHERE business_slug = ${business.business_slug}
          AND category = ${category}
          ORDER BY created_at DESC
          LIMIT 2
        `
        
        return {
          ...business,
          recent_reviews: recentReviews
        }
      })
    )

    return NextResponse.json({ businesses: businessesWithReviews })
  } catch (error) {
    console.error('Error fetching businesses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch businesses' },
      { status: 500 }
    )
  }
}
