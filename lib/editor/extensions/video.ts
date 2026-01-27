import { Node, mergeAttributes } from '@tiptap/core'

export interface VideoOptions {
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    video: {
      setVideo: (options: { src: string }) => ReturnType
      setDirectVideo: (options: { src: string }) => ReturnType
    }
  }
}

/**
 * Check if a URL is a direct video file (not an embeddable URL)
 */
export function isDirectVideoUrl(url: string): boolean {
  return url.includes('supabase.co/storage') || /\.(mp4|webm|mov)$/i.test(url)
}

/**
 * Convert video URLs to embeddable format
 */
export function getEmbedUrl(url: string): { embedUrl: string; provider: string } | null {
  if (!url) return null

  // YouTube: various formats
  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )
  if (youtubeMatch) {
    return {
      embedUrl: `https://www.youtube.com/embed/${youtubeMatch[1]}`,
      provider: 'youtube',
    }
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) {
    return {
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
      provider: 'vimeo',
    }
  }

  // Loom
  const loomMatch = url.match(/loom\.com\/share\/([a-zA-Z0-9]+)/)
  if (loomMatch) {
    return {
      embedUrl: `https://www.loom.com/embed/${loomMatch[1]}`,
      provider: 'loom',
    }
  }

  return null
}

export const Video = Node.create<VideoOptions>({
  name: 'video',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  group: 'block',

  atom: true,

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      provider: {
        default: null,
      },
      isDirectVideo: {
        default: false,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-video]',
        getAttrs: (dom) => {
          const element = dom as HTMLElement
          const isDirectVideo = element.getAttribute('data-direct-video') === 'true'
          const video = element.querySelector('video')
          const iframe = element.querySelector('iframe')

          return {
            src: video?.src || iframe?.src || null,
            isDirectVideo,
            provider: element.getAttribute('data-provider'),
          }
        },
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    const isDirectVideo = HTMLAttributes.isDirectVideo

    if (isDirectVideo) {
      return [
        'div',
        mergeAttributes(this.options.HTMLAttributes, {
          'data-video': '',
          'data-direct-video': 'true',
          class: 'video-embed',
        }),
        [
          'video',
          {
            src: HTMLAttributes.src,
            controls: 'true',
            preload: 'metadata',
            playsinline: 'true',
          },
        ],
      ]
    }

    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, {
        'data-video': '',
        'data-provider': HTMLAttributes.provider,
        class: 'video-embed',
      }),
      [
        'iframe',
        {
          src: HTMLAttributes.src,
          frameborder: '0',
          allowfullscreen: 'true',
          allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
        },
      ],
    ]
  },

  addCommands() {
    return {
      setVideo:
        (options) =>
        ({ commands }) => {
          const result = getEmbedUrl(options.src)
          if (!result) {
            return false
          }
          return commands.insertContent({
            type: this.name,
            attrs: {
              src: result.embedUrl,
              provider: result.provider,
              isDirectVideo: false,
            },
          })
        },
      setDirectVideo:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              src: options.src,
              provider: 'direct',
              isDirectVideo: true,
            },
          })
        },
    }
  },
})
