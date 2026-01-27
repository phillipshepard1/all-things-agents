import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { MediaFile } from '@/lib/media/types'
import { getMediaType, generateFileId } from '@/lib/media/utils'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const bucket = searchParams.get('bucket')
    const folder = searchParams.get('folder')

    if (!bucket || !folder) {
      return NextResponse.json(
        { error: 'Missing bucket or folder parameter' },
        { status: 400 }
      )
    }

    // List files from Supabase storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(folder, {
        sortBy: { column: 'created_at', order: 'desc' },
      })

    if (error) {
      console.error('List files error:', error)
      return NextResponse.json(
        { error: 'Failed to list files' },
        { status: 500 }
      )
    }

    // Filter out folders (items with id = null) and map to MediaFile format
    const files: MediaFile[] = (data || [])
      .filter((item) => item.id !== null && item.name !== '.emptyFolderPlaceholder')
      .map((item) => {
        const path = `${folder}/${item.name}`
        const { data: urlData } = supabase.storage
          .from(bucket)
          .getPublicUrl(path)

        return {
          id: generateFileId(path),
          name: item.name,
          path,
          publicUrl: urlData.publicUrl,
          type: getMediaType(item.name),
          size: item.metadata?.size || 0,
          createdAt: item.created_at || new Date().toISOString(),
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
