"use client";

import { Quote } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company?: string;
  initials: string;
}

interface LandingTestimonialsProps {
  title?: string;
  subtitle?: string;
  testimonials: Testimonial[];
}

export function LandingTestimonials({
  title = "What Agents Are Saying",
  subtitle,
  testimonials,
}: LandingTestimonialsProps) {
  return (
    <section className="py-16 md:py-24 bg-gray-50/50">
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

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <BlurFade key={index} delay={0.2 + index * 0.1} inView>
              <div className="relative p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm h-full flex flex-col">
                {/* Quote icon */}
                <div className="absolute right-4 top-4 opacity-5">
                  <Quote className="h-10 w-10 text-[#7a36dd]" />
                </div>

                {/* Quote text */}
                <blockquote className="text-base text-foreground leading-relaxed flex-1">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 mt-5 pt-5 border-t border-gray-100 dark:border-gray-800">
                  <Avatar className="h-10 w-10 border-2 border-[#7a36dd]/20">
                    <AvatarFallback className="bg-[#7a36dd]/10 text-sm font-semibold text-[#7a36dd]">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.title}
                      {testimonial.company && `, ${testimonial.company}`}
                    </p>
                  </div>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
