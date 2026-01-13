import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    
    if (!category) {
      return NextResponse.json(
        { error: 'Category is required' },
        { status: 400 }
      )
    }

    const sql = neon(process.env.DATABASE_URL!)
    
    // Get business aggregate info
    const businessResult = await sql`
      SELECT 
        business_slug,
        location_name,
        address,
        phone,
        latitude,
        longitude,
        airport_code,
        COUNT(*) as review_count,
        ROUND(AVG(overall_rating)::numeric, 1) as avg_rating
      FROM reviews
      WHERE business_slug = ${slug}
      AND category = ${category}
      GROUP BY business_slug, location_name, address, phone, latitude, longitude, airport_code
      LIMIT 1
    `

    if (businessResult.length === 0) {
      return NextResponse.json(
        { error: 'Business not found' },
        { status: 404 }
      )
    }

    // Get all reviews for this business
    const reviews = await sql`
      SELECT 
        id,
        overall_rating,
        review_text,
        would_recommend,
        created_at,
        visit_date
      FROM reviews
      WHERE business_slug = ${slug}
      AND category = ${category}
      ORDER BY created_at DESC
    `

    return NextResponse.json({
      business: businessResult[0],
      reviews: reviews
    })
  } catch (error) {
    console.error('Error fetching business:', error)
    return NextResponse.json(
      { error: 'Failed to fetch business' },
      { status: 500 }
    )
  }
}
