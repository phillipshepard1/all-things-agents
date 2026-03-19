"use client";

import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote:
      "I've tried other CRMs but this is one I'll actually use. It doesn't overwhelm me with unnecessary features, and I find myself staying organized without even thinking about it.",
    name: "Danielle J",
    title: "Senior Property Manager",
  },
  {
    quote:
      "So easy and mobile friendly! Finally a way to follow up with clients and organize data without the tech overwhelm. I can update everything on the go between showings.",
    name: "Amanda W",
    title: "Real Estate Broker",
  },
  {
    quote:
      "MYRA is like having a personal assistant who never sleeps. She handles all my data entry and follow-up reminders behind the scenes so I can actually be present with my kids after work.",
    name: "Jessica M",
    title: "Realtor, Century 21",
  },
];

const features = [
  "Myra AI Does Your Data Entry",
  "Never Miss a Follow-Up",
  "Free Data Migration",
  "Full Mobile App Access",
  "Unlimited Contacts & Storage",
  "Email Integration",
  "Transaction Tracking",
  "Birthday & Anniversary Alerts",
  "Lead Source Tracking",
  "Team Collaboration",
  "Priority Support",
];

export function SocialProofPricing() {
  const [billingPeriod, setBillingPeriod] = useState<"yearly" | "monthly">(
    "yearly"
  );

  return (
    <>
      {/* Testimonials */}
      <section className="bg-secondary py-28 md:py-40">
        <div className="container mx-auto px-6 md:px-8">
          <BlurFade delay={0.1} inView>
            <h2 className="text-4xl md:text-home-5xl font-bold text-foreground text-center">
              What agents are saying
            </h2>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <Image
              src="/images/lifestyle-agent.jpg"
              alt="Real estate agent using Client Keeper CRM"
              width={800}
              height={500}
              className="max-w-2xl w-full mx-auto rounded-2xl mt-8"
            />
          </BlurFade>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 md:mt-16">
            {testimonials.map((testimonial, index) => (
              <BlurFade key={testimonial.name} delay={0.1 + index * 0.1} inView>
                <div className="bg-background rounded-2xl p-8 shadow-sm border border-border/40">
                  <p className="text-base md:text-home-sm text-foreground leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <p className="text-base font-semibold text-foreground mt-6">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.title}
                  </p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-background py-28 md:py-40">
        <div className="container mx-auto px-6 md:px-8">
          <BlurFade delay={0.1} inView>
            <h2 className="text-4xl md:text-home-5xl font-bold text-foreground text-center">
              Simple pricing
            </h2>
            <p className="text-lg md:text-home-lg text-muted-foreground mt-4 text-center">
              One plan. Everything included.
            </p>
          </BlurFade>

          {/* Billing Toggle */}
          <BlurFade delay={0.2} inView>
            <div className="flex justify-center mt-10">
              <div className="inline-flex items-center rounded-full border border-border/40 bg-muted/30 p-1.5">
                <button
                  onClick={() => setBillingPeriod("yearly")}
                  className={cn(
                    "rounded-full px-7 py-3 text-sm font-medium transition-colors inline-flex items-center",
                    billingPeriod === "yearly"
                      ? "bg-accent text-white shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Yearly
                  <span className="bg-accent/20 text-accent text-xs font-medium px-2 py-0.5 rounded-full border border-accent/30 ml-2">
                    20% OFF
                  </span>
                </button>
                <button
                  onClick={() => setBillingPeriod("monthly")}
                  className={cn(
                    "rounded-full px-7 py-3 text-sm font-medium transition-colors",
                    billingPeriod === "monthly"
                      ? "bg-accent text-white shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Monthly
                </button>
              </div>
            </div>
          </BlurFade>

          {/* Pricing Card */}
          <BlurFade delay={0.3} inView>
            <div className="max-w-lg mx-auto mt-12">
              <div className="rounded-3xl bg-background border border-border/40 p-10 md:p-12">
                {/* Price Display */}
                <div className="text-center">
                  {billingPeriod === "yearly" ? (
                    <div className="flex items-end justify-center gap-2">
                      <span className="text-3xl md:text-home-2xl text-muted-foreground line-through">
                        $24
                      </span>
                      <span className="text-7xl md:text-home-6xl font-bold text-foreground">
                        $19
                      </span>
                      <span className="text-2xl md:text-home-xl text-muted-foreground mb-2">
                        /mo
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-end justify-center gap-2">
                      <span className="text-7xl md:text-home-6xl font-bold text-foreground">
                        $24
                      </span>
                      <span className="text-2xl md:text-home-xl text-muted-foreground mb-2">
                        /mo
                      </span>
                    </div>
                  )}
                </div>

                {/* Features List */}
                <ul className="space-y-5 mt-10">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-4">
                      <span className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3.5 w-3.5 text-accent" />
                      </span>
                      <span className="text-base md:text-home-base text-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <a
                  href="https://appnew.clientkeepercrm.com/register"
                  className="block w-full text-center rounded-xl bg-[#7a36dd] hover:bg-[#6b2cc4] text-white py-4 text-xl md:text-home-lg font-medium transition-colors mt-10"
                >
                  Start Free Trial
                </a>

                {/* Guarantee */}
                <p className="text-base md:text-home-sm text-muted-foreground mt-7 text-center">
                  30 Day Money Back Guarantee
                </p>
              </div>
            </div>
          </BlurFade>

          {/* Trust Line */}
          <BlurFade delay={0.4} inView>
            <p className="text-base md:text-home-sm text-muted-foreground mt-14 text-center">
              No credit card required · 30-day free trial · Cancel anytime
            </p>
          </BlurFade>
        </div>
      </section>
    </>
  );
}
