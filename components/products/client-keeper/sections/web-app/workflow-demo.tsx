"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, UserPlus, GitBranch, Bell, CheckCircle } from "lucide-react";

const workflowSteps = [
  {
    id: "lead",
    icon: UserPlus,
    title: "New Lead Arrives",
    description: "A new inquiry comes in from your website",
    color: "bg-blue-500",
  },
  {
    id: "assign",
    icon: GitBranch,
    title: "Auto-Assigned",
    description: "Lead is added to your pipeline instantly",
    color: "bg-purple-500",
  },
  {
    id: "followup",
    icon: Bell,
    title: "Follow-up Scheduled",
    description: "MYRA schedules the perfect time to reach out",
    color: "bg-orange-500",
  },
  {
    id: "complete",
    icon: CheckCircle,
    title: "You're Notified",
    description: "Get a reminder when it's time to connect",
    color: "bg-green-500",
  },
];

const stats = [
  { value: "10+", label: "Hours saved weekly" },
  { value: "Zero", label: "Manual data entry" },
  { value: "100%", label: "Lead capture rate" },
];

export function WorkflowDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= workflowSteps.length - 1) {
          setIsPlaying(false);
          return -1;
        }
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlay = () => {
    setCurrentStep(-1);
    setIsPlaying(true);
    setTimeout(() => setCurrentStep(0), 100);
  };

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-br from-[#7a36dd] to-[#5a1fb0] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-outfit)]">
            Automation That <span className="text-white/90">Works for You</span>
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            See how Client Keeper handles the busywork so you can focus on closing deals
          </p>
        </div>

        {/* Workflow visualization */}
        <div className="relative mb-12">
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/20 -translate-y-1/2 hidden md:block" />

          <div className="grid md:grid-cols-4 gap-6 md:gap-4 relative">
            {workflowSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index <= currentStep;
              const isCurrent = index === currentStep;

              return (
                <motion.div
                  key={step.id}
                  className="relative flex flex-col items-center text-center"
                  initial={{ opacity: 0.5, scale: 0.95 }}
                  animate={{
                    opacity: isActive ? 1 : 0.5,
                    scale: isCurrent ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Icon circle */}
                  <div
                    className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full ${
                      isActive ? step.color : "bg-white/20"
                    } transition-colors duration-300`}
                  >
                    <Icon className="h-8 w-8" />
                    {isCurrent && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-white"
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </div>

                  {/* Text */}
                  <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{step.description}</p>

                  {/* Arrow (mobile) */}
                  {index < workflowSteps.length - 1 && (
                    <div className="mt-4 md:hidden text-white/30">
                      <svg className="h-6 w-6 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Play button */}
        <div className="flex justify-center mb-12">
          <button
            onClick={handlePlay}
            disabled={isPlaying}
            className="flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[#7a36dd] font-semibold shadow-lg hover:shadow-xl transition-shadow disabled:opacity-70"
          >
            <Play className="h-5 w-5" fill="currentColor" />
            {isPlaying ? "Running..." : "See It In Action"}
          </button>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-8 pt-8 border-t border-white/20">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold">{stat.value}</div>
              <div className="mt-1 text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
