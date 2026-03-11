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
  parent_slug: string
  parent_title: string
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
  parent_id: string | null
  parent_slug: string
  parent_title: string
  docs: SupportDoc[]
}

export interface DocParent {
  id: string
  slug: string
  title: string
  description: string | null
  sort_order: number
  is_active: boolean
  categories: DocCategory[]
}

/**
 * Fetch all published docs grouped by parent → category → doc
 */
export async function getPublishedDocs(): Promise<DocParent[]> {
  const supabase = await createClient()

  // Fetch active parents
  const { data: parents, error: parentError } = await supabase
    .from('doc_parents')
    .select('*')
    .eq('is_active', true)
    .order('sort_order')

  if (parentError) {
    console.error('Error fetching parents:', parentError)
    return []
  }

  // Fetch active categories with parent info
  const { data: categories, error: catError } = await supabase
    .from('doc_categories')
    .select(`
      *,
      doc_parents (slug, title)
    `)
    .eq('is_active', true)
    .order('sort_order')

  if (catError) {
    console.error('Error fetching categories:', catError)
    return []
  }

  // Fetch published docs with category and parent joins
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
        title,
        parent_id,
        doc_parents (slug, title)
      )
    `)
    .eq('status', 'published')
    .order('sort_order')

  if (docsError) {
    console.error('Error fetching docs:', docsError)
    return []
  }

  // Group: parents → categories → docs
  const parentsWithData: DocParent[] = parents.map((parent) => {
    const parentCategories = categories
      .filter((cat) => cat.parent_id === parent.id)
      .map((cat) => ({
        id: cat.id,
        slug: cat.slug,
        title: cat.title,
        description: cat.description,
        icon: cat.icon,
        sort_order: cat.sort_order,
        is_active: cat.is_active,
        parent_id: cat.parent_id,
        parent_slug: (cat.doc_parents as any)?.slug || parent.slug,
        parent_title: (cat.doc_parents as any)?.title || parent.title,
        docs: docs
          .filter((doc) => doc.category_id === cat.id)
          .map((doc) => {
            const docCat = doc.doc_categories as any
            const docParent = docCat?.doc_parents
            return {
              id: doc.id,
              slug: doc.slug,
              title: doc.title,
              description: doc.description,
              content: doc.content as JSONContent,
              category_id: doc.category_id,
              category_slug: docCat?.slug || '',
              category_title: docCat?.title || '',
              parent_slug: docParent?.slug || parent.slug,
              parent_title: docParent?.title || parent.title,
              sort_order: doc.sort_order || 0,
              status: doc.status as 'draft' | 'published' | 'scheduled',
              video_url: doc.video_url,
              video_position: doc.video_position as 'top' | 'middle' | 'bottom' | null,
              published_at: doc.published_at,
            }
          }),
      }))

    return {
      id: parent.id,
      slug: parent.slug,
      title: parent.title,
      description: parent.description,
      sort_order: parent.sort_order,
      is_active: parent.is_active,
      categories: parentCategories,
    }
  })

  return parentsWithData
}

/**
 * Get a single doc by its URL slug path
 * Handles 3-level hierarchy: /support/{parent}/{category}/{doc}
 * @param slugPath - e.g., [] | [parentSlug] | [parentSlug, categorySlug] | [parentSlug, categorySlug, docSlug]
 */
export async function getDocBySlug(slugPath: string[]): Promise<SupportDoc | null> {
  const supabase = await createClient()

  // Handle root support page (no slug)
  if (!slugPath || slugPath.length === 0) {
    // Look for a doc with slug 'index' and no category (root welcome page)
    const { data, error } = await supabase
      .from('support_docs')
      .select(`
        *,
        doc_categories (
          slug, title, parent_id,
          doc_parents (slug, title)
        )
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
          doc_categories (
            slug, title, parent_id,
            doc_parents (slug, title)
          )
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

  // Handle parent index (e.g., /support/general)
  if (slugPath.length === 1) {
    const parentSlug = slugPath[0]

    // Verify the parent exists
    const { data: parent } = await supabase
      .from('doc_parents')
      .select('id, slug, title')
      .eq('slug', parentSlug)
      .eq('is_active', true)
      .single()

    if (!parent) return null

    // Find the first category index doc under this parent
    const { data: categories } = await supabase
      .from('doc_categories')
      .select('id')
      .eq('parent_id', parent.id)
      .eq('is_active', true)
      .order('sort_order')

    if (!categories || categories.length === 0) return null

    const categoryIds = categories.map((c) => c.id)

    const { data: fallback } = await supabase
      .from('support_docs')
      .select(`
        *,
        doc_categories (
          slug, title, parent_id,
          doc_parents (slug, title)
        )
      `)
      .eq('slug', 'index')
      .eq('status', 'published')
      .in('category_id', categoryIds)
      .order('sort_order')
      .limit(1)
      .single()

    if (!fallback) return null

    return mapDocResult(fallback)
  }

  // Handle category index (e.g., /support/general/getting-started)
  if (slugPath.length === 2) {
    const [parentSlug, categorySlug] = slugPath

    // Find the category and verify it belongs to the right parent
    const { data, error } = await supabase
      .from('support_docs')
      .select(`
        *,
        doc_categories!inner (
          slug, title, parent_id,
          doc_parents!inner (slug, title)
        )
      `)
      .eq('doc_categories.slug', categorySlug)
      .eq('doc_categories.doc_parents.slug', parentSlug)
      .eq('slug', 'index')
      .eq('status', 'published')
      .single()

    if (error || !data) return null

    return mapDocResult(data)
  }

  // Handle specific doc (e.g., /support/general/getting-started/login-setup)
  if (slugPath.length === 3) {
    const [parentSlug, categorySlug, docSlug] = slugPath

    const { data, error } = await supabase
      .from('support_docs')
      .select(`
        *,
        doc_categories!inner (
          slug, title, parent_id,
          doc_parents!inner (slug, title)
        )
      `)
      .eq('doc_categories.slug', categorySlug)
      .eq('doc_categories.doc_parents.slug', parentSlug)
      .eq('slug', docSlug)
      .eq('status', 'published')
      .single()

    if (error || !data) return null

    return mapDocResult(data)
  }

  return null
}

