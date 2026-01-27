'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Trash2, Eye, Edit3 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { NovelEditor } from '@/components/admin/editor/novel-editor'
import type { GuideImportResult } from '@/lib/editor/guide-markdown-parser'
import { VideoUpload } from '@/components/admin/editor/video-upload'
import { TiptapContent } from '@/components/support/tiptap-content'
import { revalidateSupportPages } from '@/lib/cms/revalidate'
import { useAdminProduct } from '@/lib/products/admin-context'

interface Category {
  id: string
  slug: string
  title: string
}

export default function EditDocPage() {
  const router = useRouter()
  const params = useParams()
  const docId = params.id as string
  const { selectedProduct } = useAdminProduct()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [previewMode, setPreviewMode] = useState(false)
  const [docProductId, setDocProductId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    category_id: '',
    video_url: '',
    video_position: 'bottom' as 'top' | 'middle' | 'bottom',
    status: 'draft' as 'draft' | 'published' | 'scheduled',
    published_at: '',
  })

  const [content, setContent] = useState<any>(null)
  const [editorKey, setEditorKey] = useState(0) // Key to force editor remount

  // Fetch existing doc and categories
  useEffect(() => {
    async function fetchData() {
      try {
        const supabase = createClient()

        // Fetch doc first to get its product_id
        const { data, error: fetchError } = await supabase
          .from('support_docs')
          .select('*')
          .eq('id', docId)
          .single()

        if (fetchError) throw fetchError

        // Store the doc's product_id
        setDocProductId(data.product_id || null)

        // Fetch categories filtered by the doc's product_id
        let catQuery = supabase
          .from('doc_categories')
          .select('id, slug, title')
          .eq('is_active', true)
          .order('sort_order')

        if (data.product_id) {
          catQuery = catQuery.eq('product_id', data.product_id)
        }

        const { data: cats } = await catQuery
        if (cats) setCategories(cats)

        setFormData({
          title: data.title || '',
          slug: data.slug || '',
          description: data.description || '',
          category_id: data.category_id || '',
          video_url: data.video_url || '',
          video_position: data.video_position || 'bottom',
          status: data.status || 'draft',
          published_at: data.published_at ? new Date(data.published_at).toISOString().slice(0, 16) : '',
        })
        setContent(data.content)
      } catch (e: any) {
        setError(e.message || 'Failed to fetch document')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [docId])

  // Handle Guide import
  const handleGuideImport = (data: GuideImportResult) => {
    // Auto-populate form fields from imported data
    setFormData(prev => ({
      ...prev,
      title: data.title,
      slug: data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, ''),
      description: data.description,
      video_url: data.videoUrl || '',
    }))
    // Set the editor content and force editor remount
    setContent(data.content)
    setEditorKey(prev => prev + 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      // Find category slug for the text column (backwards compat)
      const selectedCat = categories.find(c => c.id === formData.category_id)

      const { error: updateError } = await supabase
        .from('support_docs')
        .update({
          title: formData.title,
          slug: formData.slug,
          description: formData.description,
          category_id: formData.category_id || null,
          category: selectedCat?.slug || null,
          video_url: formData.video_url || null,
          video_position: formData.video_url ? formData.video_position : null,
          status: formData.status,
          content,
          published_at: formData.status === 'scheduled' ? formData.published_at :
                        formData.status === 'published' ? new Date().toISOString() : null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', docId)

      if (updateError) throw updateError

      // Revalidate support pages to reflect updated content
      await revalidateSupportPages({ type: 'doc' })

      router.push('/admin/docs')
    } catch (e: any) {
      setError(e.message || 'Failed to update document')
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this document? This action cannot be undone.')) {
      return
    }

    setDeleting(true)
    try {
      const supabase = createClient()
      const { error: deleteError } = await supabase
        .from('support_docs')
        .delete()
        .eq('id', docId)

      if (deleteError) throw deleteError

      // Revalidate support pages to remove deleted content
      await revalidateSupportPages({ type: 'doc' })

      router.push('/admin/docs')
    } catch (e: any) {
      setError(e.message || 'Failed to delete document')
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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/docs"
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-outfit)]">
              Edit Document
            </h1>
            <p className="text-sm text-gray-500">
              Update your support documentation
            </p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="inline-flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium disabled:opacity-50"
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
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                Slug
              </label>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-1">/support/</span>
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
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                value={formData.category_id}
                onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <VideoUpload
                value={formData.video_url}
                onChange={(url) => setFormData(prev => ({ ...prev, video_url: url || '' }))}
              />
            </div>

            {formData.video_url && (
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video Position
                </label>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="video_position"
                      value="top"
                      checked={formData.video_position === 'top'}
                      onChange={() => setFormData(prev => ({ ...prev, video_position: 'top' }))}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">Top (before content)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="video_position"
                      value="middle"
                      checked={formData.video_position === 'middle'}
                      onChange={() => setFormData(prev => ({ ...prev, video_position: 'middle' }))}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">Middle (after first section)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="video_position"
                      value="bottom"
                      checked={formData.video_position === 'bottom'}
                      onChange={() => setFormData(prev => ({ ...prev, video_position: 'bottom' }))}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">Bottom (after content)</span>
                  </label>
                </div>
              </div>
            )}
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
              key={editorKey}
              initialContent={content}
              onChange={setContent}
              onGuideImport={handleGuideImport}
            />
          )}
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
                onChange={() => setFormData(prev => ({ ...prev, status: 'draft' }))}
                className="text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-700">Draft</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="published"
                checked={formData.status === 'published'}
                onChange={() => setFormData(prev => ({ ...prev, status: 'published' }))}
                className="text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-700">Published</span>
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
              <span className="text-sm text-gray-700">Scheduled</span>
            </label>
          </div>

          {formData.status === 'scheduled' && (
            <div>
              <label htmlFor="published_at" className="block text-sm font-medium text-gray-700 mb-1">
                Publish Date & Time
              </label>
              <input
                type="datetime-local"
                id="published_at"
                value={formData.published_at}
                onChange={(e) => setFormData(prev => ({ ...prev, published_at: e.target.value }))}
                required={formData.status === 'scheduled'}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/admin/docs"
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
