"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";

interface LandingSolutionProps {
  title?: string;
  description: string;
  example?: {
    label: string;
    voiceNote: string;
    result: string;
  };
  ctaText?: string;
  ctaHref?: string;
}

export function LandingSolution({
  title = "There's a Simpler Way",
  description,
  example,
  ctaText = "Start Your Free Trial",
  ctaHref = "https://appnew.clientkeepercrm.com/register",
}: LandingSolutionProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-3xl px-4">
        <BlurFade delay={0.1} inView>
          <h2 className="text-3xl font-bold tracking-tight text-center text-foreground sm:text-4xl md:text-5xl">
            {title}
          </h2>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <p className="mt-6 text-lg md:text-xl text-center text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        </BlurFade>

        {example && (
          <BlurFade delay={0.3} inView>
            <div className="mt-10 rounded-2xl bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/30 dark:to-gray-900 p-6 md:p-8 border border-purple-100 dark:border-purple-900">
              <p className="text-sm font-medium text-[#7a36dd] uppercase tracking-wide mb-4">
                {example.label}
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-[#7a36dd]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="h-4 w-4 text-[#7a36dd]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 15c1.66 0 2.99-1.34 2.99-3L15 6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 15 6.7 12H5c0 3.42 2.72 6.23 6 6.72V22h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
                    </svg>
                  </div>
                  <p className="text-base md:text-lg text-foreground italic">
                    "{example.voiceNote}"
                  </p>
                </div>
                <div className="flex items-start gap-3 pl-11">
                  <span className="text-[#7a36dd] font-medium">→</span>
                  <p className="text-base text-muted-foreground">
                    {example.result}
                  </p>
                </div>
              </div>
            </div>
          </BlurFade>
        )}

        <BlurFade delay={0.4} inView>
          <div className="mt-10 flex flex-col items-center gap-4">
            <Link href={ctaHref}>
              <ShimmerButton
                shimmerColor="#ffffff"
                background="#7a36dd"
                borderRadius="14px"
                className="h-14 px-10 text-lg font-medium shadow-warm-lg"
              >
                {ctaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </ShimmerButton>
            </Link>
            <p className="text-sm text-muted-foreground">
              No credit card required
            </p>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
