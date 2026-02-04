"use client";

import { motion } from "motion/react";
import { BlurFade } from "@/components/ui/blur-fade";

interface LandingProblemProps {
  title?: string;
  lead?: string;
  painPoints: string[];
  conclusion?: string;
}

export function LandingProblem({
  title = "Sound Familiar?",
  lead = "You close the deal, promise to stay in touch... and then life happens.",
  painPoints,
  conclusion = "Six months later, they've listed with someone else. Not because you didn't care—because you couldn't keep up.",
}: LandingProblemProps) {
  return (
    <section className="py-16 md:py-24 bg-gray-50/50">
      <div className="container mx-auto max-w-3xl px-4">
        <BlurFade delay={0.1} inView>
          <h2 className="text-3xl font-bold tracking-tight text-center text-foreground sm:text-4xl md:text-5xl">
            {title}
          </h2>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <p className="mt-6 text-lg md:text-xl text-center text-muted-foreground leading-relaxed">
            {lead}
          </p>
        </BlurFade>

        <BlurFade delay={0.3} inView>
          <ul className="mt-8 space-y-4">
            {painPoints.map((point, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 text-base md:text-lg text-foreground/80"
              >
                <span className="mt-1.5 h-2 w-2 rounded-full bg-red-400 flex-shrink-0" />
                {point}
              </motion.li>
            ))}
          </ul>
        </BlurFade>

        <BlurFade delay={0.5} inView>
          <p className="mt-8 text-base md:text-lg text-center text-muted-foreground italic">
            {conclusion}
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
