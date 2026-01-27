"use client";

import { useState } from "react";
import Image from "next/image";
import { myraFeatures, myraDescription } from "@/data/myra-features";
import { Send, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

const chatExamples = [
  {
    user: "Check in with the Millers every 6 months",
    myra: "Got it! I've scheduled a follow-up reminder for the Millers every 6 months. I'll notify you when it's time to reach out.",
  },
  {
    user: "The Johnsons loved the kitchen but hated the bathroom",
    myra: "Noted! I've added that to the Johnsons' profile. They prefer modern kitchens and want updated bathrooms.",
  },
  {
    user: "Smiths are looking for 2500 sq ft, 4-bed, good school district",
    myra: "Perfect! I've logged the Smiths' search criteria: 2500+ sq ft, 4 bedrooms, in a top-rated school district.",
  },
];

export function MyraV4() {
  const [selectedChat, setSelectedChat] = useState(0);
  const [inputValue, setInputValue] = useState("");

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
          {/* Chat Interface */}
          <div className="mx-auto w-full max-w-md">
            <div className="overflow-hidden rounded-3xl border border-border/40 bg-white shadow-warm-lg">
              {/* Chat Header */}
              <div className="flex items-center gap-3 border-b border-border/40 bg-accent/5 px-4 py-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-accent/10">
                  <Image
                    src="/images/myra-character.webp"
                    alt="MYRA"
                    fill
                    className="object-cover object-top scale-150"
                  />
                </div>
                <div>
                  <p className="font-semibold text-foreground">MYRA</p>
                  <p className="text-xs text-muted-foreground">Your Real Estate Assistant</p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-80 space-y-4 overflow-y-auto p-4">
                {/* User message */}
                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl rounded-br-md bg-accent px-4 py-2 text-white">
                    <p className="text-sm">{chatExamples[selectedChat].user}</p>
                  </div>
                </div>

                {/* MYRA response */}
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl rounded-bl-md border border-border/40 bg-muted/50 px-4 py-2">
                    <p className="text-sm text-foreground">{chatExamples[selectedChat].myra}</p>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="border-t border-border/40 p-3">
                <div className="flex items-center gap-2 rounded-full border border-border/40 bg-muted/30 px-4 py-2">
                  <input
                    type="text"
                    placeholder="Tell MYRA what you need..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                  <button className="text-muted-foreground hover:text-accent">
                    <Mic className="h-5 w-5" />
                  </button>
                  <button className="text-accent">
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Example Selector */}
            <div className="mt-4 flex justify-center gap-2">
              {chatExamples.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedChat(index)}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all",
                    selectedChat === index ? "w-6 bg-accent" : "bg-muted hover:bg-muted-foreground/30"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Feature List */}
          <div className="space-y-4">
            {myraFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 rounded-xl border border-border/40 bg-white/70 p-4 shadow-warm backdrop-blur-sm"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <Icon className="h-6 w-6 text-accent" />
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
    </section>
  );
}
