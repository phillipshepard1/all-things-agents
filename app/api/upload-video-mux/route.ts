import { createClient } from '@/lib/supabase/server'
import { createMuxClient } from '@/lib/mux/client'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const mux = createMuxClient()

    const upload = await mux.video.uploads.create({
      new_asset_settings: {
        playback_policies: ['public'],
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
