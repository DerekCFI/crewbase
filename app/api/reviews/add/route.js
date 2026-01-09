import { neon } from '@neondatabase/serverless'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const review = await request.json()
    
    const sql = neon(process.env.DATABASE_URL)
    
    // Insert the review into Postgres
    const result = await sql`
      INSERT INTO reviews (
        business_type,
        business_id,
        business_name,
        overall_rating,
        review_text,
        cleanliness_rating,
        staff_rating,
        value_rating,
        service_rating,
        facilities_rating,
        food_quality_rating,
        service_speed_rating,
        vehicle_quality_rating,
        customer_service_rating,
        created_at
      ) VALUES (
        ${review.businessType},
        ${review.businessId},
        ${review.businessName},
        ${review.overallRating},
        ${review.reviewText},
        ${review.cleanlinessRating || null},
        ${review.staffRating || null},
        ${review.valueRating || null},
        ${review.serviceRating || null},
        ${review.facilitiesRating || null},
        ${review.foodQualityRating || null},
        ${review.serviceSpeedRating || null},
        ${review.vehicleQualityRating || null},
        ${review.customerServiceRating || null},
        ${review.createdAt}
      )
      RETURNING id
    `
    
    return NextResponse.json({ 
      success: true, 
      review: { ...review, id: result[0].id }
    })
  } catch (error) {
    console.error('Error saving review:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
