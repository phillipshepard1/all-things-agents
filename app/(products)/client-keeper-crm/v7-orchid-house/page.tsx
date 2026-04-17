"use client";

import Image from "next/image";
import { Cormorant_Garamond, Caveat, DM_Sans } from "next/font/google";

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
      <Bouquet />
      <Species />
      <Myra />
      <Rate />
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
      {/* Top-left vine */}
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
      {/* Bottom-right vine */}
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
        Begin the trial
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative z-10 mx-auto grid max-w-6xl gap-12 px-6 pt-16 pb-24 md:grid-cols-[1.05fr,0.95fr] md:pt-24">
      <div>
        <p className="mb-6 text-[11px] uppercase tracking-[0.38em] text-[#7a36dd]">
          The CRM for agents who tend a business
        </p>
        <h1
          className="text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.015em]"
          style={{ fontFamily: "var(--font-oh-serif)", fontWeight: 500 }}
        >
          Let your clients{" "}
          <em className="italic text-[#7a36dd]">grow</em>
          ,
          <br />
          and know when to{" "}
          <em className="italic text-[#6b8349]">water</em>{" "}
          each one.
        </h1>
        <p className="mt-8 max-w-lg text-lg leading-relaxed text-[#4a3a55]">
          Real estate is a slow garden. Client Keeper remembers what you
          planted, when it bloomed, and which ones need attention now. Myra,
          your AI assistant, does the quiet watering.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-5">
          <a
            href="/client-keeper-crm"
            className="group inline-flex items-center gap-3 rounded-full bg-[#3a2348] px-7 py-4 text-sm font-semibold text-[#faf5f8] shadow-[0_14px_40px_-12px_rgba(58,35,72,0.5)] transition hover:-translate-y-0.5 hover:bg-[#7a36dd]"
          >
            Open the greenhouse
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <span
            className="text-[26px] text-[#6b8349]"
            style={{ fontFamily: "var(--font-oh-hand)" }}
          >
            30 days · free · no card
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
            bloomed this month — 132 deals
          </p>
        </div>
      </div>
    </section>
  );
}

function Bouquet() {
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-6 py-16 text-center">
      <blockquote
        className="text-[clamp(1.7rem,3.8vw,2.9rem)] leading-[1.2] text-[#3a2348]"
        style={{ fontFamily: "var(--font-oh-serif)", fontStyle: "italic" }}
      >
        &ldquo;I&apos;d been an agent 17 years before I realized I wasn&apos;t
        losing deals — I was losing the people I already knew. Client Keeper
        gave me back the garden I forgot I planted.&rdquo;
      </blockquote>
      <p
        className="mt-6 text-2xl text-[#6b8349]"
        style={{ fontFamily: "var(--font-oh-hand)" }}
      >
        — Marjorie W., Asheville
      </p>
    </section>
  );
}

function Species() {
  const items = [
    {
      k: "Myra · assistant",
      v: "Voice-first note-taking. Talk to Myra after a showing; she writes, tags, and files.",
    },
    {
      k: "Follow-ups · evergreen",
      v: "Birthdays, anniversaries, first-showings, closing windows — always on the morning page.",
    },
    {
      k: "Pipeline · in bloom",
      v: "Every transaction in one thread, from first inquiry to signed papers.",
    },
    {
      k: "Everywhere · native",
      v: "Mac, iPhone, Android. Offline-friendly. No cloud-vendor lock-in.",
    },
  ];
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
          Four features, tended by hand
        </span>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((x) => (
          <article
            key={x.k}
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
              {x.k}
            </p>
            <h3
              className="mb-3 text-xl text-[#3a2348]"
              style={{ fontFamily: "var(--font-oh-serif)", fontWeight: 700 }}
            >
              {x.k.split(" · ")[0]}
            </h3>
            <p className="text-[16px] leading-relaxed text-[#4a3a55]">{x.v}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Myra() {
  return (
    <section className="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center">
      <p className="text-[11px] uppercase tracking-[0.4em] text-[#7a36dd]">
        About Myra
      </p>
      <h2
        className="mx-auto mt-4 max-w-3xl text-[clamp(2rem,5vw,3.8rem)] leading-[1]"
        style={{ fontFamily: "var(--font-oh-serif)", fontWeight: 500 }}
      >
        Your <em className="italic text-[#7a36dd]">quiet assistant</em> — the
        one you would have hired, if the margins allowed.
      </h2>
    </section>
  );
}

function Rate() {
  return (
    <section className="relative z-10 border-y border-[#3a2348]/15 bg-[#f3e6f1] py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.42em] text-[#7a36dd]">
          Nineteen dollars a month
        </p>
        <h2
          className="mt-4 text-[clamp(3rem,7vw,5.5rem)] leading-[0.95]"
          style={{ fontFamily: "var(--font-oh-serif)", fontWeight: 600 }}
        >
          Less than you paid for{" "}
          <em className="italic text-[#7a36dd]">the last bouquet.</em>
        </h2>
        <a
          href="/client-keeper-crm"
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#3a2348] px-8 py-4 text-sm font-semibold text-[#faf5f8] transition hover:-translate-y-0.5 hover:bg-[#7a36dd]"
        >
          Try free for 30 days →
        </a>
        <p className="mt-4 text-[11px] uppercase tracking-[0.4em] text-[#6b8349]/80">
          $19/mo annual · $24/mo monthly · unlimited everything
        </p>
      </div>
    </section>
  );
}

function Sign() {
  return (
    <footer className="relative z-10 py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-6 md:flex-row md:items-center md:justify-between">
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
    </footer>
  );
}
