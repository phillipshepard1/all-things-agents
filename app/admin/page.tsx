import Link from 'next/link'
import {
  FileText,
  BookOpen,
  DollarSign,
  MessageSquareQuote,
  Sparkles,
  Plus,
  ArrowRight,
} from 'lucide-react'
import { createClient } from '@/lib/pocketbase/server'

const quickActions = [
  {
    name: 'New Support Doc',
    href: '/admin/docs/new',
    icon: FileText,
    color: 'bg-blue-500',
  },
  {
    name: 'New Blog Post',
    href: '/admin/blog/new',
    icon: BookOpen,
    color: 'bg-green-500',
  },
]

const contentSections = [
  {
    name: 'Support Docs',
    href: '/admin/docs',
    icon: FileText,
    description: 'Manage help articles and documentation',
    color: 'text-blue-600 bg-blue-50',
  },
  {
    name: 'Blog Posts',
    href: '/admin/blog',
    icon: BookOpen,
    description: 'Write and publish blog articles',
    color: 'text-green-600 bg-green-50',
  },
  {
    name: 'Pricing',
    href: '/admin/pricing',
    icon: DollarSign,
    description: 'Update pricing tiers and features',
    color: 'text-amber-600 bg-amber-50',
  },
  {
    name: 'Testimonials',
    href: '/admin/testimonials',
    icon: MessageSquareQuote,
    description: 'Manage customer testimonials',
    color: 'text-purple-600 bg-purple-50',
  },
  {
    name: 'Features',
    href: '/admin/features',
    icon: Sparkles,
    description: 'Edit product features display',
    color: 'text-pink-600 bg-pink-50',
  },
]

export default async function AdminDashboard() {
  const pb = await createClient()

  // Get counts for each content type (will work once collections exist)
  let docCount = 0
  let blogCount = 0
  let testimonialCount = 0

  try {
    const [docs, blogs, testimonials] = await Promise.all([
      pb.collection('support_docs').getList(1, 1),
      pb.collection('blog_posts').getList(1, 1),
      pb.collection('testimonials').getList(1, 1),
    ])

    docCount = docs.totalItems
    blogCount = blogs.totalItems
    testimonialCount = testimonials.totalItems
  } catch {
    // Collections don't exist yet - that's okay
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-outfit)]">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome to the Client Keeper admin panel
        </p>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        {quickActions.map((action) => (
          <Link
            key={action.name}
            href={action.href}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#7a36dd] hover:bg-[#6b2cc4] text-white rounded-lg transition-colors text-sm font-medium"
          >
            <Plus className="h-4 w-4" />
            {action.name}
          </Link>
        ))}
      </div>

      {/* Stats (placeholder until tables exist) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{docCount}</p>
              <p className="text-sm text-gray-500">Support Docs</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{blogCount}</p>
              <p className="text-sm text-gray-500">Blog Posts</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <MessageSquareQuote className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{testimonialCount}</p>
              <p className="text-sm text-gray-500">Testimonials</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 font-[family-name:var(--font-outfit)]">
          Manage Content
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contentSections.map((section) => (
            <Link
              key={section.name}
              href={section.href}
              className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-purple-200 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-lg ${section.color}`}>
                  <section.icon className="h-6 w-6" />
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#7a36dd] transition-colors" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {section.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {section.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}
