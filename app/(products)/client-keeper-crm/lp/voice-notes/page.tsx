import type { Metadata } from "next";
import { VoiceNoteHero } from "@/components/sections/landing/voice-note-hero";
import { LandingProblem } from "@/components/sections/landing/shared/landing-problem";
import { LandingSolution } from "@/components/sections/landing/shared/landing-solution";
import { LandingHowItWorks } from "@/components/sections/landing/shared/landing-how-it-works";
import { LandingBenefits } from "@/components/sections/landing/shared/landing-benefits";
import { LandingTestimonials } from "@/components/sections/landing/shared/landing-testimonials";
import { LandingFAQ } from "@/components/sections/landing/shared/landing-faq";
import { LandingFinalCTA } from "@/components/sections/landing/shared/landing-final-cta";
import { StickyBottomCTA } from "@/components/shared/sticky-bottom-cta";
import { JsonLd, generateFAQSchema } from "@/components/seo/JsonLd";

// FAQ data for schema markup (duplicated to avoid client/server boundary issues)
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
    answer: "MYRA is trained specifically for real estate. She understands your business and speaks your language. And everything MYRA suggests gets reviewed by you before it\u2019s saved\u2014so you\u2019re always in control.",
  },
  {
    question: "What if I want to cancel?",
    answer: "Cancel anytime—no questions asked. We don't believe in trapping customers. If Client Keeper isn't working for you, you can leave whenever you want.",
  },
];

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://clientkeeper.io";

export const metadata: Metadata = {
  title: "Voice CRM for Real Estate | No Typing | Client Keeper",
  description:
    "Just talk. Your CRM updates itself. Send a voice note between showings and MYRA handles the rest. No typing, no tech overwhelm. Start your free trial today.",
  alternates: {
    canonical: `${baseUrl}/client-keeper-crm/lp/voice-notes`,
  },
  openGraph: {
    title: "Voice CRM for Real Estate | No Typing | Client Keeper",
    description:
      "Just talk. Your CRM updates itself. Send a voice note between showings and MYRA handles the rest.",
    url: `${baseUrl}/client-keeper-crm/lp/voice-notes`,
    siteName: "Client Keeper",
    type: "website",
    images: [
      {
        url: "/og/client-keeper.png",
        width: 1200,
        height: 630,
        alt: "Client Keeper Voice Notes CRM for Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Voice CRM for Real Estate | No Typing | Client Keeper",
    description:
      "Just talk. Your CRM updates itself. Send a voice note and MYRA handles the rest.",
    images: ["/og/client-keeper.png"],
  },
};

// Voice-specific pain points about typing and tech overwhelm
const painPoints = [
  "You're driving between showings with no time to type notes",
  "By the time you sit down, you've forgotten half the details",
  "CRMs feel like homework—another screen, another login, another thing to update",
  "You know you need to stay organized, but who has the time to type it all out?",
  "You're great with people, not great with tech—and that's okay",
];

// Voice note example for the solution section
const voiceNoteExample = {
  label: "How it works in practice",
  voiceNote:
    "Hey MYRA, just showed Sarah Mitchell the house on Oak Lane. She loved the kitchen but wants something with a bigger backyard. Follow up next Tuesday.",
  result:
    "MYRA updates Sarah's contact, adds notes about her preferences, and schedules a reminder for Tuesday. Done.",
};

// Benefits focused on simplicity and no-typing
const benefits = [
  {
    icon: "smartphone" as const,
    title: "Talk, Don't Type",
    description:
      "Send voice notes from anywhere—in the car, between showings, walking into an open house. No typing required.",
  },
  {
    icon: "brain" as const,
    title: "MYRA Gets It",
    description:
      "She understands context, extracts details, and organizes everything automatically. Like having a mind-reading assistant.",
  },
  {
    icon: "clock" as const,
    title: "Zero Learning Curve",
    description:
      "If you can talk, you can use Client Keeper. No tutorials, no training, no tech headaches.",
  },
  {
    icon: "heart" as const,
    title: "Stay Present with Clients",
    description:
      "Focus on the conversation, not on taking notes. Capture everything after, in your own words.",
  },
];

// Amanda W and Rachel K testimonials - most relevant for voice/simplicity
const testimonials = [
  {
    quote:
      "I used to forget half my notes by the time I got home. Now I just talk to MYRA in the car and everything's done. It's like magic.",
    name: "Amanda W.",
    title: "Residential Agent",
    initials: "AW",
  },
  {
    quote:
      "I'm not a tech person at all. But Client Keeper? I was using it within 5 minutes. The voice notes feature is a game-changer for agents like me.",
    name: "Rachel K.",
    title: "Solo Agent",
    company: "Denver Metro",
    initials: "RK",
  },
  {
    quote:
      "Finally, a CRM that doesn't feel like homework. I just talk and everything gets organized. My follow-up game has never been better.",
    name: "Marcus T.",
    title: "Team Lead",
    initials: "MT",
  },
];

export default function VoiceNotesLandingPage() {
  return (
    <>
      <JsonLd data={generateFAQSchema(landingFAQs)} />

      <VoiceNoteHero />

      <LandingProblem
        title="Sound Familiar?"
        lead="You're great with people—but tech? Not so much. And you're tired of CRMs that feel like a second job."
        painPoints={painPoints}
        conclusion="You don't need another complicated system. You need one that works the way you do—fast, simple, and on the go."
      />

      <LandingSolution
        title="Just Talk. That's It."
        description="Client Keeper is the CRM built for agents who hate typing. Send a voice note, and MYRA—your AI assistant—handles the rest. Notes, follow-ups, reminders. All organized automatically."
        example={voiceNoteExample}
      />

      <LandingHowItWorks />

      <LandingBenefits
        title="Why Agents Love Voice Notes"
        subtitle="Built for the way you actually work"
        benefits={benefits}
      />

      <LandingTestimonials
        title="Agents Like You Are Loving It"
        testimonials={testimonials}
      />

      <LandingFAQ faqs={landingFAQs} />

      <LandingFinalCTA
        title="Ready to Ditch the Typing?"
        subtitle="Join agents who've simplified their CRM with voice notes. No tech skills required."
      />

      <StickyBottomCTA />
    </>
  );
}
