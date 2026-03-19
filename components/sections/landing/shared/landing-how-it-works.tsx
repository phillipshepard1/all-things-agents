"use client";

import Link from "next/link";
import { ArrowRight, Mic, Sparkles, CalendarCheck } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";

interface Step {
  icon: "mic" | "sparkles" | "calendar";
  title: string;
  description: string;
}

interface LandingHowItWorksProps {
  title?: string;
  steps?: Step[];
  ctaText?: string;
  ctaHref?: string;
  showCta?: boolean;
}

const iconMap = {
  mic: Mic,
  sparkles: Sparkles,
  calendar: CalendarCheck,
};

const defaultSteps: Step[] = [
  {
    icon: "mic",
    title: "Speak It",
    description: "Send a voice note between showings, in the car, anywhere.",
  },
  {
    icon: "sparkles",
    title: "MYRA Organizes It",
    description: "Notes become contacts. Details become tasks. Follow-ups get scheduled.",
  },
  {
    icon: "calendar",
    title: "You Stay Consistent",
    description: "Never miss a birthday, check-in, or opportunity again.",
  },
];

export function LandingHowItWorks({
  title = "How It Works",
  steps = defaultSteps,
  ctaText = "Start Your Free Trial",
  ctaHref = "https://appnew.clientkeepercrm.com/register",
  showCta = true,
}: LandingHowItWorksProps) {
  return (
    <section className="py-16 md:py-24 bg-gray-50/50">
      <div className="container mx-auto max-w-4xl px-4">
        <BlurFade delay={0.1} inView>
          <h2 className="text-3xl font-bold tracking-tight text-center text-foreground sm:text-4xl md:text-5xl">
            {title}
          </h2>
        </BlurFade>

        <div className="mt-12 md:mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = iconMap[step.icon];
            return (
              <BlurFade key={index} delay={0.2 + index * 0.1} inView>
                <div className="relative flex flex-col items-center text-center">
                  {/* Step number */}
                  <div className="absolute -top-3 -right-3 md:-top-4 md:-left-2 md:right-auto h-8 w-8 rounded-full bg-[#7a36dd] text-white text-sm font-bold flex items-center justify-center">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#7a36dd]/10 to-purple-100 dark:from-[#7a36dd]/20 dark:to-purple-900/30 flex items-center justify-center mb-5">
                    <Icon className="h-8 w-8 text-[#7a36dd]" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-base text-muted-foreground">
                    {step.description}
                  </p>

                  {/* Connector line (hidden on mobile, shown between items on desktop) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[calc(100%+1rem)] w-[calc(100%-2rem)] h-[2px] bg-gradient-to-r from-[#7a36dd]/30 to-transparent -translate-x-1/2" />
                  )}
                </div>
              </BlurFade>
            );
          })}
        </div>

        {showCta && (
          <BlurFade delay={0.5} inView>
            <div className="mt-12 flex flex-col items-center gap-4">
              <Link href={ctaHref}>
                <ShimmerButton
                  shimmerColor="#ffffff"
                  background="#7a36dd"
                  borderRadius="14px"
                  className="h-14 px-10 text-lg font-medium shadow-warm-lg w-full sm:w-auto"
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
        )}
      </div>
    </section>
  );
}
