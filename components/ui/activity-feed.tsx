"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { UserPlus, Bell, CheckCircle, Gift, Users, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  icon: React.ElementType;
  text: string;
  time: string;
  color: string;
}

const notifications: Notification[] = [
  {
    icon: UserPlus,
    text: "New contact: John Smith",
    time: "Just now",
    color: "bg-accent",
  },
  {
    icon: Bell,
    text: "Follow-up: Call Mike tomorrow",
    time: "2m ago",
    color: "bg-accent",
  },
  {
    icon: CheckCircle,
    text: "Deal closed: $425,000",
    time: "5m ago",
    color: "bg-accent",
  },
  {
    icon: Gift,
    text: "Birthday: Lisa Johnson",
    time: "10m ago",
    color: "bg-accent",
  },
  {
    icon: Users,
    text: "Referral from: David Chen",
    time: "15m ago",
    color: "bg-accent",
  },
  {
    icon: Calendar,
    text: "Upcoming to-do: Rachel at 3pm",
    time: "20m ago",
    color: "bg-accent",
  },
];

export function ActivityFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notifications.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const current = notifications[currentIndex];
  const Icon = current.icon;

  return (
    <div className="fixed bottom-4 left-4 z-40 max-sm:left-2 max-sm:bottom-2 max-sm:scale-75 max-sm:origin-bottom-left">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/90 py-2 pl-2 pr-4 shadow-warm backdrop-blur-md dark:bg-gray-900/80"
        >
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white",
              current.color
            )}
          >
            <Icon className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Live from Client Keeper
            </p>
            <p className="text-sm font-medium text-foreground">
              {current.text}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
