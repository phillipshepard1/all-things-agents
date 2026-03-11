'use client'

import { Search } from 'lucide-react'

export function SearchTrigger() {
  return (
    <button
      onClick={() => document.dispatchEvent(new CustomEvent('open-search-command'))}
      className="flex w-full items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
    >
      <Search className="size-4" />
      <span className="flex-1 text-left">Search docs...</span>
      <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-border bg-card px-1.5 py-0.5 text-[10px] font-medium">
        <span className="text-xs">&#8984;</span>K
      </kbd>
    </button>
  )
}
