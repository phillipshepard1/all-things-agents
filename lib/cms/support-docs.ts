import { createClient } from '@/lib/pocketbase/server'
import { createAdminClient } from '@/lib/pocketbase/admin'
import type { JSONContent } from '@tiptap/core'

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
  const pb = await createClient()

  try {
    // Fetch active parents
    const parents = await pb.collection('doc_parents').getFullList({
      filter: 'is_active = true',
      sort: 'sort_order',
    })

    // Fetch active categories with parent expand
    const categories = await pb.collection('doc_categories').getFullList({
      filter: 'is_active = true',
      sort: 'sort_order',
      expand: 'parent_id',
    })

    // Fetch published docs with category and parent expands
    const docs = await pb.collection('support_docs').getFullList({
      filter: 'status = "published"',
      sort: 'sort_order',
      expand: 'category_id,category_id.parent_id',
    })

    // Group: parents → categories → docs
    const parentsWithData: DocParent[] = parents.map((parent) => {
      const parentCategories = categories
        .filter((cat) => cat.parent_id === parent.id)
        .map((cat) => {
          const catParent = cat.expand?.parent_id
          return {
            id: cat.id,
            slug: cat.slug,
            title: cat.title,
            description: cat.description,
            icon: null,
            sort_order: cat.sort_order,
            is_active: cat.is_active,
            parent_id: cat.parent_id,
            parent_slug: catParent?.slug || parent.slug,
            parent_title: catParent?.title || parent.title,
            docs: docs
              .filter((doc) => doc.category_id === cat.id)
              .map((doc) => {
                const docCat = doc.expand?.category_id
                const docParent = docCat?.expand?.parent_id
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
                  video_url: doc.video_url || null,
                  video_position: doc.video_position as 'top' | 'middle' | 'bottom' | null,
                  published_at: doc.published_at || null,
                }
              }),
          }
        })

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
  } catch (err) {
    console.error('Error fetching published docs:', err)
    return []
  }
}

/**
 * Get a single doc by its URL slug path
 * Handles 3-level hierarchy: /support/{parent}/{category}/{doc}
 */
export async function getDocBySlug(slugPath: string[]): Promise<SupportDoc | null> {
  const pb = await createClient()

  try {
    // Handle root support page (no slug)
    if (!slugPath || slugPath.length === 0) {
      try {
        const data = await pb.collection('support_docs').getFirstListItem(
          'slug = "index" && status = "published" && category_id = ""',
          { expand: 'category_id,category_id.parent_id' }
        )
        return mapDocResult(data)
      } catch {
        // Fallback: first category index doc
        try {
          const fallback = await pb.collection('support_docs').getFirstListItem(
            'slug = "index" && status = "published" && category_id != ""',
            { sort: 'sort_order', expand: 'category_id,category_id.parent_id' }
          )
          return mapDocResult(fallback)
        } catch {
          return null
        }
      }
    }

    // Handle parent index (e.g., /support/general)
    if (slugPath.length === 1) {
      const parentSlug = slugPath[0]

      // Verify parent exists
      let parent
      try {
        parent = await pb.collection('doc_parents').getFirstListItem(
          `slug = "${parentSlug}" && is_active = true`
        )
      } catch {
        return null
      }

      // Find categories under this parent
      const categories = await pb.collection('doc_categories').getFullList({
        filter: `parent_id = "${parent.id}" && is_active = true`,
        sort: 'sort_order',
      })

      if (categories.length === 0) return null

      // Build filter for category IDs
      const catFilter = categories.map(c => `category_id = "${c.id}"`).join(' || ')

      try {
        const fallback = await pb.collection('support_docs').getFirstListItem(
          `slug = "index" && status = "published" && (${catFilter})`,
          { sort: 'sort_order', expand: 'category_id,category_id.parent_id' }
        )
        return mapDocResult(fallback)
      } catch {
        return null
      }
    }

    // Handle category index (e.g., /support/general/getting-started)
    if (slugPath.length === 2) {
      const [parentSlug, categorySlug] = slugPath

      // Find parent
      let parent
      try {
        parent = await pb.collection('doc_parents').getFirstListItem(
          `slug = "${parentSlug}" && is_active = true`
        )
      } catch {
        return null
      }

      // Find category under this parent
      let category
      try {
        category = await pb.collection('doc_categories').getFirstListItem(
          `slug = "${categorySlug}" && parent_id = "${parent.id}" && is_active = true`
        )
      } catch {
        return null
      }

      try {
        const data = await pb.collection('support_docs').getFirstListItem(
          `slug = "index" && status = "published" && category_id = "${category.id}"`,
          { expand: 'category_id,category_id.parent_id' }
        )
        return mapDocResult(data)
      } catch {
        return null
      }
    }

    // Handle specific doc (e.g., /support/general/getting-started/login-setup)
    if (slugPath.length === 3) {
      const [parentSlug, categorySlug, docSlug] = slugPath

      // Find parent
      let parent
      try {
        parent = await pb.collection('doc_parents').getFirstListItem(
          `slug = "${parentSlug}" && is_active = true`
        )
      } catch {
        return null
      }

      // Find category under this parent
      let category
      try {
        category = await pb.collection('doc_categories').getFirstListItem(
          `slug = "${categorySlug}" && parent_id = "${parent.id}" && is_active = true`
        )
      } catch {
        return null
      }

      try {
        const data = await pb.collection('support_docs').getFirstListItem(
          `slug = "${docSlug}" && status = "published" && category_id = "${category.id}"`,
          { expand: 'category_id,category_id.parent_id' }
        )
        return mapDocResult(data)
      } catch {
        return null
      }
    }

    return null
  } catch (err) {
    console.error('Error fetching doc by slug:', err)
    return null
  }
}

