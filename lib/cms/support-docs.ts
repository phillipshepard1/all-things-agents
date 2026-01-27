import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import type { JSONContent } from '@tiptap/core'

// Use admin client for static generation (no cookies available)
// Returns null if service role key is not configured
function getStaticClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return null
  }
  return createAdminClient()
}

export interface SupportDoc {
  id: string
  slug: string
  title: string
  description: string | null
  content: JSONContent
  category_id: string
  category_slug: string
  category_title: string
  sort_order: number
  status: 'draft' | 'published' | 'scheduled'
  video_url: string | null
  video_position: 'top' | 'middle' | 'bottom' | null
  published_at: string | null
}

export interface DocCategory {
  id: string
  slug: string
  title: string
  description: string | null
  icon: string | null
  sort_order: number
  is_active: boolean
  docs: SupportDoc[]
}

/**
 * Fetch all published docs grouped by category
 */
export async function getPublishedDocs(): Promise<DocCategory[]> {
  const supabase = await createClient()

  // Fetch active categories
  const { data: categories, error: catError } = await supabase
    .from('doc_categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order')

  if (catError) {
    console.error('Error fetching categories:', catError)
    return []
  }

  // Fetch published docs
  const { data: docs, error: docsError } = await supabase
    .from('support_docs')
    .select(`
      id,
      slug,
      title,
      description,
      content,
      category_id,
      sort_order,
      status,
      video_url,
      video_position,
      published_at,
      doc_categories (
        slug,
        title
      )
    `)
    .eq('status', 'published')
    .order('sort_order')

  if (docsError) {
    console.error('Error fetching docs:', docsError)
    return []
  }

  // Group docs by category
  const categoriesWithDocs: DocCategory[] = categories.map((cat) => ({
    id: cat.id,
    slug: cat.slug,
    title: cat.title,
    description: cat.description,
    icon: cat.icon,
    sort_order: cat.sort_order,
    is_active: cat.is_active,
    docs: docs
      .filter((doc) => doc.category_id === cat.id)
      .map((doc) => ({
        id: doc.id,
        slug: doc.slug,
        title: doc.title,
        description: doc.description,
        content: doc.content as JSONContent,
        category_id: doc.category_id,
        category_slug: (doc.doc_categories as any)?.slug || '',
        category_title: (doc.doc_categories as any)?.title || '',
        sort_order: doc.sort_order || 0,
        status: doc.status as 'draft' | 'published' | 'scheduled',
        video_url: doc.video_url,
        video_position: doc.video_position as 'top' | 'middle' | 'bottom' | null,
        published_at: doc.published_at,
      })),
  }))

  return categoriesWithDocs
}

/**
 * Get a single doc by its URL slug path
 * @param slugPath - e.g., ['getting-started', 'login-setup'] or ['getting-started']
 */
export async function getDocBySlug(slugPath: string[]): Promise<SupportDoc | null> {
  const supabase = await createClient()

  // Handle root support page
  if (!slugPath || slugPath.length === 0) {
    // Look for a doc with slug 'index' and no category (root welcome page)
    // Or return the first category's index
    const { data, error } = await supabase
      .from('support_docs')
      .select(`
        *,
        doc_categories (slug, title)
      `)
      .eq('slug', 'index')
      .eq('status', 'published')
      .is('category_id', null)
      .single()

    if (error || !data) {
      // Try getting first category index as fallback
      const { data: fallback } = await supabase
        .from('support_docs')
        .select(`
          *,
          doc_categories (slug, title)
        `)
        .eq('slug', 'index')
        .eq('status', 'published')
        .not('category_id', 'is', null)
        .order('sort_order')
        .limit(1)
        .single()

      if (!fallback) return null

      return mapDocResult(fallback)
    }

    return mapDocResult(data)
  }

  // Handle category index (e.g., /support/getting-started)
  if (slugPath.length === 1) {
    const categorySlug = slugPath[0]

    const { data, error } = await supabase
      .from('support_docs')
      .select(`
        *,
        doc_categories!inner (slug, title)
      `)
      .eq('doc_categories.slug', categorySlug)
      .eq('slug', 'index')
      .eq('status', 'published')
      .single()

    if (error || !data) {
      // Maybe this is a direct doc slug, not a category
      // Try finding it as a doc slug within any category
      const { data: directDoc } = await supabase
        .from('support_docs')
        .select(`
          *,
          doc_categories (slug, title)
        `)
        .eq('slug', categorySlug)
        .eq('status', 'published')
        .single()

      if (directDoc) return mapDocResult(directDoc)
      return null
    }

    return mapDocResult(data)
  }

  // Handle nested doc (e.g., /support/getting-started/login-setup)
  const [categorySlug, docSlug] = slugPath

  const { data, error } = await supabase
    .from('support_docs')
    .select(`
      *,
      doc_categories!inner (slug, title)
    `)
    .eq('doc_categories.slug', categorySlug)
    .eq('slug', docSlug)
    .eq('status', 'published')
    .single()

  if (error || !data) return null

  return mapDocResult(data)
}

/**
 * Get all categories (for admin)
 */
export async function getAllCategories(): Promise<DocCategory[]> {
  const supabase = await createClient()

  const { data: categories, error } = await supabase
    .from('doc_categories')
    .select('*')
    .order('sort_order')

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  // Get doc counts for each category
  const { data: docs } = await supabase
    .from('support_docs')
    .select('category_id')

  const docCounts = (docs || []).reduce((acc, doc) => {
    if (doc.category_id) {
      acc[doc.category_id] = (acc[doc.category_id] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)

  return categories.map((cat) => ({
    id: cat.id,
    slug: cat.slug,
    title: cat.title,
    description: cat.description,
    icon: cat.icon,
    sort_order: cat.sort_order,
    is_active: cat.is_active ?? true,
    docs: [], // Just returning count info, not full docs
    docCount: docCounts[cat.id] || 0,
  })) as DocCategory[]
}

/**
 * Get all slugs for static generation
 * Uses admin client since this runs at build time without cookies
 * Returns empty array in dev mode if service role key is not set
 */
export async function getAllDocSlugs(): Promise<{ slug: string[] }[]> {
  const supabase = getStaticClient()
  const paths: { slug: string[] }[] = []

  // In dev mode without service role key, use dynamic rendering
  if (!supabase) {
    return paths
  }

  // Fetch active categories
  const { data: categories } = await supabase
    .from('doc_categories')
    .select('slug')
    .eq('is_active', true)
    .order('sort_order')

  if (!categories) return paths

  // Fetch published docs with their category slugs
  const { data: docs } = await supabase
    .from('support_docs')
    .select(`
      slug,
      doc_categories (slug)
    `)
    .eq('status', 'published')

  if (!docs) return paths

  // Build paths from docs
  for (const doc of docs) {
    const categorySlug = (doc.doc_categories as any)?.slug
    if (categorySlug && doc.slug !== 'index') {
      paths.push({ slug: [categorySlug, doc.slug] })
    } else if (categorySlug && doc.slug === 'index') {
      paths.push({ slug: [categorySlug] })
    }
  }

  return paths
}

// Helper to map Supabase result to SupportDoc
function mapDocResult(data: any): SupportDoc {
  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    description: data.description,
    content: data.content as JSONContent,
    category_id: data.category_id,
    category_slug: data.doc_categories?.slug || '',
    category_title: data.doc_categories?.title || '',
    sort_order: data.sort_order || 0,
    status: data.status,
    video_url: data.video_url,
    video_position: data.video_position,
    published_at: data.published_at,
  }
}
