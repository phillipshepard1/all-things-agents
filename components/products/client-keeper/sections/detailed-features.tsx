"use client";

import { detailedFeatures } from "@/data/features";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Mic, Calendar, Phone, Mail, Home, ArrowRight } from "lucide-react";

// MYRA AI Screen - Chat/Voice Interface
function MyraScreen() {
  return (
    <div className="space-y-4 p-4">
      {/* Voice memo bubble */}
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20">
          <Mic className="h-4 w-4 text-accent" />
        </div>
        <div className="flex-1 rounded-2xl rounded-tl-none bg-accent/10 p-3">
          <p className="text-sm text-foreground">&quot;Just showed the Johnsons the house on Oak Street. They loved the backyard, scheduling second showing for Saturday.&quot;</p>
          <span className="mt-1 block text-xs text-muted-foreground">Voice memo • 0:12</span>
        </div>
      </div>

      {/* MYRA response */}
      <div className="ml-8 space-y-2">
        <div className="inline-flex items-center gap-2 rounded-lg bg-green-500/10 px-3 py-1.5 text-xs text-green-600 dark:text-green-400">
          <Check className="h-3 w-3" />
          Contact updated: Johnson Family
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg bg-blue-500/10 px-3 py-1.5 text-xs text-blue-600 dark:text-blue-400">
          <Calendar className="h-3 w-3" />
          Follow-up scheduled: Saturday 10am
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg bg-purple-500/10 px-3 py-1.5 text-xs text-purple-600 dark:text-purple-400">
          <Home className="h-3 w-3" />
          Property linked: 123 Oak Street
        </div>
      </div>

      {/* Another conversation */}
      <div className="flex items-start gap-3 pt-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
          <span className="text-xs font-medium">You</span>
        </div>
        <div className="flex-1 rounded-2xl rounded-tl-none bg-muted p-3">
          <p className="text-sm text-foreground">Add a note for Sarah Miller - preapproved for $450k</p>
        </div>
      </div>

      <div className="ml-8">
        <div className="inline-flex items-center gap-2 rounded-lg bg-green-500/10 px-3 py-1.5 text-xs text-green-600 dark:text-green-400">
          <Check className="h-3 w-3" />
          Note added to Sarah Miller
        </div>
      </div>
    </div>
  );
}

