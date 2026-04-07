'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Eye, Edit3, X, Plus, Calendar } from 'lucide-react'
import { createClient } from '@/lib/pocketbase/client'
import { NovelEditor } from '@/components/admin/editor/novel-editor'
import { TiptapContent } from '@/components/support/tiptap-content'
import { ImageUpload } from '@/components/admin/editor/image-upload'
import { useAdminProduct } from '@/lib/products/admin-context'

interface Category {
  id: string
  slug: string
  title: string
}

export default function NewBlogPostPage() {
  const router = useRouter()
  const { selectedProduct } = useAdminProduct()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [previewMode, setPreviewMode] = useState(false)
  const [newTag, setNewTag] = useState('')
  const [categories, setCategories] = useState<Category[]>([])

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    featured_image: '' as string | null,
    status: 'draft' as 'draft' | 'published' | 'scheduled',
    scheduled_for: '',
    tags: [] as string[],
    category_id: '' as string | null,
    meta_description: '',
    og_image: '' as string | null,
  })

  const [content, setContent] = useState<any>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const pb = createClient()
        const filter = selectedProduct && selectedProduct !== 'hub'
          ? `is_active = true && product_id = "${selectedProduct}"`
          : 'is_active = true'

        const data = await pb.collection('blog_categories').getFullList({
          filter,
          sort: 'sort_order',
        })
        setCategories(data as any)
      } catch {
        // Silently fail — categories dropdown will be empty
      }
    }
    fetchCategories()
  }, [selectedProduct])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setFormData(prev => ({
      ...prev,
      title: newTitle,
      slug: generateSlug(newTitle)
    }))
  }

  const handleAddTag = () => {
    const tag = newTag.trim().toLowerCase()
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }))
    }
    setNewTag('')
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Require a product selection
    if (!selectedProduct || selectedProduct === 'hub') {
      setError('Please select a product before creating a blog post')
      return
    }

    setSaving(true)
    setError(null)

    try {
      const pb = createClient()
      const user = pb.authStore.record

      // Serialize content to JSON string for storage
      const contentString = content ? JSON.stringify(content) : ''

      // Determine published_at and scheduled_for based on status
      let published_at = null
      let scheduled_for = null

      if (formData.status === 'published') {
        published_at = new Date().toISOString()
      } else if (formData.status === 'scheduled' && formData.scheduled_for) {
        scheduled_for = new Date(formData.scheduled_for).toISOString()
      }

      await pb.collection('blog_posts').create({
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt || null,
        featured_image: formData.featured_image || null,
        status: formData.status,
        content: contentString,
        tags: formData.tags,
        published_at,
        scheduled_for,
        author_id: user?.id,
        category_id: formData.category_id || null,
        meta_description: formData.meta_description || null,
        og_image: formData.og_image || null,
        product_id: selectedProduct,
      })

      router.push('/admin/blog')
    } catch (e: any) {
      setError(e.message || 'Failed to create blog post')
      setSaving(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/blog"
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-outfit)]">
            New Blog Post
          </h1>
          <p className="text-sm text-gray-500">
            Create a new blog article
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-medium text-gray-900">Basic Information</h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={handleTitleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                placeholder="Your blog post title"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                Slug
              </label>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-1">/blog/</span>
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

            <div className="sm:col-span-2">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                value={formData.category_id || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value || null }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.title}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                placeholder="A brief summary of your blog post..."
              />
            </div>

            <div className="sm:col-span-2">
              <ImageUpload
                value={formData.featured_image}
                onChange={(url) => setFormData(prev => ({ ...prev, featured_image: url }))}
                label="Featured Image"
                aspectRatio="16/9"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-purple-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="Add a tag..."
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Editor */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Content</h2>
            <button
              type="button"
              onClick={() => setPreviewMode(!previewMode)}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                previewMode
                  ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {previewMode ? (
                <>
                  <Edit3 className="h-4 w-4" />
                  Edit
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  Preview
                </>
              )}
            </button>
          </div>

          {previewMode ? (
            <div className="min-h-[400px] border border-gray-200 rounded-lg p-6 bg-gray-50">
              {content ? (
                <TiptapContent content={content} />
              ) : (
                <p className="text-gray-400 italic">No content to preview</p>
              )}
            </div>
          ) : (
            <NovelEditor
              initialContent={content}
              onChange={setContent}
            />
          )}
        </div>

        {/* SEO & Social */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-medium text-gray-900">SEO & Social</h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="meta_description" className="block text-sm font-medium text-gray-700 mb-1">
                Meta Description
              </label>
              <textarea
                id="meta_description"
                value={formData.meta_description}
                onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                rows={2}
                maxLength={160}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                placeholder="Brief description for search engines (max 160 chars)"
              />
              <p className="mt-1 text-xs text-gray-500 text-right">
                {formData.meta_description.length}/160
              </p>
            </div>

            <ImageUpload
              value={formData.og_image}
              onChange={(url) => setFormData(prev => ({ ...prev, og_image: url }))}
              label="Social Image (OG Image)"
              hint="Recommended: 1200x630px. Falls back to featured image if not set."
              aspectRatio="1200/630"
            />
          </div>
        </div>

        {/* Publishing Options */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-medium text-gray-900">Publishing</h2>

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="draft"
                checked={formData.status === 'draft'}
                onChange={() => setFormData(prev => ({ ...prev, status: 'draft', scheduled_for: '' }))}
                className="text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-700">Save as Draft</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="published"
                checked={formData.status === 'published'}
                onChange={() => setFormData(prev => ({ ...prev, status: 'published', scheduled_for: '' }))}
                className="text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-700">Publish Immediately</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="scheduled"
                checked={formData.status === 'scheduled'}
                onChange={() => setFormData(prev => ({ ...prev, status: 'scheduled' }))}
                className="text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-700">Schedule</span>
            </label>
          </div>

          {formData.status === 'scheduled' && (
            <div className="pt-2">
              <label htmlFor="scheduled_for" className="block text-sm font-medium text-gray-700 mb-1">
                <Calendar className="inline-block h-4 w-4 mr-1" />
                Publish Date & Time
              </label>
              <input
                type="datetime-local"
                id="scheduled_for"
                value={formData.scheduled_for}
                onChange={(e) => setFormData(prev => ({ ...prev, scheduled_for: e.target.value }))}
                required
                min={new Date().toISOString().slice(0, 16)}
                className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/admin/blog"
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
            {saving ? 'Creating...' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  )
}
