import { Marquee } from "@/components/ui/marquee";

export function SocialProof() {
  const companies = [
    "The Sudar Group",
    "Momentum Loans",
    "Keller Williams",
    "EXIT Realty",
    "AMC Mortgage",
    "Collier & Associates",
    "First Colony Mortgage",
  ];

  return (
    <section className="border-y border-border/40 bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-14">
        <p className="mb-10 text-center text-base md:text-home-sm font-medium uppercase tracking-wider text-muted-foreground">
          USED BY
        </p>
        <div className="relative">
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-28 md:w-32 bg-gradient-to-r from-muted/30 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-28 md:w-32 bg-gradient-to-l from-muted/30 to-transparent" />

          <Marquee pauseOnHover className="[--duration:30s]">
            {companies.map((company) => (
              <div
                key={company}
                className="mx-10 text-2xl font-semibold text-muted-foreground/60 transition-colors hover:text-muted-foreground md:text-home-2xl"
              >
                {company}
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
