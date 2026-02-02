'use client';

import { motion } from 'motion/react';
import { GridPattern } from '@/components/ui/grid-pattern';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-hub-background">
      {/* Grid Pattern Background */}
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
          "absolute inset-0 h-full w-full fill-hub-muted stroke-hub-border/40"
        )}
      />

      <div className="container relative z-10 mx-auto px-4 pt-24 pb-20 md:pt-32 md:pb-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-hub-foreground tracking-tight leading-[1.1]"
          >
            Real estate software got complicated.{' '}
            <span className="text-hub-muted-foreground">We fixed that.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-8 text-xl md:text-2xl text-hub-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Simple, powerful tools that let you focus on what matters—showing homes and building relationships.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="mt-10"
          >
            <Link
              href="#products"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-hub-accent-foreground bg-hub-accent rounded-full hover:bg-hub-foreground transition-colors duration-200"
            >
              Explore Our Tools
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
