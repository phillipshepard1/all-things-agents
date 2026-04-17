"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Newsreader, Caveat, DM_Sans } from "next/font/google";
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

const serif = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-mr-serif",
});
const hand = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mr-hand",
});
const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mr-sans",
});

export default function MorningRitualPage() {
  return (
    <main
      className={`${serif.variable} ${hand.variable} ${sans.variable} relative min-h-screen bg-[#fbf2e3] text-[#2d1f10]`}
      style={{ fontFamily: "var(--font-mr-sans), system-ui, sans-serif" }}
    >
      <title>Client Keeper · The Morning Ritual</title>
      <Linen />
      <Nav />
      <Hero />
      <UsedBy />
      <Strikethrough />
      <JournalScene />
      <Three />
      <Myra />
      <Benefits />
      <DetailFeatures />
      <Testimonials />
      <Rate />
      <FAQ />
      <Sign />
      <style>{`
        @keyframes checkIn {
          0% { stroke-dashoffset: 40; }
          100% { stroke-dashoffset: 0; }
        }
        .check-mark {
          stroke-dasharray: 40;
          stroke-dashoffset: 40;
          animation: checkIn 0.4s ease-out forwards;
        }
      `}</style>
    </main>
  );
}

function Linen() {
  return (
    <>
      <svg className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-[0.04]">
        <filter id="mr-linen">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#mr-linen)" />
      </svg>
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at top left, rgba(255,204,132,0.28), transparent 55%), radial-gradient(ellipse at bottom right, rgba(196,131,214,0.18), transparent 60%)",
        }}
      />
    </>
  );
}

