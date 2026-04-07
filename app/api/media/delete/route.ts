import { createClient } from '@/lib/pocketbase/server'
import { createMuxClient } from '@/lib/mux/client'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(request: NextRequest) {
  try {
    const pb = await createClient()

    if (!pb.authStore.isValid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { muxAssetId } = body

    if (!muxAssetId) {
      return NextResponse.json({ error: 'Missing muxAssetId' }, { status: 400 })
    }

    const mux = createMuxClient()
    await mux.video.assets.delete(muxAssetId)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete media error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
