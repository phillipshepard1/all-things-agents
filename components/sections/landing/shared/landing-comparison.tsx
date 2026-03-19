"use client";

import { motion } from "motion/react";
import { BlurFade } from "@/components/ui/blur-fade";
import { X, Check } from "lucide-react";

interface ComparisonRow {
  feature: string;
  otherCrm: string;
  clientKeeper: string;
}

interface LandingComparisonProps {
  title?: string;
  subtitle?: string;
  rows: ComparisonRow[];
}

export function LandingComparison({
  title = "See the Difference",
  subtitle = "Stop paying for complexity you don't need.",
  rows,
}: LandingComparisonProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-4">
        <BlurFade delay={0.1} inView>
          <h2 className="text-3xl font-bold tracking-tight text-center text-foreground sm:text-4xl md:text-5xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-lg text-center text-muted-foreground">
              {subtitle}
            </p>
          )}
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Other CRMs Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/60 p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <X className="h-5 w-5 text-gray-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">
                  Other CRMs
                </h3>
              </div>
              <div className="space-y-4">
                {rows.map((row, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.06 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 h-5 w-5 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                      <X className="h-3 w-3 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {row.feature}
                      </p>
                      <p className="text-base text-gray-600 dark:text-gray-300">
                        {row.otherCrm}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Client Keeper Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="rounded-2xl border-2 border-[#7a36dd]/30 bg-gradient-to-br from-[#F3EEFF] to-white dark:from-[#7a36dd]/10 dark:to-gray-900 p-6 md:p-8 relative overflow-hidden"
            >
              {/* Subtle glow */}
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#7a36dd]/10 blur-2xl" />

              <div className="relative flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-[#7a36dd] flex items-center justify-center">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#7a36dd]">
                  Client Keeper
                </h3>
              </div>
              <div className="relative space-y-4">
                {rows.map((row, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.06 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground/60">
                        {row.feature}
                      </p>
                      <p className="text-base text-foreground font-medium">
                        {row.clientKeeper}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
