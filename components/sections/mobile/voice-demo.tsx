"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mic, User, Calendar, MapPin, Sparkles } from "lucide-react";

const demoSteps = [
  {
    type: "listening",
    duration: 2000,
  },
  {
    type: "transcript",
    text: "Just met Sarah Johnson at the open house on Oak Street. She's interested in 3-bedroom homes in Lincoln Park, budget around 500k. Follow up Tuesday.",
    duration: 3500,
  },
  {
    type: "processing",
    duration: 1500,
  },
  {
    type: "result",
    contact: {
      name: "Sarah Johnson",
      type: "Buyer",
      location: "Open House - Oak St",
      notes: "3BR in Lincoln Park, ~$500k budget",
      followUp: "Tuesday",
    },
    duration: 4000,
  },
];

// Pre-computed random heights for waveform bars
const waveformHeights = [32, 36, 28, 40, 30, 38, 34, 26, 42, 31, 37, 29];

function WaveformAnimation() {
  return (
    <div className="flex items-center justify-center gap-1 h-12">
      {waveformHeights.map((height, i) => (
        <motion.div
          key={i}
          className="w-1 bg-white rounded-full"
          animate={{
            height: [8, height, 8],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            delay: i * 0.05,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function TypewriterText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export function VoiceDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;

    const step = demoSteps[currentStep];
    const timer = setTimeout(() => {
      if (currentStep < demoSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Reset after showing result
        setTimeout(() => {
          setCurrentStep(0);
          setIsPlaying(false);
        }, step.duration);
      }
    }, step.duration);

    return () => clearTimeout(timer);
  }, [currentStep, isPlaying]);

  const handleStart = () => {
    setCurrentStep(0);
    setIsPlaying(true);
  };

  const step = demoSteps[currentStep];

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#7a36dd]/10 px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-[#7a36dd]" />
            <span className="text-sm font-medium text-[#7a36dd]">Voice-First AI</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 font-[family-name:var(--font-outfit)]">
            Talk to MYRA,{" "}
            <span className="text-gradient">She Handles the Rest</span>
          </h2>

          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Record a quick voice memo after meeting a client. MYRA extracts the details,
            creates the contact, and schedules your follow-up automatically.
          </p>
        </div>

        {/* Demo Container */}
        <div className="max-w-2xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#7a36dd] to-[#5a1fb0] p-8 sm:p-12">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative min-h-[280px] flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                {!isPlaying ? (
                  <motion.div
                    key="start"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center"
                  >
                    <button
                      onClick={handleStart}
                      className="group flex h-24 w-24 items-center justify-center rounded-full bg-white text-[#7a36dd] shadow-xl shadow-black/20 transition-transform hover:scale-105 mx-auto mb-6"
                    >
                      <Mic className="h-10 w-10 transition-transform group-hover:scale-110" />
                    </button>
                    <p className="text-white/80 text-sm">Tap to see the demo</p>
                  </motion.div>
                ) : step.type === "listening" ? (
                  <motion.div
                    key="listening"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20 mx-auto mb-6">
                      <Mic className="h-10 w-10 text-white" />
                    </div>
                    <WaveformAnimation />
                    <p className="text-white/80 text-sm mt-4">Listening...</p>
                  </motion.div>
                ) : step.type === "transcript" ? (
                  <motion.div
                    key="transcript"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center"
                  >
                    <div className="text-sm text-white/60 mb-3">Transcribing...</div>
                    <div className="bg-white/10 rounded-2xl p-6 max-w-md">
                      <p className="text-white text-left text-sm leading-relaxed">
                        <TypewriterText text={step.text || ""} />
                      </p>
                    </div>
                  </motion.div>
                ) : step.type === "processing" ? (
                  <motion.div
                    key="processing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Sparkles className="h-6 w-6 text-white animate-pulse" />
                      <span className="text-white font-medium">MYRA is processing...</span>
                    </div>
                    <div className="flex justify-center gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="h-2 w-2 rounded-full bg-white"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                ) : step.type === "result" && step.contact ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="w-full max-w-sm"
                  >
                    <div className="text-center mb-4">
                      <div className="inline-flex items-center gap-2 text-green-300 text-sm">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Contact created
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-xl">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#7a36dd]/10">
                          <User className="h-7 w-7 text-[#7a36dd]" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{step.contact.name}</div>
                          <div className="text-sm text-[#7a36dd]">{step.contact.type}</div>
                        </div>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                          <span className="text-gray-600">{step.contact.location}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <svg className="h-4 w-4 text-gray-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="text-gray-600">{step.contact.notes}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <Calendar className="h-4 w-4 text-gray-400 mt-0.5" />
                          <span className="text-gray-600">Follow-up: <span className="font-medium text-[#7a36dd]">{step.contact.followUp}</span></span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>

          {/* Features below */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {[
              { label: "Voice Recognition", desc: "99% accurate" },
              { label: "Hands-Free Entry", desc: "Just talk, we type" },
              { label: "Languages", desc: "English" },
            ].map((item, i) => (
              <div key={i} className="rounded-xl bg-gray-50 p-4">
                <div className="text-sm font-semibold text-gray-900">{item.label}</div>
                <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
