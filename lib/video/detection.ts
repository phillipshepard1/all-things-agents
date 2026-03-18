/**
 * Unified video URL detection and embed URL generation.
 * Replaces duplicated functions across page.tsx, video.ts, and video-upload.tsx.
 */

export type VideoType = 'mux' | 'youtube' | 'vimeo' | 'loom' | 'unknown'

export function getVideoType(url: string): VideoType {
  if (!url) return 'unknown'
  if (isMuxVideo(url)) return 'mux'
  if (/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)/.test(url)) return 'youtube'
  if (/vimeo\.com\//.test(url)) return 'vimeo'
  if (/loom\.com\//.test(url)) return 'loom'
  return 'unknown'
}

export function isMuxVideo(url: string): boolean {
  return url.includes('stream.mux.com')
}

/** Returns true for videos that should be played directly (not embedded via iframe) */
export function isDirectVideo(url: string): boolean {
  return isMuxVideo(url) || /\.(mp4|webm|mov)$/i.test(url)
}

/** Extract the Mux playback ID from a stream URL like https://stream.mux.com/{ID} */
export function getMuxPlaybackId(url: string): string | null {
  const match = url.match(/stream\.mux\.com\/([a-zA-Z0-9]+)/)
  return match ? match[1] : null
}

/** Convert video URLs to embeddable iframe format (YouTube/Vimeo/Loom) */
export function getEmbedUrl(url: string): { embedUrl: string; provider: string } | null {
  if (!url) return null

  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )
  if (youtubeMatch) {
    return { embedUrl: `https://www.youtube.com/embed/${youtubeMatch[1]}`, provider: 'youtube' }
  }

  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) {
    return { embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`, provider: 'vimeo' }
  }

  const loomMatch = url.match(/loom\.com\/share\/([a-zA-Z0-9]+)/)
  if (loomMatch) {
    return { embedUrl: `https://www.loom.com/embed/${loomMatch[1]}`, provider: 'loom' }
  }

  return null
}
