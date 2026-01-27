'use client'

import { useState, useRef, useCallback } from 'react'
import { Link2, Upload, X, Video, Loader2, FolderOpen } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { MediaPickerModal } from '../media/media-picker-modal'

// Validation constants for direct Supabase upload
const MAX_FILE_SIZE = 200 * 1024 * 1024 // 200MB for admin uploads
const ALLOWED_TYPES = ['video/mp4', 'video/webm', 'video/quicktime']

interface VideoUploadProps {
  value?: string | null
  onChange: (url: string | null) => void
}

type InputMode = 'url' | 'upload' | 'library'

/**
 * Detect if a URL is an uploaded video vs an embeddable URL
 */
function isUploadedVideo(url: string): boolean {
  return url.includes('supabase.co/storage') || /\.(mp4|webm|mov)$/i.test(url)
}

export function VideoUpload({ value, onChange }: VideoUploadProps) {
  // Detect initial mode based on existing value
  const getInitialMode = (): InputMode => {
    if (!value) return 'url'
    return isUploadedVideo(value) ? 'upload' : 'url'
  }

  const [mode, setMode] = useState<InputMode>(getInitialMode)
  const [urlInput, setUrlInput] = useState(value && !isUploadedVideo(value) ? value : '')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showMediaPicker, setShowMediaPicker] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setUrlInput(url)
    setError(null)
    // Only update parent if URL is valid or empty
    if (!url) {
      onChange(null)
    } else if (url.match(/^https?:\/\//)) {
      onChange(url)
    }
  }

  const handleUrlBlur = () => {
    // Validate URL on blur
    if (urlInput && !urlInput.match(/^https?:\/\//)) {
      setError('Please enter a valid URL')
    }
  }

  const handleUpload = useCallback(async (file: File) => {
    setError(null)

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Please upload a video file (MP4, WebM, or MOV)')
      return
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError(`File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`)
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const supabase = createClient()

      // Generate unique filename
      const ext = file.name.split('.').pop() || 'mp4'
      const timestamp = Date.now()
      const randomId = Math.random().toString(36).substring(2, 8)
      const fileName = `videos/${timestamp}-${randomId}.${ext}`

      // Simulate progress since Supabase SDK doesn't provide upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90))
      }, 500)

      // Upload directly to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from('support-docs-media')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      clearInterval(progressInterval)

      if (uploadError) {
        throw new Error(uploadError.message)
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('support-docs-media')
        .getPublicUrl(data.path)

      setUploadProgress(100)
      onChange(publicUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }, [onChange])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleUpload(file)
    }
  }

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

  const handleRemove = () => {
    onChange(null)
    setUrlInput('')
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const handleModeChange = (newMode: InputMode) => {
    setMode(newMode)
    setError(null)
    // Clear the value when switching modes
    if (value) {
      onChange(null)
      setUrlInput('')
    }
  }

  // Show preview if we have a value
  if (value) {
    const embedUrl = isUploadedVideo(value) ? null : getEmbedUrl(value)
    const isEmbeddable = isUploadedVideo(value) || embedUrl !== null

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Video (optional)
        </label>
        <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-black">
          <div className="aspect-video relative">
            {isUploadedVideo(value) ? (
              <video
                src={value}
                controls
                preload="metadata"
                playsInline
                className="w-full h-full"
              />
            ) : isEmbeddable ? (
              <iframe
                src={embedUrl!}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              // Non-embeddable URL - show link card
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 to-purple-700 text-white p-6">
                <Video className="h-12 w-12 mb-4 opacity-80" />
                <p className="text-sm text-purple-200 mb-3 text-center">
                  This video cannot be embedded
                </p>
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-purple-700 rounded-lg font-medium hover:bg-purple-50 transition-colors"
                >
                  <Link2 className="h-4 w-4" />
                  Open Video
                </a>
                <p className="text-xs text-purple-300 mt-3 max-w-xs text-center truncate">
                  {value}
                </p>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Video (optional)
      </label>

      {/* Mode tabs */}
      <div className="flex border border-gray-200 rounded-lg overflow-hidden">
        <button
          type="button"
          onClick={() => handleModeChange('url')}
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium transition-colors ${
            mode === 'url'
              ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-600'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Link2 className="h-4 w-4" />
          <span className="hidden sm:inline">Paste URL</span>
          <span className="sm:hidden">URL</span>
        </button>
        <button
          type="button"
          onClick={() => handleModeChange('upload')}
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium transition-colors ${
            mode === 'upload'
              ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-600'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Upload className="h-4 w-4" />
          <span className="hidden sm:inline">Upload Video</span>
          <span className="sm:hidden">Upload</span>
        </button>
        <button
          type="button"
          onClick={() => {
            handleModeChange('library')
            setShowMediaPicker(true)
          }}
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium transition-colors ${
            mode === 'library'
              ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-600'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <FolderOpen className="h-4 w-4" />
          <span className="hidden sm:inline">Media Library</span>
          <span className="sm:hidden">Library</span>
        </button>
      </div>

      {/* URL input mode */}
      {mode === 'url' && (
        <div className="space-y-2">
          <input
            type="url"
            value={urlInput}
            onChange={handleUrlChange}
            onBlur={handleUrlBlur}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          />
          <p className="text-xs text-gray-500">
            Supports YouTube, Vimeo, Loom
          </p>
        </div>
      )}

      {/* Upload mode */}
      {mode === 'upload' && (
        <div
          onClick={() => !isUploading && inputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-lg p-6 text-center
            transition-colors
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
              <p className="mt-2 text-sm font-medium text-gray-700">
                Uploading... {uploadProgress}%
              </p>
              <div className="w-full max-w-xs mt-3 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="p-3 bg-purple-100 rounded-full mb-3">
                <Video className="h-5 w-5 text-purple-600" />
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

      {/* Library mode */}
      {mode === 'library' && (
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
        <p className="text-sm text-red-600">{error}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="video/mp4,video/webm,video/quicktime"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={showMediaPicker}
        onClose={() => setShowMediaPicker(false)}
        onSelect={(url) => {
          onChange(url)
          setShowMediaPicker(false)
        }}
        mediaType="video"
        bucket="support-docs-media"
        folder="videos"
        title="Select Video from Library"
      />
    </div>
  )
}

/**
 * Convert video URLs to embeddable format (for preview)
 * Returns null if the URL is not embeddable
 */
function getEmbedUrl(url: string): string | null {
  if (!url) return null

  // YouTube
  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  }

  // Loom
  const loomMatch = url.match(/loom\.com\/share\/([a-zA-Z0-9]+)/)
  if (loomMatch) {
    return `https://www.loom.com/embed/${loomMatch[1]}`
  }

  // Return null for unsupported URLs (including Guidde, etc.)
  return null
}
