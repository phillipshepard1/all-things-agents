import { createClient } from '@/lib/pocketbase/server'
import { NextRequest, NextResponse } from 'next/server'
import { MediaFile } from '@/lib/media/types'
import { getMediaType, generateFileId } from '@/lib/media/utils'

export async function GET(request: NextRequest) {
  try {
    const pb = await createClient()

    // Check authentication
    if (!pb.authStore.isValid) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // bucket and folder params are kept for backward compat but ignored —
    // PocketBase serves all media from the 'media' collection
    const { searchParams } = new URL(request.url)
    const bucket = searchParams.get('bucket')
    const folder = searchParams.get('folder')

    if (!bucket || !folder) {
      return NextResponse.json(
        { error: 'Missing bucket or folder parameter' },
        { status: 400 }
      )
    }

    // List files from PocketBase media collection
    const records = await pb.collection('media').getFullList({
      sort: '-created',
    })

    // Map to MediaFile format
    const files: MediaFile[] = records.map((record) => {
      const fileName = record.file as string
      const publicUrl = pb.files.getURL(record, fileName)

      return {
        id: generateFileId(record.id),
        name: fileName,
        path: fileName,
        publicUrl,
        type: getMediaType(fileName),
        size: record.size || 0,
        createdAt: record.created,
      }
    })

    return NextResponse.json({ files })
  } catch (error) {
    console.error('List media error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
