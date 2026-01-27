"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Globe } from "lucide-react";
import Link from "next/link";

export function WebAppCTA() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#7a36dd] px-6 py-16 sm:px-16 sm:py-24">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -right-1/4 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-1/2 -left-1/4 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          </div>

          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-outfit)]">
                Start Using Client Keeper Today
              </h2>
              <p className="mt-4 text-lg text-white/80 max-w-lg mx-auto lg:mx-0">
                No downloads. No installation. Just sign in from any browser and get to work.
                Your 30-day free trial starts now.
              </p>

              <div className="mt-8 flex justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-white text-[#7a36dd] hover:bg-white/90 gap-2"
                  asChild
                >
                  <a href="https://appnew.clientkeepercrm.com/register">
                    Start Free Trial
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </Button>
              </div>

              <p className="mt-6 text-sm text-white/60">
                Already have an account?{" "}
                <Link href="https://appnew.clientkeepercrm.com/login" className="text-white underline underline-offset-4 hover:no-underline">
                  Sign in here
                </Link>
              </p>
            </div>

            {/* Right - Browser icon/visual */}
            <div className="hidden lg:flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
                <div className="flex items-center justify-center h-32 w-32 mx-auto mb-4 rounded-2xl bg-white/20">
                  <Globe className="h-16 w-16 text-white" />
                </div>
                <p className="text-white font-medium">
                  Works in any browser
                </p>
                <p className="text-sm text-white/60 mt-1">
                  Chrome, Safari, Firefox, Edge
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            No credit card required
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            30-day free trial
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Cancel anytime
          </div>
        </div>
      </div>
    </section>
  );
}
