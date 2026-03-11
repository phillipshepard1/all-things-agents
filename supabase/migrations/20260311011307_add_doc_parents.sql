-- Create doc_parents table
CREATE TABLE IF NOT EXISTS doc_parents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  product_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add parent_id to doc_categories
ALTER TABLE doc_categories ADD COLUMN IF NOT EXISTS parent_id UUID REFERENCES doc_parents(id);

-- Seed parents
INSERT INTO doc_parents (title, slug, sort_order, product_id) VALUES
  ('Web App', 'web-app', 1, 'client-keeper'),
  ('Mobile App', 'mobile-app', 2, 'client-keeper'),
  ('General', 'general', 3, 'client-keeper')
ON CONFLICT (slug) DO NOTHING;

-- Assign existing categories to General
UPDATE doc_categories
SET parent_id = (SELECT id FROM doc_parents WHERE slug = 'general' LIMIT 1)
WHERE parent_id IS NULL;
