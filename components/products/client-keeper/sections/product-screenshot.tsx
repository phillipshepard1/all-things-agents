export function ProductScreenshot() {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="relative mx-auto max-w-5xl">
          {/* Decorative gradient background */}
          <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />

          {/* Screenshot placeholder with elegant styling */}
          <div className="overflow-hidden rounded-2xl border border-border/40 bg-card shadow-warm-xl">
            {/* Browser chrome mockup */}
            <div className="flex items-center gap-2 border-b border-border/40 bg-muted/50 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400/60" />
                <div className="h-3 w-3 rounded-full bg-yellow-400/60" />
                <div className="h-3 w-3 rounded-full bg-green-400/60" />
              </div>
              <div className="ml-4 flex-1 rounded-md bg-background/80 px-3 py-1 text-xs text-muted-foreground">
                app.clientkeeper.com/dashboard
              </div>
            </div>

            {/* Dashboard mockup content */}
            <div className="aspect-[16/10] bg-gradient-to-br from-muted/30 to-muted/10 p-8">
              <div className="grid h-full gap-6 lg:grid-cols-3">
                {/* Sidebar mockup */}
                <div className="hidden rounded-xl bg-card/80 p-4 shadow-warm lg:block">
                  <div className="mb-6 h-8 w-32 rounded-md bg-primary/10" />
                  <div className="space-y-3">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-8 rounded-md ${
                          i === 0 ? "bg-accent/20" : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Main content area */}
                <div className="col-span-2 space-y-6">
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-4">
                    {["Active Clients", "Pending Deals", "This Month"].map(
                      (label, i) => (
                        <div
                          key={label}
                          className="rounded-xl bg-card/80 p-4 shadow-warm"
                        >
                          <div className="mb-2 text-xs font-medium text-muted-foreground">
                            {label}
                          </div>
                          <div className="text-2xl font-bold text-foreground">
                            {[127, 23, "$45K"][i]}
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  {/* Pipeline visualization */}
                  <div className="rounded-xl bg-card/80 p-4 shadow-warm">
                    <div className="mb-4 text-sm font-semibold">
                      Deal Pipeline
                    </div>
                    <div className="flex gap-2">
                      {["Lead", "Follow-up", "Offer", "Under Contract", "Closed"].map(
                        (stage, i) => (
                          <div key={stage} className="flex-1">
                            <div
                              className="mb-1 h-16 rounded-lg"
                              style={{
                                background: `linear-gradient(to top, var(--accent) ${
                                  (5 - i) * 20
                                }%, transparent ${(5 - i) * 20}%)`,
                                backgroundColor: "var(--muted)",
                              }}
                            />
                            <div className="text-center text-xs text-muted-foreground">
                              {stage}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Recent activity */}
                  <div className="rounded-xl bg-card/80 p-4 shadow-warm">
                    <div className="mb-4 text-sm font-semibold">
                      Recent Activity
                    </div>
                    <div className="space-y-3">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-accent/20" />
                          <div className="flex-1">
                            <div className="h-3 w-3/4 rounded bg-muted" />
                            <div className="mt-1 h-2 w-1/2 rounded bg-muted/60" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-accent/10 blur-2xl" />
          <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
        </div>
      </div>
    </section>
  );
}
