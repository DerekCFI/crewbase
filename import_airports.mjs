import { neon } from '@neondatabase/serverless';
import fs from 'fs';

const sql = neon(process.env.DATABASE_URL);

// Read the CSV file
const csvData = fs.readFileSync('us-airports-full-copy.csv', 'utf-8');
const lines = csvData.split('\n');

// Skip header row
const dataRows = lines.slice(1).filter(line => line.trim());

console.log(`Found ${dataRows.length} airports to import`);

// Determine delimiter (comma or tab)
const delimiter = lines[0].includes('\t') ? '\t' : ',';
console.log(`Using delimiter: ${delimiter === '\t' ? 'TAB' : 'COMMA'}`);

let imported = 0;
let skipped = 0;

for (const line of dataRows) {
  const cols = line.split(delimiter);
  
  // Extract state abbreviation from iso_region (e.g., "US-CA" -> "CA")
  const isoRegion = cols[11]?.trim() || '';
  const state = isoRegion.includes('-') ? isoRegion.split('-')[1] : null;
  
  const airport = {
    icao_code: cols[16]?.trim() || null,
    iata_code: cols[17]?.trim() || null,
    name: cols[3]?.trim() || null,
    city: cols[13]?.trim() || null,
    state: state,
    latitude: parseFloat(cols[4]) || null,
    longitude: parseFloat(cols[5]) || null,
    type: cols[2]?.trim() || null
  };
  
  // Skip if missing critical data
  if (!airport.name || (!airport.icao_code && !airport.iata_code)) {
    skipped++;
    continue;
  }
  
  try {
    await sql`
      INSERT INTO airports (
        icao_code, iata_code, name, city, state, 
        latitude, longitude, type
      ) VALUES (
        ${airport.icao_code}, ${airport.iata_code}, ${airport.name},
        ${airport.city}, ${airport.state}, ${airport.latitude},
        ${airport.longitude}, ${airport.type}
      )
    `;
    imported++;
    
    if (imported % 100 === 0) {
      console.log(`Imported ${imported} airports...`);
    }
  } catch (error) {
    console.error(`Error importing ${airport.icao_code || airport.iata_code}:`, error.message);
    skipped++;
  }
}

console.log(`\n✅ Import complete!`);
console.log(`   Imported: ${imported}`);
console.log(`   Skipped: ${skipped}`);
