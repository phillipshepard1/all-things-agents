'use client';

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

const philosophyStatements = [
  "Simplify everything.",
  "Make real estate fun again.",
  "Love your work, not your software.",
];

export function PhilosophySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-hub-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {philosophyStatements.map((statement, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
              className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-hub-foreground"
            >
              {statement}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
