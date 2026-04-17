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
    "Real Estate CRM Without the Tech Overwhelm. MYRA is the AI assistant that enters your data while you close deals.",
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
      <UsedBy />
      <Ledger />
      <GuestBook />
      <Amenities />
      <Myra />
      <Benefits />
      <DetailedFeatures />
      <Testimonials />
      <Rate />
      <FAQ />
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
        Start Free Trial
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
            Real Estate CRM · Without the Tech Overwhelm
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
          Client Keeper is the CRM that makes real estate easy — simple to
          use, with zero learning curve. MYRA, your AI assistant, enters your
          data for you. Every client is a name in the ledger. Every detail is
          remembered, quietly, before you need it.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-5">
          <a
            href="/client-keeper-crm"
            className="group inline-flex items-center gap-3 rounded-sm bg-[#c89841] px-7 py-4 text-sm font-semibold tracking-wide text-[#1a0929] transition hover:-translate-y-0.5 hover:bg-[#e0b25f]"
          >
            START FREE TRIAL · 30 DAYS
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <span
            className="text-[28px] text-[#f4e9d8]"
            style={{ fontFamily: "var(--font-concierge-hand)" }}
          >
            no credit card required
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
            10,000+ real estate agents
          </p>
        </div>
      </div>
    </section>
  );
}

