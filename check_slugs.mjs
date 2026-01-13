import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);
const reviews = await sql`SELECT id, location_name, business_slug FROM reviews`;
console.log('Business slugs:');
reviews.forEach(r => console.log(`${r.location_name} → ${r.business_slug}`));
