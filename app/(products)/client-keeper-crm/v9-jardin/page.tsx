import type { Metadata } from "next";
import Image from "next/image";
import { DM_Serif_Display, Caveat, DM_Sans } from "next/font/google";
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

const display = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-jardin-display",
});
const hand = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jardin-hand",
});
const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jardin-sans",
});

export const metadata: Metadata = {
  title: "Client Keeper · Le Jardin",
  description: `${TAGLINE}. MYRA, your AI assistant, keeps the soft side of real estate running.`,
};

export default function JardinPage() {
  return (
    <main
      className={`${display.variable} ${hand.variable} ${sans.variable} relative min-h-screen overflow-hidden bg-[#efe7f0] text-[#3a1f55]`}
      style={{ fontFamily: "var(--font-jardin-sans), system-ui, sans-serif" }}
    >
      <LinenBg />
      <Nav />
      <Hero />
      <UsedBy />
      <Strikethrough />
      <Menu />
      <SixFeatures />
      <Myra />
      <Benefits />
      <DetailFeatures />
      <Testimonials />
      <Rate />
      <FAQ />
      <Close />
    </main>
  );
}

function LinenBg() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, #f6eef5 0%, #e9dcef 55%, #d8c5e4 100%)",
        }}
      />
      <svg className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-[0.05]">
        <filter id="jardin-linen">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#jardin-linen)" />
      </svg>
    </>
  );
}

