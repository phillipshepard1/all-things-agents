'use client'

import { Image, Film, Grid2X2, Grid3X3, LayoutList, ChevronDown, Upload } from 'lucide-react'
import { MediaTab, ViewMode } from '@/lib/media/types'
import { useState, useRef, useEffect } from 'react'

interface MediaFiltersProps {
  activeTab: MediaTab
  onTabChange: (tab: MediaTab) => void
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  photosCount: number
  videosCount: number
  onUploadVideo?: () => void
  onUploadPhoto?: () => void
}

const gridOptions: { value: ViewMode; label: string; icon: React.ReactNode }[] = [
  { value: 'grid-2', label: '2 Columns', icon: <Grid2X2 className="h-4 w-4" /> },
  { value: 'grid-3', label: '3 Columns', icon: <Grid3X3 className="h-4 w-4" /> },
  { value: 'grid-4', label: '4 Columns', icon: <Grid3X3 className="h-4 w-4" /> },
]

export function MediaFilters({
  activeTab,
  onTabChange,
  viewMode,
  onViewModeChange,
  photosCount,
  videosCount,
  onUploadVideo,
  onUploadPhoto,
}: MediaFiltersProps) {
  const [isGridDropdownOpen, setIsGridDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsGridDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isGridView = viewMode.startsWith('grid')
  const currentGridOption = gridOptions.find(opt => opt.value === viewMode) || gridOptions[1]

  return (
    <div className="flex items-center justify-between border-b border-gray-200">
      {/* Tabs */}
      <div className="flex">
        <button
          onClick={() => onTabChange('photos')}
          className={`
            group inline-flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors
            ${activeTab === 'photos'
              ? 'border-[#7a36dd] text-[#7a36dd]'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }
          `}
        >
          <Image className="h-4 w-4" />
          Photos
          <span className={`
            text-xs px-2 py-0.5 rounded-full
            ${activeTab === 'photos'
              ? 'bg-purple-100 text-[#7a36dd]'
              : 'bg-gray-100 text-gray-500'
            }
          `}>
            {photosCount}
          </span>
        </button>
        <button
          onClick={() => onTabChange('videos')}
          className={`
            group inline-flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors
            ${activeTab === 'videos'
              ? 'border-[#7a36dd] text-[#7a36dd]'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }
          `}
        >
          <Film className="h-4 w-4" />
          Videos
          <span className={`
            text-xs px-2 py-0.5 rounded-full
            ${activeTab === 'videos'
              ? 'bg-purple-100 text-[#7a36dd]'
              : 'bg-gray-100 text-gray-500'
            }
          `}>
            {videosCount}
          </span>
        </button>
      </div>

      {/* Actions + View Mode Toggle */}
      <div className="flex items-center gap-3 pr-4">
        {activeTab === 'photos' && onUploadPhoto && (
          <button
            onClick={onUploadPhoto}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#7a36dd] hover:bg-[#6b2cc4] rounded-lg transition-colors"
          >
            <Upload className="h-4 w-4" />
            Upload Photo
          </button>
        )}
        {activeTab === 'videos' && onUploadVideo && (
          <button
            onClick={onUploadVideo}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#7a36dd] hover:bg-[#6b2cc4] rounded-lg transition-colors"
          >
            <Upload className="h-4 w-4" />
            Upload Video
          </button>
        )}
        {/* Grid dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsGridDropdownOpen(!isGridDropdownOpen)}
            className={`
              inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors
              ${isGridView
                ? 'bg-purple-100 text-[#7a36dd]'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }
            `}
          >
            {currentGridOption.icon}
            <ChevronDown className="h-3 w-3" />
          </button>

          {isGridDropdownOpen && (
            <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
              {gridOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onViewModeChange(option.value)
                    setIsGridDropdownOpen(false)
                  }}
                  className={`
                    w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors
                    ${viewMode === option.value
                      ? 'bg-purple-50 text-[#7a36dd]'
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  {option.icon}
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* List view button */}
        <button
          onClick={() => onViewModeChange('list')}
          className={`
            inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors
            ${viewMode === 'list'
              ? 'bg-purple-100 text-[#7a36dd]'
              : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
            }
          `}
        >
          <LayoutList className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
