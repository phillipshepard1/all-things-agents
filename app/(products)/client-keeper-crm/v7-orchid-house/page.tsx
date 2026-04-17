"use client";

import Image from "next/image";
import { Cormorant_Garamond, Caveat, DM_Sans } from "next/font/google";
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

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-oh-serif",
});
const hand = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oh-hand",
});
const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-oh-sans",
});

export default function OrchidHousePage() {
  return (
    <main
      className={`${serif.variable} ${hand.variable} ${sans.variable} relative min-h-screen overflow-hidden bg-[#faf5f8] text-[#3a2348]`}
      style={{ fontFamily: "var(--font-oh-sans), system-ui, sans-serif" }}
    >
      <title>Client Keeper · Orchid House</title>
      <VinesBackdrop />
      <Nav />
      <Hero />
      <UsedBy />
      <Strikethrough />
      <Bouquet />
      <Species />
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

function VinesBackdrop() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at top left, rgba(196,131,214,0.18), transparent 55%), radial-gradient(ellipse at bottom right, rgba(146,172,112,0.2), transparent 60%)",
        }}
      />
      <svg
        aria-hidden
        className="pointer-events-none absolute -left-12 -top-10 z-0 hidden h-[420px] w-[360px] text-[#6b8349] md:block"
        viewBox="0 0 360 420"
        fill="none"
      >
        <path
          d="M 20 40 C 90 80, 120 160, 160 220 C 200 280, 260 320, 340 360"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
        />
        {[
          [60, 70, 0],
          [100, 140, 25],
          [160, 210, -20],
          [220, 275, 12],
          [290, 330, -35],
        ].map(([cx, cy, rot], i) => (
          <g key={i} transform={`translate(${cx} ${cy}) rotate(${rot})`} opacity="0.92">
            <ellipse cx="0" cy="0" rx="26" ry="12" fill="#c483d6" />
            <ellipse cx="0" cy="-8" rx="22" ry="10" fill="#e5b9f1" />
            <circle cx="0" cy="0" r="5" fill="#faf5f8" />
            <circle cx="0" cy="0" r="3" fill="#7a36dd" />
          </g>
        ))}
      </svg>
      <svg
        aria-hidden
        className="pointer-events-none absolute -right-10 -bottom-10 z-0 hidden h-[380px] w-[340px] rotate-180 text-[#6b8349] md:block"
        viewBox="0 0 360 420"
        fill="none"
      >
        <path
          d="M 20 40 C 100 90, 140 180, 180 240 C 230 310, 280 340, 340 370"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.55"
        />
        {[
          [80, 90, 12],
          [150, 195, -18],
          [230, 295, 8],
          [300, 340, -24],
        ].map(([cx, cy, rot], i) => (
          <g key={i} transform={`translate(${cx} ${cy}) rotate(${rot})`} opacity="0.8">
            <ellipse cx="0" cy="0" rx="22" ry="10" fill="#d4aeea" />
            <circle cx="0" cy="0" r="3" fill="#7a36dd" />
          </g>
        ))}
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
          style={{ fontFamily: "var(--font-oh-serif)", fontWeight: 600 }}
        >
          Client Keeper
        </span>
        <span className="text-[11px] uppercase tracking-[0.38em] text-[#6b8349]">
          Orchid House
        </span>
      </div>
      <a
        href="/client-keeper-crm"
        className="rounded-full bg-[#3a2348] px-5 py-2 text-[12px] text-[#faf5f8] transition hover:bg-[#7a36dd]"
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
        <p className="mb-6 text-[11px] uppercase tracking-[0.38em] text-[#7a36dd]">
          {TAGLINE}
        </p>
        <h1
          className="text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.015em]"
          style={{ fontFamily: "var(--font-oh-serif)", fontWeight: 500 }}
        >
          Let your clients{" "}
          <em className="italic text-[#7a36dd]">grow</em>,
          <br />
          and know when to{" "}
          <em className="italic text-[#6b8349]">water</em> each one.
        </h1>
        <p className="mt-8 max-w-lg text-lg leading-relaxed text-[#4a3a55]">
          Client Keeper is simple to use, with zero learning curve. MYRA —
          your AI assistant — handles data entry through voice and text so
          you stay organized, build better relationships, and close more
          deals without the overwhelm.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-5">
          <a
            href="/client-keeper-crm"
            className="group inline-flex items-center gap-3 rounded-full bg-[#3a2348] px-7 py-4 text-sm font-semibold text-[#faf5f8] shadow-[0_14px_40px_-12px_rgba(58,35,72,0.5)] transition hover:-translate-y-0.5 hover:bg-[#7a36dd]"
          >
            {PRICING.cta}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <span
            className="text-[26px] text-[#6b8349]"
            style={{ fontFamily: "var(--font-oh-hand)" }}
          >
            30 days free · no card
          </span>
        </div>
      </div>
      <div className="relative">
        <div className="relative overflow-hidden rounded-[24px] border border-[#3a2348]/10 shadow-[0_30px_70px_-30px_rgba(58,35,72,0.5)]">
          <Image
            src="/ck-images/v7-orchid-house.jpg"
            alt="A sunlit greenhouse with lilac orchids"
            width={1000}
            height={1200}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
        <div className="absolute -bottom-5 left-6 rounded-full border border-[#6b8349]/30 bg-white/90 px-5 py-2 shadow-lg backdrop-blur">
          <p
            className="text-sm italic text-[#3a2348]"
            style={{ fontFamily: "var(--font-oh-hand)", fontSize: "22px" }}
          >
            {AGENT_COUNT} agents growing together
          </p>
        </div>
      </div>
    </section>
  );
}

