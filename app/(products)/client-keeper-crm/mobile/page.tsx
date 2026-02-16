import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileHero } from "@/components/sections/mobile/hero";
import { MobileFeatures } from "@/components/sections/mobile/features";
import { MobileScreens } from "@/components/sections/mobile/screens";
import { MobileDownload } from "@/components/sections/mobile/download";
import { NotificationsPreview } from "@/components/sections/mobile/notifications-preview";
import { MobileDesktopComparison } from "@/components/sections/mobile/comparison";
import { VoiceDemo } from "@/components/sections/mobile/voice-demo";
import { StickyBottomCTA } from "@/components/shared/sticky-bottom-cta";
import { JsonLd, generateMobileAppSchema } from "@/components/seo/JsonLd";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://clientkeeper.io";

export const metadata: Metadata = {
  title: "Mobile App for Real Estate CRM | Client Keeper iOS & Android",
  description:
    "Take Client Keeper anywhere with our powerful mobile app for iOS and Android. Manage contacts, send voice notes, and never miss a follow-up on the go.",
  alternates: {
    canonical: `${baseUrl}/client-keeper-crm/mobile`,
  },
  openGraph: {
    title: "Mobile App for Real Estate CRM | Client Keeper iOS & Android",
    description:
      "Take Client Keeper anywhere with our powerful mobile app for iOS and Android. Manage contacts, send voice notes, and never miss a follow-up on the go.",
    url: `${baseUrl}/client-keeper-crm/mobile`,
    siteName: "Client Keeper",
    type: "website",
    images: [
      {
        url: "/og/client-keeper.png",
        width: 1200,
        height: 630,
        alt: "Client Keeper Mobile App - CRM for Real Estate Agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile App for Real Estate CRM | Client Keeper iOS & Android",
    description:
      "Take Client Keeper anywhere with our powerful mobile app. Manage contacts and follow-ups on the go.",
    images: ["/og/client-keeper.png"],
  },
};

export default function MobileAppPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={generateMobileAppSchema()} />
      <Header />
      <main className="flex-1">
        <MobileHero />
        <MobileFeatures />
        <NotificationsPreview />
        <MobileScreens />
        <VoiceDemo />
        <MobileDesktopComparison />
        <MobileDownload />
      </main>
      <StickyBottomCTA />
      <Footer />
    </div>
  );
}
