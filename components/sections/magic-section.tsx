"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";
import React, { forwardRef, useRef } from "react";

interface MagicSectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
}

const MagicSection = forwardRef<HTMLElement, MagicSectionProps>(
  (
    { id, title, subtitle, description, children, className, align = "center" },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLElement>(null);
    const ref = (forwardedRef || internalRef) as React.RefObject<HTMLElement>;

    const sectionId = title ? title.toLowerCase().replace(/\s+/g, "-") : id;
    const alignmentClass =
      align === "left"
        ? "text-left"
        : align === "right"
        ? "text-right"
        : "text-center";

    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.05, 0.1], [0, 0, 1]);
    const y = useTransform(scrollYProgress, [0, 0.05, 0.1], [30, 30, 0]);

    return (
      <section id={id || sectionId} ref={ref}>
        <div className={cn("py-12 sm:py-20", className)}>
          {(title || subtitle || description) && (
            <div className={cn(alignmentClass, "space-y-4 pb-10 mx-auto")}>
              {title && (
                <motion.h2
                  className="text-sm text-accent text-balance font-mono font-semibold tracking-wider uppercase"
                  style={{ opacity, y }}
                >
                  {title}
                </motion.h2>
              )}

              {subtitle && (
                <motion.h3
                  className={cn(
                    "mx-0 mt-4 max-w-lg text-4xl text-balance font-bold sm:max-w-none sm:text-4xl md:text-5xl leading-[1.2] tracking-tighter text-foreground",
                    align === "center"
                      ? "mx-auto"
                      : align === "right"
                      ? "ml-auto"
                      : ""
                  )}
                  style={{ opacity, y }}
                >
                  {subtitle}
                </motion.h3>
              )}
              {description && (
                <motion.p
                  className={cn(
                    "mt-6 text-lg leading-8 text-muted-foreground text-balance max-w-2xl",
                    align === "center"
                      ? "mx-auto"
                      : align === "right"
                      ? "ml-auto"
                      : ""
                  )}
                  style={{ opacity, y }}
                >
                  {description}
                </motion.p>
              )}
            </div>
          )}
          {children}
        </div>
      </section>
    );
  }
);

MagicSection.displayName = "MagicSection";

export { MagicSection };