function UsedBy() {
  return (
    <section className="relative z-10 border-y border-[#3a2348]/15 py-7">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-3 text-center text-[10px] uppercase tracking-[0.5em] text-[#6b8349]">
          Used by
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
          {USED_BY.map((n) => (
            <span
              key={n}
              className="text-[15px] italic text-[#3a2348]/75"
              style={{ fontFamily: "var(--font-oh-serif)" }}
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
            className="relative text-[clamp(1.4rem,3vw,2.2rem)] italic text-[#3a2348]/55"
            style={{ fontFamily: "var(--font-oh-serif)" }}
          >
            <span>{t}</span>
            <span className="absolute left-0 right-0 top-1/2 h-[2px] translate-y-[-1px] bg-[#7a36dd]" />
          </span>
        ))}
        <span
          className="text-[clamp(1.4rem,3vw,2.2rem)] text-[#7a36dd]"
          style={{ fontFamily: "var(--font-oh-serif)", fontWeight: 700 }}
        >
          Client Keeper.
        </span>
      </div>
    </section>
  );
}

function Bouquet() {
  const t = TESTIMONIALS[0];
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-6 py-16 text-center">
      <blockquote
        className="text-[clamp(1.7rem,3.8vw,2.9rem)] leading-[1.2] text-[#3a2348]"
        style={{ fontFamily: "var(--font-oh-serif)", fontStyle: "italic" }}
      >
        &ldquo;{t.q}&rdquo;
      </blockquote>
      <p
        className="mt-6 text-2xl text-[#6b8349]"
        style={{ fontFamily: "var(--font-oh-hand)" }}
      >
        — {t.n}, {t.r}
      </p>
    </section>
  );
}

