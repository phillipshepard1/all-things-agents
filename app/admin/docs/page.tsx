import Link from 'next/link'
import { Plus, FileText, Pencil, Eye, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getAdminProduct } from '@/lib/products/server'
import { products, type ProductId } from '@/lib/products/config'

function getProductSupportUrl(productId: string | null, docSlug: string): string {
  if (!productId || !(productId in products)) {
    // Default to client-keeper if no product
    return `/client-keeper-crm/support/${docSlug}`
  }
  const product = products[productId as ProductId]
  return `/${product.slug}/support/${docSlug}`
}

export default async function AdminDocsPage() {
  const supabase = await createClient()
  const productId = await getAdminProduct()

  // Fetch docs filtered by product
  let docs: any[] = []
  let error: string | null = null

  try {
    let query = supabase
      .from('support_docs')
      .select('*')
      .order('category')
      .order('sort_order')

    // Filter by product unless viewing hub (all products)
    if (productId && productId !== 'hub') {
      query = query.eq('product_id', productId)
    }

    const { data, error: fetchError } = await query

    if (fetchError) throw fetchError
    docs = data || []
  } catch (e: any) {
    error = e.message || 'Failed to fetch documents'
  }

  // Group docs by category
  const groupedDocs = docs.reduce((acc, doc) => {
    if (!acc[doc.category]) {
      acc[doc.category] = []
    }
    acc[doc.category].push(doc)
    return acc
  }, {} as Record<string, typeof docs>)

  const categories = Object.keys(groupedDocs).sort()

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
      {!error && docs.length === 0 && (
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

      {/* Docs List by Category */}
      {!error && categories.length > 0 && (
        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-sm font-semibold text-gray-900 capitalize">
                  {category.replace(/-/g, ' ')}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  {groupedDocs[category].length} document{groupedDocs[category].length !== 1 ? 's' : ''}
                </p>
              </div>
              <ul className="divide-y divide-gray-200">
                {groupedDocs[category].map((doc: any) => (
                  <li key={doc.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {doc.title}
                          </h3>
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
                          {getProductSupportUrl(doc.product_id, doc.slug)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Link
                          href={getProductSupportUrl(doc.product_id, doc.slug)}
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
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
