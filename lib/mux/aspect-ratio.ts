import { createMuxClient } from './client'

const cache = new Map<string, string>()

export async function getMuxAspectRatio(playbackId: string): Promise<string | null> {
  if (cache.has(playbackId)) return cache.get(playbackId)!

  try {
    const mux = createMuxClient()
    // Look up which asset owns this playback ID
    const assets = await mux.video.assets.list({ limit: 100 })
    const asset = assets.data.find(a =>
      a.playback_ids?.some(p => p.id === playbackId)
    )
    if (asset?.aspect_ratio) {
      cache.set(playbackId, asset.aspect_ratio)
      return asset.aspect_ratio
    }
    return null
  } catch {
    return null
  }
}