function Nav() {
  return (
    <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 pt-10">
      <div className="flex items-baseline gap-3">
        <span
          className="text-2xl"
          style={{ fontFamily: "var(--font-mr-serif)", fontWeight: 600 }}
        >
          Client Keeper
        </span>
        <span className="text-[11px] uppercase tracking-[0.4em] text-[#8a5614]">
          Morning Ritual
        </span>
      </div>
      <a
        href="/client-keeper-crm"
        className="rounded-full bg-[#2d1f10] px-5 py-2 text-[12px] font-semibold text-[#fbf2e3] transition hover:bg-[#3d0d6a]"
      >
        Start Free Trial
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative z-10 mx-auto grid max-w-6xl gap-10 px-6 pt-16 pb-20 md:grid-cols-[1.1fr,0.9fr] md:pt-24">
      <div>
        <p className="mb-7 text-[11px] uppercase tracking-[0.4em] text-[#8a5614]">
          {TAGLINE}
        </p>
        <h1
          className="text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.015em]"
          style={{ fontFamily: "var(--font-mr-serif)", fontWeight: 500 }}
        >
          Begin the day with one{" "}
          <em className="italic text-[#7a36dd]">calm page.</em>
        </h1>
        <p className="mt-8 max-w-lg text-lg leading-relaxed text-[#4a3320]">
          Client Keeper is simple to use, with zero learning curve. MYRA —
          your AI assistant — handles data entry through voice and text so
          you stay organized, build better relationships, and close more
          deals without the overwhelm.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-5">
          <a
            href="/client-keeper-crm"
            className="group inline-flex items-center gap-3 rounded-full bg-[#2d1f10] px-7 py-4 text-sm font-semibold text-[#fbf2e3] shadow-[0_14px_40px_-12px_rgba(45,31,16,0.6)] transition hover:-translate-y-0.5 hover:bg-[#3d0d6a]"
          >
            {PRICING.cta}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <span
            className="text-[28px] text-[#7a36dd]"
            style={{ fontFamily: "var(--font-mr-hand)" }}
          >
            no card, no overwhelm
          </span>
        </div>
      </div>
      <div className="relative">
        <div className="relative overflow-hidden rounded-2xl border border-[#2d1f10]/10 shadow-[0_30px_60px_-30px_rgba(45,31,16,0.5)]">
          <Image
            src="/ck-images/v6-morning-journal.jpg"
            alt="A journal with a morning checklist, coffee and a rose"
            width={1000}
            height={1200}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}

function UsedBy() {
  return (
    <section className="relative z-10 border-y border-[#2d1f10]/10 py-7">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-3 text-center text-[10px] uppercase tracking-[0.5em] text-[#8a5614]">
          Used by
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
          {USED_BY.map((n) => (
            <span
              key={n}
              className="text-[15px] italic text-[#4a3320]/75"
              style={{ fontFamily: "var(--font-mr-serif)" }}
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
      <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-[#8a5614]">
        On the way out
      </p>
      <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
        {STRIKETHROUGH.map((t) => (
          <span
            key={t}
            className="relative text-[clamp(1.4rem,3vw,2.2rem)] italic text-[#2d1f10]/55"
            style={{ fontFamily: "var(--font-mr-serif)" }}
          >
            <span>{t}</span>
            <span className="absolute left-0 right-0 top-1/2 h-[2px] translate-y-[-1px] bg-[#7a36dd]" />
          </span>
        ))}
        <span
          className="text-[clamp(1.4rem,3vw,2.2rem)] text-[#7a36dd]"
          style={{ fontFamily: "var(--font-mr-serif)", fontWeight: 700 }}
        >
          Client Keeper.
        </span>
      </div>
    </section>
  );
}

function JournalScene() {
  const items = [
    { t: "Call Sarah Johnson · follow-up due", done: true },
    { t: "Check in with the Millers (every 6 months)" },
    { t: "Send the Andersons the Chapel Hill comps" },
    { t: "Add note for Sarah Miller — preapproved $450k", done: true },
    { t: "Birthday reminder — Susan M." },
    { t: "Close the laptop by 6pm" },
  ];

  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setOn(true);
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative z-10 mx-auto max-w-4xl px-6 py-20">
      <p className="mb-6 text-center text-[11px] uppercase tracking-[0.4em] text-[#8a5614]">
        The morning page · auto-written by MYRA
      </p>
      <div className="relative overflow-hidden rounded-2xl border border-[#2d1f10]/10 bg-white p-10 shadow-[0_30px_80px_-40px_rgba(45,31,16,0.5)] md:p-14">
        <div
          className="absolute left-10 top-10 text-[11px] uppercase tracking-[0.35em] text-[#7a36dd]"
          style={{ fontFamily: "var(--font-mr-hand)" }}
        >
          Tuesday
        </div>
        <div className="mt-10 space-y-5">
          {items.map((it, i) => (
            <div
              key={it.t}
              className="flex items-start gap-5"
              style={{
                opacity: on ? 1 : 0,
                transform: on ? "translateY(0)" : "translateY(8px)",
                transition: `all 600ms cubic-bezier(0.3,1,0.4,1) ${200 + i * 140}ms`,
              }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" className="mt-[2px] shrink-0">
                <rect
                  x="2"
                  y="2"
                  width="24"
                  height="24"
                  rx="3"
                  fill="none"
                  stroke={it.done ? "#7a36dd" : "#2d1f10"}
                  strokeWidth="1.5"
                />
                {it.done && on && (
                  <path
                    d="M 7 14 L 12 19 L 21 9"
                    fill="none"
                    stroke="#7a36dd"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="check-mark"
                    style={{ animationDelay: `${400 + i * 140}ms` }}
                  />
                )}
              </svg>
              <span
                className="text-[26px] md:text-[28px]"
                style={{
                  fontFamily: "var(--font-mr-hand)",
                  textDecoration: it.done ? "line-through" : "none",
                  color: it.done ? "#7a36dd" : "#2d1f10",
                }}
              >
                {it.t}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Three() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-20">
      <h2
        className="mb-14 text-[clamp(2rem,5vw,3.5rem)] leading-[1]"
        style={{ fontFamily: "var(--font-mr-serif)", fontWeight: 600 }}
      >
        Everything you need.
        <br />
        <em className="italic text-[#7a36dd]">Nothing you don&apos;t.</em>
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES_6.map((x, i) => (
          <article
            key={x.title}
            className="group relative rounded-2xl border border-[#2d1f10]/10 bg-white/70 p-8 backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_28px_50px_-30px_rgba(45,31,16,0.4)]"
          >
            <p
              className="mb-3 text-[#7a36dd]"
              style={{
                fontFamily: "var(--font-mr-serif)",
                fontSize: "1.4rem",
                fontStyle: "italic",
              }}
            >
              {String(i + 1).padStart(2, "0")}.
            </p>
            <h3
              className="mb-3 text-2xl text-[#2d1f10]"
              style={{ fontFamily: "var(--font-mr-serif)", fontWeight: 600 }}
            >
              {x.title}
            </h3>
            <p className="text-[16px] leading-relaxed text-[#4a3320]">{x.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Myra() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-12 rounded-2xl border border-[#2d1f10]/10 bg-white/70 p-8 backdrop-blur-sm md:grid-cols-[0.95fr,1.05fr] md:p-14">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#8a5614]">
            {MYRA_INTRO.label}
          </p>
          <h2
            className="mt-4 text-[clamp(2rem,5vw,3.6rem)] leading-[1]"
            style={{ fontFamily: "var(--font-mr-serif)", fontWeight: 600 }}
          >
            {MYRA_INTRO.title}.
            <br />
            <em className="italic text-[#7a36dd]">{MYRA_INTRO.tagline}.</em>
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-[#4a3320]">
            {MYRA_INTRO.body}
          </p>
        </div>
        <div className="rounded-2xl border border-[#2d1f10]/10 bg-[#fbf2e3] p-6">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#7a36dd]">
            Voice memo · {MYRA_VOICE_MEMO.duration}
          </p>
          <p
            className="mt-4 text-[22px] italic leading-snug text-[#2d1f10]"
            style={{ fontFamily: "var(--font-mr-hand)" }}
          >
            &ldquo;{MYRA_VOICE_MEMO.quote}&rdquo;
          </p>
          <div className="mt-5 space-y-1.5 text-[14px] text-[#4a3320]">
            {MYRA_VOICE_MEMO.actions.map((a) => (
              <p key={a.k}>
                → {a.k}: <strong>{a.v}</strong>
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {MYRA_JOBS.map((j) => (
          <div key={j.k} className="border-t border-[#2d1f10]/15 pt-4">
            <h4
              className="text-xl text-[#2d1f10]"
              style={{ fontFamily: "var(--font-mr-serif)", fontWeight: 600 }}
            >
              {j.k}
            </h4>
            <p className="mt-2 text-[15px] leading-relaxed text-[#4a3320]/90">
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
    <section className="relative z-10 border-y border-[#2d1f10]/15 bg-[#f5e7cc] py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1fr,1.1fr]">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#8a5614]">
            Why Client Keeper
          </p>
          <h2
            className="mt-3 text-[clamp(2rem,4.5vw,3.6rem)] leading-[1]"
            style={{ fontFamily: "var(--font-mr-serif)", fontWeight: 600 }}
          >
            Keep more clients.{" "}
            <em className="italic text-[#7a36dd]">Close more deals.</em>
          </h2>
          <ul className="mt-8 space-y-3">
            {BENEFITS_BULLETS.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 text-[16.5px] leading-snug text-[#2d1f10]"
              >
                <span className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-[#7a36dd]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {STATS.map((s) => (
            <div key={s.n} className="rounded-2xl border border-[#2d1f10]/10 bg-white p-6">
              <p
                className="text-[#7a36dd]"
                style={{
                  fontFamily: "var(--font-mr-serif)",
                  fontSize: "clamp(2.4rem,5vw,3.5rem)",
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {s.n}
              </p>
              <p className="mt-3 text-[13px] uppercase tracking-[0.2em] text-[#4a3320]/80">
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
      <p className="text-center text-[11px] uppercase tracking-[0.4em] text-[#8a5614]">
        The long list
      </p>
      <h2
        className="mx-auto mt-4 max-w-3xl text-center text-[clamp(2rem,5vw,3.6rem)] leading-[1.05]"
        style={{ fontFamily: "var(--font-mr-serif)", fontWeight: 600 }}
      >
        Built for real estate agents, <em className="italic text-[#7a36dd]">not adapted.</em>
      </h2>
      <div className="mt-14 grid gap-10 md:grid-cols-2">
        {DETAILED_FEATURES_4.map((b) => (
          <article
            key={b.t}
            className="rounded-2xl border border-[#2d1f10]/10 bg-white/80 p-8 backdrop-blur-sm"
          >
            <h3
              className="text-2xl text-[#2d1f10]"
              style={{ fontFamily: "var(--font-mr-serif)", fontWeight: 700 }}
            >
              {b.t}
            </h3>
            <p className="mt-3 text-[16px] leading-relaxed text-[#4a3320]">
              {b.b}
            </p>
            <ul className="mt-4 space-y-2 text-[15px] text-[#2d1f10]">
              {b.bullets.map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <span className="mt-[8px] inline-block size-1 rounded-full bg-[#7a36dd]" />
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
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-20">
      <p className="text-center text-[11px] uppercase tracking-[0.4em] text-[#8a5614]">
        Loved by agents everywhere
      </p>
      <h2
        className="mx-auto mt-4 max-w-3xl text-center text-[clamp(2rem,5vw,3.4rem)] leading-[1.05]"
        style={{ fontFamily: "var(--font-mr-serif)", fontWeight: 600 }}
      >
        Don&apos;t just take our word.
      </h2>
      <div className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.n}
            className="rounded-2xl border border-[#2d1f10]/10 bg-white/80 p-6 backdrop-blur-sm"
          >
            <p
              className="text-[16.5px] italic leading-relaxed text-[#2d1f10]"
              style={{ fontFamily: "var(--font-mr-serif)" }}
            >
              &ldquo;{t.q}&rdquo;
            </p>
            <figcaption className="mt-5 border-t border-[#2d1f10]/15 pt-3">
              <p
                className="text-xl text-[#7a36dd]"
                style={{ fontFamily: "var(--font-mr-hand)" }}
              >
                {t.n}
              </p>
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#4a3320]/70">
                {t.r}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Rate() {
  return (
    <section className="relative z-10 border-y border-[#2d1f10]/15 bg-[#f5e7cc] py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.42em] text-[#8a5614]">
          Simple, transparent pricing
        </p>
        <h2
          className="mt-4 text-[clamp(3rem,7vw,5.5rem)] leading-[0.95]"
          style={{ fontFamily: "var(--font-mr-serif)", fontWeight: 600 }}
        >
          <em className="italic text-[#7a36dd]">$19</em> a month.
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-[17px] leading-relaxed text-[#4a3320]">
          $19/mo billed annually (20% off), or $24/mo billed monthly. Every plan
          includes MYRA AI, unlimited contacts, and full mobile access.
        </p>

        <div className="mt-10 rounded-2xl border border-[#2d1f10]/10 bg-white p-8 text-left">
          <p className="text-[11px] uppercase tracking-[0.32em] text-[#7a36dd]">
            Every plan includes
          </p>
          <ul className="mt-5 grid gap-3 text-[15px] text-[#2d1f10] sm:grid-cols-2">
            {PRICING_INCLUDED.map((x) => (
              <li key={x} className="flex items-start gap-2">
                <span className="mt-[8px] inline-block size-1.5 shrink-0 rounded-full bg-[#7a36dd]" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>

        <a
          href="/client-keeper-crm"
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#2d1f10] px-8 py-4 text-sm font-semibold text-[#fbf2e3] transition hover:-translate-y-0.5 hover:bg-[#3d0d6a]"
        >
          Begin your first morning →
        </a>
        <p className="mt-4 text-[11px] uppercase tracking-[0.3em] text-[#8a5614]/80">
          {PRICING.trust}
        </p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-[#7a36dd]">
          {PRICING.guarantee}
        </p>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="relative z-10 mx-auto max-w-4xl px-6 py-24">
      <p className="text-center text-[11px] uppercase tracking-[0.4em] text-[#8a5614]">
        A few questions
      </p>
      <h2
        className="mt-4 text-center text-[clamp(2rem,5vw,3.4rem)] leading-[1.05]"
        style={{ fontFamily: "var(--font-mr-serif)", fontWeight: 600 }}
      >
        Frequently asked.
      </h2>
      <div className="mt-12 divide-y divide-[#2d1f10]/15 border-y border-[#2d1f10]/15">
        {FAQS.map((f) => (
          <details key={f.q} className="group py-6">
            <summary className="flex cursor-pointer items-baseline justify-between gap-6 list-none">
              <h3
                className="text-xl text-[#2d1f10]"
                style={{ fontFamily: "var(--font-mr-serif)", fontWeight: 600 }}
              >
                {f.q}
              </h3>
              <span className="text-[#7a36dd] transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-4 text-[16px] leading-relaxed text-[#4a3320]">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Sign() {
  return (
    <footer className="relative z-10 py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] uppercase tracking-[0.35em] text-[#8a5614]">
            Start your free 30-day trial
          </p>
          <h3
            className="mt-4 text-[clamp(2rem,5vw,3.2rem)] leading-[1.05]"
            style={{ fontFamily: "var(--font-mr-serif)", fontWeight: 600 }}
          >
            Join{" "}
            <em className="italic text-[#7a36dd]">{AGENT_COUNT} agents</em>{" "}
            closing more deals with Client Keeper.
          </h3>
          <a
            href="/client-keeper-crm"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#2d1f10] px-8 py-4 text-sm font-semibold text-[#fbf2e3] transition hover:-translate-y-0.5 hover:bg-[#3d0d6a]"
          >
            {PRICING.cta} →
          </a>
        </div>
        <div className="mt-12 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <p
            className="text-2xl italic text-[#7a36dd]"
            style={{ fontFamily: "var(--font-mr-hand)" }}
          >
            — with warm regards, Client Keeper
          </p>
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#8a5614]/80">
            © MMXXVI · Morning Ritual Edition
          </p>
        </div>
      </div>
    </footer>
  );
}
