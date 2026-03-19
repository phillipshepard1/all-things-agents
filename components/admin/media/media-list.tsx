'use client'

import { useState } from 'react'
import { Image as ImageIcon, Film, Copy, Trash2, Check } from 'lucide-react'
import { MediaFile } from '@/lib/media/types'
import { formatBytes, formatDate, formatDuration } from '@/lib/media/utils'

interface MediaListProps {
  files: MediaFile[]
  onPreview: (file: MediaFile) => void
  onDelete: (file: MediaFile) => void
}

export function MediaList({ files, onPreview, onDelete }: MediaListProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
              File
            </th>
            <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">
              Size
            </th>
            <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3 hidden md:table-cell">
              Date
            </th>
            <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {files.map((file) => (
            <MediaListItem
              key={file.id}
              file={file}
              onPreview={onPreview}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

interface MediaListItemProps {
  file: MediaFile
  onPreview: (file: MediaFile) => void
  onDelete: (file: MediaFile) => void
}

function MediaListItem({ file, onPreview, onDelete }: MediaListItemProps) {
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
    <tr
      onClick={() => onPreview(file)}
      className="hover:bg-gray-50 cursor-pointer transition-colors"
    >
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Thumbnail */}
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            {file.type === 'video' ? (
              <div className="w-full h-full flex items-center justify-center bg-purple-50">
                <Film className="h-5 w-5 text-[#7a36dd]" />
              </div>
            ) : imageError ? (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="h-5 w-5 text-gray-300" />
              </div>
            ) : (
              <img
                src={file.publicUrl}
                alt={file.name}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            )}
          </div>
          {/* File name */}
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900 truncate" title={file.name}>
              {file.name}
            </p>
            <p className="text-xs text-gray-500 capitalize sm:hidden">
              {file.type === 'video' && file.duration != null
                ? formatDuration(file.duration)
                : formatBytes(file.size)}
            </p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 hidden sm:table-cell">
        <span className="text-sm text-gray-600">
          {file.type === 'video' && file.duration != null
            ? formatDuration(file.duration)
            : formatBytes(file.size)}
        </span>
      </td>
      <td className="px-4 py-3 hidden md:table-cell">
        <span className="text-sm text-gray-600">{formatDate(file.createdAt)}</span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={handleCopyUrl}
            className="p-2 text-gray-400 hover:text-[#7a36dd] hover:bg-purple-50 rounded-lg transition-colors"
            title="Copy URL"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}
