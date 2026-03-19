import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/home/hero";
import { FeaturesClean } from "@/components/sections/home/features-clean";
import { MyraSpotlight } from "@/components/sections/home/myra-spotlight";
import { SocialProofPricing } from "@/components/sections/home/social-proof-pricing";
import { FinalCtaClean } from "@/components/sections/home/final-cta-clean";
import {
  JsonLd,
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateSoftwareApplicationSchema,
  generateFAQSchema,
} from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Real Estate CRM for Agents | Client Keeper - No Tech Overwhelm",
  description:
    "Manage clients, close deals & grow your real estate business with Client Keeper's AI-powered CRM. MYRA handles follow-ups & transactions automatically.",
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
    title: "Real Estate CRM for Agents | Client Keeper - No Tech Overwhelm",
    description:
      "AI-powered CRM built for real estate agents. Manage clients, automate follow-ups, and close more deals with MYRA AI.",
    url: "https://clientkeeper.io",
    siteName: "Client Keeper",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og/client-keeper.png",
        width: 1200,
        height: 630,
        alt: "Client Keeper CRM - Real Estate CRM Without the Tech Overwhelm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate CRM for Agents | Client Keeper - No Tech Overwhelm",
    description:
      "AI-powered CRM built for real estate agents. MYRA AI handles data entry effortlessly.",
    images: ["/og/client-keeper.png"],
  },
};

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

export default function HomeV2() {
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
      <JsonLd data={schemas} />
      <Header />
      <main className="flex-1">
        <Hero />
        <FeaturesClean />
        <MyraSpotlight />
        <SocialProofPricing />
        <FinalCtaClean />
      </main>
      <Footer />
    </div>
  );
}
