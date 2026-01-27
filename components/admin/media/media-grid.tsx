'use client'

import { MediaFile, ViewMode } from '@/lib/media/types'
import { MediaItem } from './media-item'

interface MediaGridProps {
  files: MediaFile[]
  viewMode: ViewMode
  onPreview: (file: MediaFile) => void
  onDelete: (file: MediaFile) => void
}

const gridCols: Record<string, string> = {
  'grid-2': 'grid-cols-1 sm:grid-cols-2',
  'grid-3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  'grid-4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
}

export function MediaGrid({ files, viewMode, onPreview, onDelete }: MediaGridProps) {
  return (
    <div className={`grid ${gridCols[viewMode] || gridCols['grid-3']} gap-4`}>
      {files.map((file) => (
        <MediaItem
          key={file.id}
          file={file}
          onPreview={onPreview}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
