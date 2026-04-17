import type { Metadata } from "next";
import Image from "next/image";
import { Space_Mono, Caveat, DM_Serif_Display } from "next/font/google";
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
  description: `${TAGLINE}. A CRM that writes back on your behalf — MYRA AI.`,
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
      <UsedBy />
      <Strikethrough />
      <Postcards />
      <Stamp />
      <Myra />
      <Benefits />
      <DetailFeatures />
      <Testimonials />
      <Rate />
      <FAQ />
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
        Start Trial
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative z-10 mx-auto grid max-w-6xl gap-12 px-6 pt-14 pb-20 md:grid-cols-[1.05fr,0.95fr] md:pt-20">
      <div>
        <p className="mb-6 text-[11px] uppercase tracking-[0.5em] text-[#a83d67]">
          PAR AVION · {TAGLINE}
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
          Client Keeper is simple to use, with zero learning curve. MYRA —
          your AI assistant — handles data entry through voice and text so
          you stay organized, build better relationships, and close more
          deals without the overwhelm.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-5">
          <a
            href="/client-keeper-crm"
            className="group inline-flex items-center gap-3 rounded-sm bg-[#3a1a70] px-7 py-4 text-[12px] font-bold uppercase tracking-[0.28em] text-[#f4ead4] shadow-[0_14px_40px_-12px_rgba(58,26,112,0.5)] transition hover:-translate-y-0.5 hover:bg-[#a83d67]"
          >
            Start Free Trial · 30 days
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