function UsedBy() {
  const names = [
    "The Sudar Group",
    "Momentum Loans",
    "Keller Williams",
    "EXIT Realty",
    "AMC Mortgage",
    "Collier & Associates",
    "First Colony Mortgage",
  ];
  return (
    <section className="relative z-10 border-y border-[#c89841]/20 py-6">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-3 text-center text-[10px] uppercase tracking-[0.5em] text-[#c89841]">
          Used by
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
          {names.map((n) => (
            <span
              key={n}
              className="text-[15px] italic text-[#f4e9d8]/75"
              style={{ fontFamily: "var(--font-concierge-serif)" }}
            >
              {n}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ledger() {
  const guests = [
    { name: "Sarah Johnson", note: "Next follow-up · call in 1 week" },
    { name: "The Millers", note: "Check in every 6 months (MYRA on it)" },
    { name: "The Smiths", note: "2,500 sqft · 4-bed · good school district" },
    { name: "Sarah Miller", note: "Preapproved for $450k · add to Oak St." },
  ];
  return (
    <section className="relative z-10 bg-[#10051d] py-16">
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
        &ldquo;MYRA is like having a personal assistant who never sleeps. She
        handles all my data entry and follow-up reminders behind the scenes
        so I can actually be present with my kids after work.&rdquo;
      </blockquote>
      <p
        className="mt-6 text-2xl text-[#c89841]"
        style={{ fontFamily: "var(--font-concierge-hand)" }}
      >
        Jessica M, Realtor · Century 21
      </p>
    </section>
  );
}

function Amenities() {
  const items = [
    {
      k: "Simple To The Core",
      v: "Real estate has enough moving parts. We keep your CRM refreshingly simple — no learning curve, no bloat, no sales calls.",
    },
    {
      k: "Effortless Data Entry",
      v: "Let MYRA handle the data entry while you focus on closing deals and building relationships.",
    },
    {
      k: "Smart Follow-Up Reminders",
      v: "Never let another hot lead go cold or miss a past client&apos;s birthday again. Set it once, stay connected forever.",
    },
    {
      k: "Done-For-You Data Transfer",
      v: "Start fresh without starting over — we&apos;ll move all your contacts and history from your old CRM for you.",
    },
    {
      k: "Grow Your Sphere",
      v: "Turn every interaction into a lasting relationship that generates referrals for years to come.",
    },
    {
      k: "Manage Your Full Business",
      v: "Run your entire real estate business from one simple app — contacts, deals, tasks, and follow-ups all in one place.",
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
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
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

function Myra() {
  const jobs = [
    { k: "Schedule Follow-Ups", v: "'Check in with the Millers every 6 months' — MYRA notifies you on schedule." },
    { k: "Capture Client Data", v: "Voice memos, sticky notes, napkin scribbles — MYRA organizes it all perfectly." },
    { k: "Remember Client Details", v: "'Loved the kitchen, hated the bathroom' — MYRA adds it to their profile." },
    { k: "Record Property Searches", v: "'2,500 sqft · 4-bed · good schools' — MYRA logs their requirements." },
    { k: "Plan Your To-Dos", v: "Morning thoughts, car ramblings, overload — MYRA enters every to-do perfectly." },
    { k: "Important Dates", v: "Birthdays, anniversaries, closings — MYRA tracks them so you can show you care." },
  ];
  return (
    <section className="relative z-10 border-y border-[#c89841]/20 bg-[#10051d] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-12 md:grid-cols-[0.95fr,1.05fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.42em] text-[#c89841]">
              Meet your assistant
            </p>
            <h2
              className="mt-3 text-[clamp(2.4rem,5.5vw,4.2rem)] leading-[1]"
              style={{ fontFamily: "var(--font-concierge-serif)" }}
            >
              Hi, I&apos;m{" "}
              <em className="italic text-[#c89841]">MYRA</em>.
            </h2>
            <p
              className="mt-3 text-[22px] italic text-[#f4e9d8]/80"
              style={{ fontFamily: "var(--font-concierge-hand)" }}
            >
              My Real Estate Assistant.
            </p>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-[#f4e9d8]/75">
              MYRA streamlines data entry and schedules follow-ups so you
              stay organized, build better relationships, and close more
              deals — without the overwhelm.
            </p>
          </div>
          <div className="rounded-sm border border-[#c89841]/30 bg-[#1a0929]/70 p-6">
            <p className="text-[10px] uppercase tracking-[0.42em] text-[#c89841]">
              Voice memo · 0:12
            </p>
            <p
              className="mt-4 text-[22px] italic leading-snug text-[#f4e9d8]"
              style={{ fontFamily: "var(--font-concierge-serif)" }}
            >
              &ldquo;Just showed the Johnsons the house on Oak Street. They
              loved the backyard, scheduling second showing for
              Saturday.&rdquo;
            </p>
            <div className="mt-6 space-y-2 text-[14px] text-[#f4e9d8]/90">
              <p>→ Contact updated: <strong>Johnson Family</strong></p>
              <p>→ Follow-up scheduled: <strong>Saturday 10am</strong></p>
              <p>→ Property linked: <strong>123 Oak Street</strong></p>
            </div>
          </div>
        </div>
        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((j) => (
            <div key={j.k} className="border-t border-[#c89841]/20 pt-5">
              <h4
                className="text-xl text-[#f4e9d8]"
                style={{
                  fontFamily: "var(--font-concierge-serif)",
                  fontStyle: "italic",
                }}
              >
                {j.k}
              </h4>
              <p className="mt-2 text-[15px] leading-relaxed text-[#f4e9d8]/75">
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
  const stats = [
    { n: "40%", l: "Increase in client retention" },
    { n: "10+", l: "Hours saved per week" },
    { n: "2×", l: "Faster deal closings" },
    { n: "98%", l: "Customer satisfaction" },
  ];
  const bullets = [
    "Increase client retention by 40%",
    "Close 2× more deals with automatic follow-up reminders",
    "Never miss a birthday, anniversary, or closing date",
    "Access your CRM from anywhere — fully mobile ready",
    "Import your existing contacts in seconds",
  ];
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-12 md:grid-cols-[1fr,1.1fr]">
        <div>
          <p className="text-[10px] uppercase tracking-[0.42em] text-[#c89841]">
            Why Client Keeper
          </p>
          <h2
            className="mt-3 text-[clamp(2rem,4.5vw,3.6rem)] leading-[1]"
            style={{ fontFamily: "var(--font-concierge-serif)" }}
          >
            Keep more clients.
            <br />
            <em className="italic text-[#c89841]">Close more deals.</em>
          </h2>
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-[#f4e9d8]/75">
            Built by real estate agents, for real estate agents. We understand
            the unique challenges you face and designed every feature to help
            you succeed.
          </p>
          <ul className="mt-8 space-y-3">
            {bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 text-[16.5px] leading-snug text-[#f4e9d8]"
              >
                <span className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-[#c89841]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <div
              key={s.n}
              className="rounded-sm border border-[#c89841]/30 bg-[#1a0929]/60 p-6"
            >
              <p
                className="text-[#c89841]"
                style={{
                  fontFamily: "var(--font-concierge-serif)",
                  fontSize: "clamp(2.4rem, 5vw, 3.5rem)",
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {s.n}
              </p>
              <p className="mt-3 text-[13px] uppercase tracking-[0.2em] text-[#f4e9d8]/75">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DetailedFeatures() {
  const blocks = [
    {
      t: "MYRA AI Assistant",
      b: "Meet MYRA — your AI assistant that enters data for you. Just talk or type naturally, and MYRA handles the rest. It&apos;s like having a personal assistant who never sleeps.",
      bullets: [
        "Voice memos that automatically become CRM entries",
        "Natural language — just describe what happened",
        "Auto-fills contact info, notes, and follow-ups",
        "Works from anywhere — phone, tablet, or desktop",
      ],
    },
    {
      t: "Repeating Follow-Ups",
      b: "Set it once, stay connected forever. Automated repeating follow-ups ensure you never lose touch with past clients or let hot leads go cold.",
      bullets: [
        "Automatic reminders on your schedule",
        "Birthday, anniversary, and closing date alerts",
        "Customizable follow-up sequences",
        "Mark complete or snooze with one tap",
      ],
    },
    {
      t: "Contact Management",
      b: "All your clients, leads, and relationships in one organized place. Powerful search, smart tags, and detailed history at your fingertips.",
      bullets: [
        "Complete history for every contact",
        "Smart tags and custom categories",
        "Notes, documents, and photos attached",
        "Free migration from your current system",
      ],
    },
    {
      t: "Transaction Tracking",
      b: "Track every deal from listing to closing. See your pipeline at a glance and never miss a deadline or important milestone.",
      bullets: [
        "Visual pipeline with drag-and-drop",
        "Key dates and milestone tracking",
        "Commission calculations built-in",
        "Document storage for each deal",
      ],
    },
  ];
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-24">
      <p className="text-center text-[10px] uppercase tracking-[0.42em] text-[#c89841]">
        The longer list
      </p>
      <h2
        className="mx-auto mt-4 max-w-3xl text-center text-[clamp(2rem,5vw,3.6rem)] leading-[1.05]"
        style={{ fontFamily: "var(--font-concierge-serif)" }}
      >
        Everything you need.{" "}
        <em className="italic text-[#c89841]">Nothing you don&apos;t.</em>
      </h2>
      <div className="mt-14 grid gap-10 md:grid-cols-2">
        {blocks.map((b) => (
          <article
            key={b.t}
            className="rounded-sm border border-[#c89841]/25 bg-[#10051d]/60 p-8"
          >
            <h3
              className="text-2xl text-[#f4e9d8]"
              style={{
                fontFamily: "var(--font-concierge-serif)",
                fontWeight: 600,
              }}
            >
              {b.t}
            </h3>
            <p
              className="mt-3 text-[16px] leading-relaxed text-[#f4e9d8]/75"
              dangerouslySetInnerHTML={{ __html: b.b }}
            />
            <ul className="mt-4 space-y-2 text-[15px] text-[#f4e9d8]">
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
  const items = [
    {
      q: "I've tried other CRMs but this is one I'll actually use. It doesn't overwhelm me with unnecessary features, and I find myself staying organized without even thinking about it.",
      n: "Danielle J",
      r: "Senior Property Manager",
    },
    {
      q: "So easy and mobile friendly! Finally a way to follow up with clients and organize data without the tech overwhelm.",
      n: "Amanda W",
      r: "Real Estate Broker",
    },
    {
      q: "The follow up is fantastic. Goodbye to Excel spreadsheets and missed important dates! Managing real estate has become so much easier.",
      n: "Tyler B",
      r: "Real Estate Broker",
    },
    {
      q: "I was spending hours every week on admin tasks. Now MYRA takes care of it all automatically. I've gained back my evenings with my family and my business is thriving more than ever.",
      n: "Marcus T",
      r: "Broker Associate",
    },
    {
      q: "As a mom of three, I needed a CRM that works for me, not the other way around. MYRA handles the busywork while I focus on clients and still make it to soccer practice.",
      n: "Rachel K",
      r: "Real Estate Agent · Coldwell Banker",
    },
  ];
  return (
    <section className="relative z-10 border-y border-[#c89841]/20 bg-[#10051d] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-[10px] uppercase tracking-[0.42em] text-[#c89841]">
          Loved by agents everywhere
        </p>
        <h2
          className="mx-auto mt-4 max-w-3xl text-center text-[clamp(2rem,5vw,3.4rem)] leading-[1.05]"
          style={{ fontFamily: "var(--font-concierge-serif)" }}
        >
          From the <em className="italic text-[#c89841]">guest book</em>.
        </h2>
        <div className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <figure
              key={t.n}
              className="relative border-t border-[#c89841]/20 pt-6"
            >
              <p
                className="text-[17.5px] italic leading-relaxed text-[#f4e9d8]"
                style={{ fontFamily: "var(--font-concierge-serif)" }}
              >
                &ldquo;{t.q}&rdquo;
              </p>
              <figcaption className="mt-4">
                <p
                  className="text-xl text-[#c89841]"
                  style={{ fontFamily: "var(--font-concierge-hand)" }}
                >
                  {t.n}
                </p>
                <p className="text-[11px] uppercase tracking-[0.3em] text-[#f4e9d8]/65">
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
  const included = [
    "MYRA AI does your data entry",
    "Never miss a follow-up",
    "Free data migration",
    "Full mobile app access",
    "Unlimited contacts & storage",
    "Email integration",
    "Transaction tracking",
    "Birthday & anniversary alerts",
    "Lead source tracking",
    "Team collaboration",
    "Priority support",
  ];
  return (
    <section className="relative z-10 py-28">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-center text-[10px] uppercase tracking-[0.42em] text-[#c89841]">
          Simple, transparent pricing
        </p>
        <h2
          className="mt-4 text-center text-[clamp(3rem,7vw,5.5rem)] leading-[0.9]"
          style={{ fontFamily: "var(--font-concierge-serif)" }}
        >
          <em className="italic text-[#c89841]">$19</em> · per agent, per month.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-center text-lg leading-relaxed text-[#f4e9d8]/80">
          Billed annually (20% off). Or $24/mo billed monthly. 30-day free
          trial · no credit card required · cancel anytime.
        </p>

        <div className="mt-12 rounded-sm border border-[#c89841]/25 bg-[#1a0929]/50 p-8">
          <p className="text-[10px] uppercase tracking-[0.42em] text-[#c89841]">
            Every plan includes
          </p>
          <ul className="mt-5 grid gap-3 text-[15px] text-[#f4e9d8] sm:grid-cols-2">
            {included.map((x) => (
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
            className="inline-flex items-center gap-3 rounded-sm bg-[#c89841] px-9 py-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#1a0929] transition hover:-translate-y-0.5 hover:bg-[#e0b25f]"
          >
            Reserve the 30-day trial →
          </a>
          <p className="mt-4 text-[10px] uppercase tracking-[0.42em] text-[#c89841]">
            30-day money-back guarantee
          </p>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      q: "What is Client Keeper?",
      a: "An AI-powered CRM built specifically for real estate agents. It features MYRA, an AI assistant that handles data entry through voice and text, automated follow-up reminders, birthday and anniversary alerts, transaction tracking, and a full mobile app.",
    },
    {
      q: "How much does Client Keeper cost?",
      a: "$19/month billed annually (20% savings) or $24/month billed monthly. All plans include full access to MYRA, unlimited contacts, mobile app access, and priority support.",
    },
    {
      q: "Is there a free trial?",
      a: "Yes. A free 30-day trial with full access to every feature. No credit card required. Cancel anytime.",
    },
    {
      q: "What makes Client Keeper different from other CRMs?",
      a: "It&apos;s built specifically for real estate agents, not adapted from a generic CRM. The key difference is MYRA — just tell her about a client interaction and she automatically updates your CRM.",
    },
    {
      q: "Does Client Keeper have a mobile app?",
      a: "Yes — iOS and Android. Access all your client data, record voice memos for MYRA, receive follow-up reminders, and manage transactions from anywhere.",
    },
  ];
  return (
    <section className="relative z-10 border-y border-[#c89841]/20 bg-[#10051d] py-24">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-center text-[10px] uppercase tracking-[0.42em] text-[#c89841]">
          House rules · answered
        </p>
        <h2
          className="mt-4 text-center text-[clamp(2rem,5vw,3.4rem)]"
          style={{ fontFamily: "var(--font-concierge-serif)" }}
        >
          A few quiet questions.
        </h2>
        <div className="mt-12 divide-y divide-[#c89841]/20 border-y border-[#c89841]/20">
          {faqs.map((f) => (
            <details key={f.q} className="group py-6">
              <summary className="flex cursor-pointer items-baseline justify-between gap-6 list-none">
                <h3
                  className="text-xl text-[#f4e9d8]"
                  style={{ fontFamily: "var(--font-concierge-serif)", fontWeight: 600 }}
                >
                  {f.q}
                </h3>
                <span className="text-[#c89841] transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p
                className="mt-4 text-[16px] leading-relaxed text-[#f4e9d8]/75"
                dangerouslySetInnerHTML={{ __html: f.a }}
              />
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <footer className="relative z-10 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl rounded-sm border border-[#c89841]/30 bg-[#1a0929]/60 p-10 text-center">
          <p className="text-[10px] uppercase tracking-[0.42em] text-[#c89841]">
            Start your free 30-day trial
          </p>
          <h3
            className="mt-4 text-[clamp(2rem,5vw,3.4rem)] leading-[1.05]"
            style={{ fontFamily: "var(--font-concierge-serif)" }}
          >
            Join <em className="italic text-[#c89841]">10,000+ agents</em>{" "}
            closing more deals with Client Keeper.
          </h3>
          <a
            href="/client-keeper-crm"
            className="mt-8 inline-flex items-center gap-3 rounded-sm bg-[#c89841] px-8 py-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#1a0929] transition hover:-translate-y-0.5 hover:bg-[#e0b25f]"
          >
            Check In, Free →
          </a>
        </div>
        <div className="mt-10 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <p
            className="text-2xl italic text-[#c89841]"
            style={{ fontFamily: "var(--font-concierge-serif)" }}
          >
            Good evening. We hope to see you again.
          </p>
          <p className="text-[10px] uppercase tracking-[0.42em] text-[#f4e9d8]/60">
            © MMXXVI · Concierge Edition
          </p>
        </div>
      </div>
    </footer>
  );
}
