import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getPublishedDocs } from '@/lib/cms/support-docs'
import { buildPageTree } from '@/lib/cms/page-tree-builder'

export default async function SupportLayout({ children }: { children: ReactNode }) {
  const categories = await getPublishedDocs()
  const pageTree = buildPageTree(categories)

  return (
    <DocsLayout
      tree={pageTree}
      nav={{
        title: 'Client Keeper Support',
      }}
      sidebar={{
        banner: (
          <Link
            href="/client-keeper-crm"
            className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-[#7a36dd] transition-colors border-b"
          >
            <ArrowLeft className="size-4" />
            Back to Client Keeper
          </Link>
        ),
      }}
    >
      {children}
    </DocsLayout>
  )
}
