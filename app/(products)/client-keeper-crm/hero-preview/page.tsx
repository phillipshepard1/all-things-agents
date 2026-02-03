import Link from "next/link";
import { ArrowRight } from "lucide-react";

const heroOptions = [
  {
    id: 1,
    name: "The Intervention",
    description: "Three confrontational cards showing the chaos of current methods",
    path: "/client-keeper-crm/hero-preview/option-1",
  },
  {
    id: 2,
    name: "The Strikethrough",
    description: "Animated strikethrough effect replacing old methods with Client Keeper",
    path: "/client-keeper-crm/hero-preview/option-2",
  },
  {
    id: 3,
    name: "The Sticky Wall",
    description: "Scattered sticky notes background creating visual chaos",
    path: "/client-keeper-crm/hero-preview/option-3",
  },
  {
    id: 4,
    name: "The Whisper to Scream",
    description: "Tiny text growing to massive text for dramatic effect",
    path: "/client-keeper-crm/hero-preview/option-4",
  },
  {
    id: 5,
    name: "The Confession Booth",
    description: "Conversational paragraph flow that feels personal",
    path: "/client-keeper-crm/hero-preview/option-5",
  },
  {
    id: 6,
    name: "The Scoreboard",
    description: "Dashboard/scoreboard visual showing before vs after",
    path: "/client-keeper-crm/hero-preview/option-6",
  },
];

export default function HeroPreviewIndex() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Hero Section Options
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Preview different hero section designs for Client Keeper CRM
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {heroOptions.map((option) => (
            <Link
              key={option.id}
              href={option.path}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-2xl font-bold text-accent">
                {option.id}
              </div>
              <h2 className="mb-2 text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                {option.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                {option.description}
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                Preview
                <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/client-keeper-crm"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to main page
          </Link>
        </div>
      </div>
    </div>
  );
}
