"use client";

import { Settings2, Keyboard, Bell, ArrowLeftRight, Users, Briefcase } from "lucide-react";
import { IphoneCarousel } from "@/components/ui/iphone-carousel";
import { BlurFade } from "@/components/ui/blur-fade";

// Features data from Client Keeper
const features = [
  {
    icon: Settings2,
    title: "Simple To The Core",
    description: "Real estate has enough moving parts. We keep your CRM refreshingly simple.",
  },
  {
    icon: Keyboard,
    title: "Effortless Data Entry",
    description: "Let Myra handle the data entry while you focus on closing deals and building relationships.",
  },
  {
    icon: Bell,
    title: "Smart Follow-Up Reminders",
    description: "Never let another hot lead go cold or miss a past client's birthday again.",
  },
  {
    icon: ArrowLeftRight,
    title: "Done-For-You Data Transfer",
    description: "Start fresh without starting over - we'll move all your contacts and history from your old CRM for you.",
  },
  {
    icon: Users,
    title: "Grow Your Sphere",
    description: "Turn every interaction into a lasting relationship that generates referrals for years to come.",
  },
  {
    icon: Briefcase,
    title: "Manage Your Full Business",
    description: "Run your entire real estate business from one simple app - contacts, deals, tasks, and follow-ups all in one place.",
  },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="py-20 md:py-32">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="mb-14 text-center text-5xl font-bold text-gradient sm:text-6xl md:mb-20 md:text-home-6xl">
          Features
        </h2>

        <div className="grid items-center gap-10 md:gap-16 lg:grid-cols-2">
          {/* iPhone Carousel - centered on mobile, left on desktop */}
          <div className="order-1 lg:order-1">
            <IphoneCarousel />
          </div>

          {/* Features Grid */}
          <div className="order-2 grid gap-8 sm:grid-cols-2 lg:order-2">
            {features.map((feature, index) => (
              <BlurFade key={index} delay={0.1 + index * 0.1} inView>
                <div className="flex gap-4 sm:gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-white sm:h-14 sm:w-14 md:h-16 md:w-16">
                    <feature.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                  </div>
                  <div>
                    <h3 className="mb-1.5 text-lg font-semibold text-foreground sm:mb-2 sm:text-xl md:text-home-lg">{feature.title}</h3>
                    <p className="text-base md:text-home-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
