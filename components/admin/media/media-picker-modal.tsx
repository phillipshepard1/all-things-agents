'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, Loader2, ImageOff, Play, Image as ImageIcon } from 'lucide-react'
import { MediaFile, MediaType } from '@/lib/media/types'
import { formatBytes } from '@/lib/media/utils'

interface MediaPickerModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (url: string) => void
  mediaType: MediaType
  bucket: string
  folder: string
  title?: string
}

export function MediaPickerModal({
  isOpen,
  onClose,
  onSelect,
  mediaType,
  bucket,
  folder,
  title = 'Select from Media Library',
}: MediaPickerModalProps) {
  const [files, setFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchFiles = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      // For videos, fetch from Mux; for images, fetch from Supabase
      if (mediaType === 'video') {
        const response = await fetch('/api/media/mux-videos')
        if (!response.ok) throw new Error('Failed to fetch videos')
        const data = await response.json()
        setFiles(
          (data.videos || []).map((v: any) => ({
            id: v.id,
            name: `Video ${v.id.slice(0, 8)}`,
            path: v.playbackId,
            publicUrl: v.streamUrl,
            type: 'video' as const,
            size: 0,
            createdAt: v.createdAt || new Date().toISOString(),
            thumbnailUrl: v.thumbnailUrl,
          }))
        )
      } else {
        const response = await fetch(`/api/media/list?bucket=${bucket}&folder=${folder}`)
        if (!response.ok) throw new Error('Failed to fetch files')
        const data = await response.json()
        setFiles(data.files)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setFiles([])
    } finally {
      setLoading(false)
    }
  }, [bucket, folder, mediaType])

  useEffect(() => {
    if (isOpen) {
      fetchFiles()
    }
  }, [isOpen, fetchFiles])

  const handleSelect = (file: MediaFile) => {
    onSelect(file.publicUrl)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[80vh] m-4 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 text-[#7a36dd] animate-spin" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-gray-600">{error}</p>
              <button
                onClick={fetchFiles}
                className="mt-4 px-4 py-2 text-sm font-medium text-[#7a36dd] hover:bg-purple-50 rounded-lg transition-colors"
              >
                Try again
              </button>
            </div>
          ) : files.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ImageOff className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-gray-600">No {mediaType === 'video' ? 'videos' : 'images'} found</p>
              <p className="text-sm text-gray-400 mt-1">
                Upload some media to see them here
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {files.map((file) => (
                <MediaPickerItem
                  key={file.id}
                  file={file}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-500">
            Click an item to select it
          </p>
        </div>
      </div>
    </div>
  )
}

interface MediaPickerItemProps {
  file: MediaFile
  onSelect: (file: MediaFile) => void
}

function MediaPickerItem({ file, onSelect }: MediaPickerItemProps) {
  const [imageError, setImageError] = useState(false)
  const thumbnailUrl = (file as any).thumbnailUrl

  return (
    <button
      type="button"
      onClick={() => onSelect(file)}
      className="group bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:border-[#7a36dd] hover:shadow-md transition-all duration-200 text-left"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        {file.type === 'video' ? (
          <>
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt={file.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={file.publicUrl}
                className="w-full h-full object-cover"
                muted
                preload="metadata"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="h-4 w-4 text-[#7a36dd] ml-0.5" fill="currentColor" />
              </div>
            </div>
          </>
        ) : imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <ImageIcon className="h-8 w-8 text-gray-300" />
          </div>
        ) : (
          <img
            src={file.publicUrl}
            alt={file.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        )}
      </div>

      {/* File info */}
      <div className="p-2">
        <p className="text-xs font-medium text-gray-900 truncate" title={file.name}>
          {file.name}
        </p>
        {file.size > 0 && (
          <p className="text-xs text-gray-500 mt-0.5">
            {formatBytes(file.size)}
          </p>
        )}
      </div>
    </button>
  )
}
