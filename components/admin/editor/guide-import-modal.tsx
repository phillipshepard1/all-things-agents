'use client'

import { useState } from 'react'
import { X, FileUp, CheckCircle, AlertCircle } from 'lucide-react'
import { parseGuideMarkdown, type GuideImportResult } from '@/lib/editor/guide-markdown-parser'

interface GuideImportModalProps {
  isOpen: boolean
  onClose: () => void
  onImport: (result: GuideImportResult) => void
}

export function GuideImportModal({ isOpen, onClose, onImport }: GuideImportModalProps) {
  const [markdown, setMarkdown] = useState('')
  const [preview, setPreview] = useState<GuideImportResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleParse = () => {
    if (!markdown.trim()) {
      setError('Please paste some markdown content')
      return
    }

    try {
      const result = parseGuideMarkdown(markdown)

      if (!result.title) {
        setError('Could not extract title from markdown. Make sure it has an H2 header (## Title)')
        return
      }

      setPreview(result)
      setError(null)
    } catch (e) {
      setError('Failed to parse markdown content')
      console.error('Parse error:', e)
    }
  }

  const handleImport = () => {
    if (preview) {
      onImport(preview)
      handleClose()
    }
  }

  const handleClose = () => {
    setMarkdown('')
    setPreview(null)
    setError(null)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-xl shadow-xl overflow-hidden flex flex-col m-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FileUp className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Import from Guide</h2>
              <p className="text-sm text-gray-500">Paste your Guide markdown export</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!preview ? (
            <div className="space-y-4">
              <div>
                <label htmlFor="markdown-input" className="block text-sm font-medium text-gray-700 mb-2">
                  Paste Guide Markdown
                </label>
                <textarea
                  id="markdown-input"
                  value={markdown}
                  onChange={(e) => {
                    setMarkdown(e.target.value)
                    setError(null)
                  }}
                  placeholder="Paste your Guide markdown export here..."
                  className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none font-mono text-sm resize-none"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                <p className="font-medium text-gray-700 mb-2">Tips for importing:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Export your Guide doc as Markdown</li>
                  <li>The first H2 header (##) becomes the title</li>
                  <li>The first paragraph becomes the description</li>
                  <li>Video links are automatically extracted</li>
                  <li>Images and formatting are preserved</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                <p className="text-sm text-green-700">Content parsed successfully!</p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Title
                  </label>
                  <p className="text-gray-900 font-medium">{preview.title}</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Description
                  </label>
                  <p className="text-gray-700">{preview.description || <span className="text-gray-400 italic">No description found</span>}</p>
                </div>

                {preview.videoUrl && (
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      Video URL
                    </label>
                    <p className="text-purple-600 text-sm truncate">{preview.videoUrl}</p>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Content Preview
                  </label>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-48 overflow-y-auto">
                    <p className="text-sm text-gray-600">
                      {preview.content.content?.length || 0} content blocks found
                    </p>
                    <ul className="mt-2 text-xs text-gray-500 space-y-1">
                      {preview.content.content?.slice(0, 5).map((node, i) => (
                        <li key={i} className="truncate">
                          • {node.type}: {getNodePreview(node)}
                        </li>
                      ))}
                      {(preview.content.content?.length || 0) > 5 && (
                        <li className="text-gray-400">
                          ... and {(preview.content.content?.length || 0) - 5} more blocks
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          {!preview ? (
            <>
              <button
                onClick={handleClose}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleParse}
                disabled={!markdown.trim()}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Parse Content
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setPreview(null)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleImport}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
              >
                Import Content
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function getNodePreview(node: any): string {
  if (node.type === 'heading' && node.content?.[0]?.text) {
    return node.content[0].text
  }
  if (node.type === 'paragraph' && node.content?.[0]?.text) {
    return node.content[0].text.slice(0, 50) + (node.content[0].text.length > 50 ? '...' : '')
  }
  if (node.type === 'image') {
    return node.attrs?.alt || 'Image'
  }
  return ''
}
