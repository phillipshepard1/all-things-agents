import { createClient } from '@/lib/supabase/server'
import { createMuxClient } from '@/lib/mux/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const uploadId = request.nextUrl.searchParams.get('uploadId')
    if (!uploadId) {
      return NextResponse.json({ error: 'Missing uploadId' }, { status: 400 })
    }

    const mux = createMuxClient()
    const upload = await mux.video.uploads.retrieve(uploadId)

    if (upload.status === 'asset_created' && upload.asset_id) {
      const asset = await mux.video.assets.retrieve(upload.asset_id)

      if (asset.status === 'ready' && asset.playback_ids?.[0]) {
        return NextResponse.json({
          status: 'ready',
          playbackId: asset.playback_ids[0].id,
          streamUrl: `https://stream.mux.com/${asset.playback_ids[0].id}`,
          aspectRatio: asset.aspect_ratio ?? null,
        })
      }

      return NextResponse.json({
        status: 'processing',
        assetStatus: asset.status,
      })
    }

    return NextResponse.json({
      status: upload.status,
    })
  } catch (error) {
    console.error('Mux status check error:', error)
    return NextResponse.json({ error: 'Failed to check status' }, { status: 500 })
  }
}
