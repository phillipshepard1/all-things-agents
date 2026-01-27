import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Nicole | Beautiful Websites for Real Estate Agents',
  description: 'Stunning websites that showcase your listings and attract new clients.',
};

export default function NicoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
