import { Metadata } from "next";
import { MobileHero } from "@/components/sections/landing/mobile-hero";
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
  title: "Mobile CRM for Real Estate Agents | Client Keeper",
  description:
    "A real estate CRM you can run from anywhere. Update contacts, capture leads, and never miss a follow-up—between showings, in the car, or at the open house.",
  alternates: {
    canonical: `${baseUrl}/client-keeper-crm/lp/mobile`,
  },
  openGraph: {
    title: "Mobile CRM for Real Estate Agents | Client Keeper",
    description:
      "A real estate CRM you can run from anywhere. Update contacts, capture leads, and never miss a follow-up—between showings, in the car, or at the open house.",
    url: `${baseUrl}/client-keeper-crm/lp/mobile`,
    siteName: "Client Keeper",
    type: "website",
    images: [
      {
        url: "/og/client-keeper.png",
        width: 1200,
        height: 630,
        alt: "Client Keeper Mobile CRM for Real Estate Agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile CRM for Real Estate Agents | Client Keeper",
    description:
      "A real estate CRM you can run from anywhere. Update contacts and never miss a follow-up.",
    images: ["/og/client-keeper.png"],
  },
};

// Pain points focused on mobile/on-the-go frustrations
const painPoints = [
  "You close a showing and need to update your CRM—but you're already late for the next one.",
  "You meet a hot lead at an open house, jot their info on a business card... and lose it in your car.",
  "You promise to follow up 'this week' but by the time you're at a computer, you've forgotten the details.",
  "Desktop CRMs feel like homework. You need something that works from your phone, right now.",
];

// Mobile-focused benefits
const benefits = [
  {
    icon: "smartphone" as const,
    title: "Truly Mobile-First",
    description:
      "Designed for agents on the move. Full functionality on your phone—not a watered-down mobile version.",
  },
  {
    icon: "clock" as const,
    title: "Update in Seconds",
    description:
      "Add contacts, log notes, and schedule follow-ups faster than you can unlock your laptop.",
  },
  {
    icon: "brain" as const,
    title: "Voice-Powered Entry",
    description:
      "Talk to MYRA between showings. She handles the data entry while you focus on clients.",
  },
  {
    icon: "heart" as const,
    title: "Works Offline Too",
    description:
      "No signal in that basement showing? No problem. Changes sync when you're back online.",
  },
];

// Testimonials that mention mobile/on-the-go
const testimonials = [
  {
    quote:
      "So easy and mobile friendly! Finally a way to follow up with clients and organize data without the tech overwhelm. I can update everything on the go between showings.",
    name: "Amanda W",
    title: "Real Estate Broker",
    initials: "AW",
  },
  {
    quote:
      "As a mom of three, I needed a CRM that works for me, not the other way around. MYRA handles the busywork while I focus on clients and still make it to soccer practice.",
    name: "Rachel K",
    title: "Real Estate Agent",
    company: "Coldwell Banker",
    initials: "RK",
  },
  {
    quote:
      "I've tried other CRMs but this is one I'll actually use. It doesn't overwhelm me with unnecessary features, and I find myself staying organized without even thinking about it.",
    name: "Danielle J",
    title: "Senior Property Manager",
    initials: "DJ",
  },
];

// Custom steps emphasizing mobile workflow
const mobileSteps = [
  {
    icon: "mic" as const,
    title: "Capture on the Go",
    description:
      "Between showings? Send a quick voice note. MYRA transcribes and organizes everything.",
  },
  {
    icon: "sparkles" as const,
    title: "Instant Organization",
    description:
      "Contacts created, notes attached, follow-ups scheduled—all while you're driving to your next appointment.",
  },
  {
    icon: "calendar" as const,
    title: "Stay Consistent",
    description:
      "Smart reminders appear right when you need them. Never miss a birthday or follow-up again.",
  },
];

export default function MobileLandingPage() {
  return (
    <>
      <JsonLd data={generateFAQSchema(landingFAQs)} />

      {/* Hero with iPhone Carousel */}
      <MobileHero />

      {/* Problem Section */}
      <LandingProblem
        title="Your CRM Should Work From Your Car"
        lead="Real estate doesn't happen at a desk. It happens between showings, at open houses, and in parking lots. But most CRMs?"
        painPoints={painPoints}
        conclusion="You don't need another desktop app that makes you feel behind. You need a CRM that moves as fast as you do."
      />

      {/* Solution Section */}
      <LandingSolution
        title="Finally, a CRM Built for Your Lifestyle"
        description="Client Keeper was designed from day one to work on your phone. Not as an afterthought—as the primary experience. Because that's where you live."
        example={{
          label: "Real Example: Updating from the Car",
          voiceNote:
            "Just finished showing the Johnsons the Oak Street property. They loved the backyard but want to think about the price. Follow up Thursday.",
          result:
            "MYRA adds notes to the Johnson contact, schedules a Thursday follow-up, and you're ready for your next showing.",
        }}
      />

      {/* How It Works */}
      <LandingHowItWorks
        title="How It Works on the Go"
        steps={mobileSteps}
      />

      {/* Benefits */}
      <LandingBenefits
        title="Built for Agents Who Never Stop Moving"
        subtitle="Everything you need, accessible from anywhere"
        benefits={benefits}
      />

      {/* Testimonials */}
      <LandingTestimonials
        title="Agents Who Get It Done on the Go"
        testimonials={testimonials}
      />

      {/* FAQ */}
      <LandingFAQ faqs={landingFAQs} />

      {/* Final CTA */}
      <LandingFinalCTA
        title="Ready to Work Smarter, Not Harder?"
        subtitle="Download Client Keeper and start managing your business from anywhere."
      />

      {/* Sticky Mobile CTA */}
      <StickyBottomCTA />
    </>
  );
}
