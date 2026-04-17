import type { Metadata } from "next";
import Image from "next/image";
import { Space_Mono, Caveat, DM_Serif_Display } from "next/font/google";

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pc-mono",
});
const hand = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-pc-hand",
});
const display = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-pc-display",
});

export const metadata: Metadata = {
  title: "Client Keeper · Postcard",
  description:
    "A CRM that writes back. Real estate, by correspondence. $19/mo. 30 days free.",
};

export default function PostcardPage() {
  return (
    <main
      className={`${mono.variable} ${hand.variable} ${display.variable} relative min-h-screen bg-[#f4ead4] text-[#2d1e42]`}
      style={{ fontFamily: "var(--font-pc-mono), ui-monospace, monospace" }}
    >
      <PaperBg />
      <AirmailBorder />
      <Nav />
      <Hero />
      <Postcards />
      <Stamp />
      <Myra />
      <Rate />
      <Return />
    </main>
  );
}

function PaperBg() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(240,185,145,0.35), transparent 55%), radial-gradient(ellipse at bottom left, rgba(122,54,221,0.15), transparent 60%)",
        }}
      />
      <svg className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-[0.08]">
        <filter id="pc-paper">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#pc-paper)" />
      </svg>
    </>
  );
}

function AirmailBorder() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-2 z-50 rounded-sm border-[6px]"
      style={{
        borderImage:
          "repeating-linear-gradient(45deg, #3a1a70 0 14px, #f4ead4 14px 28px, #a83d67 28px 42px, #f4ead4 42px 56px) 6 stretch",
      }}
    />
  );
}

function Nav() {
  return (
    <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 pt-12">
      <div className="flex items-baseline gap-3">
        <span
          className="text-3xl"
          style={{ fontFamily: "var(--font-pc-display)", fontStyle: "italic" }}
        >
          Client Keeper
        </span>
        <span className="text-[10px] uppercase tracking-[0.5em] text-[#a83d67]">
          Postcard
        </span>
      </div>
      <a
        href="/client-keeper-crm"
        className="rounded-sm bg-[#3a1a70] px-5 py-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#f4ead4] transition hover:bg-[#a83d67]"
      >
        Reply
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative z-10 mx-auto grid max-w-6xl gap-12 px-6 pt-14 pb-20 md:grid-cols-[1.05fr,0.95fr] md:pt-20">
      <div>
        <p className="mb-6 text-[11px] uppercase tracking-[0.5em] text-[#a83d67]">
          PAR AVION · VIA AIR MAIL · MMXXVI
        </p>
        <h1
          className="text-[clamp(3rem,8.5vw,7rem)] leading-[0.92] tracking-[-0.01em]"
          style={{ fontFamily: "var(--font-pc-display)", fontStyle: "italic" }}
        >
          A CRM that{" "}
          <span style={{ fontStyle: "normal" }}>writes</span>
          <br />
          <em className="italic text-[#a83d67]">back.</em>
        </h1>
        <p className="mt-8 max-w-lg text-[15px] leading-[1.85] text-[#2d1e42]">
          Real estate, at heart, is a long correspondence. Client Keeper
          treats every relationship like a stack of postcards — dated, signed,
          and quietly kept, so no one is ever forgotten.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-5">
          <a
            href="/client-keeper-crm"
            className="group inline-flex items-center gap-3 rounded-sm bg-[#3a1a70] px-7 py-4 text-[12px] font-bold uppercase tracking-[0.28em] text-[#f4ead4] shadow-[0_14px_40px_-12px_rgba(58,26,112,0.5)] transition hover:-translate-y-0.5 hover:bg-[#a83d67]"
          >
            Post your first card (free 30 days)
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <span
            className="text-[28px] text-[#a83d67]"
            style={{ fontFamily: "var(--font-pc-hand)" }}
          >
            no stamps required.
          </span>
        </div>
      </div>
      <div className="relative">
        <div className="relative rotate-[-2deg] overflow-hidden rounded-sm border-[6px] border-[#f4ead4] shadow-[0_30px_60px_-20px_rgba(45,30,66,0.5)]">
          <Image
            src="/ck-images/v12-postcard-stack.jpg"
            alt="Vintage airmail postcards tied with a ribbon"
            width={1000}
            height={1100}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
        <div className="absolute -left-6 -top-6 rotate-[-12deg] rounded-sm border-4 border-dashed border-[#a83d67] bg-[#f4ead4] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#3a1a70]">
          DELIVERED
        </div>
      </div>
    </section>
  );
}

