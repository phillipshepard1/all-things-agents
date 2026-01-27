import type { JSONContent } from 'novel'

export interface GuideImportResult {
  title: string
  description: string
  videoUrl: string | null
  content: JSONContent
}

/**
 * Parse Guide's Markdown export format and convert to TipTap JSON
 */
export function parseGuideMarkdown(markdown: string): GuideImportResult {
  const lines = markdown.split('\n')

  let title = ''
  let description = ''
  let videoUrl: string | null = null

  // Track parsing state
  let titleFound = false
  let descriptionFound = false
  let foundContentStart = false

  // Content nodes for TipTap
  const contentNodes: JSONContent[] = []

  // Buffer for collecting step content
  let currentStepContent: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmedLine = line.trim()
    const nextLine = i < lines.length - 1 ? lines[i + 1]?.trim() : ''

    // Skip empty lines at the start
    if (!titleFound && trimmedLine === '') continue

    // Extract title from setext-style H1: [Title](url) followed by ===
    // Guide format: [Title Text](url)\n====
    if (!titleFound) {
      const linkMatch = trimmedLine.match(/^\[([^\]]+)\]\([^)]+\)$/)
      if (linkMatch && nextLine && /^=+$/.test(nextLine)) {
        title = linkMatch[1]
        titleFound = true
        i++ // Skip the === line
        continue
      }

      // Also try: plain text followed by ===
      if (nextLine && /^=+$/.test(nextLine) && !trimmedLine.startsWith('#') && !trimmedLine.startsWith('!')) {
        title = trimmedLine
        titleFound = true
        i++ // Skip the === line
        continue
      }

      // Extract title from first H2 (fallback)
      if (trimmedLine.startsWith('## ')) {
        title = trimmedLine.slice(3).trim()
        titleFound = true
        continue
      }
    }

    // Extract video URL from "Click here to watch" link
    const watchMatch = trimmedLine.match(/\[Click here to watch\]\(([^)]+)\)/)
    if (watchMatch) {
      videoUrl = watchMatch[1]
      continue
    }

    // Skip "Powered by guidde" footer and related links
    if (trimmedLine.includes('Powered by') && trimmedLine.includes('guidde')) continue
    if (trimmedLine.toLowerCase().includes('powered by') && trimmedLine.toLowerCase().includes('guidde')) continue
    if (trimmedLine === '---') continue // Skip horizontal rules often used before footer

    // Skip cover image H3: ### [![Quick guidde](image)](link)
    if (trimmedLine.startsWith('### ') && trimmedLine.includes('[![')) continue

    // Extract description (first non-empty paragraph after title)
    if (titleFound && !descriptionFound && trimmedLine !== '') {
      // Skip if it's a heading, image, or link-only line
      if (!trimmedLine.startsWith('#') &&
          !trimmedLine.startsWith('![') &&
          !trimmedLine.startsWith('[![') &&
          !trimmedLine.match(/^\[.+\]\(.+\)$/)) {
        description = trimmedLine
        descriptionFound = true
        continue
      }
    }

    // Skip lines until we've found description
    if (!descriptionFound) continue

    // Mark that we're in content area
    foundContentStart = true

    // Handle H3 headers (steps) - clean up numbered format like "1\. Step Name"
    if (trimmedLine.startsWith('### ')) {
      // Flush previous step content
      if (currentStepContent.length > 0) {
        const mergedContent = mergeFragmentedSentences(currentStepContent)
        addContentNode(contentNodes, mergedContent)
        currentStepContent = []
      }

      // Get step title and clean it up
      let stepTitle = trimmedLine.slice(4).trim()
      // Remove numbered prefix like "1\. " or "1. "
      stepTitle = stepTitle.replace(/^\d+\\?\.\s*/, '')

      // Skip if it's an image link (cover image)
      if (stepTitle.startsWith('[![') || stepTitle.startsWith('![')) continue

      contentNodes.push({
        type: 'heading',
        attrs: { level: 3 },
        content: [{ type: 'text', text: stepTitle }]
      })
      continue
    }

    // Handle images - skip for now to test basic content
    // TODO: Re-enable images after debugging editor issue
    if (trimmedLine.startsWith('![') && !trimmedLine.startsWith('[![')) {
      // Skip images for now
      continue
    }

    // Skip linked images (cover images): [![alt](img)](link)
    if (trimmedLine.startsWith('[![')) continue

    // Handle H2 headers (sections after the title)
    if (trimmedLine.startsWith('## ')) {
      // Flush previous step content
      if (currentStepContent.length > 0) {
        const mergedContent = mergeFragmentedSentences(currentStepContent)
        addContentNode(contentNodes, mergedContent)
        currentStepContent = []
      }

      const sectionTitle = trimmedLine.slice(3).trim()
      contentNodes.push({
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: sectionTitle }]
      })
      continue
    }

    // Collect regular paragraph text
    if (trimmedLine !== '' && foundContentStart) {
      currentStepContent.push(trimmedLine)
    } else if (trimmedLine === '' && currentStepContent.length > 0) {
      // Empty line marks end of paragraph
      const mergedContent = mergeFragmentedSentences(currentStepContent)
      addContentNode(contentNodes, mergedContent)
      currentStepContent = []
    }
  }

  // Flush any remaining content
  if (currentStepContent.length > 0) {
    const mergedContent = mergeFragmentedSentences(currentStepContent)
    addContentNode(contentNodes, mergedContent)
  }

  return {
    title,
    description,
    videoUrl,
    content: {
      type: 'doc',
      content: contentNodes.length > 0 ? contentNodes : [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: '' }]
        }
      ]
    }
  }
}

