"use client";

import { Clock, Heart, Brain, Smartphone, Users, CheckCircle } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import type { LucideIcon } from "lucide-react";

interface Benefit {
  icon: "clock" | "heart" | "brain" | "smartphone" | "users" | "check";
  title: string;
  description: string;
}

interface LandingBenefitsProps {
  title?: string;
  subtitle?: string;
  benefits: Benefit[];
}

const iconMap: Record<Benefit["icon"], LucideIcon> = {
  clock: Clock,
  heart: Heart,
  brain: Brain,
  smartphone: Smartphone,
  users: Users,
  check: CheckCircle,
};

export function LandingBenefits({
  title = "What You'll Get",
  subtitle,
  benefits,
}: LandingBenefitsProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-4">
        <BlurFade delay={0.1} inView>
          <h2 className="text-3xl font-bold tracking-tight text-center text-foreground sm:text-4xl md:text-5xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-lg text-center text-muted-foreground">
              {subtitle}
            </p>
          )}
        </BlurFade>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {benefits.map((benefit, index) => {
            const Icon = iconMap[benefit.icon];
            return (
              <BlurFade key={index} delay={0.2 + index * 0.1} inView>
                <div className="flex gap-4 p-5 rounded-xl bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#7a36dd]/10 to-purple-100 dark:from-[#7a36dd]/20 dark:to-purple-900/30 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-[#7a36dd]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="mt-1 text-base text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
