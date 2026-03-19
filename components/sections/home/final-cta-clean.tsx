import { BlurFade } from "@/components/ui/blur-fade";

export function FinalCtaClean() {
  return (
    <section className="bg-background py-28 md:py-40">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <BlurFade delay={0} inView>
            <h2 className="text-4xl md:text-home-5xl font-bold text-foreground">
              Ready to get started?
            </h2>
          </BlurFade>

          <BlurFade delay={0.1} inView>
            <p className="text-lg md:text-home-lg text-muted-foreground mt-5">
              Try Client Keeper free for 30 days.
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
            </div>
          </BlurFade>

          <BlurFade delay={0.25} inView>
            <p className="text-sm text-muted-foreground mt-6">
              By signing up, you agree to our{" "}
              <a
                href="/client-keeper-crm/terms-of-service"
                className="underline hover:text-foreground transition-colors"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/client-keeper-crm/privacy-policy"
                className="underline hover:text-foreground transition-colors"
              >
                Privacy Policy
              </a>
              .
            </p>
            <p className="text-sm text-muted-foreground mt-3">
              No credit card required · Cancel anytime
            </p>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
