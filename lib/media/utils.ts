import { MediaType } from './types'

const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'ico']
const VIDEO_EXTENSIONS = ['mp4', 'webm', 'mov', 'avi', 'mkv']

export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || ''
}

export function getMediaType(filename: string): MediaType {
  const ext = getFileExtension(filename)
  if (VIDEO_EXTENSIONS.includes(ext)) return 'video'
  return 'image'
}

export function isImage(filename: string): boolean {
  const ext = getFileExtension(filename)
  return IMAGE_EXTENSIONS.includes(ext)
}

export function isVideo(filename: string): boolean {
  const ext = getFileExtension(filename)
  return VIDEO_EXTENSIONS.includes(ext)
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B'

  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function generateFileId(path: string): string {
  return btoa(path).replace(/[^a-zA-Z0-9]/g, '')
}
