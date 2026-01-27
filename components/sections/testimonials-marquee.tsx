"use client";

import { testimonials } from "@/data/testimonials";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <Card className="w-[340px] sm:w-[400px] md:w-[437px] shrink-0 border-border/40 bg-white/70 shadow-warm backdrop-blur-sm">
      <CardContent className="relative p-6 md:p-7">
        {/* Decorative quote icon */}
        <div className="absolute right-4 top-4 opacity-5">
          <Quote className="h-12 w-12 text-accent" />
        </div>

        {/* Quote */}
        <blockquote className="mb-5 text-base md:text-home-sm leading-relaxed text-foreground">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-4 border-t border-border/40 pt-5">
          <Avatar className="h-12 w-12 border-2 border-accent/20">
            <AvatarFallback className="bg-accent/10 text-sm font-semibold text-accent">
              {testimonial.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-base md:text-home-sm font-semibold text-foreground">
              {testimonial.name}
            </p>
            <p className="text-sm md:text-base text-muted-foreground">
              {testimonial.title}{testimonial.company && `, ${testimonial.company}`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function TestimonialsMarquee() {
  return (
    <section id="testimonials" className="py-24 md:py-36">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <h2 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-home-6xl">
            Loved by agents{" "}
            <span className="text-gradient">everywhere</span>
          </h2>
          <p className="mt-5 text-xl md:text-home-lg text-muted-foreground">
            Don&apos;t just take our word for it. Here&apos;s what real estate
            professionals are saying about Client Keeper.
          </p>
        </div>

        <div className="relative">
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-28 md:w-32 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-28 md:w-32 bg-gradient-to-l from-background to-transparent" />

          <Marquee pauseOnHover className="[--duration:30s] [--gap:1.5rem]">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
