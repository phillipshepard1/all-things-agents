"use client";

import Image from "next/image";
import { myraFeatures, myraDescription } from "@/data/myra-features";

function FeatureCard({ feature, position }: { feature: typeof myraFeatures[0]; position: "left" | "right" }) {
  const Icon = feature.icon;
  return (
    <div className={`relative ${position === "left" ? "text-right" : "text-left"}`}>
      <div className="rounded-2xl border border-border/40 bg-white/70 p-4 shadow-warm backdrop-blur-sm">
        <div className={`flex items-start gap-3 ${position === "left" ? "flex-row-reverse" : ""}`}>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
            <Icon className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{feature.title}</h4>
            <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
          </div>
        </div>
      </div>
      {/* Connector line to center */}
      <div
        className={`absolute top-1/2 hidden h-0.5 w-8 bg-accent/30 lg:block ${
          position === "left" ? "-right-8" : "-left-8"
        }`}
      />
    </div>
  );
}

export function MyraV3() {
  const leftFeatures = myraFeatures.slice(0, 3);
  const rightFeatures = myraFeatures.slice(3);

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            What Can <span className="text-gradient">MYRA</span> Do For You?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {myraDescription}
          </p>
        </div>

        {/* Centered Layout - Cards flowing around character */}
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-12">
          {/* Left Cards */}
          <div className="space-y-4 lg:space-y-6">
            {leftFeatures.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} position="left" />
            ))}
          </div>

          {/* Center - MYRA Character */}
          <div className="relative order-first flex justify-center lg:order-none">
            <div className="relative">
              {/* Speech bubble */}
              <div className="absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-2xl border border-border/40 bg-white px-4 py-2 shadow-warm">
                <p className="text-lg font-semibold text-foreground">Hi, I&apos;m MYRA</p>
                {/* Bubble tail */}
                <div className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-b border-r border-border/40 bg-white" />
              </div>
              <Image
                src="/images/myra-character.webp"
                alt="MYRA - My Real Estate Assistant"
                width={200}
                height={260}
                className="h-auto w-[160px] sm:w-[200px]"
                priority
              />
              {/* Decorative circle */}
              <div className="absolute -inset-8 -z-10 rounded-full bg-accent/5" />
            </div>
          </div>

          {/* Right Cards */}
          <div className="space-y-4 lg:space-y-6">
            {rightFeatures.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} position="right" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
