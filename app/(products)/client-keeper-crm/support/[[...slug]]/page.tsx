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
import { isMuxVideo, isSupabaseVideo, getMuxPlaybackId, getEmbedUrl } from '@/lib/video/detection'
import { MuxVideoPlayer } from '@/components/video/mux-player'
import { getMuxAspectRatio } from '@/lib/mux/aspect-ratio'

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const doc = await getDocBySlug(params.slug || [])

  if (!doc) {
    notFound()
  }

  const toc = generateTocFromContent(doc.content)

  const videoPosition = doc.video_position || 'bottom'

  let VideoEmbed: React.ReactNode = null
  if (doc.video_url) {
    if (isMuxVideo(doc.video_url)) {
      const playbackId = getMuxPlaybackId(doc.video_url)
      const aspectRatio = playbackId ? await getMuxAspectRatio(playbackId) : null
      VideoEmbed = playbackId ? (
        <div className="my-8 flex justify-center">
          <MuxVideoPlayer
            playbackId={playbackId}
            aspectRatio={aspectRatio ?? undefined}
            className="max-w-full max-h-[80vh] rounded-lg"
          />
        </div>
      ) : null
    } else if (isSupabaseVideo(doc.video_url)) {
      VideoEmbed = (
        <div className="my-8 flex justify-center">
          <video
            src={doc.video_url}
            controls
            preload="metadata"
            playsInline
            className="max-w-full max-h-[80vh] rounded-lg"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )
    } else {
      const embed = getEmbedUrl(doc.video_url)
      VideoEmbed = embed ? (
        <div className="my-8 aspect-video">
          <iframe
            src={embed.embedUrl}
            className="w-full h-full rounded-lg border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : null
    }
  }

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
  const slugPath = params.slug || []
  const doc = await getDocBySlug(slugPath)

  if (!doc) {
    return {
      title: 'Not Found',
    }
  }

  // Build a contextual title including parent and category when available
  const titleParts = [doc.title]
  if (doc.category_title && doc.slug !== 'index') {
    titleParts.push(doc.category_title)
  }
  if (doc.parent_title) {
    titleParts.push(doc.parent_title)
  }
  titleParts.push('Client Keeper Support')

  return {
    title: titleParts.join(' | '),
    description: doc.description,
  }
}
