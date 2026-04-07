import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight, FolderOpen } from 'lucide-react'
import { createPublicClient } from '@/lib/pocketbase/public'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { JsonLd, generateCollectionPageSchema } from '@/components/seo/JsonLd'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://clientkeeper.io'

export const metadata: Metadata = {
  title: 'Real Estate CRM Blog | Client Keeper',
  description: 'Tips, tutorials, and insights for managing your client relationships and growing your real estate business with Client Keeper CRM.',
  alternates: {
    canonical: `${baseUrl}/client-keeper-crm/blog`,
  },
  openGraph: {
    title: 'Real Estate CRM Blog | Client Keeper',
    description: 'Tips, tutorials, and insights for managing your client relationships and growing your real estate business.',
    url: `${baseUrl}/client-keeper-crm/blog`,
    siteName: 'Client Keeper',
    type: 'website',
    images: [
      {
        url: '/og/client-keeper.png',
        width: 1200,
        height: 630,
        alt: 'Client Keeper Blog - Real Estate CRM Tips',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Real Estate CRM Blog | Client Keeper',
    description: 'Tips and insights for growing your real estate business with Client Keeper CRM.',
    images: ['/og/client-keeper.png'],
  },
}

interface Category {
  id: string
  slug: string
  title: string
  icon: string | null
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

export default async function BlogPage() {
  const pb = createPublicClient()

  // Fetch posts with their categories
  let posts: BlogPost[] = []
  try {
    posts = await pb.collection('blog_posts').getFullList<BlogPost>({
      filter: 'status = "published"',
      sort: '-published_at',
      expand: 'category_id',
    })
  } catch {
    // Silently fail if database is unavailable
  }

  // Fetch all active categories for filter
  let categories: Category[] = []
  try {
    categories = await pb.collection('blog_categories').getFullList<Category>({
      filter: 'is_active = true',
      sort: 'sort_order',
    })
  } catch {
    // Silently fail if database is unavailable
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

  const blogSchema = generateCollectionPageSchema({
    name: 'Client Keeper Blog',
    description: 'Tips, tutorials, and insights for managing your client relationships and growing your real estate business.',
    url: `${baseUrl}/client-keeper-crm/blog`,
  })

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <JsonLd data={blogSchema} />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 font-[family-name:var(--font-outfit)]">
              Blog
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Tips, tutorials, and insights for managing your client relationships effectively.
            </p>
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
                  className="px-4 py-1.5 bg-purple-100 text-purple-700 text-sm rounded-full font-medium"
                >
                  All
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/blog/category/${category.slug}`}
                    className="px-4 py-1.5 bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 text-sm rounded-full transition-colors"
                  >
                    {category.icon && <span className="mr-1">{category.icon}</span>}
                    {category.title}
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
                {posts.map((post, index) => {
                  const category = post.expand?.category_id || null
                  return (
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
                          {category && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-purple-100 text-purple-700 rounded-full font-medium">
                              {category.icon && (
                                <span>{category.icon}</span>
                              )}
                              {category.title}
                            </span>
                          )}
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
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <FolderOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  No posts yet
                </h2>
                <p className="text-gray-600">
                  Check back soon for new articles!
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
