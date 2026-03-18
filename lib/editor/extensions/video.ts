import { Node, mergeAttributes } from '@tiptap/core'
import {
  isDirectVideo as _isDirectVideo,
  getEmbedUrl as _getEmbedUrl,
  isMuxVideo,
  getMuxPlaybackId,
} from '@/lib/video/detection'

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

/** Re-export from detection.ts for backward compatibility */
export const isDirectVideoUrl = _isDirectVideo
export const getEmbedUrl = _getEmbedUrl

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
    const isDirectVideoAttr = HTMLAttributes.isDirectVideo
    const src = HTMLAttributes.src || ''

    // Mux videos: emit a placeholder div that tiptap-content.tsx will swap for <MuxVideoPlayer>
    if (isDirectVideoAttr && isMuxVideo(src)) {
      const playbackId = getMuxPlaybackId(src)
      return [
        'div',
        mergeAttributes(this.options.HTMLAttributes, {
          'data-video': '',
          'data-direct-video': 'true',
          'data-mux-playback-id': playbackId || '',
          class: 'video-embed',
        }),
      ]
    }

    // Embeds (YouTube/Vimeo/Loom)
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
