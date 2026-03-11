import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

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

  const supabase = await createClient()

  const { data, error } = await supabase
    .rpc('search_support_docs', { search_query: q })

  if (error) {
    console.error('Search error:', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }

  // Group results by category + parent so same-named categories under different parents stay separate
  const groupMap = new Map<string, SearchResult>()

  for (const doc of data || []) {
    const categoryTitle = doc.category_title || 'Uncategorized'
    const parentTitle = doc.parent_title || ''
    const groupKey = `${categoryTitle}|${doc.parent_slug}`
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
      url: `/client-keeper-crm/support/${doc.parent_slug}/${doc.category_slug}/${doc.slug}`,
    })
  }

  const results = Array.from(groupMap.values())

  return NextResponse.json({ results })
}
