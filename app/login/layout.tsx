import { Metadata } from 'next'

// Prevent login page from being indexed
export const metadata: Metadata = {
  title: 'Login | Client Keeper',
  description: 'Sign in to your Client Keeper admin account.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
