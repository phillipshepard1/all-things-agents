import { createClient } from '@/lib/supabase/server'
import { createMuxClient } from '@/lib/mux/client'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!process.env.MUX_TOKEN_ID || !process.env.MUX_TOKEN_SECRET) {
      return NextResponse.json(
        { error: 'Mux credentials not configured (MUX_TOKEN_ID or MUX_TOKEN_SECRET missing)' },
        { status: 500 }
      )
    }

    const mux = createMuxClient()
    const assets = await mux.video.assets.list({ limit: 100 })

    const videos = assets.data
      .filter((asset) => asset.status === 'ready' && asset.playback_ids?.length)
      .map((asset) => {
        const playbackId = asset.playback_ids![0].id
        return {
          id: asset.id,
          name: asset.passthrough || null,
          playbackId,
          streamUrl: `https://stream.mux.com/${playbackId}`,
          thumbnailUrl: `https://image.mux.com/${playbackId}/thumbnail.webp?width=320&height=180`,
          duration: asset.duration,
          aspectRatio: asset.aspect_ratio ?? null,
          createdAt: asset.created_at,
        }
      })

    return NextResponse.json({ videos })
  } catch (error) {
    console.error('Mux list error:', error)
    const message = error instanceof Error ? error.message : 'Failed to list videos'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
