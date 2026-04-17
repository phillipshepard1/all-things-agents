"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Fraunces, Caveat, DM_Sans } from "next/font/google";

const serif = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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

export default function OpenHousePage() {
  return (
    <main
      className={`${serif.variable} ${hand.variable} ${sans.variable} relative min-h-screen bg-[#faf1e4] text-[#2d1f10]`}
      style={{ fontFamily: "var(--font-oh-sans), system-ui, sans-serif" }}
    >
      <title>Client Keeper · Open House</title>
      <WarmBg />
      <Nav />
      <Hero />
      <Polaroids />
      <Welcome />
      <Myra />
      <Rate />
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
          style={{ fontFamily: "var(--font-oh-serif)", fontWeight: 700 }}
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
        Please come in
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative z-10 mx-auto grid max-w-6xl gap-10 px-6 pt-16 pb-20 md:grid-cols-[1.05fr,0.95fr] md:pt-24">
      <div>
        <p className="mb-7 text-[11px] uppercase tracking-[0.4em] text-[#7a36dd]">
          A CRM that sets the table
        </p>
        <h1
          className="text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.015em]"
          style={{ fontFamily: "var(--font-oh-serif)", fontWeight: 600 }}
        >
          Every client,{" "}
          <em className="italic text-[#7a36dd]">welcomed</em>
          <br />
          like you&apos;re hosting
          <br />
          a good{" "}
          <em className="italic text-[#c89841]">open house.</em>
        </h1>
        <p className="mt-8 max-w-lg text-lg leading-relaxed text-[#4a3320]">
          Client Keeper is a warm, photo-first CRM for real estate agents who
          treat every relationship like the first five minutes of an open
          house — a cup of coffee, a remembered name, a small thoughtful
          detail.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-5">
          <a
            href="/client-keeper-crm"
            className="group inline-flex items-center gap-3 rounded-full bg-[#3a1f55] px-7 py-4 text-sm font-semibold text-[#faf1e4] shadow-[0_14px_40px_-12px_rgba(58,31,85,0.5)] transition hover:-translate-y-0.5 hover:bg-[#7a36dd]"
          >
            Come inside (free 30 days)
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <span
            className="text-[28px] text-[#7a36dd]"
            style={{ fontFamily: "var(--font-oh-hand)" }}
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

function Polaroids() {
  const cards = [
    {
      name: "Susan M.",
      note: "loves the porch. birthday Mar 14.",
      tint: "#ffcd7a",
      rot: -5,
    },
    {
      name: "The Andersons",
      note: "kitchen yes · basement no",
      tint: "#e8b6a5",
      rot: 3.5,
    },
    {
      name: "J. Cooper",
      note: "first showing was one year ago. call?",
      tint: "#c49bff",
      rot: -2.5,
    },
    {
      name: "Priscilla D.",
      note: "Maple Ridge · closing fri",
      tint: "#f8d7e9",
      rot: 4.5,
    },
  ];

  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setOn(true); },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative z-10 mx-auto max-w-6xl px-6 py-20"
    >
      <div className="mb-12 text-center">
        <p className="text-[11px] uppercase tracking-[0.42em] text-[#7a36dd]">
          Your guest list · this week
        </p>
        <h2
          className="mt-3 text-[clamp(2rem,5vw,3.6rem)]"
          style={{ fontFamily: "var(--font-oh-serif)", fontWeight: 700 }}
        >
          Faces you should{" "}
          <em className="italic text-[#7a36dd]">remember to remember.</em>
        </h2>
      </div>
      <div className="flex flex-wrap items-start justify-center gap-8">
        {cards.map((c, i) => (
          <div
            key={c.name}
            className="relative w-64 shrink-0 rounded-[4px] bg-white p-3 shadow-[0_20px_40px_-18px_rgba(45,31,16,0.45)]"
            style={{
              transform: on
                ? `rotate(${c.rot}deg) translateY(0)`
                : "rotate(0deg) translateY(40px)",
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
              style={{ fontFamily: "var(--font-oh-hand)" }}
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
  return (
    <section className="relative z-10 border-y border-[#2d1f10]/15 bg-[#f5e4cc] py-20">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.42em] text-[#7a36dd]">
          Why it works
        </p>
        <h2
          className="mx-auto mt-4 max-w-3xl text-[clamp(2rem,5vw,3.6rem)] leading-[1.05]"
          style={{ fontFamily: "var(--font-oh-serif)", fontWeight: 700 }}
        >
          A CRM built around{" "}
          <em className="italic text-[#7a36dd]">hospitality</em>, not
          spreadsheets.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#4a3320]">
          Client Keeper assumes you already know how to be a good agent. It
          just wants to make sure nothing slips between showings, closings,
          and the small kind things you&apos;d do if you weren&apos;t so
          busy.
        </p>
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
            Meet Myra
          </p>
          <h2
            className="mt-4 text-[clamp(2rem,5vw,3.4rem)] leading-[1]"
            style={{ fontFamily: "var(--font-oh-serif)", fontWeight: 700 }}
          >
            She&apos;s already at the door.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#4a3320]">
            Talk into your phone on the way back to the car. Myra writes the
            client note, tags the good details, sets the follow-up, and
            quietly ends the call.
          </p>
        </div>
        <div className="rounded-2xl border border-[#2d1f10]/10 bg-[#faf1e4] p-6">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#7a36dd]">
            Voice memo · 0:39
          </p>
          <p
            className="mt-4 text-[22px] leading-snug italic text-[#2d1f10]"
            style={{ fontFamily: "var(--font-oh-hand)" }}
          >
            &ldquo;Left the Patel open house on Forest Ridge. They loved the
            bay window, wife brought her mother this time. Anniversary next
            month — send a card and a Zillow-match alert for anything
            Craftsman.&rdquo;
          </p>
          <div className="mt-5 space-y-1.5 text-[14px] text-[#4a3320]">
            <p>→ Note added: <strong>Patel, N. &amp; R.</strong></p>
            <p>→ Tag: <em>bay windows / Craftsman</em></p>
            <p>→ Anniversary reminder set</p>
            <p>→ Card queued on morning page</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Rate() {
  return (
    <section className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
      <p className="text-[11px] uppercase tracking-[0.42em] text-[#7a36dd]">
        A fair price for a kind tool
      </p>
      <h2
        className="mt-6 text-[clamp(3rem,7vw,5.5rem)] leading-[0.95]"
        style={{ fontFamily: "var(--font-oh-serif)", fontWeight: 700 }}
      >
        <em className="italic text-[#7a36dd]">$19</em> a month.
        <br />
        All platforms, all features.
      </h2>
      <a
        href="/client-keeper-crm"
        className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#3a1f55] px-8 py-4 text-sm font-semibold text-[#faf1e4] transition hover:-translate-y-0.5 hover:bg-[#7a36dd]"
      >
        Try free for 30 days →
      </a>
    </section>
  );
}

function Sign() {
  return (
    <footer className="relative z-10 border-t border-[#2d1f10]/10 py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-6 md:flex-row md:items-center md:justify-between">
        <p
          className="text-2xl italic text-[#7a36dd]"
          style={{ fontFamily: "var(--font-oh-hand)" }}
        >
          — please, come back often
        </p>
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#7a36dd]">
          © MMXXVI · Client Keeper · Open House
        </p>
      </div>
    </footer>
  );
}
