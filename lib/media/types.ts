export type MediaType = 'image' | 'video'

export type ViewMode = 'grid-2' | 'grid-3' | 'grid-4' | 'list'

export type MediaTab = 'photos' | 'videos'

export interface MediaFile {
  id: string
  name: string
  path: string
  publicUrl: string
  type: MediaType
  size: number
  createdAt: string
  duration?: number
  thumbnailUrl?: string
}

export interface MediaLibraryConfig {
  bucket: string
  folders: {
    images: string
    videos: string
  }
  title: string
  description: string
}
