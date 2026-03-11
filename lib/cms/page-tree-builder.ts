import type { Root, Node, Folder } from 'fumadocs-core/page-tree'
import type { DocParent } from './support-docs'

/**
 * Build a Fumadocs PageTree from Supabase parents → categories → docs
 * 3-level hierarchy: Root → Parent Folders → Category Folders → Doc Pages
 */
export function buildPageTree(parents: DocParent[]): Root {
  const children: Node[] = parents
    .map((parent) => {
      const categoryFolders: Node[] = parent.categories
        .map((category) => {
          const indexDoc = category.docs.find((d) => d.slug === 'index')
          const otherDocs = category.docs.filter((d) => d.slug !== 'index')

          const categoryFolder: Folder = {
            type: 'folder',
            name: category.title,
            index: indexDoc
              ? {
                  type: 'page',
                  name: category.title,
                  url: `/client-keeper-crm/support/${parent.slug}/${category.slug}`,
                }
              : undefined,
            children: otherDocs.map((doc) => ({
              type: 'page',
              name: doc.title,
              url: `/client-keeper-crm/support/${parent.slug}/${category.slug}/${doc.slug}`,
            })),
          }

          return categoryFolder
        })

      const parentFolder: Folder = {
        type: 'folder',
        name: parent.title,
        children: categoryFolders,
      }

      return parentFolder
    })

  return {
    name: 'Support',
    children,
  }
}

/**
 * Build a simpler navigation structure for custom rendering
 * 3-level: Parent → Category → Doc
 */
export interface NavItem {
  title: string
  href: string
  items?: NavItem[]
}

export function buildNavigation(parents: DocParent[]): NavItem[] {
  return parents
    .map((parent) => ({
      title: parent.title,
      href: `/client-keeper-crm/support/${parent.slug}`,
      items: parent.categories
        .map((category) => {
          const otherDocs = category.docs.filter((d) => d.slug !== 'index')

          return {
            title: category.title,
            href: `/client-keeper-crm/support/${parent.slug}/${category.slug}`,
            items: otherDocs.map((doc) => ({
              title: doc.title,
              href: `/client-keeper-crm/support/${parent.slug}/${category.slug}/${doc.slug}`,
            })),
          }
        }),
    }))
}
