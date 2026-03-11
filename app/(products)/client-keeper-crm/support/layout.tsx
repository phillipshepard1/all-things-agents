import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import type { ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'
import { getPublishedDocs } from '@/lib/cms/support-docs'
import { buildPageTree } from '@/lib/cms/page-tree-builder'
import { SearchCommand } from '@/components/support/search-command'
import { SearchTrigger } from '@/components/support/search-trigger'

export default async function SupportLayout({ children }: { children: ReactNode }) {
  const parents = await getPublishedDocs()
  const pageTree = buildPageTree(parents)

  return (
    <>
      <DocsLayout
        tree={pageTree}
        nav={{
          title: (
            <span className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#a78bfa] transition-colors">
              <ArrowLeft className="size-4" />
              Back to Client Keeper
            </span>
          ),
          url: '/client-keeper-crm',
        }}
        sidebar={{
          banner: (
            <div className="flex flex-col gap-3">
              <span className="px-2 text-2xl font-bold text-foreground">Client Keeper</span>
              <hr className="border-border" />
              <div className="px-1">
                <SearchTrigger />
              </div>
            </div>
          ),
        }}
        searchToggle={{ enabled: false }}
      >
        {children}
      </DocsLayout>
      <SearchCommand />
    </>
  )
}
