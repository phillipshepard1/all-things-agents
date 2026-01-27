-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  tagline TEXT,
  colors JSONB DEFAULT '{}',
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Insert default products
INSERT INTO products (id, name, slug, tagline, colors) VALUES
  ('client-keeper', 'Client Keeper CRM', 'client-keeper-crm', 'Real Estate CRM Without the Tech Overwhelm', '{"primary": "#300092", "accent": "#7a36dd"}'),
  ('atticus', 'Atticus', 'atticus-social-media', 'Social media, simplified.', '{"primary": "#2A6A8D", "accent": "#FF6B35"}'),
  ('nicole', 'Nicole', 'nicole-websites', 'Beautiful websites for real estate agents', '{"primary": "#1a1a1a", "accent": "#666666"}')
ON CONFLICT (id) DO NOTHING;

-- Add product_id to blog_posts if table exists
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'blog_posts') THEN
    ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS product_id TEXT REFERENCES products(id) DEFAULT 'client-keeper';
  END IF;
END $$;

-- Add product_id to support_docs if table exists
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'support_docs') THEN
    ALTER TABLE support_docs ADD COLUMN IF NOT EXISTS product_id TEXT REFERENCES products(id) DEFAULT 'client-keeper';
  END IF;
END $$;

-- Add product_id to doc_categories if table exists
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'doc_categories') THEN
    ALTER TABLE doc_categories ADD COLUMN IF NOT EXISTS product_id TEXT REFERENCES products(id) DEFAULT 'client-keeper';
  END IF;
END $$;

-- Add product_id to blog_categories if table exists
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'blog_categories') THEN
    ALTER TABLE blog_categories ADD COLUMN IF NOT EXISTS product_id TEXT REFERENCES products(id) DEFAULT 'client-keeper';
  END IF;
END $$;

-- Create indexes for product_id columns
CREATE INDEX IF NOT EXISTS idx_blog_posts_product_id ON blog_posts(product_id);
CREATE INDEX IF NOT EXISTS idx_support_docs_product_id ON support_docs(product_id);
CREATE INDEX IF NOT EXISTS idx_doc_categories_product_id ON doc_categories(product_id);
CREATE INDEX IF NOT EXISTS idx_blog_categories_product_id ON blog_categories(product_id);
