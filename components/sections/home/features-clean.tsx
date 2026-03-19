import { Settings2, Keyboard, Bell, ArrowLeftRight, Users, Briefcase } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";

const features = [
  { icon: Settings2, title: "Simple To The Core", description: "Real estate has enough moving parts. We keep your CRM refreshingly simple." },
  { icon: Keyboard, title: "Effortless Data Entry", description: "Let Myra handle the data entry while you focus on closing deals and building relationships." },
  { icon: Bell, title: "Smart Follow-Up Reminders", description: "Never let another hot lead go cold or miss a past client's birthday again." },
  { icon: ArrowLeftRight, title: "Done-For-You Data Transfer", description: "Start fresh without starting over — we'll move all your contacts and history from your old CRM for you." },
  { icon: Users, title: "Grow Your Sphere", description: "Turn every interaction into a lasting relationship that generates referrals for years to come." },
  { icon: Briefcase, title: "Manage Your Full Business", description: "Run your entire real estate business from one simple app — contacts, deals, tasks, and follow-ups all in one place." },
];

export function FeaturesClean() {
  return (
    <section className="bg-secondary py-28 md:py-40">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center">
          <BlurFade delay={0.1} inView>
            <h2 className="text-4xl md:text-home-5xl font-bold text-foreground">
              Everything you need
            </h2>
          </BlurFade>
          <BlurFade delay={0.15} inView>
            <p className="text-lg md:text-home-lg text-muted-foreground mt-4">
              Simple tools that help you close more deals.
            </p>
          </BlurFade>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 mt-16 md:mt-20">
          {features.map((feature, index) => (
            <BlurFade key={feature.title} delay={0.1 + index * 0.05} inView>
              <div>
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-base md:text-home-sm text-muted-foreground mt-1.5">
                  {feature.description}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
