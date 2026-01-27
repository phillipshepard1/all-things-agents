export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  colors: {
    primary: string;
    accent: string;
  };
  settings: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  category_id: string | null;
  product_id: string;
  status: 'draft' | 'published';
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface SupportDoc {
  id: string;
  title: string;
  slug: string;
  content: string;
  category_id: string | null;
  product_id: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface SupportCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  product_id: string;
  sort_order: number;
  created_at: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  product_id: string;
  created_at: string;
}
