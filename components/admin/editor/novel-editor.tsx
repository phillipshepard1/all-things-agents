'use client'

import {
  EditorRoot,
  EditorContent,
  type JSONContent,
} from 'novel'
import { useState, useRef } from 'react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { CustomImage, uploadImage, Callout, Video, getEmbedUrl, isDirectVideoUrl } from '@/lib/editor/extensions'
import { EditorHelp } from './editor-help'
import { GuideImportModal } from './guide-import-modal'
import { MediaSourceModal } from './media-source-modal'
import { MediaPickerModal } from '../media/media-picker-modal'
import type { GuideImportResult } from '@/lib/editor/guide-markdown-parser'
import {
  Image as ImageIcon,
  Video as VideoIcon,
  Info,
  AlertTriangle,
  Lightbulb,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  FileUp,
} from 'lucide-react'
import './novel-editor.css'

interface NovelEditorProps {
  initialContent?: JSONContent | null
  onChange: (content: JSONContent) => void
  onGuideImport?: (data: GuideImportResult) => void
}

// Extensions array - type cast needed due to version mismatch between novel's bundled TipTap and standalone extensions
const extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
    },
  }),
  Placeholder.configure({
    placeholder: 'Start writing your content...',
  }),
  CustomImage,
  Callout,
  Video,
] as any[]

// Block toolbar items
const blockItems = [
  {
    id: 'image',
    label: 'Image',
    icon: ImageIcon,
    description: 'Upload image or GIF',
  },
  {
    id: 'video',
    label: 'Video',
    icon: VideoIcon,
    description: 'YouTube, Vimeo, Loom',
  },
  {
    id: 'info',
    label: 'Info',
    icon: Info,
    description: 'Info callout',
  },
  {
    id: 'warning',
    label: 'Warning',
    icon: AlertTriangle,
    description: 'Warning callout',
  },
  {
    id: 'tip',
    label: 'Tip',
    icon: Lightbulb,
    description: 'Tip callout',
  },
  {
    id: 'h1',
    label: 'H1',
    icon: Heading1,
    description: 'Large heading',
  },
  {
    id: 'h2',
    label: 'H2',
    icon: Heading2,
    description: 'Medium heading',
  },
  {
    id: 'h3',
    label: 'H3',
    icon: Heading3,
    description: 'Small heading',
  },
  {
    id: 'bullet',
    label: 'Bullets',
    icon: List,
    description: 'Bullet list',
  },
  {
    id: 'number',
    label: 'Numbers',
    icon: ListOrdered,
    description: 'Numbered list',
  },
  {
    id: 'quote',
    label: 'Quote',
    icon: Quote,
    description: 'Block quote',
  },
  {
    id: 'code',
    label: 'Code',
    icon: Code,
    description: 'Code block',
  },
]