/**
 * Merge fragmented sentences that were split across lines
 * Detects when a line doesn't end with sentence-ending punctuation
 * and the next line starts with lowercase
 */
function mergeFragmentedSentences(lines: string[]): string {
  if (lines.length === 0) return ''
  if (lines.length === 1) return lines[0]

  const result: string[] = []
  let buffer = ''

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    const nextLine = i < lines.length - 1 ? lines[i + 1].trim() : null

    if (buffer) {
      // Check if this line continues the previous fragment
      const startsLowercase = /^[a-z]/.test(line)
      if (startsLowercase) {
        buffer += ' ' + line
      } else {
        result.push(buffer)
        buffer = line
      }
    } else {
      buffer = line
    }

    // Check if this line is a fragment (doesn't end with sentence-ending punctuation)
    const endsWithPunctuation = /[.!?:"]$/.test(buffer)
    const nextStartsLowercase = nextLine && /^[a-z]/.test(nextLine)

    // If line ends properly OR next line starts with uppercase, flush buffer
    if (endsWithPunctuation || (nextLine && !nextStartsLowercase)) {
      if (!nextStartsLowercase && buffer) {
        result.push(buffer)
        buffer = ''
      }
    }
  }

  // Flush any remaining buffer
  if (buffer) {
    result.push(buffer)
  }

  return result.join(' ')
}

/**
 * Add a paragraph node with the given text to content nodes
 * Handles inline formatting like bold and links
 */
function addContentNode(contentNodes: JSONContent[], text: string): void {
  if (!text.trim()) return

  const inlineContent = parseInlineFormatting(text)

  contentNodes.push({
    type: 'paragraph',
    content: inlineContent
  })
}

/**
 * Parse inline markdown formatting (bold, italic, links)
 */
function parseInlineFormatting(text: string): JSONContent[] {
  const nodes: JSONContent[] = []
  let remaining = text

  // Regex patterns for inline formatting
  const patterns = [
    // Bold: **text** or __text__
    { regex: /\*\*([^*]+)\*\*/, mark: 'bold' },
    { regex: /__([^_]+)__/, mark: 'bold' },
    // Italic: *text* or _text_
    { regex: /(?<!\*)\*([^*]+)\*(?!\*)/, mark: 'italic' },
    { regex: /(?<!_)_([^_]+)_(?!_)/, mark: 'italic' },
    // Links: [text](url)
    { regex: /\[([^\]]+)\]\(([^)]+)\)/, mark: 'link' },
    // Inline code: `code`
    { regex: /`([^`]+)`/, mark: 'code' },
  ]

  while (remaining.length > 0) {
    let earliestMatch: { index: number; length: number; content: string; mark: string; href?: string } | null = null

    for (const pattern of patterns) {
      const match = remaining.match(pattern.regex)
      if (match && match.index !== undefined) {
        if (!earliestMatch || match.index < earliestMatch.index) {
          earliestMatch = {
            index: match.index,
            length: match[0].length,
            content: match[1],
            mark: pattern.mark,
            href: pattern.mark === 'link' ? match[2] : undefined
          }
        }
      }
    }

    if (earliestMatch) {
      // Add text before the match
      if (earliestMatch.index > 0) {
        nodes.push({
          type: 'text',
          text: remaining.slice(0, earliestMatch.index)
        })
      }

      // Add the formatted text
      const node: JSONContent = {
        type: 'text',
        text: earliestMatch.content
      }

      if (earliestMatch.mark === 'link' && earliestMatch.href) {
        node.marks = [{
          type: 'link',
          attrs: { href: earliestMatch.href, target: '_blank' }
        }]
      } else if (earliestMatch.mark === 'code') {
        node.marks = [{ type: 'code' }]
      } else {
        node.marks = [{ type: earliestMatch.mark }]
      }

      nodes.push(node)

      remaining = remaining.slice(earliestMatch.index + earliestMatch.length)
    } else {
      // No more matches, add remaining text
      if (remaining) {
        nodes.push({
          type: 'text',
          text: remaining
        })
      }
      break
    }
  }

  return nodes.length > 0 ? nodes : [{ type: 'text', text: text }]
}
