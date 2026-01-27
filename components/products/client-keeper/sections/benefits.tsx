"use client";

import { Check, TrendingUp, Clock, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { benefits } from "@/data/features";
import { NumberTicker } from "@/components/ui/number-ticker";
import { BlurFade } from "@/components/ui/blur-fade";

export function Benefits() {
  return (
    <section className="bg-muted/30 py-24 md:py-36">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left: Content */}
          <div>
            <Badge
              variant="secondary"
              className="mb-5 border border-accent/20 bg-accent/10 px-4 py-1.5 text-base md:text-home-sm font-medium"
            >
              Why Client Keeper
            </Badge>
            <h2 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-home-6xl">
              Keep more clients.{" "}
              <span className="text-gradient">Close more deals.</span>
            </h2>
            <p className="mt-5 text-xl md:text-home-lg text-muted-foreground">
              Built by real estate agents, for real estate agents. We understand
              the unique challenges you face and designed every feature to help
              you succeed.
            </p>

            {/* Benefits list */}
            <ul className="mt-10 space-y-5">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <Check className="h-4 w-4 md:h-5 md:w-5 text-accent" />
                  </div>
                  <span className="text-lg md:text-home-base text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Visual stats */}
          <div className="relative">
            {/* Decorative background */}
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-accent/5 to-primary/5" />

            <div className="grid gap-4 p-5 sm:gap-5 sm:p-7 md:p-8 sm:grid-cols-2">
              {/* Stat card 1 */}
              <BlurFade delay={0.1} inView>
                <div className="card-hover rounded-2xl border border-white/30 bg-white/70 p-5 sm:p-7 md:p-8 shadow-warm-lg backdrop-blur-sm">
                  <div className="mb-4 sm:mb-5 flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-xl bg-accent/10">
                    <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-accent" />
                  </div>
                  <div className="text-3xl sm:text-4xl md:text-home-4xl font-bold text-foreground">
                    <NumberTicker value={40} className="text-foreground" />
                    <span>%</span>
                  </div>
                  <div className="mt-1.5 text-base md:text-home-sm text-muted-foreground">
                    Increase in client retention
                  </div>
                </div>
              </BlurFade>

              {/* Stat card 2 */}
              <BlurFade delay={0.2} inView>
                <div className="card-hover rounded-2xl border border-white/30 bg-white/70 p-5 sm:p-7 md:p-8 shadow-warm-lg backdrop-blur-sm">
                  <div className="mb-4 sm:mb-5 flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-xl bg-primary/10">
                    <Clock className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                  </div>
                  <div className="text-3xl sm:text-4xl md:text-home-4xl font-bold text-foreground">
                    <NumberTicker value={10} className="text-foreground" />
                    <span>+</span>
                  </div>
                  <div className="mt-1.5 text-base md:text-home-sm text-muted-foreground">
                    Hours saved per week
                  </div>
                </div>
              </BlurFade>

              {/* Stat card 3 */}
              <BlurFade delay={0.3} inView>
                <div className="card-hover rounded-2xl border border-white/30 bg-white/70 p-5 sm:p-7 md:p-8 shadow-warm-lg backdrop-blur-sm">
                  <div className="mb-4 sm:mb-5 flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-xl bg-green-500/10">
                    <Check className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
                  </div>
                  <div className="text-3xl sm:text-4xl md:text-home-4xl font-bold text-foreground">
                    <NumberTicker value={2} className="text-foreground" />
                    <span>x</span>
                  </div>
                  <div className="mt-1.5 text-base md:text-home-sm text-muted-foreground">
                    Faster deal closings
                  </div>
                </div>
              </BlurFade>

              {/* Stat card 4 */}
              <BlurFade delay={0.4} inView>
                <div className="card-hover rounded-2xl border border-white/30 bg-white/70 p-5 sm:p-7 md:p-8 shadow-warm-lg backdrop-blur-sm">
                  <div className="mb-4 sm:mb-5 flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-xl bg-red-500/10">
                    <Heart className="h-6 w-6 md:h-8 md:w-8 text-red-500" />
                  </div>
                  <div className="text-3xl sm:text-4xl md:text-home-4xl font-bold text-foreground">
                    <NumberTicker value={98} className="text-foreground" />
                    <span>%</span>
                  </div>
                  <div className="mt-1.5 text-base md:text-home-sm text-muted-foreground">
                    Customer satisfaction
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
