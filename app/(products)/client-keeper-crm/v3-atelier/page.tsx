import type { Metadata } from "next";
import Link from "next/link";
import { Playfair_Display, Caveat, DM_Sans } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-atelier-serif",
});
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-atelier-hand",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-atelier-sans",
});

export const metadata: Metadata = {
  title: "Client Keeper · Atelier Edition",
  description:
    "A CRM that feels like a magazine you actually want to read. Made for real estate agents who prefer craft over chaos.",
};

export default function AtelierPage() {
  return (
    <main
      className={`${playfair.variable} ${caveat.variable} ${dmSans.variable} relative min-h-screen bg-[#fbf6ee] text-[#2a1637]`}
      style={{ fontFamily: "var(--font-atelier-sans), system-ui, sans-serif" }}
    >
      {/* subtle paper grain */}
      <PaperGrain />
      <Masthead />
      <Hero />
      <Strikethrough />
      <PullQuote />
      <FeatureSpread />
      <Myra />
      <Pricing />
      <Sign />
    </main>
  );
}

function PaperGrain() {
  return (
    <>
      <svg className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-[0.05]">
        <filter id="ateliergrain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="2"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#ateliergrain)" />
      </svg>
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(252,228,234,0.55), transparent 55%), radial-gradient(ellipse at bottom right, rgba(196,160,212,0.25), transparent 60%)",
        }}
      />
    </>
  );
}

function Masthead() {
  return (
    <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 pt-8 pb-6">
      <div className="flex items-baseline gap-3">
        <span
          className="text-2xl tracking-tight"
          style={{ fontFamily: "var(--font-atelier-serif)", fontWeight: 800 }}
        >
          Client Keeper
        </span>
        <span className="text-[10px] uppercase tracking-[0.35em] text-[#3d0d6a]/70">
          Atelier Edition · Vol. I
        </span>
      </div>
      <nav className="hidden items-center gap-8 text-[13px] text-[#4a2b60]/80 md:flex">
        <Link href="#features">The pages</Link>
        <Link href="#myra">Myra</Link>
        <Link href="#pricing">Price</Link>
        <a
          href="/client-keeper-crm"
          className="rounded-full bg-[#300092] px-5 py-2 text-white transition hover:bg-[#3d0d6a]"
        >
          Try free
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative z-10 mx-auto grid max-w-6xl items-end gap-10 px-6 pt-6 pb-20 md:grid-cols-[1.15fr,0.85fr] md:gap-16 md:pt-16 md:pb-28">
      <div>
        <p
          className="mb-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.32em] text-[#7a36dd]"
        >
          <span className="h-[1px] w-8 bg-[#7a36dd]" /> Issue 01 · For the
          agent who refuses to be hurried
        </p>
        <h1
          className="font-serif text-[clamp(3.2rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.02em] text-[#2a1637]"
          style={{ fontFamily: "var(--font-atelier-serif)" }}
        >
          The CRM that{" "}
          <em className="font-normal italic text-[#7a36dd]">remembers</em>
          <br />
          what you <em className="font-normal italic">meant</em> to do.
        </h1>
        <p className="mt-8 max-w-lg text-lg leading-relaxed text-[#4a2b60]">
          Client Keeper is a quiet, considered CRM for real estate agents who
          treat their clients like long relationships, not line items. Talk
          to it, and Myra — your AI assistant — writes it all down.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-5">
          <a
            href="/client-keeper-crm"
            className="group relative inline-flex items-center gap-3 rounded-full bg-[#300092] px-7 py-4 text-sm font-semibold text-white shadow-[0_14px_40px_-12px_rgba(48,0,146,0.5)] transition hover:-translate-y-0.5 hover:bg-[#3d0d6a]"
          >
            Start the 30-day trial
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <span
            className="text-[26px] italic text-[#7a36dd]"
            style={{ fontFamily: "var(--font-atelier-hand)" }}
          >
            no credit card, truly
          </span>
        </div>

        <p className="mt-6 text-[11px] uppercase tracking-[0.28em] text-[#4a2b60]/60">
          $19/mo billed annually · cancel any time · iOS &amp; Android
        </p>
      </div>

      <aside className="relative">
        <div className="relative mx-auto max-w-md rotate-[1.5deg] rounded-[2px] border border-[#2a1637]/10 bg-white p-8 shadow-[0_40px_80px_-40px_rgba(42,22,55,0.5)]">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#7a36dd]">
            The morning page
          </span>
          <div className="mt-4 space-y-3">
            <Line text="Call Priscilla re: Maple Ridge closing" hand />
            <Line text="Send Jim the warranty paperwork" checked hand />
            <Line text="Birthday — Susan M." hand />
            <Line text="Follow up: Cooper (first week in)" checked hand />
            <Line text="Water the office plant (truly)" hand />
          </div>
          <div
            className="mt-6 border-t border-[#2a1637]/10 pt-3 text-right text-[22px] italic text-[#7a36dd]"
            style={{ fontFamily: "var(--font-atelier-hand)" }}
          >
            — ck.
          </div>
        </div>
        <div
          className="absolute -bottom-8 -left-6 hidden rotate-[-4deg] rounded-sm bg-[#300092] px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white shadow-lg md:block"
        >
          feat. Myra ai
        </div>
      </aside>
    </section>
  );
}

