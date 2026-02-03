'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

function AnimatedSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function WhyPage() {
  return (
    <div className="bg-hub-background">
      {/* Section 1 — Hero */}
      <section className="relative pt-20 pb-6 md:pt-28 md:pb-8">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium uppercase tracking-[0.2em] text-hub-muted-foreground mb-6"
          >
            Our Why
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-hub-foreground tracking-tight leading-[1.1]"
          >
            We Built This Because We Had&nbsp;To.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
            className="mt-6 text-xl md:text-2xl font-medium text-hub-muted-foreground leading-relaxed"
          >
            We&apos;re real estate agents who got tired of fighting our own
            software. So we started building something&nbsp;better.
          </motion.p>
        </div>
      </section>

      {/* Section 2 — The Problem */}
      <section className="py-6 md:py-8">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <AnimatedSection>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-hub-foreground tracking-tight leading-tight">
              The Tools Became the&nbsp;Problem.
            </h2>
          </AnimatedSection>

          <div className="mt-8 space-y-5 text-xl md:text-2xl font-medium text-hub-muted-foreground leading-relaxed">
            <AnimatedSection delay={0.1}>
              <p>
                You know the feeling. You sit down to send a client a quick
                update and somehow end up 47 tabs deep, three dropdown menus
                in, staring at a settings page you&apos;ve never seen before.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <p>
                By the time you find the right button, you&apos;ve forgotten
                what you were going to say.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p>
                Somewhere along the way, someone decided agents needed
                dashboards that require their own dashboards to explain. Enterprise
                features nobody asked for. Onboarding programs that take longer
                than getting your license&nbsp;did.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <p>
                And the worst part? Most of it was built by people who&apos;ve
                never shown a house. Never sat in a car between showings trying
                to pull up a contact on a phone with 4% battery. Never had a
                client call at 9pm about a listing that just went&nbsp;pending.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <p>
                They built software for &ldquo;the real estate
                industry.&rdquo; We needed software for Tuesday&nbsp;afternoon.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Section 3 — Our Approach */}
      <section className="py-6 md:py-8">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <AnimatedSection>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-hub-foreground tracking-tight leading-tight">
              So We Started Building Our&nbsp;Own.
            </h2>
          </AnimatedSection>

          <div className="mt-8 space-y-5 text-xl md:text-2xl font-medium text-hub-muted-foreground leading-relaxed">
            <AnimatedSection delay={0.1}>
              <p>
                We&apos;re not trying to be your everything platform. We
                don&apos;t want to replace your brain or automate your
                personality.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <p>
                We&apos;re building tools for the work you actually do — the
                daily stuff that should be quick and painless but never&nbsp;is.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p>
                No bloat. No learning curve that feels like a second career. No
                90-day onboarding with a &ldquo;success manager&rdquo; assigned
                to explain what buttons&nbsp;do.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <p>
                You open it. It works. You get back to your&nbsp;clients.
              </p>
            </AnimatedSection>
          </div>

          <AnimatedSection className="mt-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-hub-foreground tracking-tight leading-tight">
              From One Agent to&nbsp;Another.
            </h2>
          </AnimatedSection>

          <div className="mt-8 space-y-5 text-xl md:text-2xl font-medium text-hub-muted-foreground leading-relaxed">
            <AnimatedSection delay={0.1}>
              <p>
                Every product we make is built by agents, for agents. Not
                because that&apos;s a good marketing line — because it&apos;s
                the only way to build something that actually fits the&nbsp;job.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <p>
                We know what matters because we live it. We know what&apos;s
                annoying because we&apos;ve been annoyed by&nbsp;it.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p>
                We think you deserve better tools. And we&apos;re not waiting
                around for someone else to build&nbsp;them.
              </p>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.3} className="mt-16">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* Left: Signature sign-off */}
              <div className="flex-1 text-center md:text-right">
                <p className="font-signature text-3xl md:text-4xl text-hub-foreground">
                  — Phillip & Nicole
                </p>
              </div>

              {/* Right: Photo */}
              <div className="flex-1">
                <div className="max-w-xs mx-auto md:mx-0">
                  <Image
                    src="/nicole-and-phillip.png"
                    alt="Phillip and Nicole Shepard"
                    width={1400}
                    height={900}
                    className="w-full h-auto rounded-lg shadow-md ring-1 ring-black/5"
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-12 text-center">
          <AnimatedSection>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-hub-foreground tracking-tight">
              Come See What We&apos;re&nbsp;Building.
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="mt-4 text-lg text-hub-muted-foreground">
              No pitch deck. No demo request form. Just tools that&nbsp;work.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <Link
              href="/#products"
              className="mt-8 inline-flex items-center gap-2 px-8 py-4 text-lg font-medium text-hub-accent-foreground bg-hub-accent rounded-full hover:bg-hub-foreground transition-colors duration-200"
            >
              See What We&apos;re Building
              <ArrowRight className="h-5 w-5" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}