function UsedBy() {
  return (
    <section className="relative z-10 border-y-2 border-dashed border-[#a83d67]/40 py-7">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-3 text-center text-[10px] uppercase tracking-[0.5em] text-[#a83d67]">
          Used by
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
          {USED_BY.map((n) => (
            <span
              key={n}
              className="text-[15px] italic text-[#2d1e42]/75"
              style={{ fontFamily: "var(--font-pc-display)" }}
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
      <p className="mb-4 text-[11px] uppercase tracking-[0.5em] text-[#a83d67]">
        ON THE WAY OUT
      </p>
      <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
        {STRIKETHROUGH.map((t) => (
          <span
            key={t}
            className="relative text-[clamp(1.4rem,3vw,2.2rem)] italic text-[#2d1e42]/55"
            style={{ fontFamily: "var(--font-pc-display)" }}
          >
            <span>{t}</span>
            <span className="absolute left-0 right-0 top-1/2 h-[2px] translate-y-[-1px] bg-[#a83d67]" />
          </span>
        ))}
        <span
          className="text-[clamp(1.4rem,3vw,2.2rem)] text-[#a83d67]"
          style={{ fontFamily: "var(--font-pc-display)" }}
        >
          Client Keeper.
        </span>
      </div>
    </section>
  );
}

function Postcards() {
  const cards = FEATURES_6.slice(0, 6).map((f, i) => ({
    to: f.title,
    body: f.body,
    stamp: ["3¢", "5¢", "2¢", "8¢", "1¢", "10¢"][i],
    rot: [-3, 2.5, -1.5, 3, -2, 1.5][i],
  }));
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
      <div className="mb-12 text-center">
        <p className="text-[11px] uppercase tracking-[0.45em] text-[#a83d67]">
          This week&apos;s correspondence
        </p>
        <h2
          className="mt-3 text-[clamp(2rem,5vw,3.6rem)] italic"
          style={{ fontFamily: "var(--font-pc-display)" }}
        >
          Six postcards. <span style={{ fontStyle: "normal" }}>One CRM.</span>
        </h2>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                  Feature:
                </span>
                <span className="rounded-sm border border-dashed border-[#3a1a70] bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#3a1a70]">
                  {c.stamp}
                </span>
              </div>
              <p
                className="text-[26px] italic text-[#2d1e42] leading-tight"
                style={{ fontFamily: "var(--font-pc-display)" }}
              >
                {c.to}
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-[#2d1e42]">
                {c.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Stamp() {
  const t = TESTIMONIALS[2];
  return (
    <section className="relative z-10 border-y-2 border-dashed border-[#a83d67]/40 bg-[#f4ead4]/80 py-20 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.5em] text-[#a83d67]">
          A note from an agent
        </p>
        <blockquote
          className="mx-auto mt-6 max-w-3xl text-[clamp(1.7rem,4vw,2.8rem)] italic leading-[1.2] text-[#2d1e42]"
          style={{ fontFamily: "var(--font-pc-display)" }}
        >
          &ldquo;{t.q}&rdquo;
        </blockquote>
        <p
          className="mt-6 text-2xl text-[#a83d67]"
          style={{ fontFamily: "var(--font-pc-hand)" }}
        >
          — {t.n}, {t.r}
        </p>
      </div>
    </section>
  );
}

function Myra() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-10 rounded-sm border-2 border-dashed border-[#a83d67]/40 bg-[#faf1da] p-10 md:grid-cols-[0.9fr,1.1fr] md:p-14">
        <div>
          <p className="text-[11px] uppercase tracking-[0.5em] text-[#a83d67]">
            {MYRA_INTRO.label}
          </p>
          <h2
            className="mt-4 text-[clamp(2rem,5vw,3.4rem)] leading-[1] italic"
            style={{ fontFamily: "var(--font-pc-display)" }}
          >
            {MYRA_INTRO.title}. {MYRA_INTRO.tagline}.
          </h2>
          <p className="mt-5 text-[15px] leading-[1.75] text-[#2d1e42]">
            {MYRA_INTRO.body}
          </p>
        </div>
        <div className="rounded-sm border border-[#2d1e42]/30 bg-white p-6">
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#a83d67]">
            Voice memo · {MYRA_VOICE_MEMO.duration}
          </p>
          <p
            className="mt-4 text-[22px] italic leading-snug text-[#2d1e42]"
            style={{ fontFamily: "var(--font-pc-hand)" }}
          >
            &ldquo;{MYRA_VOICE_MEMO.quote}&rdquo;
          </p>
          <div className="mt-5 space-y-1 text-[13px] text-[#2d1e42]">
            {MYRA_VOICE_MEMO.actions.map((a) => (
              <p key={a.k}>→ {a.k}: <strong>{a.v}</strong></p>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {MYRA_JOBS.map((j) => (
          <div key={j.k} className="border-t border-dashed border-[#a83d67]/40 pt-4">
            <h4
              className="text-xl italic text-[#2d1e42]"
              style={{ fontFamily: "var(--font-pc-display)" }}
            >
              {j.k}
            </h4>
            <p className="mt-2 text-[14px] leading-relaxed text-[#2d1e42]/90">
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
    <section className="relative z-10 border-y-2 border-dashed border-[#a83d67]/40 bg-[#faf1da] py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1fr,1.1fr]">
        <div>
          <p className="text-[11px] uppercase tracking-[0.5em] text-[#a83d67]">
            Why Client Keeper
          </p>
          <h2
            className="mt-3 text-[clamp(2rem,4.5vw,3.4rem)] italic leading-[1]"
            style={{ fontFamily: "var(--font-pc-display)" }}
          >
            Keep more clients. <span style={{ fontStyle: "normal" }} className="text-[#a83d67]">Close more deals.</span>
          </h2>
          <ul className="mt-8 space-y-3">
            {BENEFITS_BULLETS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[15.5px] leading-snug text-[#2d1e42]">
                <span className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-[#a83d67]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {STATS.map((s) => (
            <div key={s.n} className="rounded-sm border-2 border-dashed border-[#a83d67]/40 bg-white p-6">
              <p
                className="text-[#a83d67] leading-none"
                style={{
                  fontFamily: "var(--font-pc-display)",
                  fontStyle: "italic",
                  fontSize: "clamp(2.4rem,5vw,3.5rem)",
                }}
              >
                {s.n}
              </p>
              <p className="mt-3 text-[12px] uppercase tracking-[0.3em] text-[#2d1e42]/80">
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
      <p className="text-center text-[11px] uppercase tracking-[0.5em] text-[#a83d67]">
        In the envelope
      </p>
      <h2
        className="mx-auto mt-4 max-w-3xl text-center text-[clamp(2rem,5vw,3.6rem)] leading-[1.05] italic"
        style={{ fontFamily: "var(--font-pc-display)" }}
      >
        Everything you need. <span style={{ fontStyle: "normal" }}>Nothing you don&apos;t.</span>
      </h2>
      <div className="mt-14 grid gap-10 md:grid-cols-2">
        {DETAILED_FEATURES_4.map((b) => (
          <article
            key={b.t}
            className="rounded-sm border-2 border-dashed border-[#a83d67]/40 bg-[#faf1da] p-8"
          >
            <h3
              className="text-2xl italic text-[#2d1e42]"
              style={{ fontFamily: "var(--font-pc-display)" }}
            >
              {b.t}
            </h3>
            <p className="mt-3 text-[15.5px] leading-relaxed text-[#2d1e42]">
              {b.b}
            </p>
            <ul className="mt-4 space-y-2 text-[14.5px] text-[#2d1e42]">
              {b.bullets.map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <span className="mt-[8px] inline-block size-1 rounded-full bg-[#a83d67]" />
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
    <section className="relative z-10 border-y-2 border-dashed border-[#a83d67]/40 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-[11px] uppercase tracking-[0.5em] text-[#a83d67]">
          Loved by agents everywhere
        </p>
        <h2
          className="mx-auto mt-4 max-w-3xl text-center text-[clamp(2rem,5vw,3.4rem)] italic"
          style={{ fontFamily: "var(--font-pc-display)" }}
        >
          Don&apos;t just take our word.
        </h2>
        <div className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={t.n}
              className="rounded-sm border border-[#2d1e42]/30 bg-[#faf1da] p-6"
              style={{ transform: `rotate(${[-1.5, 2, -0.5, 1.5, -2, 0.5][i] ?? 0}deg)` }}
            >
              <p
                className="text-[15.5px] italic leading-relaxed text-[#2d1e42]"
                style={{ fontFamily: "var(--font-pc-display)" }}
              >
                &ldquo;{t.q}&rdquo;
              </p>
              <figcaption className="mt-5 border-t border-dashed border-[#a83d67]/40 pt-3">
                <p
                  className="text-xl text-[#a83d67]"
                  style={{ fontFamily: "var(--font-pc-hand)" }}
                >
                  {t.n}
                </p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#2d1e42]/70">
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
        a month.
      </h2>
      <p className="mx-auto mt-6 max-w-lg text-[15.5px] leading-relaxed text-[#2d1e42]">
        $19/mo billed annually (20% off), or $24/mo billed monthly. Every plan
        includes MYRA AI, unlimited contacts, and full mobile access.
      </p>
      <div className="mt-10 rounded-sm border-2 border-dashed border-[#a83d67]/40 bg-[#faf1da] p-8 text-left">
        <p className="text-[11px] uppercase tracking-[0.5em] text-[#a83d67]">
          Every plan includes
        </p>
        <ul className="mt-5 grid gap-3 text-[14.5px] text-[#2d1e42] sm:grid-cols-2">
          {PRICING_INCLUDED.map((x) => (
            <li key={x} className="flex items-start gap-2">
              <span className="mt-[8px] inline-block size-1.5 shrink-0 rounded-full bg-[#a83d67]" />
              <span>{x}</span>
            </li>
          ))}
        </ul>
      </div>
      <a
        href="/client-keeper-crm"
        className="mt-10 inline-flex items-center gap-3 rounded-sm bg-[#3a1a70] px-8 py-4 text-[12px] font-bold uppercase tracking-[0.3em] text-[#f4ead4] transition hover:-translate-y-0.5 hover:bg-[#a83d67]"
      >
        START FREE TRIAL · 30 DAYS
      </a>
      <p className="mt-4 text-[10px] uppercase tracking-[0.5em] text-[#a83d67]">
        {PRICING.trust}
      </p>
      <p className="mt-1 text-[10px] uppercase tracking-[0.5em] text-[#3a1a70]">
        {PRICING.guarantee}
      </p>
    </section>
  );
}

function FAQ() {
  return (
    <section className="relative z-10 mx-auto max-w-4xl px-6 py-24">
      <p className="text-center text-[11px] uppercase tracking-[0.5em] text-[#a83d67]">
        FREQUENTLY ASKED
      </p>
      <h2
        className="mt-4 text-center text-[clamp(2rem,5vw,3.4rem)] italic"
        style={{ fontFamily: "var(--font-pc-display)" }}
      >
        Questions, answered.
      </h2>
      <div className="mt-12 divide-y divide-dashed divide-[#a83d67]/40 border-y-2 border-dashed border-[#a83d67]/40">
        {FAQS.map((f) => (
          <details key={f.q} className="group py-6">
            <summary className="flex cursor-pointer items-baseline justify-between gap-6 list-none">
              <h3
                className="text-xl italic text-[#2d1e42]"
                style={{ fontFamily: "var(--font-pc-display)" }}
              >
                {f.q}
              </h3>
              <span className="text-[#a83d67] transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-4 text-[15px] leading-relaxed text-[#2d1e42]">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Return() {
  return (
    <footer className="relative z-10 border-t-2 border-dashed border-[#a83d67]/40 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#a83d67]">
            RETURN ADDRESS
          </p>
          <h3
            className="mt-4 text-[clamp(2rem,5vw,3.2rem)] leading-[1.05] italic"
            style={{ fontFamily: "var(--font-pc-display)" }}
          >
            Join <span style={{ fontStyle: "normal" }} className="text-[#a83d67]">{AGENT_COUNT} agents</span> closing more deals.
          </h3>
          <a
            href="/client-keeper-crm"
            className="mt-8 inline-flex items-center gap-3 rounded-sm bg-[#3a1a70] px-8 py-4 text-[12px] font-bold uppercase tracking-[0.3em] text-[#f4ead4] transition hover:-translate-y-0.5 hover:bg-[#a83d67]"
          >
            {PRICING.cta}
          </a>
        </div>
        <div className="mt-12 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <p
            className="text-2xl italic text-[#a83d67]"
            style={{ fontFamily: "var(--font-pc-display)" }}
          >
            — write soon, Client Keeper
          </p>
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#a83d67]/80">
            © MMXXVI · POSTCARD EDITION
          </p>
        </div>
      </div>
    </footer>
  );
}
