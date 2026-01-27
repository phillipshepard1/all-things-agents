"use client";

import Image from "next/image";
import { myraFeatures, myraDescription, myraTagline } from "@/data/myra-features";
import { cn } from "@/lib/utils";

export function MyraV7() {
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

        {/* Bento Grid */}
        <div className="grid gap-4 md:grid-cols-3 md:grid-rows-3">
          {/* Large MYRA intro card - spans 2 columns */}
          <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-accent/10 to-accent/5 p-6 shadow-warm md:col-span-2 md:row-span-1">
            <div className="flex items-center gap-6">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-white/50">
                <Image
                  src="/images/myra-character.webp"
                  alt="MYRA"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-accent">
                  Meet Your Assistant
                </p>
                <h3 className="mt-1 text-2xl font-bold text-foreground">
                  Hi, I&apos;m MYRA
                </h3>
                <p className="mt-2 text-muted-foreground">{myraTagline}</p>
              </div>
            </div>
            {/* Decorative gradient blob */}
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
          </div>

          {/* Feature 1 - Schedule Follow Ups (tall card) */}
          {(() => {
            const feature = myraFeatures[0];
            const Icon = feature.icon;
            return (
              <div className="flex flex-col justify-between rounded-3xl border border-border/40 bg-white/70 p-6 shadow-warm backdrop-blur-sm md:row-span-2">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h4 className="mt-4 text-lg font-semibold text-foreground">{feature.title}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                </div>
                <div className="mt-6 rounded-xl bg-muted/50 p-3">
                  <p className="text-xs italic text-muted-foreground">
                    &quot;Check in with the Millers every 6 months&quot;
                  </p>
                </div>
              </div>
            );
          })()}

          {/* Feature 2 - Capture Client Data */}
          {(() => {
            const feature = myraFeatures[1];
            const Icon = feature.icon;
            return (
              <div className="rounded-3xl border border-border/40 bg-white/70 p-6 shadow-warm backdrop-blur-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <h4 className="mt-3 font-semibold text-foreground">{feature.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
              </div>
            );
          })()}

          {/* Feature 3 - Remember Client Details */}
          {(() => {
            const feature = myraFeatures[2];
            const Icon = feature.icon;
            return (
              <div className="rounded-3xl border border-border/40 bg-white/70 p-6 shadow-warm backdrop-blur-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <h4 className="mt-3 font-semibold text-foreground">{feature.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
              </div>
            );
          })()}

          {/* Feature 4 & 5 - Wide card spanning 2 columns */}
          <div className="grid gap-4 rounded-3xl border border-border/40 bg-gradient-to-r from-accent/5 to-transparent p-6 shadow-warm md:col-span-2 sm:grid-cols-2">
            {myraFeatures.slice(3, 5).map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/80">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{feature.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Feature 6 - Important Dates */}
          {(() => {
            const feature = myraFeatures[5];
            const Icon = feature.icon;
            return (
              <div className="rounded-3xl border border-accent/30 bg-accent/5 p-6 shadow-warm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="mt-3 font-semibold text-foreground">{feature.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}
