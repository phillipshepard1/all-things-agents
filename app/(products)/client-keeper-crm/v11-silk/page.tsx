"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Instrument_Serif, Caveat, DM_Sans } from "next/font/google";
import {
  TAGLINE,
  STRIKETHROUGH,
  USED_BY,
  AGENT_COUNT,
  FEATURES_6,
  MYRA_INTRO,
  MYRA_VOICE_MEMO,
  MYRA_JOBS,
  BENEFITS_BULLETS,
  STATS,
  DETAILED_FEATURES_4,
  TESTIMONIALS,
  PRICING,
  PRICING_INCLUDED,
  FAQS,
} from "../_shared/copy";

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

const iridescent = {
  background: "linear-gradient(90deg, #c49bff 0%, #ff89e5 50%, #ffc7a0 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as React.CSSProperties;

const iridescentBg = {
  background: "linear-gradient(130deg, #ffc7a0 0%, #ff89e5 45%, #c49bff 100%)",
} as React.CSSProperties;

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
      <UsedBy />
      <Strikethrough />
      <Whisper />
      <Flow />
      <Myra />
      <Benefits />
      <DetailFeatures />
      <Testimonials />
      <Rate />
      <FAQ />
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
    { color1: "#7a36dd", color2: "#c49bff", w: 6 },
    { color1: "#ff89e5", color2: "#c49bff", w: 4 },
    { color1: "#ffc7a0", color2: "#c49bff", w: 3 },
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
        Start Free Trial
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative z-10 mx-auto grid max-w-6xl gap-12 px-6 pt-16 pb-24 md:grid-cols-[1.05fr,0.95fr] md:pt-24">
      <div>
        <p className="mb-7 text-[11px] uppercase tracking-[0.48em] text-[#c49bff]">
          {TAGLINE}
        </p>
        <h1
          className="text-[clamp(3.2rem,9vw,7rem)] leading-[0.92] tracking-[-0.015em]"
          style={{ fontFamily: "var(--font-silk-display)", fontWeight: 400 }}
        >
          Let the work{" "}
          <em className="italic" style={iridescent}>
            move
          </em>{" "}
          through you like silk.
        </h1>
        <p className="mt-8 max-w-lg text-lg leading-relaxed text-[#e1cfef]/85">
          Client Keeper is simple to use, with zero learning curve. MYRA —
          your AI assistant — handles data entry through voice and text so
          you stay organized, build better relationships, and close more
          deals without the overwhelm.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-5">
          <a
            href="/client-keeper-crm"
            className="group inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-semibold text-[#140730] shadow-[0_20px_60px_-15px_rgba(196,155,255,0.6)] transition hover:-translate-y-0.5"
            style={iridescentBg}
          >
            {PRICING.cta}
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

function UsedBy() {
  return (
    <section className="relative z-10 border-y border-white/10 py-7">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-3 text-center text-[10px] uppercase tracking-[0.5em] text-[#c49bff]">
          Used by
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
          {USED_BY.map((n) => (
            <span
              key={n}
              className="text-[15px] italic text-[#e1cfef]/75"
              style={{ fontFamily: "var(--font-silk-display)" }}
            >
              {n}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Strikethrough() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-14">
      <p className="mb-4 text-[11px] uppercase tracking-[0.45em] text-[#c49bff]">
        On the way out
      </p>
      <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
        {STRIKETHROUGH.map((t) => (
          <span
            key={t}
            className="relative text-[clamp(1.4rem,3vw,2.2rem)] italic text-[#e1cfef]/55"
            style={{ fontFamily: "var(--font-silk-display)" }}
          >
            <span>{t}</span>
            <span className="absolute left-0 right-0 top-1/2 h-[2px] translate-y-[-1px] bg-[#c49bff]" />
          </span>
        ))}
        <span
          className="text-[clamp(1.4rem,3vw,2.2rem)]"
          style={{ fontFamily: "var(--font-silk-display)", ...iridescent }}
        >
          Client Keeper.
        </span>
      </div>
    </section>
  );
}

function Whisper() {
  const t = TESTIMONIALS[4];
  return (
    <section className="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center">
      <blockquote
        className="text-[clamp(1.8rem,4.2vw,3.2rem)] leading-[1.2] text-[#f3e8f9]"
        style={{ fontFamily: "var(--font-silk-display)", fontStyle: "italic" }}
      >
        &ldquo;{t.q}&rdquo;
      </blockquote>
      <p
        className="mt-6 text-2xl text-[#c49bff]"
        style={{ fontFamily: "var(--font-silk-hand)" }}
      >
        — {t.n}, {t.r}
      </p>
    </section>
  );
}

function Flow() {
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-6 py-16">
      <p className="mb-6 text-[11px] uppercase tracking-[0.45em] text-[#c49bff]">
        The six things it does
      </p>
      <h2
        className="mb-10 text-[clamp(2rem,5vw,3.6rem)]"
        style={{ fontFamily: "var(--font-silk-display)" }}
      >
        Everything you need.{" "}
        <em className="italic" style={iridescent}>
          Nothing you don&apos;t.
        </em>
      </h2>
      <ul className="space-y-4">
        {FEATURES_6.map((x, i) => (
          <li
            key={x.title}
            className="group flex items-baseline gap-8 border-b border-[#c49bff]/20 py-6 transition"
          >
            <span
              className="shrink-0 text-[clamp(2rem,4.5vw,3.5rem)] leading-none"
              style={{
                fontFamily: "var(--font-silk-display)",
                fontStyle: "italic",
                ...iridescent,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3
                className="text-2xl text-[#f3e8f9]"
                style={{ fontFamily: "var(--font-silk-display)" }}
              >
                {x.title}
              </h3>
              <p className="mt-1 max-w-xl text-[15.5px] leading-relaxed text-[#e1cfef]/80">
                {x.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Myra() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-10 rounded-3xl border border-white/10 bg-white/[0.03] p-10 backdrop-blur-md md:grid-cols-[0.9fr,1.1fr] md:p-14">
        <div>
          <p className="text-[11px] uppercase tracking-[0.45em] text-[#c49bff]">
            {MYRA_INTRO.label}
          </p>
          <h2
            className="mt-3 text-[clamp(2rem,5vw,3.4rem)] leading-[1]"
            style={{ fontFamily: "var(--font-silk-display)" }}
          >
            {MYRA_INTRO.title}.{" "}
            <em className="italic" style={iridescent}>
              {MYRA_INTRO.tagline}.
            </em>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#e1cfef]/85">
            {MYRA_INTRO.body}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#16082c]/70 p-6">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#c49bff]">
            Voice memo · {MYRA_VOICE_MEMO.duration}
          </p>
          <p
            className="mt-4 text-[22px] leading-snug text-[#f3e8f9]"
            style={{ fontFamily: "var(--font-silk-hand)" }}
          >
            &ldquo;{MYRA_VOICE_MEMO.quote}&rdquo;
          </p>
          <div className="mt-5 space-y-1.5 text-[14px] text-[#e1cfef]">
            {MYRA_VOICE_MEMO.actions.map((a) => (
              <p key={a.k}>→ {a.k}: <strong>{a.v}</strong></p>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {MYRA_JOBS.map((j) => (
          <div key={j.k} className="border-t border-[#c49bff]/20 pt-4">
            <h4
              className="text-xl text-[#f3e8f9]"
              style={{ fontFamily: "var(--font-silk-display)" }}
            >
              {j.k}
            </h4>
            <p className="mt-2 text-[15px] leading-relaxed text-[#e1cfef]/80">
              {j.v}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="relative z-10 border-y border-white/10 bg-white/[0.02] py-20 backdrop-blur-sm">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1fr,1.1fr]">
        <div>
          <p className="text-[11px] uppercase tracking-[0.45em] text-[#c49bff]">
            Why Client Keeper
          </p>
          <h2
            className="mt-3 text-[clamp(2rem,4.5vw,3.4rem)] leading-[1]"
            style={{ fontFamily: "var(--font-silk-display)" }}
          >
            Keep more clients.{" "}
            <em className="italic" style={iridescent}>
              Close more deals.
            </em>
          </h2>
          <ul className="mt-8 space-y-3">
            {BENEFITS_BULLETS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[16.5px] leading-snug text-[#f3e8f9]">
                <span className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-[#c49bff]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {STATS.map((s) => (
            <div key={s.n} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md">
              <p
                className="leading-none"
                style={{
                  fontFamily: "var(--font-silk-display)",
                  fontSize: "clamp(2.4rem,5vw,3.5rem)",
                  fontWeight: 400,
                  ...iridescent,
                }}
              >
                {s.n}
              </p>
              <p className="mt-3 text-[13px] uppercase tracking-[0.2em] text-[#e1cfef]/80">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DetailFeatures() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-24">
      <p className="text-center text-[11px] uppercase tracking-[0.42em] text-[#c49bff]">
        The long list
      </p>
      <h2
        className="mx-auto mt-4 max-w-3xl text-center text-[clamp(2rem,5vw,3.6rem)] leading-[1.05] text-[#f3e8f9]"
        style={{ fontFamily: "var(--font-silk-display)" }}
      >
        Built specifically for real estate agents.
      </h2>
      <div className="mt-14 grid gap-8 md:grid-cols-2">
        {DETAILED_FEATURES_4.map((b) => (
          <article key={b.t} className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md">
            <h3
              className="text-2xl text-[#f3e8f9]"
              style={{ fontFamily: "var(--font-silk-display)" }}
            >
              {b.t}
            </h3>
            <p className="mt-3 text-[16px] leading-relaxed text-[#e1cfef]/85">
              {b.b}
            </p>
            <ul className="mt-4 space-y-2 text-[15px] text-[#e1cfef]">
              {b.bullets.map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <span className="mt-[8px] inline-block size-1 rounded-full bg-[#c49bff]" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="relative z-10 border-y border-white/10 bg-[#10051d]/70 py-24 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-[11px] uppercase tracking-[0.45em] text-[#c49bff]">
          Loved by agents everywhere
        </p>
        <h2
          className="mx-auto mt-4 max-w-3xl text-center text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] text-[#f3e8f9]"
          style={{ fontFamily: "var(--font-silk-display)" }}
        >
          Don&apos;t just take our word.
        </h2>
        <div className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.n} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md">
              <p
                className="text-[16.5px] italic leading-relaxed text-[#f3e8f9]"
                style={{ fontFamily: "var(--font-silk-display)" }}
              >
                &ldquo;{t.q}&rdquo;
              </p>
              <figcaption className="mt-5 border-t border-white/10 pt-3">
                <p
                  className="text-xl text-[#c49bff]"
                  style={{ fontFamily: "var(--font-silk-hand)" }}
                >
                  {t.n}
                </p>
                <p className="text-[11px] uppercase tracking-[0.3em] text-[#e1cfef]/65">
                  {t.r}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Rate() {
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-6 py-24 text-center">
      <p className="text-[11px] uppercase tracking-[0.45em] text-[#c49bff]">
        Simple, transparent pricing
      </p>
      <h2
        className="mt-6 text-[clamp(3.2rem,8vw,6.5rem)] leading-[0.95]"
        style={{ fontFamily: "var(--font-silk-display)", fontWeight: 400 }}
      >
        <em className="italic" style={iridescent}>
          $19
        </em>{" "}
        a month.
      </h2>
      <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-[#e1cfef]/85">
        $19/mo billed annually (20% off), or $24/mo billed monthly. Every plan
        includes MYRA AI, unlimited contacts, and full mobile access.
      </p>
      <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-left backdrop-blur-md">
        <p className="text-[11px] uppercase tracking-[0.32em] text-[#c49bff]">
          Every plan includes
        </p>
        <ul className="mt-5 grid gap-3 text-[15px] text-[#e1cfef] sm:grid-cols-2">
          {PRICING_INCLUDED.map((x) => (
            <li key={x} className="flex items-start gap-2">
              <span className="mt-[8px] inline-block size-1.5 shrink-0 rounded-full bg-[#c49bff]" />
              <span>{x}</span>
            </li>
          ))}
        </ul>
      </div>
      <a
        href="/client-keeper-crm"
        className="mt-10 inline-flex items-center gap-3 rounded-full px-9 py-4 text-sm font-semibold text-[#140730] shadow-[0_20px_60px_-15px_rgba(196,155,255,0.6)] transition hover:-translate-y-0.5"
        style={iridescentBg}
      >
        Slip into the trial →
      </a>
      <p className="mt-4 text-[11px] uppercase tracking-[0.32em] text-[#e1cfef]/60">
        {PRICING.trust}
      </p>
      <p className="mt-1 text-[11px] uppercase tracking-[0.32em] text-[#c49bff]">
        {PRICING.guarantee}
      </p>
    </section>
  );
}

function FAQ() {
  return (
    <section className="relative z-10 mx-auto max-w-4xl px-6 py-24">
      <p className="text-center text-[11px] uppercase tracking-[0.42em] text-[#c49bff]">
        A few questions
      </p>
      <h2
        className="mt-4 text-center text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] text-[#f3e8f9]"
        style={{ fontFamily: "var(--font-silk-display)" }}
      >
        Frequently asked.
      </h2>
      <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
        {FAQS.map((f) => (
          <details key={f.q} className="group py-6">
            <summary className="flex cursor-pointer items-baseline justify-between gap-6 list-none">
              <h3
                className="text-xl text-[#f3e8f9]"
                style={{ fontFamily: "var(--font-silk-display)" }}
              >
                {f.q}
              </h3>
              <span className="text-[#c49bff] transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-4 text-[16px] leading-relaxed text-[#e1cfef]/85">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Close() {
  return (
    <footer className="relative z-10 mt-10 py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] uppercase tracking-[0.45em] text-[#c49bff]">
            Start your free 30-day trial
          </p>
          <h3
            className="mt-4 text-[clamp(2rem,5vw,3.2rem)] leading-[1.05] text-[#f3e8f9]"
            style={{ fontFamily: "var(--font-silk-display)" }}
          >
            Join{" "}
            <em className="italic" style={iridescent}>
              {AGENT_COUNT} agents
            </em>{" "}
            closing more deals with Client Keeper.
          </h3>
          <a
            href="/client-keeper-crm"
            className="mt-8 inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-semibold text-[#140730] transition hover:-translate-y-0.5"
            style={iridescentBg}
          >
            {PRICING.cta} →
          </a>
        </div>
        <div className="mt-12 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
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
      </div>
    </footer>
  );
}
