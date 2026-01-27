'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Menu,
  X,
  LayoutDashboard,
  FileText,
  BookOpen,
  DollarSign,
  MessageSquareQuote,
  Sparkles,
  Settings,
  LogOut,
} from 'lucide-react'
import { logout } from '@/app/login/actions'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Support Docs', href: '/admin/docs', icon: FileText },
  { name: 'Blog Posts', href: '/admin/blog', icon: BookOpen },
  { name: 'Pricing', href: '/admin/pricing', icon: DollarSign },
  { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquareQuote },
  { name: 'Features', href: '/admin/features', icon: Sparkles },
]

interface AdminHeaderProps {
  user: {
    email: string
    full_name?: string
    role: string
  }
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile header */}
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-6 w-6" />
        </button>
        <div className="flex-1 text-sm font-semibold leading-6 text-[#300092]">
          Client Keeper Admin
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="relative z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-gray-900/80"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu panel */}
          <div className="fixed inset-0 flex">
            <div className="relative mr-16 flex w-full max-w-xs flex-1">
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button
                  type="button"
                  className="-m-2.5 p-2.5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>

              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                {/* Logo */}
                <div className="flex h-16 shrink-0 items-center">
                  <Link href="/admin" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#7a36dd] rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">CK</span>
                    </div>
                    <span className="font-semibold text-[#300092]">Admin</span>
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

                          return (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`
                                  group flex gap-x-3 rounded-lg p-2 text-sm font-medium leading-6 transition-colors
                                  ${isActive
                                    ? 'bg-purple-50 text-[#7a36dd]'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-[#7a36dd]'
                                  }
                                `}
                              >
                                <item.icon
                                  className={`h-5 w-5 shrink-0 ${isActive ? 'text-[#7a36dd]' : 'text-gray-400'}`}
                                />
                                {item.name}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </li>

                    <li className="mt-auto">
                      <Link
                        href="/admin/settings"
                        onClick={() => setMobileMenuOpen(false)}
                        className="group flex gap-x-3 rounded-lg p-2 text-sm font-medium leading-6 text-gray-700 hover:bg-gray-50"
                      >
                        <Settings className="h-5 w-5 shrink-0 text-gray-400" />
                        Settings
                      </Link>

                      <form action={logout}>
                        <button
                          type="submit"
                          className="group flex w-full gap-x-3 rounded-lg p-2 text-sm font-medium leading-6 text-gray-700 hover:bg-red-50 hover:text-red-600"
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
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {user.full_name || user.email}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
