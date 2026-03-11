import Link from "next/link";

const pages = [
  {
    href: "/client-keeper-crm/lp/follow-up",
    title: "Follow-Up",
    description:
      "Automated follow-up reminders. Never lose a client to forgetting.",
    angle: "Fear of forgetting / missed opportunities",
  },
  {
    href: "/client-keeper-crm/lp/voice-notes",
    title: "Voice Notes",
    description:
      "Just talk. Your CRM updates itself. No typing, no tech overwhelm.",
    angle: "Simplicity / tech-averse agents",
  },
  {
    href: "/client-keeper-crm/lp/mobile",
    title: "Mobile",
    description:
      "A CRM you can run from anywhere — between showings, in the car, at the open house.",
    angle: "On-the-go lifestyle / mobile-first",
  },
  {
    href: "/client-keeper-crm/lp/organization",
    title: "Organization",
    description:
      "From chaos to calm. Ditch sticky notes and spreadsheets for good.",
    angle: "Overwhelm / disorganization pain",
  },
  {
    href: "/client-keeper-crm/lp/work-life",
    title: "Work-Life Balance",
    description:
      "Stop working at 10pm. MYRA handles the busywork so you can be present.",
    angle: "Burnout / family time / boundaries",
  },
];

export default function LandingPagesIndex() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-2 text-3xl font-bold text-gray-900">
        Client Keeper Landing Pages
      </h1>
      <p className="mb-10 text-gray-500">
        5 ad angles, each targeting a different pain point. Click through to
        preview.
      </p>

      <div className="grid gap-4">
        {pages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="group rounded-xl border border-gray-200 p-6 transition-all hover:border-purple-300 hover:shadow-md"
          >
            <div className="mb-1 flex items-center gap-3">
              <h2 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600">
                {page.title}
              </h2>
              <span className="rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-medium text-purple-600">
                {page.angle}
              </span>
            </div>
            <p className="text-gray-600">{page.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
