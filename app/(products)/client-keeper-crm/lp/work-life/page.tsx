import type { Metadata } from "next";
import { WorkLifeHero } from "@/components/sections/landing/work-life-hero";
import {
  LandingProblem,
  LandingSolution,
  LandingHowItWorks,
  LandingBenefits,
  LandingTestimonials,
  LandingFAQ,
  LandingFinalCTA,
} from "@/components/sections/landing/shared";
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
    answer: "MYRA is trained specifically for real estate. She understands your business and speaks your language. And everything MYRA suggests gets reviewed by you before it\u2019s saved\u2014so you\u2019re always in control.",
  },
  {
    question: "What if I want to cancel?",
    answer: "Cancel anytime—no questions asked. We don't believe in trapping customers. If Client Keeper isn't working for you, you can leave whenever you want.",
  },
];

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://clientkeeper.io";

export const metadata: Metadata = {
  title: "Real Estate CRM for Work-Life Balance | Client Keeper",
  description:
    "Stop working at 10pm. Start making soccer practice. MYRA handles the busywork so you can be present for what matters. 30-day free trial.",
  alternates: {
    canonical: `${baseUrl}/client-keeper-crm/lp/work-life`,
  },
  openGraph: {
    title: "Real Estate CRM for Work-Life Balance | Client Keeper",
    description:
      "Stop working at 10pm. Start making soccer practice. MYRA handles the busywork so you can be present for what matters.",
    url: `${baseUrl}/client-keeper-crm/lp/work-life`,
    siteName: "Client Keeper",
    type: "website",
    images: [
      {
        url: "/og/client-keeper.png",
        width: 1200,
        height: 630,
        alt: "Client Keeper CRM - Work-Life Balance for Real Estate Agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate CRM for Work-Life Balance | Client Keeper",
    description:
      "Stop working at 10pm. MYRA handles the busywork so you can be present for what matters.",
    images: ["/og/client-keeper.png"],
  },
};

// Pain points specific to work-life balance
const workLifePainPoints = [
  "You check your phone at dinner, just in case a lead responded",
  "Soccer practice becomes another thing you 'couldn't make' this week",
  "Even when you're home, your mind is running through tomorrow's follow-ups",
  "The guilt of being physically present but mentally somewhere else",
  "Your family sees the back of your laptop more than your face",
];

// Benefits focused on time back and presence
const workLifeBenefits = [
  {
    icon: "clock" as const,
    title: "Leave Work at Work",
    description:
      "MYRA handles follow-ups automatically. When you close the app, you're actually done for the day.",
  },
  {
    icon: "heart" as const,
    title: "Be Present, Not Guilty",
    description:
      "Know that nothing is falling through the cracks while you're at your kid's recital or date night.",
  },
  {
    icon: "users" as const,
    title: "Make the Games Again",
    description:
      "With automated reminders and AI-handled tasks, you'll actually make soccer practice this time.",
  },
  {
    icon: "brain" as const,
    title: "Mental Peace",
    description:
      "Stop running through your to-do list at 2am. MYRA remembers everything so you don't have to.",
  },
];

// Testimonials that mention family/evenings
const workLifeTestimonials = [
  {
    quote:
      "I used to miss my daughter's dance recitals because I was 'too busy.' Now MYRA handles my follow-ups and I haven't missed one in 6 months. That's worth more than any commission.",
    name: "Rachel K.",
    title: "Real Estate Agent",
    company: "Austin, TX",
    initials: "RK",
  },
  {
    quote:
      "My wife noticed the change before I did. I'm home for dinner now. Actually home - not checking my phone every 5 minutes. Client Keeper gave me my family back.",
    name: "Marcus T.",
    title: "Broker",
    company: "Denver, CO",
    initials: "MT",
  },
  {
    quote:
      "Last week I coached my son's little league game. A year ago, that would've been impossible. MYRA handles the busywork so I can handle what matters.",
    name: "Jennifer M.",
    title: "Real Estate Agent",
    company: "Phoenix, AZ",
    initials: "JM",
  },
];

export default function WorkLifeLandingPage() {
  return (
    <main className="min-h-screen">
      <JsonLd data={generateFAQSchema(landingFAQs)} />

      {/* Hero - Custom work-life split reveal */}
      <WorkLifeHero />

      {/* Problem - Working late, missing family events */}
      <LandingProblem
        title="Sound Familiar?"
        lead="You got into real estate for the freedom. But somewhere along the way, 'flexible schedule' turned into 'always on.'"
        painPoints={workLifePainPoints}
        conclusion="It's not that you don't want to be there. It's that there's always one more follow-up, one more lead, one more thing that can't wait."
      />

      {/* Solution - MYRA handles follow-ups while you're present */}
      <LandingSolution
        title="What If the Busywork Just... Handled Itself?"
        description="Client Keeper's AI assistant MYRA works while you don't. She sends follow-ups, schedules check-ins, and keeps your pipeline warm - so you can actually close the laptop at 5pm."
        example={{
          label: "Real example from this morning",
          voiceNote:
            "Hey MYRA, the Johnsons loved the house on Oak Street. They want to think about it. Check in with them Thursday.",
          result:
            "MYRA schedules a thoughtful follow-up for Thursday, drafts a personalized message, and reminds you - all while you drive home for dinner.",
        }}
      />

      {/* How It Works - Default 3 steps */}
      <LandingHowItWorks />

      {/* Benefits - Time back, presence, guilt-free evenings */}
      <LandingBenefits
        title="What You Actually Get"
        subtitle="Beyond features - real changes to your daily life"
        benefits={workLifeBenefits}
      />

      {/* Testimonials - Rachel K and Marcus T who mention family/evenings */}
      <LandingTestimonials
        title="Agents Who Got Their Lives Back"
        testimonials={workLifeTestimonials}
      />

      {/* FAQ - Default FAQs */}
      <LandingFAQ faqs={landingFAQs} />

      {/* Final CTA */}
      <LandingFinalCTA
        title="Ready to Leave Work at Work?"
        subtitle="Start your free trial today. No credit card required. Your family will notice the difference."
      />

      {/* Sticky mobile CTA */}
      <StickyBottomCTA />
    </main>
  );
}
