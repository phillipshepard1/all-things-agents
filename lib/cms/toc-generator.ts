import type { JSONContent } from '@tiptap/core'
import type { TableOfContents } from 'fumadocs-core/toc'

/**
 * Generate table of contents from TipTap JSON content
 */
export function generateTocFromContent(content: JSONContent): TableOfContents {
  const toc: TableOfContents = []

  function extractHeadings(node: JSONContent) {
    if (node.type === 'heading' && node.attrs?.level) {
      const text = extractText(node)
      const id = slugify(text)

      toc.push({
        title: text,
        url: `#${id}`,
        depth: node.attrs.level,
      })
    }

    if (node.content) {
      node.content.forEach(extractHeadings)
    }
  }

  if (content) {
    extractHeadings(content)
  }

  return toc
}

/**
 * Extract plain text from a TipTap node
 */
function extractText(node: JSONContent): string {
  if (node.type === 'text') {
    return node.text || ''
  }

  if (node.content) {
    return node.content.map(extractText).join('')
  }

  return ''
}

/**
 * Convert text to URL-friendly slug
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