function Line({
  text,
  checked,
  hand,
}: {
  text: string;
  checked?: boolean;
  hand?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 text-[15px] leading-snug text-[#2a1637]">
      <span
        className={`mt-[5px] inline-block h-3 w-3 shrink-0 rounded-[2px] border ${
          checked
            ? "border-[#7a36dd] bg-[#7a36dd]"
            : "border-[#2a1637]/40 bg-transparent"
        }`}
      />
      <span
        className={
          hand
            ? "text-[20px] italic text-[#2a1637]"
            : "text-[#2a1637]"
        }
        style={
          hand
            ? { fontFamily: "var(--font-atelier-hand)" }
            : undefined
        }
      >
        {text}
      </span>
    </div>
  );
}

function Strikethrough() {
  const items = [
    "Sticky notes",
    "Spreadsheets",
    "Crossed fingers",
    "Lost leads",
  ];
  return (
    <section className="relative z-10 border-y border-[#2a1637]/15 bg-[#f3eadf] py-14">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-[#7a36dd]">
          On the way out
        </p>
        <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
          {items.map((t) => (
            <span
              key={t}
              className="relative text-[clamp(1.4rem,3vw,2.2rem)] italic text-[#2a1637]/55"
              style={{ fontFamily: "var(--font-atelier-serif)" }}
            >
              <span>{t}</span>
              <span className="absolute left-0 right-0 top-1/2 h-[2px] translate-y-[-1px] bg-[#7a36dd]" />
            </span>
          ))}
          <span
            className="text-[clamp(1.4rem,3vw,2.2rem)] text-[#300092]"
            style={{ fontFamily: "var(--font-atelier-serif)", fontWeight: 700 }}
          >
            Client Keeper.
          </span>
        </div>
      </div>
    </section>
  );
}

function PullQuote() {
  return (
    <section className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
      <span className="text-[10px] uppercase tracking-[0.35em] text-[#7a36dd]">
        From the editor's letter
      </span>
      <blockquote
        className="mt-6 text-[clamp(1.8rem,4vw,3.2rem)] italic leading-[1.15] text-[#2a1637]"
        style={{ fontFamily: "var(--font-atelier-serif)" }}
      >
        &ldquo;Real estate is the most human business left. It asks you to
        remember birthdays, anniversaries, the name of a son going to
        college. Client Keeper remembers <em>for</em> you — quietly, in the
        margin, the way a good assistant always has.&rdquo;
      </blockquote>
      <p
        className="mt-6 text-lg italic text-[#7a36dd]"
        style={{ fontFamily: "var(--font-atelier-hand)" }}
      >
        — a working agent, Year 22 in the business
      </p>
    </section>
  );
}

function FeatureSpread() {
  const features = [
    {
      n: "i",
      title: "A contact book that listens",
      body: "Tap the mic, tell Myra what happened on the call, go on with your day. Your notes are written, tagged, and filed before you reach the car.",
    },
    {
      n: "ii",
      title: "Follow-ups that come to you",
      body: "Twelve days after an open house. A week before the inspection window closes. Birthdays, anniversaries, first-showing anniversaries. All waiting on your morning page.",
    },
    {
      n: "iii",
      title: "One clean deal pipeline",
      body: "From first call to closing table, every transaction in one calm thread. Commission math included. So are the small details you swore you'd remember.",
    },
    {
      n: "iv",
      title: "Yours, always — on every device",
      body: "A thoughtful Mac app. A thoughtful iPhone app. A thoughtful Android app. Everything in sync, nothing pushed at you.",
    },
  ];
  return (
    <section
      id="features"
      className="relative z-10 mx-auto max-w-6xl px-6 py-20"
    >
      <div className="mb-14 flex flex-col items-baseline justify-between gap-4 md:flex-row">
        <h2
          className="text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.95] text-[#2a1637]"
          style={{ fontFamily: "var(--font-atelier-serif)", fontWeight: 800 }}
        >
          The pages you&apos;ll turn to
        </h2>
        <span className="text-[11px] uppercase tracking-[0.32em] text-[#7a36dd]">
          Features, plainly put
        </span>
      </div>
      <div className="grid gap-x-16 gap-y-14 md:grid-cols-2">
        {features.map((f) => (
          <article key={f.n} className="relative">
            <div
              className="mb-3 text-[#7a36dd]"
              style={{
                fontFamily: "var(--font-atelier-serif)",
                fontSize: "1.2rem",
                fontStyle: "italic",
                letterSpacing: "0.2em",
              }}
            >
              {f.n}.
            </div>
            <h3
              className="mb-3 text-2xl leading-tight text-[#2a1637]"
              style={{
                fontFamily: "var(--font-atelier-serif)",
                fontWeight: 700,
              }}
            >
              {f.title}
            </h3>
            <p className="text-[16px] leading-relaxed text-[#4a2b60]">
              {f.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Myra() {
  return (
    <section
      id="myra"
      className="relative z-10 mx-auto max-w-6xl px-6 py-20"
    >
      <div className="grid items-center gap-12 rounded-[3px] border border-[#2a1637]/10 bg-white p-8 shadow-[0_30px_80px_-40px_rgba(42,22,55,0.4)] md:grid-cols-[0.9fr,1.1fr] md:p-14">
        <div>
          <span className="text-[10px] uppercase tracking-[0.32em] text-[#7a36dd]">
            Meet Myra
          </span>
          <h2
            className="mt-4 text-[clamp(2rem,4vw,3rem)] leading-[1] text-[#2a1637]"
            style={{ fontFamily: "var(--font-atelier-serif)", fontWeight: 800 }}
          >
            She does the writing.
            <br />
            <em className="italic text-[#7a36dd]">You do the work you&apos;re known for.</em>
          </h2>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-[#4a2b60]">
            Tap the mic after a showing, say what happened in plain English,
            hang up. Myra listens, parses, updates the right contact, sets
            the right follow-up, flags the things you almost forgot.
          </p>
        </div>
        <div className="relative rounded-[2px] border border-[#2a1637]/10 bg-[#fbf6ee] p-6 shadow-inner">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#7a36dd]">
            Voice memo · 0:43
          </p>
          <p
            className="mt-4 text-[22px] leading-snug italic text-[#2a1637]"
            style={{ fontFamily: "var(--font-atelier-hand)" }}
          >
            &ldquo;Okay — just left the Andersons at 142 Willow. They loved
            the kitchen, not the basement. Wife&apos;s birthday next Thursday.
            Need to send a handwritten card and the Chapel Hill comps by
            Friday.&rdquo;
          </p>
          <div className="mt-6 rounded-[2px] border border-dashed border-[#7a36dd]/40 bg-white p-4">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#7a36dd]">
              Myra has filed
            </p>
            <ul className="mt-3 space-y-2 text-[14px] text-[#2a1637]">
              <li>→ Note added to <strong>Anderson, J. &amp; M.</strong></li>
              <li>→ Birthday reminder set for <strong>Mar 14</strong></li>
              <li>→ Follow-up: <strong>Chapel Hill comps, Fri</strong></li>
              <li>→ Tag added: <strong>loved kitchen / cautious on basements</strong></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section
      id="pricing"
      className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center"
    >
      <p className="text-[10px] uppercase tracking-[0.32em] text-[#7a36dd]">
        A simple subscription
      </p>
      <h2
        className="mt-4 text-[clamp(2.2rem,5.5vw,4rem)] leading-[1] text-[#2a1637]"
        style={{ fontFamily: "var(--font-atelier-serif)", fontWeight: 800 }}
      >
        <em className="italic">$19</em> a month,
        <br />
        billed once a year.
      </h2>
      <p className="mx-auto mt-6 max-w-lg text-[17px] leading-relaxed text-[#4a2b60]">
        Unlimited contacts. Unlimited transactions. Myra included. All the
        platforms. No tiers, no surprise add-ons, no sales calls.
      </p>
      <div className="mt-10">
        <a
          href="/client-keeper-crm"
          className="inline-flex items-center gap-3 rounded-full bg-[#300092] px-8 py-4 text-sm font-semibold text-white shadow-[0_14px_40px_-12px_rgba(48,0,146,0.5)] transition hover:-translate-y-0.5 hover:bg-[#3d0d6a]"
        >
          Try free for 30 days →
        </a>
        <p className="mt-4 text-[11px] uppercase tracking-[0.3em] text-[#4a2b60]/60">
          Or $24/mo if you prefer to pay by the month
        </p>
      </div>
    </section>
  );
}

function Sign() {
  return (
    <footer className="relative z-10 border-t border-[#2a1637]/15 bg-[#f3eadf] py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p
            className="text-3xl italic text-[#7a36dd]"
            style={{ fontFamily: "var(--font-atelier-hand)" }}
          >
            — signed, the Client Keeper team
          </p>
          <p className="mt-2 text-[11px] uppercase tracking-[0.32em] text-[#4a2b60]/70">
            Made for agents, by people who grew up around them
          </p>
        </div>
        <div className="text-[11px] uppercase tracking-[0.3em] text-[#4a2b60]/70">
          © MMXXVI · Atelier Edition · Vol. I
        </div>
      </div>
    </footer>
  );
}
