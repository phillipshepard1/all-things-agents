'use client'

import MuxPlayer from '@mux/mux-player-react'

interface VideoPlayerProps {
  playbackId: string
  className?: string
  aspectRatio?: string  // e.g. "9:16", "16:9", "4:3"
}

export function MuxVideoPlayer({ playbackId, className, aspectRatio }: VideoPlayerProps) {
  // Convert "9:16" → "9/16" for CSS aspect-ratio property
  const cssAspectRatio = aspectRatio ? aspectRatio.replace(':', '/') : undefined

  return (
    <MuxPlayer
      playbackId={playbackId}
      streamType="on-demand"
      className={className}
      style={cssAspectRatio ? { aspectRatio: cssAspectRatio } : undefined}
    />
  )
}
