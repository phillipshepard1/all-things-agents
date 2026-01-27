import { MediaLibrary } from '@/components/admin/media/media-library'

export default function DocsMediaPage() {
  return (
    <MediaLibrary
      bucket="support-docs-media"
      folders={{
        images: 'uploads',
        videos: 'videos',
      }}
      title="Support Docs Media Library"
      description="Manage images and videos for your support documentation"
    />
  )
}
