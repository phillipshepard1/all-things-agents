"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const landingPages = [
  { href: "/client-keeper-crm/lp", label: "All Pages" },
  { href: "/client-keeper-crm/lp/follow-up", label: "Follow-Up" },
  { href: "/client-keeper-crm/lp/voice-notes", label: "Voice Notes" },
  { href: "/client-keeper-crm/lp/mobile", label: "Mobile" },
  { href: "/client-keeper-crm/lp/organization", label: "Organization" },
  { href: "/client-keeper-crm/lp/work-life", label: "Work-Life" },
];

export default function LandingPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-2">
          <span className="mr-3 shrink-0 text-xs font-semibold uppercase tracking-wider text-gray-400">
            LP Preview
          </span>
          {landingPages.map((page) => {
            const isActive = pathname === page.href;
            return (
              <Link
                key={page.href}
                href={page.href}
                className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-purple-600 text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {page.label}
              </Link>
            );
          })}
        </div>
      </nav>
      {children}
    </>
  );
}
