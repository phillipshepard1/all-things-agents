'use client'

import { useState, useEffect, useCallback } from 'react'
import { Loader2, ImageOff, AlertCircle } from 'lucide-react'
import { MediaFile, MediaTab, ViewMode, MediaLibraryConfig } from '@/lib/media/types'
import { MediaFilters } from './media-filters'
import { MediaGrid } from './media-grid'
import { MediaList } from './media-list'
import { MediaPreviewModal } from './media-preview-modal'

interface MediaLibraryProps extends MediaLibraryConfig {}

export function MediaLibrary({ bucket, folders, title, description }: MediaLibraryProps) {
  const [activeTab, setActiveTab] = useState<MediaTab>('photos')
  const [viewMode, setViewMode] = useState<ViewMode>('grid-3')
  const [photosData, setPhotosData] = useState<MediaFile[]>([])
  const [videosData, setVideosData] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [previewFile, setPreviewFile] = useState<MediaFile | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<MediaFile | null>(null)
  const [deleting, setDeleting] = useState(false)

  // Fetch both photos and videos once on mount
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true)
      setError(null)

      try {
        const [photosRes, videosRes] = await Promise.all([
          fetch(`/api/media/list?bucket=${bucket}&folder=${folders.images}`),
          fetch('/api/media/mux-videos'),
        ])

        if (photosRes.ok) {
          const data = await photosRes.json()
          setPhotosData(data.files || [])
        }

        if (videosRes.ok) {
          const data = await videosRes.json()
          setVideosData(
            (data.videos || []).map((v: any, index: number) => ({
              id: v.id,
              name: `Video ${index + 1}`,
              path: v.id,
              publicUrl: v.streamUrl,
              type: 'video' as const,
              size: 0,
              createdAt: v.createdAt || new Date().toISOString(),
              thumbnailUrl: v.thumbnailUrl,
              duration: v.duration ?? undefined,
            }))
          )
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [bucket, folders])

  const files = activeTab === 'photos' ? photosData : videosData

  const handlePreview = (file: MediaFile) => {
    setPreviewFile(file)
    setIsPreviewOpen(true)
  }

  const handleDeleteRequest = (file: MediaFile) => {
    setDeleteConfirm(file)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm) return

    setDeleting(true)
    try {
      if (deleteConfirm.type === 'video') {
        const response = await fetch('/api/media/delete', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ muxAssetId: deleteConfirm.path }),
        })
        if (!response.ok) throw new Error('Failed to delete video')
        setVideosData((prev) => prev.filter((f) => f.id !== deleteConfirm.id))
      } else {
        const response = await fetch('/api/media/delete', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bucket, path: deleteConfirm.path }),
        })
        if (!response.ok) throw new Error('Failed to delete file')
        setPhotosData((prev) => prev.filter((f) => f.id !== deleteConfirm.id))
      }

      setDeleteConfirm(null)
      setIsPreviewOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete file')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <MediaFilters
          activeTab={activeTab}
          onTabChange={setActiveTab}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          photosCount={photosData.length}
          videosCount={videosData.length}
        />

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 text-[#7a36dd] animate-spin" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="h-12 w-12 text-red-400 mb-4" />
              <p className="text-gray-600">{error}</p>
            </div>
          ) : files.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ImageOff className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-gray-600">No {activeTab} found</p>
              <p className="text-sm text-gray-400 mt-1">
                Upload some {activeTab} to see them here
              </p>
            </div>
          ) : viewMode === 'list' ? (
            <MediaList
              files={files}
              onPreview={handlePreview}
              onDelete={handleDeleteRequest}
            />
          ) : (
            <MediaGrid
              files={files}
              viewMode={viewMode}
              onPreview={handlePreview}
              onDelete={handleDeleteRequest}
            />
          )}
        </div>
      </div>

      {/* Preview Modal */}
      <MediaPreviewModal
        file={previewFile}
        isOpen={isPreviewOpen}
        onClose={() => {
          setIsPreviewOpen(false)
          setPreviewFile(null)
        }}
        onDelete={handleDeleteRequest}
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setDeleteConfirm(null)}
          />
          <div className="relative bg-white rounded-xl shadow-xl p-6 max-w-md w-full m-4">
            <h3 className="text-lg font-semibold text-gray-900">Delete File</h3>
            <p className="text-gray-600 mt-2">
              Are you sure you want to delete <span className="font-medium">{deleteConfirm.name}</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setDeleteConfirm(null)}
                disabled={deleting}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deleting}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50 flex items-center gap-2"
              >
                {deleting && <Loader2 className="h-4 w-4 animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
