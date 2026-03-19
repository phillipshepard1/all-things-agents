import { createClient } from '@/lib/supabase/server'
import { createMuxClient } from '@/lib/mux/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json().catch(() => ({}))
    const filename = body.filename || ''

    const mux = createMuxClient()

    const upload = await mux.video.uploads.create({
      new_asset_settings: {
        playback_policies: ['public'],
        ...(filename ? { passthrough: filename } : {}),
      },
      cors_origin: '*',
    })

    return NextResponse.json({
      uploadUrl: upload.url,
      uploadId: upload.id,
    })
  } catch (error) {
    console.error('Mux upload creation error:', error)
    return NextResponse.json({ error: 'Failed to create upload' }, { status: 500 })
  }
}
