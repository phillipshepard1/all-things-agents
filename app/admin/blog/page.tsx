import Link from 'next/link'
import { Plus, BookOpen, Pencil, Eye, Calendar } from 'lucide-react'
import { createClient } from '@/lib/pocketbase/server'
import { getAdminProduct } from '@/lib/products/server'
import { products, type ProductId } from '@/lib/products/config'

function getProductBlogUrl(productId: string | null, postSlug: string): string {
  if (!productId || !(productId in products)) {
    return `/client-keeper-crm/blog/${postSlug}`
  }
  const product = products[productId as ProductId]
  return `/${product.slug}/blog/${postSlug}`
}

export default async function AdminBlogPage() {
  const pb = await createClient()
  const productId = await getAdminProduct()

  // Fetch blog posts filtered by product
  let posts: any[] = []
  let error: string | null = null

  try {
    const filter = productId && productId !== 'hub'
      ? `product_id = "${productId}"`
      : ''

    posts = await pb.collection('blog_posts').getFullList({
      filter,
      sort: '-created',
    })
  } catch (e: any) {
    error = e.message || 'Failed to fetch blog posts'
  }

  // Group posts by status
  const publishedPosts = posts.filter(p => p.status === 'published')
  const draftPosts = posts.filter(p => p.status === 'draft')
  const scheduledPosts = posts.filter(p => p.scheduled_for && new Date(p.scheduled_for) > new Date())

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-outfit)]">
            Blog Posts
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Write and publish blog articles
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#7a36dd] hover:bg-[#6b2cc4] text-white rounded-lg transition-colors text-sm font-medium"
        >
          <Plus className="h-4 w-4" />
          New Post
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-900">{publishedPosts.length}</div>
          <div className="text-sm text-gray-500">Published</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-900">{draftPosts.length}</div>
          <div className="text-sm text-gray-500">Drafts</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-900">{scheduledPosts.length}</div>
          <div className="text-sm text-gray-500">Scheduled</div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="text-sm font-medium text-red-800">Error loading blog posts</h3>
          <p className="mt-1 text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Empty State */}
      {!error && posts.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No blog posts yet</h3>
          <p className="mt-2 text-sm text-gray-500">
            Get started by creating your first blog post.
          </p>
          <Link
            href="/admin/blog/new"
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-[#7a36dd] hover:bg-[#6b2cc4] text-white rounded-lg transition-colors text-sm font-medium"
          >
            <Plus className="h-4 w-4" />
            Create Post
          </Link>
        </div>
      )}

      {/* Posts List */}
      {!error && posts.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-sm font-semibold text-gray-900">
              All Posts
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {posts.length} post{posts.length !== 1 ? 's' : ''}
            </p>
          </div>
          <ul className="divide-y divide-gray-200">
            {posts.map((post: any) => (
              <li key={post.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {post.title}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          post.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : post.status === 'archived'
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {post.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate mt-1">
                      {post.excerpt || 'No excerpt'}
                    </p>
                    <div className="flex items-center gap-4 mt-1">
                      <p className="text-xs text-gray-400">
                        {getProductBlogUrl(post.product_id, post.slug)}
                      </p>
                      {post.published_at && (
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(post.published_at)}
                        </p>
                      )}
                    </div>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {post.tags.slice(0, 3).map((tag: string, i: number) => (
                          <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="text-xs text-gray-400">+{post.tags.length - 3} more</span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    {post.status === 'published' && (
                      <Link
                        href={getProductBlogUrl(post.product_id, post.slug)}
                        target="_blank"
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                    )}
                    <Link
                      href={`/admin/blog/${post.id}`}
                      className="p-2 text-gray-400 hover:text-[#7a36dd] transition-colors"
                      title="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
