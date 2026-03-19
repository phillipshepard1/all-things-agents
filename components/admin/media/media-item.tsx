'use client'

import { useState } from 'react'
import { Play, Copy, Trash2, Check, Image as ImageIcon } from 'lucide-react'
import { MediaFile } from '@/lib/media/types'
import { formatBytes, formatDuration } from '@/lib/media/utils'

interface MediaItemProps {
  file: MediaFile
  onPreview: (file: MediaFile) => void
  onDelete: (file: MediaFile) => void
}

export function MediaItem({ file, onPreview, onDelete }: MediaItemProps) {
  const [copied, setCopied] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleCopyUrl = async (e: React.MouseEvent) => {
    e.stopPropagation()
    await navigator.clipboard.writeText(file.publicUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete(file)
  }

  return (
    <div
      onClick={() => onPreview(file)}
      className="group bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:border-[#7a36dd] hover:shadow-lg transition-all duration-200"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        {file.type === 'video' ? (
          <>
            <video
              src={file.publicUrl}
              className="w-full h-full object-cover"
              muted
              preload="metadata"
            />
            {/* Video overlay with play icon */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="h-5 w-5 text-[#7a36dd] ml-0.5" fill="currentColor" />
              </div>
            </div>
          </>
        ) : imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <ImageIcon className="h-12 w-12 text-gray-300" />
          </div>
        ) : (
          <img
            src={file.publicUrl}
            alt={file.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        )}

        {/* Hover actions */}
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleCopyUrl}
            className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-sm transition-colors"
            title="Copy URL"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4 text-gray-600" />
            )}
          </button>
          <button
            onClick={handleDelete}
            className="p-2 bg-white/90 hover:bg-red-50 rounded-lg shadow-sm transition-colors"
            title="Delete"
          >
            <Trash2 className="h-4 w-4 text-gray-600 hover:text-red-600" />
          </button>
        </div>
      </div>

      {/* File info */}
      <div className="p-3">
        <p className="text-sm font-medium text-gray-900 truncate" title={file.name}>
          {file.name}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">
          {file.type === 'video' && file.duration != null
            ? formatDuration(file.duration)
            : formatBytes(file.size)}
        </p>
      </div>
    </div>
  )
}
