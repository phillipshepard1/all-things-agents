import type { Metadata } from "next";
import Image from "next/image";
import { Fraunces, Caveat, DM_Sans } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-vh-serif",
});
const caveat = Caveat({
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
    "The CRM for agents who close the laptop at a decent hour. Real estate, handled — by the time the sky turns violet.",
};

export default function VioletHourPage() {
  return (
    <main
      className={`${fraunces.variable} ${caveat.variable} ${dm.variable} relative min-h-screen overflow-hidden bg-[#0a041d] text-[#e8dcf5]`}
      style={{ fontFamily: "var(--font-vh-sans), system-ui, sans-serif" }}
    >
      <Dusk />
      <Stars />
      <Nav />
      <Hero />
      <Benediction />
      <Pillars />
      <Myra />
      <Rate />
      <Dawn />

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.25; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.25); }
        }
        .twinkle { animation: twinkle 3.2s ease-in-out infinite; }
        @keyframes shine-soft {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
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
        Start free trial
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-6 pt-16 pb-28 text-center md:pt-28">
      <span className="mb-8 inline-block text-[11px] uppercase tracking-[0.45em] text-[#e8b6a5]">
        An end-of-day CRM
      </span>
      <h1
        className="mx-auto max-w-4xl text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.92] tracking-[-0.02em] text-[#f6e5d6]"
        style={{ fontFamily: "var(--font-vh-serif)", fontWeight: 500 }}
      >
        By the time the sky turns{" "}
        <em
          className="italic"
          style={{
            fontStyle: "italic",
            background:
              "linear-gradient(90deg, #e8b6a5 0%, #c49bff 45%, #7a36dd 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          violet
        </em>
        , your work is done.
      </h1>
      <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-[#e8dcf5]/80 md:text-xl">
        Client Keeper is a quiet, AI-assisted CRM for real estate agents who
        want to close the laptop at a decent hour. Talk into your phone on
        the way home — Myra does the rest by morning.
      </p>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
        <a
          href="/client-keeper-crm"
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-8 py-4 text-sm font-semibold text-[#160734] shadow-[0_20px_60px_-15px_rgba(232,182,165,0.7)] transition hover:-translate-y-0.5"
          style={{
            background:
              "linear-gradient(120deg, #f6e5d6 0%, #e8b6a5 45%, #c49bff 100%)",
          }}
        >
          <span>Try free for 30 days</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
        <span
          className="text-2xl text-[#e8b6a5]"
          style={{ fontFamily: "var(--font-vh-hand)" }}
        >
          no card, just curiosity
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

function Benediction() {
  return (
    <section className="relative z-10 mx-auto max-w-4xl px-6 py-16 text-center">
      <blockquote
        className="text-[clamp(1.6rem,3.8vw,2.8rem)] leading-[1.2] text-[#f6e5d6]/90"
        style={{ fontFamily: "var(--font-vh-serif)", fontStyle: "italic", fontWeight: 400 }}
      >
        &ldquo;The work expands to fill the hours you give it. Give it fewer
        hours — and let something else remember for you.&rdquo;
      </blockquote>
    </section>
  );
}

function Pillars() {
  const items = [
    {
      k: "Voice in, notes out",
      v: "Talk into your phone after a showing. Myra files the note, tags the client, sets the follow-up.",
    },
    {
      k: "The morning page",
      v: "One calm screen each morning: who to call, who to congratulate, what to close by Friday.",
    },
    {
      k: "A single deal thread",
      v: "From first call to signed paperwork — no switching tabs, no losing details in email.",
    },
    {
      k: "Everywhere, always",
      v: "Mac, iPhone, Android. Offline edits sync the minute you're back on signal.",
    },
  ];
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-20">
      <p className="mb-10 text-center text-[11px] uppercase tracking-[0.42em] text-[#e8b6a5]">
        Four quiet features
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((x) => (
          <article
            key={x.k}
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
              style={{
                fontFamily: "var(--font-vh-serif)",
                fontWeight: 500,
              }}
            >
              {x.k}
            </h3>
            <p className="text-[16px] leading-relaxed text-[#e8dcf5]/80">
              {x.v}
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
        <div className="grid items-center gap-10 md:grid-cols-[1fr,1fr]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.42em] text-[#e8b6a5]">
              Meet Myra
            </span>
            <h2
              className="mt-4 text-[clamp(2.2rem,5vw,3.8rem)] leading-[1] text-[#f6e5d6]"
              style={{ fontFamily: "var(--font-vh-serif)", fontWeight: 500 }}
            >
              Your AI concierge, <em className="italic">with a voice you can talk to.</em>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[#e8dcf5]/80">
              Narrate your day on the drive home. Myra parses the story,
              updates the right client, sets the right reminder, and quietly
              steps aside.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#16092f]/70 p-6">
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#e8b6a5]">
              Voice memo · 0:51
            </p>
            <p
              className="mt-4 text-[22px] leading-snug text-[#f6e5d6]"
              style={{ fontFamily: "var(--font-vh-hand)" }}
            >
              &ldquo;Leaving the Cardenas showing on Elm. She wants a yard, he
              wants a garage. Dog&apos;s name is Pablo. Follow up on the Monroe
              listing Thursday — she lit up when she saw the porch.&rdquo;
            </p>
            <div className="mt-6 space-y-2 text-[14px] text-[#e8dcf5]">
              <p>→ note on <strong>Cardenas, A. &amp; R.</strong></p>
              <p>→ tags: <em>yard wanted / garage wanted / Pablo (dog)</em></p>
              <p>→ follow-up set for <strong>Thu — Monroe listing</strong></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Rate() {
  return (
    <section className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
      <p className="text-[11px] uppercase tracking-[0.45em] text-[#e8b6a5]">
        One soft price
      </p>
      <h2
        className="mt-6 text-[clamp(3rem,7vw,5.5rem)] leading-[0.95] text-[#f6e5d6]"
        style={{ fontFamily: "var(--font-vh-serif)", fontWeight: 500 }}
      >
        <em className="italic">$19</em> a month,
        <br />
        yours until sunrise.
      </h2>
      <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-[#e8dcf5]/80">
        All features. All platforms. All of Myra. Unlimited clients. Cancel
        any time — you&apos;ll keep everything you entered.
      </p>
      <a
        href="/client-keeper-crm"
        className="mt-10 inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-semibold text-[#160734] shadow-[0_20px_60px_-15px_rgba(232,182,165,0.6)] transition hover:-translate-y-0.5"
        style={{
          background:
            "linear-gradient(120deg, #f6e5d6 0%, #e8b6a5 50%, #c49bff 100%)",
        }}
      >
        Begin the 30-day trial →
      </a>
    </section>
  );
}

function Dawn() {
  return (
    <footer className="relative z-10 mt-20 border-t border-white/10 bg-gradient-to-b from-transparent to-[#e8b6a5]/20 py-12 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p
          className="text-3xl italic text-[#f6e5d6]"
          style={{ fontFamily: "var(--font-vh-serif)" }}
        >
          Good night, and a good morning to come.
        </p>
        <p className="mt-4 text-[11px] uppercase tracking-[0.45em] text-[#e8dcf5]/60">
          © MMXXVI · Client Keeper · Violet Hour
        </p>
      </div>
    </footer>
  );
}
