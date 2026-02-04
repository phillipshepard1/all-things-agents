import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WebAppHero } from "@/components/sections/web-app/hero";
import { WebAppFeatures } from "@/components/sections/web-app/features";
import { DashboardPreview } from "@/components/sections/web-app/dashboard-preview";
import { WebAppScreens } from "@/components/sections/web-app/screens";
import { WebMobileComparison } from "@/components/sections/web-app/comparison";
import { WebAppCTA } from "@/components/sections/web-app/cta";
import { StickyBottomCTA } from "@/components/shared/sticky-bottom-cta";
import { JsonLd, generateWebAppSchema } from "@/components/seo/JsonLd";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://clientkeeper.io";

export const metadata: Metadata = {
  title: "Web-Based Real Estate CRM | Client Keeper Dashboard & Features",
  description:
    "Client Keeper Web App | Full-featured real estate CRM accessible from any browser. Dashboard, contact management, pipeline tracking, and AI assistant MYRA.",
  alternates: {
    canonical: `${baseUrl}/client-keeper-crm/web-app`,
  },
  openGraph: {
    title: "Web-Based Real Estate CRM | Client Keeper Dashboard & Features",
    description:
      "Full-featured real estate CRM accessible from any browser. Dashboard, contact management, and AI assistant MYRA.",
    url: `${baseUrl}/client-keeper-crm/web-app`,
    siteName: "Client Keeper",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Client Keeper Web App - Real Estate CRM Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web-Based Real Estate CRM | Client Keeper Dashboard & Features",
    description:
      "Full-featured real estate CRM accessible from any browser with AI assistant MYRA.",
    images: ["/og-image.png"],
  },
};

export default function WebAppPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={generateWebAppSchema()} />
      <Header />
      <main className="flex-1">
        <WebAppHero />
        <WebAppFeatures />
        <DashboardPreview />
        <WebAppScreens />
        <WebMobileComparison />
        <WebAppCTA />
      </main>
      <StickyBottomCTA />
      <Footer />
    </div>
  );
}
