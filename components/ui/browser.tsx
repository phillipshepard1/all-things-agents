"use client";

import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// Browser dimensions (16:10 aspect ratio)
const BROWSER_WIDTH = 1280;
const BROWSER_HEIGHT = 800;
const CHROME_HEIGHT = 52;
const CONTENT_Y = CHROME_HEIGHT;
const CONTENT_HEIGHT = BROWSER_HEIGHT - CHROME_HEIGHT;
const BORDER_RADIUS = 12;

// Calculated percentages for content overlay
const TOP_PCT = (CONTENT_Y / BROWSER_HEIGHT) * 100;
const HEIGHT_PCT = (CONTENT_HEIGHT / BROWSER_HEIGHT) * 100;

export interface BrowserProps extends HTMLAttributes<HTMLDivElement> {
  url?: string;
  children?: React.ReactNode;
}

export function Browser({
  url = "app.clientkeeper.com/dashboard",
  children,
  className,
  style,
  ...props
}: BrowserProps) {
  return (
    <div
      className={cn("relative inline-block w-full align-middle leading-none", className)}
      style={{
        aspectRatio: `${BROWSER_WIDTH}/${BROWSER_HEIGHT}`,
        ...style,
      }}
      {...props}
    >
      {/* Content overlay for children - z-10 to appear above SVG */}
      {children && (
        <div
          className="absolute left-0 right-0 overflow-hidden bg-white z-10"
          style={{
            top: `${TOP_PCT}%`,
            height: `${HEIGHT_PCT}%`,
            borderBottomLeftRadius: `${BORDER_RADIUS}px`,
            borderBottomRightRadius: `${BORDER_RADIUS}px`,
          }}
        >
          {children}
        </div>
      )}

      {/* Browser frame SVG */}
      <svg
        viewBox={`0 0 ${BROWSER_WIDTH} ${BROWSER_HEIGHT}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 size-full pointer-events-none"
        style={{ transform: "translateZ(0)" }}
      >
        {/* Browser outer frame */}
        <rect
          x="0"
          y="0"
          width={BROWSER_WIDTH}
          height={BROWSER_HEIGHT}
          rx={BORDER_RADIUS}
          ry={BORDER_RADIUS}
          className="fill-[#F5F5F5] dark:fill-[#2A2A2A]"
        />

        {/* Browser chrome/header background */}
        <rect
          x="0"
          y="0"
          width={BROWSER_WIDTH}
          height={CHROME_HEIGHT}
          rx={BORDER_RADIUS}
          ry={BORDER_RADIUS}
          className="fill-[#F5F5F5] dark:fill-[#2A2A2A]"
        />
        {/* Fill bottom corners of chrome */}
        <rect
          x="0"
          y={CHROME_HEIGHT - BORDER_RADIUS}
          width={BROWSER_WIDTH}
          height={BORDER_RADIUS}
          className="fill-[#F5F5F5] dark:fill-[#2A2A2A]"
        />

        {/* Traffic lights */}
        <circle cx="24" cy="26" r="7" className="fill-[#FF5F57]" />
        <circle cx="48" cy="26" r="7" className="fill-[#FEBC2E]" />
        <circle cx="72" cy="26" r="7" className="fill-[#28C840]" />

        {/* URL bar background */}
        <rect
          x="100"
          y="14"
          width={BROWSER_WIDTH - 140}
          height="24"
          rx="6"
          ry="6"
          className="fill-white dark:fill-[#3A3A3A]"
        />

        {/* URL text */}
        <text
          x="116"
          y="30"
          className="fill-[#9CA3AF] dark:fill-[#9CA3AF]"
          style={{ fontSize: "13px", fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          {url}
        </text>

        {/* Content area border (visual separation) */}
        <line
          x1="0"
          y1={CHROME_HEIGHT}
          x2={BROWSER_WIDTH}
          y2={CHROME_HEIGHT}
          className="stroke-[#E5E5E5] dark:stroke-[#404040]"
          strokeWidth="1"
        />

        {/* Outer border */}
        <rect
          x="0.5"
          y="0.5"
          width={BROWSER_WIDTH - 1}
          height={BROWSER_HEIGHT - 1}
          rx={BORDER_RADIUS}
          ry={BORDER_RADIUS}
          className="stroke-[#E5E5E5] dark:stroke-[#404040]"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </div>
  );
}
