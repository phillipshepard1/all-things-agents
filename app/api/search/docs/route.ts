import { NextRequest, NextResponse } from 'next/server'
import { createPublicClient } from '@/lib/pocketbase/public'

interface SearchResult {
  category: string
  categoryName: string
  parentName: string
  items: {
    id: string
    title: string
    description: string | null
    url: string
  }[]
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.trim()

  if (!q) {
    return NextResponse.json({ results: [] })
  }

  const pb = createPublicClient()

  try {
    // Escape double quotes in query for PocketBase filter
    const safeQ = q.replace(/"/g, '\\"')

    const results = await pb.collection('support_docs').getFullList({
      filter: `status = "published" && slug != "index" && (title ~ "${safeQ}" || description ~ "${safeQ}" || search_text ~ "${safeQ}")`,
      expand: 'category_id,category_id.parent_id',
    })

    // Group results by category + parent so same-named categories under different parents stay separate
    const groupMap = new Map<string, SearchResult>()

    for (const doc of results) {
      const category = doc.expand?.category_id
      const parent = category?.expand?.parent_id

      const categoryTitle = category?.title || 'Uncategorized'
      const parentTitle = parent?.title || ''
      const categorySlug = category?.slug || ''
      const parentSlug = parent?.slug || ''
      const groupKey = `${categoryTitle}|${parentSlug}`
      const displayCategory = parentTitle
        ? `${categoryTitle} — ${parentTitle}`
        : categoryTitle

      if (!groupMap.has(groupKey)) {
        groupMap.set(groupKey, {
          category: displayCategory,
          categoryName: categoryTitle,
          parentName: parentTitle,
          items: [],
        })
      }

      groupMap.get(groupKey)!.items.push({
        id: doc.id,
        title: doc.title,
        description: doc.description,
        url: `/client-keeper-crm/support/${parentSlug}/${categorySlug}/${doc.slug}`,
      })
    }

    const grouped = Array.from(groupMap.values())

    return NextResponse.json({ results: grouped })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}
