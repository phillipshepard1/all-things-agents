"use client";

import { BrowserCarousel } from "@/components/ui/browser-carousel";
import { Badge } from "@/components/ui/badge";
import { WordRotate } from "@/components/ui/word-rotate";

const rotatingPhrases = [
  "right in your browser",
  "on the go",
  "in the school pick-up line",
  "at the farmers market",
  "between showings",
  "at the coffee shop",
  "waiting for clients",
];

export function DesktopShowcase() {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <div className="mx-auto mb-14 md:mb-16 max-w-3xl text-center">
          <Badge variant="secondary" className="mb-5 border border-accent/20 bg-accent/10 px-4 py-1.5 text-base md:text-home-sm text-accent">
            Desktop and Mobile
          </Badge>
          <h2 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-home-6xl text-foreground">
            {/* Mobile: stacked layout */}
            <span className="block md:hidden text-center">
              Your Full CRM,
              <br />
              <WordRotate
                words={rotatingPhrases}
                duration={2500}
                className="text-gradient whitespace-nowrap"
              />
            </span>
            {/* Desktop: stacked layout */}
            <span className="hidden md:block text-center">
              Your Full CRM,
              <br />
              <WordRotate
                words={rotatingPhrases}
                duration={2500}
                className="text-gradient"
              />
            </span>
          </h2>
          <p className="mt-5 text-xl md:text-home-lg text-muted-foreground">
            Access everything from any computer. Same powerful features, bigger screen for when you need it.
          </p>
        </div>

        {/* Browser Carousel */}
        <BrowserCarousel />
      </div>
    </section>
  );
}
