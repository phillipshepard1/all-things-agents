import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from 'fumadocs-ui/page'
import { notFound } from 'next/navigation'
import { getDocBySlug, getAllDocSlugs } from '@/lib/cms/support-docs'
import { generateTocFromContent } from '@/lib/cms/toc-generator'
import { TiptapContent } from '@/components/support/tiptap-content'

/**
 * Detect if a URL is an uploaded video vs an embeddable URL
 */
function isUploadedVideo(url: string): boolean {
  return url.includes('supabase.co/storage') || /\.(mp4|webm|mov)$/i.test(url)
}

/**
 * Convert video URLs to embeddable format
 */
function getEmbedUrl(url: string): string | null {
  if (!url) return null

  // YouTube: various formats
  // https://www.youtube.com/watch?v=VIDEO_ID
  // https://youtu.be/VIDEO_ID
  // https://www.youtube.com/embed/VIDEO_ID (already embed)
  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`
  }

  // Vimeo: https://vimeo.com/VIDEO_ID
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  }

  // Loom: https://www.loom.com/share/VIDEO_ID
  const loomMatch = url.match(/loom\.com\/share\/([a-zA-Z0-9]+)/)
  if (loomMatch) {
    return `https://www.loom.com/embed/${loomMatch[1]}`
  }

  // If it's already an embed URL or unknown format, return as-is
  return url
}

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const doc = await getDocBySlug(params.slug || [])

  if (!doc) {
    notFound()
  }

  const toc = generateTocFromContent(doc.content)

  const embedUrl = doc.video_url ? getEmbedUrl(doc.video_url) : null
  const videoPosition = doc.video_position || 'bottom'

  const VideoEmbed = doc.video_url ? (
    <div className="my-8 aspect-video">
      {isUploadedVideo(doc.video_url) ? (
        <video
          src={doc.video_url}
          controls
          preload="metadata"
          playsInline
          className="w-full h-full rounded-lg bg-black"
        >
          Your browser does not support the video tag.
        </video>
      ) : embedUrl ? (
        <iframe
          src={embedUrl}
          className="w-full h-full rounded-lg border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : null}
    </div>
  ) : null

  return (
    <DocsPage toc={toc}>
      <DocsTitle>{doc.title}</DocsTitle>
      {doc.description && <DocsDescription>{doc.description}</DocsDescription>}
      <DocsBody>
        {videoPosition === 'top' && VideoEmbed}
        <TiptapContent
          content={doc.content}
          videoEmbed={videoPosition === 'middle' ? VideoEmbed : undefined}
        />
        {videoPosition === 'bottom' && VideoEmbed}
      </DocsBody>
    </DocsPage>
  )
}

export async function generateStaticParams() {
  const slugs = await getAllDocSlugs()
  return slugs
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const doc = await getDocBySlug(params.slug || [])

  if (!doc) {
    return {
      title: 'Not Found',
    }
  }

  return {
    title: doc.title,
    description: doc.description,
  }
}
