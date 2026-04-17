import type { Metadata } from "next";
import Image from "next/image";
import { Cormorant_Garamond, Dancing_Script, DM_Sans } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-concierge-serif",
});
const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-concierge-hand",
});
const dm = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-concierge-sans",
});

export const metadata: Metadata = {
  title: "Client Keeper · The Concierge",
  description:
    "A boutique-hotel CRM for real estate agents. Every client, remembered. Every detail, attended to.",
};

export default function ConciergePage() {
  return (
    <main
      className={`${cormorant.variable} ${dancing.variable} ${dm.variable} relative min-h-screen bg-[#1a0929] text-[#f4e9d8]`}
      style={{ fontFamily: "var(--font-concierge-sans), system-ui, sans-serif" }}
    >
      <GoldGlow />
      <Nav />
      <Hero />
      <Ledger />
      <GuestBook />
      <Services />
      <Rate />
      <Closing />
    </main>
  );
}

function GoldGlow() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(200,152,65,0.14), transparent 55%), radial-gradient(ellipse at bottom, rgba(122,54,221,0.22), transparent 60%)",
        }}
      />
      <svg className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-[0.06]">
        <filter id="concierge-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#concierge-grain)" />
      </svg>
    </>
  );
}

function Nav() {
  return (
    <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 pt-10">
      <div className="flex items-baseline gap-4">
        <span className="text-[11px] uppercase tracking-[0.5em] text-[#c89841]">EST. MMXXIV</span>
        <span
          className="text-2xl text-[#f4e9d8]"
          style={{ fontFamily: "var(--font-concierge-serif)", fontWeight: 500 }}
        >
          Client Keeper
        </span>
      </div>
      <a
        href="/client-keeper-crm"
        className="rounded-sm border border-[#c89841]/60 px-5 py-2 text-[11px] uppercase tracking-[0.3em] text-[#c89841] transition hover:bg-[#c89841] hover:text-[#1a0929]"
      >
        Reserve your trial
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-6 pt-20 pb-24 md:grid-cols-[1.05fr,0.95fr]">
      <div>
        <div className="mb-8 flex items-center gap-4">
          <span className="h-[1px] w-10 bg-[#c89841]" />
          <span className="text-[11px] uppercase tracking-[0.42em] text-[#c89841]">
            The Real Estate CRM · Concierge Edition
          </span>
        </div>
        <h1
          className="text-[clamp(3rem,7.5vw,6rem)] leading-[0.95] tracking-[-0.01em]"
          style={{ fontFamily: "var(--font-concierge-serif)", fontWeight: 400 }}
        >
          Welcome. We&apos;ve been{" "}
          <em
            className="italic text-[#c89841]"
            style={{ fontFamily: "var(--font-concierge-serif)" }}
          >
            expecting
          </em>
          <br />
          your clients.
        </h1>
        <p className="mt-8 max-w-lg text-lg leading-relaxed text-[#f4e9d8]/80">
          Client Keeper is the CRM that treats your real estate business like
          a small, very good hotel. Every client is a name in the ledger.
          Every detail is remembered, quietly, before you need it.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-5">
          <a
            href="/client-keeper-crm"
            className="group inline-flex items-center gap-3 rounded-sm bg-[#c89841] px-7 py-4 text-sm font-semibold tracking-wide text-[#1a0929] transition hover:-translate-y-0.5 hover:bg-[#e0b25f]"
          >
            CHECK IN · 30 DAYS, FREE
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <span
            className="text-[28px] text-[#f4e9d8]"
            style={{ fontFamily: "var(--font-concierge-hand)" }}
          >
            no card required
          </span>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -inset-4 rounded-sm bg-[#c89841]/10 blur-2xl" />
        <div className="relative overflow-hidden rounded-sm border border-[#c89841]/30">
          <Image
            src="/ck-images/v4-concierge-desk.jpg"
            alt="Boutique hotel reception desk with guest book and lavender"
            width={900}
            height={1100}
            className="h-auto w-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a0929]/80 via-transparent to-transparent" />
        </div>
        <div className="absolute -bottom-6 -left-6 rounded-sm border border-[#c89841]/40 bg-[#1a0929]/90 px-5 py-3 shadow-xl backdrop-blur">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#c89841]">Now serving</p>
          <p
            className="text-[22px] italic text-[#f4e9d8]"
            style={{ fontFamily: "var(--font-concierge-serif)" }}
          >
            14,203 real estate agents
          </p>
        </div>
      </div>
    </section>
  );
}

function Ledger() {
  const guests = [
    { name: "Susan M.", note: "Birthday Mar 14 · prefers texts at 9am" },
    { name: "The Andersons", note: "Loved the kitchen. Cautious on basements." },
    { name: "J. Cooper", note: "First-showing anniversary next Tuesday" },
    { name: "Priscilla D.", note: "Closing Friday · prefers phone over email" },
  ];
  return (
    <section className="relative z-10 border-y border-[#c89841]/20 bg-[#10051d] py-16">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-4 text-[10px] uppercase tracking-[0.42em] text-[#c89841]">
          FROM THE LEDGER · THIS WEEK
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {guests.map((g, i) => (
            <div
              key={g.name}
              className="flex items-start gap-5 border-b border-[#c89841]/15 pb-4"
            >
              <span
                className="text-[#c89841]"
                style={{
                  fontFamily: "var(--font-concierge-serif)",
                  fontSize: "2rem",
                  lineHeight: 1,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p
                  className="text-xl text-[#f4e9d8]"
                  style={{ fontFamily: "var(--font-concierge-serif)" }}
                >
                  {g.name}
                </p>
                <p
                  className="mt-1 text-[17px] italic text-[#f4e9d8]/70"
                  style={{ fontFamily: "var(--font-concierge-hand)" }}
                >
                  {g.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GuestBook() {
  return (
    <section className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
      <p className="text-[10px] uppercase tracking-[0.42em] text-[#c89841]">
        From the guest book
      </p>
      <blockquote
        className="mt-6 text-[clamp(1.8rem,4vw,3rem)] leading-[1.15] text-[#f4e9d8]"
        style={{ fontFamily: "var(--font-concierge-serif)", fontStyle: "italic" }}
      >
        &ldquo;I used to lose people in the shuffle between closings. Now
        every client has a small warm room in my calendar. I don&apos;t know
        how it remembers, but it does.&rdquo;
      </blockquote>
      <p
        className="mt-6 text-2xl text-[#c89841]"
        style={{ fontFamily: "var(--font-concierge-hand)" }}
      >
        Eleanor R., Raleigh · 11 years
      </p>
    </section>
  );
}

function Services() {
  const items = [
    {
      k: "Turndown service",
      v: "Myra files every voice memo into the right contact before you&apos;ve parked the car.",
    },
    {
      k: "Wake-up call",
      v: "Follow-ups, birthdays, and anniversaries arrive each morning on a single, calm page.",
    },
    {
      k: "Bell service",
      v: "Every transaction — first call to closing — on one thread. Commission math included.",
    },
    {
      k: "Always open",
      v: "Mac, iPhone, Android. Everything in sync, nothing asking for your attention.",
    },
  ];
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-20">
      <div className="mb-14 flex flex-col items-baseline justify-between gap-4 md:flex-row">
        <h2
          className="text-[clamp(2.2rem,5vw,4rem)] leading-[1]"
          style={{ fontFamily: "var(--font-concierge-serif)" }}
        >
          The amenities.
        </h2>
        <span className="text-[11px] uppercase tracking-[0.42em] text-[#c89841]">
          Included with every stay
        </span>
      </div>
      <div className="grid gap-12 md:grid-cols-2">
        {items.map((x) => (
          <article key={x.k} className="border-t border-[#c89841]/25 pt-6">
            <p
              className="mb-3 text-[#c89841]"
              style={{
                fontFamily: "var(--font-concierge-serif)",
                fontSize: "1.4rem",
                fontStyle: "italic",
              }}
            >
              {x.k}
            </p>
            <p
              className="text-[16px] leading-relaxed text-[#f4e9d8]/80"
              dangerouslySetInnerHTML={{ __html: x.v }}
            />
          </article>
        ))}
      </div>
    </section>
  );
}

function Rate() {
  return (
    <section className="relative z-10 border-y border-[#c89841]/25 bg-[#10051d] py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.42em] text-[#c89841]">
          NIGHTLY RATE · ONE CALENDAR YEAR
        </p>
        <h2
          className="mt-6 text-[clamp(3rem,7vw,5.5rem)] leading-[1]"
          style={{ fontFamily: "var(--font-concierge-serif)" }}
        >
          <em className="italic text-[#c89841]">$19</em> · per agent, per month.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#f4e9d8]/80">
          All amenities included. Unlimited clients. Unlimited deals. Myra,
          and every future improvement. No up-sells. No extras at checkout.
        </p>
        <a
          href="/client-keeper-crm"
          className="mt-10 inline-flex items-center gap-3 rounded-sm bg-[#c89841] px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#1a0929] transition hover:-translate-y-0.5 hover:bg-[#e0b25f]"
        >
          Reserve the 30-day trial
          <span>→</span>
        </a>
        <p className="mt-4 text-[11px] uppercase tracking-[0.4em] text-[#f4e9d8]/50">
          Or $24/mo · paid monthly · cancel any time
        </p>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <footer className="relative z-10 py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 md:flex-row md:items-center md:justify-between">
        <p
          className="text-2xl italic text-[#c89841]"
          style={{ fontFamily: "var(--font-concierge-serif)" }}
        >
          Good evening. We hope to see you again.
        </p>
        <p className="text-[10px] uppercase tracking-[0.42em] text-[#f4e9d8]/60">
          © MMXXVI · Concierge Edition · A boutique property
        </p>
      </div>
    </footer>
  );
}
