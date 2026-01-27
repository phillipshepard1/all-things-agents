import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import type { ReactNode } from 'react'
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
    >
      {children}
    </DocsLayout>
  )
}
