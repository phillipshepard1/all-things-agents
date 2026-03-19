import Image from "next/image";
import { Check } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";

const bullets = [
  "Schedule Follow Ups",
  "Capture Client Data",
  "Remember Client Details",
  "Record Property Searches",
];

export function MyraSpotlight() {
  return (
    <section className="bg-background py-28 md:py-40">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <BlurFade delay={0.1} inView>
            <div>
              <Image
                src="/images/myra-character.webp"
                width={64}
                height={64}
                alt="MYRA AI Assistant"
                className="rounded-full mb-4"
              />
              <p className="text-sm uppercase tracking-wide text-accent">
                My Real Estate Assistant
              </p>
              <h2 className="text-4xl md:text-home-5xl font-bold text-foreground mt-2">
                Meet MYRA
              </h2>
              <p className="text-base md:text-home-base text-muted-foreground mt-4 max-w-lg">
                MYRA is there to help you streamline data entry and schedule
                follow-ups so you stay organized, build better relationships, and
                close more deals.
              </p>
              <ul className="space-y-4 mt-8">
                {bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                      <Check className="h-3.5 w-3.5 text-accent" />
                    </span>
                    <span className="text-base text-foreground font-medium">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <Image
              src="/images/iphone-desk.jpg"
              alt="Client Keeper CRM on iPhone"
              width={600}
              height={700}
              className="rounded-2xl shadow-warm-lg w-full"
            />
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
