import type { Metadata } from "next";
import Image from "next/image";
import { Playfair_Display, Cormorant_Garamond, DM_Sans } from "next/font/google";

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
  description:
    "A luxury CRM for real estate agents. Unhurried, refined, made to last. $19/mo.",
};

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
      <DropCap />
      <Three />
      <Myra />
      <Rate />
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
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015 0.05"
            numOctaves="3"
            seed="3"
          />
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
            background: "linear-gradient(130deg, #e6c88a 0%, #f5deb3 50%, #c89841 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
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
        Begin free trial
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
          <span>Edition · Velvet</span>
        </p>
        <h1
          className="text-[clamp(3rem,8.5vw,7.2rem)] leading-[0.9] tracking-[-0.015em]"
          style={{ fontFamily: "var(--font-velvet-display)", fontWeight: 600 }}
        >
          <span>A CRM,</span>
          <br />
          <em
            className="italic"
            style={{
              background:
                "linear-gradient(130deg, #e6c88a 0%, #f5deb3 50%, #c89841 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            made of better things.
          </em>
        </h1>
        <p className="mt-8 max-w-lg text-lg leading-relaxed text-[#d6c2d9]">
          Unhurried. Refined. A piece of software built the way a good leather
          briefcase is built — to last, to get better, and to never embarrass
          you in front of a client.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-5">
          <a
            href="/client-keeper-crm"
            className="group relative inline-flex items-center gap-3 rounded-sm px-8 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#12051f] shadow-[0_20px_50px_-15px_rgba(198,152,65,0.6)] transition hover:-translate-y-0.5"
            style={{
              background:
                "linear-gradient(130deg, #e6c88a 0%, #f5deb3 50%, #c89841 100%)",
            }}
          >
            Try free for 30 days
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <span
            className="text-lg italic text-[#c89841]"
            style={{ fontFamily: "var(--font-velvet-serif)" }}
          >
            no card required
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
            background:
              "linear-gradient(130deg, #e6c88a 0%, #f5deb3 50%, #c89841 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          R
        </span>
        eal estate software is, for most of us, a permanent embarrassment.
        Cluttered dashboards, small invoices with big promises, and interfaces
        you wouldn&apos;t let a client see over your shoulder. Client Keeper is
        the quiet rebuttal. It is made in the small, careful way that
        well-tailored things are made. And like them, it gets better with the
        years.
      </article>
    </section>
  );
}

function Three() {
  const pillars = [
    {
      k: "i.",
      t: "Myra, the assistant you deserve",
      b: "Talk to her after a showing. Your notes, tags, and follow-ups are written by the time you reach your car.",
    },
    {
      k: "ii.",
      t: "A pipeline that quietly holds",
      b: "One thread per deal, from the first message to the closing disclosure. Everything in its place; nothing in your way.",
    },
    {
      k: "iii.",
      t: "A price that does not apologize",
      b: "$19 a month, billed once a year. No tiers, no surprise add-ons, no sales call. A fair number, once.",
    },
  ];
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-10 md:grid-cols-3">
        {pillars.map((p) => (
          <article
            key={p.k}
            className="relative rounded-[4px] border border-[#c89841]/25 bg-white/[0.03] p-8 backdrop-blur-md transition hover:border-[#c89841]/60"
          >
            <p
              className="mb-4 text-[#c89841]"
              style={{
                fontFamily: "var(--font-velvet-display)",
                fontSize: "2.2rem",
                fontStyle: "italic",
                lineHeight: 1,
              }}
            >
              {p.k}
            </p>
            <h3
              className="mb-3 text-2xl text-[#ecdcee]"
              style={{ fontFamily: "var(--font-velvet-display)", fontWeight: 600 }}
            >
              {p.t}
            </h3>
            <p className="text-[15.5px] leading-relaxed text-[#d6c2d9]">{p.b}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Myra() {
  return (
    <section className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
      <blockquote
        className="text-[clamp(1.6rem,4vw,2.8rem)] leading-[1.2] text-[#ecdcee]"
        style={{ fontFamily: "var(--font-velvet-display)", fontStyle: "italic", fontWeight: 400 }}
      >
        &ldquo;It is the first piece of real-estate software I&apos;ve owned that
        I wouldn&apos;t hide from a client.&rdquo;
      </blockquote>
      <p
        className="mt-6 text-[18px] italic text-[#c89841]"
        style={{ fontFamily: "var(--font-velvet-serif)" }}
      >
        — Rachel O., luxury division, Scottsdale
      </p>
    </section>
  );
}

function Rate() {
  return (
    <section className="relative z-10 border-y border-[#c89841]/25 bg-gradient-to-b from-[#1a0a2a] to-[#12051f] py-28">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.45em] text-[#c89841]">
          The whole price
        </p>
        <h2
          className="mt-6 text-[clamp(3.2rem,8vw,6.5rem)] leading-[0.9]"
          style={{ fontFamily: "var(--font-velvet-display)", fontWeight: 700 }}
        >
          <em
            className="italic"
            style={{
              background:
                "linear-gradient(130deg, #e6c88a 0%, #f5deb3 50%, #c89841 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            $19
          </em>{" "}
          a month.
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-[#d6c2d9]">
          Billed annually. Unlimited clients, transactions, and devices. Myra
          included. 30 days free, no card on file.
        </p>
        <a
          href="/client-keeper-crm"
          className="mt-10 inline-flex items-center gap-3 rounded-sm px-9 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#12051f] transition hover:-translate-y-0.5"
          style={{
            background:
              "linear-gradient(130deg, #e6c88a 0%, #f5deb3 50%, #c89841 100%)",
          }}
        >
          Try free, carefully
        </a>
      </div>
    </section>
  );
}

function Sign() {
  return (
    <footer className="relative z-10 py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 md:flex-row md:items-center md:justify-between">
        <p
          className="text-[22px] italic text-[#c89841]"
          style={{ fontFamily: "var(--font-velvet-serif)" }}
        >
          Made for the long career.
        </p>
        <p className="text-[10px] uppercase tracking-[0.45em] text-[#d6c2d9]/70">
          © MMXXVI · Client Keeper · Velvet Edition
        </p>
      </div>
    </footer>
  );
}
