import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import type { JSONContent } from '@tiptap/core'
import { Callout } from '@/lib/editor/extensions/callout'
import { Video } from '@/lib/editor/extensions/video'

// Same extensions used in the Novel editor
const extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
    },
  }),
  Image.configure({
    HTMLAttributes: {
      class: 'content-image',
    },
  }),
  Callout,
  Video,
]

/**
 * Render TipTap JSON content to HTML string
 */
export function renderTiptapContent(content: JSONContent): string {
  if (!content) {
    return ''
  }

  try {
    // Add IDs to headings for anchor links
    const contentWithIds = addHeadingIds(content)
    return generateHTML(contentWithIds, extensions)
  } catch (error) {
    console.error('Error rendering TipTap content:', error)
    return '<p>Error rendering content</p>'
  }
}

/**
 * Add IDs to heading nodes for anchor links
 */
function addHeadingIds(content: JSONContent): JSONContent {
  if (!content) return content

  const processNode = (node: JSONContent): JSONContent => {
    if (node.type === 'heading') {
      const text = extractText(node)
      const id = slugify(text)

      return {
        ...node,
        attrs: {
          ...node.attrs,
          id,
        },
        content: node.content?.map(processNode),
      }
    }

    if (node.content) {
      return {
        ...node,
        content: node.content.map(processNode),
      }
    }

    return node
  }

  return processNode(content)
}

function extractText(node: JSONContent): string {
  if (node.type === 'text') {
    return node.text || ''
  }

  if (node.content) {
    return node.content.map(extractText).join('')
  }

  return ''
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
