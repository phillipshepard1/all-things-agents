"use client";

import { useState } from "react";
import Image from "next/image";
import { myraFeatures, myraDescription } from "@/data/myra-features";
import { Mic, Play, Pause, Check, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

const voiceExamples = [
  {
    transcript: "Hey MYRA, remind me to follow up with the Petersons about their offer next Tuesday",
    duration: "0:08",
    response: "Got it! I've set a reminder for Tuesday to follow up with the Petersons about their offer.",
  },
  {
    transcript: "MYRA, the Garcias are looking for a 3 bedroom condo near downtown with parking",
    duration: "0:06",
    response: "Noted! I've saved the Garcias' criteria: 3-bed condo, downtown area, must have parking.",
  },
  {
    transcript: "Add a note that Mr. Chen prefers morning showings only",
    duration: "0:04",
    response: "Done! I've added to Mr. Chen's profile that he prefers morning showings only.",
  },
];

export function MyraV6() {
  const [activeVoice, setActiveVoice] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Voice Memo Interface */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent">
                <Mic className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Voice-First Design</h3>
                <p className="text-sm text-muted-foreground">Just talk to MYRA like you would a real assistant</p>
              </div>
            </div>

            {/* Voice Message Examples */}
            <div className="space-y-3">
              {voiceExamples.map((example, index) => (
                <div key={index} className="space-y-2">
                  {/* Voice message */}
                  <div
                    className={cn(
                      "rounded-2xl border p-4 transition-all cursor-pointer",
                      activeVoice === index
                        ? "border-accent bg-accent/5 shadow-warm"
                        : "border-border/40 bg-white/70 hover:border-accent/50"
                    )}
                    onClick={() => {
                      setActiveVoice(index);
                      setIsPlaying(true);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors",
                          activeVoice === index && isPlaying
                            ? "bg-accent text-white"
                            : "bg-accent/10 text-accent hover:bg-accent/20"
                        )}
                      >
                        {activeVoice === index && isPlaying ? (
                          <Pause className="h-5 w-5" />
                        ) : (
                          <Play className="h-5 w-5 ml-0.5" />
                        )}
                      </button>
                      <div className="flex-1">
                        {/* Waveform visualization */}
                        <div className="flex h-8 items-center gap-0.5">
                          {Array.from({ length: 40 }).map((_, i) => (
                            <div
                              key={i}
                              className={cn(
                                "w-1 rounded-full transition-all",
                                activeVoice === index ? "bg-accent" : "bg-muted-foreground/30"
                              )}
                              style={{
                                height: `${Math.random() * 100}%`,
                                minHeight: "4px",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{example.duration}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground italic">"{example.transcript}"</p>
                  </div>

                  {/* MYRA Response */}
                  {activeVoice === index && (
                    <div className="ml-6 flex items-start gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="rounded-xl border border-green-200 bg-green-50 px-3 py-2">
                        <p className="text-sm text-green-800">{example.response}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Feature Cards with MYRA */}
          <div className="relative">
            {/* MYRA Character */}
            <div className="absolute -left-4 top-0 hidden lg:block">
              <Image
                src="/images/myra-character.webp"
                alt="MYRA"
                width={120}
                height={150}
                className="h-auto w-[100px] opacity-20"
              />
            </div>

            <div className="space-y-3">
              {myraFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="flex items-start gap-3 rounded-xl border border-border/40 bg-white/70 p-4 shadow-warm backdrop-blur-sm"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{feature.title}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
