'use client'

import { useState, useRef, useCallback } from 'react'
import { X, Link2, Upload, Video, Loader2, FolderOpen } from 'lucide-react'
import { MediaPickerModal } from '../media/media-picker-modal'

const MAX_FILE_SIZE = 200 * 1024 * 1024 // 200MB
const ALLOWED_TYPES = ['video/mp4', 'video/webm', 'video/quicktime']
const MUX_POLL_INTERVAL = 3000

interface VideoUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (url: string) => void
}

type Tab = 'url' | 'upload' | 'library'

export function VideoUploadModal({ isOpen, onClose, onSelect }: VideoUploadModalProps) {
  const [tab, setTab] = useState<Tab>('url')
  const [urlInput, setUrlInput] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showMediaPicker, setShowMediaPicker] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const reset = () => {
    setTab('url')
    setUrlInput('')
    setError(null)
    setIsUploading(false)
    setUploadProgress(0)
  }

  const handleClose = () => {
    if (isUploading) return
    reset()
    onClose()
  }

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) return
    if (!urlInput.match(/^https?:\/\//)) {
      setError('Please enter a valid URL')
      return
    }
    onSelect(urlInput.trim())
    reset()
    onClose()
  }

  const handleUpload = useCallback(async (file: File) => {
    setError(null)

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Please upload a video file (MP4, WebM, or MOV)')
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setError(`File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`)
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      setUploadProgress(5)
      const createRes = await fetch('/api/upload-video-mux', { method: 'POST' })
      if (!createRes.ok) throw new Error('Failed to create upload')
      const { uploadUrl, uploadId } = await createRes.json()

      setUploadProgress(10)
      const uploadRes = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type },
      })
      if (!uploadRes.ok) throw new Error('Failed to upload to Mux')
      setUploadProgress(60)

      let attempts = 0
      const maxAttempts = 60
      while (attempts < maxAttempts) {
        const statusRes = await fetch(`/api/upload-video-mux/status?uploadId=${uploadId}`)
        if (!statusRes.ok) throw new Error('Failed to check upload status')
        const statusData = await statusRes.json()

        if (statusData.status === 'ready') {
          setUploadProgress(100)
          onSelect(statusData.streamUrl)
          reset()
          onClose()
          return
        }

        if (statusData.status === 'errored') {
          throw new Error('Video processing failed')
        }

        setUploadProgress(60 + Math.min(attempts, 35))
        attempts++
        await new Promise((r) => setTimeout(r, MUX_POLL_INTERVAL))
      }

      throw new Error('Upload timed out — video may still be processing')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }, [onSelect, onClose])

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
    if (file && file.type.startsWith('video/')) {
      handleUpload(file)
    } else if (file) {
      setError('Please drop a video file (MP4, WebM, or MOV)')
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

        {/* Modal */}
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg m-4 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Video className="h-5 w-5 text-purple-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Add Video</h2>
            </div>
            <button
              onClick={handleClose}
              disabled={isUploading}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              type="button"
              onClick={() => { setTab('url'); setError(null) }}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 text-sm font-medium transition-colors ${
                tab === 'url'
                  ? 'text-purple-700 border-b-2 border-purple-600 bg-purple-50/50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Link2 className="h-4 w-4" />
              Paste URL
            </button>
            <button
              type="button"
              onClick={() => { setTab('upload'); setError(null) }}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 text-sm font-medium transition-colors ${
                tab === 'upload'
                  ? 'text-purple-700 border-b-2 border-purple-600 bg-purple-50/50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Upload className="h-4 w-4" />
              Upload File
            </button>
            <button
              type="button"
              onClick={() => { setTab('library'); setError(null) }}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 text-sm font-medium transition-colors ${
                tab === 'library'
                  ? 'text-purple-700 border-b-2 border-purple-600 bg-purple-50/50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FolderOpen className="h-4 w-4" />
              Library
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* URL tab */}
            {tab === 'url' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => { setUrlInput(e.target.value); setError(null) }}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleUrlSubmit() }}
                    placeholder="https://www.youtube.com/watch?v=... or Mux stream URL"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    autoFocus
                  />
                  <p className="text-xs text-gray-500">
                    Supports YouTube, Vimeo, Loom, and Mux stream URLs
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleUrlSubmit}
                  disabled={!urlInput.trim()}
                  className="w-full px-4 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Video
                </button>
              </div>
            )}

            {/* Upload tab */}
            {tab === 'upload' && (
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
                    <p className="mt-3 text-sm font-medium text-gray-700">
                      Uploading... {uploadProgress}%
                    </p>
                    <div className="w-full max-w-xs mt-3 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      Please don&apos;t close this window
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="p-3 bg-purple-100 rounded-full mb-3">
                      <Video className="h-6 w-6 text-purple-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">
                      Drop a video here, or click to select
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      MP4, WebM, MOV up to 200MB
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Library tab */}
            {tab === 'library' && (
              <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 text-center">
                <FolderOpen className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-3">
                  Browse your uploaded videos
                </p>
                <button
                  type="button"
                  onClick={() => setShowMediaPicker(true)}
                  className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Open Media Library
                </button>
              </div>
            )}

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

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/webm,video/quicktime"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            handleUpload(file)
            e.target.value = ''
          }
        }}
        className="hidden"
      />

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={showMediaPicker}
        onClose={() => setShowMediaPicker(false)}
        onSelect={(url) => {
          onSelect(url)
          setShowMediaPicker(false)
          reset()
          onClose()
        }}
        mediaType="video"
        bucket="support-docs-media"
        folder="videos"
        title="Select Video from Library"
      />
    </>
  )
}
