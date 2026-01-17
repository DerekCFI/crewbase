import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);

const total = await sql`SELECT COUNT(*) as count FROM airports`;
const byType = await sql`
  SELECT type, COUNT(*) as count 
  FROM airports 
  GROUP BY type 
  ORDER BY count DESC
`;

const largeSample = await sql`
  SELECT icao_code, iata_code, name, city, state 
  FROM airports 
  WHERE type = 'large_airport'
  ORDER BY name
  LIMIT 10
`;

console.log(`\nTotal imported: ${total[0].count}`);
console.log('\nBreakdown by type:');
byType.forEach(t => console.log(`  ${t.type}: ${t.count}`));
console.log('\nSample large airports:');
largeSample.forEach(a => console.log(`  ${a.icao_code || 'N/A'} / ${a.iata_code || 'N/A'} - ${a.name}, ${a.city}, ${a.state}`));
