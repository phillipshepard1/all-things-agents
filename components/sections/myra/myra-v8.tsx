"use client";

import Image from "next/image";
import { myraFeatures, myraDescription, myraTagline } from "@/data/myra-features";
import { BorderBeam } from "@/components/ui/border-beam";
import { MagicCard } from "@/components/ui/magic-card";
import { cn } from "@/lib/utils";

export function MyraV8() {
  return (
    <section className="py-24 md:py-36 bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <h2 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-home-6xl">
            What Can <span className="text-gradient">MYRA</span> Do For You?
          </h2>
          <p className="mt-5 text-xl md:text-home-lg text-muted-foreground">
            {myraDescription}
          </p>
        </div>

        {/* Animated Bento Grid */}
        <div className="grid gap-5 md:gap-6 md:grid-cols-3 md:grid-rows-3">
          {/* Hero Card - MYRA intro with BorderBeam */}
          <div className="relative overflow-hidden rounded-3xl md:col-span-2 md:row-span-1">
            <MagicCard
              className="h-full"
              gradientColor="#7a36dd20"
              gradientFrom="#7a36dd"
              gradientTo="#9c40ff"
            >
              <div className="flex items-center gap-7 p-7 md:p-8">
                <div className="relative h-28 w-28 md:h-32 md:w-32 shrink-0 overflow-hidden rounded-2xl bg-white/50">
                  <Image
                    src="/images/myra-character.webp"
                    alt="MYRA"
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div>
                  <p className="text-base md:text-home-sm font-medium uppercase tracking-wider text-accent">
                    Meet Your Assistant
                  </p>
                  <h3 className="mt-1.5 text-3xl md:text-home-2xl font-bold text-foreground">
                    Hi, I&apos;m MYRA
                  </h3>
                  <p className="mt-2.5 text-lg md:text-home-base text-muted-foreground">{myraTagline}</p>
                </div>
              </div>
            </MagicCard>
            <BorderBeam
              size={200}
              duration={8}
              colorFrom="#7a36dd"
              colorTo="#9c40ff"
            />
          </div>

          {/* Feature 1 - Schedule Follow Ups (tall card with BorderBeam) */}
          {(() => {
            const feature = myraFeatures[0];
            const Icon = feature.icon;
            return (
              <div className="relative overflow-hidden rounded-3xl md:row-span-2">
                <MagicCard
                  className="flex h-full flex-col justify-between"
                  gradientColor="#7a36dd15"
                  gradientFrom="#7a36dd"
                  gradientTo="#FE8BBB"
                >
                  <div className="p-7 md:p-8">
                    <div className="flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-accent/10">
                      <Icon className="h-7 w-7 md:h-8 md:w-8 text-accent" />
                    </div>
                    <h4 className="mt-5 text-xl md:text-home-lg font-semibold text-foreground">{feature.title}</h4>
                    <p className="mt-2.5 text-base md:text-home-sm text-muted-foreground">{feature.description}</p>
                  </div>
                  <div className="p-7 md:p-8 pt-0">
                    <div className="rounded-xl bg-accent/5 p-4 border border-accent/10">
                      <p className="text-sm md:text-base italic text-muted-foreground">
                        &quot;Check in with the Millers every 6 months&quot;
                      </p>
                    </div>
                  </div>
                </MagicCard>
                <BorderBeam
                  size={120}
                  duration={6}
                  delay={1}
                  colorFrom="#7a36dd"
                  colorTo="#FE8BBB"
                />
              </div>
            );
          })()}

          {/* Feature 2 - Capture Client Data */}
          {(() => {
            const feature = myraFeatures[1];
            const Icon = feature.icon;
            return (
              <div className="relative overflow-hidden rounded-3xl">
                <MagicCard
                  className="h-full"
                  gradientColor="#7a36dd10"
                  gradientFrom="#7a36dd"
                  gradientTo="#9c40ff"
                >
                  <div className="p-7 md:p-8">
                    <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-xl bg-accent/10">
                      <Icon className="h-6 w-6 md:h-7 md:w-7 text-accent" />
                    </div>
                    <h4 className="mt-4 text-lg md:text-home-base font-semibold text-foreground">{feature.title}</h4>
                    <p className="mt-1.5 text-base md:text-home-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </MagicCard>
              </div>
            );
          })()}

          {/* Feature 3 - Remember Client Details */}
          {(() => {
            const feature = myraFeatures[2];
            const Icon = feature.icon;
            return (
              <div className="relative overflow-hidden rounded-3xl">
                <MagicCard
                  className="h-full"
                  gradientColor="#7a36dd10"
                  gradientFrom="#9c40ff"
                  gradientTo="#FE8BBB"
                >
                  <div className="p-7 md:p-8">
                    <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-xl bg-accent/10">
                      <Icon className="h-6 w-6 md:h-7 md:w-7 text-accent" />
                    </div>
                    <h4 className="mt-4 text-lg md:text-home-base font-semibold text-foreground">{feature.title}</h4>
                    <p className="mt-1.5 text-base md:text-home-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </MagicCard>
              </div>
            );
          })()}

          {/* Features 4 & 5 - Wide card with BorderBeam */}
          <div className="relative overflow-hidden rounded-3xl md:col-span-2">
            <MagicCard
              className="h-full"
              gradientColor="#7a36dd15"
              gradientFrom="#7a36dd"
              gradientTo="#300092"
            >
              <div className="grid gap-7 p-7 md:p-8 sm:grid-cols-2">
                {myraFeatures.slice(3, 5).map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div key={feature.title} className="flex items-start gap-4">
                      <div className="flex h-12 w-12 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                        <Icon className="h-6 w-6 md:h-7 md:w-7 text-accent" />
                      </div>
                      <div>
                        <h4 className="text-lg md:text-home-base font-semibold text-foreground">{feature.title}</h4>
                        <p className="mt-1.5 text-base md:text-home-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </MagicCard>
            <BorderBeam
              size={150}
              duration={7}
              delay={2}
              colorFrom="#300092"
              colorTo="#7a36dd"
            />
          </div>

          {/* Feature 6 - Important Dates (accent card with BorderBeam) */}
          {(() => {
            const feature = myraFeatures[5];
            const Icon = feature.icon;
            return (
              <div className="relative overflow-hidden rounded-3xl">
                <MagicCard
                  className="h-full"
                  gradientColor="#7a36dd20"
                  gradientFrom="#FE8BBB"
                  gradientTo="#7a36dd"
                >
                  <div className="p-7 md:p-8">
                    <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-xl bg-accent text-white">
                      <Icon className="h-6 w-6 md:h-7 md:w-7" />
                    </div>
                    <h4 className="mt-4 text-lg md:text-home-base font-semibold text-foreground">{feature.title}</h4>
                    <p className="mt-1.5 text-base md:text-home-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </MagicCard>
                <BorderBeam
                  size={100}
                  duration={5}
                  delay={3}
                  colorFrom="#FE8BBB"
                  colorTo="#7a36dd"
                />
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}
