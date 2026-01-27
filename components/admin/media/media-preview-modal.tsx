'use client'

import { useState } from 'react'
import { X, Copy, Trash2, Check, Download, ExternalLink, Image as ImageIcon } from 'lucide-react'
import { MediaFile } from '@/lib/media/types'
import { formatBytes, formatDate } from '@/lib/media/utils'

interface MediaPreviewModalProps {
  file: MediaFile | null
  isOpen: boolean
  onClose: () => void
  onDelete: (file: MediaFile) => void
}

export function MediaPreviewModal({ file, isOpen, onClose, onDelete }: MediaPreviewModalProps) {
  const [copied, setCopied] = useState(false)
  const [imageError, setImageError] = useState(false)

  if (!isOpen || !file) return null

  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(file.publicUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDelete = () => {
    onDelete(file)
    onClose()
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = file.publicUrl
    link.download = file.name
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleOpenInNewTab = () => {
    window.open(file.publicUrl, '_blank')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-xl shadow-xl overflow-hidden flex flex-col m-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
              <ImageIcon className="h-5 w-5 text-purple-600" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-gray-900 truncate" title={file.name}>
                {file.name}
              </h2>
              <p className="text-sm text-gray-500">
                {formatBytes(file.size)} • {formatDate(file.createdAt)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Preview */}
        <div className="flex-1 overflow-y-auto bg-gray-900 flex items-center justify-center min-h-[300px]">
          {file.type === 'video' ? (
            <video
              src={file.publicUrl}
              controls
              autoPlay
              className="max-w-full max-h-[60vh]"
            />
          ) : imageError ? (
            <div className="flex flex-col items-center justify-center text-gray-400 py-12">
              <ImageIcon className="h-16 w-16 mb-4" />
              <p>Failed to load image</p>
            </div>
          ) : (
            <img
              src={file.publicUrl}
              alt={file.name}
              className="max-w-full max-h-[60vh] object-contain"
              onError={() => setImageError(true)}
            />
          )}
        </div>

        {/* URL field */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Public URL
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={file.publicUrl}
              readOnly
              className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none"
            />
            <button
              onClick={handleCopyUrl}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2
                ${copied
                  ? 'bg-green-100 text-green-700'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
                }
              `}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className="flex gap-2">
            <button
              onClick={handleOpenInNewTab}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Open
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </button>
          </div>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
