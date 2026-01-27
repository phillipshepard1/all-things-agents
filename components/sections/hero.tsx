"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Animated gradient orbs background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Main purple orb - top right */}
        <div className="animate-float-slow absolute -right-20 -top-20 h-[690px] w-[690px] md:h-[750px] md:w-[750px] rounded-full bg-gradient-to-br from-[#7a36dd]/30 via-[#9b5de5]/20 to-transparent blur-3xl" />
        {/* Secondary orb - bottom left */}
        <div className="animate-float-reverse absolute -bottom-32 -left-32 h-[575px] w-[575px] md:h-[625px] md:w-[625px] rounded-full bg-gradient-to-tr from-[#300092]/20 via-[#7a36dd]/15 to-transparent blur-3xl" />
        {/* Accent orb - center */}
        <div className="animate-float-slower absolute left-1/2 top-1/3 h-[460px] w-[460px] md:h-[500px] md:w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#e4d9ff]/40 via-[#c8b6ff]/20 to-transparent blur-3xl" />
        {/* Small accent orb */}
        <div className="animate-float-slow absolute right-1/4 top-1/2 h-[230px] w-[230px] md:h-[250px] md:w-[250px] rounded-full bg-[#9b5de5]/20 blur-2xl" />
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-16 md:py-36 lg:py-44">
        <div className="mx-auto max-w-4xl text-center">
          {/* Trust Badge */}
          <div className="animate-fade-in-up">
            <Badge
              variant="secondary"
              className="mb-8 border border-accent/20 bg-accent/10 px-4 py-2 text-sm sm:text-base md:text-home-base font-medium text-foreground text-center"
            >
              <span className="mr-2 inline-block h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-accent" />
              Trusted by Real Estate Agents Across North America
            </Badge>
          </div>

          {/* Main Headline */}
          <div className="font-[family-name:var(--font-outfit)]">
            <TextGenerateEffect
              words="Sticky Notes. Spreadsheets. Crossed Fingers."
              className="text-4xl font-semibold sm:text-5xl md:text-home-5xl"
              textClassName="text-muted-foreground"
              duration={0.5}
            />
            <h1 className="mt-6 text-[2.75rem] font-extrabold tracking-tight text-gradient whitespace-nowrap sm:text-7xl md:text-home-8xl lg:text-[9rem] animate-fade-in-up delay-300">
              Sound Familiar?
            </h1>
          </div>

          {/* Subheadline */}
          <p className="animate-fade-in-up delay-200 mx-auto mt-10 max-w-2xl text-2xl text-muted-foreground md:text-home-2xl">
            Meet Client Keeper — the CRM that finally gets real estate.
            Simple to use, zero learning curve, and actually helps you close more deals.
          </p>

          {/* CTA Button */}
          <div className="animate-fade-in-up delay-300 mt-14 flex justify-center">
            <Link href="https://appnew.clientkeepercrm.com/register">
              <ShimmerButton
                shimmerColor="#ffffff"
                background="#7a36dd"
                borderRadius="14px"
                className="h-16 px-12 text-xl md:text-home-lg font-medium shadow-warm-lg"
              >
                Start Free Trial
                <ArrowRight className="ml-2.5 h-6 w-6" />
              </ShimmerButton>
            </Link>
          </div>

          {/* Trust indicators */}
          <p className="animate-fade-in-up delay-400 mt-12 text-lg md:text-home-base text-muted-foreground">
            No credit card required &bull; 30-day free trial &bull; Cancel
            anytime
          </p>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