// Follow-Ups Screen - Calendar/Reminder List
function FollowUpsScreen() {
  const reminders = [
    { name: "Mike Chen", type: "Birthday", date: "Tomorrow", color: "bg-pink-500/20 text-pink-600 dark:text-pink-400" },
    { name: "Sarah Miller", type: "Follow-up", date: "Dec 30", color: "bg-blue-500/20 text-blue-600 dark:text-blue-400" },
    { name: "Johnson Family", type: "Follow-up", date: "Dec 30", color: "bg-green-500/20 text-green-600 dark:text-green-400" },
    { name: "Tom & Lisa", type: "Anniversary", date: "Jan 2", color: "bg-purple-500/20 text-purple-600 dark:text-purple-400" },
  ];

  return (
    <div className="space-y-3 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">Upcoming</span>
        <span className="text-xs text-muted-foreground">This week</span>
      </div>
      {reminders.map((reminder, i) => (
        <div key={i} className="flex items-center gap-3 rounded-xl bg-card/80 p-3 shadow-warm">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-sm font-medium">
            {reminder.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{reminder.name}</p>
            <span className={`inline-block rounded px-1.5 py-0.5 text-xs ${reminder.color}`}>{reminder.type}</span>
          </div>
          <span className="text-xs text-muted-foreground">{reminder.date}</span>
        </div>
      ))}
      <div className="flex items-center justify-center gap-1 pt-2 text-xs text-accent">
        <span>View all reminders</span>
        <ArrowRight className="h-3 w-3" />
      </div>
    </div>
  );
}

// Contacts Screen - Contact List
function ContactsScreen() {
  const contacts = [
    { name: "Sarah Miller", status: "Active Buyer", lastContact: "2 days ago", avatar: "SM" },
    { name: "Johnson Family", status: "Past Client", lastContact: "Today", avatar: "JF" },
    { name: "Mike Chen", status: "Past Client", lastContact: "1 week ago", avatar: "MC" },
    { name: "Lisa Rodriguez", status: "New Lead", lastContact: "Just now", avatar: "LR" },
  ];

  return (
    <div className="space-y-3 p-4">
      <div className="flex gap-2">
        <div className="flex-1 rounded-lg bg-muted/50 px-3 py-2 text-sm text-muted-foreground">Search contacts...</div>
        <div className="rounded-lg bg-accent/10 px-3 py-2 text-xs text-accent">+ Add</div>
      </div>
      {contacts.map((contact, i) => (
        <div key={i} className="flex items-center gap-3 rounded-xl bg-card/80 p-3 shadow-warm">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent/30 to-accent/10 text-sm font-medium">
            {contact.avatar}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{contact.name}</p>
            <p className="text-xs text-muted-foreground">{contact.status}</p>
          </div>
          <div className="flex gap-1">
            <div className="rounded-full bg-muted p-1.5"><Phone className="h-3 w-3 text-muted-foreground" /></div>
            <div className="rounded-full bg-muted p-1.5"><Mail className="h-3 w-3 text-muted-foreground" /></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Transactions Screen - Pipeline View
function TransactionsScreen() {
  const stages = [
    { name: "Active", count: 2, color: "bg-blue-500" },
    { name: "Pending", count: 1, color: "bg-yellow-500" },
    { name: "Closed", count: 5, color: "bg-green-500" },
  ];

  const deals = [
    { address: "123 Oak Street", price: "$525,000", stage: "Pending", progress: 75 },
    { address: "456 Maple Ave", price: "$389,000", stage: "Active", progress: 35 },
  ];

  return (
    <div className="space-y-4 p-4">
      {/* Pipeline stages */}
      <div className="flex gap-2">
        {stages.map((stage, i) => (
          <div key={i} className="flex-1 rounded-lg bg-muted/50 p-2 text-center">
            <div className={`mx-auto mb-1 h-2 w-2 rounded-full ${stage.color}`} />
            <p className="text-xs font-medium">{stage.count}</p>
            <p className="text-xs text-muted-foreground">{stage.name}</p>
          </div>
        ))}
      </div>

      {/* Deal cards */}
      {deals.map((deal, i) => (
        <div key={i} className="rounded-xl bg-card/80 p-3 shadow-warm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">{deal.address}</p>
              <p className="text-xs text-muted-foreground">{deal.price}</p>
            </div>
            <span className="rounded bg-accent/10 px-2 py-0.5 text-xs text-accent">{deal.stage}</span>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{deal.progress}%</span>
            </div>
            <div className="mt-1 h-1.5 w-full rounded-full bg-muted">
              <div className="h-1.5 rounded-full bg-accent" style={{ width: `${deal.progress}%` }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Map feature ID to screen component
const featureScreens: Record<string, React.ReactNode> = {
  myra: <MyraScreen />,
  followups: <FollowUpsScreen />,
  contacts: <ContactsScreen />,
  transactions: <TransactionsScreen />,
};

export function DetailedFeatures() {
  return (
    <section className="bg-muted/30 py-24 md:py-36">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <h2 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-home-6xl">
            Everything you need,{" "}
            <span className="text-gradient">nothing you don&apos;t</span>
          </h2>
          <p className="mt-5 text-xl md:text-home-lg text-muted-foreground">
            Built specifically for real estate agents who want to spend more time selling and less time on data entry.
          </p>
        </div>

        {/* Tabbed Features */}
        <Tabs defaultValue="myra" className="mx-auto max-w-5xl">
          <TabsList className="mb-10 grid h-auto w-full grid-cols-2 gap-3 bg-transparent p-0 md:flex md:justify-center md:gap-3">
            {detailedFeatures.map((feature) => (
              <TabsTrigger
                key={feature.id}
                value={feature.id}
                className="flex items-center gap-2.5 rounded-xl border border-border/40 bg-card px-5 py-4 text-base md:text-home-sm text-muted-foreground shadow-warm transition-all data-[state=active]:border-accent/40 data-[state=active]:bg-accent/10 data-[state=active]:text-foreground data-[state=active]:shadow-warm-lg hover:bg-muted"
              >
                <feature.icon className="h-5 w-5 md:h-6 md:w-6" />
                <span className="hidden sm:inline">{feature.title}</span>
                <span className="sm:hidden">{feature.shortTitle}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {detailedFeatures.map((feature) => (
            <TabsContent
              key={feature.id}
              value={feature.id}
              className="mt-0 focus-visible:outline-none focus-visible:ring-0"
            >
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                {/* Content */}
                <div className="order-2 lg:order-1">
                  <div className="mb-4 sm:mb-5 flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-accent/10">
                    <feature.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-accent" />
                  </div>
                  <h3 className="text-3xl font-bold md:text-home-3xl">
                    {feature.title}
                  </h3>
                  <p className="mt-4 sm:mt-5 text-lg sm:text-xl md:text-home-lg text-muted-foreground">
                    {feature.description}
                  </p>

                  {/* Feature bullets */}
                  <ul className="mt-8 space-y-4">
                    {feature.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-4">
                        <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                          <Check className="h-3.5 w-3.5 text-accent" />
                        </div>
                        <span className="text-base md:text-home-base text-foreground">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual - Custom Screen Mockup */}
                <div className="order-1 lg:order-2">
                  <div className="overflow-hidden rounded-2xl border border-border/40 bg-card shadow-warm-lg">
                    {/* Browser chrome */}
                    <div className="flex items-center gap-2 border-b border-border/40 bg-muted/50 px-4 py-3">
                      <div className="flex gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                        <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                        <div className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
                      </div>
                      <span className="ml-2 text-xs text-muted-foreground">Client Keeper</span>
                    </div>

                    {/* Feature-specific screen mockup */}
                    <div className="aspect-[4/3] bg-gradient-to-br from-muted/30 to-muted/10">
                      {featureScreens[feature.id]}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
