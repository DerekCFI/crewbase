const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function checkReviews() {
  console.log('Checking reviews in database...\n');
  
  // Get all reviews
  const allReviews = await sql`SELECT id, category, airport_code, location_name, created_at FROM reviews ORDER BY created_at DESC LIMIT 10`;
  
  console.log(`Total reviews found: ${allReviews.length}\n`);
  
  if (allReviews.length > 0) {
    console.log('Most recent reviews:');
    allReviews.forEach(review => {
      console.log(`- ID: ${review.id}, Category: ${review.category}, Airport: ${review.airport_code}, Location: ${review.location_name}, Created: ${review.created_at}`);
    });
  } else {
    console.log('No reviews found in database.');
  }
}

checkReviews().catch(console.error);
