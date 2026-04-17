"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Fraunces, Caveat, DM_Sans } from "next/font/google";
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

const serif = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-oh2-serif",
});
const hand = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oh2-hand",
});
const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-oh2-sans",
});

export default function OpenHousePage() {
  return (
    <main
      className={`${serif.variable} ${hand.variable} ${sans.variable} relative min-h-screen bg-[#faf1e4] text-[#2d1f10]`}
      style={{ fontFamily: "var(--font-oh2-sans), system-ui, sans-serif" }}
    >
      <title>Client Keeper · Open House</title>
      <WarmBg />
      <Nav />
      <Hero />
      <UsedBy />
      <Strikethrough />
      <Polaroids />
      <Welcome />
      <SixFeatures />
      <Myra />
      <Benefits />
      <DetailFeatures />
      <Testimonials />
      <Rate />
      <FAQ />
      <Sign />
    </main>
  );
}

function WarmBg() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(255,206,156,0.35), transparent 55%), radial-gradient(ellipse at bottom, rgba(196,131,214,0.18), transparent 60%)",
        }}
      />
      <svg className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-[0.04]">
        <filter id="oh-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#oh-noise)" />
      </svg>
    </>
  );
}

function Nav() {
  return (
    <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 pt-10">
      <div className="flex items-baseline gap-3">
        <span
          className="text-2xl"
          style={{ fontFamily: "var(--font-oh2-serif)", fontWeight: 700 }}
        >
          Client Keeper
        </span>
        <span className="text-[11px] uppercase tracking-[0.4em] text-[#7a36dd]">
          Open House
        </span>
      </div>
      <a
        href="/client-keeper-crm"
        className="rounded-full bg-[#3a1f55] px-5 py-2 text-[12px] font-semibold text-[#faf1e4] transition hover:bg-[#7a36dd]"
      >
        Start Free Trial
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative z-10 mx-auto grid max-w-6xl gap-10 px-6 pt-16 pb-20 md:grid-cols-[1.05fr,0.95fr] md:pt-24">
      <div>
        <p className="mb-7 text-[11px] uppercase tracking-[0.4em] text-[#7a36dd]">
          {TAGLINE}
        </p>
        <h1
          className="text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.015em]"
          style={{ fontFamily: "var(--font-oh2-serif)", fontWeight: 600 }}
        >
          Every client,{" "}
          <em className="italic text-[#7a36dd]">welcomed</em>
          <br />
          like you&apos;re hosting
          <br />
          a good <em className="italic text-[#c89841]">open house.</em>
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
            className="group inline-flex items-center gap-3 rounded-full bg-[#3a1f55] px-7 py-4 text-sm font-semibold text-[#faf1e4] shadow-[0_14px_40px_-12px_rgba(58,31,85,0.5)] transition hover:-translate-y-0.5 hover:bg-[#7a36dd]"
          >
            {PRICING.cta}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <span
            className="text-[28px] text-[#7a36dd]"
            style={{ fontFamily: "var(--font-oh2-hand)" }}
          >
            coffee&apos;s already on
          </span>
        </div>
      </div>
      <div className="relative">
        <div className="relative overflow-hidden rounded-3xl border border-[#2d1f10]/10 shadow-[0_30px_70px_-30px_rgba(45,31,16,0.5)]">
          <Image
            src="/ck-images/v10-open-house-kitchen.jpg"
            alt="An open house kitchen island with lilacs and welcome cards"
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
        <p className="mb-3 text-center text-[10px] uppercase tracking-[0.5em] text-[#7a36dd]">
          Used by
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
          {USED_BY.map((n) => (
            <span
              key={n}
              className="text-[15px] italic text-[#4a3320]/75"
              style={{ fontFamily: "var(--font-oh2-serif)" }}
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
      <p className="mb-4 text-[11px] uppercase tracking-[0.42em] text-[#7a36dd]">
        On the way out
      </p>
      <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
        {STRIKETHROUGH.map((t) => (
          <span
            key={t}
            className="relative text-[clamp(1.4rem,3vw,2.2rem)] italic text-[#2d1f10]/55"
            style={{ fontFamily: "var(--font-oh2-serif)" }}
          >
            <span>{t}</span>
            <span className="absolute left-0 right-0 top-1/2 h-[2px] translate-y-[-1px] bg-[#7a36dd]" />
          </span>
        ))}
        <span
          className="text-[clamp(1.4rem,3vw,2.2rem)] text-[#7a36dd]"
          style={{ fontFamily: "var(--font-oh2-serif)", fontWeight: 700 }}
        >
          Client Keeper.
        </span>
      </div>
    </section>
  );
}

function Polaroids() {
  const cards = [
    { name: "Sarah Johnson", note: "showed Oak St · loved backyard", tint: "#ffcd7a", rot: -5 },
    { name: "The Smiths", note: "2,500 sqft · 4-bed · good schools", tint: "#e8b6a5", rot: 3.5 },
    { name: "The Millers", note: "check in every 6 months · MYRA on it", tint: "#c49bff", rot: -2.5 },
    { name: "Sarah Miller", note: "preapproved for $450k", tint: "#f8d7e9", rot: 4.5 },
  ];
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setOn(true);
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} className="relative z-10 mx-auto max-w-6xl px-6 py-16">
      <div className="mb-12 text-center">
        <p className="text-[11px] uppercase tracking-[0.42em] text-[#7a36dd]">
          Your guest list · this week
        </p>
        <h2
          className="mt-3 text-[clamp(2rem,5vw,3.6rem)]"
          style={{ fontFamily: "var(--font-oh2-serif)", fontWeight: 700 }}
        >
          Faces MYRA is <em className="italic text-[#7a36dd]">remembering for you.</em>
        </h2>
      </div>
      <div className="flex flex-wrap items-start justify-center gap-8">
        {cards.map((c, i) => (
          <div
            key={c.name}
            className="relative w-64 shrink-0 rounded-[4px] bg-white p-3 shadow-[0_20px_40px_-18px_rgba(45,31,16,0.45)]"
            style={{
              transform: on ? `rotate(${c.rot}deg) translateY(0)` : "rotate(0deg) translateY(40px)",
              opacity: on ? 1 : 0,
              transition: `all 900ms cubic-bezier(0.2,0.9,0.3,1) ${300 + i * 180}ms`,
            }}
          >
            <div
              className="aspect-[4/5] w-full rounded-sm"
              style={{
                background: `linear-gradient(140deg, ${c.tint} 0%, ${c.tint}cc 50%, #fff 130%)`,
              }}
            />
            <p
              className="mt-3 px-1 text-[20px] leading-snug text-[#2d1f10]"
              style={{ fontFamily: "var(--font-oh2-hand)" }}
            >
              <strong className="font-normal">{c.name}.</strong> {c.note}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Welcome() {
  const t = TESTIMONIALS[3];
  return (
    <section className="relative z-10 border-y border-[#2d1f10]/15 bg-[#f5e4cc] py-20">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.42em] text-[#7a36dd]">
          A guest book quote
        </p>
        <blockquote
          className="mx-auto mt-6 max-w-3xl text-[clamp(1.7rem,4vw,2.8rem)] italic leading-[1.2] text-[#2d1f10]"
          style={{ fontFamily: "var(--font-oh2-serif)" }}
        >
          &ldquo;{t.q}&rdquo;
        </blockquote>
        <p
          className="mt-6 text-2xl text-[#7a36dd]"
          style={{ fontFamily: "var(--font-oh2-hand)" }}
        >
          — {t.n}, {t.r}
        </p>
      </div>
    </section>
  );
}

function SixFeatures() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10">
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#7a36dd]">
          The six things it does
        </p>
        <h2
          className="mt-3 text-[clamp(2rem,5vw,3.4rem)]"
          style={{ fontFamily: "var(--font-oh2-serif)", fontWeight: 700 }}
        >
          Everything you need. <em className="italic text-[#7a36dd]">Nothing you don&apos;t.</em>
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES_6.map((x) => (
          <article
            key={x.title}
            className="rounded-2xl border border-[#2d1f10]/10 bg-white/80 p-8 backdrop-blur-sm"
          >
            <h3
              className="mb-3 text-2xl text-[#2d1f10]"
              style={{ fontFamily: "var(--font-oh2-serif)", fontWeight: 700 }}
            >
              {x.title}
            </h3>
            <p className="text-[15.5px] leading-relaxed text-[#4a3320]">{x.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Myra() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-10 rounded-3xl border border-[#2d1f10]/10 bg-white/75 p-8 shadow-[0_30px_60px_-30px_rgba(45,31,16,0.4)] backdrop-blur-md md:grid-cols-[1fr,1fr] md:p-14">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#7a36dd]">
            {MYRA_INTRO.label}
          </p>
          <h2
            className="mt-4 text-[clamp(2rem,5vw,3.4rem)] leading-[1]"
            style={{ fontFamily: "var(--font-oh2-serif)", fontWeight: 700 }}
          >
            {MYRA_INTRO.title}.
            <br />
            <em className="italic text-[#7a36dd]">{MYRA_INTRO.tagline}.</em>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#4a3320]">
            {MYRA_INTRO.body}
          </p>
        </div>
        <div className="rounded-2xl border border-[#2d1f10]/10 bg-[#faf1e4] p-6">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#7a36dd]">
            Voice memo · {MYRA_VOICE_MEMO.duration}
          </p>
          <p
            className="mt-4 text-[22px] leading-snug italic text-[#2d1f10]"
            style={{ fontFamily: "var(--font-oh2-hand)" }}
          >
            &ldquo;{MYRA_VOICE_MEMO.quote}&rdquo;
          </p>
          <div className="mt-5 text-[14px] text-[#4a3320]">
            {MYRA_VOICE_MEMO.actions.map((a) => (
              <p key={a.k}>→ {a.k}: <strong>{a.v}</strong></p>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {MYRA_JOBS.map((j) => (
          <div key={j.k} className="border-t border-[#2d1f10]/15 pt-4">
            <h4
              className="text-xl text-[#2d1f10]"
              style={{ fontFamily: "var(--font-oh2-serif)", fontWeight: 700 }}
            >
              {j.k}
            </h4>
            <p className="mt-2 text-[15px] leading-relaxed text-[#4a3320]">
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
    <section className="relative z-10 border-y border-[#2d1f10]/15 bg-[#f5e4cc] py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1fr,1.1fr]">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#7a36dd]">
            Why Client Keeper
          </p>
          <h2
            className="mt-3 text-[clamp(2rem,4.5vw,3.4rem)] leading-[1]"
            style={{ fontFamily: "var(--font-oh2-serif)", fontWeight: 700 }}
          >
            Keep more clients. <em className="italic text-[#7a36dd]">Close more deals.</em>
          </h2>
          <ul className="mt-8 space-y-3">
            {BENEFITS_BULLETS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[16.5px] leading-snug text-[#2d1f10]">
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
                className="text-[#7a36dd] leading-none"
                style={{
                  fontFamily: "var(--font-oh2-serif)",
                  fontSize: "clamp(2.4rem,5vw,3.5rem)",
                  fontWeight: 800,
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
      <p className="text-center text-[11px] uppercase tracking-[0.4em] text-[#7a36dd]">
        The long list
      </p>
      <h2
        className="mx-auto mt-4 max-w-3xl text-center text-[clamp(2rem,5vw,3.6rem)] leading-[1.05]"
        style={{ fontFamily: "var(--font-oh2-serif)", fontWeight: 700 }}
      >
        Everything you need. <em className="italic text-[#7a36dd]">Nothing you don&apos;t.</em>
      </h2>
      <div className="mt-14 grid gap-10 md:grid-cols-2">
        {DETAILED_FEATURES_4.map((b) => (
          <article key={b.t} className="rounded-2xl border border-[#2d1f10]/10 bg-white/80 p-8 backdrop-blur-sm">
            <h3
              className="text-2xl text-[#2d1f10]"
              style={{ fontFamily: "var(--font-oh2-serif)", fontWeight: 700 }}
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
      <p className="text-center text-[11px] uppercase tracking-[0.4em] text-[#7a36dd]">
        Loved by agents everywhere
      </p>
      <h2
        className="mx-auto mt-4 max-w-3xl text-center text-[clamp(2rem,5vw,3.4rem)] leading-[1.05]"
        style={{ fontFamily: "var(--font-oh2-serif)", fontWeight: 700 }}
      >
        Don&apos;t just take our word.
      </h2>
      <div className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure key={t.n} className="rounded-2xl border border-[#2d1f10]/10 bg-white/80 p-6 backdrop-blur-sm">
            <p
              className="text-[16.5px] italic leading-relaxed text-[#2d1f10]"
              style={{ fontFamily: "var(--font-oh2-serif)" }}
            >
              &ldquo;{t.q}&rdquo;
            </p>
            <figcaption className="mt-5 border-t border-[#2d1f10]/15 pt-3">
              <p
                className="text-xl text-[#7a36dd]"
                style={{ fontFamily: "var(--font-oh2-hand)" }}
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
    <section className="relative z-10 border-y border-[#2d1f10]/15 bg-[#f5e4cc] py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.42em] text-[#7a36dd]">
          Simple, transparent pricing
        </p>
        <h2
          className="mt-4 text-[clamp(3rem,7vw,5.5rem)] leading-[0.95]"
          style={{ fontFamily: "var(--font-oh2-serif)", fontWeight: 700 }}
        >
          <em className="italic text-[#7a36dd]">$19</em> a month.
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-[#4a3320]">
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
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#3a1f55] px-8 py-4 text-sm font-semibold text-[#faf1e4] transition hover:-translate-y-0.5 hover:bg-[#7a36dd]"
        >
          {PRICING.cta} →
        </a>
        <p className="mt-4 text-[11px] uppercase tracking-[0.3em] text-[#4a3320]/70">
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
      <p className="text-center text-[11px] uppercase tracking-[0.4em] text-[#7a36dd]">
        A few questions
      </p>
      <h2
        className="mt-4 text-center text-[clamp(2rem,5vw,3.4rem)] leading-[1.05]"
        style={{ fontFamily: "var(--font-oh2-serif)", fontWeight: 700 }}
      >
        Frequently asked.
      </h2>
      <div className="mt-12 divide-y divide-[#2d1f10]/15 border-y border-[#2d1f10]/15">
        {FAQS.map((f) => (
          <details key={f.q} className="group py-6">
            <summary className="flex cursor-pointer items-baseline justify-between gap-6 list-none">
              <h3
                className="text-xl text-[#2d1f10]"
                style={{ fontFamily: "var(--font-oh2-serif)", fontWeight: 700 }}
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
    <footer className="relative z-10 border-t border-[#2d1f10]/10 py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#7a36dd]">
            Start your free 30-day trial
          </p>
          <h3
            className="mt-4 text-[clamp(2rem,5vw,3.2rem)] leading-[1.05]"
            style={{ fontFamily: "var(--font-oh2-serif)", fontWeight: 700 }}
          >
            Join <em className="italic text-[#7a36dd]">{AGENT_COUNT} agents</em>{" "}
            closing more deals with Client Keeper.
          </h3>
          <a
            href="/client-keeper-crm"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#3a1f55] px-8 py-4 text-sm font-semibold text-[#faf1e4] transition hover:-translate-y-0.5 hover:bg-[#7a36dd]"
          >
            {PRICING.cta} →
          </a>
        </div>
        <div className="mt-12 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <p
            className="text-2xl italic text-[#7a36dd]"
            style={{ fontFamily: "var(--font-oh2-hand)" }}
          >
            — please, come back often
          </p>
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#7a36dd]">
            © MMXXVI · Open House
          </p>
        </div>
      </div>
    </footer>
  );
}
