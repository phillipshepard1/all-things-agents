'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Edit2, Trash2, GripVertical, FileText } from 'lucide-react'
import { createClient } from '@/lib/pocketbase/client'
import { revalidateSupportPages } from '@/lib/cms/revalidate'
import { useAdminProduct } from '@/lib/products/admin-context'

interface Category {
  id: string
  slug: string
  title: string
  description: string | null
  sort_order: number
  is_active: boolean
  doc_count: number
  parent_id: string | null
  parent_title: string | null
}

const parentBadgeColors: Record<string, string> = {
  'Web App': 'bg-purple-100 text-purple-800',
  'Mobile App': 'bg-blue-100 text-blue-800',
  'General': 'bg-gray-100 text-gray-800',
}

export default function CategoriesPage() {
  const { selectedProduct } = useAdminProduct()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  const fetchCategories = async () => {
    const pb = createClient()

    try {
      // Fetch categories filtered by product
      const catFilter = selectedProduct && selectedProduct !== 'hub'
        ? `product_id = "${selectedProduct}"`
        : ''

      const cats = await pb.collection('doc_categories').getFullList({
        filter: catFilter,
        sort: 'sort_order',
      })

      // Fetch parents for lookup (with sort_order for grouping)
      const parentFilter = selectedProduct && selectedProduct !== 'hub'
        ? `product_id = "${selectedProduct}"`
        : ''

      const parentsData = await pb.collection('doc_parents').getFullList({
        filter: parentFilter,
        sort: 'sort_order',
        fields: 'id,title,sort_order',
      })

      const parentMap: Record<string, { title: string; sort_order: number }> = {}
      ;(parentsData || []).forEach((p) => {
        parentMap[p.id] = { title: p.title, sort_order: p.sort_order }
      })

      // Get doc counts filtered by product
      const docFilter = selectedProduct && selectedProduct !== 'hub'
        ? `product_id = "${selectedProduct}"`
        : ''

      const docs = await pb.collection('support_docs').getFullList({
        filter: docFilter,
        fields: 'category_id',
      })

      const docCounts = (docs || []).reduce((acc, doc) => {
        if (doc.category_id) {
          acc[doc.category_id] = (acc[doc.category_id] || 0) + 1
        }
        return acc
      }, {} as Record<string, number>)

      const mapped = (cats || []).map((cat) => ({
        id: cat.id,
        slug: cat.slug,
        title: cat.title,
        description: cat.description || null,
        sort_order: cat.sort_order || 0,
        is_active: cat.is_active ?? true,
        doc_count: docCounts[cat.id] || 0,
        parent_id: cat.parent_id || null,
        parent_title: cat.parent_id ? (parentMap[cat.parent_id]?.title || null) : null,
      }))

      // Sort by parent sort_order first, then category sort_order within each parent
      mapped.sort((a, b) => {
        const aParentSort = a.parent_id ? (parentMap[a.parent_id]?.sort_order ?? 999) : 999
        const bParentSort = b.parent_id ? (parentMap[b.parent_id]?.sort_order ?? 999) : 999
        return aParentSort - bParentSort || a.sort_order - b.sort_order
      })

      setCategories(mapped)
    } catch (e) {
      console.error('Error fetching categories:', e)
    }
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Initial data fetch on mount
    void fetchCategories()
  }, [selectedProduct])

  async function handleDelete(id: string, docCount: number) {
    if (docCount > 0) {
      alert('Cannot delete a category that has documents. Please move or delete the documents first.')
      return
    }

    if (!confirm('Are you sure you want to delete this category?')) return

    setDeleting(id)
    const pb = createClient()

    try {
      await pb.collection('doc_categories').delete(id)
      setCategories((prev) => prev.filter((c) => c.id !== id))
      // Revalidate support pages to update navigation
      await revalidateSupportPages({ type: 'category' })
    } catch (error: any) {
      alert('Error deleting category: ' + (error.message || 'Unknown error'))
    }
    setDeleting(null)
  }

  async function handleReorder(draggedId: string, targetId: string) {
    const draggedIndex = categories.findIndex((c) => c.id === draggedId)
    const targetIndex = categories.findIndex((c) => c.id === targetId)

    if (draggedIndex === targetIndex) return

    const newCategories = [...categories]
    const [removed] = newCategories.splice(draggedIndex, 1)
    newCategories.splice(targetIndex, 0, removed)

    // Update sort_order for all categories
    const updated = newCategories.map((cat, index) => ({
      ...cat,
      sort_order: index + 1,
    }))

    setCategories(updated)

    // Save to database
    const pb = createClient()
    await Promise.all(
      updated.map((cat) =>
        pb.collection('doc_categories').update(cat.id, { sort_order: cat.sort_order })
      )
    )

    // Revalidate support pages to update navigation order
    await revalidateSupportPages({ type: 'category' })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage documentation categories
          </p>
        </div>
        <Link
          href="/admin/docs/categories/new"
          className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Category
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {categories.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No categories</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new category.
            </p>
            <div className="mt-6">
              <Link
                href="/admin/docs/categories/new"
                className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
              >
                <Plus className="h-4 w-4" />
                New Category
              </Link>
            </div>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-10 px-3 py-3"></th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Parent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slug
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Docs
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category) => (
                <tr
                  key={category.id}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('text/plain', category.id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault()
                    const draggedId = e.dataTransfer.getData('text/plain')
                    handleReorder(draggedId, category.id)
                  }}
                  className="hover:bg-gray-50 cursor-move"
                >
                  <td className="px-3 py-4">
                    <GripVertical className="h-4 w-4 text-gray-400" />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {category.title}
                      </div>
                      {category.description && (
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {category.description}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {category.parent_title && (
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          parentBadgeColors[category.parent_title] || 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {category.parent_title}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {category.slug}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {category.doc_count} doc{category.doc_count !== 1 ? 's' : ''}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        category.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {category.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/docs/categories/${category.id}`}
                        className="text-purple-600 hover:text-purple-900 p-1"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(category.id, category.doc_count)}
                        disabled={deleting === category.id}
                        className="text-red-600 hover:text-red-900 p-1 disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
