import { Metadata } from 'next'

// Prevent invite pages from being indexed
export const metadata: Metadata = {
  title: 'Accept Invitation | Client Keeper',
  description: 'Accept your invitation to join Client Keeper.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function InviteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
