import type { Metadata } from "next";
import { SwitchHeroLiberation } from "@/components/sections/landing/switch-hero-liberation";
import { LandingComparison } from "@/components/sections/landing/shared/landing-comparison";
import { LandingProblem } from "@/components/sections/landing/shared/landing-problem";
import { LandingSolution } from "@/components/sections/landing/shared/landing-solution";
import { LandingHowItWorks } from "@/components/sections/landing/shared/landing-how-it-works";
import { LandingBenefits } from "@/components/sections/landing/shared/landing-benefits";
import { LandingTestimonials } from "@/components/sections/landing/shared/landing-testimonials";
import { LandingFAQ } from "@/components/sections/landing/shared/landing-faq";
import { LandingFinalCTA } from "@/components/sections/landing/shared/landing-final-cta";
import { StickyBottomCTA } from "@/components/shared/sticky-bottom-cta";
import { JsonLd, generateFAQSchema } from "@/components/seo/JsonLd";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://allthingsagents.com";

const faqs = [
  {
    question: "What about my existing contacts?",
    answer:
      "We handle the transfer. Export from your old CRM, send it to us, and we'll import everything. Most agents are fully migrated in under an hour.",
  },
  {
    question: "Is it really that much simpler?",
    answer:
      "We hear this a lot—and yes. Client Keeper was designed for individual agents, not enterprise sales teams. No certification courses, no onboarding calls, no 50-page manual.",
  },
  {
    question: "Will I lose any features I actually use?",
    answer:
      "If you use contacts, follow-ups, notes, tasks, and a transaction pipeline—you'll have everything. We left out the features agents never touch.",
  },
  {
    question: "What if I want to cancel?",
    answer:
      "Cancel anytime—no questions asked. No contracts, no cancellation fees. We don't believe in trapping customers.",
  },
  {
    question: "Is the AI going to do something weird?",
    answer:
      "MYRA is trained specifically for real estate. She understands your business and speaks your language. And everything MYRA suggests gets reviewed by you before it\u2019s saved\u2014so you\u2019re always in control.",
  },
];

export const metadata: Metadata = {
  title: "Switch to a Simpler CRM | Client Keeper for Real Estate",
  description:
    "Tired of complex, overpriced CRMs? Client Keeper is the $19/month real estate CRM that takes 20 minutes to set up. No training required.",
  keywords: [
    "real estate CRM",
    "simple CRM",
    "CRM switch",
    "affordable CRM",
    "easy CRM",
    "CRM alternative",
  ],
  alternates: {
    canonical: `${baseUrl}/client-keeper-crm/lp/switch-b`,
  },
  openGraph: {
    title: "Switch to a Simpler CRM | Client Keeper for Real Estate",
    description:
      "Tired of complex, overpriced CRMs? Client Keeper is the $19/month real estate CRM that takes 20 minutes to set up. No training required.",
    url: `${baseUrl}/client-keeper-crm/lp/switch-b`,
    siteName: "Client Keeper",
    type: "website",
    images: [
      {
        url: "/og/client-keeper.png",
        width: 1200,
        height: 630,
        alt: "Client Keeper - Simple CRM for Real Estate Agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Switch to a Simpler CRM | Client Keeper for Real Estate",
    description:
      "Tired of complex, overpriced CRMs? Client Keeper is the $19/month real estate CRM that takes 20 minutes to set up.",
    images: ["/og/client-keeper.png"],
  },
};

const comparisonRows = [
  { feature: "Setup Time", otherCrm: "2+ weeks", clientKeeper: "20 minutes" },
  { feature: "Monthly Cost", otherCrm: "$79–299", clientKeeper: "$19" },
  { feature: "Training Required", otherCrm: "Yes", clientKeeper: "No" },
  { feature: "Built For", otherCrm: "Teams & brokerages", clientKeeper: "Individual agents" },
  { feature: "AI Assistant", otherCrm: "No", clientKeeper: "MYRA ✓" },
  { feature: "Data Transfer", otherCrm: "DIY export", clientKeeper: "Done for you" },
];

const painPoints = [
  "You paid for a CRM with 200 features. You use 4 of them.",
  "Every time you log in, you spend more time navigating menus than actually doing work.",
  "The 'quick setup' took 3 weeks and a YouTube tutorial playlist.",
  "You've been meaning to switch for months, but the thought of migrating data makes you want to scream.",
  "Your CRM was built for a 50-person brokerage. You're one agent trying to stay organized.",
];

const solutionExample = {
  label: "Switching Is Easy",
  voiceNote:
    "Hey MYRA, I just moved over from my old CRM. Import my contacts and set up follow-up reminders for everyone.",
  result:
    "Done. Contacts imported, follow-ups scheduled. You're up and running in 20 minutes—not 20 days.",
};

const benefits = [
  {
    icon: "clock" as const,
    title: "20-Minute Setup",
    description:
      "Import your contacts, set your preferences, done. No 12-step onboarding process.",
  },
  {
    icon: "heart" as const,
    title: "Actually Affordable",
    description:
      "$19/month. Not $79. Not $299. No hidden fees, no per-seat pricing.",
  },
  {
    icon: "brain" as const,
    title: "Zero Training Required",
    description:
      "If you can text a friend, you can use Client Keeper. Built for agents, not IT departments.",
  },
  {
    icon: "users" as const,
    title: "Done-For-You Data Transfer",
    description:
      "We'll move your contacts over for you. No spreadsheet gymnastics required.",
  },
];

const testimonials = [
  {
    quote:
      "I've tried 3 other CRMs. This is the only one I actually use. Setup took me 15 minutes.",
    name: "Sarah K.",
    title: "Realtor",
    company: "Scottsdale, AZ",
    initials: "SK",
  },
  {
    quote:
      "I was paying $89/month for features I never touched. Client Keeper gives me everything I need for $19.",
    name: "Amanda R.",
    title: "Real Estate Agent",
    company: "Nashville, TN",
    initials: "AR",
  },
  {
    quote:
      "My broker made us use kvCORE. On my own, I chose Client Keeper. Night and day difference.",
    name: "Tyler B.",
    title: "Real Estate Agent",
    company: "Austin, TX",
    initials: "TB",
  },
];

export default function SwitchBLandingPage() {
  return (
    <>
      <JsonLd data={generateFAQSchema(faqs)} />

      <SwitchHeroLiberation />

      <LandingComparison
        title="See the Difference"
        subtitle="Stop paying for complexity you don't need."
        rows={comparisonRows}
      />

      <LandingProblem
        title="Sound Familiar?"
        lead="You've tried the 'industry-leading' CRMs. Here's how that went."
        painPoints={painPoints}
        conclusion="You don't need more features. You need fewer—the right ones."
      />

      <LandingSolution
        title="Switching Is Easier Than You Think"
        description="Client Keeper was built for agents switching from overcomplicated CRMs. We handle the hard part."
        example={solutionExample}
      />

      <LandingHowItWorks />

      <LandingBenefits
        title="Why Agents Switch"
        subtitle="Everything you need. Nothing you don't."
        benefits={benefits}
      />

      <LandingTestimonials
        title="Agents Who Made the Switch"
        subtitle="Real agents who left complex CRMs behind"
        testimonials={testimonials}
      />

      <LandingFAQ title="Switching Questions? We've Got Answers." faqs={faqs} />

      <LandingFinalCTA
        title="Ready to Simplify?"
        subtitle="Join thousands of agents who switched to Client Keeper and never looked back."
      />

      <StickyBottomCTA />
    </>
  );
}
