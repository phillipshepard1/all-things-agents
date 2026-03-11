'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Command } from 'cmdk'
import { AnimatePresence, motion } from 'motion/react'
import { FileText, Search } from 'lucide-react'

interface SearchItem {
  id: string
  title: string
  description: string | null
  url: string
}

interface SearchGroup {
  category: string
  categoryName: string
  parentName: string
  items: SearchItem[]
}

export function SearchCommand() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchGroup[]>([])
  const [loading, setLoading] = useState(false)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  // Global Cmd+K / Ctrl+K shortcut + custom event from trigger button
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && open) {
        e.preventDefault()
        setOpen(false)
        return
      }
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    function onOpenSearch() {
      setOpen(true)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('open-search-command', onOpenSearch)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('open-search-command', onOpenSearch)
    }
  }, [open])

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (!query.trim()) {
      setResults([])
      setLoading(false)
      return
    }

    setLoading(true)
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search/docs?q=${encodeURIComponent(query)}`)
        if (!res.ok) {
          console.error('Search API error:', res.status, await res.text())
          setResults([])
          return
        }
        const data = await res.json()
        setResults(data.results || [])
      } catch (err) {
        console.error('Search fetch error:', err)
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 150)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  const handleSelect = useCallback(
    (url: string) => {
      setOpen(false)
      setQuery('')
      setResults([])
      router.push(url)
    },
    [router]
  )

  // Reset state when dialog closes
  useEffect(() => {
    if (!open) {
      setQuery('')
      setResults([])
    }
  }, [open])

  const totalResults = results.reduce((sum, g) => sum + g.items.length, 0)

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Command palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
            onClick={() => setOpen(false)}
          >
            <Command
              shouldFilter={false}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[720px] rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
            >
              {/* Input area */}
              <div className="flex items-center gap-3 border-b border-border px-4">
                <Search className="size-6 shrink-0 text-muted-foreground" />
                <Command.Input
                  value={query}
                  onValueChange={setQuery}
                  placeholder="Search support docs..."
                  className="flex-1 bg-transparent py-5 text-xl text-foreground placeholder:text-muted-foreground outline-none font-[family-name:var(--font-outfit)]"
                />
                <button
                  onClick={() => setOpen(false)}
                  className="shrink-0 rounded-md border border-border bg-muted px-1.5 py-0.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  ESC
                </button>
              </div>

              {/* Results area */}
              <Command.List className="max-h-[480px] overflow-y-auto overscroll-contain p-2 [&_[cmdk-group]+[cmdk-group]]:mt-2">
                {/* Loading state */}
                {loading && query.trim() && (
                  <div className="flex items-center justify-center gap-1.5 py-8">
                    <div className="size-2 rounded-full bg-[#7a36dd] animate-pulse" />
                    <div className="size-2 rounded-full bg-[#7a36dd] animate-pulse [animation-delay:150ms]" />
                    <div className="size-2 rounded-full bg-[#7a36dd] animate-pulse [animation-delay:300ms]" />
                  </div>
                )}

                {/* Empty state */}
                {!loading && query.trim() && totalResults === 0 && (
                  <Command.Empty className="flex flex-col items-center gap-2 py-8 text-muted-foreground">
                    <Search className="size-10 opacity-40" />
                    <p className="text-base">
                      No results found for &ldquo;{query}&rdquo;
                    </p>
                  </Command.Empty>
                )}

                {/* Grouped results */}
                {!loading &&
                  results.map((group) => (
                    <Command.Group
                      key={group.category}
                      heading={
                        <span className="flex items-baseline gap-2 text-lg font-semibold text-foreground normal-case tracking-normal">
                          <span>{group.categoryName}</span>
                          {group.parentName && (
                            <span className="underline underline-offset-2">
                              {group.parentName}
                            </span>
                          )}
                        </span>
                      }
                      className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-[family-name:var(--font-outfit)]"
                    >
                      {group.items.map((item) => (
                        <Command.Item
                          key={item.id}
                          value={item.url}
                          onSelect={() => handleSelect(item.url)}
                          className="flex items-start gap-3 rounded-xl px-3 py-3.5 cursor-pointer transition-colors data-[selected=true]:bg-[#7a36dd]/10 data-[selected=true]:border-l-2 data-[selected=true]:border-l-[#7a36dd] hover:bg-muted/50"
                        >
                          <FileText className="size-5 mt-0.5 shrink-0 text-muted-foreground data-[selected=true]:text-[#7a36dd]" />
                          <div className="min-w-0 flex-1">
                            <p className="text-base font-medium text-foreground truncate">
                              {item.title}
                            </p>
                            {item.description && (
                              <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </Command.Item>
                      ))}
                    </Command.Group>
                  ))}

                {/* Idle state — no query yet */}
                {!query.trim() && !loading && (
                  <div className="flex flex-col items-center gap-2 py-8 text-muted-foreground">
                    <Search className="size-10 opacity-30" />
                    <p className="text-base">Start typing to search...</p>
                  </div>
                )}
              </Command.List>

              {/* Footer */}
              {totalResults > 0 && !loading && (
                <div className="border-t border-border px-4 py-2 text-sm text-muted-foreground">
                  <span>{totalResults} result{totalResults !== 1 ? 's' : ''}</span>
                </div>
              )}
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
