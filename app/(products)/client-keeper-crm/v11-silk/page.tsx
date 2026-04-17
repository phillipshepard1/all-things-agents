"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Instrument_Serif, Caveat, DM_Sans } from "next/font/google";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-silk-display",
});
const hand = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-silk-hand",
});
const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-silk-sans",
});

export default function SilkPage() {
  return (
    <main
      className={`${display.variable} ${hand.variable} ${sans.variable} relative min-h-screen overflow-hidden bg-[#0c041b] text-[#f3e8f9]`}
      style={{ fontFamily: "var(--font-silk-sans), system-ui, sans-serif" }}
    >
      <title>Client Keeper · Silk</title>
      <Background />
      <Ribbons />
      <Nav />
      <Hero />
      <Whisper />
      <Flow />
      <Myra />
      <Rate />
      <Close />
    </main>
  );
}

function Background() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 -z-20"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(196,155,255,0.15), transparent 55%), radial-gradient(ellipse at bottom, rgba(255,137,229,0.12), transparent 60%), linear-gradient(180deg, #0c041b 0%, #190a34 100%)",
        }}
      />
      <svg className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-[0.08]">
        <filter id="silk-grain">
          <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="1" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#silk-grain)" />
      </svg>
    </>
  );
}

function Ribbons() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const handler = () => setY(window.scrollY);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const ribbons = [
    { from: "-20%", to: "120%", color1: "#7a36dd", color2: "#c49bff", w: 6, d: 0 },
    { from: "-10%", to: "110%", color1: "#ff89e5", color2: "#c49bff", w: 4, d: 0.2 },
    { from: "-30%", to: "130%", color1: "#ffc7a0", color2: "#c49bff", w: 3, d: 0.4 },
  ];

  return (
    <svg
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-0 h-full w-full"
      preserveAspectRatio="none"
      viewBox="0 0 1000 1200"
    >
      <defs>
        {ribbons.map((r, i) => (
          <linearGradient key={i} id={`silk-g-${i}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={r.color1} stopOpacity="0.7" />
            <stop offset="50%" stopColor={r.color2} stopOpacity="0.9" />
            <stop offset="100%" stopColor={r.color1} stopOpacity="0.4" />
          </linearGradient>
        ))}
      </defs>
      {ribbons.map((r, i) => {
        const offset = y * 0.2 * (i + 1);
        return (
          <path
            key={i}
            d={`M -50 ${200 + i * 250 + offset} C 200 ${100 + offset * 0.5}, 400 ${500 + offset * 0.8}, 600 ${300 + offset * 0.6} S 900 ${600 - offset * 0.3}, 1100 ${450 + offset * 0.4}`}
            fill="none"
            stroke={`url(#silk-g-${i})`}
            strokeWidth={r.w}
            strokeLinecap="round"
            opacity="0.55"
          />
        );
      })}
    </svg>
  );
}

