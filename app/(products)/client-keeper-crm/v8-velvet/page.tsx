import type { Metadata } from "next";
import Image from "next/image";
import { Playfair_Display, Cormorant_Garamond, DM_Sans } from "next/font/google";
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

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-velvet-display",
});
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-velvet-serif",
});
const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-velvet-sans",
});

export const metadata: Metadata = {
  title: "Client Keeper · Velvet",
  description: `${TAGLINE}. The luxury CRM for real estate agents.`,
};

const gold = {
  background:
    "linear-gradient(130deg, #e6c88a 0%, #f5deb3 50%, #c89841 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as React.CSSProperties;

const goldBg = {
  background:
    "linear-gradient(130deg, #e6c88a 0%, #f5deb3 50%, #c89841 100%)",
} as React.CSSProperties;

export default function VelvetPage() {
  return (
    <main
      className={`${display.variable} ${serif.variable} ${sans.variable} relative min-h-screen overflow-hidden bg-[#12051f] text-[#ecdcee]`}
      style={{ fontFamily: "var(--font-velvet-sans), system-ui, sans-serif" }}
    >
      <VelvetBg />
      <Marble />
      <Nav />
      <Hero />
      <UsedBy />
      <DropCap />
      <Strikethrough />
      <Three />
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

function VelvetBg() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 -z-20"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(195,137,217,0.2), transparent 55%), radial-gradient(ellipse at bottom left, rgba(80,28,110,0.4), transparent 60%), #12051f",
        }}
      />
      <svg className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-[0.1]">
        <filter id="velvet-noise">
          <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="1" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 0.6   0 0 0 0 0.35   0 0 0 0 0.75   0 0 0 1 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#velvet-noise)" />
      </svg>
    </>
  );
}

function Marble() {
  return (
    <svg className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-full w-full opacity-[0.08]">
      <defs>
        <filter id="marble">
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.05" numOctaves="3" seed="3" />
          <feColorMatrix values="0 0 0 0 0.9   0 0 0 0 0.82   0 0 0 0 0.7   0 0 0 1 0" />
        </filter>
      </defs>
      <rect width="100%" height="100%" filter="url(#marble)" />
    </svg>
  );
}

