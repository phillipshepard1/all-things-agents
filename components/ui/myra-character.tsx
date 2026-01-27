"use client";

import { cn } from "@/lib/utils";

interface MyraCharacterProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

export function MyraCharacter({ className, size = "md", animated = true }: MyraCharacterProps) {
  const sizeClasses = {
    sm: "w-24 h-32",
    md: "w-40 h-52",
    lg: "w-56 h-72",
  };

  return (
    <svg
      viewBox="0 0 200 260"
      className={cn(sizeClasses[size], className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Head */}
      <circle
        cx="100"
        cy="50"
        r="35"
        fill="#300092"
        className={cn(animated && "animate-pulse")}
        style={{ animationDuration: "3s" }}
      />

      {/* Body */}
      <line
        x1="100"
        y1="85"
        x2="100"
        y2="160"
        stroke="#300092"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* Left Arm - Waving */}
      <g className={cn(animated && "origin-[60px_100px]")} style={animated ? { animation: "wave 1.5s ease-in-out infinite" } : {}}>
        <line
          x1="100"
          y1="100"
          x2="50"
          y2="70"
          stroke="#300092"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Hand */}
        <circle cx="45" cy="65" r="8" fill="#300092" />
      </g>

      {/* Right Arm */}
      <line
        x1="100"
        y1="100"
        x2="150"
        y2="130"
        stroke="#300092"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* Left Leg */}
      <line
        x1="100"
        y1="160"
        x2="70"
        y2="240"
        stroke="#300092"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* Right Leg */}
      <line
        x1="100"
        y1="160"
        x2="130"
        y2="240"
        stroke="#300092"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* CSS Animation */}
      <style>
        {`
          @keyframes wave {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-15deg); }
            75% { transform: rotate(15deg); }
          }
        `}
      </style>
    </svg>
  );
}
