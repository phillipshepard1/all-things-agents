'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/pocketbase/client'

export default function EditBlogCategoryPage() {
  const router = useRouter()
  const params = useParams()
  const categoryId = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [postCount, setPostCount] = useState(0)

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    icon: '',
    is_active: true,
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const pb = createClient()

        const data = await pb.collection('blog_categories').getOne(categoryId)

        setFormData({
          title: data.title || '',
          slug: data.slug || '',
          description: (data as any).description || '',
          icon: (data as any).icon || '',
          is_active: (data as any).is_active ?? true,
        })

        // Get post count
        const result = await pb.collection('blog_posts').getList(1, 1, {
          filter: `category_id = "${categoryId}"`,
        })

        setPostCount(result.totalItems)
      } catch (e: any) {
        setError(e.message || 'Failed to fetch category')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [categoryId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const pb = createClient()

      await pb.collection('blog_categories').update(categoryId, {
        title: formData.title,
        slug: formData.slug,
        description: formData.description || null,
        icon: formData.icon || null,
        is_active: formData.is_active,
      })

      router.push('/admin/blog/categories')
    } catch (e: any) {
      setError(e.message || 'Failed to update category')
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (postCount > 0) {
      alert('Cannot delete a category that has posts. Please move or delete the posts first.')
      return
    }

    if (!confirm('Are you sure you want to delete this category?')) return

    setDeleting(true)
    try {
      const pb = createClient()
      await pb.collection('blog_categories').delete(categoryId)

      router.push('/admin/blog/categories')
    } catch (e: any) {
      setError(e.message || 'Failed to delete category')
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blog/categories"
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-outfit)]">
              Edit Category
            </h1>
            <p className="text-sm text-gray-500">
              Update blog category details
            </p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting || postCount > 0}
          className="inline-flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          title={postCount > 0 ? 'Cannot delete category with posts' : 'Delete category'}
        >
          <Trash2 className="h-4 w-4" />
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              placeholder="e.g., Tips & Tricks"
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
              Slug
            </label>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-1">/blog/category/</span>
              <input
                type="text"
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                required
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-1">
              Icon (emoji)
            </label>
            <input
              type="text"
              id="icon"
              value={formData.icon}
              onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              placeholder="e.g., 💡"
              maxLength={4}
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
              placeholder="Brief description of this category..."
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <label htmlFor="is_active" className="text-sm text-gray-700">
              Active (visible on the blog)
            </label>
          </div>

          {postCount > 0 && (
            <div className="pt-2 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                This category has <strong>{postCount}</strong> post{postCount !== 1 ? 's' : ''}.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/admin/blog/categories"
            className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2 bg-[#7a36dd] hover:bg-[#6b2cc4] text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
