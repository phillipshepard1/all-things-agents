import type { Metadata } from "next";
import { FollowUpHero } from "@/components/sections/landing/follow-up-hero";
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
  title: "Automated Follow-Up CRM for Real Estate | Client Keeper",
  description:
    "Never lose a client to forgetting. Automatic reminders for birthdays, anniversaries, and check-ins. 80% of sales happen after 5+ follow-ups.",
  keywords: [
    "real estate CRM",
    "client follow-up",
    "automated reminders",
    "birthday reminders",
    "anniversary reminders",
    "real estate agent tools",
    "client retention",
    "follow-up system",
  ],
  alternates: {
    canonical: `${baseUrl}/client-keeper-crm/lp/follow-up`,
  },
  openGraph: {
    title: "Automated Follow-Up CRM for Real Estate | Client Keeper",
    description:
      "Never lose a client to forgetting. Automatic reminders for birthdays, anniversaries, and check-ins.",
    url: `${baseUrl}/client-keeper-crm/lp/follow-up`,
    siteName: "Client Keeper",
    type: "website",
    images: [
      {
        url: "/og/client-keeper.png",
        width: 1200,
        height: 630,
        alt: "Client Keeper Follow-Up CRM for Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Automated Follow-Up CRM for Real Estate | Client Keeper",
    description:
      "Never lose a client to forgetting. Automatic reminders for birthdays and anniversaries.",
    images: ["/og/client-keeper.png"],
  },
};

// Pain points about forgetting clients, missed opportunities, leads going cold
const painPoints = [
  "You meant to call the Johnsons after their closing... 3 months ago.",
  "That referral source you promised to check in with? Haven't heard from them in a year.",
  "Another birthday missed. Another chance to stay top-of-mind, gone.",
  "The leads in your phone are going cold because 'I'll get to them later' never comes.",
  "Your past clients forgot you exist. And now they're listing with someone else.",
];

// Solution example focused on follow-ups
const solutionExample = {
  label: "Real Example",
  voiceNote: "Remind me to check in with the Miller family every 6 months—they're great for referrals.",
  result:
    "Client Keeper schedules automatic reminders: March and September, every year. You'll never forget to nurture your best referral sources again.",
};

// Benefits focused on never forgetting, relationships, referrals
const benefits = [
  {
    icon: "clock" as const,
    title: "Never Miss a Follow-Up",
    description:
      "Automatic reminders for birthdays, anniversaries, and custom check-in schedules. Client Keeper remembers so you don't have to.",
  },
  {
    icon: "heart" as const,
    title: "Deeper Client Relationships",
    description:
      "When you remember the details that matter, clients feel valued. That's how you become their agent for life.",
  },
  {
    icon: "users" as const,
    title: "More Referrals, Automatically",
    description:
      "Stay top-of-mind with past clients through consistent touchpoints. Referrals come when people remember you exist.",
  },
  {
    icon: "brain" as const,
    title: "Peace of Mind",
    description:
      "Stop worrying about who you forgot to call. Your follow-up system runs automatically in the background.",
  },
];

// Testimonials focused on the follow-up system (Tyler B and Jessica M)
const testimonials = [
  {
    quote:
      "I used to lose track of past clients all the time. Now I get a reminder before every birthday and anniversary. Three referrals came from that alone last month.",
    name: "Tyler B.",
    title: "Real Estate Agent",
    company: "Austin, TX",
    initials: "TB",
  },
  {
    quote:
      "The follow-up reminders changed everything. I set it once and forget it—but my clients never forget me. I'm finally staying consistent.",
    name: "Jessica M.",
    title: "Realtor",
    company: "Denver, CO",
    initials: "JM",
  },
  {
    quote:
      "My sphere of influence was collecting dust until I started using Client Keeper's reminder system. Now I'm actually nurturing relationships instead of just collecting contacts.",
    name: "Marcus T.",
    title: "Real Estate Agent",
    company: "Phoenix, AZ",
    initials: "MT",
  },
];

export default function FollowUpLandingPage() {
  return (
    <>
      <JsonLd data={generateFAQSchema(landingFAQs)} />

      {/* Hero - matches ad copy */}
      <FollowUpHero />

      {/* Problem - empathy first, name the fear of forgetting */}
      <LandingProblem
        title="Sound Familiar?"
        lead="You close the deal, promise to stay in touch... and then life happens."
        painPoints={painPoints}
        conclusion="Six months later, they've listed with someone else. Not because you didn't care—because you couldn't keep up."
      />

      {/* Solution - concrete voice note example early */}
      <LandingSolution
        title="There's a Simpler Way"
        description="Client Keeper tracks every relationship and reminds you exactly when to reach out. Set it once, stay connected forever."
        example={solutionExample}
      />

      {/* How It Works - default 3 steps */}
      <LandingHowItWorks />

      {/* Benefits - focused on never forgetting, relationships, referrals */}
      <LandingBenefits
        title="What You'll Get"
        subtitle="A follow-up system that runs on autopilot"
        benefits={benefits}
      />

      {/* Testimonials - Tyler B and Jessica M, focus on follow-up system */}
      <LandingTestimonials
        title="What Agents Are Saying"
        subtitle="Real agents who never miss a follow-up"
        testimonials={testimonials}
      />

      {/* FAQ - addresses objections */}
      <LandingFAQ faqs={landingFAQs} />

      {/* Final CTA - repeat the offer */}
      <LandingFinalCTA
        title="Ready to Never Forget Again?"
        subtitle="Join thousands of agents who are building lasting relationships with Client Keeper."
      />

      {/* Sticky mobile CTA */}
      <StickyBottomCTA />
    </>
  );
}
