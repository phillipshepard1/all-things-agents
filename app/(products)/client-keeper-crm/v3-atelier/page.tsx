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
    "Real Estate CRM Without the Tech Overwhelm. Meet MYRA — the AI assistant that handles data entry while you close deals.",
};

export default function AtelierPage() {
  return (
    <main
      className={`${playfair.variable} ${caveat.variable} ${dmSans.variable} relative min-h-screen bg-[#fbf6ee] text-[#2a1637]`}
      style={{ fontFamily: "var(--font-atelier-sans), system-ui, sans-serif" }}
    >
      <PaperGrain />
      <Masthead />
      <Hero />
      <UsedBy />
      <Strikethrough />
      <PullQuote />
      <FeatureSpread />
      <Myra />
      <Benefits />
      <DetailedFeatures />
      <Testimonials />
      <Pricing />
      <FAQ />
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
        <Link href="#features">Features</Link>
        <Link href="#myra">MYRA</Link>
        <Link href="#pricing">Pricing</Link>
        <a
          href="/client-keeper-crm"
          className="rounded-full bg-[#300092] px-5 py-2 text-white transition hover:bg-[#3d0d6a]"
        >
          Start Free Trial
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
          <span className="h-[1px] w-8 bg-[#7a36dd]" /> Real Estate CRM ·
          Without the Tech Overwhelm
        </p>
        <h1
          className="font-serif text-[clamp(3.2rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.02em] text-[#2a1637]"
          style={{ fontFamily: "var(--font-atelier-serif)" }}
        >
          The CRM that{" "}
          <em className="font-normal italic text-[#7a36dd]">makes</em>
          <br />
          real estate <em className="font-normal italic">easy.</em>
        </h1>
        <p className="mt-8 max-w-lg text-lg leading-relaxed text-[#4a2b60]">
          Client Keeper is simple to use, with zero learning curve. MYRA —
          your AI assistant — handles data entry through voice and text, so
          you stay organized, build better relationships, and close more
          deals without the overwhelm.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-5">
          <a
            href="/client-keeper-crm"
            className="group relative inline-flex items-center gap-3 rounded-full bg-[#300092] px-7 py-4 text-sm font-semibold text-white shadow-[0_14px_40px_-12px_rgba(48,0,146,0.5)] transition hover:-translate-y-0.5 hover:bg-[#3d0d6a]"
          >
            Start Free Trial
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
          30-day free trial · cancel anytime · iOS &amp; Android
        </p>
      </div>

      <aside className="relative">
        <div className="relative mx-auto max-w-md rotate-[1.5deg] rounded-[2px] border border-[#2a1637]/10 bg-white p-8 shadow-[0_40px_80px_-40px_rgba(42,22,55,0.5)]">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#7a36dd]">
            The morning page
          </span>
          <div className="mt-4 space-y-3">
            <Line text="Call Sarah Johnson — next follow-up due" hand />
            <Line text="Email sent to Mike · Oak Street" checked hand />
            <Line text="Birthday — Susan M." hand />
            <Line text="Note added for Lisa (2nd showing)" checked hand />
            <Line text="Check in with the Millers (6-mo)" hand />
          </div>
          <div
            className="mt-6 flex items-center justify-between border-t border-[#2a1637]/10 pt-3"
          >
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#4a2b60]/70">
              24 leads · 12 tasks · 5 closings
            </span>
            <span
              className="text-[22px] italic text-[#7a36dd]"
              style={{ fontFamily: "var(--font-atelier-hand)" }}
            >
              — myra
            </span>
          </div>
        </div>
        <div
          className="absolute -bottom-8 -left-6 hidden rotate-[-4deg] rounded-sm bg-[#300092] px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white shadow-lg md:block"
        >
          MYRA handles data entry
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

function UsedBy() {
  const names = [
    "Keller Williams",
    "EXIT Realty",
    "The Sudar Group",
    "Momentum Loans",
    "AMC Mortgage",
    "Collier & Associates",
    "First Colony Mortgage",
    "Century 21",
    "Coldwell Banker",
  ];
  return (
    <section className="relative z-10 border-y border-[#2a1637]/10 bg-[#f3eadf]/60 py-8">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-4 text-center text-[10px] uppercase tracking-[0.4em] text-[#7a36dd]">
          Used by 10,000+ agents at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
          {names.map((n) => (
            <span
              key={n}
              className="text-[15px] italic text-[#2a1637]/70"
              style={{ fontFamily: "var(--font-atelier-serif)" }}
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
  const items = [
    "Sticky Notes",
    "Spreadsheets",
    "Crossed Fingers",
    "Lost Leads",
  ];
  return (
    <section className="relative z-10 bg-[#f3eadf] py-14">
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
        &ldquo;Built by real estate agents, for real estate agents. We
        understand the unique challenges you face and designed every feature
        to help you succeed — without the tech overwhelm.&rdquo;
      </blockquote>
      <p
        className="mt-6 text-lg italic text-[#7a36dd]"
        style={{ fontFamily: "var(--font-atelier-hand)" }}
      >
        — Client Keeper, volume I
      </p>
    </section>
  );
}

function FeatureSpread() {
  const features = [
    {
      n: "i",
      title: "Simple To The Core",
      body: "Real estate has enough moving parts. We keep your CRM refreshingly simple — no 30-day onboarding, no feature overload, no bloat.",
    },
    {
      n: "ii",
      title: "Effortless Data Entry",
      body: "Let MYRA handle the data entry while you focus on closing deals and building relationships. Voice memos, typed notes, all filed automatically.",
    },
    {
      n: "iii",
      title: "Smart Follow-Up Reminders",
      body: "Never let another hot lead go cold or miss a past client's birthday again. Birthdays, anniversaries, and closing dates — all tracked.",
    },
    {
      n: "iv",
      title: "Done-For-You Data Transfer",
      body: "Start fresh without starting over — we'll move all your contacts and history from your old CRM for you, no spreadsheets required.",
    },
    {
      n: "v",
      title: "Grow Your Sphere",
      body: "Turn every interaction into a lasting relationship that generates referrals for years to come.",
    },
    {
      n: "vi",
      title: "Manage Your Full Business",
      body: "Run your entire real estate business from one simple app — contacts, deals, tasks, and follow-ups all in one place.",
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
          Everything you need · nothing you don&apos;t
        </span>
      </div>
      <div className="grid gap-x-16 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
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
  const jobs = [
    {
      k: "Schedule Follow-Ups",
      v: "Send MYRA a voice note saying 'check in with the Millers every 6 months' and she'll notify you perfectly on schedule.",
    },
    {
      k: "Capture Client Data",
      v: "Voice memos, sticky notes, napkin scribbles — MYRA organizes it all perfectly.",
    },
    {
      k: "Remember Client Details",
      v: "When clients say 'we loved the kitchen but hated the bathroom,' tell MYRA — she adds that note to their profile.",
    },
    {
      k: "Record Property Searches",
      v: "When the Smiths say 'looking for 2,500 sqft, 4-bed in a good school district,' MYRA logs their requirements.",
    },
    {
      k: "Plan Your To-Dos",
      v: "Morning thoughts, car ramblings, task overload — MYRA enters every to-do perfectly for you.",
    },
    {
      k: "Important Dates",
      v: "Birthdays, anniversaries, closing dates — MYRA tracks all custom date follow-ups so you can show you care.",
    },
  ];
  return (
    <section id="myra" className="relative z-10 mx-auto max-w-6xl px-6 py-20">
      <div className="rounded-[3px] border border-[#2a1637]/10 bg-white p-8 shadow-[0_30px_80px_-40px_rgba(42,22,55,0.4)] md:p-14">
        <div className="grid items-start gap-12 md:grid-cols-[0.9fr,1.1fr]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.32em] text-[#7a36dd]">
              Meet your assistant
            </span>
            <h2
              className="mt-4 text-[clamp(2rem,4vw,3rem)] leading-[1] text-[#2a1637]"
              style={{ fontFamily: "var(--font-atelier-serif)", fontWeight: 800 }}
            >
              Hi, I&apos;m MYRA.
              <br />
              <em className="italic text-[#7a36dd]">My Real Estate Assistant.</em>
            </h2>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-[#4a2b60]">
              MYRA streamlines data entry and schedules follow-ups so you
              stay organized, build better relationships, and close more
              deals — without the overwhelm.
            </p>
          </div>
          <div className="relative rounded-[2px] border border-[#2a1637]/10 bg-[#fbf6ee] p-6 shadow-inner">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#7a36dd]">
              Voice memo · 0:12
            </p>
            <p
              className="mt-4 text-[22px] leading-snug italic text-[#2a1637]"
              style={{ fontFamily: "var(--font-atelier-hand)" }}
            >
              &ldquo;Just showed the Johnsons the house on Oak Street. They
              loved the backyard, scheduling second showing for
              Saturday.&rdquo;
            </p>
            <div className="mt-6 rounded-[2px] border border-dashed border-[#7a36dd]/40 bg-white p-4">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#7a36dd]">
                MYRA has filed
              </p>
              <ul className="mt-3 space-y-2 text-[14px] text-[#2a1637]">
                <li>→ Contact updated: <strong>Johnson Family</strong></li>
                <li>→ Follow-up scheduled: <strong>Saturday 10am</strong></li>
                <li>→ Property linked: <strong>123 Oak Street</strong></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-x-12 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((j) => (
            <div key={j.k}>
              <h4
                className="mb-2 text-xl text-[#2a1637]"
                style={{
                  fontFamily: "var(--font-atelier-serif)",
                  fontWeight: 700,
                }}
              >
                {j.k}
              </h4>
              <p className="text-[15px] leading-relaxed text-[#4a2b60]">
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
    <section className="relative z-10 border-y border-[#2a1637]/15 bg-[#f3eadf] py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1fr,1.1fr]">
        <div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#7a36dd]">
            Why Client Keeper
          </p>
          <h2
            className="mt-3 text-[clamp(2rem,4.5vw,3.6rem)] leading-[1]"
            style={{ fontFamily: "var(--font-atelier-serif)", fontWeight: 800 }}
          >
            Keep more clients. <em className="italic text-[#7a36dd]">Close more deals.</em>
          </h2>
          <ul className="mt-8 space-y-3">
            {bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 text-[16.5px] leading-snug text-[#2a1637]"
              >
                <span className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-[#7a36dd]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <div
              key={s.n}
              className="rounded-[2px] border border-[#2a1637]/10 bg-white p-6"
            >
              <p
                className="text-[#7a36dd]"
                style={{
                  fontFamily: "var(--font-atelier-serif)",
                  fontSize: "clamp(2.4rem, 5vw, 3.5rem)",
                  fontWeight: 800,
                  lineHeight: 1,
                }}
              >
                {s.n}
              </p>
              <p className="mt-3 text-[14px] uppercase tracking-[0.18em] text-[#4a2b60]/80">
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
      b: "Meet MYRA — your AI assistant that enters data for you. Just talk or type naturally, and MYRA handles the rest. It's like having a personal assistant who never sleeps.",
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
      <p className="text-center text-[11px] uppercase tracking-[0.35em] text-[#7a36dd]">
        The longer list
      </p>
      <h2
        className="mx-auto mt-4 max-w-3xl text-center text-[clamp(2rem,5vw,3.6rem)] leading-[1.05]"
        style={{ fontFamily: "var(--font-atelier-serif)", fontWeight: 800 }}
      >
        Everything you need, <em className="italic text-[#7a36dd]">nothing you don&apos;t.</em>
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-center text-[16px] leading-relaxed text-[#4a2b60]">
        Built specifically for real estate agents who want to spend more time
        selling and less time on data entry.
      </p>
      <div className="mt-14 grid gap-10 md:grid-cols-2">
        {blocks.map((b) => (
          <article
            key={b.t}
            className="rounded-[2px] border border-[#2a1637]/10 bg-white p-8"
          >
            <h3
              className="text-2xl text-[#2a1637]"
              style={{
                fontFamily: "var(--font-atelier-serif)",
                fontWeight: 800,
              }}
            >
              {b.t}
            </h3>
            <p className="mt-3 text-[16px] leading-relaxed text-[#4a2b60]">
              {b.b}
            </p>
            <ul className="mt-4 space-y-2 text-[15px] text-[#2a1637]">
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
  const items = [
    {
      q: "I've tried other CRMs but this is one I'll actually use. It doesn't overwhelm me with unnecessary features, and I find myself staying organized without even thinking about it.",
      n: "Danielle J",
      r: "Senior Property Manager",
    },
    {
      q: "So easy and mobile friendly! Finally a way to follow up with clients and organize data without the tech overwhelm. I can update everything on the go between showings.",
      n: "Amanda W",
      r: "Real Estate Broker",
    },
    {
      q: "The follow up is fantastic. Goodbye to Excel spreadsheets and missed important dates! With MYRA and Client Keeper's simple follow-up system, managing real estate has become so much easier.",
      n: "Tyler B",
      r: "Real Estate Broker",
    },
    {
      q: "MYRA is like having a personal assistant who never sleeps. She handles all my data entry and follow-up reminders behind the scenes so I can actually be present with my kids after work.",
      n: "Jessica M",
      r: "Realtor, Century 21",
    },
    {
      q: "I was spending hours every week on admin tasks. Now MYRA takes care of it all automatically. I've gained back my evenings with my family and my business is thriving more than ever.",
      n: "Marcus T",
      r: "Broker Associate",
    },
    {
      q: "As a mom of three, I needed a CRM that works for me, not the other way around. MYRA handles the busywork while I focus on clients and still make it to soccer practice.",
      n: "Rachel K",
      r: "Real Estate Agent, Coldwell Banker",
    },
  ];
  return (
    <section className="relative z-10 bg-[#fbf6ee] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-[11px] uppercase tracking-[0.35em] text-[#7a36dd]">
          Loved by agents everywhere
        </p>
        <h2
          className="mx-auto mt-4 max-w-3xl text-center text-[clamp(2rem,5vw,3.4rem)] leading-[1.05]"
          style={{ fontFamily: "var(--font-atelier-serif)", fontWeight: 800 }}
        >
          <em className="italic text-[#7a36dd]">Don&apos;t just take our word.</em>
          <br />
          Here&apos;s what agents are saying.
        </h2>
        <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <figure key={t.n} className="relative">
              <p
                className="text-[17.5px] italic leading-relaxed text-[#2a1637]"
                style={{ fontFamily: "var(--font-atelier-serif)" }}
              >
                &ldquo;{t.q}&rdquo;
              </p>
              <figcaption className="mt-4">
                <p
                  className="text-lg text-[#7a36dd]"
                  style={{ fontFamily: "var(--font-atelier-hand)", fontSize: "22px" }}
                >
                  — {t.n}
                </p>
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#4a2b60]/70">
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
    <section
      id="pricing"
      className="relative z-10 border-y border-[#2a1637]/15 bg-[#f3eadf] py-24"
    >
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-center text-[11px] uppercase tracking-[0.35em] text-[#7a36dd]">
          Simple, transparent pricing
        </p>
        <h2
          className="mt-4 text-center text-[clamp(2.4rem,6vw,4.5rem)] leading-[1]"
          style={{ fontFamily: "var(--font-atelier-serif)", fontWeight: 800 }}
        >
          Start free. <em className="italic text-[#7a36dd]">Upgrade when you&apos;re ready.</em>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-center text-[16px] leading-relaxed text-[#4a2b60]">
          No hidden fees. No tiers. No sales call. Just one fair number.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <div className="rounded-[2px] border border-[#7a36dd]/50 bg-white p-8 shadow-[0_20px_50px_-25px_rgba(122,54,221,0.3)]">
            <div className="flex items-baseline justify-between">
              <span
                className="text-2xl text-[#2a1637]"
                style={{ fontFamily: "var(--font-atelier-serif)", fontWeight: 700 }}
              >
                Yearly
              </span>
              <span className="rounded-full bg-[#7a36dd] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white">
                20% off
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span
                className="text-[#7a36dd]"
                style={{
                  fontFamily: "var(--font-atelier-serif)",
                  fontSize: "clamp(3rem, 6vw, 4.5rem)",
                  fontWeight: 800,
                  lineHeight: 1,
                }}
              >
                $19
              </span>
              <span className="text-[15px] text-[#4a2b60]/70">/mo</span>
              <span className="ml-2 text-[14px] line-through text-[#4a2b60]/40">$24</span>
            </div>
            <p className="mt-1 text-[13px] text-[#4a2b60]/70">
              $228/year · billed once
            </p>
          </div>
          <div className="rounded-[2px] border border-[#2a1637]/15 bg-white p-8">
            <span
              className="text-2xl text-[#2a1637]"
              style={{ fontFamily: "var(--font-atelier-serif)", fontWeight: 700 }}
            >
              Monthly
            </span>
            <div className="mt-4 flex items-baseline gap-2">
              <span
                className="text-[#2a1637]"
                style={{
                  fontFamily: "var(--font-atelier-serif)",
                  fontSize: "clamp(3rem, 6vw, 4.5rem)",
                  fontWeight: 800,
                  lineHeight: 1,
                }}
              >
                $24
              </span>
              <span className="text-[15px] text-[#4a2b60]/70">/mo</span>
            </div>
            <p className="mt-1 text-[13px] text-[#4a2b60]/70">
              $288/year · cancel anytime
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-[2px] border border-[#2a1637]/10 bg-white p-8">
          <p className="text-[11px] uppercase tracking-[0.32em] text-[#7a36dd]">
            Every plan includes
          </p>
          <ul className="mt-5 grid gap-3 text-[15px] text-[#2a1637] sm:grid-cols-2">
            {included.map((x) => (
              <li key={x} className="flex items-start gap-2">
                <span className="mt-[8px] inline-block size-1.5 shrink-0 rounded-full bg-[#7a36dd]" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 text-center">
          <a
            href="/client-keeper-crm"
            className="inline-flex items-center gap-3 rounded-full bg-[#300092] px-8 py-4 text-sm font-semibold text-white shadow-[0_14px_40px_-12px_rgba(48,0,146,0.5)] transition hover:-translate-y-0.5 hover:bg-[#3d0d6a]"
          >
            Start Free Trial →
          </a>
          <p className="mt-4 text-[11px] uppercase tracking-[0.3em] text-[#4a2b60]/60">
            No credit card required · 30-day free trial · cancel anytime
          </p>
          <p className="mt-2 text-[11px] uppercase tracking-[0.3em] text-[#7a36dd]">
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
      a: "Client Keeper is an AI-powered CRM built specifically for real estate agents. It features MYRA, an AI assistant that handles data entry through voice and text, plus automated follow-up reminders, birthday and anniversary alerts, transaction tracking, and a full mobile app.",
    },
    {
      q: "How much does Client Keeper cost?",
      a: "$19/month billed annually (20% savings) or $24/month billed monthly. All plans include full access to MYRA AI, unlimited contacts, mobile app access, and priority support. A free 30-day trial is available with no credit card required.",
    },
    {
      q: "Is there a free trial?",
      a: "Yes — a free 30-day trial with full access to all features. No credit card required. Cancel anytime.",
    },
    {
      q: "What makes Client Keeper different from other CRMs?",
      a: "Client Keeper is built specifically for real estate agents, not adapted from a generic CRM. The key difference is MYRA — our AI assistant that handles data entry through voice memos and text. Just tell MYRA about your client interaction and she automatically updates your CRM.",
    },
    {
      q: "Does Client Keeper have a mobile app?",
      a: "Yes — full-featured iOS and Android apps. You can access all your client data, record voice memos for MYRA, receive follow-up reminders, and manage transactions from anywhere.",
    },
  ];
  return (
    <section className="relative z-10 mx-auto max-w-4xl px-6 py-24">
      <p className="text-center text-[11px] uppercase tracking-[0.35em] text-[#7a36dd]">
        A few questions
      </p>
      <h2
        className="mt-4 text-center text-[clamp(2rem,5vw,3.4rem)] leading-[1.05]"
        style={{ fontFamily: "var(--font-atelier-serif)", fontWeight: 800 }}
      >
        Frequently asked.
      </h2>
      <div className="mt-12 divide-y divide-[#2a1637]/15 border-y border-[#2a1637]/15">
        {faqs.map((f) => (
          <details key={f.q} className="group py-6">
            <summary className="flex cursor-pointer items-baseline justify-between gap-6 list-none">
              <h3
                className="text-xl text-[#2a1637]"
                style={{ fontFamily: "var(--font-atelier-serif)", fontWeight: 700 }}
              >
                {f.q}
              </h3>
              <span className="text-[#7a36dd] transition group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-4 text-[16px] leading-relaxed text-[#4a2b60]">
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
    <footer className="relative z-10 border-t border-[#2a1637]/15 bg-[#f3eadf] py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] uppercase tracking-[0.35em] text-[#7a36dd]">
            Start your free 30-day trial
          </p>
          <h3
            className="mt-4 text-[clamp(2rem,5vw,3.2rem)] leading-[1.05]"
            style={{ fontFamily: "var(--font-atelier-serif)", fontWeight: 800 }}
          >
            Join <em className="italic text-[#7a36dd]">10,000+ agents</em> closing more
            deals with Client Keeper.
          </h3>
          <a
            href="/client-keeper-crm"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#300092] px-8 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#3d0d6a]"
          >
            Start Free Trial →
          </a>
        </div>
        <div className="mt-12 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <p
            className="text-3xl italic text-[#7a36dd]"
            style={{ fontFamily: "var(--font-atelier-hand)" }}
          >
            — signed, the Client Keeper team
          </p>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#4a2b60]/70">
            © MMXXVI · Atelier Edition · Vol. I
          </p>
        </div>
      </div>
    </footer>
  );
}