function Nav() {
  return (
    <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 pt-10">
      <div className="flex items-baseline gap-3">
        <span
          className="text-2xl"
          style={{
            fontFamily: "var(--font-velvet-display)",
            fontWeight: 700,
            ...gold,
          }}
        >
          Client Keeper
        </span>
        <span className="text-[10px] uppercase tracking-[0.45em] text-[#c89841]">
          Velvet
        </span>
      </div>
      <a
        href="/client-keeper-crm"
        className="rounded-sm border border-[#c89841]/50 px-5 py-2 text-[11px] uppercase tracking-[0.3em] text-[#f5deb3] transition hover:border-[#c89841] hover:bg-[#c89841]/10"
      >
        Start Free Trial
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-6 pt-14 pb-24 md:grid-cols-[1.1fr,0.9fr] md:pt-20 md:pb-32">
      <div>
        <p className="mb-8 flex items-center gap-4 text-[11px] uppercase tracking-[0.5em] text-[#c89841]">
          <span className="h-px w-10 bg-[#c89841]" />
          <span>{TAGLINE}</span>
        </p>
        <h1
          className="text-[clamp(3rem,8.5vw,7.2rem)] leading-[0.9] tracking-[-0.015em]"
          style={{ fontFamily: "var(--font-velvet-display)", fontWeight: 600 }}
        >
          A CRM,{" "}
          <em className="italic" style={gold}>
            made of better things.
          </em>
        </h1>
        <p className="mt-8 max-w-lg text-lg leading-relaxed text-[#d6c2d9]">
          Client Keeper is simple to use, with zero learning curve. MYRA —
          your AI assistant — handles data entry through voice and text so
          you stay organized, build better relationships, and close more
          deals without the overwhelm.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-5">
          <a
            href="/client-keeper-crm"
            className="group relative inline-flex items-center gap-3 rounded-sm px-8 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#12051f] shadow-[0_20px_50px_-15px_rgba(198,152,65,0.6)] transition hover:-translate-y-0.5"
            style={goldBg}
          >
            Start Free Trial
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <span
            className="text-lg italic text-[#c89841]"
            style={{ fontFamily: "var(--font-velvet-serif)" }}
          >
            no card required · 30 days free
          </span>
        </div>
      </div>
      <div className="relative">
        <div className="absolute -inset-6 rounded-[24px] bg-[#c89841]/10 blur-3xl" />
        <div className="relative overflow-hidden rounded-[20px] border border-[#c89841]/30 shadow-[0_40px_80px_-30px_rgba(198,152,65,0.5)]">
          <Image
            src="/ck-images/v8-velvet-marble.jpg"
            alt="Luxury still life with velvet pouch, pearls, brass key"
            width={900}
            height={1100}
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
    <section className="relative z-10 border-y border-[#c89841]/20 py-7">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-3 text-center text-[10px] uppercase tracking-[0.5em] text-[#c89841]">
          Used by
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
          {USED_BY.map((n) => (
            <span
              key={n}
              className="text-[15px] italic text-[#d6c2d9]/80"
              style={{ fontFamily: "var(--font-velvet-serif)" }}
            >
              {n}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function DropCap() {
  return (
    <section className="relative z-10 mx-auto max-w-3xl px-6 py-24">
      <article className="text-[19px] leading-[1.7] text-[#e6dde9]">
        <span
          className="float-left mr-4 mt-1 text-[6.5rem] leading-[0.8]"
          style={{
            fontFamily: "var(--font-velvet-display)",
            fontStyle: "italic",
            fontWeight: 900,
            ...gold,
          }}
        >
          R
        </span>
        eal estate software is, for most agents, a permanent embarrassment.
        Cluttered dashboards. Tiers you&apos;ll never use. Interfaces you wouldn&apos;t
        let a client see over your shoulder. Client Keeper is the quiet
        rebuttal. Built specifically for real estate agents — not adapted
        from a generic CRM — it handles data entry through MYRA, our voice
        and text AI, and automates follow-ups so you can stop missing
        birthdays, anniversaries, and closing dates. One fair price. No tiers.
      </article>
    </section>
  );
}

function Strikethrough() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 pb-10">
      <p className="mb-4 text-[11px] uppercase tracking-[0.42em] text-[#c89841]">
        On the way out
      </p>
      <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
        {STRIKETHROUGH.map((t) => (
          <span
            key={t}
            className="relative text-[clamp(1.4rem,3vw,2.2rem)] italic text-[#d6c2d9]/55"
            style={{ fontFamily: "var(--font-velvet-display)" }}
          >
            <span>{t}</span>
            <span className="absolute left-0 right-0 top-1/2 h-[2px] translate-y-[-1px] bg-[#c89841]" />
          </span>
        ))}
        <span
          className="text-[clamp(1.4rem,3vw,2.2rem)]"
          style={{ fontFamily: "var(--font-velvet-display)", fontWeight: 700, ...gold }}
        >
          Client Keeper.
        </span>
      </div>
    </section>
  );
}

function Three() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
      <h2
        className="mb-12 text-[clamp(2.2rem,5vw,3.8rem)] leading-[1]"
        style={{ fontFamily: "var(--font-velvet-display)", fontWeight: 700 }}
      >
        The six <em className="italic" style={gold}>ornaments</em>.
      </h2>
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES_6.map((p, i) => (
          <article
            key={p.title}
            className="relative rounded-[4px] border border-[#c89841]/25 bg-white/[0.03] p-8 backdrop-blur-md transition hover:border-[#c89841]/60"
          >
            <p
              className="mb-4 text-[#c89841]"
              style={{
                fontFamily: "var(--font-velvet-display)",
                fontSize: "1.6rem",
                fontStyle: "italic",
                lineHeight: 1,
              }}
            >
              {toRoman(i + 1)}.
            </p>
            <h3
              className="mb-3 text-2xl text-[#ecdcee]"
              style={{ fontFamily: "var(--font-velvet-display)", fontWeight: 600 }}
            >
              {p.title}
            </h3>
            <p className="text-[15.5px] leading-relaxed text-[#d6c2d9]">
              {p.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function toRoman(n: number) {
  const r = ["i", "ii", "iii", "iv", "v", "vi"];
  return r[n - 1] ?? String(n);
}

function Myra() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-10 rounded-sm border border-[#c89841]/25 bg-white/[0.03] p-10 backdrop-blur-md md:grid-cols-[0.9fr,1.1fr] md:p-14">
        <div>
          <p className="text-[11px] uppercase tracking-[0.42em] text-[#c89841]">
            {MYRA_INTRO.label}
          </p>
          <h2
            className="mt-4 text-[clamp(2rem,5vw,3.6rem)] leading-[1]"
            style={{ fontFamily: "var(--font-velvet-display)", fontWeight: 600 }}
          >
            {MYRA_INTRO.title}.
            <br />
            <em className="italic" style={gold}>
              {MYRA_INTRO.tagline}.
            </em>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#d6c2d9]">
            {MYRA_INTRO.body}
          </p>
        </div>
        <div className="rounded-sm border border-[#c89841]/30 bg-[#190824] p-6">
          <p className="text-[11px] uppercase tracking-[0.42em] text-[#c89841]">
            Voice memo · {MYRA_VOICE_MEMO.duration}
          </p>
          <p
            className="mt-4 text-[22px] italic leading-snug text-[#ecdcee]"
            style={{ fontFamily: "var(--font-velvet-display)" }}
          >
            &ldquo;{MYRA_VOICE_MEMO.quote}&rdquo;
          </p>
          <div className="mt-5 space-y-1.5 text-[14px] text-[#d6c2d9]">
            {MYRA_VOICE_MEMO.actions.map((a) => (
              <p key={a.k}>→ {a.k}: <strong>{a.v}</strong></p>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {MYRA_JOBS.map((j) => (
          <div key={j.k} className="border-t border-[#c89841]/20 pt-4">
            <h4
              className="text-xl text-[#ecdcee]"
              style={{ fontFamily: "var(--font-velvet-display)", fontWeight: 600 }}
            >
              {j.k}
            </h4>
            <p className="mt-2 text-[15px] leading-relaxed text-[#d6c2d9]">
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
    <section className="relative z-10 border-y border-[#c89841]/20 bg-gradient-to-b from-[#1a0a2a] to-[#12051f] py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1fr,1.1fr]">
        <div>
          <p className="text-[11px] uppercase tracking-[0.42em] text-[#c89841]">
            Why Client Keeper
          </p>
          <h2
            className="mt-3 text-[clamp(2rem,4.5vw,3.6rem)] leading-[1]"
            style={{ fontFamily: "var(--font-velvet-display)", fontWeight: 700 }}
          >
            Keep more clients.{" "}
            <em className="italic" style={gold}>
              Close more deals.
            </em>
          </h2>
          <ul className="mt-8 space-y-3">
            {BENEFITS_BULLETS.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 text-[16.5px] leading-snug text-[#ecdcee]"
              >
                <span className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-[#c89841]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {STATS.map((s) => (
            <div
              key={s.n}
              className="rounded-sm border border-[#c89841]/30 bg-white/[0.03] p-6 backdrop-blur-md"
            >
              <p
                className="leading-none"
                style={{
                  fontFamily: "var(--font-velvet-display)",
                  fontSize: "clamp(2.4rem,5vw,3.5rem)",
                  fontWeight: 700,
                  ...gold,
                }}
              >
                {s.n}
              </p>
              <p className="mt-3 text-[13px] uppercase tracking-[0.2em] text-[#d6c2d9]">
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
      <p className="text-center text-[11px] uppercase tracking-[0.42em] text-[#c89841]">
        The long list
      </p>
      <h2
        className="mx-auto mt-4 max-w-3xl text-center text-[clamp(2rem,5vw,3.6rem)] leading-[1.05]"
        style={{ fontFamily: "var(--font-velvet-display)", fontWeight: 700 }}
      >
        Everything you need.{" "}
        <em className="italic" style={gold}>
          Nothing you don&apos;t.
        </em>
      </h2>
      <div className="mt-14 grid gap-10 md:grid-cols-2">
        {DETAILED_FEATURES_4.map((b) => (
          <article
            key={b.t}
            className="rounded-sm border border-[#c89841]/25 bg-white/[0.03] p-8 backdrop-blur-md"
          >
            <h3
              className="text-2xl text-[#ecdcee]"
              style={{ fontFamily: "var(--font-velvet-display)", fontWeight: 700 }}
            >
              {b.t}
            </h3>
            <p className="mt-3 text-[16px] leading-relaxed text-[#d6c2d9]">
              {b.b}
            </p>
            <ul className="mt-4 space-y-2 text-[15px] text-[#ecdcee]">
              {b.bullets.map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <span className="mt-[8px] inline-block size-1 rounded-full bg-[#c89841]" />
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
    <section className="relative z-10 border-y border-[#c89841]/20 bg-[#0e0418] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-[11px] uppercase tracking-[0.42em] text-[#c89841]">
          Loved by agents everywhere
        </p>
        <h2
          className="mx-auto mt-4 max-w-3xl text-center text-[clamp(2rem,5vw,3.4rem)] leading-[1.05]"
          style={{ fontFamily: "var(--font-velvet-display)", fontWeight: 700 }}
        >
          Don&apos;t just take our word.
        </h2>
        <div className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.n} className="border-t border-[#c89841]/20 pt-6">
              <p
                className="text-[17px] italic leading-relaxed text-[#ecdcee]"
                style={{ fontFamily: "var(--font-velvet-display)" }}
              >
                &ldquo;{t.q}&rdquo;
              </p>
              <figcaption className="mt-4">
                <p
                  className="text-lg italic"
                  style={{ fontFamily: "var(--font-velvet-serif)", ...gold }}
                >
                  {t.n}
                </p>
                <p className="text-[11px] uppercase tracking-[0.3em] text-[#d6c2d9]/70">
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
    <section className="relative z-10 bg-gradient-to-b from-[#12051f] to-[#1a0a2a] py-28">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-center text-[11px] uppercase tracking-[0.45em] text-[#c89841]">
          The whole price
        </p>
        <h2
          className="mt-6 text-center text-[clamp(3.2rem,8vw,6.5rem)] leading-[0.9]"
          style={{ fontFamily: "var(--font-velvet-display)", fontWeight: 700 }}
        >
          <em className="italic" style={gold}>$19</em> a month.
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-center text-lg leading-relaxed text-[#d6c2d9]">
          Billed annually (20% off). Or $24/mo monthly. 30 days free, no card
          on file.
        </p>

        <div className="mt-12 rounded-sm border border-[#c89841]/30 bg-white/[0.03] p-8 backdrop-blur-md">
          <p className="text-[11px] uppercase tracking-[0.42em] text-[#c89841]">
            Every plan includes
          </p>
          <ul className="mt-5 grid gap-3 text-[15px] text-[#ecdcee] sm:grid-cols-2">
            {PRICING_INCLUDED.map((x) => (
              <li key={x} className="flex items-start gap-2">
                <span className="mt-[8px] inline-block size-1.5 shrink-0 rounded-full bg-[#c89841]" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 text-center">
          <a
            href="/client-keeper-crm"
            className="inline-flex items-center gap-3 rounded-sm px-9 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#12051f] transition hover:-translate-y-0.5"
            style={goldBg}
          >
            Start Free Trial
          </a>
          <p className="mt-4 text-[10px] uppercase tracking-[0.42em] text-[#d6c2d9]/70">
            {PRICING.trust}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.42em] text-[#c89841]">
            {PRICING.guarantee}
          </p>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="relative z-10 mx-auto max-w-4xl px-6 py-24">
      <p className="text-center text-[11px] uppercase tracking-[0.42em] text-[#c89841]">
        A few questions
      </p>
      <h2
        className="mt-4 text-center text-[clamp(2rem,5vw,3.4rem)] leading-[1.05]"
        style={{ fontFamily: "var(--font-velvet-display)", fontWeight: 700 }}
      >
        Frequently asked.
      </h2>
      <div className="mt-12 divide-y divide-[#c89841]/20 border-y border-[#c89841]/20">
        {FAQS.map((f) => (
          <details key={f.q} className="group py-6">
            <summary className="flex cursor-pointer items-baseline justify-between gap-6 list-none">
              <h3
                className="text-xl text-[#ecdcee]"
                style={{ fontFamily: "var(--font-velvet-display)", fontWeight: 700 }}
              >
                {f.q}
              </h3>
              <span className="text-[#c89841] transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-4 text-[16px] leading-relaxed text-[#d6c2d9]">
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
          <p className="text-[11px] uppercase tracking-[0.42em] text-[#c89841]">
            Start your free 30-day trial
          </p>
          <h3
            className="mt-4 text-[clamp(2rem,5vw,3.2rem)] leading-[1.05]"
            style={{ fontFamily: "var(--font-velvet-display)", fontWeight: 700 }}
          >
            Join <em className="italic" style={gold}>{AGENT_COUNT} agents</em>{" "}
            closing more deals with Client Keeper.
          </h3>
          <a
            href="/client-keeper-crm"
            className="mt-8 inline-flex items-center gap-3 rounded-sm px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#12051f] transition hover:-translate-y-0.5"
            style={goldBg}
          >
            Start Free Trial
          </a>
        </div>
        <div className="mt-12 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <p
            className="text-[22px] italic text-[#c89841]"
            style={{ fontFamily: "var(--font-velvet-serif)" }}
          >
            Made for the long career.
          </p>
          <p className="text-[10px] uppercase tracking-[0.45em] text-[#d6c2d9]/70">
            © MMXXVI · Velvet Edition
          </p>
        </div>
      </div>
    </footer>
  );
}
