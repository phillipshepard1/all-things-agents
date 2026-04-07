'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'
import { createClient } from '@/lib/pocketbase/client'
import { revalidateSupportPages } from '@/lib/cms/revalidate'
import { useAdminProduct } from '@/lib/products/admin-context'

export default function NewCategoryPage() {
  const router = useRouter()
  const { selectedProduct } = useAdminProduct()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [parents, setParents] = useState<{id: string, title: string}[]>([])

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    is_active: true,
    parent_id: '',
  })

  // Fetch parents filtered by product
  useEffect(() => {
    async function fetchParents() {
      const pb = createClient()
      const filters: string[] = ['is_active = true']
      if (selectedProduct && selectedProduct !== 'hub') {
        filters.push(`product_id = "${selectedProduct}"`)
      }

      const data = await pb.collection('doc_parents').getFullList({
        filter: filters.join(' && '),
        sort: 'sort_order',
        fields: 'id,title',
      })

      if (data) {
        setParents(data as unknown as {id: string, title: string}[])
        // Default to "General" parent
        const generalParent = data.find((p) => p.title === 'General')
        setFormData((prev) => ({ ...prev, parent_id: generalParent?.id || '' }))
      }
    }
    fetchParents()
  }, [selectedProduct])

  function generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  function handleTitleChange(title: string) {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Require a product selection
    if (!selectedProduct || selectedProduct === 'hub') {
      setError('Please select a product before creating a category')
      return
    }

    setSaving(true)
    setError(null)

    try {
      const pb = createClient()

      // Get max sort_order for this product
      const orderFilter = selectedProduct
        ? `product_id = "${selectedProduct}"`
        : ''

      const existing = await pb.collection('doc_categories').getFullList({
        filter: orderFilter,
        sort: '-sort_order',
        fields: 'sort_order',
      })

      const nextOrder = (existing?.[0]?.sort_order || 0) + 1

      await pb.collection('doc_categories').create({
        title: formData.title,
        slug: formData.slug,
        description: formData.description || null,
        is_active: formData.is_active,
        parent_id: formData.parent_id || null,
        sort_order: nextOrder,
        product_id: selectedProduct,
      })

      // Revalidate support pages to reflect new category in navigation
      await revalidateSupportPages({ type: 'category' })

      router.push('/admin/docs/categories')
    } catch (e: any) {
      setError(e.message || 'Failed to create category')
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/docs/categories"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">New Category</h1>
          <p className="text-sm text-gray-500">Create a new documentation category</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parent
            </label>
            <select
              value={formData.parent_id}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, parent_id: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select a parent</option>
              {parents.map((parent) => (
                <option key={parent.id} value={parent.id}>
                  {parent.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., Getting Started"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug
            </label>
            <div className="flex items-center">
              <span className="text-gray-500 text-sm mr-2">/support/</span>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, slug: e.target.value }))
                }
                required
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="getting-started"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="A brief description of this category"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, is_active: e.target.checked }))
              }
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label htmlFor="is_active" className="text-sm text-gray-700">
              Active (visible on public site)
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin/docs/categories"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-50 transition-colors"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Creating...' : 'Create Category'}
          </button>
        </div>
      </form>
    </div>
  )
}
