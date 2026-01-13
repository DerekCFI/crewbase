-- Add business_slug column
ALTER TABLE reviews ADD COLUMN business_slug VARCHAR(255);

-- Create index for performance
CREATE INDEX idx_business_slug ON reviews(business_slug);

-- Generate slugs from existing data (lowercase, hyphens, no special chars)
UPDATE reviews 
SET business_slug = LOWER(
  REGEXP_REPLACE(
    REGEXP_REPLACE(location_name, '[^a-zA-Z0-9\s-]', '', 'g'),
    '\s+', '-', 'g'
  )
);

-- Make business_slug NOT NULL after populating
ALTER TABLE reviews ALTER COLUMN business_slug SET NOT NULL;
