"use client";

import { useRef } from "react";
import Image from "next/image";
import { myraDescription } from "@/data/myra-features";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import {
  Calendar,
  Users,
  Heart,
  ClipboardList,
  Home,
  Search,
  MessageSquare,
  Bell,
} from "lucide-react";

export function MyraV12() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  // Left side refs
  const leftRef1 = useRef<HTMLDivElement>(null);
  const leftRef2 = useRef<HTMLDivElement>(null);
  const leftRef3 = useRef<HTMLDivElement>(null);
  const leftRef4 = useRef<HTMLDivElement>(null);

  // Right side refs
  const rightRef1 = useRef<HTMLDivElement>(null);
  const rightRef2 = useRef<HTMLDivElement>(null);
  const rightRef3 = useRef<HTMLDivElement>(null);
  const rightRef4 = useRef<HTMLDivElement>(null);

  const leftIcons = [
    { ref: leftRef1, icon: Calendar, label: "Follow-Ups" },
    { ref: leftRef2, icon: Users, label: "Client Data" },
    { ref: leftRef3, icon: Heart, label: "Important Dates" },
    { ref: leftRef4, icon: ClipboardList, label: "To-Dos" },
  ];

  const rightIcons = [
    { ref: rightRef1, icon: Home, label: "Properties" },
    { ref: rightRef2, icon: Search, label: "Search" },
    { ref: rightRef3, icon: MessageSquare, label: "Notes" },
    { ref: rightRef4, icon: Bell, label: "Reminders" },
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            What Can <span className="text-gradient">MYRA</span> Do For You?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {myraDescription}
          </p>
        </div>

        {/* Animated Beam Layout */}
        <div
          ref={containerRef}
          className="relative mx-auto flex h-[400px] w-full max-w-3xl items-center justify-between px-8"
        >
          {/* Left Icons Column */}
          <div className="flex flex-col items-center justify-center gap-6">
            {leftIcons.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="hidden text-sm font-medium text-muted-foreground sm:block text-right w-24">
                  {item.label}
                </span>
                <div
                  ref={item.ref}
                  className="z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-border/40 bg-white shadow-warm sm:h-14 sm:w-14"
                >
                  <item.icon className="h-5 w-5 text-accent sm:h-6 sm:w-6" />
                </div>
              </div>
            ))}
          </div>

          {/* Center MYRA Logo */}
          <div
            ref={centerRef}
            className="z-10 flex h-20 w-20 items-center justify-center rounded-full border-4 border-accent/30 bg-white shadow-warm-xl sm:h-24 sm:w-24"
          >
            <Image
              src="/images/myra logo.png"
              alt="MYRA"
              width={60}
              height={60}
              className="h-12 w-12 object-contain sm:h-14 sm:w-14"
            />
          </div>

          {/* Right Icons Column */}
          <div className="flex flex-col items-center justify-center gap-6">
            {rightIcons.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div
                  ref={item.ref}
                  className="z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-border/40 bg-white shadow-warm sm:h-14 sm:w-14"
                >
                  <item.icon className="h-5 w-5 text-accent sm:h-6 sm:w-6" />
                </div>
                <span className="hidden text-sm font-medium text-muted-foreground sm:block text-left w-24">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Animated Beams - Left to Center */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={leftRef1}
            toRef={centerRef}
            curvature={-40}
            gradientStartColor="#7a36dd"
            gradientStopColor="#9c40ff"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={leftRef2}
            toRef={centerRef}
            curvature={-20}
            gradientStartColor="#7a36dd"
            gradientStopColor="#9c40ff"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={leftRef3}
            toRef={centerRef}
            curvature={20}
            gradientStartColor="#7a36dd"
            gradientStopColor="#9c40ff"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={leftRef4}
            toRef={centerRef}
            curvature={40}
            gradientStartColor="#7a36dd"
            gradientStopColor="#9c40ff"
          />

          {/* Animated Beams - Center to Right */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={centerRef}
            toRef={rightRef1}
            curvature={40}
            gradientStartColor="#9c40ff"
            gradientStopColor="#7a36dd"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={centerRef}
            toRef={rightRef2}
            curvature={20}
            gradientStartColor="#9c40ff"
            gradientStopColor="#7a36dd"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={centerRef}
            toRef={rightRef3}
            curvature={-20}
            gradientStartColor="#9c40ff"
            gradientStopColor="#7a36dd"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={centerRef}
            toRef={rightRef4}
            curvature={-40}
            gradientStartColor="#9c40ff"
            gradientStopColor="#7a36dd"
          />
        </div>

        {/* MYRA Label */}
        <div className="mt-6 text-center">
          <p className="text-lg font-bold text-foreground">MYRA</p>
          <p className="text-sm text-muted-foreground">Your Real Estate Assistant</p>
        </div>
      </div>
    </section>
  );
}
