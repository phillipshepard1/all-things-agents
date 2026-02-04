"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";

interface LandingFinalCTAProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  trustText?: string;
}

export function LandingFinalCTA({
  title = "Ready to Get Started?",
  subtitle = "Join thousands of real estate agents who are closing more deals with Client Keeper.",
  ctaText = "Start Your Free Trial",
  ctaHref = "https://appnew.clientkeepercrm.com/register",
  trustText = "No credit card required • 30-day free trial • Cancel anytime",
}: LandingFinalCTAProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#7a36dd] to-[#5a1fb3] py-20 md:py-28">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-0">
        <div className="absolute left-1/4 top-0 h-[28rem] w-[28rem] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto max-w-3xl px-4">
        <BlurFade delay={0.1} inView>
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              {title}
            </h2>
            <p className="mt-5 text-lg md:text-xl text-white/80">
              {subtitle}
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <div className="mt-10 flex flex-col items-center gap-5">
            <Link href={ctaHref}>
              <ShimmerButton
                shimmerColor="#7a36dd"
                background="#ffffff"
                borderRadius="14px"
                className="h-14 md:h-16 px-10 md:px-12 text-lg md:text-xl font-medium shadow-xl text-[#7a36dd]"
              >
                {ctaText}
                <ArrowRight className="ml-2 h-5 w-5 md:h-6 md:w-6" />
              </ShimmerButton>
            </Link>
            <p className="text-sm md:text-base text-white/70">
              {trustText}
            </p>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
