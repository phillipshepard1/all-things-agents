"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { myraDescription } from "@/data/myra-features";
import { cn } from "@/lib/utils";

const conversations = [
  {
    user: "Check in with the Millers every 6 months",
    myra: "Got it! I've scheduled a follow-up reminder for the Millers every 6 months.",
    category: "Follow-ups",
  },
  {
    user: "The Johnsons loved the kitchen but hated the bathroom",
    myra: "Noted! I've added that preference to the Johnsons' client profile.",
    category: "Client Details",
  },
  {
    user: "Looking for 2500 sq ft, 4-bed, good school district",
    myra: "Perfect! I've logged those search criteria for easy reference.",
    category: "Property Search",
  },
  {
    user: "Remind me about Sarah's birthday next month",
    myra: "Done! You'll get a reminder before Sarah's birthday to send a thoughtful note.",
    category: "Important Dates",
  },
];

export function MyraV5() {
  const [currentConvo, setCurrentConvo] = useState(0);
  const [showUser, setShowUser] = useState(false);
  const [showMyra, setShowMyra] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Reset animation state at the start of each conversation
    const resetState = () => {
      setShowUser(false);
      setShowMyra(false);
      setIsTyping(false);
    };
    resetState();

    // Show user message after short delay
    const userTimer = setTimeout(() => setShowUser(true), 500);

    // Show typing indicator
    const typingTimer = setTimeout(() => setIsTyping(true), 1500);

    // Show MYRA response
    const myraTimer = setTimeout(() => {
      setIsTyping(false);
      setShowMyra(true);
    }, 3000);

    // Move to next conversation
    const nextTimer = setTimeout(() => {
      setCurrentConvo((prev) => (prev + 1) % conversations.length);
    }, 6000);

    return () => {
      clearTimeout(userTimer);
      clearTimeout(typingTimer);
      clearTimeout(myraTimer);
      clearTimeout(nextTimer);
    };
  }, [currentConvo]);

  const convo = conversations[currentConvo];

  return (
    <section className="py-20 md:py-28 bg-muted/30">
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

        {/* Auto-playing Chat Demo */}
        <div className="mx-auto max-w-2xl">
          <div className="overflow-hidden rounded-3xl border border-border/40 bg-white shadow-warm-xl">
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-border/40 bg-accent/5 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-accent/10">
                  <Image
                    src="/images/myra-character.webp"
                    alt="MYRA"
                    fill
                    className="object-cover object-top scale-150"
                  />
                </div>
                <div>
                  <p className="font-semibold text-foreground">MYRA</p>
                  <p className="text-sm text-muted-foreground">My Real Estate Assistant</p>
                </div>
              </div>
              <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                {convo.category}
              </span>
            </div>

            {/* Chat Messages */}
            <div className="min-h-[200px] space-y-4 p-6">
              {/* User message */}
              <div
                className={cn(
                  "flex justify-end transition-all duration-500",
                  showUser ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                )}
              >
                <div className="max-w-[80%] rounded-2xl rounded-br-md bg-accent px-4 py-3 text-white shadow-md">
                  <p>{convo.user}</p>
                </div>
              </div>

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md border border-border/40 bg-muted/50 px-4 py-3">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" style={{ animationDelay: "0ms" }} />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" style={{ animationDelay: "150ms" }} />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              {/* MYRA response */}
              <div
                className={cn(
                  "flex justify-start transition-all duration-500",
                  showMyra ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                )}
              >
                <div className="max-w-[80%] rounded-2xl rounded-bl-md border border-border/40 bg-muted/50 px-4 py-3 shadow-md">
                  <p className="text-foreground">{convo.myra}</p>
                </div>
              </div>
            </div>

            {/* Progress dots */}
            <div className="border-t border-border/40 bg-muted/20 px-6 py-4">
              <div className="flex justify-center gap-2">
                {conversations.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentConvo(index)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      currentConvo === index ? "w-8 bg-accent" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