function Nav() {
  return (
    <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 pt-10">
      <div className="flex items-baseline gap-3">
        <span
          className="text-3xl italic"
          style={{ fontFamily: "var(--font-silk-display)" }}
        >
          Client Keeper
        </span>
        <span className="text-[11px] uppercase tracking-[0.5em] text-[#c49bff]">
          Silk
        </span>
      </div>
      <a
        href="/client-keeper-crm"
        className="rounded-full border border-[#c49bff]/40 bg-white/5 px-5 py-2 text-[12px] text-[#f3e8f9] backdrop-blur-md transition hover:bg-white/10"
      >
        Begin trial
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative z-10 mx-auto grid max-w-6xl gap-12 px-6 pt-16 pb-24 md:grid-cols-[1.05fr,0.95fr] md:pt-24">
      <div>
        <p className="mb-7 text-[11px] uppercase tracking-[0.48em] text-[#c49bff]">
          A CRM that flows with you
        </p>
        <h1
          className="text-[clamp(3.2rem,9vw,7rem)] leading-[0.92] tracking-[-0.015em]"
          style={{ fontFamily: "var(--font-silk-display)", fontWeight: 400 }}
        >
          Let the work{" "}
          <em
            className="italic"
            style={{
              background:
                "linear-gradient(90deg, #c49bff 0%, #ff89e5 50%, #ffc7a0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            move
          </em>{" "}
          through you like silk.
        </h1>
        <p className="mt-8 max-w-lg text-lg leading-relaxed text-[#e1cfef]/85">
          Client Keeper is an AI-assisted CRM for real estate agents who
          don&apos;t want a dashboard in the way of the day. Talk, and the work
          writes itself — quietly, beautifully, in the background.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-5">
          <a
            href="/client-keeper-crm"
            className="group inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-semibold text-[#140730] shadow-[0_20px_60px_-15px_rgba(196,155,255,0.6)] transition hover:-translate-y-0.5"
            style={{
              background:
                "linear-gradient(130deg, #ffc7a0 0%, #ff89e5 45%, #c49bff 100%)",
            }}
          >
            Try 30 days, free
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <span
            className="text-[26px] text-[#f3e8f9]"
            style={{ fontFamily: "var(--font-silk-hand)" }}
          >
            no card, no effort
          </span>
        </div>
      </div>
      <div className="relative">
        <div className="absolute -inset-4 rounded-[28px] bg-[#c49bff]/10 blur-3xl" />
        <div className="relative overflow-hidden rounded-[24px] border border-[#c49bff]/30">
          <Image
            src="/ck-images/v11-silk-ribbon.jpg"
            alt="Flowing iridescent purple silk ribbon in motion"
            width={1000}
            height={1200}
            className="h-auto w-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c041b]/70 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}

function Whisper() {
  return (
    <section className="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center">
      <blockquote
        className="text-[clamp(1.8rem,4.2vw,3.2rem)] leading-[1.2] text-[#f3e8f9]"
        style={{ fontFamily: "var(--font-silk-display)", fontStyle: "italic" }}
      >
        &ldquo;I didn&apos;t realize how much of my day I was spending wrestling
        software until I stopped. Now the work just — passes.&rdquo;
      </blockquote>
      <p
        className="mt-6 text-2xl text-[#c49bff]"
        style={{ fontFamily: "var(--font-silk-hand)" }}
      >
        — Darla F., 12 years in the business
      </p>
    </section>
  );
}

function Flow() {
  const items = [
    {
      k: "Voice",
      v: "Talk to Myra the way you&apos;d talk to an assistant riding shotgun. She writes the notes.",
    },
    {
      k: "Thread",
      v: "Every deal, every note, every message — one unbroken line from first call to signed paperwork.",
    },
    {
      k: "Morning",
      v: "Wake up to a single calm page: who needs a call, what turns a year older, which deal moved.",
    },
    {
      k: "Quiet",
      v: "No notifications that don&apos;t matter. No screens that shout. Nothing in the way.",
    },
  ];
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-6 py-16">
      <ul className="space-y-6">
        {items.map((x, i) => (
          <li
            key={x.k}
            className="group flex items-baseline gap-8 border-b border-[#c49bff]/20 py-6 transition"
          >
            <span
              className="shrink-0 text-[clamp(2.5rem,6vw,4.5rem)] leading-none"
              style={{
                fontFamily: "var(--font-silk-display)",
                fontStyle: "italic",
                background:
                  "linear-gradient(130deg, #ffc7a0 0%, #ff89e5 50%, #c49bff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3
                className="text-3xl text-[#f3e8f9]"
                style={{ fontFamily: "var(--font-silk-display)" }}
              >
                {x.k}
              </h3>
              <p
                className="mt-2 max-w-lg text-[16.5px] leading-relaxed text-[#e1cfef]/80"
                dangerouslySetInnerHTML={{ __html: x.v }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Myra() {
  return (
    <section className="relative z-10 mx-auto max-w-4xl px-6 py-16 text-center">
      <p className="text-[11px] uppercase tracking-[0.45em] text-[#c49bff]">
        On Myra
      </p>
      <h2
        className="mx-auto mt-4 max-w-3xl text-[clamp(2rem,5vw,3.8rem)] leading-[1]"
        style={{ fontFamily: "var(--font-silk-display)" }}
      >
        A voice that{" "}
        <em className="italic text-[#ff89e5]">catches</em> the thing you
        almost missed.
      </h2>
    </section>
  );
}

function Rate() {
  return (
    <section className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
      <p className="text-[11px] uppercase tracking-[0.45em] text-[#c49bff]">
        One price, always
      </p>
      <h2
        className="mt-6 text-[clamp(3.2rem,8vw,6.5rem)] leading-[0.95]"
        style={{ fontFamily: "var(--font-silk-display)", fontWeight: 400 }}
      >
        <em
          className="italic"
          style={{
            background:
              "linear-gradient(130deg, #ffc7a0 0%, #ff89e5 50%, #c49bff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          $19
        </em>{" "}
        a month.
      </h2>
      <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-[#e1cfef]/80">
        Billed once a year. Unlimited clients, deals, and devices. Myra
        included, forever.
      </p>
      <a
        href="/client-keeper-crm"
        className="mt-10 inline-flex items-center gap-3 rounded-full px-9 py-4 text-sm font-semibold text-[#140730] shadow-[0_20px_60px_-15px_rgba(196,155,255,0.6)] transition hover:-translate-y-0.5"
        style={{
          background:
            "linear-gradient(130deg, #ffc7a0 0%, #ff89e5 45%, #c49bff 100%)",
        }}
      >
        Slip into the trial
      </a>
    </section>
  );
}

function Close() {
  return (
    <footer className="relative z-10 mt-10 py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-6 md:flex-row md:items-center md:justify-between">
        <p
          className="text-2xl italic text-[#c49bff]"
          style={{ fontFamily: "var(--font-silk-display)" }}
        >
          — let the day flow easily.
        </p>
        <p className="text-[11px] uppercase tracking-[0.45em] text-[#e1cfef]/70">
          © MMXXVI · Silk
        </p>
      </div>
    </footer>
  );
}
