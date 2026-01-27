import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AuthRedirectHandler } from "@/components/auth/auth-redirect-handler";
import { Hero } from "@/components/sections/hero";
import { SocialProof } from "@/components/sections/social-proof";
import { FeaturesGrid } from "@/components/sections/features-grid";
import { MyraSection } from "@/components/sections/myra-section";
import { DesktopShowcase } from "@/components/sections/desktop-showcase";
import { Benefits } from "@/components/sections/benefits";
import { TestimonialsMarquee } from "@/components/sections/testimonials-marquee";
import { DetailedFeatures } from "@/components/sections/detailed-features";
import { Pricing } from "@/components/sections/pricing";
import { FinalCTA } from "@/components/sections/final-cta";
import { ActivityFeed } from "@/components/ui/activity-feed";
import {
  JsonLd,
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateSoftwareApplicationSchema,
  generateFAQSchema,
} from "@/components/seo/JsonLd";

// Homepage SEO metadata
export const metadata: Metadata = {
  title: "Client Keeper CRM | Real Estate CRM Without the Tech Overwhelm",
  description:
    "Manage your clients, close more deals, and grow your real estate business with Client Keeper - the AI-powered CRM built specifically for agents. Features MYRA AI assistant, automated follow-ups, and transaction tracking.",
  keywords: [
    "real estate CRM",
    "CRM for real estate agents",
    "real estate agent software",
    "client management",
    "real estate follow-up",
    "MYRA AI",
    "real estate tools",
    "lead management",
  ],
  alternates: {
    canonical: "https://clientkeeper.io",
  },
  openGraph: {
    title: "Client Keeper CRM | Real Estate CRM Without the Tech Overwhelm",
    description:
      "AI-powered CRM built specifically for real estate agents. Manage clients, automate follow-ups, and close more deals with MYRA AI assistant.",
    url: "https://clientkeeper.io",
    siteName: "Client Keeper",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Client Keeper CRM - Real Estate CRM Without the Tech Overwhelm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Keeper CRM | Real Estate CRM Without the Tech Overwhelm",
    description:
      "AI-powered CRM built specifically for real estate agents. Features MYRA AI assistant for effortless data entry.",
    images: ["/og-image.png"],
  },
};

// FAQ data for schema markup (helps with AI search visibility)
const homepageFAQs = [
  {
    question: "What is Client Keeper?",
    answer:
      "Client Keeper is an AI-powered CRM (Customer Relationship Management) software built specifically for real estate agents. It features MYRA, an AI assistant that handles data entry through voice and text, automated follow-up reminders, birthday and anniversary alerts, transaction tracking, and a full mobile app.",
  },
  {
    question: "How much does Client Keeper cost?",
    answer:
      "Client Keeper costs $19 per month when billed annually (20% savings) or $24 per month when billed monthly. All plans include full access to MYRA AI, unlimited contacts, mobile app access, and priority support. A free 30-day trial is available with no credit card required.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes, Client Keeper offers a free 30-day trial with full access to all features. No credit card is required to start your trial, and you can cancel anytime.",
  },
  {
    question: "What makes Client Keeper different from other CRMs?",
    answer:
      "Client Keeper is built specifically for real estate agents, not adapted from a generic CRM. The key differentiator is MYRA, our AI assistant that handles data entry through voice memos and text - just tell MYRA about your client interaction and she automatically updates your CRM. This means you spend less time on data entry and more time closing deals.",
  },
  {
    question: "Does Client Keeper have a mobile app?",
    answer:
      "Yes, Client Keeper has full-featured mobile apps for both iOS and Android. You can access all your client data, record voice memos for MYRA, receive follow-up reminders, and manage transactions from anywhere.",
  },
];

export default function Home() {
  // Combine all schemas for the homepage
  const schemas = {
    "@context": "https://schema.org",
    "@graph": [
      generateOrganizationSchema(),
      generateWebsiteSchema(),
      generateSoftwareApplicationSchema(),
      generateFAQSchema(homepageFAQs),
    ],
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Structured Data for SEO */}
      <JsonLd data={schemas} />

      {/* Handle auth redirects (password reset) */}
      <AuthRedirectHandler />

      <Header />
      <main className="flex-1">
        <Hero />
        <SocialProof />
        <FeaturesGrid />
        <MyraSection />
        <DesktopShowcase />
        <DetailedFeatures />
        <Benefits />
        <TestimonialsMarquee />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
      <ActivityFeed />
    </div>
  );
}
