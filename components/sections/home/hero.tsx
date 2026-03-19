import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";

export function Hero() {
  return (
    <section className="bg-background py-28 md:py-40">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <BlurFade delay={0} inView>
            <p className="text-sm uppercase tracking-widest font-medium text-accent mb-6">
              The CRM built for real estate agents
            </p>
          </BlurFade>

          <BlurFade delay={0.1} inView>
            <h1 className="text-5xl md:text-home-7xl font-extrabold text-foreground leading-tight">
              Real estate made simple.
            </h1>
          </BlurFade>

          <BlurFade delay={0.15} inView>
            <p className="text-lg md:text-home-lg text-muted-foreground max-w-2xl mx-auto mt-6">
              Manage clients, automate follow-ups, and close more deals — without
              the tech overwhelm.
            </p>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <div className="mt-10">
              <a
                href="https://appnew.clientkeepercrm.com/register"
                className="inline-flex items-center justify-center rounded-xl bg-[#7a36dd] hover:bg-[#6b2cc4] text-white px-8 py-4 text-lg md:text-home-lg font-medium transition-colors"
              >
                Start Free Trial
              </a>
              <p className="text-sm text-muted-foreground mt-4">
                No credit card required · 30-day free trial
              </p>
            </div>
          </BlurFade>
        </div>

        <BlurFade delay={0.3} inView>
          <div className="max-w-5xl mx-auto mt-16">
            <Image
              src="/images/hero-devices.jpg"
              alt="Client Keeper CRM on MacBook and iPhone"
              width={1200}
              height={700}
              priority
              className="rounded-2xl shadow-warm-xl"
            />
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
