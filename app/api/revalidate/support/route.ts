import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const { path, type } = body as { path?: string; type?: 'doc' | 'category' | 'all' }

    // Revalidate specific path if provided
    if (path) {
      revalidatePath(path)
      return NextResponse.json({ revalidated: true, path })
    }

    // Revalidate based on type
    switch (type) {
      case 'doc':
        // Revalidate all doc pages
        revalidatePath('/support', 'layout')
        break
      case 'category':
        // Revalidate layout (navigation) and all pages
        revalidatePath('/support', 'layout')
        break
      case 'all':
      default:
        // Revalidate everything under /support
        revalidatePath('/support', 'layout')
        break
    }

    return NextResponse.json({ revalidated: true, type: type || 'all' })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { revalidated: false, error: 'Failed to revalidate' },
      { status: 500 }
    )
  }
}