export function NovelEditor({ initialContent, onChange, onGuideImport }: NovelEditorProps) {
  const [content, setContent] = useState<JSONContent | undefined>(
    initialContent || undefined
  )
  const editorRef = useRef<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showGuideImport, setShowGuideImport] = useState(false)
  const [showMediaSource, setShowMediaSource] = useState(false)
  const [mediaSourceType, setMediaSourceType] = useState<'image' | 'video'>('image')
  const [showMediaPicker, setShowMediaPicker] = useState(false)
  const [mediaPickerType, setMediaPickerType] = useState<'image' | 'video'>('image')

  const handleImageUpload = async (file: File) => {
    if (!editorRef.current) return

    try {
      const url = await uploadImage(file)
      editorRef.current.chain().focus().setImage({ src: url }).run()
    } catch (error) {
      console.error('Failed to upload image:', error)
      alert('Failed to upload image. Please try again.')
    }
  }

  const handleMediaFromLibrary = (url: string, type: 'image' | 'video') => {
    if (!editorRef.current) return

    const editor = editorRef.current

    if (type === 'image') {
      editor.chain().focus().setImage({ src: url }).run()
    } else {
      // Check if it's a direct video file or an embeddable URL
      if (isDirectVideoUrl(url)) {
        ;(editor.chain().focus() as any).setDirectVideo({ src: url }).run()
      } else {
        const result = getEmbedUrl(url)
        if (result) {
          ;(editor.chain().focus() as any).setVideo({ src: url }).run()
        }
      }
    }
  }

  const insertBlock = (blockId: string) => {
    if (!editorRef.current) return

    const editor = editorRef.current

    switch (blockId) {
      case 'image':
        setMediaSourceType('image')
        setShowMediaSource(true)
        break
      case 'video':
        setMediaSourceType('video')
        setShowMediaSource(true)
        break
      case 'info':
        ;(editor.chain().focus() as any).setCallout({ type: 'info' }).run()
        break
      case 'warning':
        ;(editor.chain().focus() as any).setCallout({ type: 'warning' }).run()
        break
      case 'tip':
        ;(editor.chain().focus() as any).setCallout({ type: 'tip' }).run()
        break
      case 'h1':
        editor.chain().focus().toggleHeading({ level: 1 }).run()
        break
      case 'h2':
        editor.chain().focus().toggleHeading({ level: 2 }).run()
        break
      case 'h3':
        editor.chain().focus().toggleHeading({ level: 3 }).run()
        break
      case 'bullet':
        editor.chain().focus().toggleBulletList().run()
        break
      case 'number':
        editor.chain().focus().toggleOrderedList().run()
        break
      case 'quote':
        editor.chain().focus().toggleBlockquote().run()
        break
      case 'code':
        editor.chain().focus().toggleCodeBlock().run()
        break
    }
  }

  return (
    <div className="novel-editor-wrapper">
      {/* Hidden file input for image uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            handleImageUpload(file)
            e.target.value = ''
          }
        }}
      />

      {/* Block Toolbar */}
      <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium text-gray-500 mr-2">Add Block:</span>
          {blockItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => insertBlock(item.id)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 transition-colors"
              title={item.description}
            >
              <item.icon className="h-3.5 w-3.5" />
              {item.label}
            </button>
          ))}

          {/* Import from Guide button */}
          {onGuideImport && (
            <button
              type="button"
              onClick={() => setShowGuideImport(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-purple-700 bg-purple-50 border border-purple-200 rounded-md hover:bg-purple-100 hover:border-purple-300 transition-colors ml-2"
              title="Import from Guide"
            >
              <FileUp className="h-3.5 w-3.5" />
              Import
            </button>
          )}

          {/* Help icon */}
          <div className="ml-auto">
            <EditorHelp />
          </div>
        </div>
      </div>

      {/* Editor */}
      <EditorRoot>
        <EditorContent
          extensions={extensions}
          initialContent={content}
          onUpdate={({ editor }) => {
            editorRef.current = editor
            const json = editor.getJSON()
            setContent(json)
            onChange(json)
          }}
          onCreate={({ editor }) => {
            editorRef.current = editor
          }}
          className="novel-editor"
        />
      </EditorRoot>

      {/* Guide Import Modal */}
      {onGuideImport && (
        <GuideImportModal
          isOpen={showGuideImport}
          onClose={() => setShowGuideImport(false)}
          onImport={(result) => {
            onGuideImport(result)
            setShowGuideImport(false)
          }}
        />
      )}

      {/* Media Source Modal - Choose Upload or Library */}
      <MediaSourceModal
        isOpen={showMediaSource}
        onClose={() => setShowMediaSource(false)}
        type={mediaSourceType}
        onUpload={() => {
          if (mediaSourceType === 'image') {
            fileInputRef.current?.click()
          } else {
            const url = prompt('Enter video URL (YouTube, Vimeo, or Loom):')
            if (url && editorRef.current) {
              if (isDirectVideoUrl(url)) {
                ;(editorRef.current.chain().focus() as any).setDirectVideo({ src: url }).run()
              } else {
                const result = getEmbedUrl(url)
                if (result) {
                  ;(editorRef.current.chain().focus() as any).setVideo({ src: url }).run()
                } else {
                  alert('Invalid video URL. Please use YouTube, Vimeo, or Loom.')
                }
              }
            }
          }
        }}
        onLibrary={() => {
          setMediaPickerType(mediaSourceType)
          setShowMediaPicker(true)
        }}
      />

      {/* Media Picker Modal - Select from Library */}
      <MediaPickerModal
        isOpen={showMediaPicker}
        onClose={() => setShowMediaPicker(false)}
        onSelect={(url) => {
          handleMediaFromLibrary(url, mediaPickerType)
          setShowMediaPicker(false)
        }}
        mediaType={mediaPickerType}
        bucket="support-docs-media"
        folder={mediaPickerType === 'image' ? 'uploads' : 'videos'}
        title={`Select ${mediaPickerType === 'image' ? 'Image' : 'Video'} from Library`}
      />
    </div>
  )
}
