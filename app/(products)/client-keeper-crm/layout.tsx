import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: '%s | Client Keeper CRM',
    default: 'Client Keeper CRM | Real Estate CRM Without the Tech Overwhelm',
  },
  description: 'Manage your clients, close more deals, and grow your real estate business with the CRM built specifically for agents like you.',
};

export default function ClientKeeperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