function Species() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10 flex flex-col items-baseline justify-between gap-4 md:flex-row">
        <h2
          className="text-[clamp(2.2rem,5vw,3.8rem)] leading-[1]"
          style={{ fontFamily: "var(--font-oh-serif)", fontWeight: 600 }}
        >
          The species in the house.
        </h2>
        <span className="text-[11px] uppercase tracking-[0.38em] text-[#6b8349]">
          Six features, tended by hand
        </span>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES_6.map((x, i) => (
          <article
            key={x.title}
            className="group relative overflow-hidden rounded-3xl border border-[#3a2348]/10 bg-white/80 p-8 backdrop-blur-sm transition hover:-translate-y-1 hover:border-[#7a36dd]/30 hover:shadow-[0_30px_60px_-30px_rgba(58,35,72,0.4)]"
          >
            <p
              className="mb-3 text-[#7a36dd]"
              style={{
                fontFamily: "var(--font-oh-serif)",
                fontSize: "1.15rem",
                fontStyle: "italic",
              }}
            >
              No. {String(i + 1).padStart(2, "0")}
            </p>
            <h3
              className="mb-3 text-xl text-[#3a2348]"
              style={{ fontFamily: "var(--font-oh-serif)", fontWeight: 700 }}
            >
              {x.title}
            </h3>
            <p className="text-[15.5px] leading-relaxed text-[#4a3a55]">
              {x.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Myra() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-12 rounded-3xl border border-[#3a2348]/10 bg-white/80 p-10 backdrop-blur-sm md:grid-cols-[0.95fr,1.05fr] md:p-14">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#7a36dd]">
            {MYRA_INTRO.label}
          </p>
          <h2
            className="mt-3 text-[clamp(2rem,5vw,3.6rem)] leading-[1]"
            style={{ fontFamily: "var(--font-oh-serif)", fontWeight: 600 }}
          >
            {MYRA_INTRO.title}.
            <br />
            <em className="italic text-[#7a36dd]">{MYRA_INTRO.tagline}.</em>
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-[#4a3a55]">
            {MYRA_INTRO.body}
          </p>
        </div>
        <div className="rounded-2xl border border-[#6b8349]/30 bg-[#faf5f8] p-6">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#7a36dd]">
            Voice memo · {MYRA_VOICE_MEMO.duration}
          </p>
          <p
            className="mt-4 text-[22px] italic leading-snug text-[#3a2348]"
            style={{ fontFamily: "var(--font-oh-hand)" }}
          >
            &ldquo;{MYRA_VOICE_MEMO.quote}&rdquo;
          </p>
          <div className="mt-5 space-y-1.5 text-[14px] text-[#4a3a55]">
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
          <div key={j.k} className="border-t border-[#3a2348]/15 pt-4">
            <h4
              className="text-xl text-[#3a2348]"
              style={{ fontFamily: "var(--font-oh-serif)", fontWeight: 700 }}
            >
              {j.k}
            </h4>
            <p className="mt-2 text-[15px] leading-relaxed text-[#4a3a55]/90">
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
    <section className="relative z-10 border-y border-[#3a2348]/15 bg-[#f3e6f1] py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1fr,1.1fr]">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#6b8349]">
            Why Client Keeper
          </p>
          <h2
            className="mt-3 text-[clamp(2rem,4.5vw,3.6rem)] leading-[1]"
            style={{ fontFamily: "var(--font-oh-serif)", fontWeight: 600 }}
          >
            Keep more clients.{" "}
            <em className="italic text-[#7a36dd]">Close more deals.</em>
          </h2>
          <ul className="mt-8 space-y-3">
            {BENEFITS_BULLETS.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 text-[16.5px] leading-snug text-[#3a2348]"
              >
                <span className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-[#7a36dd]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {STATS.map((s) => (
            <div
              key={s.n}
              className="rounded-2xl border border-[#3a2348]/10 bg-white p-6"
            >
              <p
                className="text-[#7a36dd]"
                style={{
                  fontFamily: "var(--font-oh-serif)",
                  fontSize: "clamp(2.4rem,5vw,3.5rem)",
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {s.n}
              </p>
              <p className="mt-3 text-[13px] uppercase tracking-[0.2em] text-[#4a3a55]/80">
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
        style={{ fontFamily: "var(--font-oh-serif)", fontWeight: 600 }}
      >
        Everything you need. <em className="italic text-[#7a36dd]">Nothing you don&apos;t.</em>
      </h2>
      <div className="mt-14 grid gap-10 md:grid-cols-2">
        {DETAILED_FEATURES_4.map((b) => (
          <article
            key={b.t}
            className="rounded-2xl border border-[#3a2348]/10 bg-white/80 p-8 backdrop-blur-sm"
          >
            <h3
              className="text-2xl text-[#3a2348]"
              style={{ fontFamily: "var(--font-oh-serif)", fontWeight: 700 }}
            >
              {b.t}
            </h3>
            <p className="mt-3 text-[16px] leading-relaxed text-[#4a3a55]">
              {b.b}
            </p>
            <ul className="mt-4 space-y-2 text-[15px] text-[#3a2348]">
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
        style={{ fontFamily: "var(--font-oh-serif)", fontWeight: 600 }}
      >
        Don&apos;t just take our word.
      </h2>
      <div className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.n}
            className="rounded-2xl border border-[#3a2348]/10 bg-white/80 p-6 backdrop-blur-sm"
          >
            <p
              className="text-[16.5px] italic leading-relaxed text-[#3a2348]"
              style={{ fontFamily: "var(--font-oh-serif)" }}
            >
              &ldquo;{t.q}&rdquo;
            </p>
            <figcaption className="mt-5 border-t border-[#3a2348]/15 pt-3">
              <p
                className="text-xl text-[#7a36dd]"
                style={{ fontFamily: "var(--font-oh-hand)" }}
              >
                {t.n}
              </p>
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#4a3a55]/70">
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
    <section className="relative z-10 border-y border-[#3a2348]/15 bg-[#f3e6f1] py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.42em] text-[#7a36dd]">
          Simple, transparent pricing
        </p>
        <h2
          className="mt-4 text-[clamp(3rem,7vw,5.5rem)] leading-[0.95]"
          style={{ fontFamily: "var(--font-oh-serif)", fontWeight: 600 }}
        >
          <em className="italic text-[#7a36dd]">$19</em> a month.
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-[17px] leading-relaxed text-[#4a3a55]">
          $19/mo billed annually (20% off), or $24/mo billed monthly. Every plan
          includes MYRA AI, unlimited contacts, and full mobile access.
        </p>

        <div className="mt-10 rounded-2xl border border-[#3a2348]/10 bg-white p-8 text-left">
          <p className="text-[11px] uppercase tracking-[0.32em] text-[#7a36dd]">
            Every plan includes
          </p>
          <ul className="mt-5 grid gap-3 text-[15px] text-[#3a2348] sm:grid-cols-2">
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
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#3a2348] px-8 py-4 text-sm font-semibold text-[#faf5f8] transition hover:-translate-y-0.5 hover:bg-[#7a36dd]"
        >
          {PRICING.cta} →
        </a>
        <p className="mt-4 text-[11px] uppercase tracking-[0.32em] text-[#6b8349]/90">
          {PRICING.trust}
        </p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.32em] text-[#7a36dd]">
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
        style={{ fontFamily: "var(--font-oh-serif)", fontWeight: 600 }}
      >
        Frequently asked.
      </h2>
      <div className="mt-12 divide-y divide-[#3a2348]/15 border-y border-[#3a2348]/15">
        {FAQS.map((f) => (
          <details key={f.q} className="group py-6">
            <summary className="flex cursor-pointer items-baseline justify-between gap-6 list-none">
              <h3
                className="text-xl text-[#3a2348]"
                style={{ fontFamily: "var(--font-oh-serif)", fontWeight: 700 }}
              >
                {f.q}
              </h3>
              <span className="text-[#7a36dd] transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-4 text-[16px] leading-relaxed text-[#4a3a55]">
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
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#7a36dd]">
            Start your free 30-day trial
          </p>
          <h3
            className="mt-4 text-[clamp(2rem,5vw,3.2rem)] leading-[1.05]"
            style={{ fontFamily: "var(--font-oh-serif)", fontWeight: 600 }}
          >
            Join <em className="italic text-[#7a36dd]">{AGENT_COUNT} agents</em>{" "}
            closing more deals with Client Keeper.
          </h3>
          <a
            href="/client-keeper-crm"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#3a2348] px-8 py-4 text-sm font-semibold text-[#faf5f8] transition hover:-translate-y-0.5 hover:bg-[#7a36dd]"
          >
            {PRICING.cta} →
          </a>
        </div>
        <div className="mt-12 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <p
            className="text-2xl italic text-[#7a36dd]"
            style={{ fontFamily: "var(--font-oh-hand)" }}
          >
            — grown with care, Client Keeper
          </p>
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#6b8349]">
            © MMXXVI · Orchid House
          </p>
        </div>
      </div>
    </footer>
  );
}
