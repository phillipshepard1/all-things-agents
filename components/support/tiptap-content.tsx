'use client'

import { useState, useEffect } from 'react'
import { renderTiptapContent } from '@/lib/cms/tiptap-renderer'
import { MuxVideoPlayer } from '@/components/video/mux-player'
import type { JSONContent } from '@tiptap/core'
import type { ReactNode } from 'react'

interface TiptapContentProps {
  content: JSONContent
  videoEmbed?: ReactNode
}

const proseClasses = `prose prose-lg prose-neutral dark:prose-invert max-w-none
  prose-headings:scroll-mt-20
  prose-h1:text-4xl prose-h1:font-extrabold
  prose-h2:text-3xl prose-h2:font-bold prose-h2:border-b prose-h2:pb-2 prose-h2:mb-4
  prose-h3:text-2xl prose-h3:font-semibold
  prose-p:text-lg prose-p:leading-8
  prose-li:my-1 prose-li:text-lg
  prose-a:text-purple-600 dark:prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline
  prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
  prose-pre:bg-gray-900 prose-pre:text-gray-100`

function MuxPlayerWithAutoAspect({ playbackId }: { playbackId: string }) {
  const [aspectRatio, setAspectRatio] = useState<string | undefined>()

  useEffect(() => {
    fetch(`/api/media/mux-aspect?playbackId=${playbackId}`)
      .then(r => r.json())
      .then(data => { if (data.aspectRatio) setAspectRatio(data.aspectRatio) })
      .catch(() => {})
  }, [playbackId])

  return (
    <MuxVideoPlayer
      playbackId={playbackId}
      aspectRatio={aspectRatio}
      className="max-w-full max-h-[80vh] rounded-lg"
    />
  )
}

const MUX_PLACEHOLDER_REGEX = /(<div[^>]*data-mux-playback-id="([^"]+)"[^>]*><\/div>)/g

/**
 * Split HTML at Mux placeholder divs and interleave with MuxVideoPlayer React components.
 * TipTap's static renderHTML can't output React components, so we emit placeholder divs
 * with data-mux-playback-id and swap them here at render time.
 */
function renderHtmlWithMuxPlayers(html: string): ReactNode[] {
  const parts: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  // Reset regex state
  MUX_PLACEHOLDER_REGEX.lastIndex = 0

  while ((match = MUX_PLACEHOLDER_REGEX.exec(html)) !== null) {
    const playbackId = match[2]
    const matchStart = match.index
    const matchEnd = matchStart + match[0].length

    // HTML segment before this placeholder
    if (matchStart > lastIndex) {
      parts.push(
        <div key={`html-${lastIndex}`} dangerouslySetInnerHTML={{ __html: html.slice(lastIndex, matchStart) }} />
      )
    }

    // Mux player in place of the placeholder
    parts.push(
      <div key={`mux-${playbackId}-${matchStart}`} className="my-6 flex justify-center">
        <MuxPlayerWithAutoAspect playbackId={playbackId} />
      </div>
    )

    lastIndex = matchEnd
  }

  // Remaining HTML after last placeholder (or all HTML if no placeholders)
  if (lastIndex < html.length) {
    parts.push(
      <div key={`html-${lastIndex}`} dangerouslySetInnerHTML={{ __html: html.slice(lastIndex) }} />
    )
  }

  return parts
}

export function TiptapContent({ content, videoEmbed }: TiptapContentProps) {
  const html = renderTiptapContent(content)
  const hasMuxPlaceholders = html.includes('data-mux-playback-id')

  // For middle position, split content after first h2 or after first few elements
  if (videoEmbed) {
    const splitPoint = html.search(/<\/h2>/)

    if (splitPoint !== -1) {
      const beforeVideo = html.slice(0, splitPoint + 5)
      const afterVideo = html.slice(splitPoint + 5)

      return (
        <>
          <style jsx global>{tiptapStyles}</style>
          <div className={proseClasses}>
            {hasMuxPlaceholders ? renderHtmlWithMuxPlayers(beforeVideo) : (
              <div dangerouslySetInnerHTML={{ __html: beforeVideo }} />
            )}
            {videoEmbed}
            {hasMuxPlaceholders ? renderHtmlWithMuxPlayers(afterVideo) : (
              <div dangerouslySetInnerHTML={{ __html: afterVideo }} />
            )}
          </div>
        </>
      )
    }
  }

  // If Mux placeholders exist, use the split renderer; otherwise use dangerouslySetInnerHTML
  if (hasMuxPlaceholders) {
    return (
      <>
        <style jsx global>{tiptapStyles}</style>
        <div className={proseClasses}>
          {renderHtmlWithMuxPlayers(html)}
        </div>
      </>
    )
  }

  return (
    <>
      <style jsx global>{tiptapStyles}</style>
      <div
        className={proseClasses}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  )
}

// Styles for callouts and video embeds
const tiptapStyles = `
  /* Callout styles */
  .callout {
    padding: 1rem;
    border-radius: 0.5rem;
    margin: 1.5rem 0;
    position: relative;
  }

  .callout-info {
    background-color: #eff6ff;
    border-left: 4px solid #3b82f6;
  }

  .callout-warning {
    background-color: #fffbeb;
    border-left: 4px solid #f59e0b;
  }

  .callout-tip {
    background-color: #f0fdf4;
    border-left: 4px solid #22c55e;
  }

  .dark .callout-info {
    background-color: rgba(59, 130, 246, 0.15);
    border-left-color: #60a5fa;
  }

  .dark .callout-warning {
    background-color: rgba(245, 158, 11, 0.15);
    border-left-color: #fbbf24;
  }

  .dark .callout-tip {
    background-color: rgba(34, 197, 94, 0.15);
    border-left-color: #4ade80;
  }

  .callout p {
    margin-bottom: 0.5rem;
  }

  .callout p:last-child {
    margin-bottom: 0;
  }

  /* Video embed styles */
  .video-embed {
    margin: 1.5rem 0;
    position: relative;
    width: 100%;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    border-radius: 0.5rem;
    overflow: hidden;
    background-color: #000;
  }

  .dark .video-embed {
    background-color: #000;
  }

  .video-embed iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0.5rem;
  }

  /* Native video styles */
  .video-embed video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
    object-fit: contain;
    background: #000;
  }

  /* Content image styles */
  .content-image {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
    margin: 1.5rem auto;
    display: block;
  }
`
