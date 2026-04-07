import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Calendar, Clock, ArrowRight, ArrowLeft, FolderOpen } from 'lucide-react'
import { createPublicClient } from '@/lib/pocketbase/public'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { JsonLd, generateBreadcrumbSchema } from '@/components/seo/JsonLd'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://clientkeeper.io'

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const pb = createPublicClient()

  try {
    const category = await pb.collection('blog_categories').getFirstListItem(
      `slug = "${params.slug}" && is_active = true`,
      { fields: 'title,description' }
    )

    const description = category.description || `Browse ${category.title} articles on the Client Keeper blog.`

    return {
      title: `${category.title} | Client Keeper Blog`,
      description,
      alternates: {
        canonical: `${baseUrl}/blog/category/${params.slug}`,
      },
      openGraph: {
        title: `${category.title} | Client Keeper Blog`,
        description,
        url: `${baseUrl}/blog/category/${params.slug}`,
        siteName: 'Client Keeper',
        type: 'website',
      },
    }
  } catch {
    return {
      title: 'Category Not Found | Client Keeper Blog',
    }
  }
}

interface Category {
  id: string
  slug: string
  title: string
  icon: string | null
  description: string | null
}

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  featured_image: string | null
  content: string
  tags: string[] | null
  published_at: string | null
  category_id: string | null
  expand?: {
    category_id?: Category
  }
}

export default async function BlogCategoryPage(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const pb = createPublicClient()

  // Fetch the category
  let category: Category
  try {
    category = await pb.collection('blog_categories').getFirstListItem<Category>(
      `slug = "${params.slug}" && is_active = true`
    )
  } catch {
    notFound()
  }

  // Fetch posts in this category
  let posts: BlogPost[] = []
  try {
    posts = await pb.collection('blog_posts').getFullList<BlogPost>({
      filter: `status = "published" && category_id = "${category.id}"`,
      sort: '-published_at',
      expand: 'category_id',
    })
  } catch {
    // Silently fail
  }

  // Fetch all active categories for filter
  let categories: Category[] = []
  try {
    categories = await pb.collection('blog_categories').getFullList<Category>({
      filter: 'is_active = true',
      sort: 'sort_order',
    })
  } catch {
    // Silently fail
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const estimateReadTime = (content: string) => {
    try {
      const parsed = JSON.parse(content)
      const text = JSON.stringify(parsed)
      const words = text.split(/\s+/).length
      return Math.max(1, Math.ceil(words / 200))
    } catch {
      return 3
    }
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Blog', url: `${baseUrl}/client-keeper-crm/blog` },
    { name: category.title, url: `${baseUrl}/client-keeper-crm/blog/category/${params.slug}` },
  ])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <JsonLd data={breadcrumbSchema} />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#7a36dd] hover:text-[#6b2cc4] mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              All Posts
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 font-[family-name:var(--font-outfit)]">
              {category.icon && <span className="mr-2">{category.icon}</span>}
              {category.title}
            </h1>
            {category.description && (
              <p className="mt-4 text-xl text-gray-600">
                {category.description}
              </p>
            )}
          </div>
        </section>

        {/* Categories Filter */}
        {categories && categories.length > 0 && (
          <section className="py-6 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-500 mr-2">Categories:</span>
                <Link
                  href="/blog"
                  className="px-4 py-1.5 bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 text-sm rounded-full transition-colors"
                >
                  All
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/blog/category/${cat.slug}`}
                    className={`px-4 py-1.5 text-sm rounded-full transition-colors ${
                      cat.slug === params.slug
                        ? 'bg-purple-100 text-purple-700 font-medium'
                        : 'bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700'
                    }`}
                  >
                    {cat.icon && <span className="mr-1">{cat.icon}</span>}
                    {cat.title}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Blog Posts */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {posts && posts.length > 0 ? (
              <div className="space-y-12">
                {posts.map((post, index) => (
                  <article
                    key={post.id}
                    className={`${index !== 0 ? 'pt-12 border-t border-gray-200' : ''}`}
                  >
                    <Link href={`/blog/${post.slug}`} className="group block">
                      {post.featured_image && (
                        <div className="relative aspect-[2/1] overflow-hidden rounded-xl mb-6">
                          <Image
                            src={post.featured_image}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 768px"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}

                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3">
                        {post.published_at && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(post.published_at)}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {estimateReadTime(post.content)} min read
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 group-hover:text-[#7a36dd] transition-colors font-[family-name:var(--font-outfit)]">
                        {post.title}
                      </h2>

                      {post.excerpt && (
                        <p className="mt-3 text-lg text-gray-600 line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}

                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {post.tags.map((tag: string, i: number) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-4 inline-flex items-center gap-2 text-[#7a36dd] font-medium group-hover:gap-3 transition-all">
                        Read more
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <FolderOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  No posts in this category
                </h2>
                <p className="text-gray-600 mb-6">
                  Check back soon for new articles!
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-[#7a36dd] hover:text-[#6b2cc4] font-medium transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  View all posts
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