function Nav() {
  return (
    <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 pt-10">
      <div className="flex items-baseline gap-3">
        <span
          className="text-3xl tracking-tight text-[#3a1f55]"
          style={{ fontFamily: "var(--font-jardin-display)", fontStyle: "italic" }}
        >
          Client Keeper
        </span>
        <span className="text-[11px] uppercase tracking-[0.4em] text-[#7a5290]">
          Le Jardin
        </span>
      </div>
      <a
        href="/client-keeper-crm"
        className="rounded-full bg-[#3a1f55] px-5 py-2 text-[12px] text-[#efe7f0] transition hover:bg-[#7a36dd]"
      >
        Start Free Trial
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-6 pt-20 pb-24 text-center md:pt-28">
      <p className="mb-7 text-[11px] uppercase tracking-[0.45em] text-[#7a5290]">
        {TAGLINE}
      </p>
      <h1
        className="mx-auto max-w-4xl text-[clamp(3rem,9vw,7.5rem)] leading-[0.9] tracking-[-0.01em]"
        style={{ fontFamily: "var(--font-jardin-display)" }}
      >
        The softer{" "}
        <em className="italic text-[#7a36dd]">side</em> of the
        <br />
        real-estate business.
      </h1>
      <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-[#5a3d72]">
        Client Keeper is simple to use, with zero learning curve. MYRA — your
        AI assistant — handles data entry through voice and text so you stay
        organized, build better relationships, and close more deals without
        the overwhelm.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
        <a
          href="/client-keeper-crm"
          className="group inline-flex items-center gap-3 rounded-full bg-[#3a1f55] px-8 py-4 text-sm font-semibold text-[#efe7f0] shadow-[0_14px_40px_-12px_rgba(58,31,85,0.5)] transition hover:-translate-y-0.5 hover:bg-[#7a36dd]"
        >
          {PRICING.cta}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
        <span
          className="text-[28px] italic text-[#7a36dd]"
          style={{ fontFamily: "var(--font-jardin-hand)" }}
        >
          sans carte de crédit
        </span>
      </div>
      <div className="mx-auto mt-20 max-w-4xl">
        <div className="relative overflow-hidden rounded-2xl border border-[#3a1f55]/15 shadow-[0_40px_80px_-40px_rgba(58,31,85,0.45)]">
          <Image
            src="/ck-images/v9-jardin-lavender.jpg"
            alt="Lavender fields at dusk, Provence"
            width={1400}
            height={860}
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
    <section className="relative z-10 border-y border-[#3a1f55]/15 py-7">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-3 text-center text-[10px] uppercase tracking-[0.5em] text-[#7a5290]">
          Used by
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
          {USED_BY.map((n) => (
            <span
              key={n}
              className="text-[15px] italic text-[#3a1f55]/75"
              style={{ fontFamily: "var(--font-jardin-display)" }}
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
      <p className="mb-4 text-[11px] uppercase tracking-[0.42em] text-[#7a5290]">
        On the way out
      </p>
      <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
        {STRIKETHROUGH.map((t) => (
          <span
            key={t}
            className="relative text-[clamp(1.4rem,3vw,2.2rem)] italic text-[#3a1f55]/55"
            style={{ fontFamily: "var(--font-jardin-display)" }}
          >
            <span>{t}</span>
            <span className="absolute left-0 right-0 top-1/2 h-[2px] translate-y-[-1px] bg-[#7a36dd]" />
          </span>
        ))}
        <span
          className="text-[clamp(1.4rem,3vw,2.2rem)] text-[#7a36dd]"
          style={{ fontFamily: "var(--font-jardin-display)" }}
        >
          Client Keeper.
        </span>
      </div>
    </section>
  );
}

function Menu() {
  const items = [
    { k: "Entrée", v: "Every client, every lead, every relationship in one organized place." },
    { k: "Plat", v: "Every deal tracked from listing to closing — a visual pipeline." },
    { k: "Dessert", v: "MYRA, your voice-first AI — the quiet luxury of the meal." },
    { k: "Digestif", v: "A morning list of who to call, who turns a year older." },
  ];
  return (
    <section className="relative z-10 border-y border-[#3a1f55]/15 bg-[#efe7f0]/60 py-20 backdrop-blur-sm">
      <div className="mx-auto max-w-4xl px-6">
        <p className="mb-4 text-center text-[11px] uppercase tracking-[0.4em] text-[#7a5290]">
          Le menu du jour
        </p>
        <h2
          className="mb-12 text-center text-[clamp(2rem,5vw,3.6rem)]"
          style={{ fontFamily: "var(--font-jardin-display)" }}
        >
          Four courses, <em className="italic text-[#7a36dd]">simply served.</em>
        </h2>
        <ul className="mx-auto max-w-2xl space-y-6">
          {items.map((x) => (
            <li key={x.k} className="grid grid-cols-[1fr_auto_3fr] items-baseline gap-4">
              <span
                className="text-2xl italic text-[#7a36dd]"
                style={{ fontFamily: "var(--font-jardin-display)" }}
              >
                {x.k}
              </span>
              <span className="border-b border-dotted border-[#3a1f55]/30" />
              <span className="text-[17px] leading-relaxed text-[#3a1f55]">
                {x.v}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SixFeatures() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10">
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#7a5290]">
          Les six fonctions
        </p>
        <h2
          className="mt-3 text-[clamp(2rem,5vw,3.4rem)]"
          style={{ fontFamily: "var(--font-jardin-display)" }}
        >
          Everything you need. <em className="italic text-[#7a36dd]">Nothing you don&apos;t.</em>
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES_6.map((x, i) => (
          <article
            key={x.title}
            className="rounded-3xl border border-[#3a1f55]/15 bg-white/70 p-8 backdrop-blur-sm"
          >
            <p
              className="mb-3 text-[#7a36dd]"
              style={{
                fontFamily: "var(--font-jardin-display)",
                fontSize: "1.2rem",
                fontStyle: "italic",
              }}
            >
              No. {String(i + 1).padStart(2, "0")}
            </p>
            <h3
              className="mb-3 text-xl text-[#3a1f55]"
              style={{ fontFamily: "var(--font-jardin-display)" }}
            >
              {x.title}
            </h3>
            <p className="text-[15.5px] leading-relaxed text-[#5a3d72]">
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
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-10 rounded-3xl bg-white/60 p-10 backdrop-blur-md md:grid-cols-[1fr,1fr] md:p-14">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#7a5290]">
            {MYRA_INTRO.label}
          </p>
          <h2
            className="mt-3 text-[clamp(2rem,5vw,3.4rem)] leading-[1]"
            style={{ fontFamily: "var(--font-jardin-display)" }}
          >
            {MYRA_INTRO.title}.
            <br />
            <em className="italic text-[#7a36dd]">{MYRA_INTRO.tagline}.</em>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#5a3d72]">
            {MYRA_INTRO.body}
          </p>
        </div>
        <div className="rounded-2xl border border-[#3a1f55]/15 bg-[#efe7f0] p-6">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#7a36dd]">
            Carnet · {MYRA_VOICE_MEMO.duration}
          </p>
          <p
            className="mt-4 text-[22px] leading-snug italic text-[#3a1f55]"
            style={{ fontFamily: "var(--font-jardin-hand)" }}
          >
            &ldquo;{MYRA_VOICE_MEMO.quote}&rdquo;
          </p>
          <div className="mt-5 text-[14px] text-[#5a3d72]">
            {MYRA_VOICE_MEMO.actions.map((a) => (
              <p key={a.k}>→ {a.k}: <strong>{a.v}</strong></p>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {MYRA_JOBS.map((j) => (
          <div key={j.k} className="border-t border-[#3a1f55]/15 pt-4">
            <h4
              className="text-xl italic text-[#3a1f55]"
              style={{ fontFamily: "var(--font-jardin-display)" }}
            >
              {j.k}
            </h4>
            <p className="mt-2 text-[15px] leading-relaxed text-[#5a3d72]">
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
    <section className="relative z-10 border-y border-[#3a1f55]/15 bg-[#efe7f0]/60 py-20 backdrop-blur-sm">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1fr,1.1fr]">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#7a5290]">
            Pourquoi Client Keeper
          </p>
          <h2
            className="mt-3 text-[clamp(2rem,4.5vw,3.4rem)] leading-[1]"
            style={{ fontFamily: "var(--font-jardin-display)" }}
          >
            Keep more clients. <em className="italic text-[#7a36dd]">Close more deals.</em>
          </h2>
          <ul className="mt-8 space-y-3">
            {BENEFITS_BULLETS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[16.5px] leading-snug text-[#3a1f55]">
                <span className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-[#7a36dd]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {STATS.map((s) => (
            <div key={s.n} className="rounded-2xl border border-[#3a1f55]/15 bg-white p-6">
              <p
                className="text-[#7a36dd] leading-none"
                style={{
                  fontFamily: "var(--font-jardin-display)",
                  fontSize: "clamp(2.4rem,5vw,3.5rem)",
                }}
              >
                {s.n}
              </p>
              <p className="mt-3 text-[13px] uppercase tracking-[0.2em] text-[#5a3d72]/80">
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
      <p className="text-center text-[11px] uppercase tracking-[0.4em] text-[#7a5290]">
        La carte
      </p>
      <h2
        className="mx-auto mt-4 max-w-3xl text-center text-[clamp(2rem,5vw,3.6rem)] leading-[1.05]"
        style={{ fontFamily: "var(--font-jardin-display)" }}
      >
        Built for real estate agents. <em className="italic text-[#7a36dd]">Not adapted.</em>
      </h2>
      <div className="mt-14 grid gap-10 md:grid-cols-2">
        {DETAILED_FEATURES_4.map((b) => (
          <article key={b.t} className="rounded-2xl border border-[#3a1f55]/15 bg-white/80 p-8">
            <h3
              className="text-2xl italic text-[#3a1f55]"
              style={{ fontFamily: "var(--font-jardin-display)" }}
            >
              {b.t}
            </h3>
            <p className="mt-3 text-[16px] leading-relaxed text-[#5a3d72]">
              {b.b}
            </p>
            <ul className="mt-4 space-y-2 text-[15px] text-[#3a1f55]">
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
      <p className="text-center text-[11px] uppercase tracking-[0.4em] text-[#7a5290]">
        Loved by agents everywhere
      </p>
      <h2
        className="mx-auto mt-4 max-w-3xl text-center text-[clamp(2rem,5vw,3.4rem)] leading-[1.05]"
        style={{ fontFamily: "var(--font-jardin-display)" }}
      >
        Don&apos;t just take our word.
      </h2>
      <div className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure key={t.n} className="rounded-2xl border border-[#3a1f55]/15 bg-white/80 p-6">
            <p
              className="text-[16.5px] italic leading-relaxed text-[#3a1f55]"
              style={{ fontFamily: "var(--font-jardin-display)" }}
            >
              &ldquo;{t.q}&rdquo;
            </p>
            <figcaption className="mt-5 border-t border-[#3a1f55]/15 pt-3">
              <p
                className="text-xl text-[#7a36dd]"
                style={{ fontFamily: "var(--font-jardin-hand)" }}
              >
                {t.n}
              </p>
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#5a3d72]/70">
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
    <section className="relative z-10 border-y border-[#3a1f55]/15 bg-[#e9dcef] py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.45em] text-[#7a36dd]">
          L&apos;addition
        </p>
        <h2
          className="mt-6 text-[clamp(3rem,7vw,5.5rem)] leading-[1]"
          style={{ fontFamily: "var(--font-jardin-display)" }}
        >
          <em className="italic text-[#7a36dd]">$19</em> /mois. C&apos;est tout.
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-[#5a3d72]">
          $19/mo billed annually (20% off), or $24/mo billed monthly. Every plan
          includes MYRA AI, unlimited contacts, and full mobile access.
        </p>
        <div className="mt-10 rounded-2xl border border-[#3a1f55]/15 bg-white p-8 text-left">
          <p className="text-[11px] uppercase tracking-[0.32em] text-[#7a36dd]">
            Every plan includes
          </p>
          <ul className="mt-5 grid gap-3 text-[15px] text-[#3a1f55] sm:grid-cols-2">
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
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#3a1f55] px-8 py-4 text-sm font-semibold text-[#efe7f0] transition hover:-translate-y-0.5 hover:bg-[#7a36dd]"
        >
          {PRICING.cta}
        </a>
        <p className="mt-4 text-[11px] uppercase tracking-[0.32em] text-[#7a5290]/90">
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
      <p className="text-center text-[11px] uppercase tracking-[0.4em] text-[#7a5290]">
        Questions fréquentes
      </p>
      <h2
        className="mt-4 text-center text-[clamp(2rem,5vw,3.4rem)] leading-[1.05]"
        style={{ fontFamily: "var(--font-jardin-display)" }}
      >
        Frequently asked.
      </h2>
      <div className="mt-12 divide-y divide-[#3a1f55]/15 border-y border-[#3a1f55]/15">
        {FAQS.map((f) => (
          <details key={f.q} className="group py-6">
            <summary className="flex cursor-pointer items-baseline justify-between gap-6 list-none">
              <h3
                className="text-xl italic text-[#3a1f55]"
                style={{ fontFamily: "var(--font-jardin-display)" }}
              >
                {f.q}
              </h3>
              <span className="text-[#7a36dd] transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-4 text-[16px] leading-relaxed text-[#5a3d72]">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Close() {
  return (
    <footer className="relative z-10 border-t border-[#3a1f55]/15 py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#7a5290]">
            Start your free 30-day trial
          </p>
          <h3
            className="mt-4 text-[clamp(2rem,5vw,3.2rem)] leading-[1.05]"
            style={{ fontFamily: "var(--font-jardin-display)" }}
          >
            Join <em className="italic text-[#7a36dd]">{AGENT_COUNT} agents</em>{" "}
            closing more deals with Client Keeper.
          </h3>
          <a
            href="/client-keeper-crm"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#3a1f55] px-8 py-4 text-sm font-semibold text-[#efe7f0] transition hover:-translate-y-0.5 hover:bg-[#7a36dd]"
          >
            {PRICING.cta}
          </a>
        </div>
        <div className="mt-12 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <p
            className="text-2xl italic text-[#7a36dd]"
            style={{ fontFamily: "var(--font-jardin-hand)" }}
          >
            — à bientôt, Client Keeper
          </p>
          <p className="text-[11px] uppercase tracking-[0.42em] text-[#7a5290]">
            © MMXXVI · Le Jardin
          </p>
        </div>
      </div>
    </footer>
  );
}
