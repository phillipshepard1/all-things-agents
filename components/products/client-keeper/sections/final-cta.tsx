"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-primary py-24 md:py-36">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-0">
        <div className="absolute left-1/4 top-0 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <Card className="mx-auto max-w-2xl border-white/10 bg-white shadow-warm-xl">
          <CardContent className="p-10 text-center md:p-14">
            {/* Icon */}
            <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-2xl bg-accent/10">
              <svg
                className="h-10 w-10 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>

            {/* Headline */}
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-home-5xl">
              Start your free 30-day trial
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg md:text-home-base text-muted-foreground">
              Join 10,000+ real estate agents who are closing more deals with
              Client Keeper. No credit card required.
            </p>

            {/* CTA Button */}
            <div className="mt-10 flex justify-center">
              <Link href="https://appnew.clientkeepercrm.com/register">
                <ShimmerButton
                  shimmerColor="#ffffff"
                  background="#7a36dd"
                  borderRadius="14px"
                  className="h-16 px-12 text-xl md:text-home-lg font-medium shadow-warm-lg"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2.5 h-6 w-6" />
                </ShimmerButton>
              </Link>
            </div>

            {/* Trust text */}
            <p className="mt-7 text-sm md:text-base text-muted-foreground">
              By signing up, you agree to our{" "}
              <Link
                href="/terms-of-service"
                className="underline underline-offset-2 hover:text-foreground"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="underline underline-offset-2 hover:text-foreground"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
