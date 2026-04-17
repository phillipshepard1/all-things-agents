import type { Metadata } from "next";
import Image from "next/image";
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
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-vh-serif",
});
const hand = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-vh-hand",
});
const dm = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-vh-sans",
});

export const metadata: Metadata = {
  title: "Client Keeper · The Violet Hour",
  description:
    `${TAGLINE}. MYRA handles data entry so your work is done by the time the sky turns violet.`,
};

const C = {
  bg: "#0a041d",
  surface: "#16092f",
  text: "#e8dcf5",
  cream: "#f6e5d6",
  peach: "#e8b6a5",
  violet: "#c49bff",
  gold: "#c49bff",
};

export default function VioletHourPage() {
  return (
    <main
      className={`${serif.variable} ${hand.variable} ${dm.variable} relative min-h-screen overflow-hidden text-[${C.text}]`}
      style={{
        background: C.bg,
        fontFamily: "var(--font-vh-sans), system-ui, sans-serif",
      }}
    >
      <Dusk />
      <Stars />
      <Nav />
      <Hero />
      <UsedBy />
      <Strikethrough />
      <Benediction />
      <Pillars />
      <Myra />
      <Benefits />
      <DetailFeatures />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Dawn />

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.25; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.25); }
        }
        .twinkle { animation: twinkle 3.2s ease-in-out infinite; }
      `}</style>
    </main>
  );
}

function Dusk() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        background:
          "linear-gradient(180deg, #0a041d 0%, #1c0a3e 35%, #4a1670 62%, #8b4a8d 82%, #e8b6a5 100%)",
      }}
    />
  );
}

function Stars() {
  const stars = Array.from({ length: 48 }, (_, i) => ({
    i,
    top: Math.random() * 62,
    left: Math.random() * 100,
    size: 1 + Math.random() * 2.5,
    delay: Math.random() * 3,
  }));
  return (
    <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
      {stars.map((s) => (
        <div
          key={s.i}
          className="twinkle absolute rounded-full bg-white/70 shadow-[0_0_6px_2px_rgba(255,255,255,0.35)]"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

const gradientGold = {
  background: `linear-gradient(120deg, ${C.cream} 0%, ${C.peach} 45%, ${C.violet} 100%)`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as React.CSSProperties;

const gradientBtn = {
  background: `linear-gradient(120deg, ${C.cream} 0%, ${C.peach} 45%, ${C.violet} 100%)`,
} as React.CSSProperties;

function Nav() {
  return (
    <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 pt-10">
      <div className="flex items-baseline gap-3">
        <div className="size-1.5 rounded-full bg-[#e8b6a5] shadow-[0_0_12px_3px_rgba(232,182,165,0.8)]" />
        <span
          className="text-2xl"
          style={{ fontFamily: "var(--font-vh-serif)", fontWeight: 600 }}
        >
          Client Keeper
        </span>
        <span className="text-[10px] uppercase tracking-[0.4em] text-[#e8b6a5]/80">
          The Violet Hour
        </span>
      </div>
      <a
        href="/client-keeper-crm"
        className="rounded-full border border-[#e8b6a5]/40 bg-white/5 px-5 py-2 text-[12px] text-[#f6e5d6] backdrop-blur-md transition hover:bg-white/10"
      >
        Start Free Trial
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-6 pt-16 pb-24 text-center md:pt-28">
      <span className="mb-8 inline-block text-[11px] uppercase tracking-[0.45em] text-[#e8b6a5]">
        {TAGLINE}
      </span>
      <h1
        className="mx-auto max-w-4xl text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.92] tracking-[-0.02em] text-[#f6e5d6]"
        style={{ fontFamily: "var(--font-vh-serif)", fontWeight: 500 }}
      >
        By the time the sky turns{" "}
        <em className="italic" style={gradientGold}>
          violet
        </em>
        , your work is done.
      </h1>
      <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-[#e8dcf5]/80 md:text-xl">
        Client Keeper is simple to use, with zero learning curve. MYRA — your
        AI assistant — handles data entry through voice and text so you stay
        organized, build better relationships, and close more deals without
        the overwhelm.
      </p>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
        <a
          href="/client-keeper-crm"
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-8 py-4 text-sm font-semibold text-[#160734] shadow-[0_20px_60px_-15px_rgba(232,182,165,0.7)] transition hover:-translate-y-0.5"
          style={gradientBtn}
        >
          <span>{PRICING.cta}</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
        <span
          className="text-2xl text-[#e8b6a5]"
          style={{ fontFamily: "var(--font-vh-hand)" }}
        >
          no card, no overwhelm
        </span>
      </div>

      <div className="mt-20 mx-auto max-w-xl">
        <div className="relative rounded-3xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl">
          <Image
            src="/ck-images/v5-violet-hour-window.jpg"
            alt="A study at dusk, violet sky through the window"
            width={1000}
            height={700}
            className="h-auto w-full rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function UsedBy() {
  return (
    <section className="relative z-10 border-y border-white/10 py-8 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-3 text-center text-[10px] uppercase tracking-[0.5em] text-[#e8b6a5]">
          Used by
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
          {USED_BY.map((n) => (
            <span
              key={n}
              className="text-[15px] italic text-[#e8dcf5]/75"
              style={{ fontFamily: "var(--font-vh-serif)" }}
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
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
      <p className="mb-4 text-[11px] uppercase tracking-[0.42em] text-[#e8b6a5]">
        On the way out
      </p>
      <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
        {STRIKETHROUGH.map((t) => (
          <span
            key={t}
            className="relative text-[clamp(1.4rem,3vw,2.2rem)] italic text-[#e8dcf5]/55"
            style={{ fontFamily: "var(--font-vh-serif)" }}
          >
            <span>{t}</span>
            <span className="absolute left-0 right-0 top-1/2 h-[2px] translate-y-[-1px] bg-[#e8b6a5]" />
          </span>
        ))}
        <span
          className="text-[clamp(1.4rem,3vw,2.2rem)]"
          style={{
            fontFamily: "var(--font-vh-serif)",
            fontWeight: 600,
            ...gradientGold,
          }}
        >
          Client Keeper.
        </span>
      </div>
    </section>
  );
}

function Benediction() {
  return (
    <section className="relative z-10 mx-auto max-w-4xl px-6 py-16 text-center">
      <blockquote
        className="text-[clamp(1.6rem,3.8vw,2.8rem)] leading-[1.2] text-[#f6e5d6]/90"
        style={{
          fontFamily: "var(--font-vh-serif)",
          fontStyle: "italic",
          fontWeight: 400,
        }}
      >
        &ldquo;Built by real estate agents, for real estate agents. Every
        feature is designed to help you succeed — without the tech
        overwhelm.&rdquo;
      </blockquote>
    </section>
  );
}

function Pillars() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10">
        <p className="text-[11px] uppercase tracking-[0.42em] text-[#e8b6a5]">
          The six quiet features
        </p>
        <h2
          className="mt-3 text-[clamp(2rem,5vw,3.6rem)] leading-[1]"
          style={{ fontFamily: "var(--font-vh-serif)", fontWeight: 500 }}
        >
          Everything you need.{" "}
          <em className="italic" style={gradientGold}>
            Nothing you don&apos;t.
          </em>
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES_6.map((x) => (
          <article
            key={x.title}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition hover:bg-white/[0.07]"
          >
            <div
              className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 blur-2xl transition group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(ellipse at top, rgba(232,182,165,0.3), transparent 60%)",
              }}
            />
            <h3
              className="mb-3 text-2xl text-[#f6e5d6]"
              style={{ fontFamily: "var(--font-vh-serif)", fontWeight: 500 }}
            >
              {x.title}
            </h3>
            <p className="text-[16px] leading-relaxed text-[#e8dcf5]/80">
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
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent p-8 backdrop-blur-xl md:p-14">
        <div className="grid items-start gap-10 md:grid-cols-[1fr,1fr]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.42em] text-[#e8b6a5]">
              {MYRA_INTRO.label}
            </span>
            <h2
              className="mt-4 text-[clamp(2.2rem,5vw,3.8rem)] leading-[1] text-[#f6e5d6]"
              style={{ fontFamily: "var(--font-vh-serif)", fontWeight: 500 }}
            >
              {MYRA_INTRO.title}.{" "}
              <em className="italic" style={gradientGold}>
                {MYRA_INTRO.tagline}.
              </em>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[#e8dcf5]/80">
              {MYRA_INTRO.body}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#16092f]/70 p-6">
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#e8b6a5]">
              Voice memo · {MYRA_VOICE_MEMO.duration}
            </p>
            <p
              className="mt-4 text-[22px] leading-snug text-[#f6e5d6]"
              style={{ fontFamily: "var(--font-vh-hand)" }}
            >
              &ldquo;{MYRA_VOICE_MEMO.quote}&rdquo;
            </p>
            <div className="mt-6 space-y-2 text-[14px] text-[#e8dcf5]">
              {MYRA_VOICE_MEMO.actions.map((a) => (
                <p key={a.k}>
                  → {a.k}: <strong>{a.v}</strong>
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {MYRA_JOBS.map((j) => (
            <div key={j.k} className="border-t border-white/15 pt-5">
              <h4
                className="text-xl text-[#f6e5d6]"
                style={{ fontFamily: "var(--font-vh-serif)", fontWeight: 500 }}
              >
                {j.k}
              </h4>
              <p className="mt-2 text-[15px] leading-relaxed text-[#e8dcf5]/75">
                {j.v}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-12 md:grid-cols-[1fr,1.1fr]">
        <div>
          <p className="text-[11px] uppercase tracking-[0.42em] text-[#e8b6a5]">
            Why Client Keeper
          </p>
          <h2
            className="mt-3 text-[clamp(2rem,4.5vw,3.6rem)] leading-[1]"
            style={{ fontFamily: "var(--font-vh-serif)", fontWeight: 500 }}
          >
            Keep more clients.{" "}
            <em className="italic" style={gradientGold}>
              Close more deals.
            </em>
          </h2>
          <ul className="mt-8 space-y-3">
            {BENEFITS_BULLETS.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 text-[16.5px] leading-snug text-[#e8dcf5]"
              >
                <span className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-[#e8b6a5]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {STATS.map((s) => (
            <div
              key={s.n}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md"
            >
              <p
                className="leading-none"
                style={{
                  fontFamily: "var(--font-vh-serif)",
                  fontSize: "clamp(2.4rem,5vw,3.5rem)",
                  fontWeight: 600,
                  ...gradientGold,
                }}
              >
                {s.n}
              </p>
              <p className="mt-3 text-[13px] uppercase tracking-[0.2em] text-[#e8dcf5]/80">
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
      <p className="text-center text-[11px] uppercase tracking-[0.42em] text-[#e8b6a5]">
        The long list
      </p>
      <h2
        className="mx-auto mt-4 max-w-3xl text-center text-[clamp(2rem,5vw,3.6rem)] leading-[1.05] text-[#f6e5d6]"
        style={{ fontFamily: "var(--font-vh-serif)", fontWeight: 500 }}
      >
        Built specifically for real estate agents.
      </h2>
      <div className="mt-14 grid gap-8 md:grid-cols-2">
        {DETAILED_FEATURES_4.map((b) => (
          <article
            key={b.t}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-md"
          >
            <h3
              className="text-2xl text-[#f6e5d6]"
              style={{ fontFamily: "var(--font-vh-serif)", fontWeight: 500 }}
            >
              {b.t}
            </h3>
            <p className="mt-3 text-[16px] leading-relaxed text-[#e8dcf5]/80">
              {b.b}
            </p>
            <ul className="mt-4 space-y-2 text-[15px] text-[#e8dcf5]/90">
              {b.bullets.map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <span className="mt-[8px] inline-block size-1 rounded-full bg-[#e8b6a5]" />
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
        <p className="text-center text-[11px] uppercase tracking-[0.42em] text-[#e8b6a5]">
          Loved by agents everywhere
        </p>
        <h2
          className="mx-auto mt-4 max-w-3xl text-center text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] text-[#f6e5d6]"
          style={{ fontFamily: "var(--font-vh-serif)", fontWeight: 500 }}
        >
          Don&apos;t just take our word.
        </h2>
        <div className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.n}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md"
            >
              <p
                className="text-[16.5px] italic leading-relaxed text-[#f6e5d6]"
                style={{ fontFamily: "var(--font-vh-serif)" }}
              >
                &ldquo;{t.q}&rdquo;
              </p>
              <figcaption className="mt-5 border-t border-white/10 pt-3">
                <p
                  className="text-xl text-[#e8b6a5]"
                  style={{ fontFamily: "var(--font-vh-hand)" }}
                >
                  {t.n}
                </p>
                <p className="text-[11px] uppercase tracking-[0.3em] text-[#e8dcf5]/65">
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

function Pricing() {
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-6 py-24 text-center">
      <p className="text-[11px] uppercase tracking-[0.45em] text-[#e8b6a5]">
        Simple, transparent pricing
      </p>
      <h2
        className="mt-6 text-[clamp(3rem,7vw,5.5rem)] leading-[0.95] text-[#f6e5d6]"
        style={{ fontFamily: "var(--font-vh-serif)", fontWeight: 500 }}
      >
        <em className="italic" style={gradientGold}>
          $19
        </em>{" "}
        a month, yours till sunrise.
      </h2>
      <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-[#e8dcf5]/80">
        $19/mo billed annually (20% off), or $24/mo billed monthly. Every plan
        includes MYRA AI, unlimited contacts, and full mobile access.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-[#e8b6a5]/40 bg-white/[0.05] p-8 text-left backdrop-blur-md">
          <div className="flex items-baseline justify-between">
            <span
              className="text-2xl text-[#f6e5d6]"
              style={{ fontFamily: "var(--font-vh-serif)", fontWeight: 500 }}
            >
              Yearly
            </span>
            <span
              className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#160734]"
              style={gradientBtn}
            >
              20% OFF
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span
              style={{
                fontFamily: "var(--font-vh-serif)",
                fontSize: "clamp(3rem,6vw,4.5rem)",
                fontWeight: 600,
                lineHeight: 1,
                ...gradientGold,
              }}
            >
              {PRICING.yearly.price}
            </span>
            <span className="text-[15px] text-[#e8dcf5]/70">{PRICING.yearly.suffix}</span>
            <span className="ml-2 text-[14px] line-through text-[#e8dcf5]/40">
              {PRICING.yearly.strikethrough}
            </span>
          </div>
          <p className="mt-1 text-[13px] text-[#e8dcf5]/70">
            {PRICING.yearly.note}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-left backdrop-blur-md">
          <span
            className="text-2xl text-[#f6e5d6]"
            style={{ fontFamily: "var(--font-vh-serif)", fontWeight: 500 }}
          >
            Monthly
          </span>
          <div className="mt-4 flex items-baseline gap-2">
            <span
              style={{
                fontFamily: "var(--font-vh-serif)",
                fontSize: "clamp(3rem,6vw,4.5rem)",
                fontWeight: 600,
                lineHeight: 1,
                color: "#f6e5d6",
              }}
            >
              {PRICING.monthly.price}
            </span>
            <span className="text-[15px] text-[#e8dcf5]/70">{PRICING.monthly.suffix}</span>
          </div>
          <p className="mt-1 text-[13px] text-[#e8dcf5]/70">
            {PRICING.monthly.note}
          </p>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-left backdrop-blur-md">
        <p className="text-[11px] uppercase tracking-[0.32em] text-[#e8b6a5]">
          Every plan includes
        </p>
        <ul className="mt-5 grid gap-3 text-[15px] text-[#e8dcf5] sm:grid-cols-2">
          {PRICING_INCLUDED.map((x) => (
            <li key={x} className="flex items-start gap-2">
              <span className="mt-[8px] inline-block size-1.5 shrink-0 rounded-full bg-[#e8b6a5]" />
              <span>{x}</span>
            </li>
          ))}
        </ul>
      </div>

      <a
        href="/client-keeper-crm"
        className="mt-10 inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-semibold text-[#160734] shadow-[0_20px_60px_-15px_rgba(232,182,165,0.6)] transition hover:-translate-y-0.5"
        style={gradientBtn}
      >
        Begin the 30-day trial →
      </a>
      <p className="mt-3 text-[11px] uppercase tracking-[0.32em] text-[#e8dcf5]/60">
        {PRICING.trust}
      </p>
      <p className="mt-1 text-[11px] uppercase tracking-[0.32em] text-[#e8b6a5]">
        {PRICING.guarantee}
      </p>
    </section>
  );
}

function FAQ() {
  return (
    <section className="relative z-10 mx-auto max-w-4xl px-6 py-24">
      <p className="text-center text-[11px] uppercase tracking-[0.42em] text-[#e8b6a5]">
        A few quiet questions
      </p>
      <h2
        className="mt-4 text-center text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] text-[#f6e5d6]"
        style={{ fontFamily: "var(--font-vh-serif)", fontWeight: 500 }}
      >
        Frequently asked.
      </h2>
      <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
        {FAQS.map((f) => (
          <details key={f.q} className="group py-6">
            <summary className="flex cursor-pointer items-baseline justify-between gap-6 list-none">
              <h3
                className="text-xl text-[#f6e5d6]"
                style={{ fontFamily: "var(--font-vh-serif)", fontWeight: 500 }}
              >
                {f.q}
              </h3>
              <span className="text-[#e8b6a5] transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-4 text-[16px] leading-relaxed text-[#e8dcf5]/80">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Dawn() {
  return (
    <footer className="relative z-10 mt-12 border-t border-white/10 bg-gradient-to-b from-transparent to-[#e8b6a5]/20 py-16 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] uppercase tracking-[0.42em] text-[#e8b6a5]">
            Start your free 30-day trial
          </p>
          <h3
            className="mt-4 text-[clamp(2rem,5vw,3.2rem)] leading-[1.05] text-[#f6e5d6]"
            style={{ fontFamily: "var(--font-vh-serif)", fontWeight: 500 }}
          >
            Join{" "}
            <em className="italic" style={gradientGold}>
              {AGENT_COUNT} agents
            </em>{" "}
            closing more deals with Client Keeper.
          </h3>
          <a
            href="/client-keeper-crm"
            className="mt-8 inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-semibold text-[#160734] transition hover:-translate-y-0.5"
            style={gradientBtn}
          >
            Start Free Trial →
          </a>
        </div>
        <div className="mt-12 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <p
            className="text-3xl italic text-[#f6e5d6]"
            style={{ fontFamily: "var(--font-vh-serif)" }}
          >
            Good night, and a good morning to come.
          </p>
          <p className="text-[11px] uppercase tracking-[0.45em] text-[#e8dcf5]/60">
            © MMXXVI · Violet Hour
          </p>
        </div>
      </div>
    </footer>
  );
}
