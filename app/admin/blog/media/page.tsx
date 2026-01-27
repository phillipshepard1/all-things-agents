import { MediaLibrary } from '@/components/admin/media/media-library'

export default function BlogMediaPage() {
  return (
    <MediaLibrary
      bucket="support-docs-media"
      folders={{
        images: 'blog-uploads',
        videos: 'blog-videos',
      }}
      title="Blog Posts Media Library"
      description="Manage images and videos for your blog posts"
    />
  )
}
