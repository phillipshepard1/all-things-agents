import type { Metadata } from "next";
import Image from "next/image";
import { DM_Serif_Display, Caveat, DM_Sans } from "next/font/google";

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
  description:
    "A French-provincial CRM for real estate agents. Soft, lavender-scented, and quietly capable.",
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
      <Menu />
      <SoftCards />
      <Myra />
      <Rate />
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
        Commencer gratuitement
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-6 pt-20 pb-24 text-center md:pt-28">
      <p className="mb-7 text-[11px] uppercase tracking-[0.45em] text-[#7a5290]">
        Un CRM · doux · lavande · pour les agents immobiliers
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
        Client Keeper is the CRM for agents who would rather write a note by
        hand than a subject line. We do the organizing; you keep the grace.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
        <a
          href="/client-keeper-crm"
          className="group inline-flex items-center gap-3 rounded-full bg-[#3a1f55] px-8 py-4 text-sm font-semibold text-[#efe7f0] shadow-[0_14px_40px_-12px_rgba(58,31,85,0.5)] transition hover:-translate-y-0.5 hover:bg-[#7a36dd]"
        >
          Start the 30-day trial
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
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#3a1f55]/20" />
        </div>
      </div>
    </section>
  );
}

function Menu() {
  const items = [
    { k: "Entrée", v: "A single clean view of every client you've ever helped." },
    { k: "Plat", v: "Every deal, tracked from first showing to the table." },
    { k: "Dessert", v: "Myra, your voice-first AI — the quiet luxury of the meal." },
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
            <li
              key={x.k}
              className="grid grid-cols-[1fr_auto_3fr] items-baseline gap-4"
            >
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

function SoftCards() {
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-6 py-20 text-center">
      <blockquote
        className="text-[clamp(1.7rem,4vw,3rem)] leading-[1.2] text-[#3a1f55]"
        style={{ fontFamily: "var(--font-jardin-display)", fontStyle: "italic" }}
      >
        &ldquo;I don&apos;t want a dashboard. I want a morning that feels like I
        have my life under a light hand. Client Keeper is that.&rdquo;
      </blockquote>
      <p
        className="mt-6 text-2xl text-[#7a36dd]"
        style={{ fontFamily: "var(--font-jardin-hand)" }}
      >
        — Camille B., Scottsdale, 9 years
      </p>
    </section>
  );
}

function Myra() {
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-6 py-16">
      <div className="grid gap-10 rounded-3xl bg-white/60 p-10 backdrop-blur-md md:grid-cols-[1fr,1fr] md:p-14">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#7a5290]">
            La cuisinière
          </p>
          <h2
            className="mt-3 text-[clamp(2rem,5vw,3.4rem)] leading-[1]"
            style={{ fontFamily: "var(--font-jardin-display)" }}
          >
            Myra cooks in the back.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#5a3d72]">
            Tap the mic after a showing; tell her what happened in plain
            language. She writes the notes, tags the interests, and sets the
            follow-ups — like a good sous-chef you never see.
          </p>
        </div>
        <div
          className="relative rounded-2xl border border-[#3a1f55]/15 bg-[#efe7f0] p-6"
          style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\"><g fill=\"none\" stroke=\"rgba(58,31,85,0.08)\" stroke-width=\"0.6\"><path d=\"M0 10L40 10M0 20L40 20M0 30L40 30\"/></g></svg>')" }}
        >
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#7a36dd]">
            Carnet · 0:41
          </p>
          <p
            className="mt-4 text-[22px] leading-snug italic text-[#3a1f55]"
            style={{ fontFamily: "var(--font-jardin-hand)" }}
          >
            &ldquo;Just left the Beaumonts at 11 Rue Claire. She adored the
            herb garden — send Julia&apos;s comp sheet Thursday and a note on
            the Beaumont&apos;s anniversary next week.&rdquo;
          </p>
          <div className="mt-6 text-[14px] text-[#5a3d72]">
            → Note: <strong>Beaumont, R. &amp; J.</strong> · &ldquo;herb garden&rdquo; tag
            <br />
            → Thu 9am: <strong>send Julia comp sheet</strong>
            <br />
            → Anniversary reminder: <strong>Apr 24</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

function Rate() {
  return (
    <section className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
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
        Unlimited clients. Unlimited deals. Myra included. No tiers, no
        add-ons, no salesperson on the way. Try it for 30 days without a card.
      </p>
      <a
        href="/client-keeper-crm"
        className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#3a1f55] px-8 py-4 text-sm font-semibold text-[#efe7f0] transition hover:-translate-y-0.5 hover:bg-[#7a36dd]"
      >
        Commencer
      </a>
    </section>
  );
}

function Close() {
  return (
    <footer className="relative z-10 border-t border-[#3a1f55]/15 py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-6 md:flex-row md:items-center md:justify-between">
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
    </footer>
  );
}
