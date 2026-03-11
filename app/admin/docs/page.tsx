'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, FileText, Pencil, Eye } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useAdminProduct } from '@/lib/products/admin-context'
import { products, type ProductId } from '@/lib/products/config'

function getProductSupportUrl(productId: string | null, parentSlug: string, categorySlug: string, docSlug: string): string {
  const base = productId && productId in products
    ? `/${products[productId as ProductId].slug}/support`
    : '/client-keeper-crm/support'
  return `${base}/${parentSlug}/${categorySlug}/${docSlug}`
}

interface Doc {
  id: string
  title: string
  slug: string
  description: string | null
  status: string
  category: string
  category_id: string | null
  product_id: string | null
  sort_order: number
}

interface Parent {
  id: string
  title: string
  slug: string
  sort_order: number
}

interface Category {
  id: string
  slug: string
  title: string
  description: string | null
  sort_order: number
  parent_id: string | null
}

export default function AdminDocsPage() {
  const { selectedProduct } = useAdminProduct()
  const [docs, setDocs] = useState<Doc[]>([])
  const [parents, setParents] = useState<Parent[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [activeParentId, setActiveParentId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [selectedProduct])

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    const supabase = createClient()

    try {
      // Fetch parents
      let parentQuery = supabase
        .from('doc_parents')
        .select('id, title, slug, sort_order')
        .order('sort_order')

      if (selectedProduct && selectedProduct !== 'hub') {
        parentQuery = parentQuery.eq('product_id', selectedProduct)
      }

      const { data: parentsData, error: parentsError } = await parentQuery
      if (parentsError) throw parentsError

      // Fetch categories
      const { data: catsData, error: catsError } = await supabase
        .from('doc_categories')
        .select('id, slug, title, description, sort_order, parent_id')
        .order('sort_order')
      if (catsError) throw catsError

      // Fetch docs
      let docsQuery = supabase
        .from('support_docs')
        .select('*')
        .order('category')
        .order('sort_order')

      if (selectedProduct && selectedProduct !== 'hub') {
        docsQuery = docsQuery.eq('product_id', selectedProduct)
      }

      const { data: docsData, error: docsError } = await docsQuery
      if (docsError) throw docsError

      setParents(parentsData || [])
      setCategories(catsData || [])
      setDocs(docsData || [])

      // Default to first parent tab
      if (parentsData && parentsData.length > 0 && !activeParentId) {
        setActiveParentId(parentsData[0].id)
      }
    } catch (e: any) {
      setError(e.message || 'Failed to fetch documents')
    } finally {
      setLoading(false)
    }
  }

  // Build category map
  const categoryMap: Record<string, Category> = {}
  categories.forEach((cat) => {
    categoryMap[cat.id] = cat
  })

  // Build parent map
  const parentMap: Record<string, Parent> = {}
  parents.forEach((p) => {
    parentMap[p.id] = p
  })

  // Compute doc counts per parent
  const docCountByParent: Record<string, number> = {}
  docs.forEach((doc) => {
    const cat = doc.category_id ? categoryMap[doc.category_id] : null
    if (cat?.parent_id) {
      docCountByParent[cat.parent_id] = (docCountByParent[cat.parent_id] || 0) + 1
    }
  })

  // Filter docs by active parent tab
  const filteredDocs = activeParentId
    ? docs.filter((doc) => {
        const cat = doc.category_id ? categoryMap[doc.category_id] : null
        return cat?.parent_id === activeParentId
      })
    : docs

  // Group filtered docs by category
  const groupedByCategory: Record<string, { title: string; description: string | null; sort_order: number; docs: Doc[] }> = {}
  filteredDocs.forEach((doc) => {
    const catInfo = doc.category_id ? categoryMap[doc.category_id] : null
    const catKey = doc.category || 'uncategorized'
    if (!groupedByCategory[catKey]) {
      groupedByCategory[catKey] = {
        title: catInfo?.title || catKey.replace(/-/g, ' '),
        description: catInfo?.description ?? null,
        sort_order: catInfo?.sort_order ?? 999,
        docs: [],
      }
    }
    groupedByCategory[catKey].docs.push(doc)
  })

  // Seed categories that belong to active parent but have no docs yet
  categories.forEach((cat) => {
    if (cat.parent_id === activeParentId && !groupedByCategory[cat.slug]) {
      groupedByCategory[cat.slug] = {
        title: cat.title,
        description: cat.description,
        sort_order: cat.sort_order,
        docs: [],
      }
    }
  })

  const sortedCatKeys = Object.keys(groupedByCategory).sort(
    (a, b) => groupedByCategory[a].sort_order - groupedByCategory[b].sort_order
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-outfit)]">
            Support Docs
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your help articles and documentation
          </p>
        </div>
        <Link
          href="/admin/docs/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#7a36dd] hover:bg-[#6b2cc4] text-white rounded-lg transition-colors text-sm font-medium"
        >
          <Plus className="h-4 w-4" />
          New Doc
        </Link>
      </div>

      {/* Parent Tabs */}
      {parents.length > 0 && (
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex gap-6">
            {parents.map((parent) => (
              <button
                key={parent.id}
                onClick={() => setActiveParentId(parent.id)}
                className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                  activeParentId === parent.id
                    ? 'text-[#7a36dd] border-[#7a36dd]'
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {parent.title}
                {docCountByParent[parent.id] != null && (
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full ${
                      activeParentId === parent.id
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {docCountByParent[parent.id]}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
          <p className="text-sm text-gray-500 mt-3">Loading documents...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="text-sm font-medium text-red-800">Error loading documents</h3>
          <p className="mt-1 text-sm text-red-700">{error}</p>
          <p className="mt-2 text-sm text-red-600">
            Make sure the <code className="bg-red-100 px-1 rounded">support_docs</code> table exists in your Supabase database.
          </p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && docs.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No documents yet</h3>
          <p className="mt-2 text-sm text-gray-500">
            Get started by creating your first support document.
          </p>
          <Link
            href="/admin/docs/new"
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-[#7a36dd] hover:bg-[#6b2cc4] text-white rounded-lg transition-colors text-sm font-medium"
          >
            <Plus className="h-4 w-4" />
            Create Document
          </Link>
        </div>
      )}

      {/* Empty Tab State */}
      {!loading && !error && docs.length > 0 && filteredDocs.length === 0 && sortedCatKeys.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No documents in this section</h3>
          <p className="mt-2 text-sm text-gray-500">
            Create a document and assign it to a category under this parent.
          </p>
          <Link
            href="/admin/docs/new"
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-[#7a36dd] hover:bg-[#6b2cc4] text-white rounded-lg transition-colors text-sm font-medium"
          >
            <Plus className="h-4 w-4" />
            Create Document
          </Link>
        </div>
      )}

      {/* Docs List by Category */}
      {!loading && !error && sortedCatKeys.length > 0 && (
        <div className="space-y-6">
          {sortedCatKeys.map((catKey) => {
            const catGroup = groupedByCategory[catKey]
            return (
              <div key={catKey} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 capitalize">
                    {catGroup.title}
                  </h3>
                  {catGroup.description && (
                    <p className="text-xs text-gray-500 mt-0.5">{catGroup.description}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-0.5">
                    {catGroup.docs.length} document{catGroup.docs.length !== 1 ? 's' : ''}
                  </p>
                </div>
                {catGroup.docs.length === 0 ? (
                  <div className="px-6 py-8 text-center">
                    <p className="text-sm text-gray-400">No documents in this category yet</p>
                    <Link
                      href="/admin/docs/new"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm text-[#7a36dd] hover:text-[#6b2cc4] font-medium transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add Document
                    </Link>
                  </div>
                ) : (
                <ul className="divide-y divide-gray-200">
                  {catGroup.docs.map((doc) => {
                    const cat = doc.category_id ? categoryMap[doc.category_id] : null
                    const parentObj = cat?.parent_id ? parentMap[cat.parent_id] : null
                    const viewUrl = getProductSupportUrl(doc.product_id, parentObj?.slug || '', cat?.slug || '', doc.slug)
                    return (
                    <li key={doc.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {doc.title}
                            </h4>
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                doc.status === 'published'
                                  ? 'bg-green-100 text-green-800'
                                  : doc.status === 'scheduled'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {doc.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 truncate mt-1">
                            {doc.description || 'No description'}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {viewUrl}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Link
                            href={viewUrl}
                            target="_blank"
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <Link
                            href={`/admin/docs/${doc.id}`}
                            className="p-2 text-gray-400 hover:text-[#7a36dd] transition-colors"
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </li>
                    )
                  })}
                </ul>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
