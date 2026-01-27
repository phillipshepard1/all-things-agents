"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { ShineBorder } from "@/components/ui/shine-border";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const pricing = {
  monthly: {
    price: 24,
    period: "month",
    yearlyTotal: 288,
  },
  yearly: {
    price: 19,
    originalPrice: 24,
    yearlyTotal: 228,
    originalYearlyTotal: 288,
    discount: "20% OFF",
  },
  features: [
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
  ],
  guarantee: "30 Day Money Back Guarantee",
};

export function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<"yearly" | "monthly">("yearly");

  const currentPricing = billingPeriod === "yearly" ? pricing.yearly : pricing.monthly;
  const isYearly = billingPeriod === "yearly";

  return (
    <section id="pricing" className="py-24 md:py-36">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-home-6xl">
            Simple, <span className="text-gradient">transparent</span> pricing
          </h2>
          <p className="mt-5 text-xl md:text-home-lg text-muted-foreground">
            Start free. Upgrade when you&apos;re ready. No hidden fees.
          </p>
        </div>

        {/* Toggle */}
        <div className="mb-14 flex justify-center">
          <div className="inline-flex items-center rounded-full border border-border/40 bg-muted/30 p-1.5">
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={cn(
                "relative rounded-full px-7 py-3 min-h-[44px] text-base md:text-home-sm font-medium transition-all flex items-center gap-2",
                billingPeriod === "yearly"
                  ? "bg-accent text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Yearly
              <Badge className="bg-accent/20 text-accent text-sm border border-accent/30">
                {pricing.yearly.discount}
              </Badge>
            </button>
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={cn(
                "relative rounded-full px-7 py-3 min-h-[44px] text-base md:text-home-sm font-medium transition-all",
                billingPeriod === "monthly"
                  ? "bg-accent text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="mx-auto max-w-lg">
          <div className="relative rounded-3xl bg-background border border-border/40 overflow-hidden">
            <ShineBorder
              shineColor={["#7a36dd", "#9b5de5", "#c8b6ff"]}
              borderWidth={2}
              duration={10}
            />
            <div className="relative p-10 md:p-12">
              {/* Price Display */}
              <div className="text-center">
                <div className="flex items-baseline justify-center gap-2">
                  {isYearly && (
                    <span className="text-3xl md:text-home-2xl text-muted-foreground line-through">
                      ${pricing.yearly.originalPrice}
                    </span>
                  )}
                  <span className="text-7xl md:text-home-6xl font-bold text-foreground">
                    ${currentPricing.price}
                  </span>
                  <span className="text-2xl md:text-home-xl text-muted-foreground">/mo</span>
                </div>
              </div>

              {/* Features List */}
              <ul className="mt-10 space-y-5">
                {pricing.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <Check className="h-3.5 w-3.5 text-accent" />
                    </div>
                    <span className="text-base md:text-home-base text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-10">
                <Link href="https://appnew.clientkeepercrm.com/register">
                  <ShimmerButton
                    shimmerColor="#ffffff"
                    background="#7a36dd"
                    borderRadius="14px"
                    className="w-full h-16 text-xl md:text-home-lg font-medium"
                  >
                    Start Free Trial
                  </ShimmerButton>
                </Link>
              </div>

              {/* Guarantee */}
              <p className="mt-7 text-center text-base md:text-home-sm text-muted-foreground">
                {pricing.guarantee}
              </p>
            </div>
          </div>
        </div>

        {/* Additional info */}
        <p className="mt-14 text-center text-base md:text-home-sm text-muted-foreground">
          No credit card required &bull; 30-day free trial &bull; Cancel anytime
        </p>
      </div>
    </section>
  );
}
