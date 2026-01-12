import { neon } from '@neondatabase/serverless';

// Get DATABASE_URL from environment
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('DATABASE_URL not found in environment variables');
  console.log('Run: export DATABASE_URL="your_neon_connection_string"');
  process.exit(1);
}

const sql = neon(databaseUrl);

async function checkReviews() {
  console.log('Checking reviews in database...\n');
  
  try {
    const allReviews = await sql`SELECT id, category, airport_code, location_name, created_at FROM reviews ORDER BY created_at DESC LIMIT 10`;
    
    console.log(`Total reviews found: ${allReviews.length}\n`);
    
    if (allReviews.length > 0) {
      console.log('Most recent reviews:');
      allReviews.forEach(review => {
        console.log(`- ID: ${review.id}, Category: ${review.category}, Airport: ${review.airport_code}, Location: ${review.location_name}, Created: ${new Date(review.created_at).toLocaleString()}`);
      });
    } else {
      console.log('No reviews found in database.');
    }
  } catch (error) {
    console.error('Database error:', error);
  }
}

checkReviews();
