import type { Metadata } from "next";
import { OrganizationHero } from "@/components/sections/landing/organization-hero";
import { LandingProblem } from "@/components/sections/landing/shared/landing-problem";
import { LandingSolution } from "@/components/sections/landing/shared/landing-solution";
import { LandingHowItWorks } from "@/components/sections/landing/shared/landing-how-it-works";
import { LandingBenefits } from "@/components/sections/landing/shared/landing-benefits";
import { LandingTestimonials } from "@/components/sections/landing/shared/landing-testimonials";
import { LandingFAQ } from "@/components/sections/landing/shared/landing-faq";
import { LandingFinalCTA } from "@/components/sections/landing/shared/landing-final-cta";
import { StickyBottomCTA } from "@/components/shared/sticky-bottom-cta";
import { JsonLd, generateFAQSchema } from "@/components/seo/JsonLd";

// FAQ data for schema markup
const landingFAQs = [
  {
    question: "Will I actually use it?",
    answer: "Unlike complex CRMs, Client Keeper works with how you already communicate—voice notes. If you can talk, you can use it. Most agents are fully up and running in under 20 minutes.",
  },
  {
    question: "Is setup hard?",
    answer: "We handle the heavy lifting. Done-for-you data transfer means your contacts are imported automatically. No spreadsheet headaches.",
  },
  {
    question: "Will it work on my phone?",
    answer: "Built mobile-first. Most of our users manage their entire business from their phone, between showings, in the car, wherever they are.",
  },
  {
    question: "Is the AI going to do something weird?",
    answer: "MYRA is trained specifically for real estate. She understands your business and speaks your language. Think of her as a really smart assistant who happens to never forget anything.",
  },
  {
    question: "What if I want to cancel?",
    answer: "Cancel anytime—no questions asked. We don't believe in trapping customers. If Client Keeper isn't working for you, you can leave whenever you want.",
  },
];

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://clientkeeper.io";

export const metadata: Metadata = {
  title: "Organized Real Estate CRM | From Chaos to Calm | Client Keeper",
  description:
    "Sticky notes, spreadsheets, crossed fingers? There's a better way. Get organized with voice-powered contact management for real estate.",
  keywords: [
    "real estate CRM",
    "organized contacts",
    "crm for realtors",
    "client management",
    "real estate organization",
    "contact management",
    "voice notes CRM",
  ],
  alternates: {
    canonical: `${baseUrl}/client-keeper-crm/lp/organization`,
  },
  openGraph: {
    title: "Organized Real Estate CRM | From Chaos to Calm | Client Keeper",
    description:
      "Sticky notes, spreadsheets, crossed fingers? There's a better way. Get organized with Client Keeper.",
    url: `${baseUrl}/client-keeper-crm/lp/organization`,
    siteName: "Client Keeper",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Client Keeper CRM - From Chaos to Calm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Organized Real Estate CRM | From Chaos to Calm | Client Keeper",
    description:
      "Sticky notes, spreadsheets, crossed fingers? There's a better way. Get organized with Client Keeper.",
    images: ["/og-image.png"],
  },
};

// Pain points specific to organization/chaos theme
const painPoints = [
  "You have contacts scattered across sticky notes, your phone, random spreadsheets, and that one napkin from the coffee meeting",
  "Every morning starts with trying to remember who you promised to call back",
  "Important details slip through the cracks because there's no single source of truth",
  "The mental load of keeping track of everything is exhausting",
  "You've lost deals simply because you forgot to follow up at the right time",
];

// Benefits focused on organization and mental clarity
const benefits = [
  {
    icon: "brain" as const,
    title: "Mental Clarity",
    description:
      "Stop trying to remember everything. Client Keeper becomes your second brain for client details.",
  },
  {
    icon: "check" as const,
    title: "One Place for Everything",
    description:
      "All your contacts, notes, tasks, and follow-ups in a single organized system.",
  },
  {
    icon: "clock" as const,
    title: "Automatic Reminders",
    description:
      "Never miss a follow-up. Get gentle nudges before important dates slip by.",
  },
  {
    icon: "heart" as const,
    title: "Peace of Mind",
    description:
      "Sleep better knowing nothing is falling through the cracks. Your system has you covered.",
  },
];

// Testimonials that match the organization identity (Danielle J and Amanda W)
const testimonials = [
  {
    quote:
      "I went from sticky notes everywhere to having everything in one place. The mental weight that lifted was incredible. I actually sleep better now.",
    name: "Danielle J.",
    title: "Real Estate Agent",
    initials: "DJ",
  },
  {
    quote:
      "So simple, yet so powerful. I used to dread the chaos of my follow-up system. Now I just talk to the app and everything gets organized automatically.",
    name: "Amanda W.",
    title: "Broker Associate",
    initials: "AW",
  },
  {
    quote:
      "Client Keeper gave me my sanity back. No more spreadsheet nightmares or wondering if I forgot someone. Everything is right where I need it.",
    name: "Marcus T.",
    title: "Real Estate Agent",
    initials: "MT",
  },
];

export default function OrganizationLandingPage() {
  return (
    <main>
      <JsonLd data={generateFAQSchema(landingFAQs)} />

      {/* Hero with strikethrough animation */}
      <OrganizationHero />

      {/* Problem - Name the chaos with empathy */}
      <LandingProblem
        title="Sound Familiar?"
        lead="Your contacts are everywhere. Your to-do list is in your head. And every day feels like putting out fires."
        painPoints={painPoints}
        conclusion="It's not that you don't care. It's that you don't have a system that actually works with your busy life."
      />

      {/* Solution - Voice note example */}
      <LandingSolution
        title="One Voice Note. Everything Organized."
        description="Client Keeper turns your voice into organized action. Speak naturally, and watch your chaos transform into calm."
        example={{
          label: "Try this",
          voiceNote:
            "I met Sarah Johnson at the open house. She's looking for a 3-bed in Riverside, budget around 500k. Her number is 555-1234. I should call her next Tuesday to discuss listings.",
          result:
            "New contact created with all details, tagged as buyer, follow-up scheduled for Tuesday. Done.",
        }}
      />

      {/* How It Works */}
      <LandingHowItWorks />

      {/* Benefits focused on organization */}
      <LandingBenefits
        title="Finally Feel Organized"
        subtitle="What changes when chaos becomes calm"
        benefits={benefits}
      />

      {/* Testimonials from agents who relate to organization pain */}
      <LandingTestimonials
        title="From Chaos to Calm"
        subtitle="Real agents who made the switch"
        testimonials={testimonials}
      />

      {/* FAQ addressing objections */}
      <LandingFAQ faqs={landingFAQs} />

      {/* Final CTA */}
      <LandingFinalCTA
        title="Ready to Get Organized?"
        subtitle="Join thousands of agents who've traded chaos for calm. Start your free trial today."
      />

      {/* Mobile sticky CTA */}
      <StickyBottomCTA />
    </main>
  );
}