function Postcards() {
  const cards = [
    {
      to: "Susan M.",
      body: "Happy birthday — the porch at 12 Oak is still yours in my mind.",
      stamp: "3¢",
      rot: -3,
    },
    {
      to: "The Andersons",
      body: "Three Chapel Hill comps, just like you asked. Basements aren't the theme of our lives.",
      stamp: "5¢",
      rot: 2.5,
    },
    {
      to: "J. Cooper",
      body: "One year since your first showing. How's the house treating you?",
      stamp: "2¢",
      rot: -1.5,
    },
  ];
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-20">
      <div className="mb-12 text-center">
        <p className="text-[11px] uppercase tracking-[0.45em] text-[#a83d67]">
          The week&apos;s correspondence
        </p>
        <h2
          className="mt-3 text-[clamp(2rem,5vw,3.6rem)] italic"
          style={{ fontFamily: "var(--font-pc-display)" }}
        >
          Three cards, sent this morning.
        </h2>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {cards.map((c) => (
          <article
            key={c.to}
            className="relative overflow-hidden rounded-sm border border-[#2d1e42]/30 bg-[#faf1da] p-6 shadow-[0_18px_40px_-20px_rgba(45,30,66,0.4)]"
            style={{ transform: `rotate(${c.rot}deg)` }}
          >
            <div
              aria-hidden
              className="absolute inset-0 -z-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, transparent 0, transparent 26px, #a83d67 26px, #a83d67 27px)",
                backgroundSize: "100% 27px",
              }}
            />
            <div className="relative z-10">
              <div className="mb-3 flex items-start justify-between gap-3">
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#a83d67]">
                  To:
                </span>
                <span className="rounded-sm border border-dashed border-[#3a1a70] bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#3a1a70]">
                  {c.stamp}
                </span>
              </div>
              <p
                className="text-3xl italic text-[#2d1e42]"
                style={{ fontFamily: "var(--font-pc-display)" }}
              >
                {c.to}
              </p>
              <p
                className="mt-4 text-[18px] leading-relaxed text-[#2d1e42]"
                style={{ fontFamily: "var(--font-pc-hand)" }}
              >
                {c.body}
              </p>
              <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-[#a83d67]">
                — Delivered by Myra on your behalf
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Stamp() {
  return (
    <section className="relative z-10 border-y-2 border-dashed border-[#a83d67]/40 bg-[#f4ead4]/80 py-20 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.45em] text-[#a83d67]">
          In the envelope
        </p>
        <h2
          className="mx-auto mt-4 max-w-3xl text-[clamp(2rem,5vw,3.4rem)] leading-[1.1]"
          style={{ fontFamily: "var(--font-pc-display)", fontStyle: "italic" }}
        >
          Every feature of a modern CRM — sent in a{" "}
          <span style={{ fontStyle: "normal" }}>quieter</span> envelope.
        </h2>
        <div className="mx-auto mt-10 grid max-w-3xl gap-4 text-left md:grid-cols-2">
          {[
            "Voice notes to Myra, transcribed into client records",
            "Birthday, anniversary, and first-showing reminders",
            "One unified pipeline from first call to closing",
            "Mac, iPhone, and Android — offline-friendly",
          ].map((t) => (
            <div
              key={t}
              className="flex items-start gap-3 border-b border-dotted border-[#2d1e42]/30 py-3"
            >
              <span className="text-[#a83d67]">●</span>
              <span className="text-[15px] leading-snug text-[#2d1e42]">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Myra() {
  return (
    <section className="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center">
      <blockquote
        className="text-[clamp(1.7rem,4vw,2.8rem)] leading-[1.2] text-[#2d1e42]"
        style={{ fontFamily: "var(--font-pc-display)", fontStyle: "italic" }}
      >
        &ldquo;Myra is the first assistant I&apos;ve had who writes the
        follow-up before I&apos;ve remembered I needed one.&rdquo;
      </blockquote>
      <p
        className="mt-6 text-2xl text-[#a83d67]"
        style={{ fontFamily: "var(--font-pc-hand)" }}
      >
        — Joan T., Sarasota
      </p>
    </section>
  );
}

function Rate() {
  return (
    <section className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
      <p className="text-[11px] uppercase tracking-[0.5em] text-[#a83d67]">
        POSTAGE
      </p>
      <h2
        className="mt-6 text-[clamp(3rem,7vw,5.5rem)] leading-[0.95] italic"
        style={{ fontFamily: "var(--font-pc-display)" }}
      >
        <span style={{ fontStyle: "normal" }} className="text-[#a83d67]">
          $19
        </span>{" "}
        a month. Worth a letter.
      </h2>
      <a
        href="/client-keeper-crm"
        className="mt-10 inline-flex items-center gap-3 rounded-sm bg-[#3a1a70] px-8 py-4 text-[12px] font-bold uppercase tracking-[0.3em] text-[#f4ead4] transition hover:-translate-y-0.5 hover:bg-[#a83d67]"
      >
        TRY FREE · 30 DAYS
      </a>
    </section>
  );
}

function Return() {
  return (
    <footer className="relative z-10 border-t border-[#2d1e42]/20 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-6 md:flex-row md:items-center md:justify-between">
        <p
          className="text-2xl italic text-[#a83d67]"
          style={{ fontFamily: "var(--font-pc-display)" }}
        >
          — write soon, Client Keeper
        </p>
        <p className="text-[10px] uppercase tracking-[0.5em] text-[#a83d67]/80">
          RETURN TO · MMXXVI · POSTCARD EDITION
        </p>
      </div>
    </footer>
  );
}
