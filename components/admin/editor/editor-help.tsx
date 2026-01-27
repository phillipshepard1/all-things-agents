'use client'

import { useState } from 'react'
import { HelpCircle, X } from 'lucide-react'

const blockTypes = [
  { name: 'Image', description: 'Upload images or GIFs from your computer' },
  { name: 'Video', description: 'Embed videos from YouTube, Vimeo, or Loom' },
  { name: 'Info', description: 'Blue callout box for important information' },
  { name: 'Warning', description: 'Yellow callout box for warnings' },
  { name: 'Tip', description: 'Green callout box for helpful tips' },
  { name: 'H1/H2/H3', description: 'Headings of different sizes' },
  { name: 'Bullets', description: 'Create an unordered bullet list' },
  { name: 'Numbers', description: 'Create an ordered numbered list' },
  { name: 'Quote', description: 'Add a styled block quote' },
  { name: 'Code', description: 'Add a code block with syntax highlighting' },
]

export function EditorHelp() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
        title="Editor help"
      >
        <HelpCircle className="h-4 w-4" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Tooltip */}
          <div className="absolute right-0 top-full mt-2 z-50 w-80 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
              <span className="font-medium text-gray-900 text-sm">Block Types</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-3 max-h-72 overflow-y-auto space-y-2">
              {blockTypes.map((item) => (
                <div
                  key={item.name}
                  className="flex items-start gap-3 px-2 py-1.5"
                >
                  <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded min-w-fit">
                    {item.name}
                  </span>
                  <span className="text-xs text-gray-600">{item.description}</span>
                </div>
              ))}
            </div>

            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Click any button in the toolbar above to insert a block at your cursor position.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
