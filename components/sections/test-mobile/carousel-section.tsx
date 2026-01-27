"use client";

import { MagicSection } from "@/components/sections/magic-section";
import { IphoneCarousel } from "@/components/ui/iphone-carousel";

export function CarouselSection() {
  return (
    <MagicSection
      id="carousel"
      title="Try It Yourself"
      subtitle="Swipe through the app"
      description="Navigate through the screens to see how Client Keeper helps real estate agents manage their business."
      className="container px-4 mx-auto max-w-6xl"
    >
      <IphoneCarousel />
    </MagicSection>
  );
}
