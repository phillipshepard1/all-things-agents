"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Newsreader, Caveat, DM_Sans } from "next/font/google";

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
      <Journal />
      <Three />
      <Myra />
      <Rate />
      <Sign />
      <style>{`
        @keyframes inkFlow {
          0% { stroke-dashoffset: 300; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes checkIn {
          0% { stroke-dashoffset: 40; }
          100% { stroke-dashoffset: 0; }
        }
        .ink-line {
          stroke-dasharray: 300;
          animation: inkFlow 1.4s ease-out forwards;
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
        Try 30 days free
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative z-10 mx-auto grid max-w-6xl gap-10 px-6 pt-16 pb-20 md:grid-cols-[1.1fr,0.9fr] md:pt-24">
      <div>
        <p className="mb-7 text-[11px] uppercase tracking-[0.4em] text-[#8a5614]">
          A CRM that wakes up with you
        </p>
        <h1
          className="text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.015em]"
          style={{ fontFamily: "var(--font-mr-serif)", fontWeight: 500 }}
        >
          Begin the day with one{" "}
          <em className="italic text-[#7a36dd]">calm page.</em>
        </h1>
        <p className="mt-8 max-w-lg text-lg leading-relaxed text-[#4a3320]">
          Client Keeper turns the chaos of a working real-estate day into a
          handwritten-feeling list of ten small, kind things. The follow-ups
          you forgot. The birthdays you should mark. The deal you&apos;ll close
          if you just remember to call back.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-5">
          <a
            href="/client-keeper-crm"
            className="group inline-flex items-center gap-3 rounded-full bg-[#2d1f10] px-7 py-4 text-sm font-semibold text-[#fbf2e3] shadow-[0_14px_40px_-12px_rgba(45,31,16,0.6)] transition hover:-translate-y-0.5 hover:bg-[#3d0d6a]"
          >
            Pour the coffee
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

function Journal() {
  const items = [
    { t: "Call Susan M. — birthday Thursday", done: true },
    { t: "Send the Andersons the Chapel Hill comps" },
    { t: "Follow up: Cooper (first-showing anniversary)" },
    { t: "Draft reply to Priscilla re: Maple Ridge", done: true },
    { t: "Water the office plant (truly)" },
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
    <section
      ref={ref}
      className="relative z-10 mx-auto max-w-4xl px-6 py-20"
    >
      <p className="mb-6 text-center text-[11px] uppercase tracking-[0.4em] text-[#8a5614]">
        The morning page · auto-written
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
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                className="mt-[2px] shrink-0"
              >
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
  const items = [
    {
      k: "Talk to Myra",
      v: "Speak into your phone after a showing. She writes the client note, tags the details, and sets the follow-up — all before you pull into the driveway.",
    },
    {
      k: "One page of work",
      v: "Every morning, a single calm list: who needs a call, who turns a year older, which deal quietly moved to the next stage.",
    },
    {
      k: "Everything remembered",
      v: "Birthdays, anniversaries, first-showings, inspection windows, closing dates — all waiting for you, never shouting.",
    },
  ];
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-20">
      <h2
        className="mb-14 text-[clamp(2rem,5vw,3.5rem)] leading-[1]"
        style={{ fontFamily: "var(--font-mr-serif)", fontWeight: 600 }}
      >
        Three things,
        <br />
        <em className="italic text-[#7a36dd]">done the slow way.</em>
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {items.map((x, i) => (
          <article
            key={x.k}
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
              style={{
                fontFamily: "var(--font-mr-serif)",
                fontWeight: 600,
              }}
            >
              {x.k}
            </h3>
            <p className="text-[16px] leading-relaxed text-[#4a3320]">{x.v}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Myra() {
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-6 py-20 text-center">
      <p className="text-[11px] uppercase tracking-[0.4em] text-[#8a5614]">
        About Myra
      </p>
      <h2
        className="mx-auto mt-4 max-w-3xl text-[clamp(2rem,5vw,3.8rem)] leading-[1.05]"
        style={{ fontFamily: "var(--font-mr-serif)", fontWeight: 500 }}
      >
        She listens like someone who&apos;s{" "}
        <em className="italic text-[#7a36dd]">been doing this a while.</em>
      </h2>
      <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#4a3320]">
        Myra is a real-estate-native AI. Tap the microphone, narrate your
        client interaction in plain English, and she&apos;ll update the contact,
        log the note, and set a follow-up — with the context an experienced
        assistant would know to preserve.
      </p>
    </section>
  );
}

function Rate() {
  return (
    <section className="relative z-10 border-y border-[#2d1f10]/15 bg-[#f5e7cc] py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.42em] text-[#8a5614]">
          A fair price
        </p>
        <h2
          className="mt-4 text-[clamp(3rem,7vw,5.5rem)] leading-[0.95]"
          style={{ fontFamily: "var(--font-mr-serif)", fontWeight: 600 }}
        >
          <em className="italic text-[#7a36dd]">$19</em> a month.
          <br />
          That&apos;s the whole story.
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-[17px] leading-relaxed text-[#4a3320]">
          Unlimited clients. Unlimited deals. Myra included. All platforms.
          Paid annually. No tiers, no pop-up trials.
        </p>
        <a
          href="/client-keeper-crm"
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#2d1f10] px-8 py-4 text-sm font-semibold text-[#fbf2e3] transition hover:-translate-y-0.5 hover:bg-[#3d0d6a]"
        >
          Begin your first morning →
        </a>
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
          style={{ fontFamily: "var(--font-mr-hand)" }}
        >
          — with warm regards, Client Keeper
        </p>
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#8a5614]/80">
          © MMXXVI · Morning Ritual Edition
        </p>
      </div>
    </footer>
  );
}
