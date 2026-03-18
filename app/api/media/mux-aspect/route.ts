import { getMuxAspectRatio } from '@/lib/mux/aspect-ratio'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const playbackId = request.nextUrl.searchParams.get('playbackId')
  if (!playbackId) {
    return NextResponse.json({ error: 'Missing playbackId' }, { status: 400 })
  }
  const aspectRatio = await getMuxAspectRatio(playbackId)
  return NextResponse.json({ aspectRatio })
}