/**
 * Get all categories (for admin)
 */
export async function getAllCategories(): Promise<DocCategory[]> {
  const pb = await createClient()

  try {
    const categories = await pb.collection('doc_categories').getFullList({
      sort: 'sort_order',
      expand: 'parent_id',
    })

    // Get doc counts for each category
    const docs = await pb.collection('support_docs').getFullList({
      fields: 'category_id',
    })

    const docCounts = docs.reduce((acc, doc) => {
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
      icon: null,
      sort_order: cat.sort_order,
      is_active: cat.is_active ?? true,
      parent_id: cat.parent_id || null,
      parent_slug: cat.expand?.parent_id?.slug || '',
      parent_title: cat.expand?.parent_id?.title || '',
      docs: [],
      docCount: docCounts[cat.id] || 0,
    })) as DocCategory[]
  } catch (err) {
    console.error('Error fetching categories:', err)
    return []
  }
}

/**
 * Get all slugs for static generation
 * Uses admin client since this runs at build time without cookies
 */
export async function getAllDocSlugs(): Promise<{ slug: string[] }[]> {
  const paths: { slug: string[] }[] = []

  let pb
  try {
    pb = await createAdminClient()
  } catch {
    // Can't authenticate — return empty for dynamic rendering
    return paths
  }

  try {
    // Fetch active parents
    const parents = await pb.collection('doc_parents').getFullList({
      filter: 'is_active = true',
      sort: 'sort_order',
      fields: 'id,slug',
    })

    const parentSlugMap: Record<string, string> = {}
    for (const p of parents) {
      parentSlugMap[p.id] = p.slug
    }

    // Fetch active categories
    const categories = await pb.collection('doc_categories').getFullList({
      filter: 'is_active = true',
      sort: 'sort_order',
      fields: 'id,slug,parent_id',
    })

    const categoryMap: Record<string, { slug: string; parentSlug: string }> = {}
    for (const cat of categories) {
      const parentSlug = cat.parent_id ? parentSlugMap[cat.parent_id] : undefined
      if (parentSlug) {
        categoryMap[cat.id] = { slug: cat.slug, parentSlug }
      }
    }

    // Fetch published docs
    const docs = await pb.collection('support_docs').getFullList({
      filter: 'status = "published"',
      fields: 'slug,category_id',
    })

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
  } catch (err) {
    console.error('Error fetching doc slugs:', err)
  }

  return paths
}

// Helper to map PocketBase result to SupportDoc
function mapDocResult(data: any): SupportDoc {
  const docCategory = data.expand?.category_id
  const docParent = docCategory?.expand?.parent_id

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
    video_url: data.video_url || null,
    video_position: data.video_position || null,
    published_at: data.published_at || null,
  }
}