/**
 * Get all categories (for admin)
 */
export async function getAllCategories(): Promise<DocCategory[]> {
  const supabase = await createClient()

  const { data: categories, error } = await supabase
    .from('doc_categories')
    .select(`
      *,
      doc_parents (slug, title)
    `)
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
    parent_id: cat.parent_id || null,
    parent_slug: (cat.doc_parents as any)?.slug || '',
    parent_title: (cat.doc_parents as any)?.title || '',
    docs: [], // Just returning count info, not full docs
    docCount: docCounts[cat.id] || 0,
  })) as DocCategory[]
}

/**
 * Get all slugs for static generation
 * Uses admin client since this runs at build time without cookies
 * Returns empty array in dev mode if service role key is not set
 * Paths now include parent: [parentSlug, categorySlug, docSlug]
 */
export async function getAllDocSlugs(): Promise<{ slug: string[] }[]> {
  const supabase = getStaticClient()
  const paths: { slug: string[] }[] = []

  // In dev mode without service role key, use dynamic rendering
  if (!supabase) {
    return paths
  }

  // Fetch active parents
  const { data: parents } = await supabase
    .from('doc_parents')
    .select('id, slug')
    .eq('is_active', true)
    .order('sort_order')

  if (!parents) return paths

  // Build a parent id → slug lookup
  const parentSlugMap: Record<string, string> = {}
  for (const p of parents) {
    parentSlugMap[p.id] = p.slug
  }

  // Fetch active categories with parent_id
  const { data: categories } = await supabase
    .from('doc_categories')
    .select('id, slug, parent_id')
    .eq('is_active', true)
    .order('sort_order')

  if (!categories) return paths

  // Build a category id → { slug, parentSlug } lookup
  const categoryMap: Record<string, { slug: string; parentSlug: string }> = {}
  for (const cat of categories) {
    const parentSlug = cat.parent_id ? parentSlugMap[cat.parent_id] : undefined
    if (parentSlug) {
      categoryMap[cat.id] = { slug: cat.slug, parentSlug }
    }
  }

  // Fetch published docs with their category info
  const { data: docs } = await supabase
    .from('support_docs')
    .select(`
      slug,
      category_id
    `)
    .eq('status', 'published')

  if (!docs) return paths

  // Build paths: [parentSlug, categorySlug] for index docs, [parentSlug, categorySlug, docSlug] for others
  for (const doc of docs) {
    if (!doc.category_id) continue
    const catInfo = categoryMap[doc.category_id]
    if (!catInfo) continue

    if (doc.slug === 'index') {
      paths.push({ slug: [catInfo.parentSlug, catInfo.slug] })
    } else {
      paths.push({ slug: [catInfo.parentSlug, catInfo.slug, doc.slug] })
    }
  }

  return paths
}

// Helper to map Supabase result to SupportDoc
function mapDocResult(data: any): SupportDoc {
  const docCategory = data.doc_categories
  const docParent = docCategory?.doc_parents

  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    description: data.description,
    content: data.content as JSONContent,
    category_id: data.category_id,
    category_slug: docCategory?.slug || '',
    category_title: docCategory?.title || '',
    parent_slug: docParent?.slug || '',
    parent_title: docParent?.title || '',
    sort_order: data.sort_order || 0,
    status: data.status,
    video_url: data.video_url,
    video_position: data.video_position,
    published_at: data.published_at,
  }
}
