'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Edit2, Trash2, GripVertical, FileText } from 'lucide-react'
import { createClient } from '@/lib/pocketbase/client'
import { revalidateSupportPages } from '@/lib/cms/revalidate'
import { useAdminProduct } from '@/lib/products/admin-context'

interface Parent {
  id: string
  slug: string
  title: string
  description: string | null
  sort_order: number
  is_active: boolean
  category_count: number
}

export default function ParentsPage() {
  const { selectedProduct } = useAdminProduct()
  const [parents, setParents] = useState<Parent[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  const fetchParents = async () => {
    const pb = createClient()

    try {
      // Fetch parents filtered by product
      const parentFilter = selectedProduct && selectedProduct !== 'hub'
        ? `product_id = "${selectedProduct}"`
        : ''

      const parentData = await pb.collection('doc_parents').getFullList({
        filter: parentFilter,
        sort: 'sort_order',
      })

      // Get category counts per parent filtered by product
      const catFilter = selectedProduct && selectedProduct !== 'hub'
        ? `product_id = "${selectedProduct}"`
        : ''

      const cats = await pb.collection('doc_categories').getFullList({
        filter: catFilter,
        fields: 'parent_id',
      })

      const categoryCounts = (cats || []).reduce((acc, cat) => {
        if (cat.parent_id) {
          acc[cat.parent_id] = (acc[cat.parent_id] || 0) + 1
        }
        return acc
      }, {} as Record<string, number>)

      setParents(
        (parentData || []).map((parent) => ({
          id: parent.id,
          slug: parent.slug,
          title: parent.title,
          description: parent.description || null,
          sort_order: parent.sort_order || 0,
          is_active: parent.is_active ?? true,
          category_count: categoryCounts[parent.id] || 0,
        }))
      )
    } catch (e) {
      console.error('Error fetching parents:', e)
    }
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Initial data fetch on mount
    void fetchParents()
  }, [selectedProduct])

  async function handleDelete(id: string, categoryCount: number) {
    if (categoryCount > 0) {
      alert('Cannot delete a parent that has categories. Please move or delete the categories first.')
      return
    }

    if (!confirm('Are you sure you want to delete this parent?')) return

    setDeleting(id)
    const pb = createClient()

    try {
      await pb.collection('doc_parents').delete(id)
      setParents((prev) => prev.filter((p) => p.id !== id))
      // Revalidate support pages to update navigation
      await revalidateSupportPages({ type: 'category' })
    } catch (error: any) {
      alert('Error deleting parent: ' + (error.message || 'Unknown error'))
    }
    setDeleting(null)
  }

  async function handleReorder(draggedId: string, targetId: string) {
    const draggedIndex = parents.findIndex((p) => p.id === draggedId)
    const targetIndex = parents.findIndex((p) => p.id === targetId)

    if (draggedIndex === targetIndex) return

    const newParents = [...parents]
    const [removed] = newParents.splice(draggedIndex, 1)
    newParents.splice(targetIndex, 0, removed)

    // Update sort_order for all parents
    const updated = newParents.map((parent, index) => ({
      ...parent,
      sort_order: index + 1,
    }))

    setParents(updated)

    // Save to database
    const pb = createClient()
    await Promise.all(
      updated.map((parent) =>
        pb.collection('doc_parents').update(parent.id, { sort_order: parent.sort_order })
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
          <h1 className="text-2xl font-bold text-gray-900">Parents</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage platform parent sections for documentation
          </p>
        </div>
        <Link
          href="/admin/docs/parents/new"
          className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Parent
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {parents.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No parents</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new parent section.
            </p>
            <div className="mt-6">
              <Link
                href="/admin/docs/parents/new"
                className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
              >
                <Plus className="h-4 w-4" />
                New Parent
              </Link>
            </div>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-10 px-3 py-3"></th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Parent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slug
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categories
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
              {parents.map((parent) => (
                <tr
                  key={parent.id}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('text/plain', parent.id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault()
                    const draggedId = e.dataTransfer.getData('text/plain')
                    handleReorder(draggedId, parent.id)
                  }}
                  className="hover:bg-gray-50 cursor-move"
                >
                  <td className="px-3 py-4">
                    <GripVertical className="h-4 w-4 text-gray-400" />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {parent.title}
                      </div>
                      {parent.description && (
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {parent.description}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {parent.slug}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {parent.category_count} categor{parent.category_count !== 1 ? 'ies' : 'y'}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        parent.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {parent.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/docs/parents/${parent.id}`}
                        className="text-purple-600 hover:text-purple-900 p-1"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(parent.id, parent.category_count)}
                        disabled={deleting === parent.id}
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
