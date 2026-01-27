'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Settings,
  LogOut,
} from 'lucide-react'
import { logout } from '@/app/login/actions'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  {
    name: 'Support Docs',
    href: '/admin/docs',
    icon: FileText,
    children: [
      { name: 'All Docs', href: '/admin/docs' },
      { name: 'Categories', href: '/admin/docs/categories' },
      { name: 'Media Library', href: '/admin/docs/media' },
    ]
  },
  {
    name: 'Blog Posts',
    href: '/admin/blog',
    icon: BookOpen,
    children: [
      { name: 'All Posts', href: '/admin/blog' },
      { name: 'Categories', href: '/admin/blog/categories' },
      { name: 'Media Library', href: '/admin/blog/media' },
    ]
  },
]

interface AdminSidebarProps {
  user: {
    email: string
    full_name?: string
    role: string
  }
}

export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center border-b border-gray-100">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#7a36dd] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CK</span>
            </div>
            <span className="font-semibold text-[#300092] font-[family-name:var(--font-outfit)]">
              Admin
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href ||
                    (item.href !== '/admin' && pathname.startsWith(item.href))
                  const hasChildren = 'children' in item && item.children

                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`
                          group flex gap-x-3 rounded-lg p-2 text-sm font-medium leading-6 transition-colors
                          ${isActive
                            ? 'bg-purple-50 text-[#7a36dd]'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-[#7a36dd]'
                          }
                        `}
                      >
                        <item.icon
                          className={`h-5 w-5 shrink-0 ${isActive ? 'text-[#7a36dd]' : 'text-gray-400 group-hover:text-[#7a36dd]'}`}
                        />
                        {item.name}
                      </Link>
                      {hasChildren && isActive && (
                        <ul className="mt-1 ml-7 space-y-1">
                          {item.children.map((child) => {
                            const isChildActive = pathname === child.href
                            return (
                              <li key={child.name}>
                                <Link
                                  href={child.href}
                                  className={`
                                    block rounded-lg px-2 py-1.5 text-sm transition-colors
                                    ${isChildActive
                                      ? 'text-[#7a36dd] font-medium'
                                      : 'text-gray-600 hover:text-[#7a36dd]'
                                    }
                                  `}
                                >
                                  {child.name}
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </li>
                  )
                })}
              </ul>
            </li>

            {/* Settings & Logout at bottom */}
            <li className="mt-auto">
              <Link
                href="/admin/settings"
                className={`
                  group flex gap-x-3 rounded-lg p-2 text-sm font-medium leading-6 transition-colors
                  ${pathname === '/admin/settings'
                    ? 'bg-purple-50 text-[#7a36dd]'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-[#7a36dd]'
                  }
                `}
              >
                <Settings className="h-5 w-5 shrink-0 text-gray-400 group-hover:text-[#7a36dd]" />
                Settings
              </Link>

              <form action={logout}>
                <button
                  type="submit"
                  className="group flex w-full gap-x-3 rounded-lg p-2 text-sm font-medium leading-6 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-5 w-5 shrink-0 text-gray-400 group-hover:text-red-600" />
                  Sign out
                </button>
              </form>
            </li>
          </ul>
        </nav>

        {/* User Info */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center gap-x-3">
            <div className="w-9 h-9 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-[#7a36dd]">
                {user.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.full_name || user.email}
              </p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
