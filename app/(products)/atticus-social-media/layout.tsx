import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Atticus | Social Media Simplified for Real Estate',
  description: 'Schedule once, publish everywhere. More time for what matters—showing homes and building relationships.',
};

export default function AtticusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
