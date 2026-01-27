import type { Root, Node, Folder, Item } from 'fumadocs-core/page-tree'
import type { DocCategory } from './support-docs'

/**
 * Build a Fumadocs PageTree from Supabase categories and docs
 */
export function buildPageTree(categories: DocCategory[]): Root {
  const children: Node[] = categories.map((category) => {
    // Find if there's an index doc for this category
    const indexDoc = category.docs.find((d) => d.slug === 'index')
    const otherDocs = category.docs.filter((d) => d.slug !== 'index')

    const folder: Folder = {
      type: 'folder',
      name: category.title,
      index: indexDoc
        ? {
            type: 'page',
            name: category.title,
            url: `/client-keeper-crm/support/${category.slug}`,
          }
        : undefined,
      children: otherDocs.map((doc) => ({
        type: 'page',
        name: doc.title,
        url: `/client-keeper-crm/support/${category.slug}/${doc.slug}`,
      })),
    }

    return folder
  })

  return {
    name: 'Support',
    children,
  }
}

/**
 * Build a simpler navigation structure for custom rendering
 */
export interface NavItem {
  title: string
  href: string
  items?: NavItem[]
}

export function buildNavigation(categories: DocCategory[]): NavItem[] {
  return categories.map((category) => {
    const indexDoc = category.docs.find((d) => d.slug === 'index')
    const otherDocs = category.docs.filter((d) => d.slug !== 'index')

    return {
      title: category.title,
      href: `/client-keeper-crm/support/${category.slug}`,
      items: otherDocs.map((doc) => ({
        title: doc.title,
        href: `/client-keeper-crm/support/${category.slug}/${doc.slug}`,
      })),
    }
  })
}
