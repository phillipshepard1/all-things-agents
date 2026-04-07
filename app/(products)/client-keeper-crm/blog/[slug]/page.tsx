import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react'
import { createPublicClient } from '@/lib/pocketbase/public'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { TiptapContent } from '@/components/support/tiptap-content'
import { JsonLd, generateBlogPostSchema, generateBreadcrumbSchema } from '@/components/seo/JsonLd'

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const pb = createPublicClient()

  try {
    const post = await pb.collection('blog_posts').getFirstListItem(
      `slug = "${params.slug}" && status = "published"`,
      { fields: 'title,excerpt,featured_image,meta_description,og_image' }
    )

    const description = post.meta_description || post.excerpt || `Read ${post.title} on the Client Keeper blog.`
    const ogImage = post.og_image || post.featured_image

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://clientkeeper.io'

    return {
      title: `${post.title} | Client Keeper Blog`,
      description,
      alternates: {
        canonical: `${baseUrl}/blog/${params.slug}`,
      },
      openGraph: {
        title: post.title,
        description,
        url: `${baseUrl}/blog/${params.slug}`,
        siteName: 'Client Keeper',
        type: 'article',
        images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: post.title }] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description,
        images: ogImage ? [ogImage] : undefined,
      },
    }
  } catch {
    return {
      title: 'Post Not Found | Client Keeper Blog',
    }
  }
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
  og_image: string | null
  meta_description: string | null
  content: string
  tags: string[] | null
  published_at: string | null
  created: string
  updated: string
  category_id: string | null
  expand?: {
    category_id?: Category
  }
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const pb = createPublicClient()

  let post: BlogPost
  try {
    post = await pb.collection('blog_posts').getFirstListItem<BlogPost>(
      `slug = "${params.slug}" && status = "published"`,
      { expand: 'category_id' }
    )
  } catch {
    notFound()
  }

  const category = post.expand?.category_id || null

  // Parse content from JSON string
  let parsedContent = null
  if (post.content) {
    try {
      parsedContent = typeof post.content === 'string' ? JSON.parse(post.content) : post.content
    } catch {
      parsedContent = null
    }
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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://clientkeeper.io'
  const postUrl = `${baseUrl}/blog/${params.slug}`

  // Generate structured data
  const blogPostSchema = generateBlogPostSchema({
    title: post.title,
    description: post.excerpt || post.meta_description || `Read ${post.title} on the Client Keeper blog.`,
    url: postUrl,
    image: post.featured_image || post.og_image || `${baseUrl}/og/client-keeper.png`,
    datePublished: post.published_at || post.created,
    dateModified: post.updated,
    authorName: 'Client Keeper Team',
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Blog', url: `${baseUrl}/blog` },
    { name: post.title, url: postUrl },
  ])

  const schemas = {
    '@context': 'https://schema.org',
    '@graph': [blogPostSchema, breadcrumbSchema],
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <JsonLd data={schemas} />
      <Header />

      <main className="flex-1">
        {/* Article Header */}
        <article>
          <header className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-50 to-white">
            <div className="max-w-3xl mx-auto">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[#7a36dd] hover:text-[#6b2cc4] mb-8 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 font-[family-name:var(--font-outfit)]">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mt-6 text-gray-500">
                {category && (
                  <Link
                    href={`/blog/category/${category.slug}`}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors"
                  >
                    {category.icon && <span>{category.icon}</span>}
                    {category.title}
                  </Link>
                )}
                {post.published_at && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {formatDate(post.published_at)}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {estimateReadTime(post.content)} min read
                </span>
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {post.tags.map((tag: string, i: number) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          {/* Featured Image */}
          {post.featured_image && (
            <div className="px-4 sm:px-6 lg:px-8 -mt-4 mb-12">
              <div className="max-w-4xl mx-auto">
                <div className="relative aspect-[2/1] overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src={post.featured_image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          )}

          {/* Article Content */}
          <div className="px-4 sm:px-6 lg:px-8 pb-16">
            <div className="max-w-3xl mx-auto prose prose-lg prose-purple">
              {parsedContent ? (
                <TiptapContent content={parsedContent} />
              ) : (
                <p className="text-gray-500 italic">No content available.</p>
              )}
            </div>
          </div>
        </article>

        {/* Back to Blog CTA */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-200">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-outfit)]">
              Enjoyed this article?
            </h2>
            <p className="text-gray-600 mb-6">
              Check out more tips and insights on our blog.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#7a36dd] hover:bg-[#6b2cc4] text-white rounded-lg transition-colors font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
