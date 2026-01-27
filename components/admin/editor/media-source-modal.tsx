'use client'

import { X, Upload, FolderOpen, Image as ImageIcon, Video as VideoIcon } from 'lucide-react'

interface MediaSourceModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'image' | 'video'
  onUpload: () => void
  onLibrary: () => void
}

export function MediaSourceModal({
  isOpen,
  onClose,
  type,
  onUpload,
  onLibrary,
}: MediaSourceModalProps) {
  if (!isOpen) return null

  const Icon = type === 'image' ? ImageIcon : VideoIcon
  const title = type === 'image' ? 'Add Image' : 'Add Video'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md m-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Icon className="h-5 w-5 text-purple-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-6 text-center">
            Choose how you want to add your {type}
          </p>

          <div className="grid grid-cols-2 gap-4">
            {/* Upload Option */}
            <button
              type="button"
              onClick={() => {
                onUpload()
                onClose()
              }}
              className="flex flex-col items-center gap-3 p-6 border-2 border-gray-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all group"
            >
              <div className="p-3 bg-gray-100 rounded-full group-hover:bg-purple-100 transition-colors">
                <Upload className="h-6 w-6 text-gray-600 group-hover:text-purple-600" />
              </div>
              <div className="text-center">
                <p className="font-medium text-gray-900">Upload</p>
                <p className="text-xs text-gray-500 mt-1">
                  From your computer
                </p>
              </div>
            </button>

            {/* Media Library Option */}
            <button
              type="button"
              onClick={() => {
                onLibrary()
                onClose()
              }}
              className="flex flex-col items-center gap-3 p-6 border-2 border-gray-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all group"
            >
              <div className="p-3 bg-gray-100 rounded-full group-hover:bg-purple-100 transition-colors">
                <FolderOpen className="h-6 w-6 text-gray-600 group-hover:text-purple-600" />
              </div>
              <div className="text-center">
                <p className="font-medium text-gray-900">Media Library</p>
                <p className="text-xs text-gray-500 mt-1">
                  From uploaded files
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="w-full px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
