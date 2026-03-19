'use client'

import { useState, useRef, useCallback } from 'react'
import { X, Upload, Image as ImageIcon, Loader2 } from 'lucide-react'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

interface PhotoUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onUploaded: () => void
}

export function PhotoUploadModal({ isOpen, onClose, onUploaded }: PhotoUploadModalProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const reset = () => {
    setError(null)
    setIsUploading(false)
  }

  const handleClose = () => {
    if (isUploading) return
    reset()
    onClose()
  }

  const handleUpload = useCallback(async (file: File) => {
    setError(null)

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Please upload an image file (JPEG, PNG, GIF, or WebP)')
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('File too large. Maximum size is 5MB')
      return
    }

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Upload failed')
      }

      reset()
      onClose()
      onUploaded()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
      setIsUploading(false)
    }
  }, [onClose, onUploaded])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      handleUpload(file)
    } else if (file) {
      setError('Please drop an image file (JPEG, PNG, GIF, or WebP)')
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg m-4 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <ImageIcon className="h-5 w-5 text-purple-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Upload Photo</h2>
            </div>
            <button
              onClick={handleClose}
              disabled={isUploading}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div
              onClick={() => !isUploading && fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
                ${isDragging
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
                }
                ${isUploading ? 'pointer-events-none' : 'cursor-pointer'}
              `}
            >
              {isUploading ? (
                <div className="flex flex-col items-center">
                  <Loader2 className="h-8 w-8 text-purple-500 animate-spin" />
                  <p className="mt-3 text-sm font-medium text-gray-700">Uploading...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-purple-100 rounded-full mb-3">
                    <Upload className="h-6 w-6 text-purple-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    Drop an image here, or click to select
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    JPEG, PNG, GIF, WebP up to 5MB
                  </p>
                </div>
              )}
            </div>

            {error && (
              <p className="mt-3 text-sm text-red-600">{error}</p>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <button
              type="button"
              onClick={handleClose}
              disabled={isUploading}
              className="w-full px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            handleUpload(file)
            e.target.value = ''
          }
        }}
        className="hidden"
      />
    </>
  )
}
